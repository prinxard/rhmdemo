import SectionTitle from "../section-title";
import Widget from "../widget";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import Loader from "react-loader-spinner";
import { ViewSingleTccPrintTable } from "../tables/viewTccTablePrint";


const PrintSingleTcc = () => {
  const [total, setTotal] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState(() => "");
  const [tccdata, setTccData] = useState(() => []);
  const [assess1, setAssess1] = useState(() => []);
  const [assess2, setAssess2] = useState(() => []);
  const [assess3, setAssess3] = useState(() => []);
  const [tccID, setTccID] = useState(() => []);
  const router = useRouter();
  useEffect(() => {
    if (router && router.query) {
      let tCCId = router.query.ref;
      setTccID(tCCId)
      let id = {
        id: `${tCCId}`
      }
      setAuthToken();
      const fetchPost = async () => {
        try {
          let res = await axios.post(`${url.BASE_URL}forma/view-tcc`, id);
          let fetctTcc = res.data.body;
          console.log(fetctTcc);
          let tccdat = fetctTcc.tcc
          let firstass = fetctTcc.assessment1
          let secondass = fetctTcc.assessment2
          let thirdass = fetctTcc.assessment3
          console.log(fetctTcc);
          setTccData(tccdat)
          setAssess1(firstass)
          setAssess2(secondass)
          setAssess3(thirdass)

          setIsFetching(false);
        } catch (e) {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);


  return (
    <>
      <SectionTitle subtitle="Print Tcc" />

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
            <ViewSingleTccPrintTable tccID={tccID} payerDetails={tccdata} assessmentData={assess1} assessmentData2={assess2} assessmentData3={assess3}/>
          }
        </>
      </Widget>
    </>
  );
};

export default PrintSingleTcc;
