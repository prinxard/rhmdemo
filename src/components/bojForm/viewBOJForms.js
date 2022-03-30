import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import url from '../../config/url';
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormatMoneyComponent } from "../FormInput/formInputs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitButton } from "../CustomButton/CustomButton";
import { FiCheck } from 'react-icons/fi';
import SectionTitle from "../section-title";
import { set } from "nprogress";

export const StartBOJ = () => {
  const [kgtEnentered, setKgtEentered] = useState('')
  const [validkgtinmessage, Setvalidkgtinmessage] = useState('')
  const [invalidkgtinmessage, Setinvalidkgtinmessage] = useState('')
  const [disabled, setDisabled] = useState(true);
  const [validmsg, setvalidmsg] = useState("hidden");
  const [invalidmsg, setinvalidmsg] = useState("hidden");
  const [payerDetails, setpayerDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(() => false);
  const [isFetching2, setIsFetching2] = useState(() => false);
  const [assessmentData, setAssessmentData] = useState([]);
  const [assessmentData2, setAssessmentData2] = useState([]);
  const [assessmentData3, setAssessmentData3] = useState([]);
  const [tccErrors, settccErrors] = useState(() => []);
  const [assessment_id, setAssessmentId] = useState(() => []);
  const [employed, setEmployed] = useState('');
  const [self_employed, setSelfEmployed] = useState('');
  const router = useRouter();


  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()



  // useEffect(() => {
  //   if (router && router.query) {
  //     let routerData = router.query.ref
  //     setAssessmentId(routerData)
  //     console.log(assessment_id);
  //   }
  // }, [router]);

 

  setAuthToken();
  let CreatBOJ = async (data) => {
    console.log(data);
    // setIsFetching(true)
    // let apprDataObj = {
    //   assessment_id: `${assessment_id}`,
    //   status: "Approved",
    // }
    // try {
    //   let res = await axios.put(`${url.BASE_URL}forma/set-status`, apprDataObj);
    //   setIsFetching(false)
    //   toast.success("Success!");
    //   router.push('/approvere')
    // } catch (error) {
    //   toast.error("Failed!");
    //   console.log(error);
    //   setIsFetching(false)
  }

  let CalTax = async (data) => {
    // setEmployed(data.employment)
    // setSelfEmployed(data.self_employment)
    // setIsFetching(true)
    // let apprDataObj = {
    //   assessment_id: `${assessment_id}`,
    //   status: "Approved",
    // }
    // try {
    //   let res = await axios.put(`${url.BASE_URL}forma/set-status`, apprDataObj);
    //   setIsFetching(false)
    //   toast.success("Success!");
    //   router.push('/approvere')
    // } catch (error) {
    //   toast.error("Failed!");
    //   console.log(error);
    //   setIsFetching(false)
  }

  const taxpa = watch();
  console.log(taxpa.employment);


  //taxcal
  let tax;
  let tax_paid;

  ///TAX CAL
  let employedF = employed;
  let selfEmployedF = self_employed;

  console.log(employedF, selfEmployedF);

  let consolidatedRelief;
  let chargeableIncome;
  let totalRelief;
  let totalDeduction;
  let consolidatedIncome


  consolidatedIncome = selfEmployedF + employedF;

  totalRelief = 0;
  let gross_inc = consolidatedIncome - totalRelief;

  console.log(gross_inc, ' gross')


  if (consolidatedIncome < 360000.0) {
    consolidatedRelief = 0;
    //console.log(gross_inc);
  } else {
    consolidatedRelief = 200000 + 0.2 * gross_inc;
    //console.log(gross_inc);
  }

  totalDeduction = consolidatedRelief + totalRelief;
  chargeableIncome = consolidatedIncome - totalDeduction;

  //calculate tax
  if (consolidatedIncome <= 360000.0) {
    tax = consolidatedIncome * 0;

    //console.log(tax+' 1');
  } else if (chargeableIncome > 0 && chargeableIncome <= 300000) {
    tax = consolidatedIncome * 0.01;

    //console.log(tax+' tax2');
  } else if (chargeableIncome > 300000 && chargeableIncome <= 600000) {
    tax = 300000 * 0.07 + (chargeableIncome - 300000) * 0.11;

    //console.log(tax+' tax3');
  } else if (chargeableIncome > 600000 && chargeableIncome <= 1100000) {
    tax = 300000 * 0.07 + 300000 * 0.11 + (chargeableIncome - 600000) * 0.15;

    //console.log(tax + ' 4');
  } else if (chargeableIncome > 1100000 && chargeableIncome <= 1600000) {
    tax =
      300000 * 0.07 +
      300000 * 0.11 +
      500000 * 0.15 +
      (chargeableIncome - 1100000) * 0.19;

    //console.log(tax + ' 5');
  } else if (chargeableIncome > 1600000 && chargeableIncome <= 3200000) {
    tax =
      300000 * 0.07 +
      300000 * 0.11 +
      500000 * 0.15 +
      500000 * 0.19 +
      (chargeableIncome - 1600000) * 0.21;

    //console.log(tax + ' 6');
  } else if (chargeableIncome > 3200000) {
    tax =
      300000 * 0.07 +
      300000 * 0.11 +
      500000 * 0.15 +
      500000 * 0.19 +
      1600000 * 0.21 +
      (chargeableIncome - 3200000) * 0.24;

    //console.log(tax + ' 7');
  }

  tax = tax.toFixed(2);
  // console.log(tax, ' 2')
  tax = parseInt(tax);
  tax_paid = tax;

  console.log(tax_paid);


  return (
    <>
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
          <p className="font-bold">Processing...</p>
        </div>
      )}

      <SectionTitle title="BOJ Form" />
      <form onSubmit={handleSubmit(CreatBOJ)}>

        <div className="flex justify border mb-3 block p-8 rounded-lg bg-white w-full">

          <div className="">

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>Employment:</label>

              <div>

                <input ref={register()} name="employment" type="text" className="form-control w-full rounded"
                />

              </div>

            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>Self Employment:</label>

              <div>

                <input ref={register()} name="self_employment" type="text" className="form-control w-full rounded"
                />

              </div>

            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>Tax Paid for previous year:</label>
              <input name="previous_tax" ref={register()} type="text" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label htmlFor="employername">Tax to be paid:</label>

              <div>
                <div className="flex">

                  <h6>{formatNumber(tax_paid)}</h6>
                  <button onClick={CalTax} style={{ backgroundColor: "#84abeb" }} className=" w-32 ml-3 text-white btn-outlined bg-transparent rounded-md">Show tax</button>
                </div>
              </div>

            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label htmlFor="employername">Reason for BOJ:</label>

              <div>
                <textarea required name="comments" cols="34" rows="2" className="rounded"></textarea>
              </div>
            </div>
            <h1>{taxpa}</h1>

          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button
            style={{ backgroundColor: "#84abeb" }}
            className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          // disabled={disabled}
          >
            Create BOJ
          </button>
        </div>
      </form>
    </>
  );
};









