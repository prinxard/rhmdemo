import SectionTitle from "../section-title";
import Widget from "../widget";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import Loader from "react-loader-spinner";
import { ViewSinglePayeTcc } from "../tables/viewAllPayeTccTable";


const SinglePayeTcc = () => {
  const [isFetching, setIsFetching] = useState(() => true);
  const [tccdata, setTccData] = useState(() => []);
  const [tccID, setTccID] = useState(() => []);
  const [statusTCC, setTccStatus] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (router && router.query) {
      let tCCId = router.query.ref;
      setTccID(tCCId)
      let id = {
        id: tCCId
      }
      setAuthToken();
      const fetchPost = async () => {
        setIsFetching(true);
        axios.post(`${url.BASE_URL}paye/view-tcc`, id)
          .then(function (response) {
            setIsFetching(false);
            console.log("Response", response);
            let fetctTcc = response.data.body.tcc[0];
            let status = response.data.body.tcc[0].status
            setTccStatus(status)
            setTccData(fetctTcc)
            console.log(fetctTcc);

          })
          .catch(function (error) {
            setIsFetching(false);
            console.log(error);

          })

      };
      fetchPost();
    }
  }, [router]);


  return (
    <>
      <SectionTitle subtitle="View Tcc" />

      <Widget>

        <>
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
            <ViewSinglePayeTcc
              tccID={tccID}
              payerDetails={tccdata}
              statusTCC={statusTCC}
            />
          }
        </>
      </Widget>
    </>
  );
};

export default SinglePayeTcc;
