import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import SectionTitle from "../section-title";
import Widget from "../widget";
import { NewButton, SubmitButton } from "../CustomButton/CustomButton";

import { Select } from "../forms/selects";
import { SampleCsv } from "../Images/Images";
import { FiArrowDown } from "react-icons/fi";

const AnnualCSVUploadForm = () => {
  //handle file
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const fileInputRef = useRef();
  const fileHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/vnd.ms-excel") {
        alert("file type not allowed. only csv(delimited comma) are allowed.");
        setFile(null);
        return;
      } else {
        setFile(file);
      }
    } else {
      setFile("no file chosen yet");
    }
  };
  return (
    <form>
      {/* <SectionTitle title="Schedule Uploads" subtitle="Annual PAYE Returns" /> */}
      <SectionTitle subtitle="UPLOAD ANNUAL RETURNS DOCUMENTS" />
      <Widget>
        {/* <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
          <div className="w-full lg:w-1/12">
            <Select label="Select Year" required />
          </div>
        </div> */}
        <div>
          <div>
            <div className="flex justify-between mb-5">
              <h6>Monthly payroll receipt & evidence of PAYE remittance schedule (Excel) *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Schedule of withholding tax deductions  *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Employer’s annual declaration certificate FORM H1 (Excel) *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Withholding tax receipts (corporate & Individual) *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Development levy receipts (corporate & Individual) *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Business premises receipts (corporate & Individual) *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Ground rent receipts (corporate & Individual) *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Social service contributions levy (SSCL) (corporate & Individual) *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>List of exit staff *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Evidence of remittance of pension *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Evidence of remittance of NHF *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Evidence of remittance of NHIS *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Evidence of remittance of LAP *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Monthly immigration returns *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Letter of expatriate order *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
            <div className="flex justify-between mb-5">
              <h6>Copy of letter mandating employees to file individual tax returns *</h6>
              <input
                required
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button
                  className="btn btn-default btn-outlined bg-transparent mr-4"
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
          </div>
        </div>
        {/* <div className="mt-4">
          <SubmitButton text="Submit" type="submit" disabled={true} />
        </div> */}

        <div className="flex justify-end">
          <div>
            {/* <p className="text-center text-xl">Sample Csv</p>
            <SampleCsv />
            <div className="flex justify-center">
              <div className=""> */}
            {/* <NewButton
                  title={`Download csv sheet`}
                  icon={<FiArrowDown size="16" />}
                  color="green"
                  type="button"
                /> */}

            {/* <Link href="/csv/annual_returns.csv">
                  <a className="flex overflow-hidden btn btn-default btn-outlined  mr-4 bg-transparent text-green-500 hover:text-green-700 border-green-500 hover:border-green-700">
                    <FiArrowDown size="16" className="animate-bounce" />
                    Download sample CSV
                  </a>
                </Link> */}

            {/* <NewButton title="user guide" color="blue" type="button" /> */}


            {/* </div>
            </div> */}
          </div>
        </div>
      </Widget>
    </form>
  );
};

export default AnnualCSVUploadForm;
