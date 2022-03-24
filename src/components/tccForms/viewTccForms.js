import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Link from 'next/link';
import { useEffect, useState } from "react";
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
import { SubmitButton } from "../CustomButton/CustomButton";
import { FiCheck } from 'react-icons/fi';

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
    setIsFetching2(true)
    let createTCC = {
      file_ref: data.file_ref,
      prc_fee: data.prc_fee,
      tp_id: data.tp_id,
      assmt_1: data.assmt_1,
      assmt_2: data.assmt_2,
      assmt_3: data.assmt_3
    }
    if (watchYear1.getFullYear() === watchYear2.getFullYear() || watchYear1.getFullYear() === watchYear3.getFullYear() || watchYear2.getFullYear() === watchYear3.getFullYear()) {
      alert("Cannot have same year twice")
      setIsFetching2(false)
    } else {
      try {
        axios.post(`${url.BASE_URL}forma/tcc`, createTCC);
        setIsFetching2(false)
      } catch (e) {
        setIsFetching2(false)
        console.log(e);
      }
    }


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
              {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input ref={register()} readOnly name="taxpayername" type="text" placeholder="Taxpayer name" />
                :
                <div>

                  {payerDetails.map((ind, i) => (
                    <input ref={register()} name="taxpayername" readOnly type="text" defaultValue={`${ind.surname} ${ind.first_name}`} className="form-control w-full rounded"
                    />
                  ))}
                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>KGTIN:</label>
              {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input ref={register()} readOnly name="tp_id" type="text" placeholder="KGTIN" />
                :
                <div>

                  {payerDetails.map((ind, i) => (
                    <input ref={register()} name="tp_id" readOnly type="text" defaultValue={ind.KGTIN} className="form-control w-full rounded"
                    />
                  ))}
                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>File no:</label>
              <input ref={register({ required: "File no is required" })} name="file_ref" type="text" className="form-control w-full rounded"
              />
              {errors.file_ref && <p className="text-red-600">{errors.file_ref.message}</p>}
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label htmlFor="employername">Tax Office:</label>

              {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input ref={register()} readOnly type="text" name="tax_office" placeholder="Tax Station" />
                :
                <div>

                  {payerDetails.map((ind, i) => (
                    <input ref={register()} name="tax_office" readOnly type="text" defaultValue={ind.tax_office} className="form-control w-full rounded"
                    />
                  ))}
                </div>
              }

            </div>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <label htmlFor="employername">Processing Fee:</label>
              <input ref={register()} placeholder="₦" name="prc_fee" type="text" className="form-control w-full rounded"
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
            <h6 className="text-right mb-6">Year 1</h6>
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
                      yearItemNumber={8}
                    />
                  );
                }}
              />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Tax Payable </label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input readOnly className="form-control w-full rounded" type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData.map((ele, i) => (
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} ref={register()} type="text"
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
                    <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Assessment ID</label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" ref={register()} name="assmt_1" readOnly type="text" placeholder="Assessment ID" />
                :
                <div>

                  {assessmentData.map((ele, i) => (
                    <input readOnly name="assmt_1" ref={register()} className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
                    />
                  ))}

                </div>
              }
            </div>
          </div>

          <div className="p-3 grid justify-items-stretch">
            <h6 className="text-center mb-6">Year 2</h6>
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

              {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData2.map((ele, i) => (
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} ref={register()} type="text"
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
                    <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">

              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_2" ref={register()} type="text" placeholder="Assessment ID" />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input readOnly name="assmt_2" ref={register()} className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
                    />
                  ))}

                </div>
              }
            </div>

          </div>

          <div className="p-3 grid justify-items-stretch">
            <h6 className="text-center mb-6">Year 3</h6>
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

              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} ref={register()} type="text"
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
                    <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">

              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_3" ref={register()} type="text" placeholder="Assessment ID" />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input readOnly name="assmt_3" ref={register()} className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
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


