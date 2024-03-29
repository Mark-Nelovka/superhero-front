import { useEffect, useState } from "react";
import { createHero, updateHero } from "../../API";
import Button from "../button";
import Backdrop from "../backdrop";
import { IItems } from "../../types/Items";
import buttonStyles from "../button/button.module.css";
import componentStyles from "./form.module.css";
import Notiflix from "notiflix";

interface IForm {
  updateList: () => void;
  item?: IItems;
  openForm: () => void;
  handleTextButton: string;
}

export const Form = ({
  updateList,
  item,
  openForm,
  handleTextButton,
}: IForm): JSX.Element => {
  const [heroForm, setHeroForm] = useState<IItems>({
    nickname: "",
    real_name: "",
    description: "",
    superpowers: "",
    phrase: "",
    images: [],
  });

  const changeHeroDescription = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setHeroForm((prevState) => {
      if (id === "images" && e.target instanceof HTMLInputElement) {
        return {
          ...prevState,
          [id]: e.target.files as unknown as File[],
        };
      } else {
        return { ...prevState, [id]: value };
      }
    });
  };

  useEffect(() => {
    if (item) {
      setHeroForm(item);
    }
  }, [item]);

  const handleCreateHero = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { dataset } = e.target as HTMLFormElement;
    if (dataset.name === "Create") {
      const response = await createHero(heroForm);
      if (response.code === 409) {
        Notiflix.Notify.warning(response.message);
        return;
      }
      if (response.code === 201) {
        setHeroForm({
          nickname: "",
          real_name: "",
          description: "",
          superpowers: "",
          phrase: "",
          images: [],
        });
        updateList();
      }
    } else {
      if (item) {
        let updateHeroForm: any = {};
        Object.entries(item).forEach((el) => {
          Object.entries(heroForm).forEach((it) => {
            if (el[0] === it[0] && el[1] !== it[1]) {
              updateHeroForm = {
                ...updateHeroForm,
                hero_id: item.hero_id,
                [it[0]]: it[1],
              };
            }
          });
        });
        const updateResult = await updateHero(updateHeroForm);
        if (updateResult.code === 200) {
          updateList();
        } else {
          Notiflix.Notify.info(updateResult.message);
        }
      }
    }
  };

  return (
    <Backdrop handleBackdrop={openForm}>
      <div className={componentStyles.containerForm}>
        <p className={componentStyles.titleForm}>Create hero!</p>
        <form
          data-testid="form-for-hero"
          data-name={handleTextButton}
          className={componentStyles.form}
          onSubmit={handleCreateHero}
        >
          <label htmlFor="nickname">Nickname: </label>
          <input
            type="text"
            autoFocus
            id="nickname"
            data-testid="nickname"
            name="hero-nickname"
            placeholder="Hero name"
            value={heroForm.nickname}
            onChange={changeHeroDescription}
          />
          <label htmlFor="real_name">Real name: </label>
          <input
            type="text"
            id="real_name"
            data-testid="real_name"
            value={heroForm.real_name}
            name="hero-real_name"
            placeholder="Real name"
            onChange={changeHeroDescription}
          />
          <label htmlFor="description">Description: </label>
          <textarea
            style={{ resize: "none" }}
            id="description"
            data-testid="description"
            value={heroForm.description}
            placeholder="Write description yout hero"
            name="hero-description:"
            onChange={changeHeroDescription}
          />
          <label htmlFor="superpowers">Superpowers: </label>
          <textarea
            style={{ resize: "none" }}
            id="superpowers"
            data-testid="superpowers"
            name="superpowers"
            value={heroForm.superpowers}
            placeholder="Which is superpowers in hero?"
            onChange={changeHeroDescription}
          />
          <label htmlFor="phrase">Catch phrase: </label>
          <textarea
            autoCorrect="on"
            style={{ resize: "none" }}
            id="phrase"
            data-testid="phrase"
            value={heroForm.phrase}
            placeholder="Catch phrase about hero"
            name="hero-phrase:"
            onChange={changeHeroDescription}
          />
          <input
            type="file"
            id="images"
            data-testid="file"
            multiple
            name="hero-image"
            accept="image/png, image/jpeg"
            onChange={changeHeroDescription}
          />
          <Button
            type="submit"
            text={handleTextButton}
            style={buttonStyles.buttonFormCreate}
            idForTest={handleTextButton}
          />
        </form>
      </div>
    </Backdrop>
  );
};
