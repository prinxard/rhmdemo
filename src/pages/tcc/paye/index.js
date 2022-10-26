import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SectionTitle from '../../../components/section-title';
import setAuthToken from '../../../functions/setAuthToken';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import url from '../../../config/url';


function index() {
    const [kgtinErr, setKgtinErr] = useState("")
    const [isFetching, setIsFetching] = useState(() => false);
    const [taxpayerInfo, setTaxpayerinfo] = useState([]);
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { dirtyFields }
    } = useForm(
        { mode: "onBlur", }
    )
    console.log("dirtyFields", dirtyFields);
    console.log("taxpayerInfo", taxpayerInfo)
    const {
        register: registerkgtin,
        formState: { errors: errors2 },
        handleSubmit: handleSubmitkgtin,

    } = useForm(
        { mode: "onBlur", }
    )

    const watchYear1 = watch("year1", "");
    const watchYear2 = watch("year2", "");
    const watchYear3 = watch("year3", "");
    console.log("taxpayerInfo", taxpayerInfo);

    setAuthToken();
    const CreateTcc = (data) => {
        console.log("data", data);
    };

    const verifiyKGTIN = (data) => {
        setIsFetching(true)
        axios.post(`${url.BASE_URL}taxpayer/view-taxpayers`, data)
            .then(function (response) {
                setIsFetching(false)
                setTaxpayerinfo(response.data.body)
                setKgtinErr("")
            })
            .catch(function (error) {
                setIsFetching(false)
                if (error.response) {
                    setKgtinErr(error.response.data.message)
                } else {

                }
            })
    };

    useEffect(() => {

        const fetchPostYear1 = () => {
            if (dirtyFields.year1) {
                let year1 = watchYear1.getFullYear()
                let kgtin = taxpayerInfo.KGTIN
                setIsFetching(true)
                axios.get(`${url.BASE_URL}paye/payslip?id=tcc&kgtin=${kgtin}&year=${year1}`)
                    .then(function (response) {
                        setIsFetching(false)
                        console.log(response.data.body);
                        // setTaxpayerinfo(response.data.body)
                        // console.log("response", response);
                        // setKgtinErr("")
                    })
                    .catch(function (error) {
                        setIsFetching(false)
                        if (error.response) {
                            toast.error(error.response.data.message)
                        } else {

                        }
                    })

            }

        };
        fetchPostYear1();

    }, [watchYear1]);
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
            <SectionTitle subtitle="Paye Tcc" />
            <div className="border mb-3 p-6 rounded-lg bg-white w-full">
                <p className="text-red-600">{kgtinErr}</p>
                <form onSubmit={handleSubmitkgtin(verifiyKGTIN)} className="mb-2 grid grid-cols-4 gap-2">
                    <label className="self-center">Enter Taxpayer KGTIN</label>

                    <div className="place-self-start">
                        <input type="text" name='KGTIN' className="form-control w-full rounded" ref={registerkgtin()} placeholder="Enter KGTIN" />
                    </div>

                    <div className="self-center block">
                        <button
                            type="submit"
                            style={{ backgroundColor: "#84abeb" }}
                            className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                        >
                            Verify KGTIN
                        </button>
                    </div>
                </form>

                {/* <div className="grid grid-cols-4 gap-2">
                    <div></div>
                    <small className={`${validmsg}`}>{payerDetails.tp_name}</small>
                    <small className={`text-red-600 ${invalidmsg}`}>{invalidkgtinmessage}</small>
                </div> */}

            </div>

            <form onSubmit={handleSubmit(CreateTcc)}>

                <div className="flex border mb-3 block p-3 rounded-lg bg-white w-full">
                    <div className="">

                        <div className="mb-6 grid grid-cols-3 gap-2">
                            <label>Taxpayer:</label>

                            <div>

                                <input ref={register()} value={taxpayerInfo.tp_name} name="tp_name" readOnly type="text" className="form-control w-full rounded"
                                />
                            </div>

                        </div>

                        <div className="mb-6 grid grid-cols-3 gap-2">
                            <label>KGTIN:</label>
                            <div>
                                <input ref={register()} value={taxpayerInfo.KGTIN} readOnly name="KGTIN" type="text" className="form-control w-full rounded" placeholder="KGTIN" />
                            </div>
                        </div>

                        <div className="mb-6 grid grid-cols-3 gap-2">
                            <label>File no:</label>
                            <input ref={register()} name="file_ref" type="text" className="form-control w-full rounded"
                            />

                        </div>

                        <div className="mb-6 grid grid-cols-3 gap-2">
                            <label htmlFor="employername">Tax Office:</label>
                            <div>
                                <input ref={register()} value={taxpayerInfo.tax_office} name="tax_office" readOnly type="text" className="form-control w-full rounded"
                                />
                            </div>
                        </div>
                        <div className="mb-6 grid grid-cols-3 gap-4">
                            <label htmlFor="employername">Processing Fee:</label>
                            <input ref={register()} placeholder="₦" name="prc_fee" type="text" className="form-control w-full rounded"
                            />
                        </div>
                    </div>
                </div>
                <div className={`flex justify-between border mb-3 rounded-lg bg-white w-full`}>

                    <div className="p-3">
                        <h6 className="text-right mb-6">Year 1</h6>
                        <div className="mb-6 grid grid-cols-2 ">
                            <label>Assessment year </label>
                            <Controller
                                name="year1"
                                control={control}
                                // defaultValue={new Date()}
                                render={({ onChange, value }) => {
                                    return (
                                        <DatePicker
                                            className="form-control w-full rounded"
                                            onChange={onChange}
                                            selected={value}
                                            showYearPicker
                                            dateFormat="yyyy"
                                            yearItemNumber={8}
                                            placeholderText="Select Year"
                                        />
                                    );
                                }}
                            />
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <label>Assessment ID</label>
                            <div>
                                <input className="form-control w-full rounded" ref={register()} name="assmt_1" readOnly type="text" />
                            </div>

                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <label>Tax Payable </label>

                            <div>
                                <input readOnly name="tax1" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>

                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <label>Income from employment</label>
                            <div>
                                <input readOnly name="tax1" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <label>Income from Trade/Professional</label>
                            <div>
                                <input readOnly name="tax1" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <label>Other Income</label>

                            <div>
                                <input readOnly name="other_income" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="p-3 grid justify-items-stretch">
                        <h6 className="text-center mb-6">Year 2</h6>
                        <div className="mb-6 justify-self-center">

                            <Controller
                                name="year2"
                                control={control}
                                // defaultValue={c}
                                render={({ onChange, value }) => {
                                    return (
                                        <DatePicker
                                            className="form-control w-full rounded"
                                            onChange={onChange}
                                            selected={value}
                                            showYearPicker
                                            dateFormat="yyyy"
                                            yearItemNumber={8}
                                            placeholderText="Select Year"


                                        />
                                    );
                                }}
                            />
                        </div>

                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly name="assmt_2" ref={register()} className="form-control w-full rounded" type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly name="tax1" className="form-control w-full rounded" ref={register()} type="text"
                                />

                            </div>
                        </div>

                        <div className="mb-6 justify-self-center">

                            <div>
                                <input readOnly name="tax1" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>

                        </div>

                        <div className="mb-6 justify-self-center">
                            <div>

                                <input readOnly name="tax1" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly name="other_income" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 grid justify-items-stretch">
                        <h6 className="text-center mb-6">Year 3</h6>
                        <div className="mb-6 justify-self-center">

                            <Controller
                                name="year3"
                                control={control}
                                // defaultValue={f}
                                render={({ onChange, value }) => {
                                    return (
                                        <DatePicker
                                            className="form-control w-full rounded"
                                            onChange={onChange}
                                            selected={value}
                                            showYearPicker
                                            dateFormat="yyyy"
                                            yearItemNumber={8}
                                            placeholderText="Select Year"

                                        />
                                    );
                                }}
                            />
                        </div>

                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly name="assmt_3" ref={register()} className="form-control w-full rounded" type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 justify-self-center">

                            <div>
                                <input readOnly name="tax1" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>

                        </div>

                        <div className="mb-6 justify-self-center">

                            <div>
                                <input readOnly name="tax1" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>

                        </div>

                        <div className="mb-6 justify-self-center">

                            <div>
                                <input readOnly name="tax1" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>
                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly name="other_income" className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>

                        </div>

                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <button
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                    // disabled={disabled}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

export default index