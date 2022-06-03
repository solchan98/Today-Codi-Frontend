import { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction } from 'react';

import { IMarker } from 'types/post';

import cs from './addImage.module.scss';
import ShowInfoButton from '../../board/MainPoster/ShowInfoButton';

interface Props {
  image: string;
  setImageFile: Dispatch<SetStateAction<File | undefined>>;
  markerList: IMarker[];
  selectedMarker: number;
  setImage: Dispatch<SetStateAction<string>>;
  addMarker: MouseEventHandler<HTMLButtonElement>;
  setMarkerList: Dispatch<SetStateAction<IMarker[]>>;
}

const AddImage = ({ image, setImageFile, markerList, selectedMarker, setImage, addMarker, setMarkerList }: Props) => {
  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMarkerList([]);
    if (e.currentTarget.files !== null && e.currentTarget.files[0] !== undefined) {
      const reader = new FileReader();
      const file = e.currentTarget.files[0];
      reader.onloadend = () => {
        setImage(String(reader.result));
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImage('');
      setImageFile(undefined);
    }
  };

  return (
    <button type='button' className={cs.imageWrapper} onClick={addMarker}>
      <input
        type='file'
        style={{ display: 'none' }}
        accept='image/png, image/jpg, image/jpeg'
        name='profile_img'
        id='imgUpload'
        onChange={onFileInputChange}
        onClick={(e) => e.stopPropagation()}
      />
      {!image && (
        <label htmlFor='imgUpload'>
          이미지 추가 <br /> (480 x 720 이미지 추천)
        </label>
      )}
      {image && <img src={image} alt='img' draggable={false} />}
      {markerList?.map((marker) => (
        <ShowInfoButton
          key={marker.marker}
          top={marker.height}
          left={marker.width}
          link={marker.link}
          fill={selectedMarker === marker.marker ? 'red' : undefined}
        />
      ))}
    </button>
  );
};

export default AddImage;
