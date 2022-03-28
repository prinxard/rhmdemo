import SectionTitle from "../section-title";
import Widget from "../widget";
import { NewFormInput } from "../FormInput/formInputs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { formatNumber } from "../../functions/numbers";
import { DeleteButton } from "../CustomButton/CustomButton";
import Loader from "react-loader-spinner";
import { ViewIndividualSingleTable } from "../tables/viewIndividual";
import { UploadTccForms } from "../tccForms/viewTccForms";


const UploadTcc = () => {
  const [tccId, setTccId] = useState(() => []);
  const [total, setTotal] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState(() => "");
  const router = useRouter();
  useEffect(() => {
    if (router && router.query) {
      let createId = router.query.ref;
      setTccId(createId)
      console.log(createId);
    }
  }, [router]);



  return (
    <>
      <SectionTitle subtitle="Upload Tcc" />

      <Widget>
        <>
          <UploadTccForms tccId={tccId} />
        </>
      </Widget>
    </>
  );
};

export default UploadTcc;
