
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
import Loader from "react-loader-spinner";


let AjaokutaapprCount
let AjaokutaSubCount

let lokoja1ApprCount

let adaviApprCount

let lokoja2ApprCount
let lokoja2SubCount

let headOfficeApprCount
let headOfficeSubCount

let okeneApprCount
let okeneSubCount

let isanluApprCount
let isanluSubCount

let kabbaApprCount
let kabbaSubCount

let idahApprCount
// let kabbaSubCount

let kotoApprCount
let kotoSubCount

let ankpaApprCount
// let ankpaSubCount

let ayingbaApprCount
let ayingbaSubCount

// cummulative data
let cummApprCount
let cummSubCount


const amountAssessed = [
  {
    name: "Lk2",
    submitted: 40,
    approved: 43,
    // amt: 2400
  },
  {
    name: "Lk1",
    submitted: 0,
    approved: 21,
    // amt: 2400
  },
  {
    name: "Adv",
    submitted: 0,
    approved: 32,
    // amt: 2400
  },
  {
    name: "HQ",
    submitted: 34,
    approved: 4,
    // amt: 2400
  },
  {
    name: "Okn",
    submitted: 23,
    approved: 45,
    // amt: 2210
  },
  {
    name: "Isn",
    submitted: 12,
    approved: 4,
    // amt: 2290
  },
  {
    name: "Kb",
    submitted: 45,
    approved: 22,
    // amt: 2000
  },
  {
    name: "Idh",
    submitted: 0,
    approved: 3,
    // amt: 2181
  },
  {
    name: "Kt",
    submitted: 43,
    approved: 21,
    // amt: 2500
  },
  {
    name: "Ank",
    submitted: 0,
    approved: 32,
    // amt: 2100
  },
  {
    name: "Ajk",
    submitted: 12,
    approved: 43,
    // amt: 2100
  },
  {
    name: "Anyg",
    submitted: 45,
    approved: 21,
    // amt: 2100
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
      {/* {`${dataCummCount[index].name}`} */}

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
      {/* {`${dataCummPerf[index].name}`} */}

      {/* {`${(percent * 100).toFixed(0)}%`} */}
    </text>
  );
};


