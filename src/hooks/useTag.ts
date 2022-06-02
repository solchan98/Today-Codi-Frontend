import { ChangeEvent, ChangeEventHandler, MouseEvent, MouseEventHandler, useState } from 'react';

type ReturnTypes = [string[], string, ChangeEventHandler<HTMLInputElement>, MouseEventHandler<HTMLButtonElement>];

export const useTag = (): ReturnTypes => {
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');

  const onChangeTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.includes(' ')) {
      onTagAdd(value.trim());
      setTagInput('');
    } else {
      setTagInput(value);
    }
  };
  const onTagClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { dataset } = e.currentTarget;
    setTagList((prev) => prev.filter((tag) => tag !== String(dataset.name)));
  };
  const onTagAdd = (name: string) => {
    const tagName = name[0] === '#' ? name : `#${name}`;
    if (!tagList.includes(tagName) && name !== '') {
      setTagList((prev) => [...prev, tagName]);
    }
  };

  return [tagList, tagInput, onChangeTagInput, onTagClick];
};
