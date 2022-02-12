import SectionTitle from "../section-title";
import Widget from "../widget";
import { NewFormInput } from "../FormInput/formInputs";
import { useRouter } from "next/router";
import { ViewMonthlyTableSingle } from "../tables/viewMonthlyTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { formatNumber } from "../../functions/numbers";
import { DeleteButton } from "../CustomButton/CustomButton";
import Link from "next/link";
import Loader from "react-loader-spinner";
import { ViewAnnualTableSingle } from "../tables/viewAnnual";
import dateformat from "dateformat";
import { ViewSinglePendingTable } from "../tables/viewDirectAss";

const ViewSinglePending = () => {
  const [post, setPost] = useState(() => []);
  const [total, setTotal] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState(() => "");
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      let year = router.query.ref;
      year = `${year}-01-01`
      let yearValue = {
        "year": `${year}`
      }
      setAuthToken();
      const fetchPost = async () => {
        try {
          let res = await axios.post(
            `${url.BASE_URL}annual/view-annual`, yearValue
          );
          res = res.data.body.annualYr;
          console.log(res);
          let sum = {};
          let records = [];
          let salarySum = [];
          let chargeableSum = [];
          let totalReliefSum = [];
          let taxSum = [];
          for (let i = 0; i < res.length; i++) {
            let rec = res[i];
            rec.year = dateformat(rec.year, "yyyy");
            rec.salary = parseInt(rec.salary);
            rec.chargeable = parseInt(rec.chargeable) / 12;
            rec.totalRelief = parseInt(rec.totalRelief);
            rec.tax = parseInt(rec.tax);
            salarySum.push(rec.salary);
            chargeableSum.push(rec.chargeable);
            totalReliefSum.push(rec.totalRelief);
            taxSum.push(rec.tax);
            rec.nhis = formatNumber(rec.nhis);
            rec.lap = formatNumber(rec.lap);
            rec.net_tax_ded = formatNumber(rec.net_tax_ded);
            rec.tax_pay_cal = formatNumber(rec.tax_pay_cal);
            rec.nhis = formatNumber(rec.nhis);
            rec.con_rel_cal =(formatNumber(rec.con_rel_cal));
            rec.basic_salary = formatNumber(rec.basic_salary);
            rec.pension = formatNumber(rec.pension);
            rec.name = rec.staff_names;
            records.push(rec);
          }

          const totalSalary = salarySum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          const totalChargeable = chargeableSum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          const totalRelief = totalReliefSum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          const totalTax = taxSum.reduce(
            (preVal, curVal) => preVal + curVal,
            0
          );
          sum.totalSalary = totalSalary;
          sum.totalChargeable = totalChargeable;
          sum.totalRelief = totalRelief;
          sum.totalTax = totalTax;
          setIsFetching(false);
          setPost(() => records);
          setTotal(() => sum);
        } catch (e) {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);

  // Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const next = (currentPage) => setCurrentPage(() => currentPage + 1);
  const previous = (currentPage) => setCurrentPage(() => currentPage - 1);

  const searchHandler = (e) => {
    setQuery(() => e.target.value.toLowerCase());
  };

  let res = [];
  const search = (rows) => {
    let data = [];
    data = rows.filter((rows) => rows.name.toLowerCase().indexOf(query) > -1);
    res.push(data);
    return data;
  };

  const searchedPost = search(post).slice(indexOfFirstPost, indexOfLastPost);
  const deleteHandler = async (assessmentId) => {
    try {
      setAuthToken();
      let res = await axios.delete(
        `${url.BASE_URL}payment/delete-pending-invoice/${assessmentId}`
      );

      console.log(res.data);
      alert(res.data.message);
      router.push("/view/monthly");
    } catch (e) {
      if (e.response) {
        alert(e.response.message);
      }
    }
  };

  // const deletePrompt = (assessmentId) => {
  //   if (window.confirm("Are you sure you want to delete this record?")) {
  //     deleteHandler(assessmentId);
  //   }
  // };

  return (
    <>
      <SectionTitle title="View Direct Assessments" subtitle="View Single Assessment" />
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
        <div className="flex lg:flex-wrap w-full lg:space-x-4 justify-between items-center">
          <div className="w-32">
            <NewFormInput
              label="Search by name"
              required
              onChange={searchHandler}
            />
          </div>
        </div>
        <div className="mt-4">
          {query !== "" ? (
            <>
              <ViewSinglePendingTable remittance={searchedPost} total={total} />
              <CustomPagination
                paginate={paginate}
                totalPosts={res[0].length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          ) : (
            <>
              <ViewSinglePendingTable remittance={currentPosts} total={total} />
              <CustomPagination
                paginate={paginate}
                totalPosts={post.length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          )}
        </div>
      </Widget>
    </>
  );
};

export default ViewSinglePending;
