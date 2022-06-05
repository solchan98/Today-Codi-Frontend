import { useMount } from 'react-use';

import Card from 'components/trend/Card';
import { initUser } from 'redux/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { getFollowingPostThunk } from 'redux/thunk/followingPostThunk';
import { initFollowingPostState } from '../../redux/store/slices/followingPostSlice';

import cs from '../trend/trend.module.scss';

const Following = () => {
  const { lastId, isLast, followingPosts, isLoading } = useAppSelector((state) => state.followingPost);
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(initFollowingPostState());
  });

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading && !isLast) {
      dispatch(getFollowingPostThunk(lastId))
        .unwrap()
        // TODO: 401, 403 에러에 대한 통합 예외 처리 필요!
        .catch((err) => {
          if (err.message.includes('401')) {
            dispatch(initUser());
          }
        });
      observer.unobserve(entry.target);
    } else {
      observer.observe(entry.target);
    }
  };
  const { target } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // <div>가 50% 보여지면 호출
    onIntersect,
  });

  return (
    <div className={cs.trend}>
      <div className={cs.cardWrapper}>
        {followingPosts.map((post) => (
          <Card
            key={post.postId}
            postId={post.postId}
            nickname={post.user.nickname}
            profileImg={post.user.profileImg}
            image={post.mainImg}
            createdAt={String(post.createdAt)}
            commentCnt={post.commentCnt}
            likeCnt={post.likeCnt}
            isLike={post.isLike}
          />
        ))}
        {!isLoading && <div ref={target} />}
      </div>
    </div>
  );
};

export default Following;
