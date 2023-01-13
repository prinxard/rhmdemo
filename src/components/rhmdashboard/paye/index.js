import React from 'react'
import '@tremor/react/dist/esm/tremor.css'
import url from "../../../config/url";
import { formatNumber } from "accounting";
import {
    Card, Title, Bold, AreaChart, Text,
    Metric, BarChart, Subtitle, LineChart,
    Table, TableHead, TableRow,
    TableHeaderCell,
    TableBody,
    TableCell, Badge
} from "@tremor/react";
import UseFetcher from '../../fetcher/useFetcher';
import Widget1 from '../../dashboard/widget-1';
import { useEffect, useState } from 'react';

export default function PayeDashboard() {
    const [overview, setOverview] = useState([])
    const { data, isLoading, isError } = UseFetcher(
        `${url.BASE_URL}paye/dashboard`
    );

    useEffect(() => {
        if (data) {
            const payeCards = data.overview
            setOverview(payeCards)
        }
    }, [data]);

    const chartdata = [
        {
            year: "Jan",
            "collection": 1.74,
        },
        {
            year: "Feb",
            "collection": 1.93,
        },
        {
            year: "March",
            "collection": 1.9,
        },
        {
            year: "April",
            "collection": 1.98,
        },
        {
            year: "May",
            "collection": 2,
        },
    ];

    const bardata = [
        {
            name: "Ankpa",
            "collection": 2488,
        },
        {
            name: "Ayingba",
            "collection": 1445,
        },
        {
            name: "Kabba",
            "collection": 743,
        },
        {
            name: "Lkj 1",
            "collection": 2488,
        },
        {
            name: "Lkj 2",
            "collection": 1445,
        },
        {
            name: "Ajk",
            "collection": 743,
        },
    ];

    const datajson = [
        {
            id: "1",
            kgtin: "222009991",
            ref:
                "REF-2220099933",
            status: "active",
            name: "Chukwuma Ciroma Adekunle",
            mda: "Internal Revenue Serivice",
            bank: "Unity Bank PLC",
            channel: "etranzact",
            amount: "100,000",
            station: "Head Office"
        },
        {
            id: "2",
            kgtin: "222009991",
            ref:
                "REF-2220099933",
            status: "active",
            name: "Chukwuma Ciroma Adekunle",
            mda: "Internal Revenue Serivice",
            bank: "Unity Bank PLC",
            channel: "etranzact",
            amount: "100,000",
            station: "Head Office"
        },
        {
            id: "3",
            kgtin: "222009991",
            ref: "REF-2220099933",
            status: "active",
            name: "Chukwuma Ciroma Adekunle",
            mda: "Internal Revenue Serivice",
            bank: "Unity Bank PLC",
            channel: "etranzact",
            amount: "100,000",
            station: "Head Office"
        },
        {
            id: "4",
            kgtin: "222009991",
            ref: "REF-2220099933",
            status: "active",
            name: "Chukwuma Ciroma Adekunle",
            mda: "Internal Revenue Serivice",
            bank: "Unity Bank PLC",
            channel: "etranzact",
            amount: "100,000",
            station: "Head Office"
        },
        {
            id: "5",
            kgtin: "222009991",
            ref: "REF-2220099933",
            status: "active",
            name: "Chukwuma Ciroma Adekunle",
            mda: "Internal Revenue Serivice",
            bank: "Unity Bank PLC",
            channel: "etranzact",
            amount: "100,000",
            station: "Head Office"
        },
        {
            id: "6",
            kgtin: "222009991",
            ref:
                "REF-2220099933",
            status: "active",
            name: "Chukwuma Ciroma Adekunle",
            mda: "Internal Revenue Serivice",
            bank: "Unity Bank PLC",
            channel: "etranzact",
            amount: "100,000",
            station: "Head Office"
        },
        {
            id: "7",
            kgtin: "222009991",
            ref: "REF-2220099933",
            status: "active",
            name: "Chukwuma Ciroma Adekunle",
            mda: "Internal Revenue Serivice",
            bank: "Unity Bank PLC",
            channel: "etranzact",
            amount: "100,000",
            station: "Head Office"
        },
    ];

    const dataFormatter = (number) => {
        return "₦ " + Intl.NumberFormat("us").format(number).toString();
    };
    return (
        <div>
            <div className="flex justify-center"><Subtitle>PAYE DASHBOARD</Subtitle></div>
            {overview.map((data) => (
                <div className="flex my-10 flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">

                    <div className="w-full lg:w-1/4">
                        <Widget1
                            color="blue"
                            title="Month"
                            description={`${formatNumber(data.monthPayroll)} Payroll Schedule`}
                        // right={<TotalRemittance />}
                        />
                    </div>

                    <div className="w-full lg:w-1/4">
                        <Widget1
                            color="purple"
                            title="Year"
                            description={`${formatNumber(data.yearPayroll)} Payroll Schedule`}
                        // right={<PendingRemittance />}
                        />
                    </div>

                    <div className="w-full lg:w-1/4">
                        <Widget1
                            color="green"
                            title="Assessed Amount Collected"
                            description={formatNumber(data.monthAmount)}
                        // right={<RevenueItems />}
                        />
                    </div>

                    <div className="w-full lg:w-1/4">
                        <Widget1
                            color="red"
                            title="Unassessed Amount Collected"
                            description={formatNumber(data.yearAmount)}
                        // right={<Unassessed />}
                        />
                    </div>
                </div>

            ))}

            <div className="flex gap-2 mb-4 flex-col lg:flex-row w-full">
                <Card>
                    <Title>Payroll Schedule</Title>
                    <BarChart
                        data={bardata}
                        dataKey="name"
                        categories={["collection"]}
                        colors={["purple"]}
                        valueFormatter={dataFormatter}
                        marginTop="mt-6"
                        yAxisWidth="w-12"
                    />
                </Card>

                <Card>
                    <Title>Payroll Schedule</Title>
                    <LineChart
                        data={chartdata}
                        dataKey="year"
                        categories={["collection"]}
                        colors={["blue"]}
                        valueFormatter={dataFormatter}
                        marginTop="mt-6"
                        yAxisWidth="w-10"
                    />
                </Card>
            </div>

            <Card>
                <Title>Recent Collections</Title>
                <Table marginTop="mt-5">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>
                                SN
                            </TableHeaderCell>
                            <TableHeaderCell>
                                KGTIN
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Ref
                            </TableHeaderCell>
                            <TableHeaderCell>
                                TaxPayer Name
                            </TableHeaderCell>
                            {/* <TableHeaderCell>
                                MDA
                            </TableHeaderCell> */}
                            <TableHeaderCell>
                                Bank
                            </TableHeaderCell>
                            {/* <TableHeaderCell>
                                Channel
                            </TableHeaderCell> */}
                            <TableHeaderCell>
                                Amount
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Station
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datajson.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.id}
                                </TableCell>
                                <TableCell>
                                    <Text>{item.kgtin}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.ref}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.name}</Text>
                                </TableCell>
                                {/* <TableCell>
                                    <Text>{item.mda}</Text>
                                </TableCell> */}
                                <TableCell>
                                    <Text>{item.bank}</Text>
                                </TableCell>
                                {/* <TableCell>
                                    <Text>{item.channel}</Text>
                                </TableCell> */}
                                <TableCell>
                                    <Text>{item.amount}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.station}</Text>
                                </TableCell>
                                {/* <TableCell>
                                    <Badge text={item.status} color="emerald" icon={StatusOnlineIcon} />
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
