// import MaterialTable from "material-table";
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
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
import * as Icons from '../../components/Icons/index';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { formatNumber } from "accounting";


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
    title: "Taxpayer Name",
    field: "tp_name",
  },
  {
    title: "Gross Income",
    field: "overallGross",
  },
  {
    title: "Total Tax Due",
    field: "totalTaxFormated",
  },
  {
    title: "Dev Levy",
    field: "dev_levy",
    render: (dev_levy) => formatNumber(dev_levy.dev_levy)

  },
  {
    title: "Amount Paid",
    field: "taxPaid",
    render: (taxPaid) => formatNumber(taxPaid.taxPaid)

  },
  {
    title: "Balance",
    field: "balance",
    render: rowData => {
      return (
        rowData.balance < "0" ? <p style={{ color: "#FF0000", fontWeight: "bold" }}>{rowData.balance}</p> :
          rowData.balance > "0" ? <p style={{ color: "#8fce00", fontWeight: "bold" }}>{`+${rowData.balance}`}</p> :
            <p>{rowData.balance}</p>
      )
    }
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Type",
    field: "assessment_type",
  },
  {
    title: "Print Status",
    field: "printstatus",
  },
  {
    title: "Created Time",
    field: "createtime",
  },

];


export default function AssessmentReportstable({ FilteredData }) {

  const router = useRouter();

  let items = FilteredData

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

  useEffect(() => {

  }, [router.query]);

  return (
    <>
      <MaterialTable title="Report Data"
        data={items}
        columns={fields}
        // renderSummaryRow={({ column, data }) =>
        //   column.field === "taxPaid"
        //     ? {
        //       value: formatNumber(data.reduce((agg, row) => Number(agg) + (Number(row.taxPaid)), 0)),
        //       style: { fontWeight: "bold" },
        //     }
        //     : undefined
        // }
        options={{
          search: false,
          paging: true,
          filtering: true,
          // exportButton: {
          //   csv: true,
          //   pdf: false
          // },
          exportMenu: [
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(fields, items, "myCsvFileName"),
            },
          ],
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

      //     if (userGroup.some(r => reportRange.includes(r))) {
      //         ''

      //     }
      //     else {
      //         window.open(`view/collections/${rowData.idpymt}`, "_self")
      //         event.stopPropagation();
      //     }
      // }}
      />

    </>
  )
}
