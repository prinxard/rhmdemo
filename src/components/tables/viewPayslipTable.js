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
import url from '../../config/url';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Delete, Edit, MoreHoriz, WarningRounded } from "@material-ui/icons";
import Loader from "react-loader-spinner";

const fields = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "Organization",
    field: "orgName",
  },
  {
    title: "Employee",
    field: "tpName",
  },
  {
    title: "Gross Salary",
    field: "basic",
    render: (basic) => formatNumber(basic.basic)
  },
  {
    title: "Tax",
    field: "tax",
    render: (tax) => formatNumber(tax.tax)
  },
  {
    title: "Consolidated Relief",
    field: "consolidated_relief",
    render: (rel) => formatNumber(rel.consolidated_relief)
  },
  {
    title: "Year",
    field: "payroll_year",
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },

  {
    title: "Create Time",
    field: "insert_time",
  }
];



export const ViewPayslipTable = ({ tccdata }) => {
  let items = tccdata;
  const [modal, setModal] = useState(false);
  const [payslipId, setPayslipId] = useState("");
  const [isFetching, setIsFetching] = useState(() => false);

  const router = useRouter()
  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const toggleModal = () => {
    setModal(!modal);
  };

  const DeleteAssessment = async (data) => {
    data.preventDefault()
    setIsFetching(true)
    try {
      await axios.delete(`${url.BASE_URL}paye/payslip?id=${payslipId}`)
      setIsFetching(false)
      toast.success("Deleted Successfully!");
      window.location.reload()
    } catch (error) {
      setIsFetching(false)
      if (error) {
        toast.error(error.response.data.message)
      } else {

      }
    }
  };

  return (
    <>
      <ToastContainer />
      {modal && (
        <div className="modal">
          <div className="modal-content" width="300">
            <form onSubmit={DeleteAssessment}>
              <div className="flex justify-center">
                <WarningRounded
                  size={15}
                  className="text-yellow-400"
                />
              </div>
              <p>Are you sure you want to delete?</p>
              <div className="mt-2 flex justify-between">
                <button onClick={toggleModal}
                  className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Cancel
                </button>
                <div>

                </div>
                <button
                  className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Continue
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

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
      <MaterialTable title="Income List"
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
              onClick: (event, rowData) => router.push(`/view/payslip/edit/${rowData.id}`),

            },
            {
              icon: Delete,
              tooltip: 'Delete',
              onClick: (event, rowData) => {
                event.preventDefault()
                setPayslipId(rowData.id)
                setModal(true)
              },

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

      <style
        jsx>{
          `
        body.active-modal {
          overflow-y: hidden;
      }
      
      // .btn-modal {
      //     padding: 10px 20px;
      //     display: block;
      //     margin: 100px auto 0;
      //     font-size: 18px;
      // }
      
      .modal, .overlay {
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: fixed;
      }
      
      .overlay {
          background: rgba(49,49,49,0.8);
      }
      .modal-content {
          position: absolute;
          top: 20%;
          left: 60%;
          transform: translate(-50%, -50%);
          line-height: 1.4;
          background: #f1f1f1;
          padding: 14px 28px;
          border-radius: 3px;
          max-width: 400px;
          min-width: 300px;
      }
      
      .close-modal {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 7px;
      }
        `
        }
      </style>
    </>
  );
};

export const ViewSinglePayslip = ({ paySlipData }) => {
  return (
    <>
      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>
      {paySlipData.map((data) => (
        <div>
          <div class="mt-10 sm:mt-0">
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Employment Details</h3>
                </div>
              </div>
              <div class="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST">
                  <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                      <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                          <label for="first-name" class="block text-sm font-medium text-gray-700">Organization/Employer</label>
                          <input type="text"  readOnly defaultValue={data.orgName}  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Taxpayer/Employee</label>
                          <input type="text"  readOnly defaultValue={data.tpName} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Year </label>
                          <input type="text" readOnly defaultValue={data.payroll_year} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="first-name" class="block text-sm font-medium text-gray-700">Number of months</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.no_months)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Gross Income</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.basic)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Rank/G-Level</label>
                          <input type="text" readOnly defaultValue={data.rank} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                      </div>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
          </div>

          <div class="mt-10 sm:mt-0">
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Other Details</h3>
                </div>
              </div>
              <div class="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST">
                  <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                      <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                          <label for="first-name" class="block text-sm font-medium text-gray-700">Tax</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.tax)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Consolidated Relief</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.consolidated_relief)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="first-name" class="block text-sm font-medium text-gray-700">Tax Office</label>
                          <input type="text" readOnly defaultValue={data.tax_office} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Pension</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.pension)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">National Housing Fund (NHF)</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.nhf)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="first-name" class="block text-sm font-medium text-gray-700">Life Assurance (LAP)</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.lap)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Leave Allowance</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.leave_allw)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Transport Allowance</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.trans_allw)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Other Allowance</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.other_allw)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Housing Allowance</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.housing)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Utilities</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.utilities)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Upfront</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.upfront)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Thirteenth Month</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.month_13)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="last-name" class="block text-sm font-medium text-gray-700">Benefits</label>
                          <input type="text" readOnly defaultValue={formatNumber(data.benefits)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
};