import { useNavigate } from 'react-router-dom';
import cs from './hashTag.module.scss';

interface Props {
  name: string;
}

const HashTag = ({ name }: Props) => {
  const nav = useNavigate();

  const onHashTagClick = () => {
    // TODO: 해시태그 값을 통해 검색 결과 페이지로 이동시킨다.
    nav('..');
  };
  return (
    <button className={cs.hashTag} type='button' onClick={onHashTagClick}>
      #{name}
    </button>
  );
};

export default HashTag;
