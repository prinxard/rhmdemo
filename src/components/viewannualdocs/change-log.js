import React, {useEffect, useState} from 'react'
import Widget from "../widget";
import axios from 'axios';
import url from "../../config/url";
import Link from "next/link";
import setAuthToken from '../../functions/setAuthToken';

const fields = [
  {
    name: "Employer ID",
    key: "employer_id",
  },
  {
    name: "Staff names",
    key: "sscl",
  },
  {
    name: "Number of Months",
    key: "mnthly_pay_sched",
  },
  {
    name: "Gross Salary",
    key: "exp_order_letter",
  },
  {
    name: "Pension",
    key: "mnthly_pay_sched",
  },
  // {
  //   name: "NHIS",
  //   key: "nhis",
  // },
  // {
  //   name: "LAP",
  //   key: "lap",
  // },
  // {
  //   name: "NHF",
  //   key: "nhf",
  // },
  // {
  //   name: "Consolidated Relief Allowance",
  //   key: "con_rel_cal",
  // },
  // {
  //   name: "Net tax deducted",
  //   key: "net_tax_ded",
  // },
  // {
  //   name: "Expected tax",
  //   key: "tax_pay_cal",
  // },
  // {
  //   name: "Variance",
  //   key: "variance_cal",
  // },
  // {
  //   name: "Year",
  //   key: "year",
  // },
];

let remittance = [
  {
    "id": 285,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": null,
    "exp_order_letter": null,
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": null,
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": "sscl_1641291293477.PNG",
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T10:14:53.000Z",
    "createby": "Portal"
  },
  {
    "id": 285,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": null,
    "exp_order_letter": null,
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": null,
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": "sscl_1641291293477.PNG",
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T10:14:53.000Z",
    "createby": "Portal"
  },
  {
    "id": 286,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": null,
    "exp_order_letter": "exp_order_letter_1641291638200.PNG",
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": null,
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": null,
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T10:20:38.000Z",
    "createby": "Portal"
  },
  {
    "id": 286,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": null,
    "exp_order_letter": "exp_order_letter_1641291638200.PNG",
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": null,
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": null,
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T10:20:38.000Z",
    "createby": "Portal"
  },
  {
    "id": 287,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": null,
    "exp_order_letter": null,
    "mnthly_pay_sched": "mnthly_pay_sched_1641291764090.csv",
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": null,
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": null,
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T10:22:44.000Z",
    "createby": "Portal"
  },
  {
    "id": 291,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": "indv_return_letter_1641292091275.PNG",
    "exp_order_letter": null,
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": null,
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": null,
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T10:28:11.000Z",
    "createby": "Portal"
  },
  {
    "id": 291,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": "indv_return_letter_1641292091275.PNG",
    "exp_order_letter": null,
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": null,
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": null,
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T10:28:11.000Z",
    "createby": "Portal"
  },
  {
    "id": 293,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": null,
    "exp_order_letter": null,
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": "wht_tax_deduct_1641295496205.csv",
    "wht_tax_receipts": null,
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": null,
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T11:24:56.000Z",
    "createby": "Portal"
  },
  {
    "id": 294,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": null,
    "exp_order_letter": null,
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": null,
    "mnthly_immi_returns": "mnthly_immi_returns_1641295508800.PNG",
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": null,
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T11:25:09.000Z",
    "createby": "Portal"
  },
  {
    "id": 295,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": null,
    "exp_order_letter": null,
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": "wht_tax_receipts_1641295526792.PNG",
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": null,
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T11:25:27.000Z",
    "createby": "Portal"
  },
  {
    "id": 295,
    "employer_id": "1004124549",
    "cover_letter": null,
    "indv_return_letter": null,
    "exp_order_letter": null,
    "mnthly_pay_sched": null,
    "paye_remittance": null,
    "exit_staff_list": null,
    "endyr_trial_bal": null,
    "wht_tax_deduct": null,
    "wht_tax_receipts": "wht_tax_receipts_1641295526792.PNG",
    "mnthly_immi_returns": null,
    "dev_levy_receipts": null,
    "bus_premises_receipt": null,
    "grnd_rent_receipts": null,
    "sscl": "sscl_1641291293477.PNG",
    "pension_remittance": null,
    "nhf_remittance": null,
    "nhis_remittance": null,
    "lap_remittance": null,
    "year": 2021,
    "createtime": "2022-01-04T11:25:27.000Z",
    "createby": "Portal"
  },
]

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
        let uploadedDocs = docs;
        console.log(uploadedDocs);
        // console.log(docs);
        // console.log(userDet);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchDocs();
  }, []);
  // let items = remittance;
  // items.map(item => {
  //   console.log(item.sscl);
  // })

  return (
    <>
      <Widget>
        <table className="table divide-y">
          {/* <thead>
            <tr className="">
              {fields.map((field, i) => (
                <th key={i} className="">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead> */}
          <tbody className="divide-y">
            <tr>
              <td>Submission letter</td>
              {uploadedDocs.map((field, i) => (
                
                <Link href={`https://annualuploads.bespoque.dev/annual-returns/mnthly_pay_sched/${field.mnthly_pay_sched}`}>
                  <a ><td key={i}></td>Download</a>
                </Link>
              ))}
              {/* https://annualuploads.bespoque.dev/annual-returns/cover_letter/cover_letter_1641284594671.png */}

            </tr>
            <tr>
              <td>Individual tax returns letter</td>
              {/* {remittance.map((field, i) => (

                <Link href={`${field.pension}`}>
                  <a ><td key={i}></td>Download</a>
                </Link>
              ))} */}
            </tr>
            <tr>
              <td>Letter of expatriate order</td>
              {/* {remittance.map((field, i) => (

                <td key={i}>{field.nhis_remittance}</td>
              ))} */}
            </tr>
            <tr>
              <td>Monthly payroll schedule</td>
              <td></td>
            </tr>
            <tr>
              <td>Evidence of PAYE remittance</td>
              <td></td>
            </tr>
            <tr>
              <td>List of exit staff</td>
              <td></td>
            </tr>
            <tr>
              <td>Trial balance for the year ended 31st Dec. 2021</td>
              <td></td>
            </tr>
            <tr>
              <td>Schedule of withholding tax deductions</td>
              <td></td>
            </tr>
            <tr>
              <td>Withholding tax receipts</td>
              <td></td>
            </tr>
            <tr>
              <td>Monthly immigration returns</td>
              <td></td>
            </tr>
            <tr>
              <td>Development levy receipts</td>
              <td></td>
            </tr>
            <tr>
              <td>Business premises receipts</td>
              <td></td>
            </tr>
            <tr>
              <td>Ground rent receipts</td>
              <td></td>
            </tr>
            <tr>
              <td>Social service contributions levy</td>
              <td></td>
            </tr>
            <tr>
              <td>Evidence of remittance of pension</td>
              <td></td>
            </tr>
            <tr>
              <td>Evidence of remittance of NHF</td>
              <td></td>
            </tr>
            <tr>
              <td>Evidence of remittance of NHIS</td>
              <td></td>
            </tr>
            <tr>
              <td>Evidence of remittance of LAP </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </Widget>
    </>
  );
};
