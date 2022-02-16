import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import { SelectAnnual } from "../forms/selects";
import SectionTitle from "../section-title";
import { useState } from "react";
import { FiTriangle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import url from '../../config/url';
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";

export const StartAssessment = () => {
  const [kgtEnentered, setKgtEentered] = useState('')
  const [validkgtinmessage, Setvalidkgtinmessage] = useState('')
  const [invalidkgtinmessage, Setinvalidkgtinmessage] = useState('')
  const [disabled, setDisabled] = useState(true);
  const [validmsg, setvalidmsg] = useState("hidden");
  const [invalidmsg, setinvalidmsg] = useState("hidden");
  const [payerDetails, setpayerDetails] = useState([]);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(() => false);
  const [isFetching2, setIsFetching2] = useState(() => false);

  const userKGTN = payerDetails.map(function (det) {
    let kgtin = det.KGTIN
    return kgtin
  })

  const KGTIN = userKGTN[0]
  console.log(KGTIN);

  setAuthToken();
  const onSubmitform = async data => {
    const userkgtin = kgtEnentered
    const year = data.year;
    let createAsses = {
      "year": `${year}`,
      "kgtin": `${KGTIN}`
    }
    setIsFetching2(true)
    try {
      const res = await axios.post(`${url.BASE_URL}forma/new-assessment`, createAsses);
      let assessment_id = res.data.body.assessment_id
      setIsFetching2(false)
      router.push(`/direct-asses/${assessment_id},${KGTIN}`)
      console.log("Assesment Created");
    }
    catch (err) {
      setIsFetching2(false)
      console.log(err);
    }
  };


  setAuthToken();
  const verifiyKGTIN = async () => {
    let testkgtin = kgtEnentered
    let kgtin = {
      "KGTIN": `${testkgtin}`
    }
    setIsFetching(true)
    try {
      let res = await axios.post(`${url.BASE_URL}taxpayer/view-individual`, kgtin);
      setIsFetching(false)
      let userpayer = res.data.body
      setpayerDetails(userpayer)
      Setvalidkgtinmessage("KGTIN is Valid");
      setDisabled(false)
      setvalidmsg('')
      setinvalidmsg('hidden')
    } catch (err) {
      setIsFetching(false)
      setDisabled(true)
      setinvalidmsg('')
      setvalidmsg('hidden')
      Setinvalidkgtinmessage("Invalid KGTIN");
    }
  };
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
          <p className="font-bold">Verifying kgtin...</p>
        </div>
      )}

      {isFetching2 && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching2}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p className="font-bold">Creating Assessment...</p>
        </div>
      )}
      <Widget>
        <div >
          <form onSubmit={handleSubmit(onSubmitform)} className="flex justify-around">

            <div className="flex">
              <div>
                <label className="block" htmlFor="kgtin">Enter Taxpayer KGTIN</label>
                <input onChange={event => setKgtEentered(event.target.value)} type="text" placeholder="Enter KGTIN" />
                <div className="">
                  {payerDetails.map((ind, i) => (
                    <small className={`${validmsg}`} key={i}>{ind.surname} {ind.first_name}</small>
                  ))}
                </div>

                <div className="">
                  <small className={`text-red-600 ${invalidmsg}`}>{invalidkgtinmessage}</small>
                </div>
              </div>
              <div className="self-center ml-2">
                <a
                  onClick={verifiyKGTIN}
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Verify KGTIN
                </a>
              </div>
            </div>

            <div>
              <SelectAnnual
                label="Select Year"
                required
                ref={register()}
                name="year"

              />
            </div>

            <div className="self-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
                disabled={disabled}
              >
                Start Assessment
              </button>
            </div>
          </form>
        </div>
      </Widget>
    </>
  );
};


