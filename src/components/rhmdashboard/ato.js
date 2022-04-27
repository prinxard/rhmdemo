
import React, { useEffect, useState } from "react";
import Section from "../../components/dashboard/section";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
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
import Widget1 from "../../components/dashboard/widget-1";
import { PendingRemittance, RevenueItems, TaxReceipt, TotalRemittance } from "../../components/Icons";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import url from "../../config/url";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";

let atoApprCount
let atoDraftCount
let atoTotalCount


const Trend = [
  {
    name: "Jan",
    approvedassessment: 20000,
    amountpaid: 18000,
    unassessedpayment: 4400,
  },
  {
    name: "Feb",
    approvedassessment: 25000,
    amountpaid: 16000,
    unassessedpayment: 2400,
  },
  {
    name: "March",
    approvedassessment: 28000,
    amountpaid: 17060,
    unassessedpayment: 24400,
  },
  {
    name: "April",
    approvedassessment: 34000,
    amountpaid: 19460,
    unassessedpayment: 2400,
  },
  {
    name: "May",
    approvedassessment: 32000,
    amountpaid: 14200,
    unassessedpayment: 1400,
  },
  {
    name: "June",
    approvedassessment: 38000,
    amountpaid: 16000,
    unassessedpayment: 2600,
  },
  {
    name: "July",
    approvedassessment: 35000,
    amountpaid: 19600,
    unassessedpayment: 2440,
  },
  {
    name: "August",
    approvedassessment: 40050,
    amountpaid: 18500,
    unassessedpayment: 22400,
  },
  {
    name: "Sep",
    approvedassessment: 42200,
    amountpaid: 400,
    unassessedpayment: 2200,
  },
  {
    name: "Oct",
    approvedassessment: 44400,
    amountpaid: 40100,
    unassessedpayment: 2300,
  },
  {
    name: "Nov",
    approvedassessment: 38000,
    amountpaid: 41000,
    unassessedpayment: 400,
  },
  {
    name: "Dec",
    approvedassessment: 50000,
    amountpaid: 4000,
    unassessedpayment: 2400,
  }
];


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;


