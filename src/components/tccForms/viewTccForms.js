import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import { SelectAnnual } from "../forms/selects";
import SectionTitle from "../section-title";
import { useEffect, useState } from "react";
import { FiTriangle } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import url from '../../config/url';
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormatMoneyComponent } from "../FormInput/formInputs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const StartTcc = () => {
  const [kgtEnentered, setKgtEentered] = useState('')
  const [validkgtinmessage, Setvalidkgtinmessage] = useState('')
  const [invalidkgtinmessage, Setinvalidkgtinmessage] = useState('')
  const [disabled, setDisabled] = useState(true);
  const [validmsg, setvalidmsg] = useState("hidden");
  const [invalidmsg, setinvalidmsg] = useState("hidden");
  const [payerDetails, setpayerDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(() => false);
  const [isFetching2, setIsFetching2] = useState(() => false);
  const [assessmentData, setAssessmentData] = useState([]);
  const [assessmentData2, setAssessmentData2] = useState([]);
  const [assessmentData3, setAssessmentData3] = useState([]);
  const router = useRouter();



  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const watchAllFields = watch();
  const watchYear1 = watch("year1", new Date);
  const watchYear2 = watch("year2", new Date());
  const watchYear3 = watch("year3", new Date());

  const userKGTN = payerDetails.map(function (det) {
    let kgtin = det.KGTIN
    return kgtin
  })

  const KGTIN = userKGTN[0]

  setAuthToken();
  const verifiyKGTIN = async () => {
    let testkgtin = kgtEnentered
    let kgtin = {
      "KGTIN": `${testkgtin}`
    }
    setIsFetching(true)
    try {
      let res = await axios.post(`${url.BASE_URL}taxpayer/view-individual`, kgtin);
      setIsFetching(false)
      let userpayer = res.data.body
      setpayerDetails(userpayer)
      Setvalidkgtinmessage("KGTIN is Valid");
      setDisabled(false)
      setvalidmsg('')
      setinvalidmsg('hidden')
    } catch (err) {
      setIsFetching(false)
      setDisabled(true)
      setinvalidmsg('')
      setvalidmsg('hidden')
      Setinvalidkgtinmessage("Invalid KGTIN");
    }
  };

  setAuthToken();
  useEffect(() => {
    const kgtinYear = {
      year: `${(watchYear1).getFullYear()}`,
      kgtin: `${KGTIN}`
    }
    console.log(kgtinYear);
    const fetchPostYear1 = async () => {
      setIsFetching2(true)
      try {
        let res = await axios.post(`${url.BASE_URL}forma/view-tax-income`, kgtinYear);
        res = res.data.body
        let assessment = res.assessment
        console.log(assessment);
        setAssessmentData(assessment)
        setIsFetching2(false)

      } catch (e) {
        setIsFetching2(false)
        console.log(e);
      }
    };
    fetchPostYear1();

  }, [watchYear1.getFullYear()]);


  useEffect(() => {
    const kgtinYear = {
      year: `${(watchYear2).getFullYear()}`,
      kgtin: `${KGTIN}`
    }
    console.log(kgtinYear);
    const fetchPostYear2 = async () => {
      setIsFetching2(true)
      try {
        let res = await axios.post(`${url.BASE_URL}forma/view-tax-income`, kgtinYear);
        res = res.data.body
        let assessment = res.assessment
        setAssessmentData2(assessment)
        setIsFetching2(false)

      } catch (e) {
        setIsFetching2(false)
        console.log(e);
      }
    };
    fetchPostYear2();

  }, [watchYear2.getFullYear()]);


  useEffect(() => {
    const kgtinYear = {
      year: `${(watchYear3).getFullYear()}`,
      kgtin: `${KGTIN}`
    }

    const fetchPostYear3 = async () => {
      setIsFetching2(true)
      try {
        let res = await axios.post(`${url.BASE_URL}forma/view-tax-income`, kgtinYear);
        res = res.data.body
        let assessment = res.assessment
        setAssessmentData3(assessment)
        setIsFetching2(false)

      } catch (e) {
        setIsFetching2(false)
        console.log(e);
      }
    };
    fetchPostYear3();

  }, [watchYear3.getFullYear()]);

  setAuthToken();
  const onSubmitform = data => {
    if (watchYear1.getFullYear() === watchYear2.getFullYear() || watchYear1.getFullYear() === watchYear3.getFullYear() || watchYear2.getFullYear() === watchYear3.getFullYear()) {
      alert("Cannot have same year twice")
    } else {
      alert("completely different years")
      console.log(data);
    }
    console.log(data);
    // const userkgtin = kgtEnentered
    // const year = data.year;
    // let createAsses = {
    //   "year": `${year}`,
    //   "kgtin": `${KGTIN}`
    // }
    // setIsFetching2(true)
    // try {
    //   const res = await axios.post(`${url.BASE_URL}forma/new-assessment`, createAsses);
    //   let assessment_id = res.data.body.assessment_id
    //   setIsFetching2(false)
    //   router.push(`/direct-asses/${assessment_id},${KGTIN}`)
    //   console.log("Assesment Created");
    // }
    // catch (err) {
    //   setIsFetching2(false)
    //   console.log(err);
    // }
  };

  return (
    <>
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
          <p className="font-bold">Processing...</p>
        </div>
      )}


      <div className="border mb-3 block p-6 rounded-lg bg-white w-full">
        <div className="flex justify-around">
          <div>
            <label className="block" htmlFor="kgtin">Enter Taxpayer KGTIN</label>
            <input onChange={event => setKgtEentered(event.target.value)} type="text" placeholder="Enter KGTIN" />
            <div className="">
              {payerDetails.map((ind, i) => (
                <small className={`${validmsg}`} key={i}>{ind.surname} {ind.first_name}</small>
              ))}
            </div>

            <div className="">
              <small className={`text-red-600 ${invalidmsg}`}>{invalidkgtinmessage}</small>
            </div>
          </div>
          <div className="self-center ml-2">
            <a
              onClick={verifiyKGTIN}
              style={{ backgroundColor: "#84abeb" }}
              className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
            >
              Verify KGTIN
            </a>
          </div>
        </div>

      </div>
      <form onSubmit={handleSubmit(onSubmitform)}>

        <div className="flex border mb-3 block p-3 rounded-lg bg-white w-full">

          <div className="">

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>Taxpayer:</label>
              {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input disabled type="text" placeholder="Taxpayer name" />
                :
                <div>

                  {payerDetails.map((ind, i) => (
                    <input name="taxpayername" disabled type="text" defaultValue={`${ind.surname} ${ind.first_name}`} className="form-control w-full rounded"
                    />
                  ))}
                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>KGTIN:</label>
              {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input disabled type="text" placeholder="KGTIN" />
                :
                <div>

                  {payerDetails.map((ind, i) => (
                    <input name="taxpayername" disabled type="text" defaultValue={ind.KGTIN} className="form-control w-full rounded"
                    />
                  ))}
                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label htmlFor="employername">File no:</label>
              <input name="file_no" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label htmlFor="employername">Tax Office:</label>

              {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input disabled type="text" placeholder="Tax Station" />
                :
                <div>

                  {payerDetails.map((ind, i) => (
                    <input name="taxpayername" disabled type="text" defaultValue={ind.tax_office} className="form-control w-full rounded"
                    />
                  ))}
                </div>
              }

            </div>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <label htmlFor="employername">Processing Fee:</label>
              <input placeholder="₦" name="fee" type="text" className="form-control w-full rounded"
              />
            </div>
          </div>
        </div>
        {isFetching2 && (
          <div className="flex justify-center item mb-2">
            <Loader
              visible={isFetching2}
              type="BallTriangle"
              color="#00FA9A"
              height={19}
              width={19}
              timeout={0}
              className="ml-2"
            />
            <p className="font-bold">Processing...</p>
          </div>
        )}
        <div className={`flex justify-between border mb-3 rounded-lg bg-white w-full`}>

          <div className="p-3">
            {/* <h6 className="text-right mb-6">Year 1</h6> */}
            <div className="mb-6 grid grid-cols-2 ">
              <label>Assessment year </label>
              <Controller
                name="year1"
                control={control}
                defaultValue={new Date()}
                render={({ onChange, value }) => {
                  return (
                    <DatePicker
                      className="form-control w-full rounded"
                      onChange={onChange}
                      selected={value}
                      showYearPicker
                      dateFormat="yyyy"
                      yearItemNumber={4}
                    />
                  );
                }}
              />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Tax Payable </label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input disabled className="form-control w-full rounded" type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData.map((ele, i) => (
                    <input disabled name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }

            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Income from employment</label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData.map((ele, i) => (
                    <input disabled name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Income from Trade/Professional</label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData.map((ele, i) => (
                    <input disabled name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Other Income</label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData.map((ele, i) => (
                    <input disabled name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Assessment ID</label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" disabled type="text" placeholder="Assessment ID" />
                :
                <div>

                  {assessmentData.map((ele, i) => (
                    <input disabled name="other_income" className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>
          </div>

          <div className="p-3 grid justify-items-stretch">
          {/* <h6 className="text-right mb-6">Year 2</h6> */}
            <div className="mb-6 justify-self-center">
              
              <Controller
                name="year2"
                control={control}
                defaultValue={new Date()}
                render={({ onChange, value }) => {
                  return (
                    <DatePicker
                      className="form-control w-full rounded"
                      onChange={onChange}
                      selected={value}
                      showYearPicker
                      dateFormat="yyyy"
                      yearItemNumber={4}

                    />
                  );
                }}
              />
            </div>
            <div className="mb-6 justify-self-center">
              
              {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData2.map((ele, i) => (
                    <input disabled name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} ref={register()} type="text"
                    />
                  ))}
                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">
              
              {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData2.map((ele, i) => (
                    <input disabled name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} ref={register()} type="text"
                    />
                  ))}
                </div>
              }
            </div>


            <div className="mb-6 justify-self-center">
              
              {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData2.map((ele, i) => (
                    <input disabled name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} ref={register()} type="text"
                    />
                  ))}
                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">
              
              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input disabled name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">
              
              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" disabled type="text" placeholder="Assessment ID" />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input disabled name="other_income" className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

          </div>

          <div className="p-3 grid justify-items-stretch">
          {/* <h6 className="text-right mb-6">Year 3</h6> */}
            <div className="mb-6 justify-self-center">
              
              <Controller
                name="year3"
                control={control}
                defaultValue={new Date()}
                render={({ onChange, value }) => {
                  return (
                    <DatePicker
                      className="form-control w-full rounded"
                      onChange={onChange}
                      selected={value}
                      showYearPicker
                      dateFormat="yyyy"
                      yearItemNumber={4}
                      placeholderText="Enter Year"
                    />
                  );
                }}
              />
            </div>

            <div className="mb-6 justify-self-center">
              
              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input disabled name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">
             
              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input disabled name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} ref={register()} type="text"
                    />
                  ))}
                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">
              
              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input disabled name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} ref={register()} type="text"
                    />
                  ))}
                </div>
              }
            </div>
            <div className="mb-6 justify-self-center">
              
              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" disabled type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input disabled name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">
             
              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" disabled type="text" placeholder="Assessment ID" />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input disabled name="other_income" className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            style={{ backgroundColor: "#84abeb" }}
            className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          // disabled={disabled}
          >
            Create TCC
          </button>
        </div>
      </form>
    </>
  );
};

export default StartTcc;
