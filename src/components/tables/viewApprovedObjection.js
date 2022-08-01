
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import dateformat from "dateformat";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
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

export const ViewApprovedObjection = ({ tpKgtin, objUploads, objectionData }) => {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  let daAssessmentId
  let objectionStatus

  objectionData.forEach(element => {
    daAssessmentId = element.da_assessment_id
  });
  objectionData.forEach(element => {
    objectionStatus = element.status
  });


  const Approval = [2, 3, 1]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups


  return (
    <>
      <ToastContainer />
      {/* {isFetching && (
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
          <p>Please wait...</p>
        </div>
      )} */}

      <p>Objection letter</p>

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