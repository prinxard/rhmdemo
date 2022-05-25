import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";
import MaterialTable, { MTableToolbar } from "material-table";
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import setAuthToken from "../../functions/setAuthToken";
import { useRef, useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import ReactToPrint from "react-to-print";
import { CoatOfArms, KgirsLogo, KogiGov, TccbgImage } from "../Images/Images";
import QRCode from "react-qr-code";


const fields = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "File Ref",
    field: "file_ref",
  },
  {
    title: "KGTIN",
    field: "tp_id",
  },
  {
    title: "Name",
    field: "taxpayer_name",
  },
  {
    title: "Year 1 tax",
    field: "amount1",
  },
  {
    title: "Year 2 tax",
    field: "amount2",
  },
  {
    title: "Year 3 tax",
    field: "amount3",
  },
  {
    title: "Station",
    field: "tax_office",
  },
  {
    title: "Create Time",
    field: "crt_time",
  },
  {
    title: "Status",
    field: "status",
  },
];



export const ViewTccPrintTable = ({ tccdata }) => {
  let items = tccdata;

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const reportRange = [39]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups

  return (
    <>
      <MaterialTable title="Tcc List"
        data={items}
        columns={fields}

        options={{
          search: true,
          paging: true,
          filtering: true,
          rowStyle: (rowData) => {
            if (rowData.status === "Printed") {
              return {
                color: "#5f9f45"
                // backgroundColor: "#156448",
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
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
          Search: Search,
          ThirdStateCheck: Remove,
          Clear: Clear,
          SortArrow: ArrowDownward
        }}

        onRowClick={(event, rowData) => {

          if (userGroup.some(r => reportRange.includes(r))) {
            ''

          }

          else {
            window.open(`/view/listprinttcc/${rowData.id}`, "_self")
            event.stopPropagation();
          }
        }}
      />
    </>
  );
};

export const ViewSingleTccPrintTable = ({ tccUploads, tccID, payerDetails, assessmentData, assessmentData2, assessmentData3 }) => {

  const componentRef = useRef();
  let year2
  let year3

  let basdocurl = 'https://annualuploads.bespoque.dev/rhm/uploads/da/tcc/'
  let picUpload
  let signature
  let fileRef
  let printPrintTime

  tccUploads.forEach((ind, i) => {
    picUpload = ind.passport
  })

  tccUploads.forEach((ind, i) => {
    signature = ind.sign
  })

  payerDetails.forEach((ind, i) => {
    fileRef = ind.ref
  })

  payerDetails.forEach((ind, i) => {
    printPrintTime = ind.aprvPrint_time
  })


  const year1 = assessmentData.map((ind, i) => {
    return ind.year
  })
  const firstYear = String(year1)

  if (assessmentData2 === "" || assessmentData2 === undefined) {
    year2 = ""
  } else {

    year2 = assessmentData2.map((ind, i) => {
      return ind.year
    })

  }

  const secondYear = String(year2)

  if (assessmentData3 === "" || assessmentData3 === undefined) {
    year3 = ""
  } else {

    year3 = assessmentData3.map((ind, i) => {
      return ind.year
    })
  }
  const thirdYear = String(year3)



  // let date = printPrintTime
  // let due_date = new Date(date)
  // due_date.setDate(due_date.getDate() + 365);
  // let expiry = dateformat(due_date, "dd mmm yyyy")

  let Issdate = new Date()
  let Issdue_date = new Date(Issdate)
  let dateIssue = dateformat(Issdue_date, "dd mmm yyyy")


  setAuthToken();
  let ChangePrint = (e) => {
    e.preventDefault()
    let statusObj = {
      id: tccID,
      status: "Printed"
    }
    try {
      let res = axios.post(`${url.BASE_URL}forma/tcc-status`, statusObj);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="m-3 flex justify-end">
        <div onClick={ChangePrint}>
          <ReactToPrint
            // pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
            pageStyle="@page { size: 7.5in 13in  }"
            trigger={() => <button className="btn w-32 bg-green-600 btn-default text-white
            btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Print
            </button>}
            content={() => componentRef.current}
          />
        </div>

      </div>

      <section>
        <div ref={componentRef}>
          <div className="flex justify-around">
            <div>
              {/* <h4 className="flex justify-end text-red-600">ORIGINAL</h4>
              <div className="flex justify-end">
                {payerDetails.map((ind, i) => (
                  <div>
                    <div className="flex">
                      <p>Issue Date:</p>
                      <p className="pl-2">{dateIssue}</p>
                    </div>
                    <div className="flex">
                      <p>TIN/KGTIN:</p>
                      <p className="pl-2">{ind.tp_id}</p>
                    </div>
                    <div className="flex">
                      <p>File Ref:</p>
                      <p className="pl-2">{ind.file_ref}</p>
                    </div>
                  </div>
                ))}
              </div> */}

              {/* <div className="flex justify-end">
                <small>1232333ND23444GH</small>
              </div> */}
              <div className="flex mb-8">
                <KgirsLogo />
                <p className="self-center w-48 font-bold">KOGI STATE INTERNAL REVENUE SERVICE</p>

              </div>

              {/* <div className="flex justify-end">
                <p className="border font-bold p-2 text-center w-64">KGIRS/PAYE/TCC/202202/81</p>
              </div> */}

              {payerDetails.map((ind, i) => (
                <div>
                  <div className="flex justify-between my-3">
                    <div className="flex">
                      <div>
                        <img
                          src={`${basdocurl}${picUpload}`}
                          alt=""
                          className="rounded h-16 w-16"
                        />
                      </div>
                      <div className="self-end ml-2">
                        <img
                          src={`${basdocurl}${signature}`}
                          alt=""
                          className="rounded h-10 w-24"
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <CoatOfArms />
                      <p className="border-r-2 ml-2 border-black h-8 self-center"></p>
                      <KogiGov />
                    </div>
                  </div>
                  <p> <span className="font-bold">1.</span> This is to Verify that <span className="font-bold">{ind.taxpayer_name}</span></p>
                  <div>
                    <p>fully paid his/her Personal Income Tax for the past years, that is: <span>
                      {`${secondYear !== "" ? `${firstYear},` : firstYear} ${thirdYear !== "" ? `${secondYear},` : secondYear} ${thirdYear}`}
                    </span>
                    </p>
                  </div>
                </div>
              ))}
              <div className="my-4">
                <p><span className="font-bold">2.</span> Details of his/her assessments are as follows:</p>
              </div>
              <div className="flex justify-center mb-5">
                {payerDetails.map((ind, i) => (
                  <div>
                    <div>
                      <small className="leading-none block">TCC ID </small>
                      <small className="font-bold">{ind.ref}</small>
                    </div>

                    <div className="mt-1">
                      <small className="leading-none block">TAX ID </small>
                      <small className="font-bold">{ind.tp_id}</small>
                    </div>

                    <div className="mt-1">
                      <small className="leading-none block">DATE OF ISSUE </small>
                      <small className="font-bold">{dateIssue}</small>
                    </div>
                    
                    <div className="mt-1">
                      <small className="leading-none block">Tax OFFICE</small>
                      <small className="font-bold">{ind.tax_office}</small>
                    </div>
                  </div>
                ))}

                <div className="w-10"></div>
                <div>
                  <table className="table divide-y mb-4 striped">
                    <thead >
                      <tr style={{ backgroundColor: "#d3fbc6" }}>
                        <th>
                          Tax Year
                        </th>
                        <th className="">
                          Assessed Income
                        </th>
                        <th className="">
                          Tax Paid
                        </th>
                        <th className="">
                          Assessment Type
                        </th>
                      </tr>
                    </thead>

                    <tbody >
                      {assessmentData === "" || assessmentData === undefined ? "" :
                        <tr>
                          <td className="">
                            {assessmentData.map((ind, i) => (
                              <p className="font-bold">{ind.year}</p>

                            ))}
                          </td>
                          {assessmentData.map((ind, i) => (
                            <td className="">
                              <p className="font-bold"> {formatNumber(Number(ind.employed) + Number(ind.self_employed) + Number(ind.other_income))} </p>
                            </td>
                          ))}

                          <td className="">
                            {assessmentData.map((ind, i) => (
                              <p className="font-bold">{formatNumber(ind.tax)}</p>
                            ))}
                          </td>
                          <td className="">
                            <p>Direct Assessment</p>
                          </td>
                        </tr>
                      }
                      {assessmentData2 === "" || assessmentData2 === undefined ? "" :
                        <tr>
                          <td className="">
                            {assessmentData2.map((ind, i) => (
                              <p className="font-bold">{ind.year}</p>

                            ))}
                          </td>
                          {assessmentData2.map((ind, i) => (
                            <td className="">
                              <p className="font-bold"> {formatNumber(Number(ind.employed) + Number(ind.self_employed) + Number(ind.other_income))} </p>
                            </td>
                          ))}

                          <td className="">
                            {assessmentData2.map((ind, i) => (
                              <p className="font-bold">{formatNumber(ind.tax)}</p>
                            ))}
                          </td>
                          <td className="">
                            <p>Direct Assessment</p>
                          </td>

                        </tr>

                      }
                      {assessmentData3 === "" || assessmentData3 === undefined ? "" :
                        <tr>
                          <td className="">
                            {assessmentData3.map((ind, i) => (
                              <p className="font-bold">{ind.year}</p>

                            ))}
                          </td>
                          {assessmentData3.map((ind, i) => (
                            <td className="">
                              <p className="font-bold"> {formatNumber(Number(ind.employed) + Number(ind.self_employed) + Number(ind.other_income))} </p>
                            </td>
                          ))}

                          <td className="">
                            {assessmentData3.map((ind, i) => (
                              <p className="font-bold">{formatNumber(ind.tax)}</p>
                            ))}
                          </td>
                          <td className="">
                            <p>Direct Assessment</p>
                          </td>

                        </tr>

                      }

                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="mb-2"><span className="font-bold">3.</span> His/her known source(s) of income are: <span>Employment, Trade/Professional</span> </p>
                {/* <p><span className="font-bold">4.</span> This certificate expires on: <span>{expiry}</span> </p> */}
                <p><span className="font-bold">4.</span> This certificate expires on: <span>{dateIssue}</span> </p>
              </div>

              <div className="flex justify-between mt-2">
                <div>
                  <QRCode
                    value={`https://irs.kg.gov.ng/verify/fetch_tcc_test.php?ref=${fileRef}`}
                    size={120}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col">
                    <hr />
                    <p className="font-bold text-center">Sule Salihu Enehe</p>
                    <p className="font-bold text-center">Ag. Executive Chairman</p>
                  </div>
                </div>
              </div>

            </div>

          </div>


        </div>

      </section>

    </>
  );
};