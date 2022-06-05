import MaterialTable from "material-table";
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
      title: "Amount Paid",
      field: "taxPaidFormatted",
    },
    {
      title: "Balance",
      field: "balance",
      render: rowData => {
        return (
          rowData.balance < "0" ? <p style={{ color: "#FF0000", fontWeight: "bold" }}>{rowData.balance}</p> :
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


export default function UnassessedReportstable({ FilteredData }) {
 
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

                options={{
                    search: true,
                    paging: true,
                    filtering: true,
                    // rowStyle: (rowData) => {
                    //     if (rowData.status === "Printed") {
                    //         return {
                    //             color: "#5f9f45",
                    //             backgroundColor: "#156448",
                    //         }
                    //     } else {
                    //         return {};
                    //     }
                    // },
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
