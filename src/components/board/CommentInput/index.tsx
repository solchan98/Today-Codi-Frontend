import cs from './commentInput.module.scss';

const CommentInput = () => {
  return (
    <form className={cs.commentInput}>
      <input type='text' placeholder='칭찬 혹은 궁금한 점을 남겨보세요.' />
      <button type='button'>입력</button>
    </form>
  );
};

export default CommentInput;
