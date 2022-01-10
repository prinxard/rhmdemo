import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../../components/Icons/index';
import Widget1 from "../dashboard/widget-1";

const fields = [
  // {
  //   name: "Tax ID",
  //   key: "id",
  // },
  {
    name: "Staff names",
    key: "staff_names",
  },
  {
    name: "Number of Months",
    key: "no_months",
  },
  {
    name: "Gross Salary",
    key: "gross_income",
  },
  {
    name: "Pension",
    key: "pension",
  },
  {
    name: "NHIS",
    key: "nhis",
  },
  {
    name: "LAP",
    key: "lap",
  },
  {
    name: "NHF",
    key: "nhf",
  },
  {
    name: "Consolidated Relief Allowance",
    key: "con_rel_cal",
  },
  {
    name: "Net tax deducted",
    key: "net_tax_ded",
  },
  {
    name: "Expected tax",
    key: "tax_pay_cal",
  },
  {
    name: "Variance",
    key: "variance_cal",
  },
  {
    name: "Year",
    key: "year",
  },

];

export const ViewAnnualTable = ({ remittance, totalemployees, totaltax, grosssum }) => {
  let items = remittance;
  // console.log(items)
  remittance.map((remittance) => {
    remittance["amount"] = formatNumber(remittance["amount"]);
    if (remittance["status"] === 1) {
      remittance["status"] = "success";
    } else if (remittance["status"] === 0) {
      remittance["status"] = "failed";
    }
    return remittance;
  });

  return (
    <>
{/* 
      <Widget>
        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">

          <div className="w-full lg:w-1/4">
            <Widget1
              color="green"
              title="2020"
              // description={formatNumber(data[0].totalRemittance)}
              right={<Icons.TotalRemittance />}
            />
          </div>

          <div className="w-full lg:w-1/4">
            <Widget1
              color="red"
              title="Pending Remittance"
              // description={formatNumber(data[0].pendingRemittance)}
              right={<Icons.PendingRemittance />}
            />
          </div>

          <div className="w-full lg:w-1/4">
            <Widget1
              color="blue"
              title="Revenue Items"
              // description={formatNumber(data[0].revenueItems)}
              right={<Icons.RevenueItems />}
            />
          </div>

          <div className="w-full lg:w-1/4">
            <Widget1
              color="yellow"
              title="Tax receipts"
              // description={formatNumber(data[0].taxReceipts)}
              right={<Icons.TaxReceipt />}
            />
          </div>
        </div>

      </Widget> */}


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
                    {remittance[field.key]}
                    {/* <Link href={`/dashboard/${remittance["ref"]}`}>
                      <a className="hover:text-blue-500">
                        {remittance[field.key]}
                      </a>
                    </Link> */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-16"></div>
        <hr />
        <div className="flex justify-end">
          <p className="px-6 font-semibold">Total</p>

          <div className="flex flex-col">
            <p className="px-6 pb-1">employees</p>
            <p className="self-center font-semibold">{totalemployees}</p>
          </div>

          <div className="flex flex-col">
            <p className="px-6 pb-1">Gross Salary</p>
            {/* <p className="self-center font-semibold">{formatNumber(grosssum)}</p> */}
          </div>

          <div className="flex flex-col">
            <p className="px-6 pb-1">Expected</p>
            <p className="self-center font-semibold">{formatNumber(totaltax)}</p>
          </div>

          <p className="px-6">Variance</p>
        </div>
        {/* <div>{total}</div> */}
      </Widget>
    </>
  );
};
