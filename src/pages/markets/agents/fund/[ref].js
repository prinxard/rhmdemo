import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from 'react';
import url from "../../../../config/url";
import { useForm } from 'react-hook-form';
import setAuthToken from '../../../../functions/setAuthToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';

const FundAgentWallet = () => {
    const [createError, setError] = useState("")
    const [isFetching, setIsFetching] = useState(() => false);
    const [userdetails, setUserDetails] = useState([]);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    setAuthToken();
    useEffect(() => {
        setIsFetching(true);
        if (router && router.query) {
            const agentEmail = router.query.ref;
            const fetchPost = () => {
                axios.get(`${url.BASE_URL}market/admin/agent/profile?id=${agentEmail}`)
                    .then(function (response) {
                        setIsFetching(false);
                        const detailsUser = response.data.body.userDetails
                        setUserDetails(detailsUser)
                    })
                    .catch(function (error) {
                        setIsFetching(false);
                    })
            };
            fetchPost();
        }
    }, [router]);

    const onSubmit = (data) => {
        console.log(data);
        setIsFetching(true)

        axios.put(`${url.BASE_URL}market/admin/agent/profile`, data)
            .then(function (response) {
                setIsFetching(false)
                toast.success("Created Successfully!");
                router.push("/dashboard")
            })
            .catch(function (error) {
                setIsFetching(false)
                if (error.response) {
                    setError(() => error.response.data.message);
                } else {
                    toast.error("Failed to create user!");
                }
            })


    };

    return (
        <>
            <ToastContainer />
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
                    <p className="font-bold">Processing...</p>
                </div>
            )}
            <div className="flex border mb-3 block p-3 justify-center rounded-lg bg-white w-full">
                <section>
                    <h4 htmlFor="">Fund Wallet</h4>
                    
                </section>
               
            </div>
        </>
    )
}

export default FundAgentWallet