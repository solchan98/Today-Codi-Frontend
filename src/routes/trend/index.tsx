import { useRecoilState } from 'recoil';
import { useInfiniteQuery } from 'react-query';

import cs from './trend.module.scss';
import Card from '../../components/trend/Card';
import DropDown from '../../components/common/DropDown';
import { getTrendPostList } from '../../services/trend';
import { trendPostSearchState } from '../../recoil/trend/atoms';

const TEMP_SEX_WORD_LIST = ['전체', '남', '여'];
const TEMP_AGE_WORD_LIST = ['전체', '10대', '20대', '30대', '40대', '50대']; // '전체'는 Request 할 때, 'all'!

const Trend = () => {
  const [trendPostSearch, setTrendPostSearch] = useRecoilState(trendPostSearchState);

  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    ['#trendPostSearch', trendPostSearch],
    (page) => getTrendPostList(trendPostSearch, page.pageParam),
    {
      staleTime: 1000 * 6 * 3, // TODO: 캐시타임 잘 고려해보기!
      getNextPageParam: (lastPage) => (lastPage.nextPage !== null ? lastPage.nextPage : undefined),
    }
  );
  const dataList = data?.pages.map((page) => [...page.data]).flat();

  return (
    <div className={cs.trend}>
      <div className={cs.dropDownWrapper}>
        {/* TODO: 인피니티 스크롤 구현하기 */}
        <DropDown title='성별' valList={TEMP_SEX_WORD_LIST} />
        <DropDown title='나이' valList={TEMP_AGE_WORD_LIST} />
      </div>
      <div className={cs.cardWrapper}>
        {dataList?.map((post) => (
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
        {/* TODO: 로딩 이쁘게! 버튼은 지울거야! */}
        {isLoading && <div>...로딩중!</div>}
        <button type='button' onClick={() => fetchNextPage()}>
          버튼
        </button>
      </div>
    </div>
  );
};

export default Trend;
