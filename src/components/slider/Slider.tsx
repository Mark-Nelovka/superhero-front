import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeft from "../../images/Arrow-pag-left.svg";
import ArrowRight from "../../images/Arrow-pag-right.svg";
import { IItems } from "../../types/Items";
import noFoto from "../../images/noFoto.png";
import componentStyles from "./slider.module.css";
import { PATH_BACKEND } from "../../constants";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <img src={ArrowRight} alt="Right" />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <img src={ArrowLeft} alt="Left" />
    </div>
  );
}
export default function SimpleSlider({ items }: { items: IItems[] }) {
  const settings = {
    slidesToShow: 1,
    speed: 500,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Slider {...settings}>
      {items &&
        items.length > 0 &&
        items.map((el) => {
          if (!el.images || el.images.length === 0) {
            return (
              <div className={componentStyles.box} key={el.hero_id}>
                <div>
                  <img
                    style={{ margin: "0 auto" }}
                    src={noFoto}
                    placeholder="blur"
                    alt="person"
                    width={"auto"}
                  />
                </div>
              </div>
            );
          } else {
            return el.images.map((it, ind) => {
              return (
                <div className={componentStyles.box} key={ind}>
                  <div>
                    <img
                      src={`${PATH_BACKEND}/images/hero/${it}`}
                      placeholder="blur"
                      alt="person"
                      width={"auto"}
                    />
                  </div>
                </div>
              );
            });
          }
        })}
    </Slider>
  );
}
