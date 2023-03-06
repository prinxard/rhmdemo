import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormatMoneyComponentReport } from '../../../components/FormInput/formInputs'
import CertDesign from './cert-design';
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AuditCert() {
    const [fixedValues, Amount] = useState({ amount: 0 });
    const [formData, setFormData] = useState(null);
    const router = useRouter()
    console.log("form data", formData);
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({ mode: "onChange" })

    const submitForm = (data) => {
        router.push({
            pathname: '/view/tax-audit/cert-design',
            query: { formData: JSON.stringify(data) },
        });
    }
    return (
        <div>
            <h5 className="text-center mb-4">Generate Tax Audit Certificate</h5>
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
                        <input required type="text" name="kgtin" className="form-control mb-4 w-full rounded font-light text-gray-500"
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
                        <Controller
                                name="sdate"
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

                    <div className="form-group ">
                        <p>Audit end date</p>
                        <Controller
                                name="edate"
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
            <div className="hidden">
                {formData && <CertDesign formData={formData} />}
            </div>
        </div>
    )
}
