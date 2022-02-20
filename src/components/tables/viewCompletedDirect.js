import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import setAuthToken from "../../functions/setAuthToken";
import { useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import { useRouter } from "next/router";

const fields = [
  {
    name: "Assesment Id",
    key: "assessment_id",
  },
  {
    name: "Year",
    key: "year",
  },
  {
    name: "KGTIN",
    key: "kgtin",
  },
  {
    name: "Name",
    key: "tp_name",
  },
  {
    name: "Gross Income",
    key: "gross_income",
  },

  {
    name: "Tax",
    key: "tax",
  },
  // {
  //   name: "Status",
  //   key: "status",
  // },
  {
    name: "Created Time",
    key: "createtime",
  },

];

export const ViewCompletedTable = ({ remittance }) => {
  let items = remittance;
  return (
    <>
      <Widget>
        <table className="table divide-y">
          <thead>
            <tr className="">
              {fields.map((field, i) => (
                <th key={i} className="">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((remittance, i) => (
              <tr key={i} className="">
                {fields.map((field, j) => (
                  <td key={j} className="">
                    {/* {remittance[field.key]} */}
                    <Link href={`/view/completeddirect/${remittance.assessment_id},${remittance.kgtin}`}>
                      <a classNameNameName="hover:text-blue-500">
                        {remittance[field.key]}
                      </a>
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Widget>
    </>
  );
};

{/* <Link href={`/view/completeddirect/${remittance.assessment_id},${remittance.kgtin}`}>
<a classNameNameName="hover:text-blue-500">
  {remittance[field.key]}
</a>
</Link> */}

export const ViewSingleCompletedTable = ({ payerprop, assId, payerArr, assobj, taxcal,
  childObj, resAddObj, spouseObj, domesticStaff, vehicles, land, employed, lap, nhis, expenses, pensionDed }) => {
  const [isFetching2, setIsFetching2] = useState(() => false);
  const [isFetching3, setIsFetching3] = useState(() => false);
  const router = useRouter();

  const kgtinVal = payerArr.map(function (doc) {
    let kgtin = doc.KGTIN
    return kgtin
  })
  const kgtinString = String(kgtinVal)
 
  const items = payerprop;
  const assessment_id = assId
  const createdTime = dateformat(assobj.createtime, "dd mmm yyyy")
  console.log(items);
  const employedCal = Number(assobj.employed)
  const selfEmployedCal = Number(assobj.self_employed)
  const grossIncCal = employedCal + selfEmployedCal

  // let pay = employed.pay_slip
  // console.log(pay);

  const pfcdata = Number(assobj.pension)
  const nhisdata = Number(assobj.nhis)
  const lapdata = Number(assobj.lap)

  const deductionsTotal = (pfcdata + nhisdata + lapdata)

  setAuthToken();
  let approveAss = async (e) => {
    e.preventDefault()
    setIsFetching3(true)
    let apprDataObj = {
      assessment_id: `${assessment_id}`,
      status: "Approved",
    }
    try {
      let res = await axios.put(`${url.BASE_URL}forma/set-status`, apprDataObj);
      setIsFetching3(false)
      alert("Approved successfully!");
      router.push('/approvere')
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching3(false)
    }
  }

  return (
    <>
      {isFetching3 && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching3}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p className="font-bold">Approving...</p>
        </div>
      )}
      <div className="mb-6 flex justify-end">
        <form onSubmit={approveAss}>
          <button
            className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          >
            Approve
          </button>
        </form>

        <form>
          <button
            className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          >
            <a href="/view/pendingdirect">Back</a>
          </button>
        </form>

      </div>
      <div className="flex justify-around border">

        <table className="table-auto">
          <tbody className="">
            <tr>
              <td className="font-bold">TITLE</td>
              {payerArr.map((el, i) =>
                <td className="pl-3" key={i}>{el.indv_title}</td>
              )}
            </tr>
            <tr>
              <td className="font-bold">SURNAME</td>
              {payerArr.map((el, i) =>
                <td className="pl-3" key={i}>{el.surname}</td>
              )}

            </tr>
            <tr>
              <td className="font-bold">OTHERNAME</td>
              {payerArr.map((el, i) =>
                <td className="pl-3" key={i}>{el.middle_name}</td>
              )}
            </tr>
            <tr>
              <td className="font-bold">ADDRESS</td>
              {payerArr.map((el, i) =>
                <td className="pl-3" key={i}>{el.street}</td>
              )}
            </tr>
          </tbody>
        </table>

        <table className="table-auto">
          <tbody>
            <tr>
              <td className="font-bold">TAX STATION</td>
              {payerArr.map((el, i) =>
                <td className="pl-3" key={i}>{el.tax_office}</td>
              )}
            </tr>
            <tr>
              <td className="font-bold">KGTIN</td>
              {payerArr.map((el, i) =>
                <td className="pl-3" key={i}>{el.KGTIN}</td>
              )}
            </tr>
            <tr>
              <td className="font-bold">ASSESSMENT No</td>
              {payerArr.map((el, i) =>
                <td className="pl-3" key={i}>{assessment_id}</td>
              )}
            </tr>
            <tr>
              <td className="font-bold">DATE ASSESSED</td>
              {payerArr.map((el, i) =>
                <td className="pl-3" key={i}>{createdTime}</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid">
        <table class=" table-auto border rounded mt-3 divide-y justify-self-center" width={500}>
          <thead>
            <tr>
              <th className="p-3"><h6 className="text-center font-bold">Tax Computations</h6></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="border-r-2 p-1">Source of Income</td>
              <td className="text-right font-bold">₦</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">Trade, Professional e.t.c</td>
              {assobj == null || assobj == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(assobj.self_employed)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1">Share of Partnership</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">Employment</td>
              {assobj == null || assobj == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(assobj.employed)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1">Other Income</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right font-bold">Gross Income</td>
              <td className="p-1 text-right font-bold">{formatNumber(grossIncCal)}</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">PFC</td>
              {assobj == null || assobj == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(assobj.pension)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1">NHIS</td>
              {assobj == null || assobj == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(assobj.nhis)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1">NHF</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">Life Assurance Premium</td>
              {assobj == null || assobj == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(assobj.lap)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right font-bold">Total</td>
              <td className="p-1 text-right font-bold">{formatNumber(deductionsTotal)}</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right font-bold">Assessable Income</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">ADD</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">Balancing Charges</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">DEDUCT</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">Balancing Allowances</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">Lose Relief</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">Capital Allowances</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right font-bold">Total Income</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1">Consolidated relief Allowance</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.consolidatedRelief)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right">Chargeable Income</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.chargeableIncome)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center font-bold">Tax due for payment</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center">7% on 300,000.00</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax7)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center">11% on 300,000.00</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax11)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center">15% on 500,000.00</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax15)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center">19% on 500,000.00</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax19)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center">21% on 1,600,000.00</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax21)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center">24% on above 3,200,000.00</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax24)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center">1%(Minimun Tax)</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center">Total</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-center">Dev. Levy</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right font-bold">Total Tax due </td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax)}</td>
              }
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right font-bold">Set off WHT </td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right font-bold">Set off 1st Assessment </td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right font-bold">Set off Additional Assessment</td>
              <td className="p-1 text-right font-bold">0</td>
            </tr>
            <tr>
              <td className="border-r-2 p-1 text-right font-bold">Total Tax Due for Payment</td>
              {taxcal == null || taxcal == ""
                ? <td className="p-1 text-right font-bold">0</td> :
                <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax)}</td>
              }
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <p>Captured by : {assobj.createby} </p>
          <p>Date of capture : {createdTime} </p>
        </div>

        <div className="flex justify-center">
          <button
            className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          >
            <a href={`/view-doc-assess/${assessment_id},${kgtinString}`}> Download Documents</a>
          </button>
        </div>
      </div>

      <div>
        <div className="mt-5">
          <h6 className="text-center">OTHER DETAILS</h6>
        </div>

        <div className="">
          <div>
            <div className="">
              <h5 className="font-bold">EMPLOYMENT</h5>
            </div>
            <table class="table-auto">
              <tbody>
                <tr>
                  <td className="font-bold p-2">Employer</td>
                  {employed == null || employed == ""
                    ? <td></td> :
                    employed.map((el, i) =>
                      <td className="p-2 font-bold" key={i}>{el.emp_name}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Employer Address</td>
                  {employed == null || employed == ""
                    ? <td ></td> :
                    employed.map((el, i) =>
                      <td className="p-2" key={i}>{el.emp_addr}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Start date</td>
                  {employed == null || employed == ""
                    ? <td></td> :
                    employed.map((el, i) =>
                      <td className="p-2" key={i}>{el.start_date}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Gross Pay</td>
                  {employed == null || employed == ""
                    ? <td></td> :
                    employed.map((el, i) =>
                      <td className="p-2" key={i}>{formatNumber(el.gross_pay)}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Tax deducted</td>
                  {employed == null || employed == ""
                    ? <td></td> :
                    employed.map((el, i) =>
                      <td className="p-2" key={i}>{formatNumber(el.tax_deducted)}</td>
                    )
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3">
          <div>
            <div className="">
              <h5 className="font-bold">Life Assurance Premium</h5>
            </div>
            <table class="table-auto">
              <tbody>
                <tr>
                  <td className="font-bold p-2">Company</td>
                  {lap == null || lap == ""
                    ? <td></td> :
                    lap.map((el, i) =>
                      <td className="p-2" key={i}>{el.company}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Address</td>
                  {lap == null || lap == ""
                    ? <td ></td> :
                    lap.map((el, i) =>
                      <td className="p-2" key={i}>{el.addr}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Amount</td>
                  {lap == null || lap == ""
                    ? <td></td> :
                    lap.map((el, i) =>
                      <td className="p-2" key={i}>{formatNumber(el.amount)}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">RSA Number</td>
                  {lap == null || lap == ""
                    ? <td></td> :
                    lap.map((el, i) =>
                      <td className="p-2" key={i}>{el.rsa_no}</td>
                    )
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3">
          <div>
            <div className="">
              <h5 className="font-bold">NHIS</h5>
            </div>
            <table class="table-auto">
              <tbody>
                <tr>
                  <td className="font-bold p-2">Company</td>
                  {nhis == null || nhis == ""
                    ? <td></td> :
                    nhis.map((el, i) =>
                      <td className="p-2" key={i}>{el.company}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Insurance No</td>
                  {nhis == null || nhis == ""
                    ? <td ></td> :
                    nhis.map((el, i) =>
                      <td className="p-2" key={i}>{el.insurance_no}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Amount</td>
                  {nhis == null || nhis == ""
                    ? <td></td> :
                    nhis.map((el, i) =>
                      <td className="p-2" key={i}>{formatNumber(el.amount)}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Address</td>
                  {nhis == null || nhis == ""
                    ? <td></td> :
                    nhis.map((el, i) =>
                      <td className="p-2" key={i}>{el.addr}</td>
                    )
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3">
          <div>
            <div className="">
              <h5 className="font-bold">Pension deducted</h5>
            </div>
            <table class="table-auto">
              <tbody>
                <tr>
                  <td className="font-bold p-2">PFA</td>
                  {pensionDed == null || pensionDed == ""
                    ? <td></td> :
                    pensionDed.map((el, i) =>
                      <td className="p-2" key={i}>{el.pfa}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">PFA Addresss</td>
                  {pensionDed == null || pensionDed == ""
                    ? <td ></td> :
                    pensionDed.map((el, i) =>
                      <td className="p-2" key={i}>{el.pfa_addr}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">RSA no</td>
                  {pensionDed == null || pensionDed == ""
                    ? <td></td> :
                    pensionDed.map((el, i) =>
                      <td className="p-2" key={i}>{el.rsa_no}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Amount</td>
                  {pensionDed == null || pensionDed == ""
                    ? <td></td> :
                    pensionDed.map((el, i) =>
                      <td className="p-2" key={i}>{formatNumber(el.amount)}</td>
                    )
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3">
          <div>
            <div className="">
              <h5 className="font-bold">Expenses</h5>
            </div>
            <table class="table-auto">
              <tbody>
                <tr>
                  <td className="font-bold p-2">Item</td>
                  {expenses == null || expenses == ""
                    ? <td></td> :
                    expenses.map((el, i) =>
                      <td className="p-2" key={i}>{el.item}</td>
                    )
                  }
                </tr>
                <tr>
                  <td className="font-bold p-2">Amount</td>
                  {expenses == null || expenses == ""
                    ? <td ></td> :
                    expenses.map((el, i) =>
                      <td className="p-2" key={i}>{formatNumber(el.amount)}</td>
                    )
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
};