export const AmountAssessed = () => {

  const [assessAmount, setAssessAmount] = useState([])

  let amountAssessed
  let amountCollected
  let unassessedCollection
  let outstandingAmount

  useEffect(() => {

    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        let amountArray = itemsBody.atoCollectionPerfomance
        setAssessAmount(amountArray)

      } catch (e) {
        // setIsFetching(false);
      }
    };
    fetchPost();

  }, []);

  assessAmount.forEach((ind, i) => {
    amountAssessed = Number(ind.assessedAmount)
  })

  assessAmount.forEach((ind, i) => {
    amountCollected = Number(ind.amountCollected)
  })


  assessAmount.forEach((ind, i) => {
    unassessedCollection = Number(ind.unassessedAmountCollected)
  })

  outstandingAmount = (Number(amountAssessed) - Number(amountCollected))

  const dataAssesedAmount = [
    { name: "Amount Assessed ", value: amountAssessed },
    { name: "Amount Collected ", value: amountCollected },
    { name: "Unassessed Collection", value: unassessedCollection },
    { name: "Outstanding Amount", value: outstandingAmount },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index

  }) => {

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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
      </text>
    );
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={500} height={300}>
          <Legend verticalAlign="top" align="center" />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Pie
            data={dataAssesedAmount}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataAssesedAmount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const AtoCount = () => {

  const [assessCount, setAssessCount] = useState([])

  useEffect(() => {

    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        let countArray = itemsBody.atoAssessmentCount
        setAssessCount(countArray)
      } catch (e) {
        // setIsFetching(false);
      }
    };
    fetchPost();

  }, []);

  const atoApproved = assessCount.filter(data => data.status === "Approved");
  const atoDraft = assessCount.filter(data => data.status === "Draft");
  const atoTotal = assessCount.filter(data => data.status === "Total");

  atoApproved.forEach((ind, i) => {
    atoApprCount = Number(ind.count)
  })

  atoDraft.forEach((ind, i) => {
    atoDraftCount = Number(ind.count)
  })

  atoTotal.forEach((ind, i) => {
    atoTotalCount = Number(ind.count)
  })

  if (atoTotalCount === null || atoTotalCount === undefined || atoTotalCount === "") {
    atoTotalCount = 0
  } else {
    atoTotalCount = atoTotalCount
  }

  if (atoDraftCount === null || atoDraftCount === undefined || atoDraftCount === "") {
    atoDraftCount = 0
  } else {
    atoDraftCount = atoDraftCount
  }


  const dataATOCount = [
    // { name: "Total assessment", value: 5 },
    { name: "Pending assessment", value: atoDraftCount },
    { name: "Approved assessment", value: atoApprCount },
  ];

  const renderCustomizedLabel2 = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index

  }) => {

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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
      </text>
    );
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={500} height={300}>
          <Legend verticalAlign="top" align="center" />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Pie
            data={dataATOCount}
            label={renderCustomizedLabel2}
            outerRadius={80}
            fill="#8884d8"
            labelLine={false}
            dataKey="value"
          >
            {dataATOCount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const Lines = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          // width={800}
          // height={300}
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
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Legend />
          <Line type="monotone" dataKey="approvedassessment" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amountpaid" stroke="#fcc287" />
          <Line type="monotone" dataKey="unassessedpayment" stroke="#fe0037" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export const ATOPie = () => {
  const [items, setPost] = useState(() => []);
  const [topAss, setTopAss] = useState(() => []);
  const [overViewAss, setOverView] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => false);

  const fields = [
    {
      name: "SN",
      key: "serialNo",
    },
    {
      name: "KGTIN",
      key: "kgtin",
    },
    {
      name: "Taxpayer Name",
      key: "tp_name",
    },
    {
      name: "Assessed Amount",
      key: "taxFormated",
    },
    {
      name: "Paid Amount",
      key: "taxPaidFormated",
    },
    {
      name: "Balance",
      key: "balance",
    },
    {
      name: "Created Time",
      key: "createtime",
    },
  ];

  useEffect(() => {
    setIsFetching(true)
    let num = 1
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        console.log(itemsBody);
        let recent = itemsBody.atoRecentAssessment;
        let topAssess = itemsBody.atoTopAssessment;
        let overView = itemsBody.atoAssessmentOverview
        setOverView(overView)
        let records = [];
        let recordsTop = [];
        setIsFetching(false)

        for (let i = 0; i < recent.length; i++) {
          let rec = recent[i];
          rec.serialNo = num + i
          rec.balance = formatNumber(Number(rec.tax) - Number(rec.taxPaid))
          rec.taxFormated = formatNumber(rec.tax);
          rec.taxPaidFormated = formatNumber(rec.taxPaid);
          rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
          records.push(rec);
        }
        setPost(() => records);

        for (let i = 0; i < topAssess.length; i++) {
          let rec = topAssess[i];
          rec.serialNo = num + i
          rec.balance = formatNumber(Number(rec.tax) - Number(rec.taxPaid))
          rec.taxFormated = formatNumber(rec.tax);
          rec.taxPaidFormated = formatNumber(rec.taxPaid);
          rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
          recordsTop.push(rec);
        }
        setTopAss(() => recordsTop);
      } catch (e) {
        console.log(e);
        setIsFetching(false)
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
      <div>
        {overViewAss.map((ind, i) => (
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

      </div>

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
          <Section >
            <p className="text-sm my-3 font-bold text-center">Recent Assessments</p>
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

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/2">
          <Section >
            <p className="text-sm my-3 font-bold text-center">Top Assessments</p>
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
                    {topAss.map((ind, i) => (
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
      {/* 
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/2">
          <Section
          >
            <div className="flex justify-center">
              <div>
                <p className="text-sm my-3 font-bold text-center">Top Assessments</p>
                <div className="flex justify-center">
                  <div className="overflow-x-auto">
                    <table className="table table-auto divide-y striped">
                      <thead>
                        <tr className="">
                          {fields2.map((field, i) => (
                            <th key={i} className="">
                              {field.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {topAss.map((ind, i) => (
                          <tr key={i} className="">
                            {fields2.map((field, j) => (
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
              </div>
            </div>

          </Section>
        </div>

      </div> */}

    </>
  );
}
