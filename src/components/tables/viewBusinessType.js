import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import dateformat from "dateformat";
import { KgirsLogo, KogiGov, Signature } from "../Images/Images";
import React, { useState } from "react";
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import MaterialTable from "material-table";
import { Delete, Edit, WarningRounded } from "@material-ui/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";

const fields = [
    {
        title: "SN",
        field: "serialNo",
        filtering: false,
        width: "10%",
        editable: 'never'
    },
    {
        title: "Business Type",
        field: "business_type",
        editable: 'onUpdate'
    },

];

export const ViewBusinessTypeTable = ({ BusinessTypeData }) => {
    let items = BusinessTypeData;
    const [modal, setModal] = useState(false);
    const [assessId, setAssessId] = useState('');
    const [test, setPost] = useState('');
    const [isFetching, setIsFetching] = useState(() => false);




    return (
        <>
            <ToastContainer />

            {isFetching && (
                <div className="flex justify-start item mb-2">
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

            <MaterialTable title="View Business Types"
                data={items}
                columns={fields}

                // cellEditable={{
                //     cellStyle: {},
                //     onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                //         return new Promise((resolve, reject) => {
                //             const clonedData = [...data]
                //             clonedData[rowData.tableData.id][columnDef.field] = newValue
                //             setPost(clonedData)
                //             console.log("clonedData", test);
                //             setTimeout(resolve, 1000);
                //             // console.log('newValue: ' + newValue);
                //             // setTimeout(resolve, 4000);
                //         });
                //     }
                // }}

                options={{
                    search: true,
                    paging: true,
                    filtering: true,
                    rowStyle: (rowData) => {
                        if (rowData.printstatus === "Yes") {
                            return {
                                color: "#5f9f45"
                            }
                        } else {
                            return {};
                        }
                    },
                    exportButton: {
                        csv: true,
                        pdf: false
                    },
                    exportAllData: true,

                }}
                icons={{
                    Check: Check,
                    DetailPanel: ChevronRight,
                    Export: SaveAlt,
                    Filter: () => <Icons.Filter />,
                    Delete: () => Delete,
                    FirstPage: FirstPage,
                    LastPage: LastPage,
                    NextPage: ChevronRight,
                    PreviousPage: ChevronLeft,
                    Search: Search,
                    ThirdStateCheck: Remove,
                    Clear: Clear,
                    SortArrow: ArrowDownward
                }}
            />
        </>
    );
};

export const ViewSingleApprovedTable = React.forwardRef((props, ref) => {

    const items = props.payerprop;
    const assId = props.assId
    const payerAyy = props.payerAyy
    const assobj = props.assobj
    const taxcal = props.taxcal
    const childObj = props.childObj
    const resAddObj = props.resAddObj
    const additionalAsse = props.additionalAsse

    const kgtinVal = payerAyy.map(function (doc) {
        let kgtin = doc.KGTIN
        return kgtin
    })
    const kgtinString = String(kgtinVal)

    let date = new Date()
    let due_date = new Date(date)
    due_date.setDate(due_date.getDate() + 60);
    let paymentDue = dateformat(due_date, "dd mmm yyyy")
    let printDate = Date.now();
    let datePrinted = dateformat(printDate, "dd mmm yyyy")

    const assessment_id = assId
    const createdTime = dateformat(assobj.createtime, "dd mmm yyyy")
    const employedCal = Number(assobj.employed)
    const selfEmployedCal = Number(assobj.self_employed)
    const grossIncCal = employedCal + selfEmployedCal

    const pfcdata = Number(assobj.pension)
    const nhisdata = Number(assobj.nhis)
    const lapdata = Number(assobj.lap)

    const deductionsTotal = (pfcdata + nhisdata + lapdata)

    let addAssAmount

    additionalAsse.forEach((el, i) => (
        addAssAmount = el.amount
    ))

    if (addAssAmount == null || addAssAmount == undefined || addAssAmount == "") {
        addAssAmount = 0
    } else {
        addAssAmount = addAssAmount
    }

    return (
        <>
            <div className="mt-4" ref={ref}>
                <div align="center">
                    <div className="flex justify-evenly">
                        <p align="left"> <KgirsLogo /></p>
                        <h3 className="mt-9">KOGI STATE GOVERNMENT</h3>
                        <p align="right"> <KogiGov /></p>
                    </div>
                    <h5>Kogi State Internal Revenue Service</h5>
                    <h6>Notice Of Assessment</h6>
                </div>
                <table width='800' height='1200' align='center' className='print'>
                    <tr>
                        <td width='800' height='1200' align='center' valign='top'>
                            <div className="flex justify-between">
                                <h6 align="left">Personal Income Tax {assobj.year}</h6>
                                <small>printed on {datePrinted}</small>
                            </div>
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
                                                <p key={idx}>{data.middle_name} <span> {data.first_name}</span> </p>
                                            ))}
                                        </tr>

                                        <tr>
                                            <td><strong>CITY: </strong></td>
                                            {payerAyy.map((data, idx) => (
                                                <p key={idx}> {data.city} </p>
                                            ))}
                                        </tr>

                                        <tr>
                                            <td><strong>HOUSE NO: </strong></td>
                                            {payerAyy.map((data, idx) => (
                                                <p key={idx}> {data.house_no} </p>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td><strong>ADDRESS:</strong></td>
                                            {payerAyy.map((data, idx) => (
                                                <div>
                                                    {data.city == null || data.city == "" ? data.street :
                                                        <p>{`${data.street}, ${data.city}`}</p>
                                                    }
                                                </div>
                                                // <p key={idx}>, ${data.city}`}</p>
                                            ))}
                                        </tr>
                                    </table></td>
                                    <td width='403'><table width='85%' height='100%' border='0' align='right'>

                                        <tr>
                                            <td><strong>TAX STATION </strong></td>
                                            {payerAyy.map((data, idx) => (
                                                <div key={idx}>
                                                    {data.tax_office === "Okehi/Adavi" ?
                                                        <p>Adavi/Okehi</p> :
                                                        <p>{data.tax_office}</p>
                                                    }
                                                </div>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td><strong>Tax Id</strong></td>
                                            {payerAyy.map((data, idx) => (
                                                <p key={idx}>{data.KGTIN}</p>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td><strong>PHONE</strong></td>
                                            {payerAyy.map((data, idx) => (
                                                <p key={idx}>{data.phone_number}</p>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td><strong>ASSESSMENT NO </strong></td>
                                            {assessment_id}
                                        </tr>
                                    </table>
                                    </td>
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
                                                <td className='tb'><p className="font-bold" align="right">{formatNumber(assobj.self_employed)}</p> </td>
                                            }
                                        </tr>
                                        <tr>
                                            <td className='tb'>Share of Partnership </td>
                                            <td className='tb'>   </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>Employment</td>
                                            {assobj == null || assobj == ""
                                                ? <td><p className="font-bold text-right">0</p></td> :
                                                <td className='tb'><p className="font-bold" align="right">{formatNumber(assobj.employed)}</p> </td>
                                            }
                                        </tr>
                                        <tr>
                                            <td className='tb'>Other Income </td>
                                            <td className='tb'> <p className="font-bold text-right">{formatNumber(assobj.other_income)}</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='right' className='style27 font-bold'>Gross Income </div></td>
                                            <td className='tb'><p className="font-bold" align="right">{formatNumber((grossIncCal) + Number(assobj.other_income))}</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>PFC</td>
                                            {assobj == null || assobj == ""
                                                ? <td className="tb"><p className="font-bold text-right">0</p></td> :
                                                <td className='tb'><p className="font-bold" align="right">{formatNumber(assobj.pension)}</p></td>
                                            }

                                        </tr>
                                        <tr>
                                            <td className='tb'>NHIS</td>
                                            {assobj == null || assobj == ""
                                                ? <td className="tb"><p className="font-bold text-right">0</p></td> :
                                                <td className='tb'> <p className="font-bold" align="right">{formatNumber(assobj.nhis)}</p></td>
                                            }
                                        </tr>
                                        <tr>
                                            <td className='tb'>NHF</td>
                                            <td className='tb'><p className="font-bold text-right">0</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>Life Assurance Premium</td>
                                            {assobj == null || assobj == ""
                                                ? <td className="tb"><p className="font-bold text-right">0</p></td> :
                                                <td className='tb'> <p className="font-bold text-right">{formatNumber(assobj.lap)}</p></td>
                                            }

                                        </tr>
                                        <tr>
                                            <td className='tb font-bold'><p align="right">Total</p></td>
                                            <td className='tb'> <p className="font-bold text-right">{formatNumber(deductionsTotal)}</p></td>
                                        </tr>
                                        <tr>
                                            <td className='tb font-bold'><div align='right' className='style16'>Assessable Income </div></td>
                                            <td className='tb'> <p className="font-bold text-right">{formatNumber((((grossIncCal) + Number(assobj.other_income))) - deductionsTotal)}</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>ADD</td>
                                            <td className='tb'><p className="font-bold text-right">0</p></td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>Balancing Charges </td>
                                            <td className='tb'> <p className="font-bold text-right">0</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>DEDUCT</td>
                                            <td className='tb'><p className="font-bold text-right">0</p></td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>Balancing Allowances </td>
                                            <td className='tb'> <p className="font-bold text-right">0</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>Lose Relief </td>
                                            <td className='tb'><p className="font-bold text-right">0</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>Capital Allowances </td>
                                            <td className='tb'><p className="font-bold text-right">0</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='right' className='style16 font-bold'>Total Income</div></td>
                                            <td className='tb'> <p className="font-bold text-right">{formatNumber((((grossIncCal) + Number(assobj.other_income))) - deductionsTotal)}</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'>Consolidated Relief Allowance</td>
                                            {taxcal == null || taxcal == ""
                                                ? <td className="tb"></td> :
                                                <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.consolidatedRelief)}</p></td>
                                            }
                                        </tr>
                                        <tr>
                                            <td className='tb font-bold'><div align='right'>Chargeable Income </div></td>
                                            {taxcal == null || taxcal == ""
                                                ? <td className="tb"></td> :
                                                <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.chargeableIncome)}</p></td>
                                            }
                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='left' className='style16 font-bold'>Tax Due for Payment </div></td>
                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='center' className='style16'>First 300,000.00 at 7%</div></td>
                                            {taxcal == null || taxcal == ""
                                                ? <td className="tb"></td> :
                                                <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax7)}</p> </td>
                                            }


                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='center' className='style16'>Next 300,000.00 at 11%</div></td>
                                            {taxcal == null || taxcal == ""
                                                ? <td className="tb"></td> :
                                                <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax11)}</p> </td>
                                            }

                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='center' className='style16'>Next 500,000.00 at 15% </div></td>
                                            {taxcal == null || taxcal == ""
                                                ? <td className="tb"></td> :
                                                <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax15)}</p></td>
                                            }

                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='center' className='style16'>Next 500,000.00 at 19%</div></td>
                                            {taxcal == null || taxcal == ""
                                                ? <td className="tb"></td> :
                                                <td className='tb'><p className="font-bold text-right">{formatNumber(taxcal.tax19)}</p></td>
                                            }

                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='center' className='style16'>Next 1,600,000.00 at 21%</div></td>
                                            {taxcal == null || taxcal == ""
                                                ? <td className="tb"></td> :
                                                <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax21)}</p></td>
                                            }

                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='center'>Above 3,200,000.00 at 24%</div></td>
                                            {taxcal == null || taxcal == ""
                                                ? <td className="tb"></td> :
                                                <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax24)}</p></td>
                                            }

                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='center' className='style16'>1%(Minimun Tax)</div></td>
                                            <td className='tb'><p className="font-bold text-right">{formatNumber(taxcal.tax1)}</p></td>
                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='center' className='style16'>Total </div></td>
                                            <td className='tb'><p className="font-bold text-right"> {formatNumber(Number(taxcal.tax))}</p> </td>
                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='center' className='style16'>Dev. Levy </div></td>
                                            <td className='tb'> <p className="font-bold text-right">{formatNumber(Number(assobj.dev_levy))}</p></td>
                                            {/* <td className='tb'> <p className="font-bold text-right">{formatNumber(Number(taxcal.devy_levy))}</p> </td> */}
                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='right' className='style16 font-bold'>Total Tax Due </div></td>
                                            <td className='tb'><div align='right' className='style16 font-bold'>{formatNumber(taxcal.tax)}</div></td>
                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='right' className='style16 font-bold'>Additional Assessment </div></td>
                                            <td className='tb'><div align='right' className='style16 font-bold'>{formatNumber(addAssAmount)}</div></td>
                                        </tr>
                                        <tr>
                                            <td className='tb'><div align='right' className='style16 font-bold'>Set off WHT </div></td>
                                            <td className='tb'><p className="font-bold text-right">0</p></td>
                                        </tr>
                                        <tr>
                                            <td height='28' className='tb'><div align='right' className='style16 font-bold'>Set off 1st Assessment </div></td>
                                            <td className='tb'> <p className="text-right font-bold">0</p> </td>
                                        </tr>
                                        <tr>
                                            <td height='28' className='tb'><div align='right' className='style16 font-bold'>Set off Additional Assessment </div></td>
                                            <td className='tb'> <p className="text-right font-bold">0</p> </td>
                                        </tr>
                                        <tr>
                                            <td height='30' className='tb'><div align='right' className='style16 font-bold'>Total Tax Due for Payment </div></td>
                                            {/* <td className='tb'><p className="font-bold text-right">{formatNumber(taxcal.tax + Number(addAssAmount) + 500 )}</p></td> */}
                                            <td className='tb'><p className="font-bold text-right">{formatNumber(((Number(taxcal.tax) + Number(addAssAmount)) + Number(assobj.dev_levy)))}</p></td>
                                        </tr>
                                    </table>
                                        <br />
                                        <table width='300'>
                                            <tr>
                                                <td width='235' className='style5 font-bold'>HOW TO PAY YOUR TAX</td>
                                            </tr>
                                            <tr>
                                                <td width='235' className='style5'>1. Pay online by Visiting the KGIRS e-tax portal. <br />
                                                    https://etax.irs.kg.gov.ng</td>
                                            </tr>
                                            <tr>
                                                <td width='235' className='style5'><span className='style27'>2. Pay via USSD from your mobile phone by dialling *389*806#</span></td>
                                            </tr>
                                            <tr>
                                                <td width='235' className='style5'><span className='style27'>3. Pay at any of our collection banks listed</span></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td valign='top'>
                                        <div>
                                            <div>
                                                <div>
                                                    {assobj.assessment_type === null || assobj.assessment_type === "" || assobj.assessment_type === 'Assessment' ?
                                                        <div>
                                                            <p className="text-justify">
                                                                Be informed that Tax payment is not a fine, It is a civic responsibility.
                                                                We have made an Assesment on you as set out Opposite, for the year {assobj.year},
                                                                Under the provision of personal Income Tax Act 2011 amended
                                                            </p>
                                                        </div>
                                                        :
                                                        <div>
                                                            <p className="text-justify">
                                                                Be informed that Tax payment is not a fine, It is a civic responsibility.
                                                                We have made an Assesment on you <span className="font-bold">Based on Best of Judgement</span> as set out Opposite, for the year {assobj.year},
                                                                Under the provision of personal Income Tax Act 2011 amended.
                                                                <p className="font-bold">Reason:  <span>{assobj.boj_comment}</span> </p>
                                                            </p>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                            <div className="flex mt-4 justify-center">
                                                <Signature />
                                            </div>
                                            <div className="flex justify-center">
                                                <div>
                                                    <p className="font-bold mt-3" align="center"> Sule Salihu Enehe </p>
                                                    <p>Executive Chaiman</p>
                                                    <p>Kogi State Internal Revenue Service</p>
                                                </div>
                                            </div>

                                            <div className="mb-3 mt-4">
                                                <p>Prepared By:</p>
                                                <p>Collection Authority:     KGIRS CORPORATE HQTRS</p>
                                                <p>Due Date of Payment:</p>
                                            </div>
                                            <div>

                                                <div className="text-justify">
                                                    <p className="font-bold" align="center">RIGHT OF OBJECTION</p>
                                                    <p>If you do not agree to the Assesment, you are please Obliged to do the following:</p>

                                                    <p>I. Give Notice of Objection in writing Seeking the relevant tax office in review and revise the Assessment</p>
                                                    <p>II. The Objection should contain precise ground(s) of Objectionon points of fact and or subsisting laws on personal income Tax Administration</p>
                                                    <p>III. The Objection notice should reach the tax office within (30) days from the date of service of notice of assessment. Else
                                                        a penalty of 10 percent of tax payable will be added and any right of payment by two instalments will be lost.
                                                    </p>
                                                    <p>The Tax appeal Tribunal Established pursuant to section 59 of the federal inland revenue(Establishment) Act, 2007 shall have powers
                                                        to entertain all cases from the operation of Personal Income Tax, 2011 amended
                                                    </p>
                                                    <p align="center" className="m-5 font-bold">PAYMENT OF TAX</p>
                                                    <p>The net Tax Payable be paid to</p>
                                                    <p className="font-bold">KOGI STATE INTERNAL REVENUE SERVICE LOKOJA</p>
                                                    <p>The Tax ID and assessment number should always be quoted</p>
                                                </div>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">TIN</td>
                                                    <td width="300" className="font-bold tb">{kgtinString}</td>
                                                </tr>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">Assesment no</td>
                                                    <td width="300" className="font-bold tb">{assessment_id}</td>
                                                </tr>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">Year of Assesment</td>
                                                    <td width="300" className="font-bold tb">{assobj.year}</td>
                                                </tr>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">Net Tax Payable</td>
                                                    <td width="300" className="font-bold tb">{formatNumber(taxcal.tax + (Number(addAssAmount)) - -Number(assobj.dev_levy))}</td>
                                                </tr>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">Payment due date</td>
                                                    <td width="300" className="font-bold tb">{paymentDue}</td>
                                                </tr>
                                                <p className="font-bold mt-14" align="center">COLLECTION BANK</p>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">Access Bank</td>
                                                    <td width="300" className="font-bold tb">Eco Bank</td>
                                                    <td width="300" className="font-bold tb">Zenith Bank</td>
                                                </tr>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">FCMB</td>
                                                    <td width="300" className="font-bold tb">Fidelity Bank</td>
                                                    <td width="300" className="font-bold tb">First Bank</td>
                                                </tr>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">Heritage Bank</td>
                                                    <td width="300" className="font-bold tb">KeyStone Bank</td>
                                                    <td width="300" className="font-bold tb">Stanbic IBTC Bank</td>
                                                </tr>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">Kogi Savings</td>
                                                    <td width="300" className="font-bold tb">Polaris Bank</td>
                                                    <td width="300" className="font-bold tb">Wema Bank</td>
                                                </tr>
                                                <tr width="300">
                                                    <td width="300" className="font-bold tb">UBA</td>
                                                    <td width="300" className="font-bold tb">Union Bank</td>
                                                    <td width="300" className="font-bold tb">Unity Bank</td>
                                                </tr>
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </div>
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
});
