import DropDown from '../../components/common/DropDown';
import Card from '../../components/trend/Card';

import cs from './trend.module.scss';

const TEMP_SEX_WORD_LIST = ['전체', '남', '여'];
const TEMP_AGE_WORD_LIST = ['10대', '20대', '30대', '40대', '50대'];
const TEMP_STYLE_WORD_LIST = ['무난', '화려', '정장', '대학생', '파티'];

const Trend = () => {
  return (
    <div className={cs.trend}>
      <div className={cs.dropDownWrapper}>
        <DropDown title='성별' valList={TEMP_SEX_WORD_LIST} />
        <DropDown title='나이' valList={TEMP_AGE_WORD_LIST} />
        <DropDown title='스타일' valList={TEMP_STYLE_WORD_LIST} />
      </div>
      <div className={cs.cardWrapper}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Trend;
