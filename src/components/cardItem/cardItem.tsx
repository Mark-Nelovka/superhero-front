import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { deleteHero, getHeroById } from "../../API";
import Button from "../../components/button";
import { IItems } from "../../types/Items";
import Form from "../form";
import SimpleSlider from "../slider/Slider";
import componentStyles from "./cardItem.module.css";
import buttonStyles from "../button/button.module.css";
import Notiflix from "notiflix";

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
    if (res.code === 200) {
      navigation("/");
    } else {
      Notiflix.Notify.failure(res.message);
    }
  };

  useEffect(() => {
    async function getHero() {
      const response: any = await getHeroById(
        pathname.replace(/\D/g, "").trim()
      );
      if (response.code === 200) {
        setFullItem(JSON.parse(response.data));
      } else {
        Notiflix.Notify.info(response.message);
      }
    }
    getHero();
  }, [pathname, state]);

  const openForm = () => {
    setIsOPen(!isOpen);
  };

  const updateListAfterUpdateHero = async () => {
    const response: any = await getHeroById(pathname.replace(/\D/g, "").trim());
    if (response.code === 200) {
      setFullItem(JSON.parse(response.data));
      setIsOPen(false);
    } else {
      Notiflix.Notify.info(response.data.message);
    }
  };

  const formContainer = document.getElementById("backdrop");
  return (
    <>
      {fullItem && (
        <div className={componentStyles.heroItemContainer}>
          <div style={{ marginRight: "auto", marginLeft: "auto" }}>
            <SimpleSlider items={[fullItem]} />
            <div className={componentStyles.contentContainer}>
              {Object.entries(fullItem).map(([key, value], index) => {
                if (key !== "hero_id" && key !== "images") {
                  return (
                    <p className={componentStyles.textDesc}>
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

          <div className={componentStyles.buttonContainer}>
            <Button
              text="Update"
              type="submit"
              idForTest={"button-update-hero"}
              handleHero={() => handleUpdateHero()}
              style={buttonStyles.updateButton}
            />
            <Button
              text="Delete"
              idForTest={"button-delete-hero"}
              type="submit"
              handleHero={() => handleDeleteHero(fullItem.hero_id!)}
              style={buttonStyles.deleteButton}
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
            updateList={updateListAfterUpdateHero}
          />,
          formContainer as HTMLElement
        )}
    </>
  );
}
