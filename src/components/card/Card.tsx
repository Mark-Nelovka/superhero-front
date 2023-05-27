import Button from "../button";
import s from "./card.module.css";
import create from "../../images/plus.svg";
import ss from "../button/button.module.css";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IItems } from "../../types/Items";
import { deleteHero, getAllHero } from "../../API";
import Form from "../form";

export const HeroCard = (): JSX.Element => {
  const navigation = useNavigate();
  const [isOpen, setIsOPen] = useState(false);
  const [handleTextButton, setHandleTextButton] = useState("");
  const [items, setItems] = useState<IItems[]>([]);
  const [itemForForm, setItemForForm] = useState<IItems>();

  useEffect(() => {
    async function getAllItems() {
      const allItems = await getAllHero();
      if (allItems) {
        setItems(allItems);
      }
    }
    getAllItems();
  }, []);

  const updateListAfterCreateNewHero = async () => {
    const allItems = await getAllHero();
    if (allItems) {
      setItems(allItems);
    }
  };

  const handleUpdateHero = (heroId: number) => {
    const item = items.find((el) => el.hero_id === heroId);
    if (item) {
      setItemForForm(item);
      setHandleTextButton("Update");
      setIsOPen(!isOpen);
    }
  };

  const handleDeleteHero = async (heroId: number) => {
    const res = await deleteHero(heroId);
    updateListAfterCreateNewHero();
  };

  const openCard = (e: React.MouseEvent) => {
    const { id } = e.target as HTMLLIElement;
    if (id === "card") {
      navigation("/name", { state: "name" });
    }
  };

  const openForm = () => {
    setIsOPen(!isOpen);
    setItemForForm({
      nickname: "",
      real_name: "",
      description: "",
      superpowers: "",
      phrase: "",
      images: [],
    });
    setHandleTextButton("Create");
  };

  const formContainer = document.getElementById("backdrop");
  return (
    <>
      <ul className={s.heroList}>
        {items &&
          items.length > 0 &&
          items.map((el, index) => {
            return (
              <li
                key={el.hero_id}
                className={s.heroItem}
                id="card"
                onClick={openCard}
              >
                <span>
                  <img
                    src={`http://localhost:8080/images/hero/${el.images[0]}`}
                    alt="Alisa"
                    height={250}
                    width={100 + "%"}
                  />
                </span>
                <div className={s.contentContainer}>
                  <p>{el.nickname}</p>
                  <div className={s.buttonContainer}>
                    <Button
                      text="Update"
                      type="submit"
                      handleHero={() => handleUpdateHero(el.hero_id!)}
                      style={s.updateButton}
                    />
                    <Button
                      text="Delete"
                      type="submit"
                      handleHero={() => handleDeleteHero(el.hero_id!)}
                      style={s.deleteButton}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        <Button
          text={<img src={create} alt="Plus" />}
          handleHero={openForm}
          style={ss.buttonCreate}
          type="button"
        />
      </ul>
      {isOpen &&
        createPortal(
          <Form
            openForm={openForm}
            item={itemForForm}
            handleTextButton={handleTextButton}
            updateList={updateListAfterCreateNewHero}
          />,
          formContainer as HTMLElement
        )}
    </>
  );
};
