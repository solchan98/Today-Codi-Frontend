import { useNavigate } from 'react-router-dom';
import cs from './hashTag.module.scss';
import { useAppDispatch } from '../../../redux/store';
import { getFirstSearchPostThunk } from '../../../redux/thunk/searchPostThunk';

interface Props {
  name: string;
}

const HashTag = ({ name }: Props) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const onHashTagClick = () => {
    const tagName = name.slice(1);
    dispatch(getFirstSearchPostThunk(tagName));
    nav(`/search?tagName=${tagName}`);
  };
  return (
    <button className={cs.hashTag} type='button' onClick={onHashTagClick}>
      {name}
    </button>
  );
};

export default HashTag;
