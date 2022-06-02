import cx from 'classnames';
import { useClickAway } from 'react-use';
import { useRef, useState, MouseEvent } from 'react';

import cs from './dropDown.module.scss';

interface Props {
  title: string;
  selectedValue: number | string;
  valList: string[];
  onChangeHandler: (name: string) => void;
}

const DropDown = ({ title, selectedValue, valList, onChangeHandler }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const onClickDropDown = () => setIsOpen(true);
  const onClickItem = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget.dataset;
    onChangeHandler(String(name));
    setIsOpen(false);
  };
  useClickAway(ref, () => setIsOpen(false));

  return (
    <div className={cs.dropDownWrapper}>
      <button className={cs.dropDownBtn} type='button' onClick={onClickDropDown}>
        {title}
      </button>
      <ul ref={ref} className={cx(cs.dropDownList, isOpen && cs.dropDownListOn)}>
        {valList.map((value) => (
          <li key={`drop_list_${value}`}>
            <button
              className={cx(selectedValue === value && cs.selectedVal)}
              type='button'
              data-name={value}
              onClick={onClickItem}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
