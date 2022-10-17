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
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Delete, Edit, MoreHoriz } from "@material-ui/icons";

const fields = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "Org KGTIN",
    field: "org_id",
  },
  {
    title: "Emp KGTIN",
    field: "paye_tp",
  },
  {
    title: "Salary",
    field: "basic",
    render: (basic) => formatNumber(basic.basic)
  },
  {
    title: "Start Date",
    field: "sdate",
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Status",
    field: "status",
  },
  {
    title: "Create Time",
    field: "insert_time",
  }
];



export const ViewPayslipTable = ({ tccdata }) => {
  let items = tccdata;
  const router = useRouter()
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
      <MaterialTable title="Payslip List"
        data={items}
        columns={fields}

        actions={
          [

            {
              icon: MoreHoriz,
              tooltip: 'View',
              onClick: (event, rowData) => router.push(`/view/payslip/${rowData.id}`),

            },
            {
              icon: Edit,
              tooltip: 'Edit',
              onClick: (event, rowData) => router.push(`/markets/agents/register/${rowData.user}`),

            },
            {
              icon: Delete,
              tooltip: 'Delete',
              onClick: (event, rowData) => router.push(`/markets/agents/fund/${rowData.user}`),

            }
          ]}

        options={{
          search: true,
          paging: true,
          filtering: true,
          actionsColumnIndex: -1,
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

      // onRowClick={(event, rowData) => {

      //   window.open(`/view/payslip/${rowData.id}`, "_self")
      //   event.stopPropagation();
      //   // if (userGroup.some(r => reportRange.includes(r))) {
      //   //   ''

      //   // } else {

      //   //   window.open(`/view/listtcc/${rowData.id}`, "_self")
      //   //   event.stopPropagation();
      //   // }
      // }}
      />
    </>
  );
};

export const ViewSinglePayslip = ({ paySlipData }) => {
  return (
    <>
      {paySlipData.map((data) => (
        <form className="border mb-3 block p-6 rounded-lg bg-white w-full">
          <div className="flex gap-2 justify-center ">

            <div className="grid grid-cols-2 gap-4 w-1/2 border-r pr-3">

              <div className="form-group">
                <p>Organization/Employer </p>
                <input name="org_id" value={data.org_id} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group ">
                <p>Taxpayer/Employee </p>
                <input name="paye_tp" value={data.paye_tp} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group ">
                <p>Start date </p>
                <input name="sdate" value={data.sdate} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group">
                <p>End date</p>
                <input name="edate" value={data.edate} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group">
                <p>Annual Salary</p>
                <input name="edate" value={formatNumber(data.basic)} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group ">
                <p>Tax office</p>
                <input name="tax_office" value={data.tax_office} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 content-start">

              <div className="form-group ">
                <p>Rank/G-Level</p>
                <input name="rank" value={data.rank} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group">
                <p>Other Allowance</p>
                <input name="other_allw" value={data.other_allw} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group mb-4">
                <p>Pension</p>
                <input name="pension" value={data.pension} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group mb-4">
                <p>National Housing Fund</p>
                <input name="nhf" value={data.nhf} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group">
                <p>Benefits</p>
                <input name="benefits" value={data.benefits} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>
              <div className="form-group">
                <p>Life Assurance Policy</p>
                <input name="lap" value={data.lap} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                />
              </div>
            </div>
          </div>
        </form>

      ))}
    </>
  )
};