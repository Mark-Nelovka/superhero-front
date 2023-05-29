import { useState } from "react";
import Notiflix from "notiflix";
import ArrowLeft from "../../images/Arrow-pag-left.svg";
import ArrowRight from "../../images/Arrow-pag-right.svg";
import { IItems } from "../../types/Items";
import componentStyles from "./pagination.module.css";

interface IPagination {
  items: IItems[];
  setPageCountCard: ({
    ariaLabel,
    id,
  }: {
    ariaLabel: string;
    id: string;
  }) => Promise<IItems[]>;
}

export const Pagination = ({ items, setPageCountCard }: IPagination) => {
  const [pageActive, setPageActive] = useState(1);

  const setPage = async (event: React.MouseEvent) => {
    const { ariaLabel, id } = event.currentTarget as HTMLButtonElement;
    // let count = null;

    switch (ariaLabel) {
      case "increment":
        const newItemsForPage = await setPageCountCard({ ariaLabel, id });
        if (newItemsForPage.length === 0) {
          Notiflix.Notify.info("This page is last");
          return;
        }
        await setPageCountCard({ ariaLabel, id });
        setPageActive(+id);
        break;
      case "decrement":
        if (pageActive === 1) {
          return;
        }
        setPageCountCard({ ariaLabel, id });
        setPageActive(+id);
        break;

      default:
        setPageActive(+id);
        break;
    }
  };

  return (
    <section data-testid="pagination">
      <div className={componentStyles.paginationContainer}>
        <button
          onClick={setPage}
          className={componentStyles.paginationArrowLeftButton}
          aria-label="decrement"
          id={String(pageActive - 1)}
        >
          <img
            src={ArrowLeft}
            alt="arrow left"
            width="14"
            height="18"
            id={String(pageActive)}
          />
        </button>
        <div className={componentStyles.paginationSeparator}></div>
        <button
          onClick={setPage}
          className={componentStyles.paginationArrowRightButton}
          id={String(pageActive + 1)}
          aria-label="increment"
        >
          <img
            src={ArrowRight}
            id={String(pageActive)}
            alt="arrow right"
            data-testid="pagination-arrow-right"
            width="14"
            height="18"
          />
        </button>
      </div>
    </section>
  );
};
