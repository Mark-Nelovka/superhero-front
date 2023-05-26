import i from "../../test.jpeg";
import im from "../../Sup.jpeg";
import Button from "../button";
import s from "./card.module.css";
import { useNavigate } from "react-router-dom";

export const HeroCard = () => {
  const navigation = useNavigate();
  const handleUpdateHero = () => {
    console.log("Update");
  };

  const handleDeleteHero = () => {
    console.log("Delete");
  };

  return (
    <ul className={s.heroList}>
      <li
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
      </li>
      <li className={s.heroItem}>
        <span>
          <img src={im} alt="Alisa" height={250} width={100 + "%"} />
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
              type="submit"
              text="Delete"
              handleHero={handleDeleteHero}
              style={s.deleteButton}
            />
          </div>
        </div>
      </li>
      <li className={s.heroItem}>
        <span>
          <img src={i} alt="Alisa" />
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
      </li>
      <li className={s.heroItem}>
        <span>
          <img src={i} alt="Alisa" />
        </span>
        <div className={s.contentContainer}>
          <p>Superman</p>
          <div className={s.buttonContainer}>
            <Button
              text="Update"
              handleHero={handleUpdateHero}
              style={s.updateButton}
              type="submit"
            />
            <Button
              type="submit"
              text="Delete"
              handleHero={handleDeleteHero}
              style={s.deleteButton}
            />
          </div>
        </div>
      </li>
    </ul>
  );
};
