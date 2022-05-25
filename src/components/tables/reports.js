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

export const StartReportView = () => {


  return (
    <>
      <div className="border mb-3 block p-6 rounded-lg bg-white w-full">
        <form>
          <div className="grid grid-cols-3 gap-4 place-items-center">
            <div className="form-group mb-6">
              <label className="" htmlFor="kgtin"> Taxpayer ID</label>
              <input type="text" className="form-control w-full rounded font-light text-gray-500" />
            </div>

            <div className="form-group mb-6">
              <label className="" htmlFor="kgtin"> Assessment ID</label>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
              />
            </div>

            <div className="form-group mb-6">
              <label className="" htmlFor="kgtin"> Reference ID</label>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
              />
            </div>

          </div>
          <div className="flex justify-center">

            <div className="grid grid-cols-4 gap-4 place-items-center">
              <div className="self-center justify-self-center font-bold mb-6">
                <p>Amount</p>
              </div>

              <div className="form-group mb-6">
                <p className="text-center">Start Amount</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group mb-6">
                <p className="text-center">End Amount</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-4 place-items-center">
              <div className="justify-self-center font-bold mb-6">
                <p>Date</p>
              </div>

              <div className="form-group mb-6">
                <p className="text-center">Start Date</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="form-group mb-6">
                <p className="text-center">End Date</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-4 place-items-center">
              <div className="justify-self-center mb-6 font-bold">
                <p>Revenue Item</p>
              </div>

              <div className="form-group ">
                <p className="text-center">Select Revenue Item</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>
              <div className="form-group ">
                <p className="text-center">Payment Channel</p>
                <input type="text" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-end my-4">
            <div className="grid grid-cols-2 gap-4 justify-self-center">
              <div className="form-group">
                <button className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>





      </div>



    </>
  );
};