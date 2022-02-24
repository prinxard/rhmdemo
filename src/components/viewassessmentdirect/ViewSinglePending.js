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
    let updatedAddress = {...temp}
    updatedAddress[fieldName] = newValue
    residentialAddressCopy[index] = updatedAddress
    setResidentialAddr(residentialAddressCopy)
  }

  function handlepensionDeduct(newValue, index, fieldName) {
    const pensionDeductCopy = [...pensDeduct];
    const temp = pensionDeductCopy[index]
    pensionDeductCopy[index] = null
    let unpdatePensionDe = {...temp}
    unpdatePensionDe[fieldName] = newValue
    pensionDeductCopy[index] = unpdatePensionDe
    setPensionDeduct(pensionDeductCopy)
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
          changed={(e, index, fieldName)=> handleResidential(e.target.value, index, fieldName)}
           changedPensDed={(e, index, fieldName)=> handlepensionDeduct(e.target.value, index, fieldName)}  routerAssId={routerAssId} residentialAd={residentialAddr} />

        </>
      </Widget>
    </>
  );
};

export default ViewSinglePending;
