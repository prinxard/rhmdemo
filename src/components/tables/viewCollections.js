import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";

const fields = [
  {
    name: "Revenue Item",
    key: "revenueItem",
  },
  {
    name: "Name",
    key: "taxpayerName",
  },
  {
    name: "Address",
    key: "taxpayerAddress",
  },
  {
    name: "Station",
    key: "station",
  },
  {
    name: "Amount",
    key: "amount",
  },
  {
    name: "MDA",
    key: "mda",
  },
  {
    name: "Transaction Date",
    key: "tran_date",
  },
];

export const ViewCollectionsTable = ({ remittance }) => {
  let items = remittance;
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

                    {/* <Link href={`/view/individual/${remittance.KGTIN}`}>
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

      </Widget>
    </>
  );
};

const singleFields = [
  {
    name: 'KGTIN',
    key: 'KGTIN',
  },
  {
    name: 'Title',
    key: 'indv_title',
  },
  {
    name: 'Surname',
    key: 'surname',
  },
  {
    name: 'First Name',
    key: 'first_name',
  },
  {
    name: 'Gender',
    key: 'gender',
  },
  {
    name: 'Marital Status',
    key: 'marital_status',
  },
  {
    name: 'BVN',
    key: 'bvn',
  },
  {
    name: 'Birth Date',
    key: 'birth_date',
  },

  {
    name: 'Birth Place',
    key: 'birth_place',
  },

  {
    name: 'Occupation',
    key: 'occupation',
  },
  {
    name: 'city',
    key: 'city',
  },
  {
    name: 'LGA',
    key: 'lga',
  },
  {
    name: 'Phone',
    key: 'phone_number',
  },
  {
    name: 'Employer Name',
    key: 'employer_name',
  },
];

export const ViewCollectionsSingleTable = ({ indvdata }) => {
  const items = indvdata;
  console.log(items);

  return (
    <>
      <Widget>
        <div className="flex justify-start mb-4">
          <div className="m-3 bg-green-400 text-white rounded-full">
            <CustomButton type="Submit">
              Print Certificate
            </CustomButton>
          </div>
          <div className="m-3 bg-green-400 text-white rounded-full">
            <CustomButton type="Submit">
            {items.map((ind, i) => (
                  <Link href={`/update-user/${ind.KGTIN}`} key={i}> Update User</Link>
                ))}
            </CustomButton>
          </div>
        </div>
        <div className="w-2/3 flex mx-auto rounded border">

          <table className="table">

            <tbody className="divide-y ">
              <tr className="">
                <td>KGTIN</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.KGTIN}</td>
                ))}
              </tr>

              <tr className="">
                <td>Title</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.indv_title}</td>
                ))}
              </tr>

              <tr className="">
                <td>Gender</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.gender}</td>
                ))}
              </tr>

              <tr className="">
                <td>Marital Status</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.marital_status}</td>
                ))}
              </tr>

              <tr className="">
                <td>Surname</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.surname}</td>
                ))}
              </tr>

              <tr className="">
                <td>First Name</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.first_name}</td>
                ))}
              </tr>

              <tr className="">
                <td>Middle Name</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.middle_name}</td>
                ))}
              </tr>

              <tr className="">
                <td>Date of Birth</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.birth_date}</td>
                ))}
              </tr>

              <tr className="">
                <td>Place of Birth</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.birth_place}</td>
                ))}
              </tr>

              <tr className="">
                <td>Nationality</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.nationality}</td>
                ))}
              </tr>

              <tr className="">
                <td>State of Origin</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.stateOfOrigin}</td>
                ))}
              </tr>

              <tr className="">
                <td>State of Residence</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.stateOfResidence}</td>
                ))}
              </tr>

              <tr className="">
                <td>Occupation</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.occupation}</td>
                ))}
              </tr>

              <tr className="">
                <td>Phone</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.phone_number}</td>
                ))}
              </tr>

              <tr className="">
                <td>Email</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.email}</td>
                ))}
              </tr>

              <tr className="">
                <td>Tax Office</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.tax_office}</td>
                ))}
              </tr>

              <tr className="">
                <td>Tax Authority</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.tax_authority}</td>
                ))}
              </tr>

            </tbody>
          </table>

        </div>
      </Widget>
    </>
  );
};