
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

let atoApprCount
let atoDraftCount
let atoTotalCount


const Trend = [
  {
    name: "Jan",
    approved: 20000,
    paid: 18000,
    unassessed: 4400,
  },
  {
    name: "Feb",
    approved: 25000,
    paid: 16000,
    unassessed: 2400,
  },
  {
    name: "March",
    approved: 28000,
    paid: 17060,
    unassessed: 24400,
  },
  {
    name: "April",
    approved: 34000,
    paid: 19460,
    unassessed: 2400,
  },
  {
    name: "May",
    approved: 32000,
    paid: 14200,
    unassessed: 1400,
  },
  {
    name: "June",
    approved: 38000,
    paid: 16000,
    unassessed: 2600,
  },
  {
    name: "July",
    approved: 35000,
    paid: 19600,
    unassessed: 2440,
  },
  {
    name: "August",
    approved: 40050,
    paid: 18500,
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
        console.log(itemsBody);
        let amountArray = itemsBody.atoCollectionPerfomance
        setAssessAmount(amountArray)
        console.log("collectPerf", amountArray);

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

  console.log("outstandingAmount", outstandingAmount);

  const dataAssesedAmount = [
    { name: "Amount Assessed ", value: amountAssessed },
    { name: "Amount collected ", value: amountCollected },
    { name: "Unassessed collectiion", value: unassessedCollection },
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
        {/* {`${dataAssesedAmount[index].name}`} */}

        {/* {`${(percent * 100).toFixed(0)}%`} */}
      </text>
    );
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={500} height={300}>
          <Legend verticalAlign="top" align="center" />
          <Pie
            data={dataAssesedAmount}
            // cx={222}
            // cy={150}
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
        console.log(itemsBody);
        let countArray = itemsBody.atoAssessmentCount
        setAssessCount(countArray)
        console.log("countArray", countArray);

      } catch (e) {
        // setIsFetching(false);
      }
    };
    fetchPost();

  }, []);

  const atoApproved = assessCount.filter(data => data.status === "Approved");
  const atoDraft = assessCount.filter(data => data.status === "Draft");
  const atoTotal = assessCount.filter(data => data.status === "Total");
  console.log("atoApproved", atoApproved);

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

  console.log(atoTotalCount, atoDraftCount, atoApprCount);


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
          <Pie
            data={dataATOCount}
            // cx="50%"
            // cy="50%"
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
    </LineChart>
  );
}

export const ATOPie = () => {
  const [items, setPost] = useState(() => []);
  const [sum, setSum] = useState(() => null);
  const [isFetching, setIsFetching] = useState(() => true);


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

  const fields2 = [
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
    let num = 1
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        res = res.data.body.atoRecentAssessment;
        let second = res.data.body
        console.log(second);
        let records = [];
        let sum = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          sum.push(rec.totalTax);
          rec.serialNo = num + i
          rec.balance = formatNumber(Number(rec.tax) - Number(rec.taxPaid))
          rec.taxFormated = formatNumber(rec.tax);
          rec.taxPaidFormated = formatNumber(rec.taxPaid);
          rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
          records.push(rec);
        }
        setPost(() => records);
      } catch (e) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  console.log("items", items);

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
                <table className="table divide-y striped">
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
                    {items.map((remittance, i) => (
                      <tr key={i} className="">
                        {fields.map((field, j) => (
                          <td key={j} className="">
                            {remittance[field.key]}
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
          <Section
          >
            <div className="flex justify-center">
              <div>
                <p className="text-sm my-3 font-bold text-center">Top Assessments</p>
                <div className="flex justify-center">
                  <div className="overflow-x-auto">
                    <table className="table divide-y striped">
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
                        {items.map((remittance, i) => (
                          <tr key={i} className="">
                            {fields.map((field, j) => (
                              <td key={j} className="">
                                {remittance[field.key]}
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

      </div>


    </>
  );
}