export const StartSingleIndividualAssessment = ({ payerprop, routerAssId }) => {
  let assessment_id = routerAssId
  let indvData = payerprop

  const [toggleel, setToggle] = useState('hidden')
  const [togglee2, setToggle2] = useState('hidden')
  const [togglee3, setToggle3] = useState('hidden')
  const [togglee4, setToggle4] = useState('hidden')
  const [togglee5, setToggle5] = useState('hidden')
  const [togglee6, setToggle6] = useState('hidden')
  const [togglee7, setToggle7] = useState('hidden')
  const [togglee8, setToggle8] = useState('hidden')
  const [togglee9, setToggle9] = useState('hidden')
  const [togglee10, setToggle10] = useState('hidden')
  const [togglee11, setToggle11] = useState('hidden')
  const [togglee12, setToggle12] = useState('hidden')
  const [togglee13, setToggle13] = useState('hidden')
  const [togglee14, setToggle14] = useState('hidden')
  const [togglee15, setToggle15] = useState('hidden')
  const [resiToggle, setresToggle] = useState('hidden')
  const [marriedToggle, setmarriedToggle] = useState('hidden')
  const [childrenToggle, setchildrenToggle] = useState('hidden')
  const [servantsToggle, setservantsToggle] = useState('hidden')
  const [form1toggle, setform1toggle] = useState('')
  const [form2toggle, setform2toggle] = useState('')
  const [empName, setEmpName] = useState("");
  const [empAdd, setEmpAdd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [grossPay, setGrossPay] = useState("");
  const [taxDeduct, setTaxDeduct] = useState("");
  const [paySLip, setPaySlip] = useState(null);
  const [isFetching3, setIsFetching3] = useState(() => false);
  const [isFetching4, setIsFetching4] = useState(() => false);
  const [isFetching5, setIsFetching5] = useState(() => false);
  const [isFetching6, setIsFetching6] = useState(() => false);
  const [isFetching7, setIsFetching7] = useState(() => false);
  const [isFetching8, setIsFetching8] = useState(() => false);
  const [isFetching9, setIsFetching9] = useState(() => false);
  const [isFetching10, setIsFetching10] = useState(() => false);
  const [isFetching11, setIsFetching11] = useState(() => false);
  const [isFetching12, setIsFetching12] = useState(() => false);
  const [isFetching13, setIsFetching13] = useState(() => false);
  const [isFetching14, setIsFetching14] = useState(() => false);
  const [isFetching15, setIsFetching15] = useState(() => false);
  const [isFetching16, setIsFetching16] = useState(() => false);
  const [isFetching17, setIsFetching17] = useState(() => false);
  const [isFetching18, setIsFetching18] = useState(() => false);
  const [isFetching19, setIsFetching19] = useState(() => false);
  const [isFetching20, setIsFetching20] = useState(() => false);
  const router = useRouter();

  const [pensionDeduct, setPensionDeduct] = useState(
    { assessment_id: "", pfa: "", pfa_addr: "", rsa_no: "", amount: "", comments: "" }
  )

  const [spouse, setSpouse] = useState(
    { assessment_id: "", name: "", employer: "", dob: "", occupation: "", employer_addr: "" }
  )

  const [childData, setChildData] = useState(
    { assessment_id: "", name: "", dob: "", school_name: "", school_addr: "", school_fees: "", child_income: "" }
  )

  const [residentialAddress, setResidentialAddress] = useState(
    {
      assessment_id: "", house_no: "", street: "", town: "", lga: "", residence_type: "",
      residence_owner: "", annual_rent: "", owner_name: "", owner_phone: ""
    }
  )

  const [domesticStaff, setDomesticStaff] = useState(
    {
      assessment_id: "", title: "", name: "", house_no: "", street: "",
      town: "", lga: "", state: "", amount_paid: "", payer: ""
    }
  )

  const [partnerData, setPartnerData] = useState(
    {
      assessment_id: "", name: "", addr: "", phone: "", percentage: "",
      comments: ""
    }
  )

  let res_no = indvData.map(function (x) {
    let houseNumb = x.house_no
    return houseNumb
  })

  residentialAddress.house_no = String(res_no)

  let streetVal = indvData.map(function (x) {
    let street = x.street
    return street
  })

  residentialAddress.street = String(streetVal)


  let lgaVal = indvData.map(function (x) {
    let lga = x.lga
    return lga
  })

  residentialAddress.lga = String(lgaVal)

  const [selfEmployed, setSelfEmployed] = useState(
    {
      assessment_id: "", business_type: "", business_name: "", business_addr: "", business_start_date: "", income_earned: "",
      other_income: "", cash_inc_expense: "", expense: "", figures_estimated: ""
    }
  )

  let incEarned = Number(selfEmployed.income_earned)
  let otherInc = Number(selfEmployed.other_income)
  const totalBusInc = incEarned + otherInc

  const [expensesData, setExpenses] = useState(
    {
      assessment_id: "", item: "", amount: ""
    }
  )

  let expenseAmount = Number(expensesData.amount)
  const netProfit = totalBusInc - expenseAmount

  const [nhisData, setNhis] = useState(
    {
      assessment_id: "", company: "", addr: "", insurance_no: "", amount: "", comments: ""
    }
  )

  const [lifeInsData, setLifeInsData] = useState(
    {
      assessment_id: "", company: "", addr: "", rsa_no: "", amount: "", comments: ""
    }
  )

  const [bankInterest, setBankInterest] = useState(
    {
      assessment_id: "", name: "", account: "", bvn: "", gross_amount: "", comments: ""
    }
  )

  const [rentIncome, setRentIncome] = useState(
    {
      assessment_id: "", prop_type: "", prop_address: "", rental_type: "", rental_amount: "",
      renter_phone: "", renter_name: "", comments: ""
    }
  )
  const [dividends, setDividends] = useState(
    {
      assessment_id: "", name: "", addr: "", amount: "", comments: "",
    }
  )

  const [pension, setPension] = useState(
    {
      assessment_id: "", pfa: "", pfa_addr: "", gross_amount: "", comments: "",
    }
  )
  const [asset, setAsset] = useState(
    {
      assessment_id: "", asset_type: "", asset_addr: "", buyer_name: "",
      buyer_addr: "", buyer_phone: "", amount: "", comments: ""
    }
  )

  const [outsideSource, SetOutsideSource] = useState(
    {
      assessment_id: "", source: "", gross_amount: "", comments: ""
    }
  )

  function handlePenDeductChange(evt) {
    const value = evt.target.value;
    setPensionDeduct({
      ...pensionDeduct,
      [evt.target.name]: value
    });
  }

  function handleSpouseDeductChange(evt) {
    const value = evt.target.value;
    setSpouse({
      ...spouse,
      [evt.target.name]: value
    });
  }

  function handleResidentialChange(evt) {
    const value = evt.target.value;
    setResidentialAddress({
      ...residentialAddress,
      [evt.target.name]: value
    });
  }

  function handleSelfEmployedChange(evt) {
    const value = evt.target.value;
    setSelfEmployed({
      ...selfEmployed,
      [evt.target.name]: value
    });
  }

  function handleExpenseChange(evt) {
    const value = evt.target.value;
    setExpenses({
      ...expensesData,
      [evt.target.name]: value
    });
  }

  function handleNHISChange(evt) {
    const value = evt.target.value;
    setNhis({
      ...nhisData,
      [evt.target.name]: value
    });
  }

  function handleLifeInsChange(evt) {
    const value = evt.target.value;
    setLifeInsData({
      ...lifeInsData,
      [evt.target.name]: value
    });
  }
  function handleChildChange(evt) {
    const value = evt.target.value;
    setChildData({
      ...childData,
      [evt.target.name]: value
    });
  }

  function handleDomesticStaffChange(evt) {
    const value = evt.target.value;
    setDomesticStaff({
      ...domesticStaff,
      [evt.target.name]: value
    });
  }

  function handlePartnershipChange(evt) {
    const value = evt.target.value;
    setPartnerData({
      ...partnerData,
      [evt.target.name]: value
    });
  }

  function handleRentIncomeChange(evt) {
    const value = evt.target.value;
    setRentIncome({
      ...rentIncome,
      [evt.target.name]: value
    });

  }

  function handleBankInterestChange(evt) {
    const value = evt.target.value;
    setBankInterest({
      ...bankInterest,
      [evt.target.name]: value
    });

  }

  function handleDividendsChange(evt) {
    const value = evt.target.value;
    setDividends({
      ...dividends,
      [evt.target.name]: value
    });
  }

  function handlePensionChange(evt) {
    const value = evt.target.value;
    setPension({
      ...pension,
      [evt.target.name]: value
    });
  }

  function handleAssetChange(evt) {
    const value = evt.target.value;
    setAsset({
      ...asset,
      [evt.target.name]: value
    });
    console.log(asset);
  }

  function handleOutsideSourceChange(evt) {
    const value = evt.target.value;
    SetOutsideSource({
      ...outsideSource,
      [evt.target.name]: value
    });
    console.log(outsideSource);
  }



  setAuthToken();
  let submitDataEmployed = async (e) => {
    e.preventDefault()
    setIsFetching3(true)
    const formData = new FormData();
    formData.append('assessment_id', assessment_id);
    formData.append('emp_name', empName);
    formData.append('emp_addr', empAdd);
    formData.append('start_date', startDate);
    formData.append('gross_pay', grossPay);
    formData.append('tax_deducted', taxDeduct);
    formData.append('pay_slip', paySLip);
    try {
      let res = await axios.post(`${url.BASE_URL}forma/employed`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching3(false)
      alert("successful!");
    } catch (error) {
      alert("Cannot Submit please try again");
      setIsFetching3(false)
    }

  }

  setAuthToken();
  let submitDataPenDeduct = async (e) => {
    e.preventDefault()
    setIsFetching4(true)
    let pendedObj = {
      assessment_id: `${assessment_id}`,
      pfa: `${pensionDeduct.pfa}`,
      pfa_addr: `${pensionDeduct.pfa_addr}`,
      rsa_no: `${pensionDeduct.rsa_no}`,
      amount: `${pensionDeduct.amount}`,
      comments: `${pensionDeduct.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/pension-ded`, pendedObj);
      setIsFetching4(false)
      alert("successful!");
    } catch (error) {
      alert("Cannot Submit, please try again")
      setIsFetching4(false)
    }

  }

  setAuthToken();
  let submitDataSpouse = async (e) => {
    e.preventDefault()
    setIsFetching5(true)
    let spouseObj = {
      assessment_id: `${assessment_id}`,
      name: `${spouse.name}`,
      employer: `${spouse.employer}`,
      dob: `${spouse.dob}`,
      occupation: `${spouse.occupation}`,
      employer_addr: `${spouse.employer_addr}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/spouse`, spouseObj);
      setIsFetching5(false)
      alert("successful!");
    } catch (error) {
      alert("Cannot Submit Please try again")
      setIsFetching5(false)
    }

  }

  setAuthToken();
  let submitDataResAdd = async (e) => {
    e.preventDefault()
    setIsFetching6(true)
    let resAddObj = {
      assessment_id: `${assessment_id}`,
      house_no: `${residentialAddress.house_no}`,
      street: `${residentialAddress.street}`,
      town: `${residentialAddress.town}`,
      lga: `${residentialAddress.lga}`,
      residence_type: `${residentialAddress.residence_type}`,
      residence_owner: `${residentialAddress.residence_owner}`,
      annual_rent: `${residentialAddress.annual_rent}`,
      owner_name: `${residentialAddress.owner_name}`,
      owner_phone: `${residentialAddress.owner_phone}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/residence-addr`, resAddObj);
      setIsFetching6(false)
      alert("successful!");
    } catch (error) {
      alert("Cannot Submit, Please try again")
      setIsFetching6(false)
    }

  }

  setAuthToken();
  let submitDataselfEmp = async (e) => {
    e.preventDefault()
    setIsFetching7(true)
    let selfEmpObj = {
      assessment_id: `${assessment_id}`,
      business_type: `${selfEmployed.business_type}`,
      business_name: `${selfEmployed.business_name}`,
      business_addr: `${selfEmployed.business_addr}`,
      business_start_date: `${selfEmployed.business_start_date}`,
      income_earned: `${selfEmployed.income_earned}`,
      other_income: `${selfEmployed.other_income}`,
      cash_inc_expense: `${selfEmployed.cash_inc_expense}`,
      expense: `${selfEmployed.expense}`,
      figures_estimated: `${selfEmployed.figures_estimated}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/self-employed`, selfEmpObj);
      setIsFetching7(false)
      alert("successful!");
    } catch (error) {
      console.log(error);
      alert("Cannot submit, please try again")
      setIsFetching7(false)
    }

  }


  setAuthToken();
  let submitDataNhis = async (e) => {
    e.preventDefault()
    setIsFetching8(true)
    let nhisDataObj = {
      assessment_id: `${assessment_id}`,
      company: `${nhisData.company}`,
      addr: `${nhisData.addr}`,
      insurance_no: `${nhisData.insurance_no}`,
      amount: `${nhisData.amount}`,
      comments: `${nhisData.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/nhis`, nhisDataObj);
      setIsFetching8(false)
      alert("successful!");
    } catch (error) {
      alert("Cannot Submit, Please try again")
      console.log(error);
      setIsFetching8(false)
    }

  }

  setAuthToken();
  let submitDataLifIns = async (e) => {
    e.preventDefault()
    setIsFetching9(true)
    let lifeInsDataObj = {
      assessment_id: `${assessment_id}`,
      company: `${lifeInsData.company}`,
      addr: `${lifeInsData.addr}`,
      rsa_no: `${lifeInsData.rsa_no}`,
      amount: `${lifeInsData.amount}`,
      comments: `${lifeInsData.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/lap`, lifeInsDataObj);
      setIsFetching9(false)
      alert("successful!");
    } catch (error) {
      alert("Cannot Submit, Please try again")
      setIsFetching9(false)
    }

  }

  setAuthToken();
  let submitDataExpense = async (e) => {
    e.preventDefault()
    setIsFetching10(true)
    let expenseDataObj = {
      assessment_id: `${assessment_id}`,
      item: `${expensesData.item}`,
      amount: `${expensesData.amount}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/expenses`, expenseDataObj);
      setIsFetching10(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching10(false)
    }
  }

  setAuthToken();
  let submitDataChild = async (e) => {
    e.preventDefault()
    setIsFetching11(true)
    let childDataObj = {
      assessment_id: `${assessment_id}`,
      name: `${childData.name}`,
      dob: `${childData.dob}`,
      school_name: `${childData.school_name}`,
      school_addr: `${childData.school_name}`,
      school_fees: `${childData.school_fees}`,
      child_income: `${childData.school_fees}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/children`, childDataObj);
      setIsFetching11(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching11(false)
    }
  }

  setAuthToken();
  let submitDataStaff = async (e) => {
    e.preventDefault()
    setIsFetching12(true)
    let staffDataObj = {
      assessment_id: `${assessment_id}`,
      title: `${domesticStaff.title}`,
      name: `${domesticStaff.name}`,
      street: `${domesticStaff.street}`,
      house_no: `${domesticStaff.house_no}`,
      town: `${domesticStaff.town}`,
      lga: `${domesticStaff.lga}`,
      state: `${domesticStaff.lga}`,
      amount_paid: `${domesticStaff.amount_paid}`,
      payer: `${domesticStaff.payer}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/domestic-staff`, staffDataObj);
      setIsFetching12(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching12(false)
    }
  }

  setAuthToken();
  let submitDataPartner = async (e) => {
    e.preventDefault()
    setIsFetching13(true)
    let partnerDataObj = {
      assessment_id: `${assessment_id}`,
      name: `${partnerData.name}`,
      addr: `${partnerData.addr}`,
      phone: `${partnerData.phone}`,
      percentage: `${partnerData.percentage}`,
      comments: `${partnerData.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/partner`, partnerDataObj);
      setIsFetching13(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching13(false)
    }
  }

  setAuthToken();
  let submitDataRentInc = async (e) => {
    e.preventDefault()
    setIsFetching14(true)
    let rentIncomeDataObj = {
      assessment_id: `${assessment_id}`,
      prop_type: `${rentIncome.prop_type}`,
      prop_address: `${rentIncome.prop_address}`,
      rental_type: `${rentIncome.rental_type}`,
      rental_amount: `${rentIncome.rental_amount}`,
      renter_name: `${rentIncome.renter_name}`,
      renter_phone: `${rentIncome.renter_phone}`,
      comments: `${rentIncome.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/rent-income`, rentIncomeDataObj);
      setIsFetching14(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching14(false)
    }
  }

  setAuthToken();
  let submitDataBankInt = async (e) => {
    e.preventDefault()
    setIsFetching16(true)
    let bankInterestDataObj = {
      assessment_id: `${assessment_id}`,
      name: `${bankInterest.name}`,
      account: `${bankInterest.account}`,
      bvn: `${bankInterest.bvn}`,
      gross_amount: `${bankInterest.gross_amount}`,
      comments: `${bankInterest.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/bank-interest`, bankInterestDataObj);
      setIsFetching16(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching16(false)
    }
  }

  setAuthToken();
  let submitDataDividends = async (e) => {
    e.preventDefault()
    setIsFetching17(true)
    let dividendsDataObj = {
      assessment_id: `${assessment_id}`,
      name: `${dividends.name}`,
      addr: `${dividends.addr}`,
      amount: `${dividends.amount}`,
      comments: `${dividends.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/dividends`, dividendsDataObj);
      setIsFetching17(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching17(false)
    }
  }

  setAuthToken();
  let submitDataPension = async (e) => {
    e.preventDefault()
    setIsFetching18(true)
    let pensionDataObj = {
      assessment_id: `${assessment_id}`,
      pfa: `${pension.pfa}`,
      pfa_addr: `${pension.pfa_addr}`,
      gross_amount: `${pension.gross_amount}`,
      comments: `${pension.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/pension`, pensionDataObj);
      setIsFetching18(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching18(false)
    }
  }

  setAuthToken();
  let submitDataAsset = async (e) => {
    e.preventDefault()
    setIsFetching19(true)
    let assetDataObj = {
      assessment_id: `${assessment_id}`,
      asset_type: `${asset.asset_type}`,
      asset_addr: `${asset.asset_addr}`,
      buyer_name: `${asset.buyer_name}`,
      buyer_addr: `${asset.buyer_addr}`,
      buyer_phone: `${asset.buyer_phone}`,
      amount: `${asset.amount}`,
      comments: `${asset.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/assets`, assetDataObj);
      setIsFetching19(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching19(false)
    }
  }

  setAuthToken();
  let submitDataOutsideSource = async (e) => {
    e.preventDefault()
    setIsFetching20(true)
    let outsideSourceDataObj = {
      assessment_id: `${assessment_id}`,
      source: `${outsideSource.source}`,
      gross_amount: `${outsideSource.gross_amount}`,
      comments: `${outsideSource.comments}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/outside-source`, outsideSourceDataObj);
      setIsFetching20(false)
      alert("submitted successfully!");
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching20(false)
    }
  }

  let formSubmitNhisCal = Number(nhisData.amount)
  let formSubmitLapCal = Number(lifeInsData.amount)
  let formSubmitPensCal = Number(pensionDeduct.amount)

  setAuthToken();
  let submitAssessmentForm = async (e) => {
    e.preventDefault()
    setIsFetching15(true)
    let assessFormObj = {
      assessment_id: `${assessment_id}`,
      employed: `${grossPay}`,
      selfEmployed: `${totalBusInc}`,
      nhis: `${formSubmitNhisCal}`,
      lap: `${formSubmitLapCal}`,
      pension: `${formSubmitPensCal}`,
    }
    try {
      let res = await axios.put(`${url.BASE_URL}forma/tax-cal`, assessFormObj);
      console.log(res);
      setIsFetching15(false)
      router.push('/submitre')
      alert("successful!");
    } catch (error) {
      alert("Cannot Submit, Please try again")
      console.log(error);
      setIsFetching15(false)
    }

  }

  const onChange = e => {
    let toggleval = ''
    setToggle(toggleval)
  };

  const onChange2 = e => {
    // e.preventDefault()
    let toggleval = 'hidden'
    setToggle(toggleval)
  };

  const onChange3 = e => {
    let toggleval = ''
    setToggle2(toggleval)

  };
  const onChange4 = e => {
    // e.preventDefault()
    let toggleval = 'hidden'
    setToggle2(toggleval)

  };
  const onChange5 = e => {
    let toggleval = ''
    setToggle3(toggleval)
  };

  const onChange6 = e => {
    let toggleval = 'hidden'
    setToggle3(toggleval)
  };
  const onChange7 = e => {
    let toggleval = ''
    setToggle4(toggleval)

  };
  const onChange8 = e => {
    let toggleval = 'hidden'
    setToggle4(toggleval)

  };
  const onChange9 = e => {
    let toggleval = ''
    setToggle5(toggleval)
  };

  const onChange10 = e => {
    let toggleval = 'hidden'
    setToggle5(toggleval)
  };
  const onChange11 = e => {
    let toggleval = ''
    setToggle6(toggleval)

  };
  const onChange12 = e => {
    let toggleval = 'hidden'
    setToggle6(toggleval)

  };
  const onChange13 = e => {
    let toggleval = ''
    setToggle7(toggleval)
  };

  const onChange14 = e => {
    let toggleval = 'hidden'
    setToggle7(toggleval)
  };
  const onChange15 = e => {
    let toggleval = ''
    setToggle8(toggleval)

  };
  const onChange16 = e => {
    let toggleval = 'hidden'
    setToggle8(toggleval)

  };
  const onChange17 = e => {
    let toggleval = ''
    setToggle9(toggleval)
  };

  const onChange18 = e => {
    let toggleval = 'hidden'
    setToggle9(toggleval)
  };
  const onChange19 = e => {
    let toggleval = ''
    setToggle10(toggleval)

  };
  const onChange20 = e => {
    let toggleval = 'hidden'
    setToggle10(toggleval)

  };
  const onChange21 = e => {
    let toggleval = ''
    setToggle11(toggleval)
  };

  const onChange22 = e => {
    let toggleval = 'hidden'
    setToggle11(toggleval)
  };
  const onChange23 = e => {
    let toggleval = ''
    setToggle12(toggleval)

  };
  const onChange24 = e => {
    let toggleval = 'hidden'
    setToggle12(toggleval)

  };
  const onChange25 = e => {
    let toggleval = ''
    setToggle13(toggleval)

  };
  const onChange26 = e => {
    let toggleval = 'hidden'
    setToggle13(toggleval)

  };
  const onChange27 = e => {
    let toggleval = ''
    setToggle14(toggleval)

  };
  const onChange28 = e => {
    let toggleval = 'hidden'
    setToggle14(toggleval)

  };
  const onChange29 = e => {
    let toggleval = ''
    setToggle15(toggleval)

  };
  const onChange30 = e => {
    let toggleval = 'hidden'
    setToggle15(toggleval)

  };

  const onresidenceToggleYes = e => {
    let toggleval = 'hidden'
    setresToggle(toggleval)

  };

  const MarriedYes = e => {
    let toggleval = ''
    setmarriedToggle(toggleval)

  };
  const MarriedNo = e => {
    let toggleval = 'hidden'
    setmarriedToggle(toggleval)

  };
  const childrenYes = e => {
    let toggleval = ''
    setchildrenToggle(toggleval)

  };
  const childrenNo = e => {
    let toggleval = 'hidden'
    setchildrenToggle(toggleval)

  };
  const servantsYes = e => {
    let toggleval = ''
    setservantsToggle(toggleval)

  };
  const servantsNo = e => {
    let toggleval = 'hidden'
    setservantsToggle(toggleval)

  };

  const onresidenceToggleNo = e => {
    let toggleval = ''
    setresToggle(toggleval)

  };

  const formTog1 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle(toggleval)

  };
  const formTog2 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle2(toggleval)

  };
  const formTog3 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle3(toggleval)

  };
  const formTog4 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle4(toggleval)

  };
  const formTog5 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle5(toggleval)

  };
  const formTog6 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle6(toggleval)

  };
  const formTog7 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle7(toggleval)

  };
  const formTog8 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle8(toggleval)

  };
  const formTog9 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle9(toggleval)

  };
  const formTog10 = e => {
    e.preventDefault()
    let toggleva = 'hidden'
    setToggle10(toggleva)

  };
  const formTog11 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle11(toggleval)

  };
  const formTog12 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle12(toggleval)

  };

  return (
    <>
      <div className="flex justify-start">
        <div className="mr-2">
          <SectionTitle title="Applicable during the year ended 31st December" />
        </div>
        <SelectAnnual
          // label="Select Year"
          // required
          // ref={register()}
          name="year"
        />
      </div>
      <div className="block p-6 rounded-lg bg-white w-full">
        <div className="flex">
          <h6 className="p-2">Taxpayer Information</h6>
          <a href="" className="text-blue-600 self-center">Edit</a>
        </div>
        <p className="mb-3 font-bold"></p>
        <form>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <p>Surname</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.surname} disabled />
              ))}
            </div>

            <div className="form-group mb-6">
              <p>First Name</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.first_name} disabled />
              ))}
            </div>

            <div className="form-group mb-6">
              <p>Middle Name</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.middle_name} disabled />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Title</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.indv_title} disabled />
              ))}
            </div>

            <div className="form-group mb-6">
              <p>Date of Birth</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.birth_date} disabled />
              ))}
            </div>
            <div className="form-group mb-6">
              <p>Phone number</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.phone_number} disabled />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Tax Office</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.tax_office} disabled />
              ))}
            </div>

            <div className="form-group mb-6">
              <p>Email</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.email} disabled />
              ))}

            </div>
          </div>
        </form>
      </div>

      <div className="block p-6 rounded-lg bg-white w-full">
        <div className="flex">
          <h6 className="p-2">Current Residential address</h6>
        </div>
        {isFetching6 && (
          <div className="flex justify-center item mb-2">
            <Loader
              visible={isFetching6}
              type="BallTriangle"
              color="#00FA9A"
              height={19}
              width={19}
              timeout={0}
              className="ml-2"
            />
            <p className="font-bold">Saving...</p>
          </div>
        )}
        <form onSubmit={submitDataResAdd}>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-6">
              <p>House No</p>
              <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                name="house_no" value={residentialAddress.house_no} disabled />
            </div>

            <div className="form-group mb-6">
              <p>Street</p>
              <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                name="street" value={residentialAddress.street} disabled />
            </div>
            <div className="form-group mb-6">
              <p>LGA</p>
              <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                name="lga" value={residentialAddress.lga} disabled />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Town</p>
              <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                name="town" value={residentialAddress.town} />

            </div>

            <div className="form-check form-check-inline">
              <p>Type of Residence</p>
              <select onChange={handleResidentialChange} className="form-select w-full" name="residence_type" value={residentialAddress.residence_type}>
                <option value="select">Select</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Mansion">Mansion</option>
                <option value="Apartment or Flat">Apartment or Flat</option>
                <option value="Terraced house">Terraced house</option>
                <option value="Duplex">Duplex</option>
                <option value="Traditional house">Traditional house</option>
              </select>
            </div>

            <div className="form-check form-check-inline ml-5 self-center">
              <p>Do you own your place of residence?</p>
              <div className="flex">
                <div className="form-check form-check-inline">
                  <input onChange={onresidenceToggleYes} name="residence_owner" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                  <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Owner</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onresidenceToggleNo} name="residence_owner" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Rented</label>
                </div>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-3 gap-4 ${resiToggle}`}>
            <div className="form-group mb-6">
              <input onChange={handleResidentialChange} type="text" name="annual_rent" value={residentialAddress.annual_rent} className="form-control w-full rounded"
                placeholder="Annual rent" />
            </div>

            <div className="form-group mb-6">
              <input onChange={handleResidentialChange} type="text" name="owner_name" value={residentialAddress.owner_name} className="form-control w-full rounded"
                placeholder="Name of owner" />
            </div>
            <div className="form-group mb-6">
              <input onChange={handleResidentialChange} type="text" name="owner_phone" value={residentialAddress.owner_phone} className="form-control w-full rounded"
                placeholder="Phone number" />
            </div>
          </div>
          <div>
            <button
              style={{ backgroundColor: "#84abeb" }}
              className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="block p-6 rounded-lg bg-white w-full">

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-6">
            <p>Are you Married ?</p>
          </div>
          <div className="flex">
            <div className="form-check form-check-inline">
              <input onClick={MarriedYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
            </div>

            <div className="form-check form-check-inline ml-5">
              <input onClick={MarriedNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
            </div>
          </div>
        </div>

        <div className={`${marriedToggle}`}>
          {isFetching5 && (
            <div className="flex justify-center item mb-2">
              <Loader
                visible={isFetching5}
                type="BallTriangle"
                color="#00FA9A"
                height={19}
                width={19}
                timeout={0}
                className="ml-2"
              />
              <p className="font-bold">Saving...</p>
            </div>
          )}
          <form className="grid grid-cols-3 gap-4" onSubmit={submitDataSpouse}>
            <div className="form-group mb-6">
              <p>Name of spouse</p>
              <input onChange={handleSpouseDeductChange} required name="name" value={spouse.name} type="text" className="form-control w-full rounded"
                placeholder="Name of spouse in full" />
            </div>

            <div className="form-group mb-6">
              <p>Date of Birth</p>
              <input onChange={handleSpouseDeductChange} required name="dob" value={spouse.dob} type="date" className="form-control w-full rounded"
                placeholder="Date of birth" />
            </div>
            <div className="form-group mb-6">
              <p>Business/Employer</p>
              <input onChange={handleSpouseDeductChange} required name="employer" value={spouse.employer} type="text" className="form-control w-full rounded"
                placeholder="Employer/Business of spouse" />
            </div>
            <div className="form-group mb-6">
              <p>Occupation</p>
              <input onChange={handleSpouseDeductChange} required name="occupation" value={spouse.occupation} type="text" className="form-control w-full rounded"
                placeholder="Occupation" />
            </div>
            <div className="form-group mb-6">
              <p>Office/Business Address</p>
              <input onChange={handleSpouseDeductChange} required name="employer_addr" value={spouse.employer_addr} type="text" className="form-control w-full rounded"
                placeholder="Employer's/business address of spouse" />
            </div>
            <div >
            </div>
            <div>
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="block p-6 rounded-lg bg-white w-full">

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-6">
            <p>Do you have children ?</p>
          </div>
          <div className="flex">
            <div className="form-check form-check-inline">
              <input onClick={childrenYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
            </div>

            <div className="form-check form-check-inline ml-5">
              <input onClick={childrenNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
            </div>
          </div>
        </div>
        <form onSubmit={submitDataChild}>
          {isFetching11 && (
            <div className="flex justify-center item mb-2">
              <Loader
                visible={isFetching11}
                type="BallTriangle"
                color="#00FA9A"
                height={19}
                width={19}
                timeout={0}
                className="ml-2"
              />
              <p className="font-bold">Saving...</p>
            </div>
          )}
          <div className={`grid grid-cols-3 gap-4 ${childrenToggle}`}>
            <div className="form-group mb-6">
              <p>Name of Child</p>
              <input required onChange={handleChildChange} name="name" value={childData.name} type="text" className="form-control w-full rounded"
                placeholder="Name of child in full" />
            </div>
            <div className="form-group mb-6">
              <p>Date of Birth</p>
              <input required onChange={handleChildChange} name="dob" value={childData.dob} type="date" className="form-control w-full rounded"
                placeholder="Date of birth" />
            </div>
            <div className="form-group mb-6">
              Child School Name
              <input required onChange={handleChildChange} name="school_name" value={childData.school_name} type="text" className="form-control w-full rounded"
                placeholder="Name of child's school" />
            </div>
            <div className="form-group mb-6">
              School Address
              <input required onChange={handleChildChange} name="school_addr" value={childData.school_addr} type="text" className="form-control w-full rounded"
                placeholder="Address of child's school" />
            </div>
            <div className="form-group mb-6">
              <p>School Fees</p>
              <input required onChange={handleChildChange} name="school_fees" value={childData.school_fees} type="text" className="form-control w-full rounded"
                placeholder="Child's school fees per session" />
            </div>
            <div className="form-group mb-6">
              <p>Child's Income</p>
              <input required onChange={handleChildChange} name="child_income" value={childData.child_income} type="text" className="form-control w-full rounded"
                placeholder="Child's income in own right" />
            </div>
            <div>
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="block p-6 rounded-lg bg-white w-full">

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-6">
            <p>Do you have domestic Staff ?</p>
          </div>
          <div className="flex">
            <div className="form-check form-check-inline">
              <input onClick={servantsYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
            </div>

            <div className="form-check form-check-inline ml-5">
              <input onClick={servantsNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
            </div>
          </div>

        </div>

        {isFetching12 && (
          <div className="flex justify-center item mb-2">
            <Loader
              visible={isFetching12}
              type="BallTriangle"
              color="#00FA9A"
              height={19}
              width={19}
              timeout={0}
              className="ml-2"
            />
            <p className="font-bold">Saving...</p>
          </div>
        )}
        <form onSubmit={submitDataStaff} className={`grid grid-cols-3 gap-4 ${servantsToggle}`}>
          <div className="form-group mb-6">
            <p>Title</p>
            <select onChange={handleDomesticStaffChange} className="form-select w-full" name="title" value={domesticStaff.title}>
              <option selected>Mr/Mrs</option>
              <option value="1">Mr</option>
              <option value="2">Mrs</option>
            </select>
          </div>

          <div className="form-group mb-6">
            <p>Name</p>
            <input onChange={handleDomesticStaffChange} type="text" value={domesticStaff.name} className="form-control w-full rounded"
              name="name" placeholder="Full name" />
          </div>

          <div className="form-group mb-6">
            <p>House Number</p>
            <input onChange={handleDomesticStaffChange} type="text" className="form-control w-full rounded"
              name="house_no" value={domesticStaff.house_no} placeholder="House/plot no" />
          </div>
          <div className="form-group mb-6">
            <p>Street</p>
            <input onChange={handleDomesticStaffChange} name="street" value={domesticStaff.street} type="text" className="form-control w-full rounded"
              placeholder="Street" />
          </div>
          <div className="form-group mb-6">
            <p>Town</p>
            <input onChange={handleDomesticStaffChange} type="text" name="town" value={domesticStaff.town} className="form-control w-full rounded"
              placeholder="Town/Area" />
          </div>
          <div className="form-group mb-6">
            <p>LGA</p>
            <select onChange={handleDomesticStaffChange} className="form-select w-full" name="lga" value={domesticStaff.lga}>
              <option selected>Select</option>
              <option value="1">Kabba</option>
              <option value="2">Kabba</option>
            </select>
          </div>
          <div className="form-group mb-6">
            <p>State</p>
            <select onChange={handleDomesticStaffChange} className="form-select w-full" name="state" value={domesticStaff.state}>
              <option value="3">Kogi</option>
              <option value="1">Mr</option>
              <option value="2">Mrs</option>
            </select>
          </div>
          <div className="form-group mb-6">
            <p>Annual Pay</p>
            <input onChange={handleDomesticStaffChange} name="amount_paid" value={domesticStaff.amount_paid} type="text" className="form-control w-full rounded"
              placeholder="Amount paid (Annual)" />
          </div>

          <div className="flex justify-between self-center">
            <div className="form-check form-check-inline ">
              <input onChange={handleDomesticStaffChange} value="employer" name="payer" checked={domesticStaff.payer === "employer"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
              <label className="form-check-label  text-gray-800" for="inlineRadio10">Paid by employer</label>
            </div>

            <div className="form-check form-check-inline ml-5">
              <input onChange={handleDomesticStaffChange} value="self" name="payer" checked={domesticStaff.payer === "self"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
              <label className="form-check-label  text-gray-800" for="inlineRadio20">Paid by self</label>
            </div>
          </div>
          <div>
            <button
              style={{ backgroundColor: "#84abeb" }}

              className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>


      </div>



      <h6 className="p-2">Income details</h6>

      <Widget>
        <div className="p-10" >

          <div >
            <div className="flex justify-between mb-5 ">
              <p>Are you employed ? </p>
              <div className="flex">
                <div className="form-check form-check-inline">
                  <input onClick={onChange} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onClick={onChange2} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>
              </div>
            </div>

            <div className={`flex justify-center border mb-3 p-6 rounded-lg bg-white w-full ${toggleel}`}>
              <form onSubmit={submitDataEmployed}>
                <div>
                  {isFetching3 && (
                    <div className="flex justify-center item mb-2">
                      <Loader
                        visible={isFetching3}
                        type="BallTriangle"
                        color="#00FA9A"
                        height={19}
                        width={19}
                        timeout={0}
                        className="ml-2"
                      />
                      <p className="font-bold">Saving...</p>
                    </div>
                  )}
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Employer Name:</label>
                    <input required onChange={(e) => setEmpName(e.target.value)} type="text" name="emp_name" className="form-control w-full rounded" />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Employer Address:</label>
                    <input required onChange={(e) => setEmpAdd(e.target.value)} type="text" name="emp_addr" className="form-control w-full rounded" />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Your start date:</label>
                    <input required onChange={(e) => setStartDate(e.target.value)} type="date" name="start_date" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Gross pay:</label>
                    <input required onChange={(e) => setGrossPay(e.target.value)} type="number" name="gross_pay" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Tax deducted:</label>
                    <input required onChange={(e) => setTaxDeduct(e.target.value)} type="number" name="tax_deducted" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Upload Pay slip or schedule:</label>
                    <input required onChange={(e) => setPaySlip(e.target.files[0])} type="file" name="pay_slip" className="w-full"
                    />
                  </div>
                  <div className='pb-5'>
                    <hr />
                  </div>
                </div>

                <div className="mb-6 flex justify-around">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                  >
                    Save
                  </button>
                  <button onClick={formTog1} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a href="">
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </form>


            </div>

            <div>

              <div className="flex justify-between mb-5">
                <p>Are you self employed ? </p>

                <div className="flex">

                  <div className="form-check form-check-inline">
                    <input onClick={onChange3} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions2" id="inlineRadio1" value="option1" />
                    <label required className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                  </div>

                  <div className="form-check form-check-inline ml-5">
                    <input required onClick={onChange4} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="option2" />
                    <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                  </div>
                </div>
              </div>
            </div>

            <div className={`flex justify-center border mb-3 p-6 rounded-lg bg-white w-fulll ${togglee2}`}>
              <div>
                <form onSubmit={submitDataselfEmp}>
                  {isFetching7 && (
                    <div className="flex justify-center item mb-2">
                      <Loader
                        visible={isFetching7}
                        type="BallTriangle"
                        color="#00FA9A"
                        height={19}
                        width={19}
                        timeout={0}
                        className="ml-2"
                      />
                      <p className="font-bold">Saving...</p>
                    </div>
                  )}
                  <div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="typeofbusiness">Type of business:</label>
                      <select required onChange={handleSelfEmployedChange} className="form-select" name="business_type" value={selfEmployed.business_type} >
                        <option value="select">Select Business </option>
                        <option value="Agro Allied Products">Agro Allied Products</option>
                        <option value="Aircondition Repairer">Aircondition Repairer</option>
                        <option value="Aluminum Doors & Windows">Aluminum Doors & Windows</option>
                        <option value="Animal Feed Maker">Animal Feed Maker</option>
                        <option value="Architechtural Design">Architechtural Design</option>
                        <option value="Architect">Architect</option>
                        <option value="Artist And Song-Writer">Artist And Song-Writer</option>
                        <option value="Baby Wear">Baby Wear</option>
                        <option value="Curtain & Interior Decoration">Curtain & Interior Decoration</option>
                        <option value="Cyber Cafe Operator">Cyber Cafe Operator</option>
                        <option value="Dealers In Mattress/Foams">Dealers In Mattress/Foams</option>
                        <option value="Djs Entertainment">Djs Entertainment</option>
                        <option value="Doors Seller">Doors Seller</option>
                        <option value="Drama Group">Drama Group</option>
                        <option value="Electrical Parts & Fitting">Electrical Parts & Fitting</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Electronics Dealer">Electronics Dealer</option>
                        <option value="Engine Oil/ Kerosene Seller">Engine Oil/ Kerosene Seller</option>
                        <option value="Estate Managers/ Agent">Estate Managers/ Agent</option>
                        <option value="Event Centre">Event Centre</option>
                        <option value="Event Planner">Event Planner</option>
                        <option value="Fashion Designer">Fashion Designer</option>
                        <option value="Films & Cinemas Center">Films & Cinemas Center</option>
                        <option value="Fish Seller">Fish Seller</option>
                        <option value="Fowl Seller">Fowl Seller</option>
                        <option value="Fruit Seller">Fruit Seller</option>
                        <option value="Furnishing Materials Seller">Furnishing Materials Seller</option>
                        <option value="Furniture / Furnishing Materials Seller">Furniture / Furnishing Materials Seller</option>
                        <option value="Furniture Maker">Furniture Maker</option>
                        <option value="Gas Refilling Seller">Gas Refilling Seller</option>
                        <option value="Generator Mechanic">Generator Mechanic</option>
                        <option value="Gift Shop">Gift Shop</option>
                        <option value="Graphic Arts & Design">Graphic Arts & Design</option>
                        <option value="Grinding Mill">Grinding Mill</option>
                        <option value="Guest House">Guest House</option>
                        <option value="Hairdressers And Barber">Hairdressers And Barber</option>
                        <option value="Higher Institutions Private">Higher Institutions Private</option>
                        <option value="Horticulture / Florist">Horticulture / Florist</option>
                        <option value="Hotel Proprietor">Hotel Proprietor</option>
                        <option value="Ict/ Computer Accessories">Ict/ Computer Accessories</option>
                        <option value="Interior Decorator">Interior Decorator</option>
                        <option value="Iron Bender">Iron Bender</option>
                        <option value="Jewelry Seller">Jewelry Seller</option>
                        <option value="Kerorine Retail Seller">Kerorine Retail Seller</option>
                        <option value="Kiddies Shop And Botique">Kiddies Shop And Botique</option>
                        <option value="Laundry (Dry Cleaner)">Laundry (Dry Cleaner)</option>
                        <option value="Law Firm3">Law Firm</option>
                        <option value="Leather Carpets (Linoleum)">Leather Carpets (Linoleum)</option>
                        <option value="Liquor|Beer Palour">Liquor|Beer Palour</option>
                        <option value="Mai Shai (Tea Maker)">Mai Shai (Tea Maker)</option>
                        <option value="Mason">Mason</option>
                        <option value="Maternity Home">Maternity Home</option>
                        <option value="Maternity Private Proprietor">Maternity Private Proprietor</option>
                        <option value="Meat Seller">Meat Seller</option>
                        <option value="Medical Laboratory">Medical Laboratory</option>
                        <option value="Mini Supermarket|Supermarket">Mini Supermarket|Supermarket</option>
                        <option value="Mobile Phone Dealer">Mobile Phone Dealer</option>
                        <option value="Mobile Phone Repairer">Mobile Phone Repairer</option>
                        <option value="Mobile Phone Seller">Mobile Phone Seller</option>
                        <option value="Money Lender">Money Lender</option>
                        <option value="Motor Cycle Dealer">Motor Cycle Dealer</option>
                        <option value="Motor Cycle Mechanic">Motor Cycle Mechanic</option>
                        <option value="Motor Cycle Spare Part Dealer">Motor Cycle Spare Part Dealer</option>
                        <option value="Motor Dealer/Seller">Motor Dealer/Seller</option>
                        <option value="Motor Spare Part Dealer">Motor Spare Part Dealer</option>
                        <option value="Motor Vehicle Mechanic">Motor Vehicle Mechanic</option>
                        <option value="Musician">Musician</option>
                        <option value="Newspaper/Magazine Vendor">Newspaper/Magazine Vendor</option>
                        <option value="Optician">Optician</option>
                        <option value="Other Businesses And Trade">Other Businesses And Trade</option>
                        <option value="Painter And Decorator">Painter And Decorator</option>
                        <option value="Paints Dealer">Paints Dealer</option>
                        <option value="Palm Oil Miller">Palm Oil Miller</option>
                        <option value="Panel Beaters & Sprayer">Panel Beaters & Sprayer</option>
                        <option value="Patent/Propriety Medicine Vendor">Patent/Propriety Medicine Vendor</option>
                        <option value="Petrol Filling Station">Petrol Filling Station</option>
                        <option value="Pharmaceutical Shop">Pharmaceutical Shop</option>
                        <option value="Phone Accessories"> Phone Accessories</option>
                        <option value="Photo Color Laboratorie">Photo Color Laboratorie</option>
                        <option value="Photographers / Photo Developer">Photographers / Photo Developer</option>
                        <option value="Photographic Materials Shop">Photographic Materials Shop</option>
                        <option value="Plastic Dealer">Plastic Dealer</option>
                        <option value="Plastic/Rubber Seller">Plastic/Rubber Seller</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Plumbing Material With Water Tanks & Access.">Plumbing Material With Water Tanks & Access.</option>
                        <option value="Plumbing Materials Only">Plumbing Materials Only</option>
                        <option value="Pool Agent">Pool Agent</option>
                        <option value="Pool Promoter">Pool Promoter</option>
                        <option value="Pos Operator (Mobile Money)">Pos Operator (Mobile Money)</option>
                        <option value="Potter">Potter</option>
                        <option value="Poultry Farmer">Poultry Farmer</option>
                        <option value="Poultry Feed">Poultry Feed</option>
                        <option value="Printer">Printer</option>
                        <option value="Private Medical Practioner">Private Medical Practioner</option>
                        <option value="Private N/P School">Private N/P School</option>
                        <option value="Private Secondary School">Private Secondary School</option>
                        <option value="Produce Buyer">Produce Buyer</option>
                        <option value="Provision Store">Provision Store</option>
                        <option value="Pure/Bottle Water Producer">Pure/Bottle Water Producer</option>
                        <option value="Pure/Bottle Water Seller">Pure/Bottle Water Seller</option>
                        <option value="Raw Food Seller">Raw Food Seller</option>
                        <option value="Recharge Card Dealer">Recharge Card Dealer</option>
                        <option value="Rental">Rental</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Restaurant (Buka)">Restaurant (Buka)</option>
                        <option value="Re-Wire & Battery Charger opt">Re-Wire & Battery Charger opt</option>
                        <option value="Road Side Petty Trader">Road Side Petty Trader</option>
                        <option value="Rugs & Carpet">Rugs & Carpet</option>
                        <option value="Sack Bags Seller">Sack Bags Seller</option>
                        <option value="Saw Mill">Saw Mill</option>
                        <option value="School Proprietor">School Proprietor</option>
                        <option value="Shoe Maker">Shoe Maker</option>
                        <option value="Shoe Seller">Shoe Seller</option>
                        <option value="Shops/Stall">Shops/Stall</option>
                        <option value="Solar Panel">Solar Panel</option>
                        <option value="Stylist">Stylist</option>
                        <option value="Super Market">Super Market</option>
                        <option value="Tailors/Fashion Designer">Tailors/Fashion Designer</option>
                        <option value="Thrift Collector">Thrift Collector</option>
                        <option value="Tiler">Tiler</option>
                        <option value="Timber Wood Seller">Timber Wood Seller</option>
                        <option value="Tomatoes Seller">Tomatoes Seller</option>
                        <option value="Tuber Dealer">Tuber Dealer</option>
                        <option value="Tyre Dealer">Tyre Dealer</option>
                        <option value="Video Club">Video Club</option>
                        <option value="Viewing Centre">Viewing Centre</option>
                        <option value="Vulcanizer">Vulcanizer</option>
                        <option value="Weaver">Weaver</option>
                        <option value="Weaver">Welder</option>
                        <option value="Wheel Barrow Quiosk">Wheel Barrow Quiosk</option>
                        <option value="Wine And Beer License Operator">Wine And Beer License Operator</option>
                        <option value="Yam Seller">Yam Seller</option>
                        <option value="Yoghurt Seller">Yoghurt Seller</option>
                      </select>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="businessname">Business Name:</label>
                      <input required onChange={handleSelfEmployedChange} name="business_name" value={selfEmployed.business_name} type="text" id="businessname" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="businessaddress">Business Address:</label>
                      <input required onChange={handleSelfEmployedChange} name="business_addr" value={selfEmployed.business_addr} type="text" id="businessaddress" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Business Start date:</label>
                      <input required onChange={handleSelfEmployedChange} name="business_start_date" value={selfEmployed.business_start_date} type="date" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="turnover">Turnover-takings, fees, sales or money earned by your business:</label>
                      <input required onChange={handleSelfEmployedChange} placeholder="₦" name="income_earned" value={selfEmployed.income_earned} type="number" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="turnover">Any other business income not included above:</label>
                      <input required onChange={handleSelfEmployedChange} name="other_income" value={selfEmployed.other_income} type="number" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="cashbases">Do you use cash basis, money actually received and paid out, to calculate your income expense ?</label>
                      <div className="flex">
                        <div className="form-check form-check-inline">
                          <input required onChange={handleSelfEmployedChange} value="Yes" name="cash_inc_expense" checked={selfEmployed.cash_inc_expense === "Yes"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">No</label>
                        </div>

                        <div className="form-check form-check-inline ml-5">
                          <input required onChange={handleSelfEmployedChange} value="No" name="cash_inc_expense" checked={selfEmployed.cash_inc_expense === "No"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Yes</label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label className="font-bold" htmlFor="businessincome">Total Business Income:</label>
                      <p className="font-bold" id="businessincome">NGN {totalBusInc}</p>
                    </div>

                    <div>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="expenses">How would you like to record your expenses?</label>
                        <div className="flex">
                          <div className="form-check form-check-inline">
                            <input required onChange={handleSelfEmployedChange} value="Total" name="expense" checked={selfEmployed.expense === "Total"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Break down</label>
                          </div>

                          <div className="form-check form-check-inline ml-5">
                            <input required onChange={handleSelfEmployedChange} value="Break down" name="expense" checked={selfEmployed.expense === "Break down"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Total</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="expenses">Are figures provided provisional or estimated?</label>
                      <div className="flex">
                        <div className="form-check form-check-inline">
                          <input required onChange={handleSelfEmployedChange} value="Provisional" name="figures_estimated" checked={selfEmployed.figures_estimated === "Provisional"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Estimated</label>
                        </div>

                        <div className="form-check form-check-inline ml-5">
                          <input required onChange={handleSelfEmployedChange} value="Estimated" name="figures_estimated" checked={selfEmployed.figures_estimated === "Estimated"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Provisional</label>
                        </div>
                      </div>
                    </div>
                    <div className='pb-5'>
                      <hr />
                    </div>
                  </div>

                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>

                    <button onClick={formTog2} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                      <a href="">
                        <FiTriangle
                          size={15}
                          className="stroke-current text-green-500"
                        />
                      </a>
                    </button>
                  </div>
                </form>
                {isFetching10 && (
                  <div className="flex justify-center item mb-2">
                    <Loader
                      visible={isFetching10}
                      type="BallTriangle"
                      color="#00FA9A"
                      height={19}
                      width={19}
                      timeout={0}
                      className="ml-2"
                    />
                    <p className="font-bold">Saving...</p>
                  </div>
                )}
                <form onSubmit={submitDataExpense}>
                  <p className="font-bold">Expenses</p>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <input required onChange={handleExpenseChange} name="item" value={expensesData.item} type="text" className="form-control w-full rounded"
                      placeholder="Item"
                    />
                    <input required onChange={handleExpenseChange} name="amount" value={expensesData.amount} type="number" className="form-control w-full rounded"
                      placeholder="Amount"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label className="font-bold">Net Profit/ Loss:</label>
                    <p className="font-bold"> NGN {netProfit}</p>
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save Expenses
                    </button>
                  </div>
                </form>
              </div>
            </div>


            <div className="flex justify-between mb-5">

              <p>Are you in a patnership ? </p>


              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange5} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions3" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange6} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions3" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>
            </div>

            {isFetching13 && (
              <div className="flex justify-center item mb-2">
                <Loader
                  visible={isFetching13}
                  type="BallTriangle"
                  color="#00FA9A"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                />
                <p className="font-bold">Saving...</p>
              </div>
            )}

            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee3}`}>
              <form onSubmit={submitDataPartner}>
                <div className="">
                  <p className="font-bold flex justify-center mb-4"></p>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Partner Name:</label>
                    <input onChange={handlePartnershipChange} name="name" value={partnerData.name} type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Partner Address:</label>
                    <input onChange={handlePartnershipChange} name="addr" value={partnerData.addr} type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Partner Phone:</label>
                    <input onChange={handlePartnershipChange} name="phone" type="text" value={partnerData.phone} className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Partner Percentage:</label>
                    <input onChange={handlePartnershipChange} name="percentage" value={partnerData.percentage} type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className='pb-5'>
                    <hr />
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea onChange={handlePartnershipChange} name="comments" value={partnerData.comments} cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive income on rent ? </p>

              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange7} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions4" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange8} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions4" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>

            </div>


            {isFetching14 && (
              <div className="flex justify-center item mb-2">
                <Loader
                  visible={isFetching14}
                  type="BallTriangle"
                  color="#00FA9A"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                />
                <p className="font-bold">Saving...</p>
              </div>
            )}
            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee4}`}>

              <form onSubmit={submitDataRentInc}>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Property Type:</label>
                    <select onChange={handleRentIncomeChange} name="prop_type" value={rentIncome.prop_type}>
                      <option value="Bungalow">Bungalow</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Mansion">Mansion</option>
                      <option value="Apartment or Flat">Apartment or Flat</option>
                      <option value="Terraced house">Terraced house</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Traditional house">Traditional house</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Property Address:</label>
                    <input onChange={handleRentIncomeChange} type="text" name="prop_address" value={rentIncome.prop_address} className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Rental Type:</label>
                    <select onChange={handleRentIncomeChange} className="form-select" name="rental_type" value={rentIncome.rental_type}>
                      <option value="Lease">Lease</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Rental Amount(Annual):</label>
                    <input onChange={handleRentIncomeChange} type="number" name="rental_amount" value={rentIncome.rental_amount} className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Renter Name:</label>
                    <input onChange={handleRentIncomeChange} type="text" name="renter_name" value={rentIncome.renter_name} className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <labe>Renter Phone number:</labe>
                    <input onChange={handleRentIncomeChange} type="text" name="renter_phone" value={rentIncome.phone_number} className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea onChange={handleRentIncomeChange} name="comments" value={rentIncome.comments} cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive any bank interest ? </p>


              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange9} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions5" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange10} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions5" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>

            </div>
            {isFetching16 && (
              <div className="flex justify-center item mb-2">
                <Loader
                  visible={isFetching16}
                  type="BallTriangle"
                  color="#00FA9A"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                />
                <p className="font-bold">Submitting...</p>
              </div>
            )}
            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee5}`}>
              <form onSubmit={submitDataBankInt}>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Bank Name:</label>
                    <input onChange={handleBankInterestChange} name="name" value={bankInterest.name} type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Bank Account:</label>
                    <input onChange={handleBankInterestChange} name="account" value={bankInterest.account} type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Bank Verification Number (BVN):</label>
                    <input onChange={handleBankInterestChange} name="bvn" value={bankInterest.bvn} type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >Gross Amount:</label>
                    <input onChange={handleBankInterestChange} name="gross_amount" value={bankInterest.gross_amount} type="number" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea onChange={handleBankInterestChange} name="comments" value={bankInterest.comments} cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive any bank dividends from a Nigerian Company ? </p>

              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange11} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions6" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange12} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions6" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>
            </div>

            {isFetching17 && (
              <div className="flex justify-center item mb-2">
                <Loader
                  visible={isFetching17}
                  type="BallTriangle"
                  color="#00FA9A"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                />
                <p className="font-bold">Submitting...</p>
              </div>
            )}

            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee6}`}>
              <form onSubmit={submitDataDividends}>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Company Name:</label>
                    <input onChange={handleDividendsChange} name="name" value={dividends.name} type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Company address:</label>
                    <input onChange={handleDividendsChange} name="addr" value={dividends.addr} type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Gross Amount:</label>
                    <input onChange={handleDividendsChange} name="amount" value={dividends.amount} type="number" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea onChange={handleDividendsChange} name="comments" value={dividends.comments} id="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive Pension ? </p>

              <div className="flex">
                <div className="form-check form-check-inline">
                  <input onChange={onChange13} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions7" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange14} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions7" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>
              </div>
            </div>
            {isFetching18 && (
              <div className="flex justify-center item mb-2">
                <Loader
                  visible={isFetching18}
                  type="BallTriangle"
                  color="#00FA9A"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                />
                <p className="font-bold">Submitting...</p>
              </div>
            )}
            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee7}`}>
              <form onSubmit={submitDataPension}>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >PFA:</label>
                    <input onChange={handlePensionChange} name="pfa" value={pension.pfa} type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>PFA address:</label>
                    <input onChange={handlePensionChange} name="pfa_addr" value={pension.pfa_addr} type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Gross Amount:</label>
                    <input onChange={handlePensionChange} name="gross_amount" value={pension.gross_amount} type="number" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea onChange={handlePensionChange} name="comments" value={pension.comments} cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you make profit on sale of asset ? </p>

              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange15} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions8" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div onChange={onChange16} className="form-check form-check-inline ml-5">
                  <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions8" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>
            </div>
            {isFetching19 && (
              <div className="flex justify-center item mb-2">
                <Loader
                  visible={isFetching19}
                  type="BallTriangle"
                  color="#00FA9A"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                />
                <p className="font-bold">Submitting...</p>
              </div>
            )}
            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee8}`}>

              <form onSubmit={submitDataAsset}>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >Asset Type:</label>
                    <select onChange={handleAssetChange} className="form-select" name="asset_type" value={asset.asset_type}>
                      <option value="landed property">Landed Property</option>
                      <option value="house">House</option>
                      <option value="farm land">Farm Land</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >Asset Address:</label>
                    <input onChange={handleAssetChange} name="asset_addr" value={asset.asset_addr} type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Buyer:</label>
                    <input onChange={handleAssetChange} name="buyer_name" value={asset.buyer_name} type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Buyer address:</label>
                    <input onChange={handleAssetChange} name="buyer_addr" value={asset.buyer_addr} type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Buyer Phone number:</label>
                    <input onChange={handleAssetChange} name="buyer_phone" value={asset.buyer_phone} type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Sale amount:</label>
                    <input onChange={handleAssetChange} name="amount" value={asset.amount} type="number" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea onChange={handleAssetChange} name="comments" value={asset.comments} cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive any income from sources outside Nigeria ? </p>

              <div className="flex">

                <div className="form-check form-check-inline flex ustify-evenly">
                  <input onChange={onChange17} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions9" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange18} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions9" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>
            </div>

            {isFetching20 && (
              <div className="flex justify-center item mb-2">
                <Loader
                  visible={isFetching20}
                  type="BallTriangle"
                  color="#00FA9A"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                />
                <p className="font-bold">Submitting...</p>
              </div>
            )}

            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee9}`}>
              <form onSubmit={submitDataOutsideSource}>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Source:</label>
                    <input onChange={handleOutsideSourceChange} name="source" value={outsideSource.source} type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Gross Amount:</label>
                    <input onChange={handleOutsideSourceChange} name="gross_amount" value={outsideSource.gross_amount} type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea onChange={handleOutsideSourceChange} name="comments" value={outsideSource.comments} cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>

        </div>
      </Widget>

      <h6 className="p-2">Deductions</h6>

      <Widget>
        <div className="p-10">

          <div className="flex justify-between mb-5">
            <p>Do you contribute towards pension ? </p>
            <div className="flex">

              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange19} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions10" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange20} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions10" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee10}`}>

            <form onSubmit={submitDataPenDeduct}>
              <div className="">
                {isFetching4 && (
                  <div className="flex justify-center item mb-2">
                    <Loader
                      visible={isFetching4}
                      type="BallTriangle"
                      color="#00FA9A"
                      height={19}
                      width={19}
                      timeout={0}
                      className="ml-2"
                    />
                    <p className="font-bold">Saving...</p>
                  </div>
                )}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">PFA:</label>
                  <input onChange={handlePenDeductChange} required name="pfa" value={pensionDeduct.pfa} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">PFA Address:</label>
                  <input onChange={handlePenDeductChange} required name="pfa_addr" value={pensionDeduct.pfa_addr} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">RSA No:</label>
                  <input onChange={handlePenDeductChange} required name="rsa_no" value={pensionDeduct.rsa_no} type="number" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Amount:</label>
                  <input onChange={handlePenDeductChange} required name="amount" value={pensionDeduct.amount} type="number" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea onChange={handlePenDeductChange} required name="comments" value={pensionDeduct.comments} id="comments" cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog10} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a href="">
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-between mb-5">
            <p>Do you contribute towards Life Asurrance ? </p>
            <div className="flex">

              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange21} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions11" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange22} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions11" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>

            </div>
          </div>

          <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee11}`}>
            <form onSubmit={submitDataLifIns}>
              {isFetching9 && (
                <div className="flex justify-center item mb-2">
                  <Loader
                    visible={isFetching9}
                    type="BallTriangle"
                    color="#00FA9A"
                    height={19}
                    width={19}
                    timeout={0}
                    className="ml-2"
                  />
                  <p className="font-bold">Saving...</p>
                </div>
              )}
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Insurance Company:</label>
                  <input required onChange={handleLifeInsChange} required name="company" value={lifeInsData.company} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <input required onChange={handleLifeInsChange} required name="addr" value={lifeInsData.addr} type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">RSA No:</label>
                  <input required onChange={handleLifeInsChange} required name="rsa_no" value={lifeInsData.rsa_no} type="number" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Amount:</label>
                  <input required onChange={handleLifeInsChange} required name="amount" value={lifeInsData.amount} type="number" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea required onChange={handleLifeInsChange} required name="comments" value={lifeInsData.comments} cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog11} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a href="">
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>

              </div>
            </form>
          </div>

          <div className="flex justify-between mb-5">
            <p>Do you contribute towards NHIS ? </p>
            <div className="flex">

              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange23} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions12" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange24} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions12" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee12}`}>

            <form onSubmit={submitDataNhis}>
              {isFetching8 && (
                <div className="flex justify-center item mb-2">
                  <Loader
                    visible={isFetching8}
                    type="BallTriangle"
                    color="#00FA9A"
                    height={19}
                    width={19}
                    timeout={0}
                    className="ml-2"
                  />
                  <p className="font-bold">Saving...</p>
                </div>
              )}
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Company:</label>
                  <input onChange={handleNHISChange} required name="company" value={nhisData.company} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <input onChange={handleNHISChange} required name="addr" value={nhisData.addr} type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Insurance No:</label>
                  <input onChange={handleNHISChange} required name="insurance_no" value={nhisData.insurance_no} type="number" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Amount:</label>
                  <input onChange={handleNHISChange} required name="amount" value={nhisData.amount} type="number" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea onChange={handleNHISChange} required name="comments" value={nhisData.comments} cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog12} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a href="">
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Widget>
      <h6 className="p-2">Other Asset</h6>

      <Widget>
        <div className="p-10">

          <div className="flex justify-between mb-5">

            <p>Do you own a Vehicle ? </p>


            <div className="flex">
              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange25} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions13" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange26} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions13" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee13}`}>
            <form>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Date of purchase:</label>
                  <input type="date" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Cost:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Brand:</label>
                  <select className="Select Brand" name="" id="typeofbusiness">
                    <option selected>Honda</option>
                    <option value="1">Toyota</option>
                    <option value="2">Benz</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Model:</label>
                  <select className="Select Brand" name="" id="typeofbusiness">
                    <option selected>Honda</option>
                    <option value="1">Toyota</option>
                    <option value="2">Benz</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Year:</label>
                  <select className="Select Brand" name="" id="typeofbusiness">
                    <option selected>2021</option>
                    <option value="1">2022</option>
                    <option value="2">2023</option>
                  </select>
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-between mb-5">

            <p>Do you own a Landed Property ? </p>


            <div className="flex">
              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange27} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions14" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio1">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange28} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions14" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio2">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee14}`}>
            <form>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <textarea cols="40" rows="2" id="employername" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Type of property:</label>
                  <select className="form-select w-full" name="" id="typeofbusiness">
                    <option selected>Select property type</option>
                    <option value="1">Bungalow</option>
                    <option value="2">Penthouse</option>
                    <option value="3">Mansion</option>
                    <option value="3">Apartment or Flat</option>
                    <option value="3">Terraced house</option>
                    <option value="3">Duplex</option>
                    <option value="3">Traditional house</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Date of completion/acquisition:</label>
                  <input type="date" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Cost of construction/acquisition:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-between mb-5">

            <p>Do you own a Farm Land ? </p>


            <div className="flex">
              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange29} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions15" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange30} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions15" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee15}`}>
            <form>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Date of acquisition:</label>
                  <input type="date" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Cost of Land:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Cost of Produce:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <form onSubmit={submitAssessmentForm}>
            {isFetching15 && (
              <div className="flex justify-center item mb-2">
                <Loader
                  visible={isFetching15}
                  type="BallTriangle"
                  color="#00FA9A"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                />
                <p className="font-bold">Submitting...</p>
              </div>
            )}
            <div className="mb-6 flex justify-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Submit form
              </button>
            </div>
          </form>
        </div>
      </Widget>

    </>
  )
};