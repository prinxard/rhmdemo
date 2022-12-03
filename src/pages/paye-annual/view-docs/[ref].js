import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import setAuthToken from '../../../functions/setAuthToken';
import axios from "axios";
import url from '../../../config/url';

function ViewAnnualDocs() {
    const [isFetching, setIsFetching] = useState(() => true);
    const [uploadedDocs, setDocuments] = useState([])
    const router = useRouter();
    setAuthToken()
    useEffect(() => {
        if (router && router.query) {
            let routerData = String(router.query.ref);
            let year = routerData.split('_').pop()
            let kgtin = routerData.split('_').shift()
            console.log("kgtin", kgtin);
            console.log("year", year);
            let data = {
                "employerId": kgtin,
                "year": year
            }
            const fetchPost = async () => {
                setIsFetching(true);
                try {
                    const result = await axios.post(`${url.BASE_URL}annual/view-annual-uploads`, data);
                    let docs = result.data.body.uploads;
                    console.log("docs", docs);
                    setDocuments(docs)
                    setIsFetching(false);
                }

                catch (error) {
                    console.log('Error', error);
                    setIsFetching(false);
                }
            };
            fetchPost();
        }
    }, [router]);

    const coverLetter = uploadedDocs.filter(c => c.doc_title === "cover_letter")

    const coverL = coverLetter.map((doc) => {
        return doc.doc_name
    })

    const indReturnLetter = uploadedDocs.filter(c => c.doc_title === "indv_return_letter")

    const indReturnL = indReturnLetter.map((doc) => {
        return doc.doc_name
    })

    const expertriateLetter = uploadedDocs.filter(c => c.doc_title === "exp_order_letter")

    const expertriateL = expertriateLetter.map((doc) => {
        return doc.doc_name
    })

    const monthlyPayrollSchedule = uploadedDocs.filter(c => c.doc_title === "mnthly_pay_sched")

    const monthlyPayrollS = monthlyPayrollSchedule.map((doc) => {
        return doc.doc_name
    })

    const payeRemittance = uploadedDocs.filter(c => c.doc_title === "paye_remittance")

    const evidenceOfPayeR = payeRemittance.map((doc) => {
        return doc.doc_name
    })

    const existStaffList = uploadedDocs.filter(c => c.doc_title === "exit_staff_list")

    const exitStaffL = existStaffList.map((doc) => {
        return doc.doc_name
    })

    const TrialBal = uploadedDocs.filter(c => c.doc_title === "endyr_trial_bal")
    const TrialBalance = TrialBal.map((doc) => {
        return doc.doc_name
    })

    const withHoldingTaxDeduct = uploadedDocs.filter(c => c.doc_title === "wht_tax_deduct")
    const withTaxD = withHoldingTaxDeduct.map((doc) => {
        return doc.doc_name
    })

    const withHoldingTaxReceipt = uploadedDocs.filter(c => c.doc_title === "wht_tax_receipts")
    const withTaxR = withHoldingTaxReceipt.map((doc) => {
        return doc.doc_name
    })

    const monthlyImmigrationReturn = uploadedDocs.filter(c => c.doc_title === "mnthly_immi_returns")
    const monthlyImmR = monthlyImmigrationReturn.map((doc) => {
        return doc.doc_name
    })

    const devLevyReceipts = uploadedDocs.filter(c => c.doc_title === "dev_levy_receipts")
    const devLevyR = devLevyReceipts.map((doc) => {
        return doc.doc_name
    })

    const busPremReceipts = uploadedDocs.filter(c => c.doc_title === "bus_premises_receipt")
    const busPremisesR = busPremReceipts.map((doc) => {
        return doc.doc_name
    })

    const groundRentReceipts = uploadedDocs.filter(c => c.doc_title === "grnd_rent_receipts")
    const groundRentR = groundRentReceipts.map((doc) => {
        return doc.doc_name
    })

    const sscl = uploadedDocs.filter(c => c.doc_title === "sscl")

    const SSCLevy = sscl.map((doc) => {
        return doc.doc_name
    })
    const pensionRemittance = uploadedDocs.filter(c => c.doc_title === "pension_remittance")

    const pensionR = pensionRemittance.map((doc) => {
        return doc.doc_name
    })

    const nhfRemittance = uploadedDocs.filter(c => c.doc_title === "nhf_remittance")
    const nhfR = nhfRemittance.map((doc) => {
        return doc.doc_name
    })

    const nhisRemittance = uploadedDocs.filter(c => c.doc_title === "nhis_remittance")

    const nhisR = nhisRemittance.map((doc) => {
        return doc.doc_name
    })

    const lapRemittance = uploadedDocs.filter(c => c.doc_title === "lap_remittance")
    const lapR = lapRemittance.map((doc) => {
        return doc.doc_name
    })

    return (
        <>
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

            <div className="grid justify-items-start">

                <div className="font-semibold">
                    Submission letter
                </div>

                <div className="flex">
                    {coverL.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/rhm-live/uploads/annual-returns/cover_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>

            </div>

            <hr />

            <div className="grid justify-items-start">
                <div>
                    <div className="font-semibold">
                        Individual tax returns letter
                    </div>
                </div>
                <div className="flex">
                    {indReturnL.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/indv_return_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Letter of expatriate order
                </div>

                <div className="flex">
                    {expertriateL.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exp_order_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>

            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Monthly payroll schedule
                </div>

                <div className="flex">
                    {monthlyPayrollS.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.devportal-live/uploads/annual-returns/mnthly_pay_sched/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>

            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Evidence of PAYE remittance
                </div>

                <div className="flex">
                    {evidenceOfPayeR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/paye_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Exit staff list
                </div>
                <div className="flex">
                    {exitStaffL.map((element, i) => (
                        <div key={i} className="p-2">
                            <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exit_staff_list/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Trial balance for Year ending
                </div>
                <div className="flex">
                    {TrialBalance.map((element, i) => (
                        <div key={i} className="p-2">
                            <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/endyr_trial_bal/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Schedule of withholding tax deductions
                </div>
                <div className="flex">
                    {withTaxD.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_deduct/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Withholding tax receipts
                </div>
                <div className="flex">
                    {withTaxR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Monthly Immigration returns
                </div>
                <div className="flex">
                    {monthlyImmR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/mnthly_immi_returns/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Development levy receipts
                </div>
                <div className="flex">
                    {devLevyR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/dev_levy_receipts/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Business premises receipts
                </div>
                <div className="flex">
                    {busPremisesR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/bus_premises_receipt/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Ground rent receipts
                </div>
                <div className="flex">
                    {groundRentR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/grnd_rent_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Social service contributions levy
                </div>
                <div className="flex">
                    {SSCLevy.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/sscl/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Evidence of remittance of pension
                </div>
                <div className="flex">
                    {pensionR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/pension_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Evidence of remittance of NHF
                </div>
                <div className="flex">
                    {nhfR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhf_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Evidence of remittance of NHIS
                </div>
                <div className="flex">
                    {nhisR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhis_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="grid justify-items-start">
                <div className="font-semibold">
                    Evidence of remittance of LAP
                </div>
                <div className="flex">
                    {lapR.map((element, i) => (
                        <div key={i} className="p-2">
                            <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/lap_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ViewAnnualDocs