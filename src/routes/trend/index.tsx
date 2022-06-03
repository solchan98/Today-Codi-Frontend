import Card from 'components/trend/Card';
import DropDown from 'components/common/DropDown';
import { initUser } from 'redux/store/slices/userSlice';
import { getTrendThunk } from 'redux/thunk/trendPostThunk';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { AGE_WORD_LIST, SEX_WORD_LIST } from 'constant/dropdown';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { changeAgeRangeCondition, changeSexCondition } from 'redux/store/slices/trendPostSlice';

import cs from './trend.module.scss';

const Trend = () => {
  const user = useAppSelector((state) => state.user);
  const { sex, ageRange, lastId, isLast, trendPosts, isLoading } = useAppSelector((state) => state.trendPost);
  const dispatch = useAppDispatch();

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading && !isLast) {
      dispatch(getTrendThunk({ sex, ageRange, lastId }))
        .unwrap()
        // TODO: 401, 403 에러에 대한 통합 예외 처리 필요!
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

  const onSexChangeHandler = (name: string) => {
    dispatch(changeSexCondition(name));
  };

  const onAgeRangeChangeHandler = (name: string) => {
    dispatch(changeAgeRangeCondition(name));
  };

  return (
    <div className={cs.trend}>
      <div className={cs.dropDownWrapper}>
        <DropDown title='성별' selectedValue={sex} valList={SEX_WORD_LIST} onChangeHandler={onSexChangeHandler} />
        <DropDown
          title='나이'
          selectedValue={ageRange}
          valList={AGE_WORD_LIST}
          onChangeHandler={onAgeRangeChangeHandler}
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

export default Trend;
