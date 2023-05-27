import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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
    </Suspense>
  );
}

export default App;
