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
  // const [allPageCount, setAllPageCount] = useState<number[]>([]);
  // const [pageCount, setPageCount] = useState<number[]>([1]);

  // useEffect(() => {
  //   const arrForPageCount = [];
  //   const arrCount = [];
  //   if (allPageCount.length === 0) {
  //     // const pageCountStart = items.length / 5;
  //     for (let i = 1; i < items.length + 2; i += 1) {
  //       if (i % 5 === 0) {
  //         arrForPageCount.push(i / 5);
  //         arrCount.push(i / 5);
  //       }
  //       if (i > items.length) {
  //         arrCount.push(arrCount[arrCount.length - 1] + 1);
  //       }
  //     }
  //     setAllPageCount(arrForPageCount);
  //     setPageCount(arrCount);
  //   }
  // }, [items, allPageCount.length]);

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
        // if (pageActive + 1 > pageCount[pageCount.length - 1]) {
        //   count = allPageCount.slice(+id, +id + 5);
        //   setPageCount(count);
        //   return;
        // }
        break;
      case "decrement":
        if (pageActive === 1) {
          return;
        }
        setPageCountCard({ ariaLabel, id });
        setPageActive(+id);

        // if (pageActive - 1 < pageCount[0]) {
        //   count = allPageCount.slice(+id - 6, +id - 1);
        //   setPageCount(count);
        //   return;
        // }
        break;

      default:
        setPageActive(+id);
        // if (+id === allPageCount.length) {
        //   count = allPageCount.slice(
        //     allPageCount[allPageCount.length - 6],
        //     allPageCount[allPageCount.length]
        //   );
        //   setPageCount(count);
        // }
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
