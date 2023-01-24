import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import dateformat from "dateformat";
import { useRef } from "react";
import { useRouter } from "next/router";
import 'react-toastify/dist/ReactToastify.css';
import jwt from "jsonwebtoken";
import { useSelector, shallowEqual } from "react-redux";
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
import ReactToPrint from "react-to-print";
import { ToWords } from 'to-words';
import { SignatureCol } from "../Images/Images";

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

export const ViewApprovedObjectionSingle = ({ tpKgtin, objectionData, year, payerAddr, payerName, DATax, objNotice, assessmentId, createdTime, recommendedTax }) => {
  const router = useRouter();
  const componentRef = useRef();

  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  let today = new Date().toLocaleDateString('en-us', options);
  let timeCreated = new Date(createdTime).toDateString()


  return (
    <>

      <div className="m-3 flex justify-end">
        <div>
          <ReactToPrint
            pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
            // pageStyle="@page { size: 7.5in 13in  }"
            trigger={() => <button
              type="submit" className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
            >
              Print
            </button>}
            content={() => componentRef.current}
          />
        </div>

      </div>

      <div className="mt-16">
        {objNotice === null ? "Objection type not available"
          :
          <div ref={componentRef} className="p-4 mt-5">
            <div className="flex justify-center">
              {objNotice === "undertaxed" ?
                <div className="text-justify text-base max-w-prose"  >
                  <p className="flex justify-between mb-3"> <span className="font-bold">{objectionData.file_ref}</span> {today}  </p>
                  <p>{payerName}</p>
                  <p>{tpKgtin}</p>
                  <p className="w-64">{payerAddr}</p>
                  <p>Sir/Ma</p><br />

                  <div>
                    <p className="font-bold">RE: {objectionData.grounds}</p><br />
                  </div>

                  <p>The above Subject refers;</p>
                  <p>
                    We acknowledge the receipt of your letter dated
                    <span className="font-bold"> {timeCreated}, </span>
                    in respect to the objection of your Direct Assessment
                  </p>
                  <br />
                  <p>
                    We have reviewed your letter of complaint and objection along with
                    your previous tax records with Kogi State Internal Revenue Service.
                    The Management has looked at the reasonability of your objection
                    and revised your assessment to <span className="font-bold">₦{formatNumber(recommendedTax)}  </span>
                    Instead of <span className="font-bold"> ₦{formatNumber(DATax)} </span>
                  </p><br />
                  <p>
                    Please Take Note that you have been previously under assessed, but
                    Management has waived recovery of such moneys as stipulated in
                    section 52[1] of PITA 2011 as amended.
                  </p><br />

                  <p>
                    You are by this expected to make payments to any Kogi State Internal
                    Revenue Service designated banks using the Assessment ID <span className="font-bold">{assessmentId}</span>.
                    {/* Otherwise submit the following document for the year <span className="font-bold">{year}</span> to enable
                    us carry out proper assessment in consideration of your objection: */}
                    {/* Please accept the assurance of our highest regards. */}
                  </p>
                  {/* <ul>
                    <li>1. Audited financial statements</li>
                    <li>2. Bank accounts of the directors and</li>
                    <li>3. Any other relevant document to that effect</li>
                  </ul>
                  <br /> */}
                  <p><br />
                    Yours Faithfully..
                  </p>
                  <p>For:<span className="font-bold"> KOGI STATE INTERNAL REVENUE SERVICE </span></p><br /><br />
                  <SignatureCol />
                  <p className="font-bold">Sule Salihu Enehe</p>
                   Executive Chairman

                </div>
                :
                <div>
                  {objNotice === "no_PITA" ?
                    <div className="text-justify text-base max-w-prose" >
                      {/* <div className="flex justify-between my-3">
                        <p align="left"> <KgirsLogo /></p>
                        <h3 className="mt-9">KOGI STATE GOVERNMENT</h3>
                        <p align="right"> <KogiGov /></p>
                      </div> */}
                      <p className="flex justify-between mb-3"> <span>{objectionData.file_ref}</span> {today}  </p>
                      <p>{payerName}</p>
                      <p>{tpKgtin}</p>
                      <p className="w-64">{payerAddr}</p>
                      <p>Sir/Ma</p><br />
                      <div>
                        <p className="font-bold">RE: {objectionData.grounds}</p><br />
                      </div>
                      <p>The above Subject refers;</p>
                      <p>
                        We acknowledge the receipt of your letter dated
                        <span className="font-bold"> {(timeCreated)}, </span>
                        in respect to the objection of your Direct Assessment
                      </p>
                      <br />
                      <p>
                        We have reviewed your letter of complaint and objection along with
                        your previous tax records with Kogi State Internal Revenue Service.
                        The Management has looked at the reasonability of your objection
                        and revised your assessment to <span className="font-bold">₦{formatNumber(recommendedTax)} </span>
                        Instead of <span className="font-bold"> ₦{formatNumber(DATax)} </span>
                      </p><br />
               
                      <p>
                        You are by this expected to make payments to any Kogi State Internal
                        Revenue Service designated banks using the Assessment ID <span className="font-bold">{assessmentId}</span>.
                        {/* Otherwise submit the following document for the year <span className="font-bold">{year}</span> to enable
                        us carry out proper assessment in consideration of your objection: */}
                        {/* Please accept the assurance of our highest regards. */}
                      </p>
                      {/* <ul>
                        <li>1. Audited financial statements</li>
                        <li>2. Bank accounts of the directors and</li>
                        <li>3. Any other relevant document to that effect</li>
                        </ul>
                      <br /> */}
                      <br />
                      
                      <p>
                        Yours Faithfully..
                      </p>
                      <p>For:<span className="font-bold"> KOGI STATE INTERNAL REVENUE SERVICE </span></p><br /><br />
                      <SignatureCol />
                      <p className="font-bold">Sule Salihu Enehe</p>
                       Executive Chairman

                    </div>
                    :
                    <div>
                      {objNotice === "PITA" ?
                        <div className="text-justify text-base max-w-prose">
                          <p className="flex justify-between mb-3"> <span>{objectionData.file_ref}</span> {today}  </p>
                          <p>{payerName}</p>
                          <p>{tpKgtin}</p>
                          <p className="w-64">{payerAddr}</p>
                          <p>Sir/Ma</p><br />
                          <div>
                            <p className="font-bold">RE: {objectionData.grounds}</p><br />
                          </div>
                          <p>The above Subject refers;</p>
                          <p>
                            We acknowledge the receipt of your letter dated
                            <span className="font-bold"> {(timeCreated)}, </span>
                            in respect to the objection of your Direct Assessment
                          </p>
                          <br />
                          <p>
                            We have reviewed your letter of objection in line with section 24[A] of
                            PITA 2011 as amended.The Management has looked at the reasonability of your objection
                            and revised your assessment to <span className="font-bold">₦{formatNumber(recommendedTax)} </span>
                            Instead of <span className="font-bold"> ₦{formatNumber(DATax)} </span>
                          </p><br />
                          {/* <p>
                            You may wish to persuse the sections 3 and 48 of the Persona Income Tax Act (PITA) 2011
                            as ammended which create that obligation on every citezen of Nigeria
                          </p><br /> */}
                          <p>
                            You are by this expected to make payments to any Kogi State Internal
                            Revenue Service designated banks using the Assessment ID <span className="font-bold">{assessmentId}</span>.
                            {/* Otherwise submit the following document for the year <span className="font-bold">{year}</span> to enable
                            us carry out proper assessment in consideration of your objection: */}
                            {/* Please accept the assurance of our highest regards. */}
                          </p><br />
                          {/* <ul>
                            <li>1. Audited financial statements</li>
                            <li>2. Bank accounts of the directors and</li>
                            <li>3. Any other relevant document to that effect</li>
                          </ul> */}
                          <br />
                          <p>
                            Yours Faithfully..
                          </p>
                          <p>For:<span className="font-bold"> KOGI STATE INTERNAL REVENUE SERVICE </span></p><br /><br />
                          <SignatureCol />
                          <p className="font-bold">Sule Salihu Enehe</p>
                           Executive Chairman

                        </div> 
                        : 
                        <div>
                          { objNotice === "document_review" ? 
                            <div className="text-justify text-base max-w-prose" >
                            {/* <div className="flex justify-between my-3">
                              <p align="left"> <KgirsLogo /></p>
                              <h3 className="">KOGI STATE GOVERNMENT</h3>
                              <p align="right"> <KogiGov /></p>
                            </div> */}
                            <p className="flex justify-between mb-3"> <span>{objectionData.file_ref}</span> {today}  </p>
                            <p>{payerName}</p>
                            <p>{tpKgtin}</p>
                            <p className="w-64">{payerAddr}</p>
                            <p>Sir/Ma</p><br />
                            <div>
                              <p className="font-bold">RE: {objectionData.grounds}</p><br />
                            </div>
                            <p>The above Subject refers;</p>
                            <p>
                              We acknowledge the receipt of your letter dated
                              <span className="font-bold"> {(timeCreated)}, </span>
                              in respect to the objection of your Direct Assessment
                            </p>
                            <br />
                            <p>
                              We have reviewed your letter of objection in line with section 24[A] of
                              PITA 2011 as amended.The Management has looked at the reasonability of your objection
                              and revised your assessment to <span className="font-bold">₦{formatNumber(recommendedTax)} </span>
                              Instead of <span className="font-bold"> ₦{formatNumber(DATax)} </span>
                            </p><br />
                            <p>
                              You may wish to persuse the sections 3 and 48 of the Persona Income Tax Act (PITA) 2011
                              as ammended which create that obligation on every citezen of Nigeria
                            </p><br />
                            <p>
                              You are by this expected to make payments to any Kogi State Internal
                              Revenue Service designated banks using the Assessment ID <span className="font-bold">{assessmentId}</span>.
                              Otherwise submit the following document for the year <span className="font-bold">{year}</span> to enable
                              us carry out proper assessment in consideration of your objection:
                              {/* Please accept the assurance of our highest regards. */}
                            </p><br />
                            <ul>
                              <li>1. Audited financial statements</li>
                              <li>2. Bank accounts of the directors and</li>
                              <li>3. Any other relevant document to that effect</li>
                            </ul>
                            <br />
                            <p>
                              Yours Faithfully.
                            </p>
                            <p>For:<span className="font-bold"> KOGI STATE INTERNAL REVENUE SERVICE </span></p><br /><br />
                            <SignatureCol />
                            <p className="font-bold">Sule Salihu Enehe</p>
                             Executive Chairman
  
                          </div> : ""
                          }
                        </div>
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