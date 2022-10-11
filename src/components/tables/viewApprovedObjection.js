
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import dateformat from "dateformat";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from "jsonwebtoken";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
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
import { FiCheck } from "react-icons/fi";
import { FormatMoneyComponentReport } from "../FormInput/formInputs";
import ReactToPrint from "react-to-print";

const fields = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "Assesment Id",
    field: "assessment_id",
  },
  {
    title: "Year",
    field: "year",
  },
  {
    title: "KGTIN",
    field: "kgtin",
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Income",
    field: "income",
  },

  {
    title: "Proposed Tax",
    field: "tax",
  },
  {
    title: "Status",
    field: "status",
  },


  {
    title: "Created Time",
    field: "createtime",
  },

];

export const ViewApprovedObjectionTable = ({ submittedData }) => {
  let items = submittedData;

  const { auth } = useSelector(
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
      <MaterialTable title="Approved Objection List"
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
          if (userGroup.some(r => reportRange.includes(r))) {
            ''
          } else {
            window.open(`/view/objection/approved/${rowData.assessment_id}_${rowData.kgtin}`, "_self")
            event.stopPropagation();
          }
        }}
      />
    </>
  );
};

export const ViewApprovedObjectionSingle = ({ objectionData, ref, objNotice, assessmentId, createdTime, taxpayerTax, recommendedTax }) => {
  const router = useRouter();
  const componentRef = useRef();
  console.log("objectionData", objectionData);

  console.log("noticeStatus", objNotice);
  let today = new Date().toJSON().slice(0, 10);

  return (
    <>

      <div className="m-3 flex justify-end">
        <div>
          <ReactToPrint
            pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
            // pageStyle="@page { size: 7.5in 13in  }"
            trigger={() => <button 
              type="submit"
            >
              Print
            </button>}
            content={() => componentRef.current}
          />
        </div>

      </div>

      <div>
        {objNotice === null ? "no status"
          :
          <div ref={componentRef}>
            <div>
              {objNotice === "undertaxed" ?
                <div className="text-justify text-base max-w-prose" style={{ maxWidth: "800px" }} >
                  <p> {today} </p>
                  <p>{assessmentId}</p>
                  <p>Sir/Ma</p>
                  <p className="font-bold">Re: Underassessed Objection</p>
                  <p>The above Subject refers <span></span></p><br />
                  <p>
                    We acknowledge the receipt of your letter
                    <span className="font-bold"> {dateformat(createdTime, "yyyy-mm-dd")} </span>
                    in respect to the objection of your Direct Assessment
                  </p>
                  <br />
                  <p>
                    We have reviewed your letter of complaint and objection along with
                    your previous tax records with Kogi State Internal Revenue Service.
                    The Management have looked at the reasonability of your objection
                    and revised your assessment to <span className="font-bold">₦ {formatNumber(recommendedTax)} </span>
                    Instead of Quote assessment amount <span className="font-bold"> ₦ {formatNumber(taxpayerTax)} </span>
                  </p><br />
                  <p>
                    Please Take Note that you have been previously under assessed, but
                    Management has waived recovery of such moneys as stipulated in
                    section 52[1] of PITA 2011 as amended.
                  </p><br />
                  <p>
                    You are by this expected to make payments to any Kogi State Internal
                    Revenue Service Designated banks. Please accept the assurance of our
                    highest regards.
                  </p>
                  <br />
                  <p>
                    Yours Faithfully.
                  </p>
                  For: <span className="font-bold">KOGI STATE INTERNAL REVENUE SERVICE </span>
                  <p className="font-bold">Sule Salihu Enehe</p>
                  Acting Executive Chairman

                </div>
                :
                <div>
                  {objNotice === "no_PITA" ?
                    <div className="text-justify text-base max-w-prose" style={{ maxWidth: "800px" }}>
                      <p> {today} </p>
                      <p>{assessmentId}</p>
                      <p>Sir/Ma</p>
                      <p className="font-bold">Re: Downward Review Without PITA</p>
                      <p>The above Subject refers <span></span></p><br />
                      <p>
                        We acknowledge the receipt of your letter
                        <span className="font-bold"> {dateformat(createdTime, "yyyy-mm-dd")} </span>
                        in respect to the objection of your Direct Assessment
                      </p>
                      <br />
                      <p>
                        We have reviewed your letter of complaint and objection along with
                        your previous tax records with Kogi State Internal Revenue Service.
                        The Management have looked at the reasonability of your objection
                        and revised your assessment to <span className="font-bold">₦ {formatNumber(recommendedTax)} </span>
                        Instead of Quote assessment amount <span className="font-bold"> ₦ {formatNumber(taxpayerTax)} </span>
                      </p><br />
                      <p>
                        You are by this expected to make payments to any Kogi State Internal
                        Revenue Service Designated banks. Please accept the assurance of our
                        highest regards.
                      </p>
                      <br />
                      <p>
                        Yours Faithfully.
                      </p>
                      For: <span className="font-bold">KOGI STATE INTERNAL REVENUE SERVICE </span>
                      <p className="font-bold">Sule Salihu Enehe</p>
                      Acting Executive Chairman

                    </div>
                    :
                    <div>
                      {objNotice === "PITA" ?
                        <div className="text-justify text-base max-w-prose" style={{ maxWidth: "800px" }}>
                          <p> {today} </p>
                          <p>{assessmentId}</p>
                          <p>Sir/Ma</p>
                          <p className="font-bold">Re: Downward Review With PITA</p>
                          <p>The above Subject refers <span></span></p><br />
                          <p>
                            We acknowledge the receipt of your letter
                            <span className="font-bold"> {dateformat(createdTime, "yyyy-mm-dd")} </span>
                            in respect to the objection of your Direct Assessment
                          </p>
                          <br />
                          <p>
                            We have reviewed your letter of objection in line with section 24[A] of
                            PITA 2011 as amended.
                            The Management have looked at the reasonability of your objection
                            and revised your assessment to <span className="font-bold">₦ {formatNumber(recommendedTax)} </span>
                            Instead of Quote assessment amount <span className="font-bold"> ₦ {formatNumber(taxpayerTax)} </span>
                          </p><br />
                          <p>
                            You are by this expected to make payments to any Kogi State Internal
                            Revenue Service Designated banks. Please accept the assurance of our
                            highest regards.
                          </p>
                          <br />
                          <p>
                            Yours Faithfully.
                          </p>
                          For: <span className="font-bold">KOGI STATE INTERNAL REVENUE SERVICE </span>
                          <p className="font-bold">Sule Salihu Enehe</p>
                          Acting Executive Chairman

                        </div> : ""
                      }
                    </div>
                  }

                </div>
              }
            </div>
          </div>
        }
      </div>
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