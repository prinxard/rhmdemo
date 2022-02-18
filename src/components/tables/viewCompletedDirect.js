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

export const ViewSingleCompletedTable = ({ payerprop, assId, payerAyy, assobj, taxcal,
  childObj, resAddObj, spouseObj, domesticStaff, vehicles, land }) => {
  const [isFetching2, setIsFetching2] = useState(() => false);
  const [isFetching3, setIsFetching3] = useState(() => false);
  const router = useRouter();

  const items = payerprop;
  const assessment_id = assId
  const createdTime = dateformat(assobj.createtime, "dd mmm yyyy hh: m")
  console.log(items);
  const employedCal = Number(assobj.employed)
  const selfEmployedCal = Number(assobj.self_employed)
  const grossIncCal = employedCal + selfEmployedCal

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
  setAuthToken();
  let declineAss = async (e) => {
    e.preventDefault()
    setIsFetching2(true)
    let decDataObj = {
      assessment_id: `${assessment_id}`,
      status: "Declined",
    }
    try {
      let res = await axios.put(`${url.BASE_URL}forma/set-status`, decDataObj);
      setIsFetching2(false)
      alert("Decline successfull!");
      router.push('/declinere')
    } catch (error) {
      alert("cannot submit, please try again")
      console.log(error);
      setIsFetching2(false)
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
      {isFetching2 && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching2}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p className="font-bold">Declining...</p>
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

        <form onSubmit={declineAss}>
          <button
            className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          >
            Decline
          </button>
        </form>

      </div>
      <table width='800' height='1575' align='center' className='print'>
        <tr>
          <td width='800' height='1569' align='center' valign='top'>
            <table width='700'>
              <tr>
              </tr>
            </table>

            <table width='800' className='tb mb-4'>
              <tr>
                <td width='385'><table width='83%' height='100%' border='0'>
                  <tr>
                    <td width='139'><strong>TITLE:</strong></td>
                    <tr className="">
                      {payerAyy.map((data, idx) => (
                        <p key={idx}>{data.indv_title}</p>
                      ))}
                    </tr>
                  </tr>
                  <tr>
                    <td><strong>SURNAME:</strong></td>
                    {payerAyy.map((data, idx) => (
                      <p key={idx}>{data.surname}</p>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>OTHER NAME: </strong></td>
                    {payerAyy.map((data, idx) => (
                      <p key={idx}>{data.middle_name}</p>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>ADDRESS:</strong></td>
                    {payerAyy.map((data, idx) => (
                      <p key={idx}>{data.street}</p>
                    ))}
                  </tr>
                </table></td>
                <td width='403'><table width='85%' height='100%' border='0' align='right'>

                  <tr>
                    <td><strong>Tax Station </strong></td>
                    {payerAyy.map((data, idx) => (
                      <p key={idx}>{data.tax_office}</p>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>KGTIN</strong></td>
                    {payerAyy.map((data, idx) => (
                      <p key={idx}>{data.KGTIN}</p>
                    ))}
                  </tr>
                  <tr>
                    <td><strong>Assessment No </strong></td>
                    {assessment_id}
                  </tr>
                  <tr>
                    <td><strong>Date Assessed </strong></td>
                    <td className=''> {createdTime} </td>
                  </tr>
                </table></td>
              </tr>
            </table>

            <table width='800'>
              <tr>
                <td width='400' height='1072' valign='top'><table width='377' height='1286' className='tb'>
                  <tr>
                    <td colspan='2'><div align='center'><span className='style4'>TAX COMPUTATION </span></div></td>

                  </tr>
                  <tr>
                    <td width='204' className='tb' ><span className='style27'>SOURCE OF INCOME </span></td>
                    <td width='161' className='tb' >₦</td>
                  </tr>
                  <tr>
                    <td className='tb'> Trade, Professional e.t.c </td>
                    {assobj == null || assobj == ""
                      ? <td></td> :
                      <td className='tb'> {assobj.self_employed}  </td>
                    }

                  </tr>
                  <tr>
                    <td className='tb'>Share of Partnership </td>
                    <td className='tb'>   </td>
                  </tr>
                  <tr>
                    <td className='tb'>Employment</td>
                    {assobj == null || assobj == ""
                      ? <td></td> :
                      <td className='tb'> {assobj.employed}  </td>
                    }
                  </tr>
                  <tr>
                    <td className='tb'>Other Income </td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='right' className='style27 font-bold'>Gross Income </div></td>
                    <td className='tb'> {grossIncCal} </td>
                  </tr>
                  <tr>
                    <td className='tb'>PFC</td>
                    {assobj == null || assobj == ""
                      ? <td className="tb"></td> :
                      <td className='tb'> {assobj.pension} </td>
                    }

                  </tr>
                  <tr>
                    <td className='tb'>NHIS</td>
                    {assobj == null || assobj == ""
                      ? <td className="tb"></td> :
                      <td className='tb'> {assobj.nhis} </td>
                    }


                  </tr>
                  <tr>
                    <td className='tb'>NHF</td>
                    {/* <td className='tb'> {assobj.nhf} </td> */}
                  </tr>
                  <tr>
                    <td className='tb'>Life Assurance Premium</td>
                    {assobj == null || assobj == ""
                      ? <td className="tb"></td> :
                      <td className='tb'> {assobj.lap} </td>
                    }

                  </tr>
                  <tr>
                    <td className='tb font-bold'><p align="right">Total</p></td>
                    <td className='tb'> {deductionsTotal} </td>
                  </tr>
                  <tr>
                    <td className='tb font-bold'><div align='right' className='style16'>Assessable Income </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>ADD</td>
                    <td className='tb'></td>
                  </tr>
                  <tr>
                    <td className='tb'>Balancing Charges </td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>DEDUCT</td>
                    <td className='tb'></td>
                  </tr>
                  <tr>
                    <td className='tb'>Balancing Allowances </td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>Lose Relief </td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>Capital Allowances </td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='right' className='style16 font-bold'>Total Income</div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>Consolidated Relief Allowance</td>
                    {taxcal == null || taxcal == ""
                      ? <td className="tb"></td> :
                      <td className='tb'>{taxcal.consolidatedRelief}</td>
                    }

                  </tr>
                  <tr>
                    <td className='tb font-bold'><div align='right'>Chargeable Income </div></td>
                    {taxcal == null || taxcal == ""
                      ? <td className="tb"></td> :
                      <td className='tb'>{taxcal.chargeableIncome}</td>
                    }

                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16 font-bold'>Tax Due for Payment </div></td>
                    <td className='tb'>&nbsp;</td>
                  </tr>

                  <tr>
                    <td className='tb'><div align='center' className='style16'>7% on 300,000.00 </div></td>
                    {taxcal == null || taxcal == ""
                      ? <td className="tb"></td> :
                      <td className='tb'> {taxcal.tax7}  </td>
                    }


                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>11% on 300,000.00 </div></td>
                    {taxcal == null || taxcal == ""
                      ? <td className="tb"></td> :
                      <td className='tb'> {taxcal.tax11} </td>
                    }

                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>15% on 500,000.00 </div></td>
                    {taxcal == null || taxcal == ""
                      ? <td className="tb"></td> :
                      <td className='tb'> {taxcal.tax15} </td>
                    }

                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>19% on 500,000.00 </div></td>
                    {taxcal == null || taxcal == ""
                      ? <td className="tb"></td> :
                      <td className='tb'> {taxcal.tax19} </td>
                    }

                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>21% on 1,600,000.00 </div></td>
                    {taxcal == null || taxcal == ""
                      ? <td className="tb"></td> :
                      <td className='tb'> {taxcal.tax21} </td>
                    }

                  </tr>
                  <tr>
                    <td className='tb'><div align='center'>24% on above 3,200,000.00 </div></td>
                    {taxcal == null || taxcal == ""
                      ? <td className="tb"></td> :
                      <td className='tb'> {taxcal.tax24} </td>
                    }

                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>1%(Minimun Tax)</div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>Total </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>Dev. Levy </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='right' className='style16 font-bold'>Total Tax Due </div></td>

                  </tr>

                  <tr>
                    <td className='tb'><div align='right' className='style16 font-bold'>Set off WHT </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td height='28' className='tb'><div align='right' className='style16 font-bold'>Set off 1st Assessment </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td height='28' className='tb'><div align='right' className='style16 font-bold'>Set off Additional Assessment </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td height='30' className='tb'><div align='right' className='style16 font-bold'>Total Tax Due for Payment </div></td>
                    <td className='tb'>{taxcal.tax}</td>
                  </tr>
                </table>
                  <br />
                  <table width='300'>
                    <tr>
                      <td width='235' className='style5'><span className='style27'>Captured By:</span></td>
                      <td width='320' className='style5'><span className='style27'>KGIRS CORPORATE HQTRS</span></td>
                    </tr>
                    <tr>
                      <td width='235' className='style5'><span className='style27'>Date of Capture:</span></td>
                      <td width='320' className='style5'><span className='style27'>{createdTime}</span></td>
                    </tr>

                  </table>
                </td>
                <td width='509' valign='top'>
                  <table width='400' align='left' className=''>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Phone Number</p></td>
                      {payerAyy.map((data, idx) => (
                        <td key={idx}>{data.phone_number}</td>
                      ))}
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Email Address</p></td>
                      {payerAyy.map((data, idx) => (
                        <td key={idx}>{data.email}</td>
                      ))}
                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>RESIDENTIAL ADDRESS</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Type of Residence</p></td>
                      {resAddObj == null || resAddObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{resAddObj.residence_type}</td>
                      }

                    </tr>

                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Residence Ownership</p></td>
                      {resAddObj == null || resAddObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{resAddObj.residence_owner} </td>
                      }

                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>OWNER</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Name:</p></td>
                      {resAddObj == null || resAddObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{resAddObj.owner_name}</td>
                      }

                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Address:</p></td>
                      {resAddObj == null || resAddObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{resAddObj.owner_name}</td>
                      }

                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Phone Number:</p></td>
                      {resAddObj == null || resAddObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{resAddObj.owner_phone}</td>
                      }

                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>SPOUSE</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Name :</p></td>
                      {spouseObj == null || spouseObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{spouseObj.name}</td>
                      }

                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Age :</p></td>
                      {spouseObj == null || spouseObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{spouseObj.dob}</td>
                      }


                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Occupation :</p></td>
                      {spouseObj == null || spouseObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{spouseObj.occupation}</td>
                      }

                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Employer/Business :</p></td>
                      {spouseObj == null || spouseObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{spouseObj.employer}</td>
                      }

                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Number of Children</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Name</p></td>
                      {childObj == null || childObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{childObj.name}</td>
                      }

                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Age</p></td>
                      {childObj == null || childObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'>{childObj.dob}</p></td>
                      }


                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>School</p></td>
                      {childObj == null || childObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{childObj.school_name}</td>
                      }

                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Tuition/session</p></td>
                      {childObj == null || childObj == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p> {childObj.school_fees}</td>
                      }

                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Number of domestic Staff </p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Name </p></td>
                      {domesticStaff == null || domesticStaff == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{domesticStaff.name}</td>
                      }

                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Address </p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5 font-bold'>Amount Paid </p></td>
                      {domesticStaff == null || domesticStaff == ""
                        ? <td className=""></td> :
                        <td width='566'><p align='left' className='style5'></p>{domesticStaff.amount_paid}</td>
                      }

                    </tr>
                    <hr />
                    <tr>
                      <td className="font-bold">Number Vehicles</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Brand</td>
                      {vehicles == null || vehicles == ""
                        ? <td className=""></td> :
                        <td className="">{vehicles.brand}</td>
                      }

                    </tr>
                    <tr>
                      <td className="font-bold">Model</td>
                      {vehicles == null || vehicles == ""
                        ? <td className=""></td> :
                        <td className="">{vehicles.model}</td>
                      }

                    </tr>
                    <tr>
                      <td className="font-bold">Year</td>
                      {vehicles == null || vehicles == ""
                        ? <td className=""></td> :
                        <td className="">{vehicles.year}</td>
                      }

                    </tr>
                    <hr />
                    <tr>
                      <td width='800' className="font-bold">Tangible Immovable Properties:</td>
                    </tr>
                    <tr>
                      <td width='' className="font-bold">Property: House</td>
                    </tr>
                    <tr>
                      <td width='' className="font-bold">Address:</td>
                    </tr>
                    <tr>
                      <td width='800' className="font-bold">Date Completd/Acquired:</td>
                    </tr>
                    <tr>
                      <td width='600' className="font-bold"> Cost</td>
                    </tr>
                    <hr />
                    <tr>
                      <td className="font-bold">Property: Land</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Address:</td>
                      {land == null || land == ""
                        ? <td className=""></td> :
                        <td className="">{land.addr}:</td>
                      }

                    </tr>
                    <tr>
                      <td className="font-bold">Date Acquired/Completion:</td>
                      {land == null || land == ""
                        ? <td className=""></td> :
                        <td className="">{land.date_completion}</td>
                      }

                    </tr>
                    <tr>
                      <td width='600' className="font-bold"><td>Cost:</td></td>
                      {land == null || land == ""
                        ? <td className=""></td> :
                        <td className="">{land.construction_cost}</td>
                      }

                    </tr>
                  </table>


                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <style
        jsx>{`
        .style1 {
          font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri;
          color: #006600;
          font-size: 58px;
          font-weight: bold;
        }
        .style4 {
          font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri;
          font-weight: bold;
        }
        .style5 {font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri}
        
         .tb {    
            border: 1px solid #000000;
            text-align: left;
          font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri;
          font-size: 14px;
          height: 20px;
           border-collapse: collapse;
          padding: 2px;
        } 
        .style9 {font-size: 18px; color: #006600; font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-weight: bold; }
        .style10 {font-size: 19px; color: #006600; font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-weight: bold; }
        .style11 {font-size: 21px}
        .style16 {font-size: 12px}
        .style18 {font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-size: 12px; font-weight: bold; }
        .style20 {font-size: 12px; font-weight: bold; }
        .style21 {font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-size: 12px; font-weight: bold; font-style: italic; }
        .style27 {font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-size: 12px; }
        .style28 {border: 1px solid #ddd; text-align: left; font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; border-collapse: collapse; padding: 5px; font-size: 12px; }
        .style29 {
          border: 1px solid #ddd;
          text-align: left;
          font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri;
          border-collapse: collapse;
          padding: 5px;
          font-weight: bold;
          font-size: 12px;
        }
        
        
        
        .style30 {font-size: 15px}
        .style32 {
          font-size: 15px;
          font-weight: bold;
        }
        .style34 {font-size: 15px}
        .style35 {font-weight: bold} 
        
        .print:last-child {
             page-break-after: auto;
        }
      `}
      </style>
    </>
  );
};