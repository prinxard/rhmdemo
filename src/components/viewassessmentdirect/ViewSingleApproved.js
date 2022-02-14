import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartSingleIndividualAssessment } from '../assessment/viewAssessment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from "axios";
import Loader from 'react-loader-spinner';
import { ViewSingleCompletedTable } from '../tables/viewCompletedDirect';
import setAuthToken from '../../functions/setAuthToken';
import url from '../../config/url';
import { afterComma, repVa } from '../../functions/numbers';
import { ViewSingleApprovedTable } from '../tables/viewApprovedAss';

const ViewSingleApproved= () => {
  const router = useRouter();
  const [payerprop, setpayerprop] = useState({});
  const [isFetching, setIsFetching] = useState(() => true);

useEffect(() => {
  if (router && router.query) {
    let routerData = String(router.query.ref);
    let kgtin = routerData.split(',').pop()
    let assessmentId = routerData.split(',').shift()
    let sendData = {
      KGTIN: `${kgtin}`,
      assessment_id: `${assessmentId}`
    }
      setAuthToken()
      const fetchPost = async () => {
        try {
          let res = await axios.post(`${url.BASE_URL}forma/view-assessment`, sendData);
          let IndData = res.data.body
          console.log(IndData);
          setpayerprop(IndData)
          setIsFetching(false);
        } catch (err) {
          console.log(err);
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);

  return (

    <>

      <SectionTitle title="Approved Assessment" />

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
        ) : <ViewSingleApprovedTable payerprop={payerprop} />}
      </Widget>
    </>
  );
}
export default ViewSingleApproved 