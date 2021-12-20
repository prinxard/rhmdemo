import { useRef, useEffect, useState } from "react";
import { TokenModals, TokenModalsOverlay } from '../../components/modals/Modal-annual';
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
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
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
      {/* <TokenModalsOverlay>
        <TokenModals />
      </TokenModalsOverlay> */}
      <h6 className="p-2 font-bold">Correspondence</h6>
      <Widget>
        <div>
          <div>
            <div className="flex justify-between mb-5">
              <p>Cover letter of submission of annual returns <span className="font-bold" style={{ color: "red" }}> * </span><small>(pdf, jpg, png)</small> </p>
              <input
                required
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={fileHandler}
              />
              <div className="flex items-center">
                <button style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mr-4"
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
              <p>Copy of letter mandating employees to file individual tax returns <span className="font-bold" style={{ color: "red" }}> * </span> <small>(pdf, jpg, png)</small></p>
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
            <div className="flex justify-between mb-5">
              <p>Letter of expatriate order [where applicable]  <small>(pdf, jpg, png)</small> </p>
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
          </div>
        </div>
      </Widget>
      <div className="mt-12">
        <h6 className="p-2 font-bold">Remittance</h6>
      </div>
      <Widget className="mt-8">
        <div className="flex justify-between mb-5">
          <p>Schedule of withholding tax deductions <span className="font-bold" style={{ color: "red" }}> * </span> <small> (excel, pdf)</small><br /><span className="flex justify-end" style={{color: "blue"}}><Link href="/csv/wht.csv"> download </Link></span></p>
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
        <hr className="mb-2" />
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
        <hr className="mb-2" />
      </Widget>
      <div className="mt-12"><h6 className="p-2 font-bold">Contributions and levies</h6></div>
      <Widget>
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
        <hr className="mb-2" />
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
        <hr className="mb-2" />
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
        <hr className="mb-2" />
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
      </Widget>
      <div className="mt-12"><h6 className="p-2 font-bold">Deductions</h6></div>
      <Widget>
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
      </Widget>
    </form>
  );
};

export default AnnualCSVUploadForm;
