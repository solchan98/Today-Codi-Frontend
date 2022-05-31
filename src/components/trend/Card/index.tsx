import cx from 'classnames';

import cs from './card.module.scss';
import ProfileCircle from '../../common/ProfileCircle';
import { Comment, Heart } from '../../../assets/svgs';

interface Props {
  nickname: string;
  profileImg: string;
  createdAt: string;
  image: string;
  likeCnt: number;
  commentCnt: number;
  likeIt: boolean;
}

const Card = ({ nickname, profileImg, createdAt, image, likeCnt, commentCnt, likeIt }: Props) => {
  return (
    <div className={cs.cardWrapper}>
      <div className={cs.cardHeader}>
        <ProfileCircle url={profileImg} />
        <p>{nickname}</p>
      </div>
      <time>{createdAt}</time>
      <main>
        <img src={image} alt='img' />
      </main>
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
