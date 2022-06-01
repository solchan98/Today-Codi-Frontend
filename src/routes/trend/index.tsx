import cs from './trend.module.scss';
import Card from 'components/trend/Card';
import DropDown from 'components/common/DropDown';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { getTrend } from '../../redux/thunk/trendPostThunk';
import { changeAgeRangeCondition, changeSexCondition } from '../../redux/store/slices/trendPostSlice';
import { initUser } from '../../redux/store/slices/userSlice';

const TEMP_SEX_WORD_LIST = ['전체', '남', '여'];
const TEMP_AGE_WORD_LIST = ['전체', '10대', '20대', '30대', '40대', '50대']; // '전체'는 Request 할 때, 'all'!

const Trend = () => {
  const user = useAppSelector((state) => state.user);
  const { sex, ageRange, lastId, isLast, trendPosts, isLoading } = useAppSelector((state) => state.trendPost);
  const dispatch = useAppDispatch();
  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading && !isLast) {
      dispatch(getTrend({ sex, ageRange, lastId }))
        .unwrap()
        .catch((err) => {
          if (err.message.includes('401')) {
            dispatch(initUser(user));
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
      <div className={cs.dropDownWrapper}>
        {/* TODO: 인피니티 스크롤 구현하기 */}
        <DropDown
          title='성별'
          // TODO: trendPostSlice 33번 줄과 같은 고민..
          selectedValue={sex === 2 ? '전체' : sex === 0 ? '남' : '여'}
          valList={TEMP_SEX_WORD_LIST}
          onSelectHandler={changeSexCondition}
        />
        <DropDown
          title='나이'
          selectedValue={ageRange}
          valList={TEMP_AGE_WORD_LIST}
          onSelectHandler={changeAgeRangeCondition}
        />
      </div>
      <div className={cs.cardWrapper}>
        {trendPosts.map((post) => (
          <Card
            key={post.postId}
            postId={post.postId}
            nickname={post.user.nickname}
            profileImg={post.user.profileImg}
            image={post.mainImg}
            createdAt={String(post.createdAt)}
            commentCnt={post.commentList.length}
            likeCnt={post.likeUserIdList.length}
            likeIt={post.likeUserIdList.includes(user.userId ?? -1)}
          />
        ))}
        {!isLoading && <div ref={target} />}
      </div>
    </div>
  );
};

export default Trend;
