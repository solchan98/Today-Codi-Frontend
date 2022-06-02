import { useState } from 'react';

export const useDropDown = (stateList: string[]) => {
  const [state, setState] = useState(stateList[0]);

  const changeState = (name: string) => {
    setState(name);
  };

  return { state, changeState };
};
