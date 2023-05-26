import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import s from "./components/button/button.module.css";
import Form from "./components/form";
import create from "./images/plus.svg";
import HomePage from "./pages/HomePage";

const HeroPage = lazy(
  () => import("./pages/HeroPage" /* webpackChunkName: "HeroPage" */)
);
const ErrorPage = lazy(
  () => import("./pages/ErrorPage" /* webpackChunkName: "ErrorPage" */)
);

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:heroname" element={<HeroPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Form />
    </Suspense>
  );
}

export default App;
