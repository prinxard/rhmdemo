import React from 'react'
import '@tremor/react/dist/esm/tremor.css'
import { Card, Title, AreaChart, Text, Metric, BarChart, Subtitle, LineChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";

export default function PayeDashboard() {
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

    const data = [
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
            <div className="flex gap-2 mb-4 flex-col lg:flex-row w-full">
                <Card maxWidth="max-w-xs" decoration="top" decorationColor="indigo">
                    <Metric>month</Metric>
                    <Text>40 Payroll Schedule</Text>
                </Card>
                <Card maxWidth="max-w-xs" decoration="top" decorationColor="indigo">
                    <Metric>Year</Metric>
                    <Text>200 Payroll Schedule</Text>
                </Card>
                <Card maxWidth="max-w-xs" decoration="top" decorationColor="indigo">
                    <Metric>Month</Metric>
                    <Text>NGN 2,000,000 PAYE Collection</Text>
                </Card>
                <Card maxWidth="max-w-xs" decoration="top" decorationColor="indigo">
                    <Metric>Year</Metric>
                    <Text>NGN 2,000,000 PAYE Collection</Text>
                </Card>

            </div>
            <div className="flex gap-2 mb-4 flex-col lg:flex-row w-full">

                <Card>
                    <Title>Current Month</Title>
                    <BarChart
                        data={bardata}
                        dataKey="name"
                        categories={["collection"]}
                        colors={["blue"]}
                        valueFormatter={dataFormatter}
                        marginTop="mt-6"
                        yAxisWidth="w-12"
                    />
                </Card>

                <Card>
                    <Title>Current Year</Title>
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
                            <TableHeaderCell>
                                MDA
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Bank
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Channel
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Amount
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Station
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
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
                                <TableCell>
                                    <Text>{item.mda}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.bank}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.channel}</Text>
                                </TableCell>
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
