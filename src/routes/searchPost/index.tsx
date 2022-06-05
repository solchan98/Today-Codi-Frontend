import { useAppDispatch, useAppSelector } from 'redux/store';
import { initUser } from 'redux/store/slices/userSlice';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import cs from '../trend/trend.module.scss';
import Card from 'components/trend/Card';
import { getSearchPostThunk } from '../../redux/thunk/searchPostThunk';
import { useLocation } from 'react-router-dom';

const Following = () => {
  const { lastId, isLast, searchPosts, isLoading } = useAppSelector((state) => state.searchPost);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const tagName = location.search.split('=')[1];

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading && !isLast) {
      dispatch(getSearchPostThunk({ tagName, lastId }))
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
      <h1 className={cs.searchInfoTitle}>{`'#${decodeURI(tagName)}'에 대한 게시글 검색 결과`}</h1>
      <div className={cs.cardWrapper}>
        {searchPosts.map((post) => (
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
