interface IButton {
  text: string;
  handleHero: () => void;
  style: string;
}

export const Button = ({ text, handleHero, style }: IButton) => {
  return (
    <button onClick={handleHero} className={style}>
      {text}
    </button>
  );
};
