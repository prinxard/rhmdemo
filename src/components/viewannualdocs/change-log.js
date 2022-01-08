import React, { useEffect, useState } from 'react'
import Widget from "../widget";
import axios from 'axios';
import url from "../../config/url";
import Link from "next/link";
import setAuthToken from '../../functions/setAuthToken';

export const ChangeLog = () => {
  const [uploadedDocs, setDocuments] = useState([])
  setAuthToken();
  useEffect(() => {
    const fetchDocs = async () => {
      const year = {
        "year": 2021
      }
      try {
        const result = await axios.post(`${url.BASE_URL}annual/view-annual-uploads`, year);
        let docs = result.data.body;
        setDocuments(docs)
        // console.log(uploadedDocs);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchDocs();
  }, []);

  const coverLetter = uploadedDocs.map(function (doc) {
    let cover = doc.cover_letter
    return cover
  })
  const coverL = coverLetter.filter(item => item !== null && item !== "")

  const indReturnLetter = uploadedDocs.map(function (doc) {
    let indLet = doc.indv_return_letter
    return indLet
  })
  const indReturnL = indReturnLetter.filter(item => item !== null && item !== "")

  const expertriateLetter = uploadedDocs.map(function (doc) {
    let expLet = doc.exp_order_letter
    return expLet
  })
  const expertriateL = expertriateLetter.filter(item => item !== null && item !== "")

  const monthlyPayrollSchedule = uploadedDocs.map(function (doc) {
    let mthlyPaySched = doc.mnthly_pay_sched
    return mthlyPaySched
  })
  const monthlyPayrollS = monthlyPayrollSchedule.filter(item => item !== null && item !== "")

  const payeRemittance = uploadedDocs.map(function (doc) {
    let payeR = doc.paye_remittance
    return payeR
  })
  const evidenceOfPayeR = payeRemittance.filter(item => item !== null && item !== "")

  const existStaffList = uploadedDocs.map(function (doc) {
    let exitStaf = doc.exit_staff_list
    return exitStaf
  })
  const exitStaffL = existStaffList.filter(item => item !== null && item !== "")

  const TrialBal = uploadedDocs.map(function (doc) {
    let trialB = doc.endyr_trial_bal
    return trialB
  })
  const TrialBal21 = TrialBal.filter(item => item !== null && item !== "")


  return (
    <>
      <div className="grid justify-items-start">

        <div className="font-semibold">
          Submission letter
        </div>

        <div className="flex">
          {coverL.map((element, i) => (
            <div key={i} className="p-2">
              <Link href={`https://annualuploads.bespoque.dev/annual-returns/cover_letter/${element}`} >
                <a className="underline underline-offset-4 text-blue-600">Download</a>
              </Link>
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">

        <div>
          <div className="font-semibold">
            Individual tax returns letter
          </div>
        </div>


        <div className="flex">
          {indReturnL.map((element, i) => (
            <div key={i} className="p-2">
              <Link href={`https://annualuploads.bespoque.dev/annual-returns/indv_return_letter/${element}`} target="_blank">
                <a className="underline underline-offset-4 text-blue-600">Download</a>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Letter of expatriate order
        </div>

        <div className="flex">
          {expertriateL.map((element, i) => (
            <div key={i} className="p-2">
              <Link href={`https://annualuploads.bespoque.dev/annual-returns/exp_order_letter/${element}`}>
                <a className="underline underline-offset-4 text-blue-600">Download</a>
              </Link>
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Monthly payroll schedule
        </div>

        <div className="flex">
          {monthlyPayrollS.map((element, i) => (
            <div key={i} className="p-2">
              <Link href={`https://annualuploads.bespoque.dev/annual-returns/mnthly_pay_sched/${element}`}>
                <a className="underline underline-offset-4 text-blue-600">Download</a>
              </Link>
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of PAYE remittance
        </div>

        <div className="flex">
          {evidenceOfPayeR.map((element, i) => (
            <div key={i} className="p-2">
              <Link href={`https://annualuploads.bespoque.dev/annual-returns/paye_remittance/${element}`}>
                <a className="underline underline-offset-4 text-blue-600">Download</a>
              </Link>
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Exit staff list
        </div>
        <div className="flex">
          {exitStaffL.map((element, i) => (
            <div key={i} className="p-2">
              <Link href={`https://annualuploads.bespoque.dev/annual-returns/exit_staff_list/${element}`}>
                <a className="underline underline-offset-4 text-blue-600">Download</a>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Trial balance for the year ended 31st Dec. 2021
        </div>
        <div className="flex">
          {TrialBal21.map((element, i) => (
            <div key={i} className="p-2">
              <Link href={`https://annualuploads.bespoque.dev/annual-returns/endyr_trial_bal/${element}`}>
                <a className="underline underline-offset-4 text-blue-600">Download</a>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* <div className="grid justify-items-start">

        <div className="font-semibold">
          Monthly payroll schedule
        </div>

        <div>
          {monthlyPayrollS.map((element, i) => (
            <div key={i} className="p-2">
              <Link href={`https://annualuploads.bespoque.dev/annual-returns/mnthly_pay_sched/${element}`}>
                <a className="underline underline-offset-4 text-blue-600">Download</a>
              </Link>
            </div>
          ))}
        </div>

      </div> */}

      <hr />
















    </>
  );
};
