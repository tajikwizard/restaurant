import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import "./index.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export function App() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="app">
      <Header />
      <div className=" shadow-sm scroll-indicator fixed top-20 left-0 w-full bg-gray-50 h-1 z-10 ">
        <div
          className="indicator bg-blue-500 h-full"
          style={{
            width: `${
              (scroll / (document.body.scrollHeight - window.innerHeight)) * 100
            }%`,
          }}
        ></div>
      </div>
      <Outlet />
    </div>
  );
}
