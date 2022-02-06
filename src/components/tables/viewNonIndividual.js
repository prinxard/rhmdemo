import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";

const fields = [
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
        <div className="w-2/3 flex mx-auto rounded border">

          <table className="table">

            <tbody className="divide-y ">
              <tr className="">
               <td className="">Test1</td>
               <td>Test</td>
              </tr>
              <tr className="">
               <td>Test1</td>
               <td>Test</td>
              </tr>
              <tr className="">
               <td>Test1</td>
               <td>Test</td>
              </tr>
              <tr className="">
               <td>Test1</td>
               <td>Test</td>
              </tr>
              <tr className="">
               <td>Test1</td>
               <td></td>
              </tr>
              <tr className="">
               <td>Test1</td>
               <td></td>
              </tr>
              <tr className="">
               <td>Test1</td>
               <td>Test</td>
              </tr>
            </tbody>
          </table>
       
        </div>
        <div className="flex justify-end">
            <div className="m-3 bg-green-400 text-white rounded-full">
              <CustomButton type="Submit">
                Print certificate
              </CustomButton>
            </div>
            <div className="m-3 bg-green-400 text-white rounded-full">
              <CustomButton type="Submit">
                Edit
              </CustomButton>
            </div>
          </div>
      </Widget>
    </>
  );
};