import cs from './commentInput.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { postState } from 'recoil/atoms/post';
import { newComment } from 'services/post';

const CommentInput = () => {
  const [content, setContent] = useState('');
  const [post, setPost] = useRecoilState(postState);

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newComment(post.postId, content).then((res) => {
      setPost((prev) => {
        return {
          ...prev,
          commentList: [...prev.commentList, res],
        };
      });
    });
    setContent('');
  };

  // TODO: 댓글 작성 날짜 추가하기
  return (
    <form className={cs.commentInput} onSubmit={onSubmit}>
      <input value={content} type='text' placeholder='칭찬 혹은 궁금한 점을 남겨보세요.' onChange={onChangeContent} />
      <button disabled={content === ''} type='submit'>
        입력
      </button>
    </form>
  );
};

export default CommentInput;
