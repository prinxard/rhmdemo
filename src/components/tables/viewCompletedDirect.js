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
  {
    name: "Status",
    key: "status",
  },
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
        <table classNameNameName="table divide-y">
          <thead>
            <tr classNameNameName="">
              {fields.map((field, i) => (
                <th key={i} classNameNameName="">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody classNameNameName="divide-y">
            {items.map((remittance, i) => (
              <tr key={i} classNameNameName="">
                {fields.map((field, j) => (
                  <td key={j} classNameNameName="">
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



export const ViewSingleCompletedTable = ({ payerprop, assId }) => {
  const [isFetching2, setIsFetching2] = useState(() => false);
  const [isFetching3, setIsFetching3] = useState(() => false);
  const router = useRouter();

  const items = payerprop;
  const assessment_id = assId

  setAuthToken();
  let approveAssessmentSubmit = async (e) => {
    e.preventDefault()
    setIsFetching2(true)
    let approveAssessFormObj = {
      assessment_id: `${assessment_id}`,
      status: `Approved`,
    }
    try {
      let res = await axios.put(`${url.BASE_URL}forma/set-status`, approveAssessFormObj);
      setIsFetching2(false)
      router.push(`/approvere`)
      console.log("successful!");
    } catch (error) {
      console.log(error);
      setIsFetching2(false)
    }

  }

  setAuthToken();
  let declinedAssessmentSubmit = async (e) => {
    e.preventDefault()
    setIsFetching3(true)
    let declineAssessFormObj = {
      assessment_id: `${assessment_id}`,
      status: `Declined`,
    }
    try {
      let res = await axios.put(`${url.BASE_URL}forma/set-status`, declineAssessFormObj);
      setIsFetching3(false)
      router.push(`/declinere`)
      console.log("successful!");
    } catch (error) {
      console.log(error);
      setIsFetching3(false)
    }

  }

  return (
    <>

      <table width='800' height='1575' align='center' className='print'>
        <tr>
          <td width='800' height='1569' align='center' valign='top'>
            <table width='700'>
              <tr>
                <td width='857'>&nbsp;</td>
                <td width='131'> Approve </td>
              </tr>
            </table>

            <table width='600' className='tb mb-4'>
              <tr>
                <td width='385'><table width='83%' height='100%' border='0'>
                  <tr>
                    <td width='139'><strong>TITLE:</strong></td>
                    <td width='347'>  </td>
                  </tr>
                  <tr>
                    <td><strong>SURNAME:</strong></td>
                    <td>  </td>
                  </tr>
                  <tr>
                    <td><strong>OTHER NAME: </strong></td>
                    <td>  </td>
                  </tr>
                  <tr>
                    <td><strong>ADDRESS:</strong></td>
                    <td>  </td>
                  </tr>
                </table></td>
                <td width='403'><table width='85%' height='100%' border='0' align='right'>

                  <tr>
                    <td><strong>Tax Station </strong></td>
                    <td>  </td>
                  </tr>
                  <tr>
                    <td><strong>KGTIN</strong></td>
                    <td>  </td>
                  </tr>
                  <tr>
                    <td><strong>Assessment No </strong></td>
                    <td>  </td>
                  </tr>
                  <tr>
                    <td><strong>Date Assessed </strong></td>
                    <td className=''>  </td>
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
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>Share of Partnership </td>
                    <td className='tb'>   </td>
                  </tr>
                  <tr>
                    <td className='tb'>Employment</td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>Other Income </td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='right' className='style27'>Gross Income </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>PFC</td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>NHIS</td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>NHF</td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>Total</td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='right' className='style16'>Assessable Income </div></td>
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
                    <td className='tb'><div align='right' className='style16'>Total Income</div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'>RELIEF</td>
                    <td className='tb'></td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>CONSOLIDATED ALLOWANCE </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>General Charges </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style27'>Professional Charges </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>Life Assurance Premium </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='right'>Total Amount </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='right'>Total Relief </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='right'>Chargeable Income </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>Tax Due for Payment </div></td>
                    <td className='tb'>&nbsp;</td>
                  </tr>

                  <tr>
                    <td className='tb'><div align='center' className='style16'>7% on 300,000.00 </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>11% on 300,000.00 </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>15% on 500,000.00 </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>19% on 500,000.00 </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>21% on 1,600,000.00 </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center'>24% on Excess </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>1%</div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>Total </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>Water Rate </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='center' className='style16'>Dev. Levy </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td className='tb'><div align='right' className='style16'>Total Tax Due </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  
                  <tr>
                    <td className='tb'><div align='right' className='style16'>Set off 1st Assessment </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td height='28' className='tb'><div align='right' className='style16'>Set off Additional Assessment </div></td>
                    <td className='tb'>  </td>
                  </tr>
                  <tr>
                    <td height='30' className='tb'><div align='right' className='style16'>Total Tax Due for Payment </div></td>
                    <td className='tb'>  </td>
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
                      <td width='320' className='style5'><span className='style27'>KGIRS CORPORATE HQTRS</span></td>
                    </tr>

                  </table>
                </td>
                <td width='509' valign='top'>
                  <table width='300' align='left' className=''>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Phone Number</p></td>
                      <td width='566'><p align='left' className='style5'> </p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Email Address</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5'>Residential Address</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Type of Residence</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5'>Residence Ownership</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Owner Info:</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Name:</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Address:</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Phone Number:</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5'>Marital Status :</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Name :</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Age :</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Occupation :</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Employer Business :</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5'>Number of Children</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Name</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Age</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>School</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Tuition/session</p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5'>Number of domestic Servants </p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Name </p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Address </p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <tr>
                      <td width='566'><p align='left' className='style5'>Amount Paid </p></td>
                      <td width='566'><p align='left' className='style5'></p></td>
                    </tr>
                    <hr />
                    <tr>
                      <td width='566'><p align='left' className='style5'>ASSETS </p></td>
                    </tr>
                    <tr>
                      <td>Number of Vehicles</td>
                    </tr>
                    <tr>
                      <td >Brand:</td>
                      <td >Model:</td>
                      <td >Year:</td>
                      <td >Year:</td>
                    </tr>
                    <hr />
                    <tr>
                      <td width='800'>Tangible Immovable Properties:</td>
                    </tr>
                    <tr>
                      <td width=''>Property: House</td>
                    </tr>
                    <tr>
                      <td width=''>Address:</td>
                    </tr>
                    <tr>
                      <td width='800'>Date Completd/Acquired:</td>
                    </tr>
                    <tr>
                      <td width='600'> Cost</td>
                    </tr>
                    <hr />
                    <tr>
                      <td>Property: Land</td>
                    </tr>
                    <tr>
                      <td>Address:</td>
                    </tr>
                    <tr>
                      <td>Date Acquired:</td>
                    </tr>
                    <tr>
                      <td><td>Cost:</td>:</td>
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