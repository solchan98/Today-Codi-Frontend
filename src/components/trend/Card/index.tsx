import cx from 'classnames';

import cs from './card.module.scss';
import ProfileCircle from '../../common/ProfileCircle';
import { Comment, Heart } from 'assets/svgs';
import { useNavigate } from 'react-router-dom';

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
  const onCardClick = () => {
    nav(`post?postId=${postId}`);
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
        <p>
          <Heart className={cx(likeIt && cs.likeIt)} />
          <span>{likeCnt}</span>
        </p>
        <p>
          <Comment />
          <span>{commentCnt}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
