import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import { SelectAnnual } from "../forms/selects";
import SectionTitle from "../section-title";
import { useState } from "react";
import { FiTriangle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import url from '../../config/url';
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormatMoneyComponent } from "../FormInput/formInputs";

export const StartTcc = () => {
  const [kgtEnentered, setKgtEentered] = useState('')
  const [validkgtinmessage, Setvalidkgtinmessage] = useState('')
  const [invalidkgtinmessage, Setinvalidkgtinmessage] = useState('')
  const [disabled, setDisabled] = useState(true);
  const [validmsg, setvalidmsg] = useState("hidden");
  const [invalidmsg, setinvalidmsg] = useState("hidden");
  const [payerDetails, setpayerDetails] = useState([]);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(() => false);
  const [isFetching2, setIsFetching2] = useState(() => false);

  const userKGTN = payerDetails.map(function (det) {
    let kgtin = det.KGTIN
    return kgtin
  })

  const KGTIN = userKGTN[0]
  console.log(KGTIN);

  setAuthToken();
  const onSubmitform = async data => {
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
          <p className="font-bold">Verifying kgtin...</p>
        </div>
      )}

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
          <p className="font-bold">Creating Assessment...</p>
        </div>
      )}
      <Widget>
        <div >
          <form onSubmit={handleSubmit(onSubmitform)} className="">

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

            {/* <div>
              <SelectAnnual
                label="Select Year"
                required
                ref={register()}
                name="year"

              />
            </div> */}
          </form>
        </div>
      </Widget>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full`}>

        <form >
          <div className="">

            {/* <div className="mb-6 grid grid-cols-3 gap-4">
              <label htmlFor="employername">Taxpayer:</label>
              <input name="pfa" type="text" id="employername" className="form-control w-full rounded"
              />
            </div> */}

            <div className="mb-6 grid grid-cols-3 gap-4">
              <label htmlFor="employername">File no:</label>
              <input name="pfa_addr" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <label htmlFor="employername">Tax Office:</label>
              <input required name="amount" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <label htmlFor="employername">Processing Fee:</label>
              <input required placeholder="₦" name="amount" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>
          </div>
        </form>
      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full`}>

        <form >
          <div className="">

            <div className="mb-6 grid grid-cols-3">
              <label htmlFor="employername">Assessment year 1:</label>
              <input required name="year" type="number" placeholder="YYYY" min="1990" max="2100" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3">
              <label htmlFor="employername">Income Year 1</label>
              <input name="pfa_addr" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3">
              <label htmlFor="employername">Tax Payable Year 1:</label>
              <input name="rsa_no" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>

          </div>
        </form>

        <form >
          <div className="">

            <div className="mb-6 grid grid-cols-3 gap-4">
              <label htmlFor="employername">Assessment year 2:</label>
              <input required name="year" type="number" placeholder="YYYY" min="1990" max="2100" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3">
              <label htmlFor="employername">Income Year 2</label>
              <input name="pfa_addr" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3">
              <label htmlFor="employername">Tax Payable Year 2:</label>
              <input name="rsa_no" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>

          </div>
        </form>
        <form >
          <div className="">

            <div className="mb-6 grid grid-cols-3 gap-4">
              <label htmlFor="employername">Asseement Year 3:</label>
              <input required name="year" type="number" placeholder="YYYY" min="1990" max="2100" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3">
              <label htmlFor="employername">Income Year 3</label>
              <input name="pfa_addr" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>

            <div className="mb-6 grid grid-cols-3">
              <label htmlFor="employername">Tax Payable Year 3:</label>
              <input name="rsa_no" type="text" id="employername" className="form-control w-full rounded"
              />
            </div>
          </div>
          <div className="flex justify-end mt-5">
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
      </div>

    </>
  );
};

export default StartTcc;
