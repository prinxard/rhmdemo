import React, { useEffect, useState } from 'react'
import MaterialTable from '@material-table/core';
import url from "../../../config/url";
import setAuthToken from '../../../functions/setAuthToken';
import * as Icons from '../../../components/Icons/index';
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
import Loader from "react-loader-spinner";
import axios from "axios";
import { formatNumber } from 'accounting';
import dateformat from "dateformat";
import { useRouter } from 'next/router';

const ViewAgent = () => {
    const [isFetching, setIsFetching] = useState(() => true);
    const [agentDetails, setAgentDetails] = useState([]);
    const [agentTransactions, setAgentTransactions] = useState([]);
    const router = useRouter();

    const transactionsCol = [
        {
            title: "Transaction ID",
            field: "transactionId",
        },
        {
            title: "Type",
            field: "type",
        },
        {
            title: "Amount",
            field: "amount",
            render: (expense) => formatNumber(expense.amount)
        },
        {
            title: "Transaction Date",
            field: "createdAt",
            type: "date"
        },
    ];

    setAuthToken();
    useEffect(() => {
        setIsFetching(true);
        if (router && router.query) {
            let agentEmail = router.query.ref;
            const fetchPost = () => {
                axios.get(`${url.BASE_URL}market/admin/agent/profile?id=${agentEmail}`)
                    .then(function (response) {
                        setIsFetching(false);
                        let responseAll = response.data.body
                        let useDet = responseAll.userDetails
                        console.log("useDet",useDet);
                        setAgentDetails(useDet)
                        let transactions = response.data.body.transactions
                        setAgentTransactions(transactions)
                        console.log("userD", agentDetails);

                    })
                    .catch(function (error) {
                        setIsFetching(false);
                    })
            };
            fetchPost();
        }
    }, [router]);

    return (
        <div>
            {isFetching && (
                <div className="flex justify-center item mb-2">
                    <Loader
                        visible={isFetching}
                        type="BallTriangle"
                        color="#00FA9A"
                        height={19}
                        width={19}
                        timeout={0}
                        className="ml-2"
                    />
                    <p>Fetching data...</p>
                </div>
            )}
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                <div className="lg:w-1/3 max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    <div>
                        <div className="flex justify-center">
                            <img src="/images/avater.png" alt="" sizes="" className="rounded-full w-20 h-20 ring-2 ring-gray-300 dark:ring-gray-500" />
                        </div>
                        <div>
                            <div className="mt-4">
                                <div className="text-center">
                                    <p className="text-lg text-blue-400">{formatNumber(agentDetails.balance)}</p>
                                </div>
                                <p className="font-bold text-center my-2"><em>{agentDetails.name}</em> </p>
                                <p className="font-bold text-center my-2"><em>{agentDetails.user}</em> </p>
                                <p className="font-bold text-center my-2"><em>{agentDetails.phone}</em> </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="lg:w-2/3">
                    <div>
                        <MaterialTable title="Transactions"
                            data={agentTransactions}
                            columns={transactionsCol}
                            options={{
                                search: true,
                                filtering: true,
                                paging: true,
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
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAgent