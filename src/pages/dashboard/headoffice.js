
import React from "react";
import Section from "../../components/dashboard/section";
import { PieChart, Pie, Cell } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import { formatNumber } from "accounting";

const dataCount = [
  {
    name: "Lokoja",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Head Office",
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
    name: "Isanlu",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Kabba",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Idah",
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

const amountAssessed = [
  {
    name: "Lokoja",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Head Office",
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
    name: "Isanlu",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Kabba",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Idah",
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

const colPerform = [
  {
    name: "Lokoja",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Head Office",
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
    name: "Isanlu",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Kabba",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Idah",
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

const dataCummCount = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index

}) => {

  // const RADIAN = Math.PI / 180;
  // eslint-disable-next-line
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  // eslint-disable-next-line
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  // eslint-disable-next-line
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  // const x = cx + radius * Math.cos(-midAngle * RADIAN);
  // const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="blue"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {dataCummCount[index].name}

      {/* {`${(percent * 100).toFixed(0)}%`} */}
    </text>
  );
};

const dataCummPerf = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 }
];


export const CountPie = () => {
  return (
    <PieChart width={800} height={300}>
      <Pie
        data={dataCummCount}
        cx={200}
        cy={150}
        // labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {dataCummCount.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export const PerfPie = () => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={dataCummPerf}
        cx={200}
        cy={150}
        // labelLine={true}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {dataCummCount.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export const AssesmentCount = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-3/3">
          <Section
            // title="Conversions"
            description={<span>Assessment count</span>}
          >
            <div className="flex flex-row w-full">
              {/* <Bar1 /> */}
              <BarChart
                width={800}
                height={300}
                data={dataCount}
                stackOffset="sign"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              // barGap={20}
              // barSize={0}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="pv" fill="#8884d8" stackId="stack" />
                <Bar dataKey="uv" fill="#82ca9d" stackId="stack" />
              </BarChart>
            </div>
          </Section>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-3/3">
          <Section
            // title="Conversions"
            description={<span>Amount Assessed</span>}
          >
            <div className="flex flex-row w-full">
              {/* <Bar1 /> */}
              <BarChart
                width={800}
                height={300}
                data={amountAssessed}
                stackOffset="sign"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              // barGap={20}
              // barSize={0}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="pv" fill="#8884d8" stackId="stack" />
                <Bar dataKey="uv" fill="#82ca9d" stackId="stack" />
              </BarChart>
            </div>
          </Section>
        </div>
        {/* <div className="w-full lg:w-1/3">
        <Section
          // title="Sessions"
          description={<span>By device</span>}
        >
          <div className="flex flex-row w-full">
            <CountPie />
          </div>
        </Section>
      </div> */}
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-3/3">
          <Section
            // title="Conversions"
            description={<span>Collection Performance</span>}
          >
            <div className="flex flex-row w-full">
              {/* <Bar1 /> */}
              <BarChart
                width={800}
                height={300}
                data={colPerform}
                stackOffset="sign"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              // barGap={20}
              // barSize={0}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="pv" fill="#8884d8" stackId="stack" />
                <Bar dataKey="uv" fill="#82ca9d" stackId="stack" />
              </BarChart>
            </div>
          </Section>
        </div>
        {/* <div className="w-full lg:w-1/3">
        <Section
          // title="Sessions"
          description={<span>By device</span>}
        >
          <div className="flex flex-row w-full">
            <CountPie />
          </div>
        </Section>
      </div> */}
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-1/2">
          <Section
            // title="Conversions"
            description={<span>Cummulative Assessment</span>}
          >
            <div className="flex flex-row w-full">
              <PerfPie />
            </div>
          </Section>
        </div>
        <div className="w-full lg:w-1/2">
          <Section
            // title="Sessions"
            description={<span>Cummulative Performance</span>}
          >
            <div className="flex flex-row w-full">
              <CountPie />
            </div>
          </Section>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/2">
          <Section
          // title="Conversions"
          // description={<span>Cummulative Assessment</span>}
          >

            <div className="flex justify-center">
              <div>
                <p className="text-sm my-3 font-bold text-center">Summary</p>
                <table className="table divide-y mb-4">
                  <thead>
                    <tr>
                      <th>
                        Tax Office
                      </th>
                      <th className="">
                        Submitted Count
                      </th>
                      <th className="">
                        Approved Count
                      </th>
                      <th className="">
                        Submitted Amount
                      </th>
                      <th className="">
                        Approved Amount
                      </th>
                      <th className="">
                        Paid Amount
                      </th>
                      <th className="">
                        Unpaid Amount
                      </th>
                      <th className="">
                        Unassesed Collections
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td className="">
                        Isanlu
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                    <tr>
                      <td className="">
                        Head Office
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                    <tr>
                      <td className="">
                        Okene
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                    <tr>
                      <td className="">
                        Kabba
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                    <tr>
                      <td className="">
                        Idah
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                    <tr>
                      <td className="">
                        Koto
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                    <tr>
                      <td className="">
                        Ankpa
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                    <tr>
                      <td className="">
                        Lokoja
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                    <tr>
                      <td className="">
                        Lokoja
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                    <tr>
                      <td className="">
                        Lokoja
                      </td>

                      <td className="">
                        <p className=""> {formatNumber(20000)} </p>
                      </td>


                      <td className="">

                        <p className="">{formatNumber(30000)}</p>

                      </td>
                      <td className="">
                        <p>{formatNumber(40000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(50000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(60000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(70000)}</p>
                      </td>
                      <td className="">
                        <p>{formatNumber(80000)}</p>
                      </td>

                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

          </Section>
        </div>

      </div>


    </>
  );
}
