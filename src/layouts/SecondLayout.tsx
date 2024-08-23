import { Outlet } from "react-router-dom";
import HeaderSecond from "../components/Header/HeaderSecond";
import FooterSecond from "../components/Footer/FooterSecond";

const SecondLayout = () => {
  return (
    <div>
      <HeaderSecond />
      <Outlet></Outlet>
      <FooterSecond />
    </div>
  );
};

export default SecondLayout;
