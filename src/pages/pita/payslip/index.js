import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Widget from '../../../components/widget'
import axios from "axios";
import url from "../../../config/url";
import setAuthToken from "../../../functions/setAuthToken";
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { FormatMoneyComponentReport } from '../../../components/FormInput/formInputs';
import { useEffect } from 'react';

export default function payslip() {
    const [isFetching, setIsFetching] = useState(false)
    const [orgName, setOrgName] = useState("")
    const [orgKGTIN, setOrgKGTIN] = useState("")
    const [payerName, setPayername] = useState("")
    const [payerKGTIN, setPayerKGTIN] = useState("")
    const [station, setTaxStation] = useState([])
    const [fixedValuesSal, fixValuesSalary] = useState({ amount: "" });
    const [fixedValuesAll, fixValuesAllow] = useState({ amount: "" });
    const [fixedValuesPen, fixValuesPension] = useState({ amount: "" });
    const [fixedValuesNh, fixValuesNHF] = useState({ amount: "" });
    const [fixedValuesBen, fixValuesBenefits] = useState({ amount: "" });
    const [fixedValuesla, fixValuesBeneLap] = useState({ amount: "" });
    const [createError, setCreateError] = useState("");

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(
        { mode: "onBlur", }
    )

    const {
        register: registerTp,
        formState: { errors: errors2 },
        handleSubmit: handleSubmitTp,

    } = useForm(
        { mode: "onBlur", }
    )

    const {
        register: registerForm,
        formState: { errors: errors3 },
        control,
        handleSubmit: handleSubmitForm,

    } = useForm(
        { mode: "onBlur", }
    )

    setAuthToken()
    useEffect(() => {
        const fetchPost = async () => {
            try {
                let res = await axios.get(`${url.BASE_URL}user/items`);
                let office = res.data.body.taxOffice
                setTaxStation(office)

            } catch (e) {
                // setIsFetching(false);
            }
        };
        fetchPost();
    }, [])

    const searchOrg = (data) => {
        data.tpType = "non-Individual"
        setIsFetching(true)

        axios.post(`${url.BASE_URL}taxpayer/taxpayer-search`, data)
            .then(function (response) {
                setIsFetching(false)
                let organization = response.data.body.taxpayer
                console.log("org", organization);
                if (organization === [] || organization === "" || organization === null) {
                    toast.error("Organization does not exist");
                } else {
                    let organizName = organization[0].tp_name
                    let organizKGTIN = organization[0].KGTIN
                    setOrgName(organizName)
                    setOrgKGTIN(organizKGTIN)

                }

            })
            .catch(function (error) {
                setIsFetching(false)
                setOrgName("")
                setOrgKGTIN("")
                toast.error("Cannot find Organization!");
            })
    }

    const searchTp = (data) => {
        data.tpType = "Individual"
        setIsFetching(true)

        axios.post(`${url.BASE_URL}taxpayer/taxpayer-search`, data)
            .then(function (response) {
                setIsFetching(false)
                let taxPayer = response.data.body.taxpayer
                let tpName = taxPayer[0].tp_name
                let tpKGTIN = taxPayer[0].KGTIN
                setPayername(tpName)
                setPayerKGTIN(tpKGTIN)

            })
            .catch(function (error) {
                setIsFetching(false)
                setPayername("")
                setPayerKGTIN("")
                toast.error("Cannot find Taxpayer!");

            })
    }

    const createPayslip = (data) => {
        setIsFetching(true)
        console.log(data);
        data.basic = (data.basic).replace(/,/g, '')
        data.other_allw = (data.other_allw).replace(/,/g, '')
        data.pension = (data.pension).replace(/,/g, '')
        data.nhf = (data.nhf).replace(/,/g, '')
        data.benefits = (data.benefits).replace(/,/g, '')
        data.lap = (data.lap).replace(/,/g, '')


        axios.post(`${url.BASE_URL}paye/payslip`, data)
            .then(function (response) {
                setIsFetching(false)
                toast.success("Created Successfully!");
            })
            .catch(function (error) {
                setIsFetching(false)
                if (error.response) {
                    setCreateError(() => error.response.data.message);
                } else {
                    toast.error("Failed to create user!");
                }
            })
    }

    return (
        <>
            <ToastContainer />
            <Widget>
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
                        <p className="font-bold">Please wait...</p>
                    </div>
                )}
                <div >

                    <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                        <div className="w-full lg:w-1/2 ">
                            <form onSubmit={handleSubmit(searchOrg)} className="flex">
                                <input ref={register()} required name="search" className="form-control rounded font-light text-gray-500" type="text" placeholder="organization kgtin/name" />
                                <button
                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined ml-2 bg-transparent rounded-md"
                                    type="submit"

                                >
                                    Search organisation
                                </button>
                            </form>
                            <div>
                                <p>{orgName}</p>
                                <p>{orgKGTIN}</p>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <form className="flex" onSubmit={handleSubmitTp(searchTp)}>

                                <input ref={registerTp()} required type="text" name="search" defaultValue={payerKGTIN} placeholder="kgtin, name, or phone" className="form-control rounded font-light text-gray-500" />
                                <button

                                    style={{ backgroundColor: "#84abeb" }}
                                    className="btn btn-default text-white btn-outlined bg-transparent ml-2 rounded-md"
                                >
                                    Search Taxpayer
                                </button>
                            </form>
                            <div>
                                <p>{payerName}</p>
                                <p>{payerKGTIN}</p>
                            </div>
                        </div>
                    </div>

                </div>

            </Widget>
            <form onSubmit={handleSubmitForm(createPayslip)} className="border mb-3 block p-6 rounded-lg bg-white w-full">
                <p className="text-red-600 mb-3">{createError}</p>
                <div className="flex gap-2 justify-center ">

                    <div className="grid grid-cols-2 gap-4 w-1/2 border-r pr-3">


                        <div className="form-group">
                            <p>Organization/Employer <small className="font-bold text-red-600">*</small></p>
                            <input name="org_id" ref={registerForm()} required placeholder={orgName} defaultValue={orgKGTIN} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Taxpayer/Employee <small className="font-bold text-red-600">*</small></p>
                            <input name="paye_tp" ref={registerForm()} required placeholder={payerName} defaultValue={payerKGTIN} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Start date <small className="font-bold text-red-600">*</small></p>
                            <input name="sdate" ref={registerForm()} required type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group">
                            <p>End date</p>
                            <input name="edate" ref={registerForm()} type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>


                        <div className="form-group">
                            <p>Annual Salary <small className="font-bold text-red-600">*</small></p>
                            <FormatMoneyComponentReport
                                ref={registerForm()}
                                name="basic"
                                control={control}
                                defaultValue={""}
                                onValueChange={(v) => fixValuesSalary({ amount: v })}
                                required={true}
                            />
                        </div>


                        <div className="form-group ">
                            <p>Tax Office <small className="font-bold text-red-600">*</small></p>
                            <select required ref={registerForm()} name="tax_office" className="form-control mb-4 SlectBox w-full rounded font-light text-gray-500">
                                {station.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
                            </select>
                        </div>

                    </div>
                    <div className="grid grid-cols-2 gap-4 w-1/2 content-start">

                        <div className="form-group ">
                            <p>Rank/G-Level</p>
                            <input name="rank" type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group">
                            <p>Other Allowance</p>
                            <FormatMoneyComponentReport
                                name="other_allw"
                                control={control}
                                defaultValue={""}
                                onValueChange={(v) => fixValuesAllow({ amount: v })}
                                ref={registerForm()}
                                required={true}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <p>Pension</p>
                            <FormatMoneyComponentReport
                                name="pension"
                                control={control}
                                defaultValue={""}
                                onValueChange={(v) => fixValuesPension({ amount: v })}
                                ref={registerForm()}
                                required={true}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <p>National Housing Fund</p>
                            <FormatMoneyComponentReport
                                name="nhf"
                                control={control}
                                defaultValue={""}
                                onValueChange={(v) => fixValuesNHF({ amount: v })}
                                ref={registerForm()}
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <p>Benefits</p>
                            <FormatMoneyComponentReport
                                name="benefits"
                                control={control}
                                defaultValue={""}
                                onValueChange={(v) => fixValuesBenefits({ amount: v })}
                                ref={registerForm()}
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <p>Life Assurance Policy</p>
                            <FormatMoneyComponentReport
                                name="lap"
                                control={control}
                                defaultValue={""}
                                onValueChange={(v) => fixValuesBeneLap({ amount: v })}
                                ref={registerForm()}
                                required={true}
                            />
                        </div>

                    </div>
                </div>
                <div className="flex justify-center">
                    <button

                        style={{ backgroundColor: "#84abeb" }}
                        className="btn btn-default text-white my-4 btn-outlined bg-transparent rounded-md"
                    >
                        Create Payslip
                    </button>

                </div>
            </form>
        </>
    )

}
