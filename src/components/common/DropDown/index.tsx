import cx from 'classnames';
import { useClickAway } from 'react-use';
import { useRef, useState, MouseEvent } from 'react';

import cs from './dropDown.module.scss';

interface Props {
  title: string;
  valList: string[];
}

const DropDown = ({ title, valList }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVal, setSelectedVal] = useState(valList[0]);

  const ref = useRef(null);

  const onClickDropDown = () => setIsOpen(true);
  const onClickItem = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedVal(String(e.currentTarget.dataset.set));
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
              className={cx(selectedVal === value && cs.selectedVal)}
              type='button'
              data-set={value}
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
