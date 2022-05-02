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

// Assessmnt bar count variables
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

// cummulative pie variables
let cummApprCount
let cummSubCount


// Amount Assessed variables
let AjaokutaapprAssessedAmt
let AjaokutaSubAssessedAmt

let lokoja1ApprAssessedAmt
let lokoja1SubAssessedAmt

let adaviApprAssessedAmt
let adaviSubAssessedAmt

let lokoja2ApprAssessedAmt
let lokoja2SubAssessedAmt

let headOfficeApprAssessedAmt
let headOfficeSubAssessedAmt

let okeneApprAssessedAmt
let okeneSubAssessedAmt

let isanluApprAssessedAmt
let isanluSubAssessedAmt

let kabbaApprAssessedAmt
let kabbaSubAssessedAmt

let idahApprAssessedAmt
let idahSubAssessedAmt

let kotoApprAssessedAmt
let kotoSubAssessedAmt

let ankpaApprAssessedAmt
let ankpaSubAssessedAmt

let ayingbaApprAssessedAmt
let ayingbaSubAssessedAmt



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
    { name: "Amount Collected", value: amountCol },
    { name: "Outstanding Assessment", value: outstandingAss },
    { name: "Unassessed Collection", value: unassessedCol }
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
  const [colPerformance, setColPerformance] = useState([])

  const [items, setPost] = useState(() => []);
  const [total, setTotal] = useState(() => []);


  useEffect(() => {
    setisFetching(true)
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/dashboard`);
        let itemsBody = res.data.body
        let overview = itemsBody.assessmentOverview;
        let countArray = itemsBody.assessmentCount;
        let colPerfArray = itemsBody.collectionPerfomance
        setAssessCount(countArray)
        setColPerformance(colPerfArray)
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


  // Assessed Amount 
  const ajaokutaApprovedAssAmount = assessCount.filter(data => data.tax_office === "Ajaokuta" && data.status === "Approved");
  const ajaokutaSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Ajaokuta" && data.status === "Submitted");

  const lokoja2ApprovedAssAmount = assessCount.filter(data => data.tax_office === "Lokoja 2" && data.status === "Approved");
  const lokoja2SubmittedAssAmount = assessCount.filter(data => data.tax_office === "Lokoja 2" && data.status === "Submitted");

  const headOfficeApprovedAssAmount = assessCount.filter(data => data.tax_office === "Head Office" && data.status === "Approved");
  const headOfficeSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Head Office" && data.status === "Submitted");

  const okeneApprovedAssAmount = assessCount.filter(data => data.tax_office === "Okene" && data.status === "Approved");
  const okeneSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Okene" && data.status === "Submitted");

  const isanluApprovedAssAmount = assessCount.filter(data => data.tax_office === "Isanlu" && data.status === "Approved");
  const isanluSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Isanlu" && data.status === "Submitted");

  const kabbaApprovedAssAmount = assessCount.filter(data => data.tax_office === "Kabba" && data.status === "Approved");
  const kabbaSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Kabba" && data.status === "Submitted");

  const idahApprovedAssAmount = assessCount.filter(data => data.tax_office === "Idah" && data.status === "Approved");
  const idahSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Idah" && data.status === "Submitted");

  const kotoApprovedAssAmount = assessCount.filter(data => data.tax_office === "Kotonkarfe" && data.status === "Approved");
  const kotoSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Kotonkarfe" && data.status === "Submitted");

  const ankpaApprovedAssAmount = assessCount.filter(data => data.tax_office === "Ankpa" && data.status === "Approved");
  const ankpaSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Ankpa" && data.status === "Submitted");

  const ayingbaApprovedAssAmount = assessCount.filter(data => data.tax_office === "Anyigba" && data.status === "Approved");
  const ayingbaSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Anyigba" && data.status === "Submitted");

  const lokoja1ApprovedAssAmount = assessCount.filter(data => data.tax_office === "Lokoja 1" && data.status === "Approved");
  const lokoja1SubmittedAssAmount = assessCount.filter(data => data.tax_office === "Lokoja 1" && data.status === "Submitted");

  const adaviApprovedAssAmount = assessCount.filter(data => data.tax_office === "Okehi/Adavi" && data.status === "Approved");
  const adaviSubmittedAssAmount = assessCount.filter(data => data.tax_office === "Okehi/Adavi" && data.status === "Submitted");

  ajaokutaApprovedAssAmount.forEach((ind, i) => {
    AjaokutaapprAssessedAmt = ind.amount
  })

  ajaokutaSubmittedAssAmount.forEach((ind, i) => {
    AjaokutaSubAssessedAmt = ind.amount
  })

  lokoja2ApprovedAssAmount.forEach((ind, i) => {
    lokoja2ApprAssessedAmt = ind.amount
  })

  lokoja2SubmittedAssAmount.forEach((ind, i) => {
    lokoja2SubAssessedAmt = ind.amount
  })

  lokoja1ApprovedAssAmount.forEach((ind, i) => {
    lokoja1ApprAssessedAmt = ind.amount
  })

  lokoja1SubmittedAssAmount.forEach((ind, i) => {
    lokoja1SubAssessedAmt = ind.amount
  })

  headOfficeApprovedAssAmount.forEach((ind, i) => {
    headOfficeApprAssessedAmt = ind.amount
  })

  headOfficeSubmittedAssAmount.forEach((ind, i) => {
    headOfficeSubAssessedAmt = ind.amount
  })


  okeneApprovedAssAmount.forEach((ind, i) => {
    okeneApprAssessedAmt = ind.amount
  })

  okeneSubmittedAssAmount.forEach((ind, i) => {
    okeneSubAssessedAmt = ind.amount
  })

  isanluApprovedAssAmount.forEach((ind, i) => {
    isanluApprAssessedAmt = ind.amount
  })

  isanluSubmittedAssAmount.forEach((ind, i) => {
    isanluSubAssessedAmt = ind.amount
  })

  kabbaApprovedAssAmount.forEach((ind, i) => {
    kabbaApprAssessedAmt = ind.amount
  })

  kabbaSubmittedAssAmount.forEach((ind, i) => {
    kabbaSubAssessedAmt = ind.amount
  })

  idahApprovedAssAmount.forEach((ind, i) => {
    idahApprAssessedAmt = ind.amount
  })

  idahSubmittedAssAmount.forEach((ind, i) => {
    idahSubAssessedAmt = ind.amount
  })

  kotoApprovedAssAmount.forEach((ind, i) => {
    kotoApprAssessedAmt = ind.amount
  })
  kotoSubmittedAssAmount.forEach((ind, i) => {
    kotoSubAssessedAmt = ind.amount
  })

  ankpaApprovedAssAmount.forEach((ind, i) => {
    ankpaApprAssessedAmt = ind.amount
  })
  ankpaSubmittedAssAmount.forEach((ind, i) => {
    ankpaSubAssessedAmt = ind.amount
  })


  ayingbaApprovedAssAmount.forEach((ind, i) => {
    ayingbaApprAssessedAmt = ind.amount
  })
  ayingbaSubmittedAssAmount.forEach((ind, i) => {
    ayingbaSubAssessedAmt = ind.amount
  })

  adaviApprovedAssAmount.forEach((ind, i) => {
    adaviApprAssessedAmt = ind.amount
  })
  adaviSubmittedAssAmount.forEach((ind, i) => {
    adaviSubAssessedAmt = ind.amount
  })


  const amountAssessed = [
    {
      name: "Lk2",
      submitted: lokoja2SubAssessedAmt,
      approved: lokoja2ApprAssessedAmt,
    },
    {
      name: "Lk1",
      submitted: lokoja1SubAssessedAmt,
      approved: lokoja1ApprAssessedAmt,
    },
    {
      name: "Adv",
      submitted: adaviSubAssessedAmt,
      approved: adaviApprAssessedAmt,
    },
    {
      name: "HQ",
      submitted: headOfficeSubAssessedAmt,
      approved: headOfficeApprAssessedAmt,
    },
    {
      name: "Okn",
      submitted: okeneSubAssessedAmt,
      approved: okeneApprAssessedAmt,
    },
    {
      name: "Isn",
      submitted: isanluSubAssessedAmt,
      approved: isanluApprAssessedAmt,
    },
    {
      name: "Kbb",
      submitted: kabbaSubAssessedAmt,
      approved: kabbaApprAssessedAmt,
    },
    {
      name: "Idh",
      submitted: idahSubAssessedAmt,
      approved: idahApprAssessedAmt,
    },
    {
      name: "Kot",
      submitted: kotoSubAssessedAmt,
      approved: kotoApprAssessedAmt,
    },
    {
      name: "Ankp",
      submitted: ankpaSubAssessedAmt,
      approved: ankpaApprAssessedAmt,
    },
    {
      name: "Ajk",
      submitted: AjaokutaSubAssessedAmt,
      approved: AjaokutaapprAssessedAmt,
    },
    {
      name: "Any",
      submitted: ayingbaSubAssessedAmt,
      approved: ayingbaApprAssessedAmt,
    }
  ];

  // collection performance

  // Ajaokuta variables
  let AjkamountCollected
  let AjkassessedAmount
  let AjkunassessedAmountCollected
  let AjkOutstanding

  // lokoja 1 variables
  let lk1mountCollected
  let lk1assessedAmount
  let lk1unassessedAmountCollected
  let lk1Outstanding

  // lokoja 2 variables
  let lk2mountCollected
  let lk2assessedAmount
  let lk2unassessedAmountCollected
  let lk2Outstanding

  // HQ variables
  let hqmountCollected
  let hqassessedAmount
  let hqunassessedAmountCollected
  let hqOutstanding

  // Okene variables
  let okenemountCollected
  let okeneassessedAmount
  let okeneunassessedAmountCollected
  let okeneOutstanding

  // Isanlu variables
  let isanlumountCollected
  let isanluassessedAmount
  let isanluunassessedAmountCollected
  let isanluOutstanding

  // Kabba variables
  let kabbamountCollected
  let kabbaassessedAmount
  let kabbaunassessedAmountCollected
  let kabbaOutstanding

  // Idah variables
  let idahmountCollected
  let idahassessedAmount
  let idahunassessedAmountCollected
  let idahOutstanding

  // Adavi variables
  let adavimountCollected
  let adaviassessedAmount
  let adaviunassessedAmountCollected
  let adaviOutstanding

  // Anyigba variables
  let anyigbamountCollected
  let anyigbaassessedAmount
  let anyigbaunassessedAmountCollected
  let anyigbaOutstanding

  // Koto variables
  let kotomountCollected
  let kotoassessedAmount
  let kotounassessedAmountCollected
  let kotoOutstanding

  // Ankpa variables
  let ankpamountCollected
  let ankpaassessedAmount
  let ankpaunassessedAmountCollected
  let ankpaOutstanding

  const ajaokutaColPerf = colPerformance.filter(data => data.tax_office === "Ajaokuta");
  const lk1ColPerf = colPerformance.filter(data => data.tax_office === "Lokoja 1");
  const lk2ColPerf = colPerformance.filter(data => data.tax_office === "Lokoja 2");
  const headOffColPerf = colPerformance.filter(data => data.tax_office === "Head Office");
  const okeneColPerf = colPerformance.filter(data => data.tax_office === "Okene");
  const isanluColPerf = colPerformance.filter(data => data.tax_office === "Isanlu");
  const kabbaColPerf = colPerformance.filter(data => data.tax_office === "Kabba");
  const idahColPerf = colPerformance.filter(data => data.tax_office === "Idah");
  const adaviColPerf = colPerformance.filter(data => data.tax_office === "Okehi/Adavi");
  const anyigbaColPerf = colPerformance.filter(data => data.tax_office === "Anyigba");
  const kotoColPerf = colPerformance.filter(data => data.tax_office === "Kotonkarfe");
  const ankpaColPerf = colPerformance.filter(data => data.tax_office === "Ankpa");


  ajaokutaColPerf.forEach((ind, i) => {
    AjkamountCollected = ind.amountCollected
    AjkassessedAmount = ind.assessedAmount
    AjkunassessedAmountCollected = ind.unassessedAmountCollected
  })
  AjkOutstanding = Number(AjkassessedAmount) - Number(AjkamountCollected)

  lk1ColPerf.forEach((ind, i) => {
    lk1mountCollected = ind.amountCollected
    lk1assessedAmount = ind.assessedAmount
    lk1unassessedAmountCollected = ind.unassessedAmountCollected
  })
  lk1Outstanding = Number(lk1assessedAmount) - Number(lk1mountCollected)

  lk2ColPerf.forEach((ind, i) => {
    lk2mountCollected = ind.amountCollected
    lk2assessedAmount = ind.assessedAmount
    lk2unassessedAmountCollected = ind.unassessedAmountCollected
  })
  lk2Outstanding = Number(lk2assessedAmount) - Number(lk2mountCollected)

  headOffColPerf.forEach((ind, i) => {
    hqmountCollected = ind.amountCollected
    hqassessedAmount = ind.assessedAmount
    hqunassessedAmountCollected = ind.unassessedAmountCollected
  })
  hqOutstanding = Number(hqassessedAmount) - Number(hqmountCollected)

  okeneColPerf.forEach((ind, i) => {
    okenemountCollected = ind.amountCollected
    okeneassessedAmount = ind.assessedAmount
    okeneunassessedAmountCollected = ind.unassessedAmountCollected
  })
  okeneOutstanding = Number(okeneassessedAmount) - Number(okenemountCollected)

  isanluColPerf.forEach((ind, i) => {
    isanlumountCollected = ind.amountCollected
    isanluassessedAmount = ind.assessedAmount
    isanluunassessedAmountCollected = ind.unassessedAmountCollected
  })
  isanluOutstanding = Number(isanluassessedAmount) - Number(isanlumountCollected)

  kabbaColPerf.forEach((ind, i) => {
    kabbamountCollected = ind.amountCollected
    kabbaassessedAmount = ind.assessedAmount
    kabbaunassessedAmountCollected = ind.unassessedAmountCollected
  })
  kabbaOutstanding = Number(kabbaassessedAmount) - Number(kabbamountCollected)

  idahColPerf.forEach((ind, i) => {
    idahmountCollected = ind.amountCollected
    idahassessedAmount = ind.assessedAmount
    idahunassessedAmountCollected = ind.unassessedAmountCollected
  })
  idahOutstanding = Number(idahassessedAmount) - Number(idahmountCollected)

  adaviColPerf.forEach((ind, i) => {
    adavimountCollected = ind.amountCollected
    adaviassessedAmount = ind.assessedAmount
    adaviunassessedAmountCollected = ind.unassessedAmountCollected
  })
  adaviOutstanding = Number(adaviassessedAmount) - Number(adavimountCollected)

  anyigbaColPerf.forEach((ind, i) => {
    anyigbamountCollected = ind.amountCollected
    anyigbaassessedAmount = ind.assessedAmount
    anyigbaunassessedAmountCollected = ind.unassessedAmountCollected
  })
  anyigbaOutstanding = Number(anyigbaassessedAmount) - Number(anyigbamountCollected)

  kotoColPerf.forEach((ind, i) => {
    kotomountCollected = ind.amountCollected
    kotoassessedAmount = ind.assessedAmount
    kotounassessedAmountCollected = ind.unassessedAmountCollected
  })
  kotoOutstanding = Number(kotoassessedAmount) - Number(kotomountCollected)

  ankpaColPerf.forEach((ind, i) => {
    ankpamountCollected = ind.amountCollected
    ankpaassessedAmount = ind.assessedAmount
    ankpaunassessedAmountCollected = ind.unassessedAmountCollected
  })
  ankpaOutstanding = Number(ankpaassessedAmount) - Number(ankpamountCollected)


  const colPerform = [
    {
      name: "Lokoja 2",
      assessed: lk2assessedAmount,
      collected: lk2mountCollected,
      outstanding: lk2Outstanding,
      unassessed: lk2unassessedAmountCollected
    },
    {
      name: "Lokoja 1",
      assessed: lk1assessedAmount,
      collected: lk1mountCollected,
      outstanding: lk1Outstanding,
      unassessed: lk1unassessedAmountCollected
    },
    {
      name: "Adavi",
      assessed: adaviassessedAmount,
      collected: adavimountCollected,
      outstanding: adaviOutstanding,
      unassessed: adaviunassessedAmountCollected
    },
    {
      name: "Head Office",
      assessed: hqassessedAmount,
      collected: hqmountCollected,
      outstanding: hqOutstanding,
      unassessed: hqunassessedAmountCollected
    },
    {
      name: "Okene",
      assessed: okeneassessedAmount,
      collected: okenemountCollected,
      outstanding: okeneOutstanding,
      unassessed: okeneunassessedAmountCollected
    },
    {
      name: "Isanlu",
      assessed: isanluassessedAmount,
      collected: isanlumountCollected,
      outstanding: isanluOutstanding,
      unassessed: isanluunassessedAmountCollected
    },
    {
      name: "Kabba",
      assessed: kabbaassessedAmount,
      collected: kabbamountCollected,
      outstanding: kabbaOutstanding,
      unassessed: kabbaunassessedAmountCollected
    },
    {
      name: "Idah",
      assessed: idahassessedAmount,
      collected: idahmountCollected,
      outstanding: idahOutstanding,
      unassessed: idahunassessedAmountCollected
    },
    {
      name: "Koto",
      assessed: kotoassessedAmount,
      collected: kotomountCollected,
      outstanding: kotoOutstanding,
      unassessed: kotounassessedAmountCollected
    },
    {
      name: "Ankpa",
      assessed: ankpaassessedAmount,
      collected: ankpamountCollected,
      outstanding: ankpaOutstanding,
      unassessed: ankpaunassessedAmountCollected
    },
    {
      name: "Ajaokuta",
      assessed: AjkassessedAmount,
      collected: AjkamountCollected,
      outstanding: AjkOutstanding,
      unassessed: AjkunassessedAmountCollected
    },
    {
      name: "Anyingba",
      assessed: anyigbaassessedAmount,
      collected: anyigbamountCollected,
      outstanding: anyigbaOutstanding,
      unassessed: anyigbaunassessedAmountCollected
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
        let records = [];
        let sum = {};
        let approvedCountSum = [];
        let subCountSum = []
        let submittedAmountSum = [];
        let apprAmtSum = [];
        let paidAmtSum = [];
        let unassessedColSum = [];
        let unpaidAmountCalSum = []

        for (let i = 0; i < HQsummary.length; i++) {
          let rec = HQsummary[i];
          rec.serialNo = num + i
          // rec.submittedAmount = (rec.submittedAmount)
          rec.submittedCount = Number(rec.submittedCount)
          rec.approvedCount = Number(rec.approvedCount)
          rec.approvedAmount = Number(rec.approvedAmount)
          rec.assessedAmountCollected = Number(rec.assessedAmountCollected)
          rec.unassessedAmountCollected = Number(rec.unassessedAmountCollected)
          rec.submittedAmount = Number(rec.submittedAmount)
          rec.unpaidAmountCal = (Number(rec.approvedAmount) - Number(rec.assessedAmountCollected))

          paidAmtSum.push(rec.assessedAmountCollected);
          apprAmtSum.push(rec.approvedAmount)
          submittedAmountSum.push(rec.submittedAmount)
          approvedCountSum.push(rec.approvedCount);
          subCountSum.push(rec.submittedCount);
          unassessedColSum.push(rec.unassessedAmountCollected);
          unpaidAmountCalSum.push(rec.unpaidAmountCal)

          // subCountSum.push(rec.submittedCount)
          // apprAmtSum.push(rec.approvedAmount);
          // paidAmtSum.push(rec.assessedAmountCollected);
          // unpaidAmtSum.push(rec.totalRelief);
          // console.log("unpaidAmountCalSum Array", unpaidAmountCalSum);


          rec.submittedCount = formatNumber(rec.submittedCount)
          rec.approvedCount = formatNumber(rec.approvedCount)
          rec.submittedAmount = formatNumber(rec.submittedAmount)
          rec.approvedAmountFormatted = formatNumber(rec.approvedAmount)
          rec.paidAmountFormatted = formatNumber(rec.assessedAmountCollected)
          rec.unpaidAmountCal = formatNumber(Number(rec.approvedAmount) - Number(rec.assessedAmountCollected))
          rec.unassessedAmountCollected = formatNumber(rec.unassessedAmountCollected);
          records.push(rec);
        }
        const totalapprCount = approvedCountSum.reduce(
          (preVal, curVal) => preVal + curVal,
          0
        );
        const totalsubCountSum = subCountSum.reduce(
          (preVal, curVal) => preVal + curVal,
          0
        );
        const totalApprAmtSum = apprAmtSum.reduce(
          (preVal, curVal) => preVal + curVal,
          0
        );
        const totalPaidAmtSum = paidAmtSum.reduce(
          (preVal, curVal) => preVal + curVal,
          0
        );
        const totalSubmittedAmt = submittedAmountSum.reduce(
          (preVal, curVal) => preVal + curVal,
          0
        );
        const totalUnassessedAmt = unassessedColSum.reduce(
          (preVal, curVal) => preVal + curVal,
          0
        );
        const totalUnpaidAmt = unpaidAmountCalSum.reduce(
          (preVal, curVal) => preVal + curVal,
          0
        );
        // console.log("totalSubmittedAmt", totalSubmittedAmt);
        // console.log("totalPaidAmtSum", totalPaidAmtSum);
        // console.log("totalApprAmtSum", totalApprAmtSum);
        // console.log("totalapprCount", totalapprCount);
        // console.log("totalsubCountSum", totalsubCountSum);
        // console.log("totalUnassessedAmt", totalUnassessedAmt);
        // console.log("totalUnpaidAmt", totalUnpaidAmt);

        sum.totalSubmittedAmt = totalSubmittedAmt;
        sum.totalPaidAmtSum = totalPaidAmtSum;
        sum.totalApprAmtSum = totalApprAmtSum;
        sum.totalapprCount = totalapprCount;
        sum.totalsubCountSum = totalsubCountSum;
        sum.totalUnassessedAmt = totalUnassessedAmt;
        sum.totalUnpaidAmt = totalUnpaidAmt;

        // sum.totalSubmittedAmtSum = totalSubmittedAmtSum;

        setPost(() => records);
        setTotal(() => sum);
      }
      catch (e) {
        console.log(e);
      }
    };
    fetchPost();
  }, []);

  console.log("total", total);

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
                  <Bar name="Submitted" dataKey="submitted" fill="#02321C" stackId="stack" />
                  <Bar name="Approved" dataKey="approved" fill="#82ca9d" stackId="stack" />
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
                  <Bar name="Submitted" dataKey="submitted" fill="#002147" stackId="stack" />
                  <Bar name="Approved" dataKey="approved" fill="#a2add0" stackId="stack" />
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
                  <Bar name="Amount Assessed" dataKey="assessed" fill="#247ba0" stackId="stack" />
                  <Bar name="Amount Collected" dataKey="collected" fill="#0D41E1" stackId="stack" />
                  <Bar name="Amount Outstanding" dataKey="outstanding" fill="#cddafd" stackId="stack" />
                  <Bar name="Unassessed Amount Collected" dataKey="unassessed" fill="#fe938c" stackId="stack" />
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
                    {items.length > 0 && (
                      <tr className="font-semibold">
                        <td>Total</td>
                        {/* <td></td>
                        <td></td> */}
                        <td>{formatNumber(total.totalsubCountSum)}</td>
                        <td>{formatNumber(total.totalapprCount)}</td>
                        <td>{formatNumber(total.totalSubmittedAmt)}</td>
                        <td>{formatNumber(total.totalApprAmtSum)}</td>
                        <td>{formatNumber(total.totalPaidAmtSum)}</td>
                        <td>{formatNumber(total.totalUnpaidAmt)}</td>
                        <td>{formatNumber(total.totalUnassessedAmt)}</td>
                      </tr>
                    )}
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
