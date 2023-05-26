import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ss from "../button/button.module.css";
import create from "../../images/plus.svg";
import Button from "../button";
import s from "./form.module.css";
import Backdrop from "../backdrop";
import axios from "axios";

export const Form = () => {
  const [isOpen, setIsOPen] = useState(false);
  const [items, setItems] = useState(false);
  const [seeForm, setSeeForm] = useState(false);
  const [image, setImage] = useState(null);
  const [heroForm, setHeroForm] = useState({});

  const changeHeroDescription = (e: any) => {
    setHeroForm((prevState) => {
      if (e.target.id === "image") {
        return { ...prevState, [e.target.id]: e.target.files };
      } else {
        return { ...prevState, [e.target.id]: e.target.value };
      }
    });
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/create", {
  //       headers: {
  //         "Content-Type": "image/jpeg",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(JSON.parse(res.data.data));
  //       // setImage(res.data.images);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const createHero = () => {
    // e.preventDefault();
    // console.log(heroForm.image[0]);
    // const formData = new FormData();
    // if (Object.values(heroForm.image).length > 1) {
    //   Object.values(heroForm.image).forEach((el) =>
    //     formData.append("hero", el)
    //   );
    //   formData.append("description", JSON.stringify(heroForm)); // Добавляем описание картинки
    //   axios
    //     .post("http://localhost:8080/create/list", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((res) => console.log(res))
    //     .catch((error) => console.log(error));
    // } else {
    //   formData.append("hero", heroForm.image[0]);
    //   formData.append("description", JSON.stringify(heroForm)); // Добавляем описание картинки
    //   axios
    //     .post("http://localhost:8080/create/item", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((res) => console.log(res))
    //     .catch((error) => console.log(error));
    // }
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
              <form className={s.form} onSubmit={createHero}>
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
                <label htmlFor="catch_phrase">Catch phrase: </label>
                <textarea
                  autoCorrect="on"
                  style={{ resize: "none" }}
                  id="catch_phrase"
                  placeholder="Catch phrase about hero"
                  name="hero-phrase:"
                  onChange={changeHeroDescription}
                />
                <input
                  type="file"
                  id="image"
                  multiple
                  name="hero-image"
                  accept="image/png, image/jpeg"
                  onChange={changeHeroDescription}
                />
                <Button
                  type="submit"
                  handleHero={createHero}
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
