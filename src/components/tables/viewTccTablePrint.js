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
    // render: rowData => {
    //   return (
    //     rowData.status == "Draft" ? <p style={{ color: "#E87722", fontWeight: "bold" }}>{rowData.status}</p> :
    //       rowData.status == "SUCCESS" ? <p style={{ color: "#008240", fontWeight: "bold" }}>{rowData.status}</p> :
    //         <p style={{ color: "#B0B700", fontWeight: "bold" }}>{rowData.status}</p>
    //   )
    // }
  }
];



export const ViewTccPrintTable = ({ tccdata }) => {
  let items = tccdata;
  return (
    <>
      <MaterialTable title="Tcc List"
        data={items}
        columns={fields}

        options={{
          search: true,
          paging: true,
          filtering: true,
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
          window.open(`/view/listprinttcc/${rowData.id}`, "_self")
          event.stopPropagation();
        }}
      />
    </>
  );
};

export const ViewSingleTccPrintTable = ({ tccID, payerDetails, assessmentData, assessmentData2, assessmentData3 }) => {
  const componentRef = useRef();
  let year2
  let year3

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

  console.log("firstYear", firstYear);
  console.log("year2", secondYear);
  console.log("year3", thirdYear);

  let date = new Date()
  let due_date = new Date(date)
  due_date.setDate(due_date.getDate() + 365);
  let expiry = dateformat(due_date, "dd mmm yyyy")

  let Issdate = new Date()
  let Issdue_date = new Date(Issdate)
  let dateIssue = dateformat(Issdue_date, "dd mmm yyyy")


  let ChangePrint = async (e) => {
    e.preventDefault()
    // setIsFetching3(true)
    let statusObj = {
      assessment_id: globalAssId,
      status: "Printed",
    }
    try {
      let res = await axios.put(`${url.BASE_URL}forma/set-status`, statusObj);
      // setIsFetching3(false)
      console.log("successful!");
      // router.push('/view/listverifiedboj')
    } catch (error) {
      // toast.error("Failed!");
      console.log(error);
      // setIsFetching3(false)
    }
  }


  return (
    <>
      <div className="m-3 flex justify-end">
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
      <Widget >
        <div ref={componentRef}>

          <div className="p-16">
            <h4 className="flex justify-end text-red-600">ORIGINAL</h4>
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
            </div>
            {payerDetails.map((ind, i) => (
              <div>
                <p>This is to Verify that <span className="font-bold">{ind.taxpayer_name}</span></p>
                <div>
                  {/* <p>fully paid his/her Personal Income Tax for the past years, that is: <span>{`${secondYear === "" || secondYear === undefined ? firstYear : firstYear`,`} ${thirdYear === "" || thirdYear === undefined ? secondYear : secondYear`,`} ${thirdYear}`}</span></p> */}
                  <p>fully paid his/her Personal Income Tax for the past years, that is: <span>
                    {`${secondYear !== "" ? `${firstYear},` : firstYear} ${thirdYear !== "" ? `${secondYear},` : secondYear} ${thirdYear}`}
                  </span>
                  </p>


                  {/* {secondYear === "" && secondYear === "" ?

                <p>fully paid his/her Personal Income Tax for the past years, that is: <span>{`${firstYear} ${secondYear} ${thirdYear}`}</span></p>
                : ""
              }

              {secondYear !== "" && secondYear === "" ?

                <p>fully paid his/her Personal Income Tax for the past years, that is: <span>{`${firstYear}, ${secondYear} ${thirdYear}`}</span></p>
                : ""
              }

              {secondYear === "" && secondYear !== "" ?

                <p>fully paid his/her Personal Income Tax for the past years, that is: <span>{`${firstYear}, ${secondYear} ${thirdYear}`}</span></p>
                : ""
              } */}
                </div>
              </div>
            ))}
            <div className="my-4">
              <p>Details of his/her assessments are as follows:</p>
            </div>

            <div className="flex justify-center">
              <div>
                <table className="table divide-y mb-4">
                  <thead>
                    <tr>
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

                  <tbody>
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
              <p>His/her known source(s) of income are: <span>Employment, Trade/Professional</span> </p>
              <p>This certificate expires on: <span>{expiry}</span> </p>
            </div>

            <div className="flex justify-between">
              {payerDetails.map((ind, i) => (
                <p className="mt-4">Tax Office {ind.tax_office}</p>
              ))}
              <div className="flex justify-between mt-4">
                <div className="flex flex-col">
                  <hr />
                  <p className="font-bold text-center">Sule Salihu Enehe</p>
                  <p className="font-bold text-center">Ag. Executive Chairman</p>
                </div>
              </div>
            </div>

          </div>

          <div className="p-16">
            <h4 className="flex justify-end">DUPLICATE</h4>
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
            </div>
            {payerDetails.map((ind, i) => (
              <div>
                <p>This is to Verify that <span className="font-bold">{ind.taxpayer_name}</span></p>
                <div>
                  {/* <p>fully paid his/her Personal Income Tax for the past years, that is: <span>{`${secondYear == "" ? firstYear : firstYear`,`} ${thirdYear == "" ? secondYear : secondYear`,`} ${thirdYear}`}</span></p> */}
                  <p>fully paid his/her Personal Income Tax for the past years, that is: <span>
                    {`${secondYear !== "" ? `${firstYear},` : firstYear} ${thirdYear !== "" ? `${secondYear},` : secondYear} ${thirdYear}`}
                  </span>
                  </p>


                  {/* {secondYear === "" && secondYear === "" ?

                <p>fully paid his/her Personal Income Tax for the past years, that is: <span>{`${firstYear} ${secondYear} ${thirdYear}`}</span></p>
                : ""
              }

              {secondYear !== "" && secondYear === "" ?

                <p>fully paid his/her Personal Income Tax for the past years, that is: <span>{`${firstYear}, ${secondYear} ${thirdYear}`}</span></p>
                : ""
              }

              {secondYear === "" && secondYear !== "" ?

                <p>fully paid his/her Personal Income Tax for the past years, that is: <span>{`${firstYear}, ${secondYear} ${thirdYear}`}</span></p>
                : ""
              } */}
                </div>
              </div>
            ))}
            <div className="my-4">
              <p>Details of his/her assessments are as follows:</p>
            </div>

            <div className="flex justify-center">
              <div>
                <table className="table divide-y mb-4">
                  <thead>
                    <tr>
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

                  <tbody>
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
              <p>His/her known source(s) of income are: <span>Employment, Trade/Professional</span> </p>
              <p>This certificate expires on: <span>{expiry}</span> </p>
            </div>

            <div className="flex justify-between">
              {payerDetails.map((ind, i) => (
                <p className="mt-4">Tax Office {ind.tax_office}</p>
              ))}
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
      </Widget>
    </>
  );
};