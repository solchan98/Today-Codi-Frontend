import {
  Dispatch,
  FocusEvent,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from 'react';
import { IMarker } from 'types/trend';

type ReturnTypes = [
  IMarker[],
  number,
  Dispatch<SetStateAction<IMarker[]>>,
  MouseEventHandler<HTMLButtonElement>,
  (id: number) => void,
  FocusEventHandler<HTMLInputElement>
];

export const useMarkerList = (image: string): ReturnTypes => {
  const [markerList, setMarkerList] = useState<IMarker[]>([] as IMarker[]);
  const [selectedMarker, setSelectedMarker] = useState<number>(0);

  const addMarker = (e: MouseEvent<HTMLButtonElement>) => {
    if (image) {
      const { offsetX, offsetY } = e.nativeEvent;
      const marker = {
        marker: new Date().getMilliseconds(), // TODO: Will Change UUID
        width: ((offsetX - 12) / e.currentTarget.offsetWidth) * 100,
        height: ((offsetY - 12) / e.currentTarget.offsetHeight) * 100,
        link: '',
      };
      setMarkerList((prev) => [marker, ...prev]);
      setSelectedMarker(marker.marker);
    }
  };
  const removeMarker = (id: number) => {
    setMarkerList((prev) => prev.filter((marker) => marker.marker !== id));
  };

  const onFocusMarkerInput = (e: FocusEvent<HTMLInputElement>) => {
    setSelectedMarker(Number(e.currentTarget.dataset.id));
  };

  return [markerList, selectedMarker, setMarkerList, addMarker, removeMarker, onFocusMarkerInput];
};
