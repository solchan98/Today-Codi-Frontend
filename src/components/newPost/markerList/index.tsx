import { ChangeEvent, Dispatch, FocusEventHandler, SetStateAction } from 'react';

import { IMarker } from 'types/trend';

import cs from './markerList.module.scss';

interface Props {
  markerList: IMarker[];
  setMarkerList: Dispatch<SetStateAction<IMarker[]>>;
  onFocusMarkerInput: FocusEventHandler<HTMLInputElement>;
  removeMarker: (id: number) => void;
}

const MarkerList = ({ markerList, setMarkerList, onFocusMarkerInput, removeMarker }: Props) => {
  const onChangeMarkerLink = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = e.currentTarget;
    const { id } = dataset;
    setMarkerList((prev) =>
      prev.map((marker) => {
        if (marker.marker === Number(id)) marker.link = value;
        return marker;
      })
    );
  };

  return (
    <ul className={cs.writeMakerList}>
      {markerList?.map((marker) => (
        <li key={marker.marker}>
          <input
            placeholder='상품의 링크를 입력하세요.'
            data-id={marker.marker}
            onFocus={onFocusMarkerInput}
            onChange={onChangeMarkerLink}
          />
          <button type='button' onClick={() => removeMarker(marker.marker)}>
            제거
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MarkerList;
