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
import { CoatOfArms, KgirsLogo, KogiGov, Signature, TccbgImage } from "../Images/Images";
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
    field: "taxYr_1",
  },
  {
    title: "Year 2 tax",
    field: "taxYr_2",
  },
  {
    title: "Year 3 tax",
    field: "taxYr_3",
  },
  {
    title: "Station",
    field: "tax_station",
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



export const ViewPayeTccTablePrint = ({ tccdata }) => {
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
            window.open(`/view/listpayetcc/${rowData.id}`, "_self")
            event.stopPropagation();
          }
        }}
      />
    </>
  );
};

export const ViewSinglePayeTccPrintTable = ({
  tccID,
  PayeTccData
}) => {


  const componentRef = useRef();


  let basdocurl = 'https://annualuploads.bespoque.dev/rhm-live/uploads/da/tcc/'
  let picUpload
  let signature
 
  let printPrintTime


  PayeTccData.forEach((ind, i) => {
    picUpload = ind.passport.data
  })
  PayeTccData.forEach((ind, i) => {
    signature = ind.signature.data
  })

  console.log("PayeTccData", PayeTccData);
  console.log("picUpload", picUpload);

  // const base64StringPic = btoa(String.fromCharCode((picUpload)));
  const base64StringPic = Buffer.from(picUpload).toString('base64')

  PayeTccData.forEach((ind, i) => {
    printPrintTime = ind.aprvPrint_time
  })

  if (printPrintTime === undefined) {
    printPrintTime = new Date()
  } else {
    printPrintTime = printPrintTime
  }


  let date = printPrintTime
  let due_date = new Date(date)
  due_date.setDate(due_date.getDate() + 365);
  let expiry = dateformat(due_date, "dd mmm yyyy")

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
      {PayeTccData.map((ind, i) => (

        <section>
          <div ref={componentRef}>
            <div className="flex justify-around">
              <div>

                <div className="flex mb-8">
                  <KgirsLogo />
                  <p className="self-center w-48 font-bold">KOGI STATE INTERNAL REVENUE SERVICE</p>

                </div>


                <div className="flex justify-end">
                  <p className="border font-bold p-2 text-center w-64">{`File No - ${ind.file_ref}`}</p>
                </div>



                <div>
                  <div className="flex justify-between my-3">
                    <div className="flex">
                      <div>
                        <img
                          src={`data:image/png;base64,${base64StringPic}`}
                          alt=""
                          className="rounded h-16 w-16"
                        />
                      </div>
                      <div className="self-end ml-2">
                        <img
                          // src={`data:image/png;base64,${base64StringPic}`}
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
                      {`${ind.assmtYr_2 !== "" ? `${ind.assmtYr_1},` : ind.assmtYr_1} ${ind.assmtYr_3 !== "" ? `${ind.assmtYr_2},` : ind.assmtYr_2} ${ind.assmtYr_3}`}
                    </span>
                    </p>
                  </div>
                </div>

                <div className="my-4">
                  <p><span className="font-bold">2.</span> Details of his/her assessments are as follows:</p>
                </div>
                <div className="flex justify-center mb-5">

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
                      <small className="font-bold">{ind.tax_station}</small>
                    </div>
                  </div>


                  <div className="w-10"></div>
                  <div>
                    <table className="table divide-y mb-4 striped">
                      <thead >
                        <tr style={{ backgroundColor: "#d3fbc6" }}>
                          <th>
                            TCC REF
                          </th>
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
                        {ind.taxYr_1 === "" || ind.taxYr_1 === null ? "" :
                          <tr>
                            <td className="">
                              <p className="font-bold">{ind.ref}</p>
                            </td>
                            <td className="">
                              <p className="font-bold">{ind.assmtYr_1}</p>
                            </td>
                            <td className="">
                              <p className="font-bold"> {formatNumber(ind.incYr_1)} </p>
                            </td>
                            <td className="">
                              <p className="font-bold">{formatNumber(ind.taxYr_1)}</p>
                            </td>
                            <td className="">
                              <p>Direct Assessment</p>
                            </td>
                          </tr>
                        }
                        {ind.taxYr_2 === "" || ind.taxYr_2 === null ? "" :
                          <tr>
                            <td className="">
                              <p className="font-bold">{ind.ref}</p>
                            </td>
                            <td className="">
                              <p className="font-bold">{ind.assmtYr_2}</p>
                            </td>
                            <td className="">
                              <p className="font-bold"> {formatNumber(ind.incYr_2)} </p>
                            </td>
                            <td className="">
                              <p className="font-bold">{formatNumber(ind.taxYr_2)}</p>
                            </td>
                            <td className="">
                              <p>Direct Assessment</p>
                            </td>

                          </tr>

                        }
                        {ind.taxYr_3 === "" === "" || ind.taxYr_3 === null ? "" :
                          <tr>
                            <td className="">
                              <p className="font-bold">{ind.ref}</p>
                            </td>
                            <td className="">
                              <p className="font-bold">{ind.assmtYr_3}</p>
                            </td>
                            <td className="">
                              <p className="font-bold"> {formatNumber(ind.incYr_3)} </p>
                            </td>
                            <td className="">
                              <p className="font-bold">{formatNumber(ind.taxYr_2)}</p>
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
                  <p><span className="font-bold">4.</span> This certificate expires on: <span>{expiry}</span> </p>
                </div>




                <div className="flex justify-between mt-2">
                  <div>
                    <QRCode
                      value={`https://irs.kg.gov.ng/verify/fetch_tcc.php?ref=${ind.ref}`}
                      size={120}
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-col">
                      <Signature />
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
      ))}
    </>
  );
};