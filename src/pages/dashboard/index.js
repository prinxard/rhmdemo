import SectionTitle from '../../components/dashboard/section-title';
import Widget from '../../components/widget';
import { IconTabs } from "../../components/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { AssesmentCount } from '../../components/rhmdashboard/headoffice';
import { ATOPie } from '../../components/rhmdashboard/ato';


const Index = () => {

  const tabsWithIcons = [
    {
      index: 0,
      title: (
        <>
          <p>All Tax Offices </p>
        </>
      ),
      content: (
        <>
          <div>
            <AssesmentCount />
          </div>
        </>
      ),
    },
    {
      index: 1,
      title: (
        <>
          <p>My Tax Office</p>
        </>
      ),
      content: (
        <>
          <ATOPie />
        </>
      ),
    },
  ];


  return (
    <>
      <SectionTitle subtitle="Dashboard" />
      <Widget>
        <div className="flex justify-center">
          <div className="w-full">
            <IconTabs tabs={tabsWithIcons} />
          </div>
        </div>
      </Widget>
    </>
  );
};
export default Index;
