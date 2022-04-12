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
  Cell,
  ResponsiveContainer
} from "recharts";
import { App, App2, App3 } from '../pie-charts';
import Widget from '../../components/widget';

const Index = () => {
  // const { data, isLoading, error } = UseFetcher(
  //   `${url.BASE_URL}user/dashboard`
  // );

  const data = [
    {
      name: "Lokoja",
      submitted: 4000,
      approved: 2400,
      amt: 2400
    },
    {
      name: "Okene",
      submitted: 3000,
      approved: 1398,
      amt: 2210
    },
    {
      name: "Head office",
      submitted: 2000,
      approved: 9800,
      amt: 2290
    },
    {
      name: "Isannlu",
      submitted: 2780,
      approved: 3908,
      amt: 2000
    },
    {
      name: "Kabba",
      submitted: 1890,
      approved: 4800,
      amt: 2181
    },
    {
      name: "Koto",
      submitted: 2390,
      approved: 3800,
      amt: 2500
    },
    {
      name: "Idah",
      submitted: 3490,
      approved: 4300,
      amt: 2100
    },
    {
      name: "Ankpa",
      submitted: 3490,
      approved: 4300,
      amt: 2100
    },
    {
      name: "Ajaokuta",
      submitted: 3490,
      approved: 4300,
      amt: 2100
    },
    {
      name: "Ayingba",
      submitted: 3490,
      approved: 4300,
      amt: 2100
    }
  ];
  const data2 = [
    {
      name: "Lokoja",
      submitted: 4000,
      approved: 2400,
      amt: 2400
    },
    {
      name: "Okene",
      submitted: 3000,
      approved: 1398,
      amt: 2210
    },
    {
      name: "Head office",
      submitted: 2000,
      approved: 9800,
      amt: 2290
    },
    {
      name: "Isannlu",
      submitted: 2780,
      approved: 3908,
      amt: 2000
    },
    {
      name: "Kabba",
      submitted: 1890,
      approved: 4800,
      amt: 2181
    },
    {
      name: "Koto",
      submitted: 2390,
      approved: 3800,
      amt: 2500
    },
    {
      name: "Idah",
      submitted: 3490,
      approved: 4300,
      amt: 2100
    },
    {
      name: "Ankpa",
      submitted: 3490,
      approved: 4300,
      amt: 2100
    },
    {
      name: "Ajaokuta",
      submitted: 3490,
      approved: 4300,
      amt: 2100
    },
    {
      name: "Ayingba",
      submitted: 3490,
      approved: 4300,
      amt: 2100
    }
  ];

  const data3 = [
    {
      name: "Lokoja",
      assessed: 4000,
      collected: 2400,
      outstanding: 1400,
      unassessed: 2400,
      amt: 2400
    },
    {
      name: "Okene",
      assessed: 3000,
      collected: 1398,
      outstanding: 2998,
      unassessed: 1398,
      amt: 2210
    },
    {
      name: "Head office",
      assessed: 2000,
      collected: 9800,
      outstanding: 9900,
      unassessed: 9800,
      amt: 2290
    },
    {
      name: "Isannlu",
      ass: 2780,
      assessed: 3908,
      collected: 3908,
      outstanding: 3908,
      unassessed: 3908,
      amt: 2000
    },
    {
      name: "Kabba",
      assessed: 1890,
      collected: 4800,
      outstanding: 4800,
      unassessed: 4800,
      amt: 2181
    },
    {
      name: "Koto",
      assessed: 2390,
      collected: 3800,
      outstanding: 4800,
      unassessed: 3800,
      amt: 2500
    },
    {
      name: "Idah",
      assessed: 3490,
      collected: 4300,
      outstanding: 5300,
      unassessed: 4300,
      amt: 2100
    },
    {
      name: "Ankpa",
      assessed: 3490,
      collected: 4300,
      outstanding: 2300,
      unassessed: 4300,
      amt: 2100
    },
    {
      name: "Ajaokuta",
      assessed: 3490,
      collected: 4300,
      outstanding: 5300,
      unassessed: 4300,
      amt: 2100
    },
    {
      name: "Ayingba",
      assessed: 3490,
      collected: 4300,
      outstanding: 6300,
      unassessed: 4300,
      amt: 2100
    }
  ];

  return (
    <>
      <Widget>
        <SectionTitle subtitle="Assessment Count" />
        <div className="flex">
          <div>
            <ResponsiveContainer>
              <BarChart
                width={800}
                height={400}
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
                <Bar dataKey="submitted" stackId="a" fill="#8884d8" />
                <Bar dataKey="approved" stackId="a" fill="#82ca9d" />
              </BarChart>
              <App />
            </ResponsiveContainer>

            <div className="flex justify-end mt-10">
              <div>
                <p className="font-bold">Cummulative Assessment</p>
                <App />
              </div>
            </div>

          </div>
        </div>
      </Widget>

      <Widget>
        <SectionTitle subtitle="Amount Assessed" />
        <div className="flex">
          <div>
            <BarChart
              width={800}
              height={400}
              data={data2}
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
              <Bar dataKey="submitted" stackId="a" fill="#8884d8" />
              <Bar dataKey="approved" stackId="a" fill="#82ca9d" />
            </BarChart>
            <div className="flex justify-end mt-10">
              <div>
                <p className="font-bold">Cummulative Assessment</p>
                <App2 />
              </div>
            </div>

          </div>
        </div>
      </Widget>

      <Widget>
        <SectionTitle subtitle="Collection Performance" />
        <div className="flex">
          <div>
            <BarChart
              width={800}
              height={400}
              data={data3}
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
              <Bar dataKey="assessed" stackId="a" fill="#8884d8" />
              <Bar dataKey="collected" stackId="a" fill="#82ca9d" />
              <Bar dataKey="oustanding" stackId="a" fill="C900BF" />
              <Bar dataKey="unassessed" stackId="a" fill="#12cc1d" />
            </BarChart>
            <div className="flex justify-end mt-10">
              <App3 />
            </div>
          </div>
        </div>

      </Widget>
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
