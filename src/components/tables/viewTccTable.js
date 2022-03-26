import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";

const fields = [
  {
    name: "SN",
    key: "serialNo",
  },
  {
    name: "Name",
    key: "taxpayer_name",
  },
  {
    name: "KGTIN",
    key: "tp_id",
  },
  {
    name: "File No",
    key: "file_ref",
  },
  {
    name: "Fee",
    key: "prc_fee",
  },
  {
    name: "Station",
    key: "tax_office",
  },
  {
    name: "Assessment 1",
    key: "assmt_1",
  },
  {
    name: "Assessment 2",
    key: "assmt_2",
  },
  {
    name: "Assessment 3",
    key: "assmt_3",
  },
];

export const ViewTccTable = ({ remittance }) => {
  let items = remittance;
  console.log(items);
  return (
    <>
      <Widget>
        <table className="table divide-y">
          <thead>
            <tr className="">
              {fields.map((field, i) => (
                <th key={i} className="">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((remittance, i) => (
              <tr key={i} className="">
                {fields.map((field, j) => (
                  <td key={j} className="">
                    {/* {remittance[field.key]} */}

                    <Link href={`/view/listtcc/${remittance.id}`}>
                      <a className="hover:text-blue-500">
                        {remittance[field.key]}
                      </a>
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </Widget>
    </>
  );
};


export const ViewSingleTccTable = ({ payerDetails, assessmentData, assessmentData2, assessmentData3 }) => {

  return (
    <>
      <Widget>
        <div>
          <div className="mb-6 flex justify-between">
            <form className=" mr-3">
              <button
                className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                <Link href={`/view-tcc-docs/1`}> View Documents</Link>
              </button>
            </form>

            <div className="flex">
              <form className=" mr-3">
                <button
                  className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Approve
                </button>
              </form>
              <form className=" mr-3">
                <button
                  className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Decline
                </button>
              </form>
              <form className=" mr-3">
                <button
                  className="btn bg-purple-400 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Verify
                </button>
              </form>

              <button
                className="btn bg-green-400  mr-3 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Audit Check
              </button>

              <button
                className="btn mr-3 bg-blue-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Aprrove Print
              </button>
            </div>


          </div>

          <div className="flex border mb-3 block p-3 rounded-lg bg-white w-full">

            <div className="">

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label>Taxpayer:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly name="taxpayername" type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="taxpayername" readOnly type="text" defaultValue={ind.taxpayer_name} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label>KGTIN:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly name="tp_id" type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="tp_id" readOnly type="text" defaultValue={ind.tp_id} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label>File no:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly name="tp_id" type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input readOnly type="text" defaultValue={ind.file_ref} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label htmlFor="employername">Tax Office:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="tax_office" readOnly type="text" defaultValue={ind.tax_office} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Processing Fee:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="tax_office" readOnly type="text" defaultValue={formatNumber(ind.prc_fee)} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>

          <div className={`flex justify-between border mb-3 rounded-lg bg-white w-full`}>

            <div className="p-3">
              <h6 className="text-right mb-6">Year 1</h6>
              <div className="mb-6 grid grid-cols-2 ">
                <label>Assessment year </label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input readOnly type="text" />
                  :
                  <div>

                    {assessmentData.map((ind, i) => (
                      <input readOnly type="text" defaultValue={ind.year} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Tax Payable </label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input readOnly className="form-control w-full rounded" type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} type="text"
                      />
                    ))}

                  </div>
                }

              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Income from employment</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Income from Trade/Professional</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Other Income</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Assessment ID</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="assmt_1" className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>
            </div>

            <div className="p-3 grid justify-items-stretch">
              <h6 className="text-center mb-6">Year 2</h6>
              <div className="mb-6 justify-self-center">
                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.year)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>
              <div className="mb-6 justify-self-center">
                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>


              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_2" type="text" />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="assmt_2" className="form-control w-full rounded" key={i} defaultValue={ele.assessment_id} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

            </div>

            <div className="p-3 grid justify-items-stretch">
              <h6 className="text-center mb-6">Year 3</h6>
              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.year)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>
              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_3" type="text" />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="assmt_3" className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Widget>
    </>
  );
};