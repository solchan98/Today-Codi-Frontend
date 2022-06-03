import cs from './mainPoster.module.scss';
import ShowInfoButton from './ShowInfoButton';
import { IMarker } from 'types/post';

interface Props {
  image: string;
  markerList: IMarker[];
}

const MainPoster = ({ image, markerList }: Props) => {
  return (
    <div className={cs.mainPosterWrapper}>
      <img src={image} alt='img' />
      {markerList.map((marker) => (
        <ShowInfoButton key={marker.marker} top={marker.height} left={marker.width} link={marker.link} />
      ))}
    </div>
  );
};

export default MainPoster;
