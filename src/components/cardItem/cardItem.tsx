import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { deleteHero, getHeroById } from "../../API";
import { createPortal } from "react-dom";
import s from "./cardItem.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import ss from "../button/button.module.css";
import { IItems } from "../../types/Items";
import Form from "../form";
export default function CardItem() {
  const [fullItem, setFullItem] = useState<IItems>();
  const [isOpen, setIsOPen] = useState(false);
  const [handleTextButton, setHandleTextButton] = useState("");
  const [itemForForm, setItemForForm] = useState<IItems>();
  const navigation = useNavigate();
  const { state, pathname } = useLocation();

  const handleUpdateHero = () => {
    if (fullItem) {
      setItemForForm(fullItem);
      setHandleTextButton("Update");
      setIsOPen(!isOpen);
    }
  };

  const handleDeleteHero = async (heroId: number) => {
    const res = await deleteHero(heroId);
    if (res) {
      navigation("/");
    }
  };

  useEffect(() => {
    if (state) {
      setFullItem(state);
      return;
    }
    async function getHero() {
      const response: any = await getHeroById(
        pathname.replace(/\D/g, "").trim()
      );
      if (response) {
        setFullItem(JSON.parse(response.data.data)[0] as IItems);
      }
    }
    getHero();
  }, [pathname, state]);

  const openForm = () => {
    setIsOPen(!isOpen);
  };

  const updateListAfterCreateNewHero = async () => {
    const response: any = await getHeroById(pathname.replace(/\D/g, "").trim());
    if (response) {
      setFullItem(JSON.parse(response.data.data)[0] as IItems);
      setIsOPen(false);
    }
  };
  const formContainer = document.getElementById("backdrop");

  return (
    <>
      {fullItem && (
        <div className={s.heroItemContainer}>
          <div style={{ marginRight: "auto", marginLeft: "auto" }}>
            <span>
              <img
                src={`http://localhost:8080/images/hero/${fullItem.images[0]}`}
                alt="Alisa"
                width={"auto"}
              />
            </span>
            <div className={s.contentContainer}>
              {Object.entries(fullItem).map(([key, value], index) => {
                if (key !== "hero_id" && key !== "images") {
                  return (
                    <p className={s.textDesc}>
                      <span>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                      </span>
                      {value}
                    </p>
                  );
                }
                return "";
              })}
            </div>
          </div>

          <div className={s.buttonContainer}>
            <Button
              text="Update"
              type="submit"
              handleHero={() => handleUpdateHero()}
              style={ss.updateButton}
            />
            <Button
              text="Delete"
              type="submit"
              handleHero={() => handleDeleteHero(fullItem.hero_id!)}
              style={ss.deleteButton}
            />
          </div>
        </div>
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
    </>
  );
}
