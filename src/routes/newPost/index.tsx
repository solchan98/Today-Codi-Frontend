import { useState } from 'react';

import DropDown from 'components/common/DropDown';

import cs from './newPost.module.scss';
import { useTag } from 'hooks/useTag';
import TagList from 'components/newPost/TagList';
import MarkerList from 'components/newPost/markerList';
import AddImage from 'components/newPost/AddImage';
import { useMarkerList } from 'hooks/newPost/useMarkerList';
import { useDropDown } from 'hooks/useDropDown';

const TEMP_SEX_WORD_LIST = ['전체', '남', '여'];
const TEMP_AGE_WORD_LIST = ['전체', '10대', '20대', '30대', '40대', '50대']; // '전체'는 Request 할 때, 'all'!

const NewPost = () => {
  const { state: sex, changeState: changeSex } = useDropDown(TEMP_SEX_WORD_LIST);
  const { state: ageRange, changeState: changeAgeRange } = useDropDown(TEMP_AGE_WORD_LIST);
  const [image, setImage] = useState<string>('');

  const [tagList, tagInput, onChangeTagInput, onTagClick] = useTag();
  const [markerList, selectedMarker, setMarkerList, addMarker, removeMarker, onFocusMarkerInput] = useMarkerList(image);

  return (
    <div className={cs.newPostWrapper}>
      <form onSubmit={(e) => e.preventDefault()}>
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
            markerList={markerList}
            selectedMarker={selectedMarker}
            setImage={setImage}
            addMarker={addMarker}
            setMarkerList={setMarkerList}
          />
        </div>
        <aside className={cs.newPostAsideWrapper}>
          <button type='button'>올리기</button>
          <textarea placeholder='한줄 소개를 작성해주세요.' />
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
