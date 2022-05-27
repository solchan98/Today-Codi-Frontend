import DropDown from '../../components/common/DropDown';

const TEMP_SEX_WORD_LIST = ['전체', '남', '여'];

const Trend = () => {
  return (
    <div>
      <DropDown title='성별' valList={TEMP_SEX_WORD_LIST} />
    </div>
  );
};

export default Trend;
