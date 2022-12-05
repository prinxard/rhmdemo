import MaterialTable from '@material-table/core';
import React from 'react'
import ExportCsv from '@material-table/exporters/csv'
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
import * as Icons from '../../components/Icons/index';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { formatNumber } from "accounting";

function AnnualUploadsList({FilteredData}) {

    const fields = [
        {
            title: "KGTIN",
            field: "employerId",
        },
        {
            title: "Name",
            field: "taxpayerName",
        },
        {
            title: "Number Of Employee",
            field: "employeeCount",
        },
        {
            title: "Year",
            field: "year",
        },
        {
            title: "Status",
            field: "status",
        },
    ];
    let items = FilteredData
    return (
        <>
            <MaterialTable title="Annual Filing List"
                data={items}
                columns={fields}
                // renderSummaryRow={({ column, data }) =>
                //     column.field === "amount"
                //         ? {
                //             value: formatNumber(data.reduce((agg, row) => Number(agg) + (Number(row.amount)), 0)),
                //             style: { fontWeight: "bold" },
                //         }
                //         : undefined
                // }
                options={{
                    search: false,
                    paging: true,
                    filtering: true,
                    // Using the regular material-table
                    // exportButton: {
                    //     csv: true,
                    //     pdf: false
                    // },
                    // Using material table core
                    exportMenu: [
                        {
                            label: "Export CSV",

                            exportFunc: (cols, datas) =>
                                ExportCsv(fields, items, "myCsvFileName"),

                        },
                    ],
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

                    window.open(`paye-annual/view-docs/${rowData.employerId}_${rowData.year}_${rowData.status}`, "_self")
                    event.stopPropagation();

                }}
            />
        </>
    )
}

export default AnnualUploadsList