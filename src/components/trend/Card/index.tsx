import cs from './card.module.scss';
import ProfileCircle from '../../common/ProfileCircle';
import { Comment, Heart } from '../../../assets/svgs';

const IMG_URL =
  'https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/160493273035082504.jpeg?gif=1&w=36&h=36&c=c';

const Card = () => {
  return (
    <div className={cs.cardWrapper}>
      <div className={cs.cardHeader}>
        <ProfileCircle url={IMG_URL} />
        <p>sund_home</p>
      </div>
      <time>2022-05-29</time>
      <main>
        <img
          src='https://image.musinsa.com/mfile_s01/_shopstaff/view.staff_628eda95a5c7e.jpg?20220526104103'
          alt='img'
        />
      </main>
      <div className={cs.cardFooter}>
        <p>
          <Heart />
          <span>15</span>
        </p>
        <p>
          <Comment />
          <span>15</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
