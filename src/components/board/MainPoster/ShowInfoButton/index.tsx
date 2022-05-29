import cs from './showInfoButton.module.scss';

interface Props {
  top: string;
  left: string;
}

const ShowInfoButton = ({ top, left }: Props) => {
  return (
    <a
      href='https://naver.com'
      target='_blank'
      title='상품 페이지로 이동합니다!'
      style={{ top: `${top}%`, left: `${left}%` }}
      className={cs.showInfoButton}
      rel='noreferrer'
    >
      <svg viewBox='0 0 24 24'>
        <circle cx={12} cy={12} r={12} fill='#8ECBCC' />
        <path stroke='#FFF' strokeLinecap='square' strokeWidth={2} d='M12 16V8m-4 4h8' />
      </svg>
    </a>
  );
};

export default ShowInfoButton;
