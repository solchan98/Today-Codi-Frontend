import cx from 'classnames';
import { useClickAway } from 'react-use';
import { useRef, useState, MouseEvent } from 'react';

import cs from './dropDown.module.scss';
import { useAppDispatch } from '../../../redux/store';

interface Props {
  title: string;
  selectedValue: number | string;
  valList: string[];
  onSelectHandler: Function;
}

const DropDown = ({ title, selectedValue, valList, onSelectHandler }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  const dispatch = useAppDispatch();

  const onClickDropDown = () => setIsOpen(true);
  const onClickItem = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(onSelectHandler({ value: e.currentTarget.dataset.set }));
    setIsOpen(false);
    onSelectHandler();
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
