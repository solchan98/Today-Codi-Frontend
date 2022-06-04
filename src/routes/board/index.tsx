import cx from 'classnames';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useMount } from 'react-use';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import HashTag from 'components/common/HashTag';
import Comment from 'components/board/Comment';
import MainPoster from 'components/board/MainPoster/inedx';
import CommentInput from 'components/board/CommentInput';
import ProfileCircle from 'components/common/ProfileCircle';
import { getPost } from 'services/post';
import { postState } from 'recoil/atoms/post';
import { useAppSelector } from 'redux/store';

import cs from './board.module.scss';
import { addFollowing, removeFollowing } from 'services/user';

const Board = () => {
  const { userId } = useAppSelector((state) => state.user);
  const location = useLocation();
  const postId = useRef(location.search.split('=')[1]);
  const [post, setPost] = useRecoilState(postState);

  useMount(() => {
    getPost(Number(postId.current)).then((res) => setPost(res));
  });

  const onClickFollow = () => {
    if (post.isFollowing) {
      removeFollowing(post.user.userId);
    } else {
      addFollowing(post.user.userId);
    }
    setPost((prev) => {
      return {
        ...prev,
        isFollowing: !prev.isFollowing,
      };
    });
  };

  if (post.postId === undefined) return <div>로딩중</div>;

  return (
    <div className={cs.boardWrapper}>
      <div>
        <div className={cs.boardHeader}>
          <ul>
            {/* TODO: TAG MAX COUNT 16 */}
            {post.tagList.map((tag) => (
              <HashTag key={tag.tagId} name={tag.title} />
            ))}
          </ul>
          <time dateTime='2001-05-15'>{dayjs(post.createdAt).format('YYYY-MM-DD')}</time>
        </div>
        <MainPoster image={post.mainImg} markerList={post.markerList} />
      </div>
      <aside className={cs.asideWrapper}>
        <div className={cs.userInfoWrapper}>
          <ProfileCircle url={post.user.profileImg} />
          <p>{post.user.nickname}</p>
          {post.user.userId !== userId && (
            <button
              className={cx(cs.followButton, post.isFollowing && cs.isFollowing)}
              type='button'
              onClick={onClickFollow}
            >
              {post.isFollowing ? '팔로잉' : '팔로우'}
            </button>
          )}
        </div>
        <div className={cs.asideContentWrapper}>
          <p className={cs.asideContentIndex}>한줄 소개</p>
          <p className={cs.asideContent}>{post.content}</p>
        </div>
        <div className={cs.asideContentWrapper}>
          <p className={cs.asideContentIndex}>
            댓글 <mark>{post.commentList.length}</mark>
          </p>
          <CommentInput />
        </div>
        <ul>
          {post.commentList.map((comment) => (
            <Comment
              key={comment.commentId}
              nickname={comment.nickname}
              profileImg={comment.profileImg}
              content={comment.content}
            />
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Board;
