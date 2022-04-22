
import React, { useEffect, useState } from "react";
import Section from "../dashboard/section";
import { PieChart, Pie, Cell } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";
import { formatNumber } from "accounting";
import Widget1 from "../dashboard/widget-1";
import { PendingRemittance, RevenueItems, TaxReceipt, TotalRemittance } from "../Icons";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import url from "../../config/url";


let AjaokutaapprCount
let AjaokutaSubCount



const amountAssessed = [
  {
    name: "Lokoja",
    submitted: 4000,
    approved: 2400,
    amt: 2400
  },
  {
    name: "Head Office",
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
    name: "Isanlu",
    submitted: 2000,
    approved: 9800,
    amt: 2290
  },
  {
    name: "Kabba",
    submitted: 2780,
    approved: 3908,
    amt: 2000
  },
  {
    name: "Idah",
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
    assessed: 3900,
    collected: 3000,
    outstanding: 4400,
    unassessed: 2000
  },
  {
    name: "Okene",
    assessed: 6000,
    collected: 4000,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Isanlu",
    assessed: 4000,
    collected: 2000,
    outstanding: 3400,
    unassessed: 4400
  },
  {
    name: "Kabba",
    assessed: 3600,
    collected: 7000,
    outstanding: 2400,
    unassessed: 3400
  },
  {
    name: "Idah",
    assessed: 2000,
    collected: 3200,
    outstanding: 2400,
    unassessed: 2400
  },
  {
    name: "Koto",
    assessed: 3000,
    collected: 5000,
    outstanding: 1400,
    unassessed: 2400
  },
  {
    name: "Ankpa",
    assessed: 5000,
    collected: 2100,
    outstanding: 3400,
    unassessed: 5400
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

const dataCummCount = [
  { name: "Submitted", value: 4000 },
  { name: "Approved", value: 3040 },
];

const dataCummPerf = [
  { name: "Approved assessment", value: 400 },
  { name: "Assessed amount collected", value: 300 },
  { name: "Outstanding assessment", value: 300 },
  { name: "Unassessed collection", value: 300 }
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
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="blue"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${dataCummCount[index].name}`}

      {/* {`${(percent * 100).toFixed(0)}%`} */}
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

  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="blue"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${dataCummPerf[index].name}`}

      {/* {`${(percent * 100).toFixed(0)}%`} */}
    </text>
  );
};


export const CountPie = () => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={dataCummCount}
        cx={150}
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
    <PieChart width={600} height={300}>
      <Pie
        data={dataCummPerf}
        cx={290}
        cy={150}
        label={renderCustomizedLabel2}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {dataCummPerf.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export const AssesmentCount = () => {
  const [assessCount, setAssessCount] = useState([])
  const [assessCount2, setAssessCount2] = useState([])
  const [assessCount3, setAssessCount3] = useState([])
  const [assessCount4, setAssessCount4] = useState([])
  const [assessCount5, setAssessCount5] = useState([])
  const [assessCount6, setAssessCount6] = useState([])
  const [assessCount7, setAssessCount7] = useState([])
  const [assessCount8, setAssessCount8] = useState([])
  const [assessCount9, setAssessCount9] = useState([])
  const [assessCount10, setAssessCount10] = useState([])

  useEffect(() => {

    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        let countArray = itemsBody.assessmentCount
        // console.log(countArray);
        setAssessCount(countArray)

      } catch (e) {
        // setIsFetching(false);
      }
    };
    fetchPost();

  }, []);


  const ajaokutaApproved = assessCount.filter(data => data.tax_office === "Ajaokuta" && data.status === "Approved");
  const ajaokutaSubmitted = assessCount.filter(data => data.tax_office === "Ajaokuta" && data.status === "Submitted");


  console.log("AjaokutaApproved", ajaokutaApproved);
  console.log("AjaokutaSubmitted", ajaokutaSubmitted);

  ajaokutaApproved.forEach((ind, i) => {
    AjaokutaapprCount = ind.count
  })

  ajaokutaSubmitted.forEach((ind, i) => {
    AjaokutaSubCount = ind.count
  })

  console.log(AjaokutaSubCount, AjaokutaapprCount);


  const dataCount = [
    {
      name: "Lokoja",
      submitted: AjaokutaSubCount,
      approved: AjaokutaapprCount,
      amt: 2400
    },
    {
      name: "Head Office",
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
      name: "Isanlu",
      submitted: 2000,
      approved: 9800,
      amt: 2290
    },
    {
      name: "Kabba",
      submitted: 2780,
      approved: 3908,
      amt: 2000
    },
    {
      name: "Idah",
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


  return (
    <>
      <div className="flex my-10 flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">

        <div className="w-full lg:w-1/4">
          <Widget1
            color="green"
            title="Approved Assessments"
            description={formatNumber(4000000)}
            right={<TotalRemittance />}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Widget1
            color="red"
            title="Submitted Assessments"
            description={formatNumber(300000)}
            right={<PendingRemittance />}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Widget1
            color="blue"
            title="Amount Collected"
            description={formatNumber(500000)}
            right={<RevenueItems />}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Widget1
            color="yellow"
            title="Outstanding Amount"
            description={formatNumber(600000)}
            right={<TaxReceipt />}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-3/3">
          <Section
            description={<span>Assessment count</span>}
          >
            <div className="flex flex-row">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart

                  data={dataCount}
                  stackOffset="sign"
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
                  {/* <ReferenceLine y={0} stroke="#000" /> */}
                  <Bar dataKey="submitted" barCategoryGap={10} fill="#02321C" stackId="stack" />
                  <Bar dataKey="approved" barCategoryGap={10} fill="#82ca9d" stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </Section>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-3/3">
          <Section
            description={<span>Amount Assessed</span>}
          >
            <div className="flex flex-row w-full">
              <ResponsiveContainer width="100%" height={300}>
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
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={0} stroke="#000" />
                  <Bar dataKey="submitted" fill="#002147" stackId="stack" />
                  <Bar dataKey="approved" fill="#a2add0" stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-3/3">
          <Section
            description={<span>Collection Performance</span>}
          >
            <div className="flex flex-row w-full">
              <ResponsiveContainer width="100%" height={300}>
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
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={0} stroke="#000" />
                  <Bar dataKey="assessed" fill="#247ba0" stackId="stack" />
                  <Bar dataKey="collected" fill="#0D41E1" stackId="stack" />
                  <Bar dataKey="outstanding" fill="#cddafd" stackId="stack" />
                  <Bar dataKey="unassessed" fill="#fe938c" stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-1/3">
          <Section
            // title="Conversions"
            description={<span>Cummulative Assessment</span>}
          >
            <div className="flex flex-row w-full">
              <CountPie />

            </div>
          </Section>
        </div>
        <div className="w-full lg:w-2/3">
          <Section
            // title="Sessions"
            description={<span>Cummulative Performance</span>}
          >
            <div className="flex flex-row w-full">
              <PerfPie />
            </div>
          </Section>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full">
          <Section
          >

            <div className="flex justify-center">
              <div>
                <p className="text-sm my-3 font-bold text-center">Summary</p>
                <table className="table table-auto striped divide-y mb-4">
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