export const UploadTccForms = () => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);
  const [file7, setFile7] = useState(null);
  const [file8, setFile8] = useState(null);
  const [file9, setFile9] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [uploadedFile2, setUploadedFile2] = useState(false);
  const [isFetching, setIsFetching] = useState(() => false);
  const [uploadErrors, setUploadErrors] = useState(() => []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const onChange = e => {
    const file = e.target.files[0]
    if (file) {
      if (!file) {
        setFile(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile(null);
        return;
      }
      if (file.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile(file);
      }
    }
  };

  const onChange2 = e => {
    const file2 = e.target.files[0]
    if (file2) {
      if (!file2) {
        setFile2(null);
        return;
      }
      if (file2.type !== "image/jpeg" && file2.type !== "application/pdf" && file2.type !== "image/png") {
        alert("file2 type not allowed. only pdf, png and jpeg are allowed");
        setFile2(null);
        return;
      }
      if (file2.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile2(file2);
      }
    }
  };

  const onSubmitform = async data => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('item', 'application_letter');
    formData.append('tcc_id', 1);
    formData.append('doc', file.name);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/tcc-uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      setUploadedFile(true);
      toast.success("Upload Successful!")
    } catch (error) {
      toast.error("Failed to upload!")
      setUploadedFile(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        setUploadedFile(false);
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitform2 = async data => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('item', 'payslip');
    formData.append('tcc_id', 1);
    formData.append('doc', file2.name);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/tcc-uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      setUploadedFile(true);
      toast.success("Upload Successful!")
    } catch (error) {
      toast.error("Failed to upload!")
      setUploadedFile(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        setUploadedFile(false);
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  return (
    <>

      <ToastContainer />

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
          <p className="font-bold">Uploading...</p>
        </div>
      )}
      <h6 className="p-2 font-bold">Upload Documents</h6>
      <Widget>
        <div>
          <form onSubmit={handleSubmit(onSubmitform)}>
            <div className="flex justify-between mb-5">
              <p>Application letter </p>
              <input
                type="file"
                className="hidden"
                id='customFile'
                name="application_letter"
                ref={register()}
                onChange={onChange}
                onClick={(e) => (e.target.value = null)}
                required
              />

              <div className="flex justify-evenly">

                <p className="self-center">{file ? file.name : ""}</p>

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

                {uploadedFile ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form>

          <hr className="mb-2" />

          <form onSubmit={handleSubmit(onSubmitform2)}>
            <div className="flex justify-between mb-5">
              <p>Payslip or salary schedule</p>
              <input
                type="file"
                className="hidden"
                id='customFile2'
                ref={register()}
                onChange={onChange2}
                onClick={(e) => (e.target.value = null)}
                required
              />

              <div className="flex justify-evenly">
                <p >{file2 ? file2.name : ""}</p>
                <label
                  htmlFor='customFile2'
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

                {/* {submitting2 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage2} />
                  </div>
                  : ''} */}

                {uploadedFile2 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form>

          <hr className="mb-2" />

          <form >
            <div className="flex justify-between mb-5">
              <p>Passport Photograph </p>
              <input
                type="file"
                className="hidden"
                id='customFile3'
              // onChange={onChange3}
              // onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                {/* <p >{file3 ? file3.name : ""}</p> */}

                <label
                  htmlFor='customFile3'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                // disabled={disabled3}
                >
                  Submit
                </button>

                {/* {submitting3 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage3} />
                  </div>
                  : ''}

                {uploadedFile3 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null} */}

              </div>
            </div>
          </form>

          <hr className="mb-2" />

          <form >
            <div className="flex justify-between mb-5">
              <p>Staff ID Card </p>
              <input
                type="file"
                className="hidden"
                id='customFile3'
              // onChange={onChange3}
              // onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                {/* <p >{file3 ? file3.name : ""}</p> */}

                <label
                  htmlFor='customFile3'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                // disabled={disabled3}
                >
                  Submit
                </button>

                {/* {submitting3 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage3} />
                  </div>
                  : ''}

                {uploadedFile3 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null} */}

              </div>
            </div>
          </form>

          <hr className="mb-2" />

          <form>
            <div className="flex justify-between mb-5">
              <p>Income Declaration form (F3) </p>
              <input
                type="file"
                className="hidden"
                id='customFile3'
              // onChange={onChange3}
              // onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                {/* <p >{file3 ? file3.name : ""}</p> */}

                <label
                  htmlFor='customFile3'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                // disabled={disabled3}
                >
                  Submit
                </button>

                {/* {submitting3 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage3} />
                  </div>
                  : ''}

                {uploadedFile3 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null} */}

              </div>
            </div>
          </form>

          <hr className="mb-2" />

          <form >
            <div className="flex justify-between mb-5">
              <p>Letter of Introduction </p>
              <input
                type="file"
                className="hidden"
                id='customFile3'
              // onChange={onChange3}
              // onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                {/* <p >{file3 ? file3.name : ""}</p> */}

                <label
                  htmlFor='customFile3'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                // disabled={disabled3}
                >
                  Submit
                </button>

                {/* {submitting3 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage3} />
                  </div>
                  : ''}

                {uploadedFile3 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null} */}

              </div>
            </div>
          </form>

          <hr className="mb-2" />

          <form >
            <div className="flex justify-between mb-5">
              <p>Scanned Signature</p>
              <input
                type="file"
                className="hidden"
                id='customFile3'
              // onChange={onChange3}
              // onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                {/* <p >{file3 ? file3.name : ""}</p> */}

                <label
                  htmlFor='customFile3'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                // disabled={disabled3}
                >
                  Submit
                </button>

                {/* {submitting3 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage3} />
                  </div>
                  : ''}

                {uploadedFile3 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null} */}

              </div>
            </div>

            <div className="flex justify-center">
              <SubmitButton>Done</SubmitButton>
            </div>

          </form>

        </div>
      </Widget>

    </>

  )
}







