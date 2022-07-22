import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import setAuthToken from '../../functions/setAuthToken';
import url from '../../config/url';
import axios from "axios";
import Loader from 'react-loader-spinner';
import SectionTitle from '../../components/section-title';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FormatMoneyComponentReport } from '../../components/FormInput/formInputs';
import { formatNumber } from '../../functions/numbers';
import { Add, AddCircleOutlineRounded, Refresh } from '@material-ui/icons';

export default function Revise() {
  const [payerDetails, setpayerDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(() => false);
  const [isFetching2, setIsFetching2] = useState(() => false);
  const [bojErrors, setErrors] = useState(() => []);
  const [bojData, setBojData] = useState(() => []);
  const [employed, setEmployed] = useState('');
  const [self_employed, setSelfEmployed] = useState('');
  const [routerAssId, setAssessId] = useState('');
  const [fixedValues, fixValues] = useState({ amount: 0 });
  const [fixedValues2, fixValues2] = useState({ amount: 0 });
  const [fixedValues3, fixValues3] = useState({ amount: 0 });
  const [fixedValues4, fixValues4] = useState({ amount: 0 });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'books',
  })

  let selfemplFigureInit = watch("self_employment", "")
  let emplFigureInit = watch("employment", "");
  let otherIncomeFigureInit = watch("other_income", "")

  let selfemplFigure = selfemplFigureInit.replace(/,/g, '')
  let emplFigure = emplFigureInit.replace(/,/g, '')
  let otherIncomeFigure = otherIncomeFigureInit.replace(/,/g, '')

  //taxcal
  let tax;
  let tax_paid;

  ///TAX CAL
  let employedF = emplFigure;
  let selfEmployedF = selfemplFigure;
  let otherIncomeF = otherIncomeFigure

  let consolidatedRelief;
  let chargeableIncome;
  let totalRelief;
  let totalDeduction;
  let consolidatedIncome

  let dev_levy

  consolidatedIncome = (Number(selfEmployedF) + Number(employedF) + Number(otherIncomeF));
  // console.log("Consl", consolidatedIncome);

  totalRelief = 0;
  let gross_inc = consolidatedIncome - totalRelief;

  // console.log(gross_inc, ' gross')


  if (consolidatedIncome < 300000.0) {
    consolidatedRelief = 0;
    //console.log(gross_inc);
  } else {
    consolidatedRelief = 200000 + 0.2 * gross_inc;
    // console.log("Gross INC", gross_inc);
  }

  totalDeduction = consolidatedRelief + totalRelief;
  chargeableIncome = consolidatedIncome - totalDeduction;

  //calculate tax
  if (consolidatedIncome <= 300000.0) {
    tax = consolidatedIncome * 0.01;

    //console.log(tax+' 1');
  } else if (consolidatedIncome > 300000 && chargeableIncome < 300000) {
    tax = (chargeableIncome * 0.07);
    let taxS = (consolidatedIncome * 0.01);
    if (tax > taxS) {
      tax = tax
    }
    else {
      tax = taxS;
    }
    //console.log(tax+' tax2');
  } else if (chargeableIncome > 300000 && chargeableIncome <= 600000) {
    tax = 300000 * 0.07 + (chargeableIncome - 300000) * 0.11;

    //console.log(tax+' tax3');
  } else if (chargeableIncome > 600000 && chargeableIncome <= 1100000) {
    tax = 300000 * 0.07 + 300000 * 0.11 + (chargeableIncome - 600000) * 0.15;

    //console.log(tax + ' 4');
  } else if (chargeableIncome > 1100000 && chargeableIncome <= 1600000) {
    tax =
      300000 * 0.07 +
      300000 * 0.11 +
      500000 * 0.15 +
      (chargeableIncome - 1100000) * 0.19;

    //console.log(tax + ' 5');
  } else if (chargeableIncome > 1600000 && chargeableIncome <= 3200000) {
    tax =
      300000 * 0.07 +
      300000 * 0.11 +
      500000 * 0.15 +
      500000 * 0.19 +
      (chargeableIncome - 1600000) * 0.21;

    //console.log(tax + ' 6');
  } else if (chargeableIncome > 3200000) {
    tax =
      300000 * 0.07 +
      300000 * 0.11 +
      500000 * 0.15 +
      500000 * 0.19 +
      1600000 * 0.21 +
      (chargeableIncome - 3200000) * 0.24;

    //console.log(tax + ' 7');
  }

  tax = tax;
  // console.log(tax, ' 2')
  // tax = parseInt(tax);
  // tax = (tax).toFixed(2);
  tax_paid = tax;

  let JsonTax = String(tax_paid)

  if (tax_paid <= 50000) {
    dev_levy = "500"
  } else {
    dev_levy = "1000"
  }

  let TotalIncome = Number(emplFigure) + Number(selfemplFigure) + Number(otherIncomeFigure)

  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split('_').shift()
      let assessId = routerData.split('_').pop()
      console.log("kgtin", kgtin);
      console.log("assessId", assessId);
      setAssessId(assessId)
      let kgtinPost = {
        "KGTIN": `${kgtin}`
      }

      setAuthToken();
      const fetchPost = async () => {
        setIsFetching(true)
        try {
          let res = await axios.post(`${url.BASE_URL}taxpayer/view-taxpayers`, kgtinPost);
          let IndData = res.data.body
          console.log("IndData", IndData);
          setpayerDetails(IndData)
          setIsFetching(false);
        } catch (err) {
          console.log(err);
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);

  return (
    <>
      <SectionTitle subtitle="Create Revised Assessment" />
      {isFetching && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p>Fetching data...</p>
        </div>
      )}


      <div className="border mb-3 block p-8 rounded-lg bg-white w-full">
        <div className="flex">
          <h6 className="p-2">Taxpayer Information</h6>
          {/* <a href="" className="text-blue-600 self-center">Edit</a> */}
        </div>
        <p className="mb-3 font-bold"></p>
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <p>Name</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.tp_name} disabled />
            </div>

            <div className="form-group mb-6">
              <p>KGTIN</p>

              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.KGTIN} disabled />
            </div>

            <div className="form-group mb-6">
              <p>Email</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.email} disabled />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Phone</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.phone_number} disabled />
            </div>

            <div className="form-group mb-6">
              <p>Tax Office</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.tax_office} disabled />
            </div>
            <div className="form-group mb-6">
              <p>Taxpayer Type</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.tp_type} disabled />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <p>Address</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.address} disabled />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">

        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
          <div className="w-full lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
            <form action="">
              <div className="mb-2">
                <label className="" htmlFor="kgtin"> Assessment ID</label>
                <input type="text" defaultValue={routerAssId} readOnly ref={register()} name="assessment_id" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>

              <div className="mb-2">
                <label className="" htmlFor="kgtin"> Reason for revised assessment</label>
                <textarea ref={register()} name="grounds" className="form-control w-full rounded font-light text-gray-500"
                > </textarea>
              </div>

              <div className="">
                <hr />
              </div>
            </form>

            <div className="my-2 grid grid-cols-2 gap-2">
              <label className="self-center">Self Employment Income:</label>
              <FormatMoneyComponentReport
                ref={register()}
                name="self_employment"
                control={control}
                defaultValue={""}
                onValueChange={(v) => fixValues({ amount: v })}
                placeholder="₦ Enter Income"
              />
            </div>
            <div className="mb-2 grid grid-cols-2 gap-2">
              <label className="self-center"> Employment Income:</label>
              <FormatMoneyComponentReport
                ref={register()}
                name="employment"
                control={control}
                defaultValue={""}
                onValueChange={(v) => fixValues2({ amount: v })}
                placeholder="₦ Enter Income"
              />
            </div>

            <div className="mb-2 grid grid-cols-2 gap-2">
              <label className="self-center">Other Income:</label>
              <FormatMoneyComponentReport
                ref={register()}
                name="other_income"
                control={control}
                defaultValue={""}
                onValueChange={(v) => fixValues3({ amount: v })}
                placeholder="₦ Enter Income"
              />
            </div>
            <div className="mb-2 grid grid-cols-2 gap-2">
              <label className="self-center font-bold">Total Income:</label>
              <p className="font-bold">{formatNumber(TotalIncome)}</p>
            </div>
            <div className="mb-2 grid grid-cols-2 gap-2">
              <label className="self-center font-bold">Tax:</label>
              <p className="font-bold">{formatNumber(JsonTax)}</p>
            </div>
            <div className="mb-2 grid grid-cols-2 gap-2">
              <label className="self-center font-bold">Dev levy:</label>
              <p className="font-bold">{formatNumber(dev_levy)}</p>
            </div>
            <div className="mb-2 grid grid-cols-2 gap-2">
              <label className="self-center font-bold">Total Tax Due for Payment:</label>
              <p className="font-bold">{formatNumber(Number(JsonTax) + Number(dev_levy))}</p>
            </div>
          </div>


          <div className="w-full lg:w-1/2">
            <div className="overflow-x-auto max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
              <p className="font-bold text-center mb-5">Upload Supporting Documents</p>

              <form>
                <div className="flex justify-between mb-5">
                  <p>Application letter </p>
                  <input
                    type="file"
                    className="hidden"
                    id='customFile'
                    name="application_letter"
                    // ref={register()}
                    // onChange={onChange}
                    // onClick={(e) => (e.target.value = null)}
                    required
                  />

                  <div className="flex justify-evenly">

                    {/* <p className="self-center">{file ? file.name : ""}</p> */}

                    <label
                      htmlFor='customFile'
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                    >
                      Select File
                    </label>

                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                      type="submit"
                    >
                      Submit
                    </button>

                    {/* {uploadedFile ? (
                      <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                        <FiCheck
                          size={15}
                          className="stroke-current text-green-500"
                        />
                      </span>) : null} */}

                  </div>
                </div>
              </form>
              <hr />

              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <ul>
                  {/* Here we loop thru fields array and render each field as item, and we get the index as a second parameter */}
                  {fields.map((item, index) => (
                    // Make sure you set the key to something unqiue
                    <li key={item.id} className="my-2">
                      <Controller
                        name={`books.${index}.value`}
                        control={control}
                        defaultValue={item.value}
                        render={({ field }) =>
                          <select {...field}>
                            <option value="">Please select</option>
                          </select>
                          // <input {...field} />
                        }
                      />
                      <label
                        htmlFor='customFile'
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                      >
                        Select File
                      </label>
                      <button
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                        type="submit"
                      >
                        Submit
                      </button>
                      <button onClick={() => remove(index)} className="btn btn-default text-dark btn-outlined bg-transparent rounded-md mx-2">Delete</button>
                    </li>
                  ))}
                </ul>
                <button type="button" className="mt-2" onClick={() => append({ value: "" })}>
                  <span> <AddCircleOutlineRounded /></span> <span>Add Document</span>
                </button>
                {/* <button type="submit">Buy</button> */}
              </form>

              <div className="my-4">
                <button className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>



      </div>

    </>
  )
}
