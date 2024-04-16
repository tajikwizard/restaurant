import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import "./index.css";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}
