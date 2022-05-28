import DropDown from '../../components/common/DropDown';
import Card from '../../components/trend/Card';

const TEMP_SEX_WORD_LIST = ['전체', '남', '여'];

const Trend = () => {
  return (
    <div>
      {/* <DropDown title='성별' valList={TEMP_SEX_WORD_LIST} /> */}
      <Card />
    </div>
  );
};

export default Trend;
