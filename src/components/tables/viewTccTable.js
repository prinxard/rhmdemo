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



export const ViewTccTable = ({ tccdata }) => {
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
          window.open(`/view/listtcc/${rowData.id}`)
          event.stopPropagation();
        }}
      />
    </>
  );
};

export const ViewSingleTccTable = ({ tccID, payerDetails, assessmentData, assessmentData2, assessmentData3 }) => {
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
        <div>
          <div className="mb-6 flex justify-between">

            <form className=" mr-3">
              <button
                className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                <Link href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
              </button>
            </form>

            {userGroup.some(r => admin.includes(r)) ?
              <div className="flex">
                <div>
                  {statusTCC === "Approved" ?
                    <form className="mr-3 hidden">
                      <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Approve
                      </button>
                    </form> :
                    <form className=" mr-3">
                      <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Approve
                      </button>
                    </form>
                  }
                </div>
                <div>
                  {statusTCC === "Declined" ?
                    <form className="mr-3 hidden">
                      <button
                        className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Decline
                      </button>
                    </form> :
                    <form className=" mr-3">
                      <button
                        className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Decline
                      </button>
                    </form>
                  }
                </div>

                <div>
                  {statusTCC === "Verified" ?
                    <form className="mr-3 hidden">
                      <button
                        className="btn bg-purple-400 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Verify
                      </button>
                    </form> :
                    <form className=" mr-3">
                      <button
                        className="btn bg-purple-400 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Verify
                      </button>
                    </form>
                  }
                </div>

                <div>
                  {statusTCC === "AuditChecked" ?
                    <form className="mr-3 hidden">
                      <button
                        className="btn bg-green-400  mr-3 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Audit Check
                      </button>
                    </form> :
                    <form className=" mr-3">
                      <button
                        className="btn bg-green-400  mr-3 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Audit Check
                      </button>
                    </form>
                  }
                </div>

                <div>
                  {statusTCC === "AuditChecked" ?
                    <form className="mr-3 hidden">
                      <button
                        className="btn mr-3 bg-blue-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Aprrove Print
                      </button>
                    </form> :
                    <form className=" mr-3">
                      <button
                        className="btn mr-3 bg-blue-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Aprrove Print
                      </button>
                    </form>
                  }
                </div>

              </div>
              :
              <div>
                {userGroup.some(r => Approval.includes(r)) ?
                  <div className="flex">
                    <div>
                      {statusTCC === "Approved" ?
                        <form className="mr-3 hidden">
                          <button
                            className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                          >
                            Approve
                          </button>
                        </form> :
                        <form className=" mr-3">
                          <button
                            className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                          >
                            Approve
                          </button>
                        </form>
                      }
                    </div>
                    <div>
                      {statusTCC === "Declined" ?
                        <form className="mr-3 hidden">
                          <button
                            className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                          >
                            Decline
                          </button>
                        </form> :
                        <form className=" mr-3">
                          <button
                            className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                          >
                            Decline
                          </button>
                        </form>
                      }
                    </div>
                  </div> : ""
                }
              </div>
            }
          </div>

          <div className="flex border mb-3 block p-3 rounded-lg bg-white w-full">

            <div className="">

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label>Taxpayer:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly name="taxpayername" type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="taxpayername" readOnly type="text" defaultValue={ind.taxpayer_name} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label>KGTIN:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly name="tp_id" type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="tp_id" readOnly type="text" defaultValue={ind.tp_id} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label>File no:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly name="tp_id" type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input readOnly type="text" defaultValue={ind.file_ref} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label htmlFor="employername">Tax Office:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="tax_office" readOnly type="text" defaultValue={ind.tax_office} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Processing Fee:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="tax_office" readOnly type="text" defaultValue={formatNumber(ind.prc_fee)} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>

          <div className={`flex justify-between border mb-3 rounded-lg bg-white w-full`}>

            <div className="p-3">
              <h6 className="text-right mb-6">Year 1</h6>
              <div className="mb-6 grid grid-cols-2 ">
                <label>Assessment year </label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input readOnly type="text" />
                  :
                  <div>

                    {assessmentData.map((ind, i) => (
                      <input readOnly type="text" defaultValue={ind.year} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Tax Payable </label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input readOnly className="form-control w-full rounded" type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} type="text"
                      />
                    ))}

                  </div>
                }

              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Income from employment</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Income from Trade/Professional</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Other Income</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Assessment ID</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="assmt_1" className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>
            </div>

            <div className="p-3 grid justify-items-stretch">
              <h6 className="text-center mb-6">Year 2</h6>
              <div className="mb-6 justify-self-center">
                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.year)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>
              <div className="mb-6 justify-self-center">
                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>


              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_2" type="text" />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="assmt_2" className="form-control w-full rounded" key={i} defaultValue={ele.assessment_id} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

            </div>

            <div className="p-3 grid justify-items-stretch">
              <h6 className="text-center mb-6">Year 3</h6>
              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.year)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>
              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_3" type="text" />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="assmt_3" className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Widget>
    </>
  );
};