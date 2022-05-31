import MainPoster from '../../components/board/MainPoster/inedx';
import cs from './board.module.scss';
import HashTag from '../../components/common/HashTag';
import ProfileCircle from '../../components/common/ProfileCircle';
import CommentInput from '../../components/board/CommentInput';
import Comment from '../../components/board/Comment';

const IMG_URL =
  'https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/160493273035082504.jpeg?gif=1&w=36&h=36&c=c';

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
      <aside className={cs.asideWrapper}>
        <div className={cs.userInfoWrapper}>
          <ProfileCircle url={IMG_URL} />
          <p>sund_home</p>
          <button className={cs.followButton} type='button'>
            팔로우
          </button>
        </div>
        <div className={cs.asideContentWrapper}>
          <p className={cs.asideContentIndex}>한줄 소개</p>
          <p className={cs.asideContent}>더운 요즘! 간단하게 입을 수 있는 후리한 코디</p>
        </div>
        <div className={cs.asideContentWrapper}>
          <p className={cs.asideContentIndex}>
            댓글 <mark>3</mark>
          </p>
          <CommentInput />
        </div>
        <ul>
          <Comment content='호호호 바지에 마커가 없는데 혹시 바지 정보좀 알 수 있을까요?!?' />
          <Comment content='호호호 바지에 마커가 없는데 혹시 바지 정보좀 알 수 있을까요?!?' />
          <Comment content='호호호 바지에 마커가 없는데 혹시 바지 정보좀 알 수 있을까요?!?' />
        </ul>
      </aside>
    </div>
  );
};

export default Board;
