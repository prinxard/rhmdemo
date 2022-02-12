import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartSingleIndividualAssessment } from '../assessment/viewAssessment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from "axios";
import Loader from 'react-loader-spinner';
import { ViewSingleCompletedTable } from '../tables/viewCompletedDirect';

const ViewSingleCompleted = () => {
  const router = useRouter();
  const [payerprop, setpayerprop] = useState({});
  const [isFetching, setIsFetching] = useState(() => true);

  useEffect(() => {
    if (router && router.query) {
      let assess = router.query.ref;
      let assessment = {
        "assessment_id": `${assess}`
      }
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZXJueW92aWVAZ21haWwuY29tIiwiZ3JvdXBzIjpbMSwyLDMsNSw0XSwiaWF0IjoxNjQ0MzE2MDgyLCJleHAiOjM2MDAwMDAwMTY0NDMxNjEwMH0.Lj3nrnp4qpGIJiG_Jr0WA2A9J0s20HvOcSmLYf3D3r4'
   
      const fetchPost = async () => {
        try {
          let res = await axios.post(`https://rhmapi.bespoque.dev/api/v1/forma/view-assessment`, assessment,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            }
          );
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

      <SectionTitle title="Approve Submitted Assessment" />

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
        ) : <ViewSingleCompletedTable payerprop={payerprop} />}
      </Widget>
    </>
  );
}
export default ViewSingleCompleted 