export const CountPie = () => {
  const [cummulative, setCummulative] = useState([])
  const [assessCount, setAssessCount] = useState([])
  const [isFetching, setisFetching] = useState(false)

  useEffect(() => {
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        let cummu = itemsBody.cummulativeAssessment;
        setCummulative(cummu)
      } catch (e) {
        console.log(e);
      }
    };
    fetchPost();

  }, []);

  const cummApproved = cummulative.filter(data => data.status === "Approved");
  const cummSubmitted = cummulative.filter(data => data.status === "Submitted");

  cummApproved.forEach((ind, i) => {
    cummApprCount = ind.count
  })

  cummSubmitted.forEach((ind, i) => {
    cummSubCount = ind.count
  })


  const dataCummCount = [
    { name: "Submitted", value: cummSubCount },
    { name: "Approved", value: cummApprCount },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={400} height={300}>
          <Legend verticalAlign="top" align="center" />
          <Tooltip />
          <Pie
            data={dataCummCount}
            // cx={150}
            // cy={150}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataCummCount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const PerfPie = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={400} height={300}>
          <Legend verticalAlign="top" align="center" />
          <Tooltip />
          <Pie
            data={dataCummPerf}
            label={renderCustomizedLabel2}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
          >
            {dataCummPerf.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const AssesmentCount = () => {
  const [allTaxOverView, setAllOverview] = useState([])
  const [assessCount, setAssessCount] = useState([])
  const [isFetching, setisFetching] = useState(false)
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
    setisFetching(true)
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        let overview = itemsBody.assessmentOverview;
        let countArray = itemsBody.assessmentCount;
        setAssessCount(countArray)
        setAllOverview(overview)
        setisFetching(false)
      } catch (e) {
        console.log(e);
        setisFetching(false)
      }
    };
    fetchPost();

  }, []);


  const ajaokutaApproved = assessCount.filter(data => data.tax_office === "Ajaokuta" && data.status === "Approved");
  const ajaokutaSubmitted = assessCount.filter(data => data.tax_office === "Ajaokuta" && data.status === "Submitted");

  const lokoja2Approved = assessCount.filter(data => data.tax_office === "Lokoja 2" && data.status === "Approved");
  const lokoja2Submitted = assessCount.filter(data => data.tax_office === "Lokoja 2" && data.status === "Submitted");

  const headOfficeApproved = assessCount.filter(data => data.tax_office === "Head Office" && data.status === "Approved");
  const headOfficeSubmitted = assessCount.filter(data => data.tax_office === "Head Office" && data.status === "Submitted");

  const okeneApproved = assessCount.filter(data => data.tax_office === "Okene" && data.status === "Approved");
  const okeneSubmitted = assessCount.filter(data => data.tax_office === "Okene" && data.status === "Submitted");

  const isanluApproved = assessCount.filter(data => data.tax_office === "Isanlu" && data.status === "Approved");
  const isanluSubmitted = assessCount.filter(data => data.tax_office === "Isanlu" && data.status === "Submitted");

  const kabbaApproved = assessCount.filter(data => data.tax_office === "Kabba" && data.status === "Approved");
  const kabbaSubmitted = assessCount.filter(data => data.tax_office === "Kabba" && data.status === "Submitted");

  const idahApproved = assessCount.filter(data => data.tax_office === "Idah" && data.status === "Approved");

  const kotoApproved = assessCount.filter(data => data.tax_office === "Kotonkarfe" && data.status === "Approved");
  const kotoSubmitted = assessCount.filter(data => data.tax_office === "Kotonkarfe" && data.status === "Submitted");

  const ankpaApproved = assessCount.filter(data => data.tax_office === "Ankpa" && data.status === "Approved");

  const ayingbaApproved = assessCount.filter(data => data.tax_office === "Anyigba" && data.status === "Approved");
  const ayingbaSubmitted = assessCount.filter(data => data.tax_office === "Anyigba" && data.status === "Submitted");

  const lokoja1Approved = assessCount.filter(data => data.tax_office === "Lokoja 1" && data.status === "Approved");

  const adaviApproved = assessCount.filter(data => data.tax_office === "Okehi/Adavi" && data.status === "Approved");
  // const adaviSubmitted = assessCount.filter(data => data.tax_office === "Okehi/Adavi" && data.status === "Submitted");

  // console.log("adaviApproved ", adaviApproved);
  // console.log("adaviSubmitted ", adaviSubmitted);


  ajaokutaApproved.forEach((ind, i) => {
    AjaokutaapprCount = ind.count
  })

  ajaokutaSubmitted.forEach((ind, i) => {
    AjaokutaSubCount = ind.count
  })

  lokoja2Approved.forEach((ind, i) => {
    lokoja2ApprCount = ind.count
  })

  lokoja2Submitted.forEach((ind, i) => {
    lokoja2SubCount = ind.count
  })

  lokoja1Approved.forEach((ind, i) => {
    lokoja1ApprCount = ind.count
  })

  headOfficeApproved.forEach((ind, i) => {
    headOfficeApprCount = ind.count
  })

  headOfficeSubmitted.forEach((ind, i) => {
    headOfficeSubCount = ind.count
  })


  okeneApproved.forEach((ind, i) => {
    okeneApprCount = ind.count
  })

  okeneSubmitted.forEach((ind, i) => {
    okeneSubCount = ind.count
  })

  isanluApproved.forEach((ind, i) => {
    isanluApprCount = ind.count
  })

  isanluSubmitted.forEach((ind, i) => {
    isanluSubCount = ind.count
  })

  kabbaApproved.forEach((ind, i) => {
    kabbaApprCount = ind.count
  })

  kabbaSubmitted.forEach((ind, i) => {
    kabbaSubCount = ind.count
  })

  idahApproved.forEach((ind, i) => {
    idahApprCount = ind.count
  })

  kotoApproved.forEach((ind, i) => {
    kotoApprCount = ind.count
  })
  kotoSubmitted.forEach((ind, i) => {
    kotoSubCount = ind.count
  })

  ankpaApproved.forEach((ind, i) => {
    ankpaApprCount = ind.count
  })


  ayingbaApproved.forEach((ind, i) => {
    ayingbaApprCount = ind.count
  })

  ayingbaSubmitted.forEach((ind, i) => {
    ayingbaSubCount = ind.count
  })

  adaviApproved.forEach((ind, i) => {
    adaviApprCount = ind.count
  })

  const dataCount = [
    {
      name: "Lk2",
      submitted: lokoja2SubCount,
      approved: lokoja2ApprCount,
      // amt: 2400
    },
    {
      name: "Lk1",
      submitted: 0,
      approved: lokoja1ApprCount,
      // amt: 2400
    },
    {
      name: "Adv",
      submitted: 0,
      approved: adaviApprCount,
      // amt: 2400
    },
    {
      name: "HQ",
      submitted: headOfficeSubCount,
      approved: headOfficeApprCount,
      // amt: 2400
    },
    {
      name: "Okn",
      submitted: okeneSubCount,
      approved: okeneApprCount,
      // amt: 2210
    },
    {
      name: "Isn",
      submitted: isanluSubCount,
      approved: isanluApprCount,
      // amt: 2290
    },
    {
      name: "Kb",
      submitted: kabbaSubCount,
      approved: kabbaApprCount,
      // amt: 2000
    },
    {
      name: "Idh",
      submitted: 0,
      approved: idahApprCount,
      // amt: 2181
    },
    {
      name: "Kt",
      submitted: kotoSubCount,
      approved: kotoApprCount,
      // amt: 2500
    },
    {
      name: "Ank",
      submitted: 0,
      approved: ankpaApprCount,
      // amt: 2100
    },
    {
      name: "Ajk",
      submitted: AjaokutaSubCount,
      approved: AjaokutaapprCount,
      // amt: 2100
    },
    {
      name: "Anyg",
      submitted: ayingbaSubCount,
      approved: ayingbaApprCount,
      // amt: 2100
    }
  ];


  return (
    <>
      {isFetching && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p className="font-bold"> Fetching...</p>
        </div>
      )}
      {allTaxOverView.map((ind, i) => (
        <div className="flex my-10 flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">

          <div className="w-full lg:w-1/4">
            <Widget1
              color="green"
              title="Approved Assessments"
              description={formatNumber(ind.approvedCount)}
              right={<TotalRemittance />}
            />
          </div>

          <div className="w-full lg:w-1/4">
            <Widget1
              color="red"
              title="Submitted Assessments"
              description={formatNumber(ind.submittedCount)}
              right={<PendingRemittance />}
            />
          </div>

          <div className="w-full lg:w-1/4">
            <Widget1
              color="blue"
              title="Amount Collected"
              description={formatNumber(ind.amountCollected)}
              right={<RevenueItems />}
            />
          </div>

          <div className="w-full lg:w-1/4">
            <Widget1
              color="yellow"
              title="Outstanding Amount"
              description={formatNumber(ind.outstandingAmount)}
              right={<TaxReceipt />}
            />
          </div>
        </div>

      ))}

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/3">
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
                    right: 10,
                    left: 10,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* <ReferenceLine y={0} stroke="#000" /> */}
                  <Bar dataKey="submitted" fill="#02321C" stackId="stack" />
                  <Bar dataKey="approved" fill="#82ca9d" stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>
        <div className="w-full lg:w-1/3">
          <Section
          description={<span>Cummulative Assessment</span>}
          >
            <div className="flex flex-row">
              <CountPie />
            </div>
          </Section>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/3">
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
        <div className="w-full lg:w-1/3">
          <Section>
            <div className="flex flex-row w-full">
              <PerfPie />
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

      {/* <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
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
      </div> */}

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
