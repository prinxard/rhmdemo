import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function UpdatePayslip() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(
        { mode: "onBlur", }
    )

    useEffect(() => {
        if (router && router.query) {
          let payslipId = router.query.ref;
          setAuthToken();
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
            {paySlipData.map((data) => (
                <form className="border mb-3 block p-6 rounded-lg bg-white w-full">
                    <div className="flex gap-2 justify-center ">

                        <div className="grid grid-cols-2 gap-4 w-1/2 border-r pr-3">

                            <div className="form-group">
                                <p>Organization/Employer </p>
                                <input name="org_id" defaultValue={data.org_id} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group ">
                                <p>Taxpayer/Employee </p>
                                <input name="paye_tp" defaultValue={data.paye_tp} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group ">
                                <p>Start date </p>
                                <input name="sdate" defaultValue={data.sdate} required type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group">
                                <p>End date</p>
                                <input name="edate" defaultValue={data.edate}  type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group">
                                <p>Annual Salary</p>
                                <input name="edate" defaultValue={formatNumber(data.basic)} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group ">
                                <p>Tax office</p>
                                <input name="tax_office" defaultValue={data.tax_office} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                        </div>
                        <div className="grid grid-cols-2 gap-4 w-1/2 content-start">

                            <div className="form-group ">
                                <p>Rank/G-Level</p>
                                <input name="rank" defaultValue={data.rank} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group">
                                <p>Other Allowance</p>
                                <input name="other_allw" defaultValue={data.other_allw} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group mb-4">
                                <p>Pension</p>
                                <input name="pension" defaultValue={data.pension} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group mb-4">
                                <p>National Housing Fund</p>
                                <input name="nhf" defaultValue={data.nhf} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>

                            <div className="form-group">
                                <p>Benefits</p>
                                <input name="benefits" defaultValue={data.benefits} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>
                            <div className="form-group">
                                <p>Life Assurance Policy</p>
                                <input name="lap" defaultValue={data.lap} readOnly type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                />
                            </div>
                        </div>
                    </div>
                </form>

            ))}
        </>
    )
}

export default UpdatePayslip