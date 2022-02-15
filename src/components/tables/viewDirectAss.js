import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';

const fields = [
  {
    name: "Assessment Id",
    key: "assessment_id",
  },
  {
    name: "KGTIN",
    key: "kgtin",
  },
  {
    name: "Name",
    key: "tp_name",
  },
  {
    name: "Year",
    key: "year",
  },
  // {
  //   name: "Status",
  //   key: "status",
  // },
  {
    name: "Created Time",
    key: "createtime",
  },

];

export const ViewPendingTable = ({ remittance }) => {
  let items = remittance;
  console.log(remittance)


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
                    <Link href={`/view/pendingdirect/${remittance.assessment_id},${remittance.kgtin}`}>
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
        <div className="mt-16"></div>
        <hr />
      </Widget>
    </>
  );
};

export const ViewSinglePendingTable = ({ updateData }) => {
  const items = updateData;
  console.log(items);

  return (
    <>
      <Widget>
        <div className="block p-6 rounded-lg bg-white w-full">
          <div className="flex">
            <h6 className="pb-2">Employment Information</h6>
          </div>
          <p className="mb-3 font-bold"></p>
          <form>
            <div className="grid grid-cols-5 gap-4">
            {items.taxpayer.map((field, i) => (
                <p key={i} className="">
                  {field.KGTIN}
                </p>
              ))}
              <div className="">
                <p>Employer Name</p>
                {items.employed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.emp_name} disabled />
                }
              </div>

              <div className="form-group mb-6">
                <p>Employer Address</p>
                {items.employed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.emp_addr} disabled />
                }
              </div>

              <div className="form-group mb-6">
                <p>Gross Pay</p>
                {items.employed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.gross_pay} disabled />
                }
              </div>
              <div className="form-group mb-6">
                <p>Tax Deducted</p>
                {items.employed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.tax_deducted} disabled />
                }
              </div>
              <div className="form-group mb-6">
                <p>Start Date</p>
                {items.employed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.employed.start_date} disabled />
                }
              </div>
            </div>

            <div className="flex">
              <h6 className="pb-2">Self Employment Information</h6>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="form-group mb-2">
                <p>Business Type</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.business_type} disabled />
                }
              </div>

              <div className="form-group mb-2">
                <p>Address</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.business_addr} disabled />
                }
              </div>
              <div className="form-group mb-2">
                <p>Business Name</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.business_name} disabled />
                }
              </div>

              <div className="form-group mb-2">
                <p>Business Start Date</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.business_start_date} disabled />
                }
              </div>
              <div className="form-group mb-2">
                <p>Cash Income Expenses</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.cash_inc_expense} disabled />
                }
              </div>
              <div className="form-group mb-2">
                <p>Figures Estimated</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.figures_estimated} disabled />
                }
              </div>
              <div className="form-group mb-2">
                <p>Income Earned</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.income_earned} disabled />
                }
              </div>
              <div className="form-group mb-2">
                <p>Other Income</p>
                {items.selfEmployed == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.selfEmployed.other_income} disabled />
                }
              </div>
            </div>

            <div className="flex  mt-6">
              <h6 className="pb-2">Partnership Information</h6>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="form-group mb-6">
                <p>Partner Name</p>
                {items.partner == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.partner.name} disabled />
                }
              </div>

              <div className="form-group mb-6">
                <p>Partner Address</p>
                {items.partner == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.partner.addr} disabled />
                }
              </div>
              <div className="form-group mb-6">
                <p>Percentage</p>
                {items.partner == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.partner.percentage} disabled />
                }
              </div>
              <div className="form-group mb-6">
                <p>Phone</p>
                {items.partner == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.partner.phone} disabled />
                }
              </div>
            </div>
          </form>
        </div>

      </Widget>

      <Widget>
        <div className="block p-6 rounded-lg bg-white w-full">
          <form>
            <div className="flex">
              <h6 className="pb-2">Pension Information</h6>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="">
                <p>PFA</p>
                {items.pension == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.pension.pfa} disabled />
                }
              </div>

              <div className="form-group mb-6">
                <p>PFA Address</p>
                {items.pension == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.pension.pfa_addr} disabled />
                }
              </div>
              <div className="form-group mb-6">
                <p>Gross Amount</p>
                {items.pension == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.pension.gross_amount} disabled />
                }
              </div>
            </div>

            <div className="flex">
              <h6 className="pb-2">NHIS Information</h6>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="form-group mb-6">
                <p>Amount</p>
                {items.nhis == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.nhis.amount} disabled />
                }
              </div>

              <div className="form-group mb-6">
                <p>Company</p>
                {items.nhis == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.nhis.company} disabled />
                }
              </div>
              <div className="form-group mb-6">
                <p>Issuance number</p>
                {items.nhis == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.nhis.insurance_no} disabled />
                }
              </div>
              <div className="form-group mb-6">
                <p>Address</p>
                {items.nhis == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.nhis.addr} disabled />
                }

              </div>
            </div>
            <div className="flex">
              <h6 className="pb-2">Vehicle Information</h6>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="form-group mb-6">
                <p>Brand</p>
                {items.vechicles == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.vechicles.brand} disabled />
                }
              </div>

              <div className="form-group mb-6">
                <p>Cost</p>
                {items.vechicles == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.vechicles.cost} disabled />
                }

              </div>
              <div className="form-group mb-6">
                <p>Model</p>
                {items.vechicles == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.vechicles.model} disabled />
                }

              </div>
              <div className="form-group mb-6">
                <p>Purchase date</p>
                {items.vechicles == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.vechicles.purchase_date} disabled />
                }
              </div>
              <div className="form-group mb-6">
                <p>Year</p>
                {items.vechicles == null || "" ?
                  <input type="text" className="form-control w-full rounded font-light text-gray-500"
                    disabled /> : <input type="text" className="form-control w-full rounded font-light text-gray-500"
                      value={items.vechicles.year} disabled />
                }
              </div>
            </div>
          </form>
        </div>
      </Widget>
    </>
  );
};