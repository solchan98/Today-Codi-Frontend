import { useState } from 'react';

export const useDropDown = (stateList: string[], onChangeHandler: Function) => {
  const [state, setState] = useState(stateList[0]);

  const onChangeDropDownState = () => {
    onChangeHandler();
  };

  return { state, setState };
};
