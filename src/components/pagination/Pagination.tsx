import s from "./pagination.module.css";
import { useEffect, useState } from "react";
import Notiflix from "notiflix";
import ArrowLeft from "../../images/Arrow-pag-left.svg";
import ArrowRight from "../../images/Arrow-pag-right.svg";
import { IItems } from "../../types/Items";

export const Pagination = ({
  items,
  setPageCountCard,
}: {
  items: IItems[];
  setPageCountCard: ({
    ariaLabel,
    id,
  }: {
    ariaLabel: string;
    id: string;
  }) => Promise<IItems[]>;
}) => {
  const [pageActive, setPageActive] = useState(1);
  const [allPageCount, setAllPageCount] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState<number[]>([]);

  useEffect(() => {
    const arrForPageCount = [];
    if (allPageCount.length === 0) {
      for (let i = 1; i < items.length + 1; i += 1) {
        arrForPageCount.push(i);
      }
      setAllPageCount(arrForPageCount);
      setPageCount(arrForPageCount.slice(0, 5));
    }
  }, [items, allPageCount.length]);

  const setPage = async (event: React.MouseEvent) => {
    const { ariaLabel, id } = event.currentTarget as HTMLButtonElement;
    let count = null;

    switch (ariaLabel) {
      case "increment":
        const newItemsForPage = await setPageCountCard({ ariaLabel, id });
        if (newItemsForPage.length === 0) {
          Notiflix.Notify.info("This page is last");
          return;
        }
        await setPageCountCard({ ariaLabel, id });
        setPageActive(+id);
        if (pageActive + 1 > pageCount[pageCount.length - 1]) {
          count = allPageCount.slice(+id, +id + 5);
          setPageCount(count);
          return;
        }
        break;
      case "decrement":
        if (pageActive === 1) {
          return;
        }
        setPageCountCard({ ariaLabel, id });
        setPageActive(+id);
        if (pageActive - 1 < pageCount[0]) {
          count = allPageCount.slice(+id - 6, +id - 1);
          setPageCount(count);
          return;
        }
        break;

      default:
        setPageActive(+id);
        if (+id === allPageCount.length) {
          count = allPageCount.slice(
            allPageCount[allPageCount.length - 6],
            allPageCount[allPageCount.length]
          );
          setPageCount(count);
        }
        break;
    }
  };

  return (
    <section data-testid="pagination">
      <div className={s.paginationContainer}>
        <button
          onClick={setPage}
          className={s.paginationArrowLeftButton}
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
        <ul className={s.paginationNumberList}>
          {pageCount.map((pageNumber, inx) => {
            return (
              <li
                key={inx}
                onClick={setPage}
                id={String(pageNumber)}
                aria-label={pageNumber > pageActive ? "increment" : "decrement"}
                className={
                  pageActive === pageNumber
                    ? s.paginationNumberListItemActive
                    : s.paginationNumberListItem
                }
              >
                {pageNumber}
              </li>
            );
          })}
          {!pageCount.includes(allPageCount[allPageCount.length - 3]) && (
            <>
              <li>
                {pageCount.includes(allPageCount[allPageCount.length - 3])
                  ? items.length - 1
                  : "..."}
              </li>
              <li
                id={String(allPageCount.length)}
                className={
                  pageActive === allPageCount.length
                    ? s.paginationNumberListItemActive
                    : s.paginationNumberListItem
                }
                onClick={setPage}
              >
                {allPageCount.length}
              </li>
            </>
          )}
        </ul>
        <button
          onClick={setPage}
          className={s.paginationArrowRightButton}
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
