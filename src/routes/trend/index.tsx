import DropDown from '../../components/common/DropDown';
import Card from '../../components/trend/Card';

import cs from './trend.module.scss';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { getTrendPostList } from '../../services/trend';
import { useRecoilState } from 'recoil';
import { trendPostSearchState } from '../../recoil/trend/atoms';
import { ITrendPostResponse } from '../../types/trend';

const TEMP_SEX_WORD_LIST = ['전체', '남', '여'];
const TEMP_AGE_WORD_LIST = ['10대', '20대', '30대', '40대', '50대'];

const Trend = () => {
  const [trendPostSearch, setTrendPostSearch] = useRecoilState(trendPostSearchState);
  const [postList, setPostList] = useState<ITrendPostResponse[]>([] as ITrendPostResponse[]);

  useEffect(() => {
    getTrendPostList(trendPostSearch).then((res) => setPostList((prev) => [...prev, ...res.data]));
  }, [trendPostSearch]);

  return (
    <div className={cs.trend}>
      <div className={cs.dropDownWrapper}>
        <button // TODO: 인피니티 스크롤로 변경하기
          type='button'
          onClick={() => {
            setTrendPostSearch((prev) => {
              return {
                ...prev,
                page: prev.page + 1,
              };
            });
          }}
        >
          버튼
        </button>
        <DropDown title='성별' valList={TEMP_SEX_WORD_LIST} />
        <DropDown title='나이' valList={TEMP_AGE_WORD_LIST} />
      </div>
      <div className={cs.cardWrapper}>
        {postList.map((post) => (
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
      </div>
    </div>
  );
};

export default Trend;
