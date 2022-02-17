import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import { KgirsLogo } from "../Images/Images";

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

export const ViewApprovedTable = ({ remittance }) => {
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
                    <Link href={`/view/approvedasses/${remittance.assessment_id},${remittance.kgtin}`}>
                      <a className="hover:text-blue-500">
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



export const ViewSingleApprovedTable = ({ payerprop, assId }) => {
  const items = payerprop;
  const assesId = assId
  console.log(assesId);
  console.log(items);

  return (
    <>
      <table width='600' height='1575' align='center' className='print'>
        <tr>
          <td width='600' height='1569' align='center' valign='top'>
            <table width='1000'>
              <tr>
                <td width='857'>&nbsp;</td>
                <td width='131'> $form_no </td>
              </tr>
            </table>
            <table width='1100' align='center'>
              <tr>
                <td width='118' height='117'><div align='right'><img src='$logo1' width='117' height='115' /></div></td>
                <td width='495' valign='bottom'>
                  <div align='center'><span className='style1'>KGIRS</span>
                  </div>
                  <div align='left' className='style10'>
                    <div align='center' className='style11'>KOGI STATE INTERNAL REVENUE SERVICE </div>
                  </div>
                </td>
                <td width='371' valign='bottom'><div align='center' className='style4'>KOGI STATE INTERNAL REVENUE SERVICE</div>
                  <p align='center' className='style4'>PERSONAL INCOME TAX $ass_yr </p>
                  <p align='center' className='style4'>NOTICE OF ASSESSMENT </p>
                </td>
              </tr>
            </table>
            <table width='1100' className='tb'>
              <tr>
                <td width='811'><table width='83%' height='100%' border='0'>
                  <tr>
                    <td width='139'><strong>TITLE:</strong></td>
                    <td width='347'> $title </td>
                  </tr>
                  <tr>
                    <td><strong>SURNAME:</strong></td>
                    <td> $surname </td>
                  </tr>
                  <tr>
                    <td><strong>OTHER NAME: </strong></td>
                    <td> $other_n </td>
                  </tr>
                  <tr>
                    <td><strong>ADDRESS:</strong></td>
                    <td> $addr </td>
                  </tr>
                </table></td>
                <td width='811'><table width='85%' height='100%' border='0' align='right'>
                  <tr>
                    <td width='144'><strong>Folder RSN</strong></td>
                    <td width='350'> $fol_rsn </td>
                  </tr>
                  <tr>
                    <td><strong>Tax Station </strong></td>
                    <td> $tax_stn </td>
                  </tr>
                  <tr>
                    <td><strong>KGTIN</strong></td>
                    <td> $ktin </td>
                  </tr>
                  <tr>
                    <td><strong>Assessment No </strong></td>
                    <td> $ass_id </td>
                  </tr>
                  <tr>
                    <td><strong>Date of Issue </strong></td>
                    <td className=''> $tdate </td>
                  </tr>
                </table>
                </td>
              </tr>
            </table>
            <p><span className='style9'>KOGI STATE OF NIGERIA </span></p>
            <table width='1100'>
              <tr>
                <td width='580' height='1072' align='top'>
                  <table width='580' height='1286' className='tb'>
                    <tr>
                      <td colspan='2'><div align='center'><span className='style4'>TAX COMPUTATION </span></div></td>

                    </tr>
                    <tr>
                      <td width='313' className='tb' ><span className='style27'>SOURCE OF INCOME </span></td>
                      <td width='160' className='tb' >&nbsp;</td>
                    </tr>
                    <tr>
                      <td className='tb'> Trade, Professional e.t.c </td>
                      <td className='tb'> $trade_prof </td>
                    </tr>
                    <tr>
                      <td className='tb'>Share of Partnership </td>
                      <td className='tb'>  $share_part </td>
                    </tr>
                    <tr>
                      <td className='tb'>Employment</td>
                      <td className='tb'> $employment </td>
                    </tr>
                    <tr>
                      <td className='tb'>Other Income </td>
                      <td className='tb'> $other_inc </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right' className='style27'>Gross Income </div></td>
                      <td className='tb'> $gross_inc </td>
                    </tr>
                    <tr>
                      <td className='tb'>PFC</td>
                      <td className='tb'> $pfc </td>
                    </tr>
                    <tr>
                      <td className='tb'>NHIS</td>
                      <td className='tb'> $nhis </td>
                    </tr>
                    <tr>
                      <td className='tb'>NHF</td>
                      <td className='tb'> $nhf </td>
                    </tr>
                    <tr>
                      <td className='tb'>Total</td>
                      <td className='tb'> $tot_pnn </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right' className='style16'>Assessable Income </div></td>
                      <td className='tb'> $ass_income </td>
                    </tr>
                    <tr>
                      <td className='tb'>ADD</td>
                      <td className='tb'></td>
                    </tr>
                    <tr>
                      <td className='tb'>Balancing Charges </td>
                      <td className='tb'> $bal_ch </td>
                    </tr>
                    <tr>
                      <td className='tb'>DEDUCT</td>
                      <td className='tb'></td>
                    </tr>
                    <tr>
                      <td className='tb'>Balancing Allowances </td>
                      <td className='tb'> $bal_all </td>
                    </tr>
                    <tr>
                      <td className='tb'>Lose Relief </td>
                      <td className='tb'> $lose_rlf </td>
                    </tr>
                    <tr>
                      <td className='tb'>Capital Allowances </td>
                      <td className='tb'> $cap_all </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right' className='style16'>Total Income</div></td>
                      <td className='tb'> $tot_income </td>
                    </tr>
                    <tr>
                      <td className='tb'>RELIEF</td>
                      <td className='tb'></td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>CONSOLIDATED ALLOWANCE </div></td>
                      <td className='tb'> $con_all </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>General Charges </div></td>
                      <td className='tb'> $gnr_ch </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style27'>Professional Charges </div></td>
                      <td className='tb'> $pro_ch </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Life Assurance Premium </div></td>
                      <td className='tb'> $lap </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right'>Total Amount </div></td>
                      <td className='tb'> $tot_genr_pro_lap </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right'>Total Relief </div></td>
                      <td className='tb'> $total_relief </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right'>Chargeable Income </div></td>
                      <td className='tb'> $ch_inc </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Tax Due for Payment </div></td>
                      <td className='tb'>&nbsp;</td>
                    </tr>

                    <tr>
                      <td className='tb'><div align='center' className='style16'>7% on 300,000.00 </div></td>
                      <td className='tb'> $per7 </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>11% on 300,000.00 </div></td>
                      <td className='tb'> $per11 </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>15% on 500,000.00 </div></td>
                      <td className='tb'> $per15 </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>19% on 500,000.00 </div></td>
                      <td className='tb'> $per19 </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>21% on 1,600,000.00 </div></td>
                      <td className='tb'> $per21 </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center'>24% on Excess </div></td>
                      <td className='tb'> $per24 </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>1%</div></td>
                      <td className='tb'> $per1 </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Total </div></td>
                      <td className='tb'> $total_percent </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Water Rate </div></td>
                      <td className='tb'> $water_rate </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Dev. Levy </div></td>
                      <td className='tb'> $dev_lv </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right' className='style16'>Total Tax Due </div></td>
                      <td className='tb'> $t_tax_due </td>
                    </tr>
                    <tr>
                      <td height='28' className='tb'><div align='right' className='style16'>Set off Additional Assessment </div></td>
                      <td className='tb'> $set_add_ass </td>
                    </tr>
                    <tr>
                      <td height='30' className='tb'><div align='right' className='style16'>Total Tax Due for Payment </div></td>
                      <td className='tb'> $t_tax_due_pay </td>
                    </tr>
                  </table>
                  <br />
                  <div align='center' className='style4'>NOTICE TO PAY </div>
                  <table width='567'>
                    <tr>
                      <td width='235' className='style5'><span className='style27'>Collection Authority:</span></td>
                      <td width='320' className='style5'><span className='style27'>KGIRS CORPORATE HQTRS</span></td>
                    </tr>
                    <tr>
                      <td className='style27'>Year of Assessment: </td>
                      <td className='style5'>?php echo $ass_yr ?</td>
                    </tr>
                  </table>
                  <table width='570' className='tb'>
                    <tr>
                      <td width='261' className='tb'>NET TAX PAYABLE </td>
                      <td width='297' className='tb'><span className='style16'><strong>DUE DATE OF PAYMENT </strong></span></td>
                    </tr>
                    <tr>
                      <td className='tb'>&#8358; $net_t_pay </td>
                      <td className='tb'> $due_date_pay </td>
                    </tr>
                  </table></td>
                <td width='523' valign='top'><table width='500' align='center' className='tb'>
                  <tr>
                    <td width='566'><p align='center' className='style5'><span className='style30'><strong>PAYMENT OF  TAX:</strong><br />
                      The net tax payable be paid to:<br />
                      <strong>KOGI STATE  INTERNAL REVENUE SERVICE LOKOJA</strong><br />
                      The year of assessment, assessment  number and file number should always be quoted.</span></p></td>
                  </tr>
                </table>
                  <table width='500' height='444' align='center'>
                    <tr>
                      <td width='570' valign='top'><p align='center' className='style30'><strong>NOTICE OF ASSESSMENT</strong></p>                <div align='left' className='style5 style30'>
                        <div align='left'>Be informed that tax payment is not a fine, it is a  civic responsibility.</div>
                      </div>

                        <p align='left' className='style5 style30'>We have made an assessment on you, as set out  opposite, for the year stated above, under the provision of personal income tax  act 2011 amended.</p>
                        <div align='center'><img src='$chsign' width='115' height='60' /></div>
                        <div align='center' className='style5 style30'><strong>Sule Salihu Enehe</strong></div>
                        <div align='center' className='style21 style30'>Ag. Chairman</div>
                        <div align='center' className='style18 style30'>Kogi  Internal Revenue Service</div>
                        <br />
                        <table width='500'>
                          <tr>
                            <td width='176' className='style16 style5'><span className='style32'>Prepared By:</span></td>
                            <td width='312' className='style18 style34'>&nbsp;</td>
                          </tr>
                          <tr>
                            <td className='style21 style34'>Collection Authority:</td>
                            <td className='style5'><u><span className='style20 style34'>KGIRS CORPORATE HQTRS</span></u></td>
                          </tr>
                          <tr>
                            <td className='style21 style34'>Due Date of Payment: </td>
                            <td className='style18'><u><span className='style20 style34'> $due_date_pay </span></u></td>
                          </tr>
                        </table>
                        <p align='center' className='style5'><strong>Right of Objection</strong><br />
                          <span className='style30'>If  you do not agree with the assessment, you are please obliged to do the  following;</span></p>
                        <ol type='i' className='style30'>
                          <li className='style5'>Give notice of objection in writing seeking the relevant tax  office to review and revise the assessment.</li>
                          <li className='style5'>The objection should contain precise ground(s) of objection  on points of fact and or subsisting laws on personal income tax administration.</li>
                          <li className='style5'>The objection notice should reach the tax office within (30)  days from the date of service of notice of assessment, else a penalty of 10  percent of tax payable will be added and any right of payment by two  installments will be lost. </li>
                        </ol>
                        <div className='style5 style30'>The Tax Appeal Tribunal  established pursuant to section 59 of the Federal Inland Revenue Service (Established)  Act, 2007 shall have powers to entertain all cases from the operation of  Personal Income Act, 2011 amended.</div>
                        <p align='center'><strong>COLLECTING BANKS</strong></p>
                        <table width='500' align='center' className='tb'>
                          <tr>
                            <td width='182' className='tb'><div align='center'>Access Bank</div></td>
                            <td width='181' className='tb'><div align='center'>Eco Bank</div></td>
                            <td width='191' className='tb'><div align='center'>Fidelity Bank</div></td>
                          </tr>
                          <tr>
                            <td width='191' className='tb'><div align='center'>FCMB</div></td>
                            <td className='tb'><div align='center'>First Bank</div></td>
                            <td className='tb'><div align='center'>Heritage Bank</div></td>

                          </tr>
                          <tr>
                            <td className='tb'><div align='center'>Keystone Bank</div></td>
                            <td className='tb'><div align='center'>Kogi Savings</div></td>
                            <td className='tb'><div align='center'>Polaris Bank</div></td>

                          </tr>
                          <tr>
                            <td className='tb'><div align='center'>Stanbic IBTC</div></td>
                            <td className='tb'><div align='center'>Union Bank</div></td>
                            <td className='tb'><div align='center'>UBA</div></td>
                          </tr>
                          <tr>
                            <td className='tb'><div align='center'>Unity Bank PLC</div></td>
                            <td className='tb'><div align='center'>Wema Bank PLC</div></td>
                            <td className='tb'><div align='center'>Zenith Bank</div></td>
                          </tr>
                        </table>
                        <table width='165' className='tb'>
                        </table>
                        <p align='center' className='style4'>KOGI STATE OF NIGERIA</p>
                        <table width='501' align='center' className='tb'>
                          <tr>
                            <td width='138' className='tb'><strong>KGTIN</strong></td>
                            <td width='351' className='tb'> $ktin </td>
                          </tr>
                          <tr>
                            <td className='tb'><strong>Assessment No</strong></td>
                            <td className='tb'> $ass_id </td>
                          </tr>
                        </table>
                        <br />
                        <div align='center' className='style4'>
                          <div align='left'>
                            <p>HOW TO PAY YOUR TAX</p>
                          </div>
                        </div>

                        <div className='style5'>
                          <div align='left'>This notice should accompany a remittance or be produced at the point of payment.</div>
                        </div></td>
                    </tr>
                  </table>
                  <p align='left' className='style16'><span className='style5 style35'><strong>AN OFFICIAL RECEIPT SHOULD BE  OBTAINED FOR EACH PAYMENT</strong>.</span><br />

                    <span className='style5'>Payment  of tax to the tax collection Authority may be made through certified Bank only.  Payable to Kogi State Government.</span></p>
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

      {/* {isFetching2 && (
        <div classNameNameName="flex justify-center item mb-2">
          <Loader
            visible={isFetching2}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            classNameNameName="ml-2"
          />
          <p classNameName="font-bold">Approving...</p>
        </div>
      )}
      {isFetching3 && (
        <div classNameName="flex justify-center item mb-2">
          <Loader
            visible={isFetching3}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            classNameName="ml-2"
          />
          <p classNameName="font-bold">Declining...</p>
        </div>
      )} */}

      <Widget>
        {/* <div classNameName="flex justify-end">
          <form onSubmit={approveAssessmentSubmit}>
            <button
              classNameName="btn btn-default bg-green-600 text-white mr-4 btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Approve Assessment
            </button>
          </form>

          <form onSubmit={declinedAssessmentSubmit}>
            <button
              classNameName="btn bg-red-600	btn-default text-white btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Decline Assessment
            </button>
          </form>

        </div>
        <div classNameName="block p-6 rounded-lg bg-white w-full">
          <div classNameName="flex">
            <h6 classNameName="pb-2">Employment Information</h6>
          </div>
          <p classNameName="mb-3 font-bold"></p>
          <form>
            <div classNameName="grid grid-cols-5 gap-4">

              <div classNameName="">
                <p>Employer Name</p>
                {items.employed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.emp_name} disabled />
                }
              </div>

              <div classNameName="form-group mb-6">
                <p>Employer Address</p>
                {items.employed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.emp_addr} disabled />
                }
              </div>

              <div classNameName="form-group mb-6">
                <p>Gross Pay</p>
                {items.employed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.gross_pay} disabled />
                }
              </div>
              <div classNameName="form-group mb-6">
                <p>Tax Deducted</p>
                {items.employed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.tax_deducted} disabled />
                }
              </div>
              <div classNameName="form-group mb-6">
                <p>Start Date</p>
                {items.employed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.start_date} disabled />
                }
              </div>
            </div>

            <div classNameName="flex">
              <h6 classNameName="pb-2">Self Employment Information</h6>
            </div>
            <div classNameName="grid grid-cols-5 gap-4">
              <div classNameName="form-group mb-2">
                <p>Business Type</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.business_type} disabled />
                }
              </div>

              <div classNameName="form-group mb-2">
                <p>Address</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.business_addr} disabled />
                }
              </div>
              <div classNameName="form-group mb-2">
                <p>Business Name</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.business_name} disabled />
                }
              </div>

              <div classNameName="form-group mb-2">
                <p>Business Start Date</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.business_start_date} disabled />
                }
              </div>
              <div classNameName="form-group mb-2">
                <p>Income Earned</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.income_earned} disabled />
                }
              </div>
              <div classNameName="form-group mb-2">
                <p>Other Income</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.other_income} disabled />
                }
              </div>

            </div>

            <div classNameName="flex  mt-6">
              <h6 classNameName="pb-2">NHIS Information</h6>
            </div>

            <div classNameName="grid grid-cols-5 gap-4">
              <div classNameName="form-group mb-6">
                <p>Company Name</p>
                {items.nhis == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.nhis.company} disabled />
                }
              </div>

              <div classNameName="form-group mb-6">
                <p>Company Address</p>
                {items.nhis == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.nhis.addr} disabled />
                }
              </div>
              <div classNameName="form-group mb-6">
                <p>Amount</p>
                {items.nhis == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.nhis.amount} disabled />
                }
              </div>
              <div classNameName="form-group mb-6">
                <p>Isuance Number</p>
                {items.nhis == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.nhis.insurance_no} disabled />
                }
              </div>
            </div>
          </form>
        </div>

      </Widget>

      <Widget>
        <div classNameName="block p-6 rounded-lg bg-white w-full">
          <form>
            <div classNameName="flex">
              <h6 classNameName="pb-2">Pension Deduction Information</h6>
            </div>
            <div classNameName="grid grid-cols-5 gap-4">
              <div classNameName="">
                <p>PFA</p>
                {items.pensionDed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.pensionDed.pfa} disabled />
                }
              </div>

              <div classNameName="form-group mb-6">
                <p>PFA Address</p>
                {items.pensionDed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.pensionDed.pfa_addr} disabled />
                }
              </div>
              <div classNameName="form-group mb-6">
                <p>Amount</p>
                {items.pensionDed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.pensionDed.amount} disabled />
                }
              </div>
              <div classNameName="form-group mb-6">
                <p>RSA No</p>
                {items.pensionDed == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.pensionDed.rsa_no} disabled />
                }
              </div>
            </div>

            <div classNameName="flex">
              <h6 classNameName="pb-2">Life Assurance Information</h6>
            </div>
            <div classNameName="grid grid-cols-5 gap-4">
              <div classNameName="form-group mb-6">
                <p>Company Name</p>
                {items.lap == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.lap.company} disabled />
                }
              </div>

              <div classNameName="form-group mb-6">
                <p>Company Address</p>
                {items.lap == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.lap.addr} disabled />
                }
              </div>
              <div classNameName="form-group mb-6">
                <p>RSA number</p>
                {items.lap == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.lap.rsa_no} disabled />
                }
              </div>
              <div classNameName="form-group mb-6">
                <p>Amount</p>
                {items.lap == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.lap.amount} disabled />
                }

              </div>
              <div classNameName="form-group mb-6">
                <p>Comment</p>
                {items.lap == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.lap.comments} disabled />
                }

              </div>
            </div>
            <div classNameName="flex">
              <h6 classNameName="pb-2">Expenses Information</h6>
            </div>
            <div classNameName="grid grid-cols-5 gap-4">
              <div classNameName="form-group mb-6">
                <p>Amount</p>
                {items.expenses == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.expenses.amount} disabled />
                }
              </div>

              <div classNameName="form-group mb-6">
                <p>Item</p>
                {items.expenses == null || "" ?
                  <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" classNameName="form-control w-full rounded font-light text-gray-500"
                      value={items.expenses.item} disabled />
                }
              </div>

            </div>
          </form>
        </div> */}
      </Widget>
    </>
  );
};