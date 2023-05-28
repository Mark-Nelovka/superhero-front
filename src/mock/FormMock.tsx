import { useState } from "react";
import Button from "../components/button";
import { IItems } from "../types/Items";

export default function FormMock() {
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
  return (
    <div data-testid="backdrop">
      <div>
        <p>Create hero!</p>
        <form
          data-testid="form-for-hero"
          //   data-name={handleTextButton}
          //   className={s.form}
          //   onSubmit={handleCreateHero}
        >
          <label htmlFor="nickname">Nickname: </label>
          <input
            type="text"
            autoFocus
            id="nickname"
            name="hero-nickname"
            placeholder="Hero name"
            value={heroForm.nickname}
            onChange={changeHeroDescription}
          />
          <label htmlFor="real_name">Real name: </label>
          <input
            type="text"
            id="real_name"
            value={heroForm.real_name}
            name="hero-real_name"
            placeholder="Real name"
            onChange={changeHeroDescription}
          />
          <label htmlFor="description">Description: </label>
          <textarea
            style={{ resize: "none" }}
            id="description"
            value={heroForm.description}
            placeholder="Write description yout hero"
            name="hero-description:"
            onChange={changeHeroDescription}
          />
          <label htmlFor="superpowers">Superpowers: </label>
          <textarea
            style={{ resize: "none" }}
            id="superpowers"
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
            value={heroForm.phrase}
            placeholder="Catch phrase about hero"
            name="hero-phrase:"
          />
          <input
            type="file"
            id="images"
            multiple
            name="hero-image"
            accept="image/png, image/jpeg"
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
