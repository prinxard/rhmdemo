import Widget from '../widget'
import SectionTitle from '../section-title';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Loader from 'react-loader-spinner';
import setAuthToken from '../../functions/setAuthToken';
import url from '../../config/url';
import { ViewApprovedObjectionSingle } from '../tables/viewApprovedObjection';


const ViewSingleApprovedObjection = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(() => true);
  const [globalAssId, setGlobalAssId] = useState("")
  const [objNotice, setObjNotice] = useState("")
  const [createdTime, setCreatedTime] = useState("")
  const [taxpayerTax, setTpTax] = useState("")
  const [recommendedTax, setRecommTax] = useState("")
  const [objectionData, setObjectionData] = useState([])
  const [objUploads, setObjUploads] = useState([])
  const [tpKgtin, setTpKgtin] = useState([])


  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split('_').pop()
      let assessmentId = routerData.split('_').shift()
      setGlobalAssId(assessmentId)
      setTpKgtin(kgtin)
      setAuthToken()
      const fetchPost = async () => {
        try {
          let res = await axios.post(`${url.BASE_URL}forma/view-objection`, { assessment_id: assessmentId });
          let objData = res.data.body.obj
          let objDataNotice = objData[0].notice
          let createTime = objData[0].createtime
          let tpTax = objData[0].tp_tax
          let mainTax = objData[0].tax
          setRecommTax(mainTax)
          setTpTax(tpTax)
          setCreatedTime(createTime)
          setObjNotice(objDataNotice)
          let objDoc = res.data.body.objUpload
          setObjectionData(objData);
          setObjUploads(objDoc)
          setIsFetching(false);
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
        ) : <ViewApprovedObjectionSingle
          createdTime={createdTime}
          objNotice={objNotice}
          taxpayerTax={taxpayerTax}
          assessmentId={globalAssId}
          recommendedTax={recommendedTax}
          tpKgtin={tpKgtin}
          objUploads={objUploads}
          objectionData={objectionData}
        />}
      </Widget>
    </>
  );
}
export default ViewSingleApprovedObjection 