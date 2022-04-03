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
import { FormatMoneyComponent, FormatMoneyComponentBOJ } from "../FormInput/formInputs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitButton } from "../CustomButton/CustomButton";
import { FiCheck } from 'react-icons/fi';
import SectionTitle from "../section-title";
import { set } from "nprogress";
import { data } from "autoprefixer";

export const StartBOJ = () => {

  const [payerDetails, setpayerDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(() => false);
  const [isFetching2, setIsFetching2] = useState(() => false);
  const [bojErrors, setErrors] = useState(() => []);
  const [bojData, setBojData] = useState(() => []);
  const [employed, setEmployed] = useState('');
  const [self_employed, setSelfEmployed] = useState('');
  const [routerAssId, setAssessId] = useState('');
  const [fixedValues, fixValues] = useState({ amount: 0 });
  const [fixedValues2, fixValues2] = useState({ amount: 0 });
  const [fixedValues3, fixValues3] = useState({ amount: 0 });
  const [fixedValues4, fixValues4] = useState({ amount: 0 });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()


  let APIEmployed
  let APISelfEmployed
  let APIOtherIncome
  let APIPreviousTax
  // let APITax 

  console.log(bojData);

  bojData.forEach(ind => {
    APIEmployed = ind.employed
    return APIEmployed
  })

  bojData.forEach(ind => {
    APISelfEmployed = ind.self_employed
    return APISelfEmployed
  })

  bojData.forEach(ind => {
    APIOtherIncome = ind.other_income
    return APIOtherIncome
  })

  bojData.forEach(ind => {
    APIPreviousTax = ind.previous_yr_tax
    return APIPreviousTax
  })



  if (APIEmployed === null || APIEmployed === '') {
    APIEmployed = '0'
  } else {
    APIEmployed = APIEmployed
  }

  if (APISelfEmployed === null || APISelfEmployed === '') {
    APISelfEmployed = '0'
  } else {
    APISelfEmployed = APISelfEmployed
  }

  if (APIOtherIncome === null || APIOtherIncome === '') {
    APIOtherIncome = '0'
  } else {
    APIOtherIncome = APIOtherIncome
  }

  if (APIPreviousTax === null || APIPreviousTax === '') {
    APIPreviousTax = '0'
  } else {
    APIPreviousTax = APIPreviousTax
  }


let selfemplFigureInit = watch("self_employment", `${APISelfEmployed}`)
let emplFigureiInit = watch("employment", `${APIEmployed}`);
let otherIncomeFigureInit = watch("other_income", `${APIOtherIncome}`)
let previousTaxFigureInit = watch("previous_tax", `${APIPreviousTax}`)

let selfemplFigure = selfemplFigureInit.replace(/,/g, '')
let emplFigure = emplFigureiInit.replace(/,/g, '')
let otherIncomeFigure = otherIncomeFigureInit.replace(/,/g, '')
let previousTaxFigure = previousTaxFigureInit.replace(/,/g, '')



  //taxcal
  let tax;
  let tax_paid;

  ///TAX CAL
  let employedF = emplFigure;
  let selfEmployedF = selfemplFigure;

  console.log(employedF, selfEmployedF);

  let consolidatedRelief;
  let chargeableIncome;
  let totalRelief;
  let totalDeduction;
  let consolidatedIncome

  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split(',').pop()
      let assessId = routerData.split(',').shift()
      setAssessId(assessId)
      let kgtinPost = {
        "KGTIN": `${kgtin}`
      }

      setAuthToken();
      const fetchPost = async () => {
        setIsFetching(true)
        try {
          let res = await axios.post(`${url.BASE_URL}taxpayer/view-individual`, kgtinPost);
          let IndData = res.data.body
          setpayerDetails(IndData)
          // console.log(IndData);
          setIsFetching(false);
        } catch (err) {
          console.log(err);
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);

  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split(',').pop()
      let assessId = routerData.split(',').shift()
      // setAssessId(assessId)
      let fetchboj = {
        KGTIN: kgtin,
        assessment_id: assessId
      }

      setAuthToken();
      const bojPost = async () => {
        setIsFetching(true)
        try {
          let res = await axios.post(`${url.BASE_URL}forma/view-assessment`, fetchboj);
          let IndData = res.data.body.assessment
          setBojData(IndData)
          console.log(IndData);
          // setpayerDetails(IndData)
          // console.log(IndData);
          setIsFetching(false);
        } catch (err) {
          console.log(err);
          setIsFetching(false);
        }
      };
      bojPost();
    }
  }, [router]);

  // console.log("payer", payerDetails);


  console.log("selfemplFigure", selfemplFigure);
  console.log("emplFigure", emplFigure);
  console.log("otherIncome", otherIncomeFigure);
  console.log("previousTax", previousTaxFigure);


  const TotalIncome = Number(emplFigure) + Number(selfemplFigure) + Number(otherIncomeFigure)
  console.log("TotCal", TotalIncome);

  setAuthToken();
  let UpdateBOJ = async (data) => {
    console.log(data);
    console.log(JsonTax);
    setIsFetching(true)
    if (!data.self_employment && !data.employment) {
      alert("Please fill out either employment or self employment amount")
    }
    else {
      // data.self_employment = String(fixedValues.amount)
      // data.employment = String(fixedValues2.amount)
      // data.other_income = String(fixedValues3.amount)
      // data.previous_tax = String(fixedValues4.amount)
      let BOJObject = {
        assessment_id: routerAssId,
        employed: emplFigure,
        self_employed: selfemplFigure,
        tax: JsonTax,
        previous_yr_tax: previousTaxFigure,
        boj_comment: data.comment,
        other_income: otherIncomeFigure
      }
      try {
        let res = await axios.put(`${url.BASE_URL}forma/boj-assessment`, BOJObject);
        setIsFetching(false)
        toast.success("Success!");
        router.push('/view/completeddirect')
      } catch (error) {
        setIsFetching(false)
        if (error.response.status == 400) {
          toast.error("Nothing was updated")
        } else {
          toast.error("Failed to update BOJ!");
        }
      }

    }

  }

  let CalTax = () => {
    setEmployed(emplFigure)
    setSelfEmployed(selfemplFigure)
  }


  consolidatedIncome = (Number(selfEmployedF) + Number(employedF));
  // console.log("Consl", consolidatedIncome);

  totalRelief = 0;
  let gross_inc = consolidatedIncome - totalRelief;

  // console.log(gross_inc, ' gross')


  if (consolidatedIncome < 360000.0) {
    consolidatedRelief = 0;
    //console.log(gross_inc);
  } else {
    consolidatedRelief = 200000 + 0.2 * gross_inc;
    // console.log("Gross INC", gross_inc);
  }

  totalDeduction = consolidatedRelief + totalRelief;
  chargeableIncome = consolidatedIncome - totalDeduction;

  //calculate tax
  if (consolidatedIncome <= 360000.0) {
    tax = consolidatedIncome * 0;

    //console.log(tax+' 1');
  } else if (consolidatedIncome > 360000 && chargeableIncome < 300000) {
    tax = (chargeableIncome * 0.07);
    let taxS = (consolidatedIncome * 0.01);
    if (tax > taxS) {
      tax = tax
    }
    else {
      tax = taxS;

    }
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

  tax = tax;
  // console.log(tax, ' 2')
  // tax = parseInt(tax);
  // tax = (tax).toFixed(2);
  tax_paid = tax;

  let JsonTax = String(tax_paid)


  console.log("T", tax_paid);
  // console.log("Obj", bojData);
  // console.log("JSONTAX", JsonTax);
  // console.log("APITAX", APITax);

  // console.log("Taxpaid", tax_paid);





  return (
    <>
      <div>
        {bojData.map((ind, i) => (
          <div>
            {ind.boj_comment === null && ind.employed === null && ind.self_employed === null ?
              <SectionTitle subtitle="Create Assessment" />
              :
              <SectionTitle subtitle="Update Assessment" />
            }
          </div>
        ))}

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
            <p>Updating data...</p>
          </div>
        )}

        {payerDetails.map((ind, i) => (

          <div className="border mb-3 block p-8 rounded-lg bg-white w-full">
            <div className="flex">
              <h6 className="p-2">Taxpayer Information</h6>
              {/* <a href="" className="text-blue-600 self-center">Edit</a> */}
            </div>
            <p className="mb-3 font-bold"></p>
            <form>
              <div className="grid grid-cols-3 gap-4">
                <div className="">
                  <p>Surname</p>
                  <input readOnly defaultValue={ind.surname} type="text" className="form-control w-full rounded font-light text-gray-500"
                  />
                </div>

                <div className="form-group mb-6">
                  <p>First Name</p>
                  <input readOnly defaultValue={ind.first_name} type="text" className="form-control w-full rounded font-light text-gray-500"
                  />
                </div>

                <div className="form-group mb-6">
                  <p>Middle Name</p>
                  <input readOnly defaultValue={ind.middle_name} type="text" className="form-control w-full rounded font-light text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="form-group mb-6">
                  <p>Title</p>

                  <input readOnly defaultValue={ind.indv_title} type="text" className="form-control w-full rounded font-light text-gray-500"
                  />

                </div>

                <div className="form-group mb-6">
                  <p>Date of Birth</p>

                  <input readOnly defaultValue={ind.birth_date} type="text" className="form-control w-full rounded font-light text-gray-500"
                  />

                </div>
                <div className="form-group mb-6">
                  <p>Phone number</p>
                  <input readOnly defaultValue={ind.phone_number} type="text" className="form-control w-full rounded font-light text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="form-group mb-6">
                  <p>Tax Office</p>
                  <input readOnly defaultValue={ind.tax_office} type="text" className="form-control w-full rounded font-light text-gray-500"
                  />
                </div>

                <div className="form-group mb-6">
                  <p>Email</p>
                  <input readOnly defaultValue={ind.email} type="text" className="form-control w-full rounded font-light text-gray-500"
                  />
                </div>
              </div>
            </form>
          </div>
        ))}

        {bojData.map((ind, i) => (
          <form onSubmit={handleSubmit(UpdateBOJ)}>

            <div className="flex justify border mb-3 block p-8 rounded-lg bg-white w-full">

              <div className="">

                <div className="mb-2 grid grid-cols-3 gap-2">
                  <label className="self-center">Self Employment Income:</label>
                  <FormatMoneyComponentBOJ
                    ref={register()}
                    name="self_employment"
                    control={control}
                    defaultValue={ind.self_employed === "" || ind.self_employed === null ? '0.00' : ind.self_employed}
                    onValueChange={(v) => fixValues({ amount: v })}
                  />
                </div>


                <div className="mb-2 grid grid-cols-3 gap-2">
                  <label className="self-center">Employment Income:</label>
                  <FormatMoneyComponentBOJ
                    ref={register()}
                    name="employment"
                    control={control}
                    defaultValue={ind.employed === "" || ind.employed === null ? '0.00' : ind.employed}
                    onValueChange={(v) => fixValues2({ amount: v })}
                  />
                </div>

                <div className="mb-2 grid grid-cols-3 gap-2">
                  <label className="self-center">Other Income:</label>
                  <FormatMoneyComponentBOJ
                    ref={register()}
                    name="other_income"
                    control={control}
                    defaultValue={ind.other_income === "" || ind.other_income === null ? '0.00' : ind.other_income}
                    onValueChange={(v) => fixValues3({ amount: v })}
                  />
                </div>
                <div className="mb-2 grid grid-cols-3 gap-2">
                  <p className="font-bold">Total Income:  </p>
                  <p><span className="font-bold">{formatNumber(TotalIncome)}</span></p>
                </div>



                <div className="mb-2 grid grid-cols-3 gap-2">
                  <label className="self-center">Tax Paid for previous year: <span className="text-red-600 text-center">*</span> </label>
                  <FormatMoneyComponentBOJ
                    ref={register()}
                    name="previous_tax"
                    control={control}
                    defaultValue={ind.previous_yr_tax}
                    onValueChange={(v) => fixValues4({ amount: v })}
                    required
                  />
                  {errors.previous_tax && <small className="text-red-600">{errors.previous_tax.message}</small>}
                </div>

                <div className="mb-6 grid grid-cols-3 gap-2">
                  <label className="self-center font-bold">Tax to be paid:</label>
                  <div>
                    <div className="flex justify-evenly">
                      {/* <button type="button" onClick={CalTax} style={{ backgroundColor: "#84abeb" }} className="btn w-32 text-white btn-outlined bg-transparent rounded-md">Show tax</button> */}
                      {/* <input readOnly defaultValue={formatNumber(tax_paid)} ref={register()} type="text" name="tax" className="w-32" id="" /> */}
                      <p className="font-bold">{formatNumber(JsonTax)}</p>
                    </div>
                  </div>

                </div>
                <div className="mb-6 grid grid-cols-3 gap-2">
                  <label>Reason for BOJ: <span className="text-red-600">*</span></label>
                  <div>
                    <textarea defaultValue={ind.boj_comment} ref={register({ required: "Reason for BOJ is required" })} name="comment" cols="34" rows="2" className="rounded"></textarea>
                    <p className="pt-2">(Note that the reason for BOJ will be reflected in the assessment notice)</p>
                  </div>
                  {errors.comment && <small className="text-red-600">{errors.comment.message}</small>}
                </div>
                <div className="flex justify-end mt-5">
                  {ind.boj_comment === null & ind.employed == null && ind.self_employed === null ?
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Create Assessmnent
                    </button>
                    :
                    <div>
                      <button
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Update Assessmnent
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </form>
        ))}
      </div>
    </>
  );
};









