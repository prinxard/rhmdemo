
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
let atoSubCount


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
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
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
  const atoSubmitted = assessCount.filter(data => data.status === "Submitted");


  atoApproved.forEach((ind, i) => {
    atoApprCount = Number(ind.count)
  })

  atoSubmitted.forEach((ind, i) => {
    atoSubCount = Number(ind.count)
  })



  const dataATOCount = [
    // { name: "Total assessment", value: 5 },
    { name: "Submitted assessment", value: atoSubCount },
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
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
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

  const [perfTrend, setPerTrend] = useState([])

  useEffect(() => {

    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        let trendArray = itemsBody.atoPerfomanceTrend
        setPerTrend(trendArray)

      } catch (e) {
        console.log(e);
      }
    };
    fetchPost();

  }, []);


  let janApprAss
  let janAmtPaid
  let janUnassessedPay

  let febApprAss
  let febAmtPaid
  let febUnassessedPay

  let marchApprAss
  let marchAmtPaid
  let marchUnassessedPay

  let aprilApprAss
  let aprilAmtPaid
  let aprilUnassessedPay

  let mayApprAss
  let mayAmtPaid
  let mayUnassessedPay

  let juneApprAss
  let juneAmtPaid
  let juneUnassessedPay

  let julyApprAss
  let julyAmtPaid
  let julyUnassessedPay

  let augApprAss
  let augAmtPaid
  let augUnassessedPay

  let septApprAss
  let septAmtPaid
  let septUnassessedPay

  let octApprAss
  let octAmtPaid
  let octUnassessedPay

  let novApprAss
  let novAmtPaid
  let novUnassessedPay

  let decApprAss
  let decAmtPaid
  let decUnassessedPay

  const janPerfTrend = perfTrend.filter(data => data.month === "Jan");
  const febPerfTrend = perfTrend.filter(data => data.month === "Feb");
  const marchPerfTrend = perfTrend.filter(data => data.month === "March");
  const aprilPerfTrend = perfTrend.filter(data => data.month === "April");
  const mayPerfTrend = perfTrend.filter(data => data.month === "May");
  const junePerfTrend = perfTrend.filter(data => data.month === "June");
  const julyPerfTrend = perfTrend.filter(data => data.month === "July");
  const augPerfTrend = perfTrend.filter(data => data.month === "Aug");
  const septPerfTrend = perfTrend.filter(data => data.month === "Sep");
  const octPerfTrend = perfTrend.filter(data => data.month === "Oct");
  const novPerfTrend = perfTrend.filter(data => data.month === "Nov");
  const decPerfTrend = perfTrend.filter(data => data.month === "Dec");

  janPerfTrend.forEach((ind, i) => {
    janApprAss = ind.assessedAmount
    janAmtPaid = ind.amountCollected
    janUnassessedPay = ind.unassessedAmountCollected
  })

  febPerfTrend.forEach((ind, i) => {
    febApprAss = ind.assessedAmount
    febAmtPaid = ind.amountCollected
    febUnassessedPay = ind.unassessedAmountCollected
  })

  marchPerfTrend.forEach((ind, i) => {
    marchApprAss = ind.assessedAmount
    marchAmtPaid = ind.amountCollected
    marchUnassessedPay = ind.unassessedAmountCollected
  })

  aprilPerfTrend.forEach((ind, i) => {
    aprilApprAss = ind.assessedAmount
    aprilAmtPaid = ind.amountCollected
    aprilUnassessedPay = ind.unassessedAmountCollected
  })

  mayPerfTrend.forEach((ind, i) => {
    mayApprAss = ind.assessedAmount
    mayAmtPaid = ind.amountCollected
    mayUnassessedPay = ind.unassessedAmountCollected
  })

  junePerfTrend.forEach((ind, i) => {
    juneApprAss = ind.assessedAmount
    juneAmtPaid = ind.amountCollected
    juneUnassessedPay = ind.unassessedAmountCollected
  })

  julyPerfTrend.forEach((ind, i) => {
    julyApprAss = ind.assessedAmount
    julyAmtPaid = ind.amountCollected
    julyUnassessedPay = ind.unassessedAmountCollected
  })
  augPerfTrend.forEach((ind, i) => {
    augApprAss = ind.assessedAmount
    augAmtPaid = ind.amountCollected
    augUnassessedPay = ind.unassessedAmountCollected
  })
  septPerfTrend.forEach((ind, i) => {
    septApprAss = ind.assessedAmount
    septAmtPaid = ind.amountCollected
    septUnassessedPay = ind.unassessedAmountCollected
  })
  octPerfTrend.forEach((ind, i) => {
    octApprAss = ind.assessedAmount
    octAmtPaid = ind.amountCollected
    octUnassessedPay = ind.unassessedAmountCollected
  })
  novPerfTrend.forEach((ind, i) => {
    novApprAss = ind.assessedAmount
    novAmtPaid = ind.amountCollected
    novUnassessedPay = ind.unassessedAmountCollected
  })
  decPerfTrend.forEach((ind, i) => {
    decApprAss = ind.assessedAmount
    decAmtPaid = ind.amountCollected
    decUnassessedPay = ind.unassessedAmountCollected
  })



  const Trend = [
    {
      name: "Jan",
      approvedassessment: janApprAss,
      amountpaid: janAmtPaid,
      unassessedpayment: janUnassessedPay,
    },
    {
      name: "Feb",
      approvedassessment: febApprAss,
      amountpaid: febAmtPaid,
      unassessedpayment: febUnassessedPay,
    },
    {
      name: "March",
      approvedassessment: marchApprAss,
      amountpaid: marchAmtPaid,
      unassessedpayment: marchUnassessedPay,
    },
    {
      name: "April",
      approvedassessment: aprilApprAss,
      amountpaid: aprilAmtPaid,
      unassessedpayment: aprilUnassessedPay,
    },
    {
      name: "May",
      approvedassessment: mayApprAss,
      amountpaid: mayAmtPaid,
      unassessedpayment: mayUnassessedPay,
    },
    {
      name: "June",
      approvedassessment: juneApprAss,
      amountpaid: juneAmtPaid,
      unassessedpayment: juneUnassessedPay,
    },
    {
      name: "July",
      approvedassessment: julyApprAss,
      amountpaid: julyAmtPaid,
      unassessedpayment: julyUnassessedPay,
    },
    {
      name: "August",
      approvedassessment: augApprAss,
      amountpaid: augAmtPaid,
      unassessedpayment: augUnassessedPay,
    },
    {
      name: "Sep",
      approvedassessment: septApprAss,
      amountpaid: septAmtPaid,
      unassessedpayment: septUnassessedPay,
    },
    {
      name: "Oct",
      approvedassessment: octApprAss,
      amountpaid: octAmtPaid,
      unassessedpayment: octUnassessedPay,
    },
    {
      name: "Nov",
      approvedassessment: novApprAss,
      amountpaid: novAmtPaid,
      unassessedpayment: novUnassessedPay,
    },
    {
      name: "Dec",
      approvedassessment: decApprAss,
      amountpaid: decAmtPaid,
      unassessedpayment: decUnassessedPay,
    }
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
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
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
          <Legend />
          <Line type="monotone" name="Approved Assessment" dataKey="approvedassessment" stroke="#82ca9d" />
          <Line type="monotone" name="Amount Paid" dataKey="amountpaid" stroke="#fcc287" />
          <Line type="monotone" name="Unassessed Payment" dataKey="unassessedpayment" stroke="#fe0037" />
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
      name: "Assessment ID",
      key: "assessment_id",
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
