import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s from "./slider.module.css";
import ArrowLeft from "../../images/Arrow-pag-left.svg";
import ArrowRight from "../../images/Arrow-pag-right.svg";
import noFoto from "../../images/noFoto.png";
import { IItems } from "../../types/Items";

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
              <div className={s.box} key={el.hero_id}>
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
                <div className={s.box} key={ind}>
                  <div>
                    <img
                      src={`http://localhost:4040/images/hero/${it}`}
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

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useRef, useEffect } from "react";
// import { IItems } from "../../types/Items";
// import noFoto from "../../images/noFoto.png";
// import s from "./slider.module.css";

// function SampleNextArrow({ props }: any) {
//   const { className, style, onClick } = props;
//   return <div className={className} style={{ ...style }} onClick={onClick} />;
// }

// function SamplePrevArrow(props: any) {
//   const { className, style, onClick } = props;
//   return <div className={className} style={{ ...style }} onClick={onClick} />;
// }
// export default function SimpleSlider({ items }: { items: IItems[] }) {
//   const settings = {
//     // slidesToShow: 1,
//     // slidesToScroll: 1,
//     dots: true,
//     speed: 500,
//     cssEase: "linear",
//     // responsive: [
//     //   {
//     //     breakpoint: 500,
//     //     settings: {
//     //       slidesToShow: 1,
//     //       dots: true,
//     //       speed: 500,
//     //       cssEase: "linear",
//     //     },
//     //   },
//     //   {
//     //     breakpoint: 800,
//     //     settings: {
//     //       slidesToShow: 2,
//     //       dots: true,
//     //       speed: 500,
//     //       cssEase: "linear",
//     //     },
//     //   },
//     //   {
//     //     breakpoint: 1280,
//     //     settings: {
//     //       slidesToShow: 3,
//     //       dots: true,
//     //       speed: 500,
//     //       cssEase: "linear",
//     //     },
//     //   },
//     // ],
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//   };
//   return (
//     <Slider {...settings}>
//       {items.map((el) => {
//         return (
//           <div className={s.box} key={el.hero_id}>
//             {el.images &&
//               el.images.length > 0 &&
//               el.images.map((img) => {
//                 return (
//                   <div>
//                     <img
//                       src={`http://localhost:4040/images/hero/${img}`}
//                       placeholder="blur"
//                       alt="person"
//                       width={500}
//                     />
//                   </div>
//                 );
//               })}
//             {!el.images && (
//               <div>
//                 <img
//                   src={noFoto}
//                   placeholder="blur"
//                   alt="person"
//                   width={300}
//                   height="369"
//                 />
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </Slider>
//   );
// }
