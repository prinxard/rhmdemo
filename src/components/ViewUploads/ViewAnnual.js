import SectionTitle from "../section-title";
import Widget from "../widget";
import { SubmitButton } from "../CustomButton/CustomButton";
import { NewFormInput } from "../FormInput/formInputs";
import { ViewAnnualTable } from "../tables/viewAnnual";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import Widget1 from "../dashboard/widget-1";
import * as Icons from '../../components/Icons/index';

const ViewAnnual = () => {
  const [post, setPost] = useState(() => []);
  const [sum, setSum] = useState(() => null);
  const [totalemp, setTotalemp] = useState('');
  const [isFetching, setIsFetching] = useState(() => false);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(() => 10);
  const [year, setYear] = useState('');
  const [query, setQuery] = useState(() => "");
  useEffect(() => {
    setAuthToken();
    const fetchPost = async () => {
      let annualViewYear = {
        "year": `${year}`
      }
      console.log(annualViewYear);
      try {
        let res = await axios.post(`${url.BASE_URL}annual/view-annual`, annualViewYear);
        res = res.data.body;
        console.log(res)
        let employeessTotal = res.length
        setTotalemp(employeessTotal)
        let records = [];
        let sum = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          // console.log(rec.tax_pay_cal);
          sum.push(rec.tax_pay_cal);
          rec.tax_pay_cal = formatNumber(rec.tax_pay_cal);
          rec.net_tax_ded = formatNumber(rec.net_tax_ded);
          rec.con_rel_cal = formatNumber(rec.con_rel_cal);
          rec.gross_income = formatNumber(rec.gross_income);
          rec.nhf = formatNumber(rec.nhf);
          rec.lap = formatNumber(rec.lap);
          rec.nhis = formatNumber(rec.nhis);
          rec.pension = formatNumber(rec.pension);
          rec.totalSalary = formatNumber(rec.totalSalary);
          rec.totalChargeable = rec.totalChargeable / 12;
          rec.totalChargeable = formatNumber(rec.totalChargeable);
          rec.period = rec.payPeriod;
          rec.year = dateformat(rec.year, "yyyy");
          records.push(rec);
        }
        let sumOfTax = sum.reduce((preVal, curVal) => preVal + curVal);
        setIsFetching(false);
        setSum(() => sumOfTax);
        setPost(() => records);
      } catch (e) {
        setIsFetching(false);
        // console.log(e.response);
      }
    };
    fetchPost();
  }, [year, isFetching]);

  const onChange = e => {
    e.preventDefault()
    let yeardata = "2020-01-01"
    setYear(yeardata)
    setIsFetching(true)
  };
  const onChange2 = e => {
    e.preventDefault()
    let yeardata = "2019-01-01"
    setYear(yeardata)
    setIsFetching(true)
  };

  const onChange3 = e => {
    e.preventDefault()
    let yeardata = "2018-01-01"
    setYear(yeardata)
    setIsFetching(true)
  };

  const onChange4 = e => {
    e.preventDefault()
    let yeardata = "2021-01-01"
    setYear(yeardata)
    setIsFetching(true)
  };

  // Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const next = (currentPage) => setCurrentPage(() => currentPage + 1);
  const previous = (currentPage) => setCurrentPage(() => currentPage - 1);

  const searchHandler = (e) => {
    setQuery(() => e.target.value);
  };

  let res = [];
  const search = (rows) => {
    let data = [];
    data = rows.filter((rows) => rows.year.toLowerCase().indexOf(query) > -1);
    res.push(data);
    return data;
  };

  const searchedPost = search(post).slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <SectionTitle title="View Uploads" subtitle="Annual PAYE Returns" />
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-1/4">
          <a href="" onClick={onChange4}>
            <Widget1
              color="green"
              description="2021"
              right={<Icons.RevenueItems />}
            />
          </a>
        </div>
        <div className="w-full lg:w-1/4">
          <a href="" onClick={onChange}>
            <Widget1
              color="green"
              description="2020"
              right={<Icons.RevenueItems />}
            />
          </a>
        </div>


        <div className="w-full lg:w-1/4">
          <a href="" onClick={onChange2}>
            <Widget1
              color="red"
              description="2019"
              right={<Icons.RevenueItems />}
            />
          </a>
        </div>

        <div className="w-full lg:w-1/4" onClick={onChange3}>
          <a href="">
            <Widget1
              color="blue"
              description="2018"
              right={<Icons.RevenueItems />}
            />
          </a>
        </div>

        {/* <div className="w-full lg:w-1/4" onClick={onChange4}>
          <a href="">
            <Widget1
              color="yellow"
              title="2017"
              description={formatNumber(data[0].taxReceipts)}
              right={<Icons.TaxReceipt />}
            />
          </a>
        </div> */}
      </div>

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
        <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
          <div className="w-full lg:w-1/12">
            <NewFormInput
              label="Search by year"
              required
              onChange={searchHandler}
            />
          </div>
        </div>

        <div className="mt-4">
          {query !== "" ? (
            <>
              <ViewAnnualTable remittance={searchedPost} />
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
              <ViewAnnualTable remittance={currentPosts} totalemployees={totalemp} totaltax={sum} />
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

export default ViewAnnual;
