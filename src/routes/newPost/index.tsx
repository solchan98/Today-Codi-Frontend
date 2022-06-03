import { ChangeEvent, FormEvent, useState } from 'react';

import DropDown from 'components/common/DropDown';

import cs from './newPost.module.scss';
import TagList from 'components/newPost/TagList';
import AddImage from 'components/newPost/AddImage';
import { useTag } from 'hooks/useTag';
import MarkerList from 'components/newPost/markerList';
import { useDropDown } from 'hooks/useDropDown';
import { useMarkerList } from 'hooks/newPost/useMarkerList';
import { useAppDispatch } from '../../redux/store';
import { createPostThunk } from '../../redux/thunk/trendPostThunk';
import { useNavigate } from 'react-router-dom';

const TEMP_SEX_WORD_LIST = ['전체', '남', '여'];
const TEMP_AGE_WORD_LIST = ['전체', '10대', '20대', '30대', '40대', '50대']; // '전체'는 Request 할 때, 'all'!

const NewPost = () => {
  const { state: sex, changeState: changeSex } = useDropDown(TEMP_SEX_WORD_LIST);
  const { state: ageRange, changeState: changeAgeRange } = useDropDown(TEMP_AGE_WORD_LIST);
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File>();

  const [tagList, tagInput, onChangeTagInput, onTagClick] = useTag();
  const [markerList, selectedMarker, setMarkerList, addMarker, removeMarker, onFocusMarkerInput] = useMarkerList(image);

  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sex', sex === '전체' ? '2' : sex === '남' ? '0' : '1');
    formData.append('ageRange', ageRange);
    formData.append('content', content);
    formData.append('file', imageFile as Blob);
    formData.append('tagList', JSON.stringify(tagList));
    formData.append('markerList', JSON.stringify(markerList));
    dispatch(createPostThunk(formData))
      .unwrap()
      .then((res) => {
        setTimeout(() => {
          // 구글 스토리지에 이미지가 늦게 올라가서 한 설정인데 이거 좀 아닌데;;
          nav(`/trend/post?postId=${res.postId}`);
        }, 500);
      });
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  return (
    <div className={cs.newPostWrapper}>
      <form onSubmit={onSubmit}>
        <div className={cs.newPostMainWrapper}>
          <div className={cs.dropDownWrapper}>
            <DropDown title='성별' selectedValue={sex} valList={TEMP_SEX_WORD_LIST} onChangeHandler={changeSex} />
            <DropDown
              title='나이'
              selectedValue={ageRange}
              valList={TEMP_AGE_WORD_LIST}
              onChangeHandler={changeAgeRange}
            />
          </div>
          {image && <p>이미지를 클릭하여 마커를 추가하세요!</p>}
          <AddImage
            image={image}
            setImageFile={setImageFile}
            markerList={markerList}
            selectedMarker={selectedMarker}
            setImage={setImage}
            addMarker={addMarker}
            setMarkerList={setMarkerList}
          />
        </div>
        <aside className={cs.newPostAsideWrapper}>
          <button type='submit'>올리기</button>
          <textarea value={content} placeholder='한줄 소개를 작성해주세요.' onChange={onChangeContent} />
          <TagList tagList={tagList} tagInput={tagInput} onTagClick={onTagClick} onChangeTagInput={onChangeTagInput} />
          <MarkerList
            markerList={markerList}
            setMarkerList={setMarkerList}
            onFocusMarkerInput={onFocusMarkerInput}
            removeMarker={removeMarker}
          />
        </aside>
      </form>
    </div>
  );
};

export default NewPost;
