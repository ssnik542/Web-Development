import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon2Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside>
      <h2>Logo.</h2>
      <div>
        <h5>Dashboard</h5>
        <ul>
          <Li
            url="/admin/dashboard"
            text="dashboard"
            location={location}
            Icon={RiDashboardFill}
          />
          <Li
            url="/admin/products"
            text="Products"
            location={location}
            Icon={RiShoppingBag3Fill}
          />
          <Li
            url="/admin/customers"
            text="Customers"
            location={location}
            Icon={IoIosPeople}
          />
          <Li
            url="/admin/transaction"
            text="Transaction"
            location={location}
            Icon={AiFillFileText}
          />
        </ul>
      </div>
      <div>
        <h5>Charts</h5>
        <ul>
          <Li
            url="/admin/bar"
            text="Bar"
            location={location}
            Icon={FaChartBar}
          />
          <Li
            url="/admin/pie"
            text="Pie"
            location={location}
            Icon={FaChartPie}
          />
          <Li
            url="/admin/line"
            text="Line"
            location={location}
            Icon={FaChartLine}
          />
        </ul>
      </div>
      <div>
        <h5>Apps</h5>
        <ul>
          <Li
            url="/admin/stopwatch"
            text="Stopwatch"
            location={location}
            Icon={FaStopwatch}
          />
          <Li
            url="/admin/coupon"
            text="Coupon"
            location={location}
            Icon={RiCoupon2Fill}
          />
          <Li
            url="/admin/toss"
            text="Toss"
            location={location}
            Icon={FaGamepad}
          />
        </ul>
      </div>
    </aside>
  );
}

const Li = ({ url, text, location, Icon }: LiProps) => {
  return (
    <li
      style={{
        backgroundColor: location.pathname.includes(url)
          ? "rgba(0,115,255,0.1) "
          : "white",
      }}
    >
      <Link
        to={url}
        style={{
          color: location.pathname.includes(url) ? "rgba(0,115,255) " : "black",
        }}
      >
        <Icon />
        {text}
      </Link>
    </li>
  );
};
