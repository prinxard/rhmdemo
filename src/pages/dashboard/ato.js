
import React from "react";
import Section from "../../components/dashboard/section";
import { PieChart, Pie, Cell } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Head Office",
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Okene",
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Isanlu",
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Kabba",
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Idah",
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Koto",
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Ankpa",
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Ajaokuta",
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Ayingba",
    assessed: 3000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  }
];

const Trend = [
  {
    name: "Jan",
    approved: 20000,
    paid: 500,
    unassessed: 4400,
  },
  {
    name: "Feb",
    approved: 25000,
    paid: 4000,
    unassessed: 2400,
  },
  {
    name: "March",
    approved: 28000,
    paid: 4060,
    unassessed: 24400,
  },
  {
    name: "April",
    approved: 34000,
    paid: 460,
    unassessed: 2400,
  },
  {
    name: "May",
    approved: 32000,
    paid: 4200,
    unassessed: 1400,
  },
  {
    name: "June",
    approved: 38000,
    paid: 6000,
    unassessed: 2600,
  },
  {
    name: "July",
    approved: 35000,
    paid: 4600,
    unassessed: 2440,
  },
  {
    name: "August",
    approved: 40050,
    paid: 500,
    unassessed: 22400,
  },
  {
    name: "Sep",
    approved: 42200,
    paid: 400,
    unassessed: 2200,
  },
  {
    name: "Oct",
    approved: 44400,
    paid: 40100,
    unassessed: 2300,
  },
  {
    name: "Nov",
    approved: 38000,
    paid: 41000,
    unassessed: 400,
  },
  {
    name: "Dec",
    approved: 50000,
    paid: 4000,
    unassessed: 2400,
  }
];

const dataAssesedAmount = [
  { name: "Assessed ", value: 4000 },
  { name: "Collected ", value: 3040 },
  { name: "Unassessed ", value: 3040 },
  { name: "Outstanding ", value: 3040 },
];


const dataATOCount = [
  { name: "Total ", value: 1000 },
  { name: "Pending ", value: 300 },
  { name: "Approved ", value: 300 },
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
      {`${dataAssesedAmount[index].name}`}

      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const renderCustomizedLabel2 = ({
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
      {`${dataATOCount[index].name}`}

      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};




export const AmountAssessed = () => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={dataAssesedAmount}
        cx={200}
        cy={150}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {dataAssesedAmount.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export const AtoCount = () => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={dataATOCount}
        cx={200}
        cy={150}
        label={renderCustomizedLabel2}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {dataATOCount.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export const Lines = () => {
  return (
    <LineChart
      width={800}
      height={300}
      data={Trend}
      margin={{
        top: 5,
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
      {/* <Line
        type="monotone"
        dataKey="approved"
        dataKey="pv"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      /> */}
      <Line type="monotone" dataKey="approved" stroke="#82ca9d" />
      <Line type="monotone" dataKey="paid" stroke="#fcc287" />
      <Line type="monotone" dataKey="unassessed" stroke="#fe0037" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
}

export const ATOPie = () => {
  return (
    <>
      <div className="flex mt-10 flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-1/2">
          <Section
            description={<span>Assessment Count</span>}
          >
            <div className="flex flex-row w-full">
              <AtoCount />

            </div>
          </Section>
        </div>
        <div className="w-full lg:w-1/2">
          <Section
            description={<span>Assessed Amount</span>}
          >
            <div className="flex flex-row w-full">
              <AmountAssessed />
            </div>
          </Section>
        </div>
      </div>

      <div className="flex mt-10 flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/2">
          <Section
            description={<span>Performance Trend</span>}
          >
            <div className="flex flex-row w-full">
              <Lines />
            </div>
          </Section>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/2">
          <Section
          >

            <div className="flex justify-center">
              <div>
                <p className="text-sm my-3 font-bold text-center">Recent Assessments</p>
                <table className="table divide-y mb-4">
                  <thead>
                    <tr>
                      <th>
                        Taxpayer Name
                      </th>
                      <th className="">
                        KGTIN
                      </th>
                      <th className="">
                        Assessed Amount
                      </th>
                      <th className="">
                        Amount Paid
                      </th>
                      <th className="">
                        Balance
                      </th>
                      <th className="">
                        Created time
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td className="">
                        Nomics Ibrahim
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
                    </tr>

                    <tr>
                      <td className="">
                        Halima  Jordan
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
                 

                    </tr>

                    <tr>
                      <td className="">
                        Elnino Dwayne
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
                 

                    </tr>

                    <tr>
                      <td className="">
                        Spike Obi
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
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

          </Section>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/2">
          <Section
          >

            <div className="flex justify-center">
              <div>
                <p className="text-sm my-3 font-bold text-center">Top Assessments</p>
                <table className="table divide-y mb-4">
                  <thead>
                    <tr>
                      <th>
                        Taxpayer Name
                      </th>
                      <th className="">
                        KGTIN
                      </th>
                      <th className="">
                        Assessed Amount
                      </th>
                      <th className="">
                        Amount Paid
                      </th>
                      <th className="">
                        Balance
                      </th>
                      <th className="">
                        Created time
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td className="">
                        Nomics Ibrahim
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
                    </tr>

                    <tr>
                      <td className="">
                        Halima  Jordan
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
                 

                    </tr>

                    <tr>
                      <td className="">
                        Elnino Dwayne
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
                 

                    </tr>

                    <tr>
                      <td className="">
                        Spike Obi
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
