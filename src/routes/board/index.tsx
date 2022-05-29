import MainPoster from '../../components/board/MainPoster/inedx';
import cs from './board.module.scss';
import HashTag from '../../components/common/HashTag';

const Board = () => {
  return (
    <div className={cs.boardWrapper}>
      <div>
        <div className={cs.boardHeader}>
          <ul>
            {/* TODO: TAG MAX COUNT 16 */}
            <HashTag name='코디' />
            <HashTag name='대학생' />
            <HashTag name='트렌드' />
            <HashTag name='코디' />
            <HashTag name='대학생' />
            <HashTag name='트렌드' />
            <HashTag name='코디' />
            <HashTag name='대학생' />
            <HashTag name='트렌드' />
            <HashTag name='코디' />
            <HashTag name='대학생' />
            <HashTag name='트렌드' />
            <HashTag name='코디' />
            <HashTag name='대학생' />
          </ul>
          <time>2022-05-12</time>
        </div>
        <MainPoster />
      </div>
      <aside className={cs.asideWrapper} />
    </div>
  );
};

export default Board;
