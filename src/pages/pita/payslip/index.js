import React from 'react'

export default function payslip() {
    return (
        <div className="flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full">
            <form>
                <div className="">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                        <label>Bank Name:</label>
                        <input name="name" type="text" className="form-control w-full rounded"
                        />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                        <label>Bank Account:</label>
                        <input name="account" type="text" className="form-control w-full rounded"
                        />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                        <label>Bank Verification Number (BVN):</label>
                        <input name="bvn" type="text" id="employername" className="form-control w-full rounded"
                        />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                        <label >Gross Amount:</label>
                        <input name="gross_amount" placeholder="₦" type="text" className="form-control w-full rounded"
                        />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                        <label>Optional Comments:</label>
                        <textarea name="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>
                    <div className="mb-6 flex justify-between">
                        <button
                            style={{ backgroundColor: "#84abeb" }}
                            className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
