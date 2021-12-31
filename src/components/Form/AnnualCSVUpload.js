import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import Widget from '../widget';
import axios from 'axios';
import url from '../../config/url';
import { FiX, FiCheck } from 'react-icons/fi';
import setAuthToken from '../../functions/setAuthToken';
import { ProcessorSpinner, Progress } from '../spiner/index';

const AnnualCSVUploadForm = () => {
  //handle file
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);
  const [file7, setFile7] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [uploadedFile2, setUploadedFile2] = useState(false);
  const [uploadedFile3, setUploadedFile3] = useState(false);
  const [uploadedFile4, setUploadedFile4] = useState(false);
  const [uploadedFile5, setUploadedFile5] = useState(false);
  const [uploadedFile6, setUploadedFile6] = useState(false);
  const [uploadedFile7, setUploadedFile7] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const [disabled3, setDisabled3] = useState(true);
  const [disabled4, setDisabled4] = useState(true);
  const [disabled5, setDisabled5] = useState(true);
  const [disabled6, setDisabled6] = useState(true);
  const [disabled7, setDisabled7] = useState(true);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadPercentage2, setUploadPercentage2] = useState(0);
  const [uploadPercentage3, setUploadPercentage3] = useState(0);
  const [uploadPercentage4, setUploadPercentage4] = useState(0);
  const [uploadPercentage5, setUploadPercentage5] = useState(0);
  const [uploadPercentage6, setUploadPercentage6] = useState(0);
  const [uploadPercentage7, setUploadPercentage7] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitting2, setSubmitting2] = useState(false);
  const [submitting3, setSubmitting3] = useState(false);
  const [submitting4, setSubmitting4] = useState(false);
  const [submitting5, setSubmitting5] = useState(false);
  const [submitting6, setSubmitting6] = useState(false);
  const [submitting7, setSubmitting7] = useState(false);



  const onChange = e => {
    const file = e.target.files[0]
    if (file) {
      if (!file) {
        setFile(null);
        setDisabled(true);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile(null);
        setDisabled(true);
        return;
      }
      if (file.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile(file);
        setDisabled(false);
      }
    }
  };

  const onChange2 = e => {
    const file2 = e.target.files[0]
    if (file2) {
      if (!file2) {
        setFile2(null);
        setDisabled2(true);
        return;
      }
      if (file2.type !== "image/jpeg" && file2.type !== "application/pdf" && file2.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile2(null);
        setDisabled2(true);
        return;
      }
      if (file2.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile2(file2);
        setDisabled2(false);
      }
    }
  };

  const onChange3 = e => {
    const file3 = e.target.files[0]
    if (file3) {
      if (!file3) {
        setFile3(null);
        setDisabled3(true);
        return;
      }
      if (file3.type !== "image/jpeg" && file3.type !== "application/pdf" && file3.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile3(null);
        setDisabled3(true);
        return;
      }
      if (file3.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile3(file3);
        setDisabled3(false);
      }
    }
  };

  const onChange4 = e => {
    const file4 = e.target.files[0]
    if (file4) {
      if (!file4) {
        setFile4(null);
        setDisabled4(true);
        return;
      }
      if (file4.type !== "application/vnd.ms-excel") {
        alert("file type not allowed. only excel is allowed");
        setFile4(null);
        setDisabled4(true);
        return;
      }
      if (file4.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile4(file4);
        setDisabled4(false);
      }
    }
  };

  const onChange5 = e => {
    const file5 = e.target.files[0]
    if (file5) {
      if (!file5) {
        setFile5(null);
        setDisabled5(true);
        return;
      }
      if (file5.type !== "image/jpeg" && file5.type !== "application/pdf" && file5.type !== "image/png") {
        alert("file type not allowed. only excel is allowed");
        setFile5(null);
        setDisabled5(true);
        return;
      }
      if (file5.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile5(file5);
        setDisabled5(false);
      }
    }
  };

  const onChange6 = e => {
    const file6 = e.target.files[0]
    if (file6) {
      if (!file6) {
        setFile6(null);
        setDisabled6(true);
        return;
      }
      if (file6.type !== "application/vnd.ms-excel" && file6.type !== "application/pdf" && file6.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        alert("file type not allowed. only pdf word or excel are allowed");
        setFile6(null);
        setDisabled6(true);
        return;
      }
      if (file6.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        console.log(file6.type);
        setFile6(file6);
        setDisabled6(false);
      }
    }
  };

  const onChange7 = e => {
    const file7 = e.target.files[0]
    if (file7) {
      if (!file7) {
        setFile7(null);
        setDisabled7(true);
        return;
      }
      // if (file7.type !== "application/vnd.ms-excel" && file7.type !== "application/pdf" && file7.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      //   alert("file type not allowed. only pdf word or excel are allowed");
      //   setFile7(null);
      //   setDisabled7(true);
      //   return;
      // }
      // if (file7.size > 1024 * 200) {
      //   alert("file too large..file size shoulde not exceed 200kb");
      //   return
      // }
      else {
        setFile7(file7);
        setDisabled7(false);
      }
    }
  };

  const onSubmit = async data => {
    data.preventDefault();
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('cover_letter', file);

    setAuthToken();
    setSubmitting(true)
    try {
      const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      setSubmitting(false)
      setUploadedFile(true);
      setFile(null)
      setDisabled(true)
      console.log(data.response.body);
    } catch (err) {
      if (err.response === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err);
        setFile(null)
        setDisabled(true)
        setSubmitting(false)
      }
    }
  };

  const onSubmit2 = async data => {
    data.preventDefault();
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('indv_return_letter', file2);
    setAuthToken();
    setSubmitting2(true)
    try {
      const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage2(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }

      });

      setSubmitting2(false)
      setUploadedFile2(true);
      setFile2(null)
      setDisabled2(true)
      console.log(data.response.body);
    } catch (err) {
      if (err.response === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err);
        setFile2(null)
        setDisabled2(true)
        setUploadPercentage2(0)
        setSubmitting2(false)
      }
    }
  };

  const onSubmit3 = async data => {
    data.preventDefault();
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('exp_order_letter', file3);
    setAuthToken();
    setSubmitting3(true)
    try {
      const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage3(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }

      });

      setSubmitting3(false)
      setUploadedFile3(true);
      setFile3(null)
      setDisabled3(true)
      console.log(data.response.body);
    } catch (err) {
      if (err.response === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err);
        setFile3(null)
        setDisabled3(true)
        setUploadPercentage3(0)
        setSubmitting3(false)
      }
    }
  };

  const onSubmit4 = async data => {
    data.preventDefault();
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('mnthly_pay_sched', file4);
    setAuthToken();
    setSubmitting4(true)
    try {
      const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage4(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }

      });

      setSubmitting4(false)
      setUploadedFile4(true);
      setFile4(null)
      setDisabled4(true)
      console.log(data.response.body);
    } catch (err) {
      if (err.response === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err);
        setFile4(null)
        setDisabled4(true)
        setUploadPercentage4(0)
        setSubmitting4(false)
      }
    }
  };

  const onSubmit5 = async data => {
    data.preventDefault();
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('paye_remittance', file5);

    setAuthToken();
    setSubmitting5(true)

    try {
      const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage5(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }

      });

      setSubmitting5(false)
      setUploadedFile5(true);
      setFile5(null)
      setDisabled5(true)
      console.log(data.response.body);
    } catch (err) {
      if (err.response === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err);
        setFile5(null)
        setDisabled5(true)
        setUploadPercentage5(0)
        setSubmitting5(false)
      }
    }
  };

  const onSubmit6 = async data => {
    data.preventDefault();
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('exit_staff_list', file6);

    setAuthToken();
    setSubmitting6(true)

    try {
      const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage6(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }

      });

      setSubmitting6(false)
      setUploadedFile6(true);
      setFile6(null)
      setDisabled6(true)
      console.log(data.response.body);
    } catch (err) {
      if (err.response === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err);
        setFile6(null)
        setDisabled6(true)
        setUploadPercentage6(0)
        setSubmitting6(false)
      }
    }
  };

  const onSubmit7 = async data => {
    data.preventDefault();
    let employer_id = 1004124549
    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('endyr_trial_bal', file7);

    setAuthToken();
    setSubmitting7(true)

    try {
      const res = await axios.post(`${url.BASE_URL}annual/upload-annual-doc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage7(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }

      });

      setSubmitting7(false)
      setUploadedFile7(true);
      setFile7(null)
      setDisabled7(true)
      console.log(data.response.body);
    } catch (err) {
      if (err.response === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err);
        setFile7(null)
        setDisabled7(true)
        setUploadPercentage7(0)
        setSubmitting7(false)
      }
    }
  };

  return (
    <>

      {/* <TokenModalsOverlay>
        <TokenModals />
      </TokenModalsOverlay> */}
      <h6 className="p-2 font-bold">Correspondence</h6>
      <Widget>
        <div>
          <form onSubmit={onSubmit}>

            <div className="flex justify-between mb-5">
              <p>Cover letter of submission of annual returns <span className="font-bold" style={{ color: "red" }}> * </span><small>(pdf, jpg, png)</small> </p>
              <input
                type="file"
                className="hidden"
                id='customFile'
                onChange={onChange}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{file ? file.name : ""}</p>
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
                  disabled={disabled}
                >
                  Submit
                </button>
                {submitting ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage} />
                  </div>
                  : ''}

                {uploadedFile ? (
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

          <form onSubmit={onSubmit2}>
            <div className="flex justify-between mb-5">
              <p>Copy of letter mandating employees to file individual tax returns <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small></p>
              <input
                type="file"
                className="hidden"
                id='customFile2'
                onChange={onChange2}
                onClick={(e) => (e.target.value = null)}
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
                  disabled={disabled2}
                >
                  Submit
                </button>

                {submitting2 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage2} />
                  </div>
                  : ''}

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

          <form onSubmit={onSubmit3}>
            <div className="flex justify-between mb-5">
              <p>Letter of expertriate order <small>[where applicable]</small> <span className="font-bold" style={{ color: "red" }}> * </span><small>(pdf, jpg, png)</small> </p>
              <input
                type="file"
                className="hidden"
                id='customFile3'
                onChange={onChange3}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{file3 ? file3.name : ""}</p>

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
                  disabled={disabled3}
                >
                  Submit
                </button>

                {submitting3 ?
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
                  </span>) : null}

              </div>
            </div>
          </form>


        </div>
      </Widget>

      <div className="mt-12">
        <h6 className="p-2 font-bold">Employee Schedule</h6>
      </div>

      <Widget>
        <div>
          <form onSubmit={onSubmit4}>
            <div className="flex justify-between mb-5">
              <p>Monthly payroll schedule <span className="font-bold" style={{ color: "red" }}> * </span><small>(excel)</small> </p>
              <input
                required
                type="file"
                className="hidden"
                id='customFile4'
                onChange={onChange4}
                onClick={(e) => (e.target.value = null)}

              />
              <div className="flex items-center">

                <p>{file4 ? file4.name : ""}</p>
                <label
                  htmlFor='customFile4'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"

                >
                  select file
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                  disabled={disabled4}
                >
                  Submit
                </button>

                {submitting4 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage4} />
                  </div>
                  : ''}

                {uploadedFile4 ? (
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

          <form onSubmit={onSubmit5}>
            <div className="flex justify-between mb-5">
              <p>Evidence of PAYE remittance <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small></p>


              <input
                id="customFile5"
                type="file"
                className="hidden"
                onChange={onChange5}
                onClick={(e) => (e.target.value = null)}
                />
              <div className="flex items-center">

                <p>{file5 ? file5.name : ""}</p>

                <label
                  htmlFor='customFile5'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                >
                  select file
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                  disabled={disabled5}
                >
                  Submit
                </button>

                {submitting5 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage5} />
                  </div>
                  : ''}

                {uploadedFile5 ? (
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

          <form onSubmit={onSubmit6}>
            <div className="flex justify-between mb-5">
            <p>List of exit staff  <small>(pdf, word, excel)</small> </p>
              <input
                id="customFile6"
                type="file"
                className="hidden"
                onChange={onChange6}
                onClick={(e) => (e.target.value = null)}
                />
              <div className="flex items-center">

                <p>{file6 ? file6.name : ""}</p>

                <label
                  htmlFor='customFile6'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                >
                  select file
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                  disabled={disabled6}
                >
                  Submit
                </button>

                {submitting6 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage6} />
                  </div>
                  : ''}

                {uploadedFile6 ? (
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
         

          <form onSubmit={onSubmit7}>
            <div className="flex justify-between mb-5">
            <p>Trial balance for the year ended 31st Dec. 2021 </p>
              <input
                id="customFile7"
                type="file"
                className="hidden"
                onChange={onChange7}
                onClick={(e) => (e.target.value = null)}
                />
              <div className="flex items-center">

                <p>{file7 ? file7.name : ""}</p>

                <label
                  htmlFor='customFile7'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white rounded-md btn-outlined bg-transparent mx-2"
                >
                  select file
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                  disabled={disabled7}
                >
                  Submit
                </button>

                {submitting7 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage7} />
                  </div>
                  : ''}

                {uploadedFile7 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form>
        </div>
      </Widget>

      <div className="mt-12">
        <h6 className="p-2 font-bold">Remittance</h6>
      </div>

      {/* <Widget>
        <form>
          <div className="flex justify-between mb-5">
            <p>Schedule of withholding tax deductions <span className="font-bold" style={{ color: "red" }}> * </span> <small> (excel, pdf)</small><br /><span className="flex justify-end" style={{ color: "blue" }}><Link href="/csv/wht.csv"> download </Link></span></p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>


        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Withholding tax receipts (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small></p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Monthly Immigration returns [where applicable] <small>(pdf, jpg, png)</small></p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>
      </Widget> */}

      <div className="mt-12"><h6 className="p-2 font-bold">Contributions and levies</h6></div>

      {/* <Widget>
        <form>
          <div className="flex justify-between mb-5">
            <p>Development levy receipts (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small>  </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Business premises receipts (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png</small> ) </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Ground rent receipts (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small> </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />
        <form>
          <div className="flex justify-between mb-5">
            <p>Social service contributions levy (SSCL) (corporate & Individual) <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png</small> ) </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>
      </Widget> */}

      <div className="mt-12"><h6 className="p-2 font-bold">Deductions</h6></div>

      {/* <Widget>
        <div className="flex justify-between mb-5">
          <p>Evidence of remittance of pension <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small>  </p>
          <input
            required
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={fileHandler}
          />
          <div className="flex items-center">
            <button
              style={{ backgroundColor: "#84abeb" }}
              className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              select file
            </button>
            <p>{file ? file.name : "no file chosen yet"}</p>
          </div>
        </div>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Evidence of remittance of NHF <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small>  </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Evidence of remittance of NHIS <span className="font-bold" style={{ color: "red" }}> * </span></p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>

        <hr className="mb-2" />

        <form>
          <div className="flex justify-between mb-5">
            <p>Evidence of remittance of LAP <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small> </p>
            <input
              required
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={fileHandler}
            />
            <div className="flex items-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white rounded-md btn-outlined bg-transparent mr-4"
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                select file
              </button>
              <p>{file ? file.name : "no file chosen yet"}</p>
            </div>
          </div>
        </form>
      </Widget> */}

    </>
  );
};

export default AnnualCSVUploadForm;
