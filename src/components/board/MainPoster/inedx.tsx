import cs from './mainPoster.module.scss';
import ShowInfoButton from './ShowInfoButton';

const MainPoster = () => {
  return (
    <div className={cs.mainPosterWrapper}>
      <img src='https://image.musinsa.com/mfile_s01/_shopstaff/view.staff_628eda95a5c7e.jpg?20220526104103' alt='img' />
      <ShowInfoButton top='50' left='40' />
      <ShowInfoButton top='30' left='50' />
      <ShowInfoButton top='10' left='45' />
      <ShowInfoButton top='87' left='45' />
    </div>
  );
};

export default MainPoster;
