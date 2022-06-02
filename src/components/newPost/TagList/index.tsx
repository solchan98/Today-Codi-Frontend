import { ChangeEventHandler, MouseEventHandler } from 'react';

import cs from './tagList.module.scss';

interface Props {
  tagList: string[];
  tagInput: string;
  onTagClick: MouseEventHandler<HTMLButtonElement>;
  onChangeTagInput: ChangeEventHandler<HTMLInputElement>;
}

const TagList = ({ tagList, tagInput, onTagClick, onChangeTagInput }: Props) => {
  return (
    <ul className={cs.tagList}>
      {tagList.map((tag) => (
        <button key={tag} type='button' className={cs.tag} data-name={tag} onClick={onTagClick}>
          {tag}
        </button>
      ))}
      <input value={tagInput} placeholder='#코디' onChange={onChangeTagInput} />
    </ul>
  );
};

export default TagList;
