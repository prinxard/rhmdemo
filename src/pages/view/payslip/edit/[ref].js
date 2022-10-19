import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import setAuthToken from '../../../../functions/setAuthToken';
import url from "../../../../config/url"
import axios from "axios";
import { formatNumber } from 'accounting';
import SectionTitle from '../../../../components/section-title';

function UpdatePayslip() {
    const [id, setId] = useState("")
    const [payslipData, setPayslipData] = useState([])
    const [isFetching, setIsFetching] = useState(() => true);
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(
        { mode: "onBlur", }
    )

    const updatePayslip = (data) => {
        console.log(data);
        // setIsFetching(true)
        // data.basic = (data.basic).replace(/,/g, '')
        // data.other_allw = (data.other_allw).replace(/,/g, '')
        // data.pension = (data.pension).replace(/,/g, '')
        // data.nhf = (data.nhf).replace(/,/g, '')
        // data.benefits = (data.benefits).replace(/,/g, '')
        // data.lap = (data.lap).replace(/,/g, '')


        // axios.put(`${url.BASE_URL}paye/payslip`, data)
        //     .then(function (response) {
        //         setIsFetching(false)
        //         toast.success("Created Successfully!");
        //     })
        //     .catch(function (error) {
        //         setIsFetching(false)
        //         if (error.response) {
        //             setCreateError(() => error.response.data.message);
        //         } else {
        //             toast.error("Failed to create user!");
        //         }
        //     })
    }

    setAuthToken();
    useEffect(() => {
        if (router && router.query) {
            let payslipId = router.query.ref;
            setId(payslipId)
            const fetchPost = async () => {
                try {
                    setIsFetching(false);
                    let res = await axios.get(`${url.BASE_URL}paye/payslip?id=${payslipId}`);
                    let fetchPayslip = res.data.body;
                    setPayslipData(fetchPayslip)
                    console.log(fetchPayslip);
                } catch (e) {
                    setIsFetching(false);
                    console.log(e);
                }
            };
            fetchPost();
        }
    }, [router]);

    return (
        <>
            <SectionTitle title="Update payslip" />
            {payslipData.map((data) => (
                <form onSubmit={handleSubmit(updatePayslip)} className="border mb-3 block p-6 rounded-lg bg-white w-full">
                    <div className="flex gap-2 justify-center ">

                        <div className="grid grid-cols-2 gap-4 w-1/2 border-r pr-3">
                            <div className="form-group">
                                <p>Organization/Employer </p>
                                <input ref={register()} name="org_id" value={data.org_id} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group ">
                                <p>Taxpayer/Employee </p>
                                <input ref={register()} name="paye_tp" value={data.paye_tp} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group ">
                                <p>Start date </p>
                                <input ref={register()} name="sdate" value={data.sdate} required type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group">
                                <p>End date</p>
                                <input ref={register()} name="edate" value={data.edate} type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group">
                                <p>Annual Salary</p>
                                <input ref={register()} name="edate" value={formatNumber(data.basic)} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group ">
                                <p>Tax office</p>
                                <input ref={register()} name="tax_office" value={data.tax_office} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                        </div>
                        <div className="grid grid-cols-2 gap-4 w-1/2 content-start">

                            <div className="form-group ">
                                <p>Rank/G-Level</p>
                                <input ref={register()} name="rank" value={data.rank} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group">
                                <p>Other Allowance</p>
                                <input ref={register()} name="other_allw" value={data.other_allw} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group mb-4">
                                <p>Pension</p>
                                <input ref={register()} name="pension" value={data.pension} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group mb-4">
                                <p>National Housing Fund</p>
                                <input ref={register()} name="nhf" value={data.nhf} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group">
                                <p>Benefits</p>
                                <input ref={register()} name="benefits" value={data.benefits} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>
                            <div className="form-group">
                                <p>Life Assurance Policy</p>
                                <input ref={register()} name="lap" value={data.lap} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-3">
                        <button
                            style={{ backgroundColor: "#84abeb" }}
                            className="btn btn-default text-white btn-outlined ml-2 bg-transparent rounded-md"
                            type="submit"

                        >
                            Update
                        </button>
                    </div>
                </form>

            ))}
        </>
    )
}

export default UpdatePayslip