import SectionTitle from "../section-title";
import Widget from "../widget";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { formatNumber } from "../../functions/numbers";
import Loader from "react-loader-spinner";
import dateformat from "dateformat";
import { ViewSinglePendingTable } from "../tables/viewDirectAss";

const ViewSinglePending = () => {
  const [post, setPost] = useState(() => []);
  const [total, setTotal] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const [payerprop, setpayerprop] = useState([]);
  const [residentialAddr, setResidentialAddr] = useState([]);
  const [payLoad, setPayload] = useState([]);
  const [pensDeduct, setPensionDeduct] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [selfEmployment, setselfEmployment] = useState([]);
  const [exepenses, setExpenses] = useState([]);
  const [lap, setLap] = useState([]);
  const [nhis, setNhis] = useState([]);
  const [partner, setPartner] = useState([]);
  const [rentIncome, setRentIncome] = useState([]);
  const [bankInterest, setBankInterest] = useState([]);
  const [bankDividends, setBankDividends] = useState([]);
  const [pension, setPension] = useState([]);
  const [asset, setAsset] = useState([]);
  const [routerAssId, setAssessId] = useState('');

  const router = useRouter();
  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split(',').pop()
      let assessmentId = routerData.split(',').shift()
      setAssessId(assessmentId)
      let sendData = {
        KGTIN: `${kgtin}`,
        assessment_id: `${assessmentId}`
      }
      setAuthToken();
      const fetchPost = async () => {
        try {
          let res = await axios.post(
            `${url.BASE_URL}forma/view-assessment`, sendData);
          let userAssData = res.data.body
          let payerDat = res.data.body.taxpayer;
          let resAddress = userAssData.residentialAddr
          let pensionD = userAssData.pensionDed
          let employ = userAssData.employed
          let selfEmp = userAssData.selfEmployed
          let expenData = userAssData.expenses
          let lapDat = userAssData.lap
          let nhisDat = userAssData.nhis
          let partnerDat = userAssData.partner
          let rentIncomeDat = userAssData.rentIncome
          let bankIntDat = userAssData.bankInterest
          let bankDividDat = userAssData.dividends
          let pensionDat = userAssData.pension
          let assetDat = userAssData.assetProfit
          setAsset(assetDat)
          setPension(pensionDat)
          setBankDividends(bankDividDat)
          setBankInterest(bankIntDat)
          setRentIncome(rentIncomeDat)
          setPartner(partnerDat)
          setNhis(nhisDat)
          setLap(lapDat)
          setExpenses(expenData)
          console.log(lapDat);
          setselfEmployment(selfEmp)
          console.log(selfEmp);
          setEmployment(employ)
          setPensionDeduct(pensionD)
          setPayload(userAssData)
          setResidentialAddr(resAddress)
          setpayerprop(payerDat)
          setIsFetching(false);
          console.log(userAssData);
        } catch (e) {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);

  function handleResidential(newValue, index, fieldName) {
    const residentialAddressCopy = [...residentialAddr];
    const temp = residentialAddressCopy[index]
    residentialAddressCopy[index] = null
    let updatedAddress = { ...temp }
    updatedAddress[fieldName] = newValue
    residentialAddressCopy[index] = updatedAddress
    setResidentialAddr(residentialAddressCopy)
  }

  function handlepensionDeduct(newValue, index, fieldName) {
    const pensionDeductCopy = [...pensDeduct];
    const temp = pensionDeductCopy[index]
    pensionDeductCopy[index] = null
    let unpdatePensionDe = { ...temp }
    unpdatePensionDe[fieldName] = newValue
    pensionDeductCopy[index] = unpdatePensionDe
    setPensionDeduct(pensionDeductCopy)
  }

  function handleEmployed(newValue, index, fieldName) {
    const employmentCopy = [...employment];
    const temp = employmentCopy[index]
    employmentCopy[index] = null
    let updateEmployment = { ...temp }
    updateEmployment[fieldName] = newValue
    employmentCopy[index] = updateEmployment
    setEmployment(employmentCopy)
  }

  function handleSelfEmployed(newValue, index, fieldName) {
    const selEmploymentCopy = [...selfEmployment];
    const temp = selEmploymentCopy[index]
    selEmploymentCopy[index] = null
    let updateSelfEmployment = { ...temp }
    updateSelfEmployment[fieldName] = newValue
    selEmploymentCopy[index] = updateSelfEmployment
    setselfEmployment(selEmploymentCopy)
  }

  function handleExpenses(newValue, index, fieldName) {
    const expensesCopy = [...exepenses];
    const temp = expensesCopy[index]
    expensesCopy[index] = null
    let updateExpenses = { ...temp }
    updateExpenses[fieldName] = newValue
    expensesCopy[index] = updateExpenses
    setExpenses(expensesCopy)
  }

  function handleLap(newValue, index, fieldName) {
    const LapCopy = [...lap];
    const temp = LapCopy[index]
    LapCopy[index] = null
    let updateLap = { ...temp }
    updateLap[fieldName] = newValue
    LapCopy[index] = updateLap
    setLap(LapCopy)
  }
  
  function handleNhis(newValue, index, fieldName) {
    const NhisCopy = [...nhis];
    const temp = NhisCopy[index]
    NhisCopy[index] = null
    let updateNhis = { ...temp }
    updateNhis[fieldName] = newValue
    NhisCopy[index] = updateNhis
    setNhis(NhisCopy)
  }

  function handlePartner(newValue, index, fieldName) {
    const PartnerCopy = [...partner];
    const temp = PartnerCopy[index]
    PartnerCopy[index] = null
    let updatePartner = { ...temp }
    updatePartner[fieldName] = newValue
    PartnerCopy[index] = updatePartner
    setPartner(PartnerCopy)
  }

  function handlerentIncome(newValue, index, fieldName) {
    const rentIncomeCopy = [...rentIncome];
    const temp = rentIncomeCopy[index]
    rentIncomeCopy[index] = null
    let updaterentIncome = { ...temp }
    updaterentIncome[fieldName] = newValue
    rentIncomeCopy[index] = updaterentIncome
    setRentIncome(rentIncomeCopy)
  }

  function handlebankInterest(newValue, index, fieldName) {
    const bankInterestCopy = [...bankInterest];
    const temp = bankInterestCopy[index]
    bankInterestCopy[index] = null
    let updatebankInterest = { ...temp }
    updatebankInterest[fieldName] = newValue
    bankInterestCopy[index] = updatebankInterest
    setBankInterest(bankInterestCopy)
  }

  function handlebankDividends(newValue, index, fieldName) {
    const bankDividendsCopy = [...bankDividends];
    const temp = bankDividendsCopy[index]
    bankDividendsCopy[index] = null
    let updatebankDividends = { ...temp }
    updatebankDividends[fieldName] = newValue
    bankDividendsCopy[index] = updatebankDividends
    setBankDividends(bankDividendsCopy)
  }

  function handlePension(newValue, index, fieldName) {
    const pensionCopy = [...pension];
    const temp = pensionCopy[index]
    pensionCopy[index] = null
    let updatePension = { ...temp }
    updatePension[fieldName] = newValue
    pensionCopy[index] = updatePension
    setPension(pensionCopy)
  }
  function handleAsset(newValue, index, fieldName) {
    const assetCopy = [...asset];
    const temp = assetCopy[index]
    assetCopy[index] = null
    let updateAsset = { ...temp }
    updateAsset[fieldName] = newValue
    assetCopy[index] = updateAsset
    setAsset(assetCopy)
  }



  return (
    <>
      <SectionTitle title="Edit Assessments" subtitle="Update Assesment" />
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
          <p>Fetching data...</p>
        </div>
      )}
      <Widget>
        <>
          <ViewSinglePendingTable indvData={payerprop} pensDeduct={pensDeduct}
            changed={(e, index, fieldName) => handleResidential(e.target.value, index, fieldName)}
            changedPensDed={(e, index, fieldName) => handlepensionDeduct(e.target.value, index, fieldName)}
            routerAssId={routerAssId} residentialAddr={residentialAddr}
            changedEmploy={(e, index, fieldName) => handleEmployed(e.target.value, index, fieldName)}
            employment={employment}
            changedSelfEmployed={(e, index, fieldName) => handleSelfEmployed(e.target.value, index, fieldName)}
            selfEmployment={selfEmployment}
            expenses={exepenses} lifeass={lap} nhis={nhis} partner={partner} rentIncome={rentIncome}
            changedExpenses={(e, index, fieldName) => handleExpenses(e.target.value, index, fieldName)}
            changedLap={(e, index, fieldName) => handleLap(e.target.value, index, fieldName)}
            changedNhis={(e, index, fieldName) => handleNhis(e.target.value, index, fieldName)}
            changedPartner={(e, index, fieldName) => handlePartner(e.target.value, index, fieldName)}
            changedRentIncome={(e, index, fieldName) => handlerentIncome(e.target.value, index, fieldName)}
            changedBankInterest={(e, index, fieldName) => handlebankInterest(e.target.value, index, fieldName)}
            changedBankDividends={(e, index, fieldName) => handlebankDividends(e.target.value, index, fieldName)}
            changedPension={(e, index, fieldName) => handlePension(e.target.value, index, fieldName)}
            changedAsset={(e, index, fieldName) => handleAsset(e.target.value, index, fieldName)}
            bankInterest={bankInterest} dividends={bankDividends} pension={pension} asset={asset}

          />
        </>
      </Widget>
    </>
  );
};

export default ViewSinglePending;
