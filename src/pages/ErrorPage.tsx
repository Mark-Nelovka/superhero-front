import ErrorImage from "../images/Error.jpeg";

export default function ErrorPage() {
  return (
    <section className="errorSection">
      <div className="container">
        <div className="errorPageContainer">
          <span>
            <img
              src={ErrorImage}
              alt="Error message: Ooops, something went wrong. Please try again later"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
