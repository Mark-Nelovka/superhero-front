interface IButton {
  text: string | React.ReactNode;
  handleHero: () => void;
  style: string;
  type: "button" | "submit";
}

export const Button = ({ text, handleHero, style, type }: IButton) => {
  return (
    <button type={type} onClick={handleHero} className={style}>
      {text}
    </button>
  );
};
