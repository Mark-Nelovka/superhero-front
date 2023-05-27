import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getHeroById } from "../API";
import s from "./card.module.css";
import Button from "../components/button";
import ss from "../button/button.module.css";
import { IItems } from "../types/Items";
import CardItem from "../components/cardItem/cardItem";

export default function HeroPage() {
  return (
    <main>
      <div className="container">
        <CardItem />
      </div>
    </main>
  );
}
