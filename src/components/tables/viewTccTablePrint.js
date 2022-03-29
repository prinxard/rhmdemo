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
import { useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";

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
          window.open(`/view/listprinttcc/${rowData.id}`)
          event.stopPropagation();
        }}
      />
    </>
  );
};

export const ViewSingleTccPrintTable = ({ tccID, payerDetails, assessmentData, assessmentData2, assessmentData3 }) => {
  console.log(payerDetails);
  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const TCCStatus = payerDetails.map((data, i) => {
    let stat = data.status
    return stat
  })
  const statusTCC = String(TCCStatus)
  // console.log(statusTCC);

  const admin = [1]
  const Approval = [2, 3, 12, 1]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups

  return (
    <>
      <Widget>
        <h4 className="flex justify-end">ORIGINAL</h4>
        <div className="flex justify-end">
          <div>
            <div className="flex">
              <p>Issue Date:</p>
              <p className="pl-2">Date</p>
            </div>
            <div className="flex">
              <p>TIN/KGTIN:</p>
              <p className="pl-2">KGTIN</p>
            </div>
            <div className="flex">
              <p>File Ref:</p>
              <p className="pl-2">file ref</p>
            </div>
          </div>
        </div>
        <div>
          <p>This is to Verify that KINRIN , GBENGA ABRAHAM</p>
          <p>of KOREDE QUARTERS</p>
          <p>fully paid his/her Personal Income Tax for the past three years, that is: 2016, 2017, 2019</p>
        </div>
        <div className="mt-3">
          <p>Details of his/her assessments are as follows:</p>
        </div>
        <div className="flex justify-center">
          <table class="table-auto">
            <thead >
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};