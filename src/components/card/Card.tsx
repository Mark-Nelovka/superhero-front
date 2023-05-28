import Button from "../button";
import s from "./card.module.css";
import create from "../../images/plus.svg";
import ss from "../button/button.module.css";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IItems } from "../../types/Items";
import { deleteHero, getAllHero } from "../../API";
import noFoto from "../../images/noFoto.png";
import Form from "../form";
import Notiflix from "notiflix";
import Pagination from "../pagination";

export const HeroCard = (): JSX.Element => {
  const [isOpen, setIsOPen] = useState(false);
  const [handleTextButton, setHandleTextButton] = useState("");
  const [items, setItems] = useState<IItems[]>([]);
  const [itemForForm, setItemForForm] = useState<IItems>();

  useEffect(() => {
    async function getAllItems() {
      const allItems = await getAllHero(1);

      if (JSON.parse(allItems.data)) {
        setItems(JSON.parse(allItems.data));
      } else {
        Notiflix.Notify.info("Items not found");
      }
    }
    getAllItems();
  }, []);

  const setPageCount = async ({
    ariaLabel,
    id,
  }: {
    ariaLabel: string;
    id: string;
  }): Promise<IItems[]> => {
    const allItems = await getAllHero(+id);
    if (JSON.parse(allItems.data).length > 0) {
      setItems(JSON.parse(allItems.data));
      return JSON.parse(allItems.data);
    }
    return JSON.parse(allItems.data);
  };

  const updateListAfterCreateNewHero = async () => {
    const allItems = await getAllHero(1);
    if (JSON.parse(allItems.data)) {
      setItems(JSON.parse(allItems.data));
      setIsOPen(false);
    } else {
      Notiflix.Notify.failure(allItems.message);
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
    console.log(res);
    if (res) {
      updateListAfterCreateNewHero();
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
    <section className={s.cardSection}>
      <div className="container">
        {items.length === 0 && <h1 className={s.title}>No hero yet</h1>}
        {items && items.length > 0 && (
          <ul className={s.heroList}>
            {items.map((el) => {
              return (
                <li key={el.hero_id} className={s.heroItem} id="card">
                  <Link key={el.hero_id} to={`${el.hero_id}`} state={el}>
                    <span>
                      {el.images ? (
                        <img
                          src={`http://localhost:4040/images/hero/${el.images[0]}`}
                          alt="Alisa"
                          width={100 + "%"}
                        />
                      ) : (
                        <img src={noFoto} alt="Alisa" width={100 + "%"} />
                      )}
                    </span>
                  </Link>
                  <div className={s.contentContainer}>
                    <p>{el.nickname}</p>

                    <div className={s.buttonContainer}>
                      <Button
                        text="Update"
                        type="submit"
                        handleHero={() => handleUpdateHero(el.hero_id!)}
                        style={ss.updateButton}
                      />
                      <Button
                        text="Delete"
                        type="submit"
                        handleHero={() => handleDeleteHero(el.hero_id!)}
                        style={ss.deleteButton}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

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
        <Button
          text={<img src={create} alt="Plus" />}
          handleHero={openForm}
          style={ss.buttonCreate}
          type="button"
        />
        <Pagination items={items} setPageCountCard={setPageCount} />
      </div>
    </section>
  );
};
