interface IButton {
  text: string | React.ReactNode;
  handleHero?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style: string;
  type: "button" | "submit";
  idForTest: string;
}

export const Button = ({
  text,
  handleHero,
  style,
  type,
  idForTest,
}: IButton) => {
  return (
    <button
      data-testid={idForTest}
      type={type}
      onClick={handleHero}
      className={style}
    >
      {text}
    </button>
  );
};
