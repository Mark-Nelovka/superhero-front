import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroCard from "../components/card";

export default function HeroPage() {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <main>
      <div className="container">
        {/* <HeroCard /> */}
        Hero
      </div>
    </main>
  );
}
