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
    name: "KGTIN",
    key: "KGTIN",
  },
  {
    name: "JTB TIN",
    key: "jtb_tin",
  },
  {
    name: "Reg Name",
    key: "regist_name",
  },
  {
    name: "Type of Org",
    key: "type_of_organisation",
  },
  {
    name: "Tax Office",
    key: "tax_office",
  },
  {
    name: "Tax Authority",
    key: "tax_authority",
  },
  {
    name: "Phone",
    key: "phone_no",
  },
];

export const ViewNonIndividualTable = ({ remittance }) => {
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
                    {/* {remittance[field.key]} */}

                    <Link href={`/view/nonindividual/${remittance.KGTIN}`}>
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

export const ViewSingleNonIndividualTable = ({ indvdata }) => {
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
              Update User
              {/* <Link href={`/update-user/${ind.KGTIN}`} key={i}> Update User</Link> */}

            </CustomButton>
          </div>
        </div>
        <div className="w-2/3 flex mx-auto rounded border">
          <table className="table striped">

            <tbody className="divide-y ">
              <tr className="">
                <td>KGTIN</td>
                <td>{items.KGTIN}</td>
              </tr>
              <tr className="">
                <td>Company TIN</td>
                <td>{items.companytin}</td>
              </tr>
              <tr className="">
                <td>Company Name</td>
                <td>{items.coy_name}</td>
              </tr>
              <tr className="">
                <td>City</td>
                <td>{items.city}</td>
              </tr>
              <tr className="">
                <td>Date of incorporation</td>
                <td>{items.date_of_incorporation}</td>
              </tr>
              <tr className="">
                <td>Line of Business</td>
                <td>{items.line_of_business}</td>
              </tr>
              <tr className="">
                <td>Type of Organization</td>
                <td>{items.type_of_organisation}</td>
              </tr>
              <tr className="">
                <td>Enterprise Reg No</td>
                {items.enterprise_reg_no == null || items.enterprise_reg_no == "" ?
                  <td>-</td>
                  : <td>{items.enterprise_reg_no}</td>}
              </tr>
              <tr className="">
                <td>RC No</td>
                {items.rcno == null || items.rcno == "" ?
                  <td>-</td>
                  : <td>{items.rcno}</td>}
              </tr>
              <tr className="">
                <td>State</td>
                <td>{items.state}</td>
              </tr>
              <tr className="">
                <td>Tax Authority</td>
                <td>{items.tax_authority}</td>
              </tr>
              <tr className="">
                <td>Tax Office</td>
                <td>{items.tax_office}</td>
              </tr>
              <tr className="">
                <td>LGA</td>
                <td>{items.lga}</td>
              </tr>
              <tr className="">
                <td>Phone</td>
                {items.phone_no == null || items.phone_no == "" ?
                  <td>-</td>
                  : <td>{items.phone_no}</td>}
              </tr>
              <tr className="">
                <td>Email</td>
                {items.e_mail == null || items.e_mail == "" ?
                  <td>-</td>
                  : <td>{items.e_mail}</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};