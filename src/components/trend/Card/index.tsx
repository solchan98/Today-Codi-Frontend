import cx from 'classnames';

import cs from './card.module.scss';
import ProfileCircle from '../../common/ProfileCircle';
import { Comment, Heart } from 'assets/svgs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { addHeartThunk, removeHeartThunk } from '../../../redux/thunk/trendPostThunk';

interface Props {
  postId: number;
  nickname: string;
  profileImg: string;
  createdAt: string;
  image: string;
  likeCnt: number;
  commentCnt: number;
  likeIt: boolean;
}

const Card = ({ postId, nickname, profileImg, createdAt, image, likeCnt, commentCnt, likeIt }: Props) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.user);
  const onCardClick = () => {
    nav(`post?postId=${postId}`);
  };
  const onHeartClick = () => {
    if (likeIt) {
      dispatch(removeHeartThunk({ userId, postId }));
    } else {
      dispatch(addHeartThunk({ userId, postId }));
    }
  };
  return (
    <div className={cs.cardWrapper}>
      <div className={cs.cardHeader}>
        <ProfileCircle url={profileImg} />
        <p>{nickname}</p>
      </div>
      <time>{createdAt}</time>
      <button type='button' onClick={onCardClick}>
        <img src={image} alt='img' />
      </button>
      <div className={cs.cardFooter}>
        <button type='button' onClick={onHeartClick}>
          <Heart className={cx(likeIt && cs.likeIt)} />
          <span>{likeCnt}</span>
        </button>
        <button type='button' onClick={onCardClick}>
          <Comment />
          <span>{commentCnt}</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
