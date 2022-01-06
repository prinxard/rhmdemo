import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import Link from "next/link";

const fields = [
  {
    name: "Tax ID",
    key: "id",
  },
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
  // {
  //   name: "Remark",
  //   key: "remark",
  // },
];
// const fields = [{ name: "title" }, { name: "userId" }];

export const ViewAnnualTable = ({ remittance, totalemployees, totaltax, grosssum }) => {
  let items = remittance;
  remittance.map((remittance) => {
    remittance["amount"] = formatNumber(remittance["amount"]);
    if (remittance["status"] === 1) {
      remittance["status"] = "success";
    } else if (remittance["status"] === 0) {
      remittance["status"] = "failed";
    }
    return remittance;
  });
  // console.log(items);

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

            {/* {items.length > 0 && (            
              <tr className="font-semibold">
                
                 <tr><td></td></tr>
                 <tr><td></td></tr>
                 <tr><td></td></tr>
                 <tr><td></td></tr>
                 <tr><td></td></tr>
                 <tr><td></td></tr>
                 <tr><td></td></tr>
                 <tr><td></td></tr>
                 <tr><td></td></tr>
               
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td>{formatNumber(total)}</td>
              </tr>
            )} */}

            {/* {posts.map((post, i) => (
              <tr key={post.id} className="">
                {fields.map((field, j) => (
                  <td key={j} className="">
                    <Link href={`/view/annual/${post.id}`}>
                      <a className="hover:text-blue-500">{post.title}</a>
                    </Link>
                  </td>
                ))}
              </tr>
            ))} */}
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
