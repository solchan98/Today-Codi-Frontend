import cs from './trend.module.scss';
import Card from 'components/trend/Card';
import DropDown from 'components/common/DropDown';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import getTrend from 'redux/store/slices/trendPostSlice';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

const TEMP_SEX_WORD_LIST = ['전체', '남', '여'];
const TEMP_AGE_WORD_LIST = ['전체', '10대', '20대', '30대', '40대', '50대']; // '전체'는 Request 할 때, 'all'!

const Trend = () => {
  const { sex, ageRange, lastId, isLast, trendPosts, isLoading } = useAppSelector((state) => state.trendPost);
  const dispatch = useAppDispatch();
  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading && !isLast) {
      dispatch(getTrend({ sex, ageRange, lastId }));
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
      <div className={cs.dropDownWrapper}>
        {/* TODO: 인피니티 스크롤 구현하기 */}
        <DropDown title='성별' valList={TEMP_SEX_WORD_LIST} />
        <DropDown title='나이' valList={TEMP_AGE_WORD_LIST} />
      </div>
      <div className={cs.cardWrapper}>
        {trendPosts.map((post) => (
          <Card
            key={post.postId}
            nickname={post.user.nickname}
            profileImg={post.user.profileImg}
            image={post.mainImg}
            createdAt={String(post.createdAt)}
            commentCnt={post.commentList.length}
            likeCnt={post.likeUserIdList.length}
          />
        ))}
        {!isLoading && <div ref={target} />}
      </div>
    </div>
  );
};

export default Trend;
