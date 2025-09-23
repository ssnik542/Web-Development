import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import Barchart from "../components/Barchart";
import { BiMaleFemale } from "react-icons/bi";
import DoughnutChart from "../components/DoughnutChart";
import Table from "../components/DashboardTable";
type CatProps = {
  color: string;
  title: string;
  value: number;
};
const CategoryItem = ({ color, title, value }: CatProps) => {
  return (
    <div className="items">
      <h5>{title}</h5>
      <div>
        <div
          style={{
            backgroundColor: color,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <span>{value}%</span>
    </div>
  );
};

function Dashboard() {
  return (
    <main className="dashboard">
      <div className="bar">
        <BsSearch />
        <input type="text" placeholder="Search for data,users,docs" />
        <FaRegBell />
        <img
          src="https://th.bing.com/th/id/R.c11b6f38dffc24a4508217513b0e50bd?rik=Pt%2bkITlukiMkWg&riu=http%3a%2f%2fwww.emmegi.co.uk%2fwp-content%2fuploads%2f2019%2f01%2fUser-Icon.jpg&ehk=zjS04fF4nxx%2bpkvRPsSezyic3Z7Yfu%2fuoT75KnbNv1Y%3d&risl=&pid=ImgRaw&r=0"
          alt="user"
        />
      </div>

      <div className="widget-container">
        <WidgetItem
          title="Revenue"
          value={50}
          percentage={32}
          color="blue"
          amount={true}
        />
        <WidgetItem
          title="Users"
          value={219}
          percentage={-60}
          color="rgb(254, 219, 76)"
        />
        <WidgetItem
          title="Transactions"
          value={150}
          percentage={14}
          color="rgb(247, 97, 239)"
        />
        <WidgetItem
          title="Products"
          value={550}
          percentage={10}
          color="rgb(0, 219, 76)"
        />
      </div>

      <section className="graph-container">
        <div className="renue-chart">
          <h2>Revenue & Transaction</h2>
          <Barchart
            title_1="Revenue"
            title_2="Transaction"
            data_1={[300, 400, 500, 487, 23, 755, 123]}
            data_2={[147, 258, 369, 741, 852, 963, 453]}
            bgColor1="rgb(0 115 255)"
            bgColor2="rgb(53 162 235)"
          />
        </div>
        <div className="dashboard-catgories">
          <h2>Inventory</h2>
          <div>
            <CategoryItem color="rgb(100 100 200)" value={70} title="Laptops" />
            <CategoryItem color="rgba(48 246 32)" value={10} title="Shoes" />
            <CategoryItem color="rgb(144 25 36)" value={7} title="Camera" />
            <CategoryItem color="rgb(105 24 78)" value={50} title="Jeans" />
          </div>
        </div>
      </section>

      <section className="transaction-container">
        <div className="gender-chart">
          <h2>Gender Ratio</h2>
          <DoughnutChart
            labels={["male", "female"]}
            dataa={[12, 19]}
            bgColor={["rgb(0, 153, 255,0.6)", "rgba(255, 0, 187,0.6)"]}
            cutout={90}
          />
          <p>
            <BiMaleFemale />
          </p>
        </div>
        <Table data={Trans} />
      </section>
    </main>
  );
}

interface WdProps {
  title: string;
  value: number;
  percentage: number;
  color: string;
  amount?: boolean;
}
const WidgetItem = ({
  title,
  value,
  percentage,
  color,
  amount = false,
}: WdProps) => {
  return (
    <article className="widget">
      <div className="widgetInfo">
        <p>{title}</p>
        <h4>{amount ? `$${value}` : value}</h4>
        {percentage > 0 ? (
          <span className="green">
            <HiTrendingUp /> +{percentage}%{" "}
          </span>
        ) : (
          <span className="red">
            <HiTrendingDown /> {percentage}%{" "}
          </span>
        )}
      </div>
      <div
        className="widgetCircle"
        style={{
          backgroundImage: `conic-gradient(
          ${color} ${(Math.abs(percentage) / 100) * 360}deg,
          rgb(255,255,255) 0
        )`,
        }}
      >
        <span style={{ color: `${color}` }}>{percentage}%</span>
      </div>
    </article>
  );
};

const Trans = [
  {
    id: "ksdnfkjsdfx",
    amount: 4000,
    quantity: 4,
    discount: 300,
    status: "Processing",
  },
  {
    id: "sdsdssdsd",
    amount: 5100,
    quantity: 2,
    discount: 900,
    status: "Processing",
  },
  {
    id: "sdsdcvsssdsd",
    amount: 13000,
    quantity: 91,
    discount: 0,
    status: "Shipped",
  },
  {
    id: "dfddddfd",
    amount: 2300,
    quantity: 4,
    discount: 2000,
    status: "Processing",
  },
];
export default Dashboard;
