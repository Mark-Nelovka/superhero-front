// import React, { ReactElement } from "react";
// import { render, RenderOptions } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";

// const GlobalProvidersForTests = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   return (
//         <BrowserRouter>{children}</BrowserRouter>
//   );
// };

// const customRender = (
//   ui: ReactElement,
//   options?: Omit<RenderOptions, "wrapper">
// ) => render(ui, { wrapper: GlobalProvidersForTests, ...options });

// export * from "@testing-library/react";
// export { customRender as render };