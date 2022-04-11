import Widget1 from '../../components/dashboard/widget-1';
import Section from '../../components/dashboard/section';
import SectionTitle from '../../components/dashboard/section-title';
import { Table } from '../../components/tables/tables';
import Spinner from '../../components/spiner';
import * as Icons from '../../components/Icons/index';
import { formatNumber } from '../../functions/numbers';
import url from '../../config/url';
import UseFetcher from '../../components/fetcher/useFetcher';
import Link from 'next/link';

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
  Cell
} from "recharts";
import { App, App2, App3 } from '../pie-charts';

const Index = () => {
  // const { data, isLoading, error } = UseFetcher(
  //   `${url.BASE_URL}user/dashboard`
  // );

  const data = [
    {
      name: "Lokoja",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Okene",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Head office",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Isannlu",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Kabba",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Koto",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Idah",
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: "Ankpa",
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: "Ajaokuta",
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: "Ayingba",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];

  return (
    <>
      <div className="flex">
        <div>
          <BarChart
            width={800}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>
        <div className="flex justify-center">
          <App />
        </div>

        </div>
      </div>
      <div className="flex">
        <div>
          <BarChart
            width={700}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>

        </div>
        <div className="self-center">
          <App2 />
        </div>
      </div>

      <div className="flex">
        <div>
          <BarChart
            width={700}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>

        </div>
        <div className="self-center">
          <App3 />
        </div>
      </div>
      {/* {isLoading && <Spinner />}
      {data?.length > 0 && (
        <>
          <SectionTitle title="Overview" subtitle="Dashboard" />
          <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">

            <div className="w-full lg:w-1/4">
              <Widget1
                color="green"
                title="Total remittance"
                description={formatNumber(data[0].totalRemittance)}
                right={<Icons.TotalRemittance />}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Widget1
                color="red"
                title="Pending Remittance"
                description={formatNumber(data[0].pendingRemittance)}
                right={<Icons.PendingRemittance />}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Widget1
                color="blue"
                title="Revenue Items"
                description={formatNumber(data[0].revenueItems)}
                right={<Icons.RevenueItems />}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Widget1
                color="yellow"
                title="Tax receipts"
                description={formatNumber(data[0].taxReceipts)}
                right={<Icons.TaxReceipt />}
              />
            </div>
          </div>

          <div className="w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <Section title="Recent Remittances">
              <div className="flex flex-col w-full">
                <div className="w-full">
                  <Table recentRemittance={data[0].recentRemittance} />
                </div>
              </div>
            </Section>
          </div>
        </>
      )} */}

    </>
  );
};
export default Index;
