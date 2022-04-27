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
import dateformat from "dateformat";


let AjaokutaapprCount
let AjaokutaSubCount

let lokoja1ApprCount
let lokoja1SubCount

let adaviApprCount
let adaviSubCount

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
let idahSubCount

let kotoApprCount
let kotoSubCount

let ankpaApprCount
let ankpaSubCount

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
  },
  {
    name: "Lk1",
    submitted: 0,
    approved: 21,
  },
  {
    name: "Adv",
    submitted: 0,
    approved: 32,
  },
  {
    name: "HQ",
    submitted: 34,
    approved: 4,
  },
  {
    name: "Okn",
    submitted: 23,
    approved: 45,
  },
  {
    name: "Isn",
    submitted: 12,
    approved: 4,
  },
  {
    name: "Kbb",
    submitted: 45,
    approved: 22,
  },
  {
    name: "Idh",
    submitted: 0,
    approved: 3,
  },
  {
    name: "Kot",
    submitted: 43,
    approved: 21,
  },
  {
    name: "Ankp",
    submitted: 0,
    approved: 32,
  },
  {
    name: "Ajk",
    submitted: 12,
    approved: 43,
  },
  {
    name: "Any",
    submitted: 45,
    approved: 21,
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
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
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

  const [cummulativePerf, setCummulativePerf] = useState([])

  useEffect(() => {
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        let cummuperf = itemsBody.cummulativePerfomance;
        setCummulativePerf(cummuperf)
      } catch (e) {
        console.log(e);
      }
    };
    fetchPost();

  }, []);

  let amountCol
  let assessedAmt
  let outstandingAss
  let unassessedCol

  cummulativePerf.forEach((ind, i) => {
    amountCol = Number(ind.amountCollected)
    assessedAmt = Number(ind.assessedAmount)
    unassessedCol = Number(ind.unassessedAmountCollected)
  })

  outstandingAss = (assessedAmt - amountCol)


  const dataCummPerf = [
    // { name: "Approved assessment", value: 400 },
    { name: "Amount collected", value: amountCol },
    { name: "Outstanding assessment", value: outstandingAss },
    { name: "Unassessed collection", value: unassessedCol }
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={400} height={300}>
          <Legend verticalAlign="top" align="center" />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
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

  const [items, setPost] = useState(() => []);


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
  const idahSubmitted = assessCount.filter(data => data.tax_office === "Idah" && data.status === "Submitted");

  const kotoApproved = assessCount.filter(data => data.tax_office === "Kotonkarfe" && data.status === "Approved");
  const kotoSubmitted = assessCount.filter(data => data.tax_office === "Kotonkarfe" && data.status === "Submitted");

  const ankpaApproved = assessCount.filter(data => data.tax_office === "Ankpa" && data.status === "Approved");
  const ankpaSubmitted = assessCount.filter(data => data.tax_office === "Ankpa" && data.status === "Submitted");

  const ayingbaApproved = assessCount.filter(data => data.tax_office === "Anyigba" && data.status === "Approved");
  const ayingbaSubmitted = assessCount.filter(data => data.tax_office === "Anyigba" && data.status === "Submitted");

  const lokoja1Approved = assessCount.filter(data => data.tax_office === "Lokoja 1" && data.status === "Approved");
  const lokoja1Submitted = assessCount.filter(data => data.tax_office === "Lokoja 1" && data.status === "Submitted");

  const adaviApproved = assessCount.filter(data => data.tax_office === "Okehi/Adavi" && data.status === "Approved");
  const adaviSubmitted = assessCount.filter(data => data.tax_office === "Okehi/Adavi" && data.status === "Submitted");


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

  lokoja1Submitted.forEach((ind, i) => {
    lokoja1SubCount = ind.count
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

  idahSubmitted.forEach((ind, i) => {
    idahSubCount = ind.count
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
  ankpaSubmitted.forEach((ind, i) => {
    ankpaSubCount = ind.count
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

  adaviSubmitted.forEach((ind, i) => {
    adaviSubCount = ind.count
  })



  const dataCount = [
    {
      name: "Lk2",
      submitted: lokoja2SubCount,
      approved: lokoja2ApprCount,
    },
    {
      name: "Lk1",
      submitted: lokoja1SubCount,
      approved: lokoja1ApprCount,
    },
    {
      name: "Adv",
      submitted: adaviSubCount,
      approved: adaviApprCount,
    },
    {
      name: "HQ",
      submitted: headOfficeSubCount,
      approved: headOfficeApprCount,
    },
    {
      name: "Okn",
      submitted: okeneSubCount,
      approved: okeneApprCount,
    },
    {
      name: "Isn",
      submitted: isanluSubCount,
      approved: isanluApprCount,
    },
    {
      name: "Kbb",
      submitted: kabbaSubCount,
      approved: kabbaApprCount,
    },
    {
      name: "Idh",
      submitted: idahSubCount,
      approved: idahApprCount,
    },
    {
      name: "Kot",
      submitted: kotoSubCount,
      approved: kotoApprCount,
    },
    {
      name: "Ank",
      submitted: ankpaSubCount,
      approved: ankpaApprCount,
    },
    {
      name: "Ajk",
      submitted: AjaokutaSubCount,
      approved: AjaokutaapprCount,
    },
    {
      name: "Any",
      submitted: ayingbaSubCount,
      approved: ayingbaApprCount,
    }
  ];

  const fields = [
    {
      name: "Tax Office",
      key: "station",
    },
    {
      name: "Submitted Count",
      key: "submittedCount",
    },
    {
      name: "Approved Count",
      key: "approvedCount",
    },
    {
      name: "Submitted Amount",
      key: "submittedAmount",
    },
    {
      name: "Approved Amount",
      key: "approvedAmountFormatted",
    },
    {
      name: "Paid Amount",
      key: "paidAmountFormatted",
    },
    {
      name: "Unpaid Amount",
      key: "unpaidAmountCal",
    },
    {
      name: "Unassessed Collections",
      key: "unassessedAmountCollected",
    },
  ];

  useEffect(() => {
    let num = 1
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        let HQsummary = itemsBody.summary;
        setPost(HQsummary)
        console.log("HQsummary", HQsummary);
        let records = [];
        for (let i = 0; i < HQsummary.length; i++) {
          let rec = HQsummary[i];
          rec.serialNo = num + i
          rec.submittedCount = formatNumber(rec.submittedCount)
          rec.approvedCount = formatNumber(rec.approvedCount)
          rec.submittedAmount = formatNumber(rec.submittedAmount)
          rec.approvedAmountFormatted = formatNumber(rec.approvedAmount)
          rec.paidAmountFormatted = formatNumber(rec.assessedAmountCollected)
          rec.unpaidAmountCal = formatNumber(Number(rec.approvedAmount) - Number(rec.assessedAmountCollected))
          rec.unassessedAmountCollected = formatNumber(rec.unassessedAmountCollected);
          records.push(rec);
        }
        setPost(() => records);

      } catch (e) {
        console.log(e);
      }
    };
    fetchPost();
  }, []);


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
                  <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
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
                  <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
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
          <Section
            description={<span>Cummulative performance</span>}
          >
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
                  <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
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
        <div className="w-full lg:w-2/2">
          <Section >
            <p className="text-sm my-3 font-bold text-center">Summary</p>
            <div className="flex justify-center">
              <div className="overflow-x-auto">
                <table className="table table-auto divide-y striped">
                  <thead>
                    <tr className="">
                      {fields.map((field, i) => (
                        <th key={i} className="">
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {items.map((ind, i) => (
                      <tr key={i} className="">
                        {fields.map((field, j) => (
                          <td key={j} className="">
                            {ind[field.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
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
