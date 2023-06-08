import MaterialTable from '@material-table/core';
import Search from '@material-ui/icons/Search'
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Delete, Edit, MoreHoriz } from "@material-ui/icons";
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
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";


const fields = [
    {
        title: "SN",
        field: "serialNo",
        filtering: false,
        width: "10%"
    },
    {
        title: "Tax Id",
        field: "KGTIN",
    },
    {
        title: "Company Name",
        field: "coy_name",
    },
    {
        title: "Type of Org",
        field: "type_of_organisation",
    },
    {
        title: "Tax office",
        field: "tax_office",
    },
    {
        title: "Phone",
        field: "phone_no",
    },
    {
        title: "Create Time",
        field: "createtime",
        type: "date",
    },
];




export default function NonIndividualReportstable({ FilteredData }) {
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


    return (
        <>
            <MaterialTable title="Non-Individual Taxpayer Data"
                data={items}
                columns={fields}

                options={{
                    search: true,
                    paging: true,
                    actionsColumnIndex: -1,
                    filtering: true,
                    exportButton: {
                        csv: true,
                        pdf: false
                    },
                    exportMenu: [
                        {
                            label: "Export PDF",
                            exportFunc: (cols, datas) =>
                                ExportPdf(cols, datas, "myPdfFileName"),
                        },
                        {
                            label: "Export CSV",
                            exportFunc: (cols, datas) =>
                                ExportCsv(cols, datas, "myCsvFileName"),
                        },
                    ],
                    exportAllData: true,

                }}
                actions={[

                    {
                        icon: MoreHoriz,
                        tooltip: 'View Profile',
                        onClick: (event, rowData) => router.push(`/non-individual-profile/${rowData.KGTIN}`)
                    },
                    {
                        icon: Edit,
                        tooltip: 'Edit Payer',
                        onClick: (event, rowData) => router.push(`/update-individual/${rowData.KGTIN}`),
                        hidden: true
                    }
                ]}
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


            />

        </>
    )
}
