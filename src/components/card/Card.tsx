import Button from "../button";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Notiflix from "notiflix";
import { deleteHero, getAllHero } from "../../API";
import Form from "../form";
import Pagination from "../pagination";
import { IItems } from "../../types/Items";
import noFoto from "../../images/noFoto.png";
import create from "../../images/plus.svg";
import componentStyles from "./card.module.css";
import buttonStyle from "../button/button.module.css";
import { PATH_BACKEND } from "../../constants";

export const HeroCard = (): JSX.Element => {
  const [isOpen, setIsOPen] = useState(false);
  const [handleTextButton, setHandleTextButton] = useState("");
  const [items, setItems] = useState<IItems[]>([]);
  const [itemForForm, setItemForForm] = useState<IItems>();

  useEffect(() => {
    async function getAllItems() {
      const allItems = await getAllHero(1);
      if (allItems.code === 200) {
        setItems(JSON.parse(allItems.data));
      } else {
        Notiflix.Notify.info(allItems.message);
      }
    }
    if (items.length === 0) {
      getAllItems();
    }
  }, [items]);

  const setPageCount = async ({ id }: { id: string }): Promise<IItems[]> => {
    const allItems = await getAllHero(+id);
    if (allItems.code === 200 && JSON.parse(allItems.data).length !== 0) {
      setItems(JSON.parse(allItems.data));
      return JSON.parse(allItems.data);
    }
    return JSON.parse(allItems.data);
  };

  const updateListAfterCreateHero = async () => {
    const allItems = await getAllHero(1);
    if (allItems.code === 200) {
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
    if (res.code === 200) {
      updateListAfterCreateHero();
    } else {
      Notiflix.Notify.failure(res.message);
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
      <section className={componentStyles.cardSection}>
        <div className="container">
          {items.length === 0 && (
            <h1 className={componentStyles.title}>No hero yet</h1>
          )}
          {items && items.length > 0 && (
            <ul className={componentStyles.heroList}>
              {items.map((el) => {
                return (
                  <li
                    key={el.hero_id}
                    className={componentStyles.heroItem}
                    id="card"
                  >
                    <Link key={el.hero_id} to={`${el.hero_id}`} state={el}>
                      <span>
                        {el.images ? (
                          <img
                            src={`${PATH_BACKEND}/images/hero/${el.images[0]}`}
                            alt="Hero item"
                            width={100 + "%"}
                          />
                        ) : (
                          <img
                            src={noFoto}
                            alt="Foto not yet"
                            width={100 + "%"}
                          />
                        )}
                      </span>
                    </Link>
                    <div className={componentStyles.contentContainer}>
                      <p data-testid="title-card">{el.nickname}</p>
                      <div className={componentStyles.buttonContainer}>
                        <Button
                          text="Update"
                          type="submit"
                          handleHero={() => handleUpdateHero(el.hero_id!)}
                          style={buttonStyle.updateButton}
                          idForTest={"button-update-hero"}
                        />
                        <Button
                          text="Delete"
                          type="submit"
                          handleHero={() => handleDeleteHero(el.hero_id!)}
                          style={buttonStyle.deleteButton}
                          idForTest={"button-delete-hero"}
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
                updateList={updateListAfterCreateHero}
              />,
              formContainer as HTMLElement
            )}
          <Button
            text={<img src={create} alt="Plus" />}
            handleHero={openForm}
            style={buttonStyle.buttonCreate}
            type="button"
            idForTest={"button-open-form"}
          />
        </div>
      </section>
      <Pagination items={items} setPageCountCard={setPageCount} />
    </>
  );
};
