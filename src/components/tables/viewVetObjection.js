import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import dateformat from "dateformat";
import { useRef, useState } from "react";
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
import { SignatureCol } from "../Images/Images";
import { toWords } from 'number-to-words';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    title: "Tax Id",
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

export const ViewVetObjectionTable = ({ submittedData }) => {
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
      <MaterialTable title="Print objection list"
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

