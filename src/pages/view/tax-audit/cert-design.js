import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import { CoatOfArms, KgirsLogo, KogiGov, SignatureCol } from "../../../components/Images/Images";
import { toWords } from 'number-to-words';

const CertDesign = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const componentRef = useRef();

    useEffect(() => {
        if (router.query.formData) {
            setFormData(JSON.parse(router.query.formData));
        }
    }, [router.query.formData]);

    if (!formData) {
        return <div>Loading...</div>;
    }


    const numberInWords = toWords((formData.amount).replace(/,/g, ''));
    return (
        <>
            <div className="flex justify-between my-3">
                <button className="btn  bg-green-600 btn-default text-white
                                btn-outlined bg-transparent rounded-md"
                    type="submit"
                    onClick={() => router.back()}
                >
                    Back
                </button>
                <div >
                    <ReactToPrint
                        pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
                        trigger={() => <button className="btn w-32 bg-green-600 btn-default text-white
                                        btn-outlined bg-transparent rounded-md"
                            type="submit"
                        >
                            Print
                        </button>}
                        content={() => componentRef.current}
                    />
                </div>
            </div>
            <div class="my-4">


                <div className="border p-6" ref={componentRef}>
                    <section className="flex justify-center">
                        <div>
                            <p>KOGI STATE GOVERNMENT</p>
                            <p className="font-bold">TAX AUDIT CLEARANCE CERTIFICATE</p>
                        </div>

                    </section>
                    {/* 
                    <section className="flex justify-end mt-8">
                        <CoatOfArms />
                        <KogiGov />
                        <KgirsLogo />
                    </section> */}
                    <p className="font-bold text-sm max-w-prose text-center">{formData.subject}</p>
                    <div className="my-3">
                        <p className="max-w-md text-sm max-w-prose text-justify">
                            This is to certify that all PAYE and Withholding Taxes due to Kogi State Government for the period of
                            January, {new Date(formData.sdate).getFullYear()} to December,
                            <span>
                                {!formData.edate ?
                                    new Date(formData.sdate).getFullYear() :
                                    new Date(formData.edate).getFullYear()
                                }
                            </span>
                            have been reconciled, agreed and paid with the details below;
                        </p>
                    </div>
                    <div className="mt-3">
                        <div className="grid grid-cols-6 gap-2">
                            <p className="font-bold ">Taxpayer:</p>
                            <p className="col-span-2">{formData.fullname}</p>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <p className="font-bold">Address:</p>
                            <div className="col-span-3">
                                <p className=""> {formData.address} </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <p className="font-bold">Audit Year:</p>

                            <p className="">
                                {
                                    new Date(formData.sdate).getFullYear() === new Date(formData.edate).getFullYear() || !formData.edate ?
                                        new Date(formData.sdate).getFullYear() : `${new Date(formData.sdate).getFullYear()} - ${new Date(formData.edate).getFullYear()}`
                                }
                            </p>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <p className="font-bold">Amount:</p>
                            <div className="col-span-3">
                                <p className=""> {formData.amount} </p>
                                <small>
                                    {`(${numberInWords} Naira only)`}
                                </small>
                            </div>
                        </div>


                    </div>

                    <div className="flex justify-between mt-4">
                        <div>
                            <QRCode
                                value={`${formData.fullname} ${formData.amount} ${formData.kgtin}`}
                                size={120}
                            />
                        </div>
                        <div>
                            <SignatureCol />
                            <hr />
                            <p className="font-bold">Sule Salihu Enehe</p>
                            <p>Executive Chairman</p>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
export default CertDesign