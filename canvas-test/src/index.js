import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// fabric object 선택이 되지 않는 문제
// https://velog.io/@pixelstudio/%EA%B0%9C%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A4%91-%EB%AC%B8%EC%A0%9C%EB%90%AC%EC%97%88%EB%8D%98-React.StrictMode

reportWebVitals();
