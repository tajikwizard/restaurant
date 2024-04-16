import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
const Header = () => {
  return (
    <header className="h-20 flex justify-between items-center">
      <div className="logo__container ">
        <Link to="/">
          <img src={logo} className="h-20" />
        </Link>
      </div>
      <ul className="flex justify-between text-2xl mx-8">
        <li className="p-2 hover:text-yellow-500 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="p-2 hover:text-yellow-500 cursor-pointer">About</li>
        <li className="p-2 hover:text-yellow-500 cursor-pointer">Contact</li>
        <li className="p-2 hover:text-yellow-500 cursor-pointer">Address</li>
      </ul>
    </header>
  );
};
export default Header;
