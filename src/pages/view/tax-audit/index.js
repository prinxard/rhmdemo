import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link';
import { FormatMoneyComponentReport } from '../../../components/FormInput/formInputs'

export const certDesign = ()=>{
    return(
        <>
        Display on new page
        </>
    )
}

export default function AuditCert() {
    const [fixedValues, Amount] = useState({ amount: 0 });
    const [formData, setFormData] = useState("");
    console.log("form data", formData);
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({mode: "onChange"})
    // let inputAmount = watch("amount", "0").replace(/,/g, '')

    const submitForm = (data) => {
        console.log(data);
         setFormData(data)
    }
    return (
        <div>
            <Link href="/AuditCert">link</Link>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group ">
                        <p>Full name</p>
                        <input type="text" required className="form-control mb-4 w-full rounded font-light text-gray-500"
                            placeholder="Enter Full name" name="fullname" ref={register()}
                        />
                    </div>

                    <div className="form-group">
                        <p>KGTIN</p>
                        <input required type="text" name="kgtin"  className="form-control mb-4 w-full rounded font-light text-gray-500"
                            ref={register()}
                        />
                    </div>

                    <div className="form-group">
                        <p>Amount</p>
                        <FormatMoneyComponentReport
                            ref={register()}
                            name="amount"
                            control={control}
                            // defaultValue={""}
                            onValueChange={(v) => Amount({ amount: v })}
                            placeholder="₦"
                            required={true}
                        />
                    </div>

                    <div className="form-group" >
                        <p>Subject</p>
                        <select ref={register()} name="subject" required className="form-control mb-4 SlectBox w-full rounded font-light text-gray-500" id="taxStation">
                            <option value="WHT INVESTIGATION CLEARANCE CERTIFICATE">
                                WHT INVESTIGATION CLEARANCE CERTIFICATE
                            </option>
                            <option value="TAX AUDIT CLEARANCE CERTIFICATE">
                                TAX AUDIT CLEARANCE CERTIFICATE
                            </option>
                            <option value="PAYE INVESTIGATION CLEARANCE CERTIFICATE">
                                PAYE INVESTIGATION CLEARANCE CERTIFICATE
                            </option>
                            <option value="PAYE AND WHT INVESTIGATION CLEARANCE CERTIFICATE">
                                PAYE AND INVESTIGATION CLEARANCE CERTIFICATE
                            </option>
                        </select>
                    </div>

                    <div className="form-group ">
                        <p>Audit start date</p>
                        <input required type="date" name="sdate" ref={register()} className="form-control mb-4 w-full rounded font-light text-gray-500" />
                    </div>

                    <div className="form-group ">
                        <p>Audit end date</p>
                        <input required name="edate" type="date" ref={register()} className="form-control mb-4 w-full rounded font-light text-gray-500" />
                    </div>

                    <div className="form-group">
                        <p>Address</p>
                        <textarea name="address" required ref={register()} className="form-control mb-4 w-full rounded font-light text-gray-500" cols="30" rows="2"   {...register("kgtin")}></textarea>
                    </div>

                </div>

                <div className="mb-6 flex justify-center">
                    <button
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                    >
                        Get Cert
                    </button>
                </div>
            </form>
        </div>
    )
}
