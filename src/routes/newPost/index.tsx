import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';

import DropDown from 'components/common/DropDown';

import cs from './newPost.module.scss';
import TagList from 'components/newPost/TagList';
import AddImage from 'components/newPost/AddImage';
import { useTag } from 'hooks/useTag';
import MarkerList from 'components/newPost/markerList';
import { useDropDown } from 'hooks/useDropDown';
import { useMarkerList } from 'hooks/newPost/useMarkerList';
import { useAppDispatch } from 'redux/store';
import { createPostThunk } from 'redux/thunk/trendPostThunk';
import { AGE_WORD_LIST, SEX_WORD_LIST } from 'constant/dropdown';

const NewPost = () => {
  const { state: sex, changeState: changeSex } = useDropDown(SEX_WORD_LIST);
  const { state: ageRange, changeState: changeAgeRange } = useDropDown(AGE_WORD_LIST);
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File>();

  const [tagList, tagInput, onChangeTagInput, onTagClick] = useTag();
  const [markerList, selectedMarker, setMarkerList, addMarker, removeMarker, onFocusMarkerInput] = useMarkerList(image);

  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 더러웡 리팩토링 할거얌👻
    const formData = new FormData();
    formData.append('sex', sex);
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
        }, 1000);
      });
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const onRemoveImage = () => {
    setImage('');
    setImageFile(undefined);
  };

  return (
    <div className={cs.newPostWrapper}>
      <form onSubmit={onSubmit}>
        <div className={cs.newPostMainWrapper}>
          <div className={cs.dropDownWrapper}>
            <DropDown title='성별' selectedValue={sex} valList={SEX_WORD_LIST} onChangeHandler={changeSex} />
            <DropDown title='나이' selectedValue={ageRange} valList={AGE_WORD_LIST} onChangeHandler={changeAgeRange} />
          </div>
          {image && (
            <div className={cs.imageSideInfo}>
              <p>이미지를 클릭하여 마커를 추가하세요!</p>
              <button type='button' onClick={onRemoveImage}>
                이미지 제거
              </button>
            </div>
          )}
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
          <button type='submit' disabled={!image || imageFile === undefined}>
            올리기
          </button>
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
