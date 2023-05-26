import { useState } from "react";
import { createPortal } from "react-dom";
import ss from "../button/button.module.css";
import create from "../../images/plus.svg";
import Button from "../button";
import s from "./form.module.css";
import Backdrop from "../backdrop";
import { IItems } from "../../types/Items";
import { createHero } from "../../API";

export const Form = () => {
  const [isOpen, setIsOPen] = useState(false);
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
        return { ...prevState, [id]: e.target.files as unknown as File[] };
      } else {
        return { ...prevState, [id]: value };
      }
    });
  };

  const handleCreateHero = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createHero(heroForm);
    if (response) {
      setHeroForm({
        nickname: "",
        real_name: "",
        description: "",
        superpowers: "",
        phrase: "",
        images: [],
      });
      setIsOPen(false);
    }
  };

  const openForm = () => {
    setIsOPen(!isOpen);
  };

  const formContainer = document.getElementById("backdrop");
  return (
    <div>
      {isOpen ? (
        createPortal(
          <Backdrop handleBackdrop={openForm}>
            <div className={s.containerForm}>
              <p className={s.titleForm}>Create hero!</p>
              <form className={s.form} onSubmit={handleCreateHero}>
                <label htmlFor="nickname">Nickname: </label>
                <input
                  type="text"
                  autoFocus
                  id="nickname"
                  name="hero-nickname"
                  placeholder="Hero name"
                  onChange={changeHeroDescription}
                />
                <label htmlFor="real_name">Real name: </label>
                <input
                  type="text"
                  id="real_name"
                  name="hero-real_name"
                  placeholder="Real name"
                  onChange={changeHeroDescription}
                />
                <label htmlFor="description">Description: </label>
                <textarea
                  style={{ resize: "none" }}
                  id="description"
                  placeholder="Write description yout hero"
                  name="hero-description:"
                  onChange={changeHeroDescription}
                />
                <label htmlFor="superpowers">Superpowers: </label>
                <textarea
                  style={{ resize: "none" }}
                  id="superpowers"
                  name="superpowers"
                  placeholder="Which is superpowers in hero?"
                  onChange={changeHeroDescription}
                />
                <label htmlFor="phrase">Catch phrase: </label>
                <textarea
                  autoCorrect="on"
                  style={{ resize: "none" }}
                  id="phrase"
                  placeholder="Catch phrase about hero"
                  name="hero-phrase:"
                  onChange={changeHeroDescription}
                />
                <input
                  type="file"
                  id="images"
                  multiple
                  name="hero-image"
                  accept="image/png, image/jpeg"
                  onChange={changeHeroDescription}
                />
                <Button
                  type="submit"
                  // handleHero={createHero}
                  text="Create"
                  style={ss.buttonFormCreate}
                />
              </form>
            </div>
          </Backdrop>,
          formContainer as HTMLElement
        )
      ) : (
        <Button
          text={<img src={create} alt="Plus" />}
          handleHero={openForm}
          style={ss.buttonCreate}
          type="button"
        />
      )}
    </div>
  );
};
