import Widget from '../widget'
import SectionTitle from '../section-title';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import url from '../../config/url';
import Loader from 'react-loader-spinner';
import setAuthToken from '../../functions/setAuthToken';
import { ViewApprovedObjectionSingle } from '../tables/viewApprovedObjection';
import { ViewVetObjectionSingle } from '../tables/viewVetObjection';


const ViewSingleVetObjection = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(() => true);
  const [globalAssId, setGlobalAssId] = useState("")
  const [objNotice, setObjNotice] = useState("")
  const [createdTime, setCreatedTime] = useState("")
  const [year, setYear] = useState("")
  const [recommendedTax, setRecommTax] = useState("0")
  const [objectionData, setObjectionData] = useState([])
  const [objUploads, setObjUploads] = useState([])
  const [tpKgtin, setTpKgtin] = useState([])
  const [DATax, setAssessmentData] = useState("0")
  const [payerName, setName] = useState([])
  const [payerAddr, setAddr] = useState([])
  const [apprObjData, setApprObjData] = useState({})

  const newUrl = 'https://bespoque.dev/rhm/'
  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split('_').pop()
      let assessmentId = routerData.split('_').shift()
      setGlobalAssId(assessmentId)
      let payLoad = { assessment_id: assessmentId }
      const fetchPost = async () => {
        try {
          // let res = await axios.post(`${url.BASE_URL}forma/view-objection`, { assessment_id: assessmentId });
          const response = await fetch(`${newUrl}get-objection-single.php`, {
            method: 'POST',
            body: JSON.stringify(payLoad)
          });
          const objectData = await response.json();
          setApprObjData(objectData.body[0])
          // let directTax = res.data.body.assessment[0].tax
          // let tpName = res.data.body.taxpayer[0].tp_name
          // let tpAddr = res.data.body.taxpayer[0].address
          // let objData = res.data.body.obj
          // let objDataNotice = objData.notice
          // let createTime = objData.createtime
          // let payerkgtin = objData.kgtin
          // let assessYear = objData.year
          // let mainTax = objData.tax
          // let objDoc = res.data.body.objUpload
          // setTpKgtin(payerkgtin)
          // setAddr(tpAddr)
          // setName(tpName)
          // setAssessmentData(directTax)
          // setYear(assessYear)
          // setRecommTax(mainTax)
          // setCreatedTime(createTime)
          // setObjNotice(objDataNotice)
          // setObjectionData(objData);
          // setObjUploads(objDoc)
          // setIsFetching(false);
        } catch (err) {
          setIsFetching(false);
          console.log(err);
        }
      };
      fetchPost();
    }
  }, [router]);

  return (

    <>

      <SectionTitle title="Objection notice" />

      <Widget>

        {isFetching ? (
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
        ) :
          <ViewVetObjectionSingle
            // createdTime={createdTime}
            // DATax={DATax}
            // year={year}
            // objNotice={objNotice}
            // payerName={payerName}
            // payerAddr={payerAddr}
            // assessmentId={globalAssId}
            // recommendedTax={recommendedTax}
            // tpKgtin={tpKgtin}
            // objUploads={objUploads}
            // objectionData={objectionData}
            apprObjData={apprObjData}
          />
          // <p>Test</p>
        }
      </Widget>
    </>
  );
}
export default ViewSingleVetObjection 