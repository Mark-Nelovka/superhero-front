import i from "../../test.jpeg";
import im from "../../Sup.jpeg";
import Button from "../button";
import s from "./card.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IItems } from "../../types/Items";

export const HeroCard = () => {
  const navigation = useNavigate();
  const [items, setItems] = useState<IItems[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/create", {
        headers: {
          "Content-Type": "image/jpeg",
        },
      })
      .then((res) => {
        console.log(JSON.parse(res.data.data));
        setItems(JSON.parse(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdateHero = () => {
    console.log("Update");
  };

  const handleDeleteHero = () => {
    console.log("Delete");
  };

  return (
    <ul className={s.heroList}>
      {items &&
        items.length > 0 &&
        items.map((el) => {
          console.log(el);
          return <li>{el.nickname}</li>;
        })}
      {/* <li
        className={s.heroItem}
        onClick={() => navigation("/name", { state: "name" })}
      >
        <span>
          <img src={i} alt="Alisa" height={250} width={100 + "%"} />
        </span>
        <div className={s.contentContainer}>
          <p>Superman</p>
          <div className={s.buttonContainer}>
            <Button
              text="Update"
              type="submit"
              handleHero={handleUpdateHero}
              style={s.updateButton}
            />
            <Button
              text="Delete"
              type="submit"
              handleHero={handleDeleteHero}
              style={s.deleteButton}
            />
          </div>
        </div>
      </li> */}
    </ul>
  );
};
