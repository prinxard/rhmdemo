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

export const StartAssessment = () => {
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

  setAuthToken();
  const onSubmitform = async data => {
    const userkgtin = kgtEnentered
    const year = data.year;
    console.log(data.year);
    let createAsses = {
      "year": `${year}`,
      "kgtin": `${userkgtin}`
    }
    setIsFetching2(true)
    try {
      await axios.post(`${url.BASE_URL}forma/new-assessment`, createAsses);
      setIsFetching2(false)
      router.push(`/direct-asses/${userkgtin}`)
      console.log("Assesment Created");
    }
    catch (err) {
      setIsFetching2(false)
      console.log(err);
    }
  };

  
  setAuthToken();
  const verifiyKGTIN = async () => {
    let testkgtin = kgtEnentered
    let kgtin = {
      "KGTIN": `${testkgtin}`
    }
    console.log(kgtin);
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
      console.log("Success!");
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
          <form onSubmit={handleSubmit(onSubmitform)} className="flex justify-around">

            <div className="flex">
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

            <div>
              <SelectAnnual
                label="Select Year"
                required
                ref={register()}
                name="year"

              />
            </div>

            <div className="self-center">
              <button
                style={{ backgroundColor: "#84abeb" }}
                className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
                disabled={disabled}
              >
                Start Assessment
              </button>
            </div>
          </form>
        </div>
      </Widget>
    </>
  );
};


export const StartSingleIndividualAssessment = ({ payerprop, isFetching }) => {

  const [toggleel, setToggle] = useState('hidden')
  const [togglee2, setToggle2] = useState('hidden')
  const [togglee3, setToggle3] = useState('hidden')
  const [togglee4, setToggle4] = useState('hidden')
  const [togglee5, setToggle5] = useState('hidden')
  const [togglee6, setToggle6] = useState('hidden')
  const [togglee7, setToggle7] = useState('hidden')
  const [togglee8, setToggle8] = useState('hidden')
  const [togglee9, setToggle9] = useState('hidden')
  const [togglee10, setToggle10] = useState('hidden')
  const [togglee11, setToggle11] = useState('hidden')
  const [togglee12, setToggle12] = useState('hidden')
  const [togglee13, setToggle13] = useState('hidden')
  const [togglee14, setToggle14] = useState('hidden')
  const [togglee15, setToggle15] = useState('hidden')
  const [resiToggle, setresToggle] = useState('hidden')
  const [marriedToggle, setmarriedToggle] = useState('hidden')
  const [childrenToggle, setchildrenToggle] = useState('hidden')
  const [servantsToggle, setservantsToggle] = useState('hidden')
  const [form1toggle, setform1toggle] = useState('')
  const [form2toggle, setform2toggle] = useState('')
  const [formValues, setFormValues] = useState([{
    employername: "", employeraddress: "", tax:
      "", startdate: "", grosspay: "", upload: ""
  }])

  const [formValues2, setFormValues2] = useState([{
    test: "", test: "", test:
      "", test: "", test: "", test: ""
  }])

  const [formValues3, setFormValues3] = useState([{
    test: "", test: "", test:
      "", test: "", test: "", test: ""
  }])

  const [formValuesAddline, setFormValuesformValuesAddline] = useState([{
    test: "", test: "", test:
      "", test: "", test: "", test: ""
  }])

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  const addFormFields = (event) => {
    event.preventDefault()
    setFormValues([...formValues, {
      employername: "", employeraddress: "", tax:
        "", startdate: "", grosspay: "", upload: ""
    }])
  }

  const addFormFields2 = (event) => {
    event.preventDefault()
    setFormValues2([...formValues2, {
      test: "", test: "", test:
        "", test: "", test: "", test: ""
    }])
  }

  const addFormFields3 = (event) => {
    event.preventDefault()
    setFormValues3([...formValues3, {
      test: "", test: "", test:
        "", test: "", test: "", test: ""
    }])
  }


  const addLine = (event) => {
    event.preventDefault()
    setFormValuesformValuesAddline([...formValuesAddline, {
      test: "", test: "", test:
        "", test: "", test: "", test: ""
    }])
  }

  // let removeFormFields = (i) => {
  //   let newFormValues = [...formValues];
  //   newFormValues.splice(i, 1);
  //   setFormValues(newFormValues)
  // }

  const onChange = e => {
    let toggleval = ''
    setToggle(toggleval)
  };

  // const handleAdd = (e) => {
  //   e.preventDefault();
  //   console.log('You clicked submit.');
  // }

  const onChange2 = e => {
    // e.preventDefault()
    let toggleval = 'hidden'
    setToggle(toggleval)
  };

  const onChange3 = e => {
    let toggleval = ''
    setToggle2(toggleval)

  };
  const onChange4 = e => {
    // e.preventDefault()
    let toggleval = 'hidden'
    setToggle2(toggleval)

  };
  const onChange5 = e => {
    let toggleval = ''
    setToggle3(toggleval)
  };

  const onChange6 = e => {
    let toggleval = 'hidden'
    setToggle3(toggleval)
  };
  const onChange7 = e => {
    let toggleval = ''
    setToggle4(toggleval)

  };
  const onChange8 = e => {
    let toggleval = 'hidden'
    setToggle4(toggleval)

  };
  const onChange9 = e => {
    let toggleval = ''
    setToggle5(toggleval)
  };

  const onChange10 = e => {
    let toggleval = 'hidden'
    setToggle5(toggleval)
  };
  const onChange11 = e => {
    let toggleval = ''
    setToggle6(toggleval)

  };
  const onChange12 = e => {
    let toggleval = 'hidden'
    setToggle6(toggleval)

  };
  const onChange13 = e => {
    let toggleval = ''
    setToggle7(toggleval)
  };

  const onChange14 = e => {
    let toggleval = 'hidden'
    setToggle7(toggleval)
  };
  const onChange15 = e => {
    let toggleval = ''
    setToggle8(toggleval)

  };
  const onChange16 = e => {
    let toggleval = 'hidden'
    setToggle8(toggleval)

  };
  const onChange17 = e => {
    let toggleval = ''
    setToggle9(toggleval)
  };

  const onChange18 = e => {
    let toggleval = 'hidden'
    setToggle9(toggleval)
  };
  const onChange19 = e => {
    let toggleval = ''
    setToggle10(toggleval)

  };
  const onChange20 = e => {
    let toggleval = 'hidden'
    setToggle10(toggleval)

  };
  const onChange21 = e => {
    let toggleval = ''
    setToggle11(toggleval)
  };

  const onChange22 = e => {
    let toggleval = 'hidden'
    setToggle11(toggleval)
  };
  const onChange23 = e => {
    let toggleval = ''
    setToggle12(toggleval)

  };
  const onChange24 = e => {
    let toggleval = 'hidden'
    setToggle12(toggleval)

  };
  const onChange25 = e => {
    let toggleval = ''
    setToggle13(toggleval)

  };
  const onChange26 = e => {
    let toggleval = 'hidden'
    setToggle13(toggleval)

  };
  const onChange27 = e => {
    let toggleval = ''
    setToggle14(toggleval)

  };
  const onChange28 = e => {
    let toggleval = 'hidden'
    setToggle14(toggleval)

  };
  const onChange29 = e => {
    let toggleval = ''
    setToggle15(toggleval)

  };
  const onChange30 = e => {
    let toggleval = 'hidden'
    setToggle15(toggleval)

  };

  const onresidenceToggleYes = e => {
    let toggleval = 'hidden'
    setresToggle(toggleval)

  };

  const MarriedYes = e => {
    let toggleval = ''
    setmarriedToggle(toggleval)

  };
  const MarriedNo = e => {
    let toggleval = 'hidden'
    setmarriedToggle(toggleval)

  };
  const childrenYes = e => {
    let toggleval = ''
    setchildrenToggle(toggleval)

  };
  const childrenNo = e => {
    let toggleval = 'hidden'
    setchildrenToggle(toggleval)

  };
  const servantsYes = e => {
    let toggleval = ''
    setservantsToggle(toggleval)

  };
  const servantsNo = e => {
    let toggleval = 'hidden'
    setservantsToggle(toggleval)

  };

  const onresidenceToggleNo = e => {
    let toggleval = ''
    setresToggle(toggleval)

  };

  const formTog1 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle(toggleval)

  };
  const formTog2 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle2(toggleval)

  };
  const formTog3 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle3(toggleval)

  };
  const formTog4 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle4(toggleval)

  };
  const formTog5 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle5(toggleval)

  };
  const formTog6 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle6(toggleval)

  };
  const formTog7 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle7(toggleval)

  };
  const formTog8 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle8(toggleval)

  };
  const formTog9 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle9(toggleval)

  };
  const formTog10 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle10(toggleval)

  };
  const formTog11 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle11(toggleval)

  };
  const formTog12 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle12(toggleval)

  };


  let indvData = payerprop
  console.log(indvData);



  return (
    <>


      <div className="flex justify-start">
        <div className="mr-2">
          <SectionTitle title="Applicable during the year ended 31st December" />
        </div>
        <SelectAnnual
          // label="Select Year"
          // required
          // ref={register()}
          name="year"
        />
      </div>
      <div className="block p-6 rounded-lg bg-white w-full">
        <div className="flex">
          <h6 className="p-2">Taxpayer Information</h6>
          <a href="" className="text-blue-600 self-center">Edit</a>
        </div>
        <p className="mb-3 font-bold"></p>
        <form>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <p>Surname</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.surname} disabled />
              ))}
            </div>

            <div className="form-group mb-6">
              <p>First Name</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.first_name} disabled />
              ))}
            </div>

            <div className="form-group mb-6">
              <p>Middle Name</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.middle_name} disabled />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Title</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.indv_title} disabled />
              ))}
            </div>

            <div className="form-group mb-6">
              <p>Date of Birth</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.birth_date} disabled />
              ))}
            </div>
            <div className="form-group mb-6">
              <p>Phone number</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.phone_number} disabled />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              {/* <select className="form-select w-full" name="" id="typeofbusiness">
                <option selected>Tax Office</option>
                <option value="1">Office 1</option>
                <option value="2">Office 2</option>
              </select> */}
              <p>Tax Office</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.tax_office} disabled />
              ))}
            </div>

            <div className="form-group mb-6">
              <p>Email</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.email} disabled />
              ))}

            </div>
          </div>
        </form>
      </div>

      <div className="block p-6 rounded-lg bg-white w-full">
        <div className="flex">
          <h6 className="p-2">Current Residential address</h6>
        </div>
        <form>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-6">
              <p>House No</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.house_no} disabled />
              ))}
            </div>

            <div className="form-group mb-6">
              <p>Street</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.street} disabled />
              ))}
            </div>
            <div className="form-group mb-6">
              <p>City</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.city} disabled />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>City</p>
              {indvData.map((ind, i) => (
                <input key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                  value={ind.lga} disabled />
              ))}
            </div>

            <div className="form-check form-check-inline">
              <p>Type of Residence</p>
              <select className="form-select w-full" name="" id="typeofbusiness">
                <option selected>Select</option>
                <option value="1">Bungalow</option>
                <option value="2">Penthouse</option>
                <option value="3">Mansion</option>
                <option value="3">Apartment or Flat</option>
                <option value="3">Terraced house</option>
                <option value="3">Duplex</option>
                <option value="3">Traditional house</option>
              </select>
            </div>

            <div className="form-check form-check-inline ml-5 self-center">
              <p>Do you own your place of residence?</p>
              <div className="flex">
                <div className="form-check form-check-inline">
                  <input onChange={onresidenceToggleYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                  <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Owner</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onresidenceToggleNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Rented</label>
                </div>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-3 gap-4 ${resiToggle}`}>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Annual rent" />
            </div>

            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Name of owner" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Phone number" />
            </div>
          </div>

        </form>
      </div>

      <div className="block p-6 rounded-lg bg-white w-full">
        <form action="">
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Are you Married ?</p>
            </div>
            <div className="flex">
              <div className="form-check form-check-inline">
                <input onClick={MarriedYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onClick={MarriedNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>

          </div>
          <div className={`grid grid-cols-3 gap-4 ${marriedToggle}`}>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Name of spouse in full" />
            </div>

            <div className="form-group mb-6">
              <input type="date" className="form-control w-full rounded"
                placeholder="Date of birth" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Employer/Business of spouse" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Occupation" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Employer's/business address of spouse" />
            </div>
            <div >
            </div>
            <div>
              <button
                style={{ backgroundColor: "#84abeb" }}

                className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Add Spouse
              </button></div>
          </div>
        </form>

      </div>

      <div className="block p-6 rounded-lg bg-white w-full">
        <form action="">
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Do you have children ?</p>
            </div>
            <div className="flex">
              <div className="form-check form-check-inline">
                <input onClick={childrenYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onClick={childrenNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>

          </div>
          <div className={`grid grid-cols-3 gap-4 ${childrenToggle}`}>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Name of child in full" />
            </div>

            <div className="form-group mb-6">
              <input type="date" className="form-control w-full rounded"
                placeholder="Date of birth" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Name of child's school" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Address of child's school" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Child's school fees per session" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Child's income in own right" />
            </div>
            <div>
              <button
                style={{ backgroundColor: "#84abeb" }}

                className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Add Child
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="block p-6 rounded-lg bg-white w-full">
        <form action="">
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Do you have domestic Staff ?</p>
            </div>
            <div className="flex">
              <div className="form-check form-check-inline">
                <input onClick={servantsYes} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onClick={servantsNo} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>

          </div>
          <div className={`grid grid-cols-3 gap-4 ${servantsToggle}`}>
            <div className="form-group mb-6">
              <select className="form-select w-full" name="" id="typeofbusiness">
                <option selected>Mr/Mrs</option>
                <option value="1">Mr</option>
                <option value="2">Mrs</option>
              </select>
            </div>

            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Full name" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="House/plot no" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Street" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Town/Area" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="LGA/LCDA" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="State" />
            </div>
            <div className="form-group mb-6">
              <input type="text" className="form-control w-full rounded"
                placeholder="Amount paid (Annual)" />
            </div>

            <div className="flex justify-between">
              <div className="form-check form-check-inline ">
                <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label  text-gray-800" for="inlineRadio10">Paid by employer</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label  text-gray-800" for="inlineRadio20">Paid by self</label>
              </div>
            </div>
            <div>
              <button
                style={{ backgroundColor: "#84abeb" }}

                className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Add Domestic Staff
              </button>
            </div>
          </div>

        </form>
      </div>



      <h6 className="p-2">Income details</h6>

      <Widget>
        <div className="p-10" >
          <div >
            <div className="flex justify-between mb-5 ">
              <p>Are you employed ? </p>
              <div className="flex">
                <div className="form-check form-check-inline">
                  <input onClick={onChange} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onClick={onChange2} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>
              </div>
            </div>

            <div className={`flex justify-center border mb-3 p-6 rounded-lg bg-white w-full ${toggleel}`}>
              <form>
                {formValues.map((element, index) => (
                  <div key={index}>
                    <p className="font-bold flex justify-center mb-4"> Add Employment {index + 1}</p>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Employer Name:</label>
                      <input type="text" name="employername" className="form-control w-full rounded" />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Employer Address:</label>
                      <input type="text" name="employeraddress" className="form-control w-full rounded" />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Your start date:</label>
                      <input type="text" name="startdate" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Gross pay:</label>
                      <input type="text" name="grosspay" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Tax deducted:</label>
                      <input type="text" name="tax" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Upload Pay slip or schedule:</label>
                      <input type="file" name="upload" className="w-full"
                      />
                    </div>
                    <div className='pb-5'>
                      <hr />
                    </div>
                  </div>
                ))}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    onClick={addFormFields}
                  >
                    Add another employment
                  </button>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea name="" id="comments" cols="40" rows="3" className='rounded'></textarea>
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    onClick={(e) => e.preventDefault()}
                  >
                    Save
                  </button>
                  <button onClick={formTog1} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a href="">
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </form>


            </div>

            <div>

              <div className="flex justify-between mb-5">
                <p>Are you self employed ? </p>

                <div className="flex">

                  <div className="form-check form-check-inline">
                    <input onClick={onChange3} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions2" id="inlineRadio1" value="option1" />
                    <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                  </div>

                  <div className="form-check form-check-inline ml-5">
                    <input onClick={onChange4} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="option2" />
                    <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                  </div>
                </div>
              </div>

            </div>



            <div className={`flex justify-center border mb-3 p-6 rounded-lg bg-white w-fulll ${togglee2}`}>
              <form>
                {formValues2.map((element, index) => (
                  <div>
                    <p className="font-bold flex justify-center mb-4"> Add self Employment {index + 1}</p>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="typeofbusiness">Type of business:</label>
                      <select className="form-select" name="" id="typeofbusiness">
                        <option selected>Select Business </option>
                        <option value="1">Agro Allied Products</option>
                        <option value="2">Aircondition Repairer</option>
                        <option value="3">Aluminum Doors & Windows</option>
                        <option value="3">Animal Feed Maker</option>
                        <option value="3">Architechtural Design</option>
                        <option value="3">Architect</option>
                        <option value="3">Artist And Song-Writer</option>
                        <option value="3">Baby Wear</option>
                        <option value="3">Curtain & Interior Decoration</option>
                        <option value="3">Cyber Cafe Operator</option>
                        <option value="3">Dealers In Mattress/Foams</option>
                        <option value="3">Djs Entertainment</option>
                        <option value="3">Doors Seller</option>
                        <option value="3">Drama Group</option>
                        <option value="3">Electrical Parts & Fitting</option>
                        <option value="3">Electrician</option>
                        <option value="3">Electronics Dealer</option>
                        <option value="3">Engine Oil/ Kerosene Seller</option>
                        <option value="3">Estate Managers/ Agent</option>
                        <option value="3">Event Centre</option>
                        <option value="3">Event Planner</option>
                        <option value="3">Fashion Designer</option>
                        <option value="3">Films & Cinemas Center</option>
                        <option value="3">Fish Seller</option>
                        <option value="3">Fowl Seller</option>
                        <option value="3">Fruit Seller</option>
                        <option value="3">Furnishing Materials Seller</option>
                        <option value="3">Furniture / Furnishing Materials Seller</option>
                        <option value="3">Furniture Maker</option>
                        <option value="3">Gas Refilling Seller</option>
                        <option value="3">Generator Mechanic</option>
                        <option value="3">Gift Shop</option>
                        <option value="3">Graphic Arts & Design</option>
                        <option value="3">Grinding Mill</option>
                        <option value="3">Guest House</option>
                        <option value="3">Hairdressers And Barber</option>
                        <option value="3">Higher Institutions Private</option>
                        <option value="3">Horticulture / Florist</option>
                        <option value="3">Hotel Proprietor</option>
                        <option value="3">Ict/ Computer Accessories</option>
                        <option value="3">Interior Decorator</option>
                        <option value="3">Iron Bender</option>
                        <option value="3">Jewelry Seller</option>
                        <option value="3">Kerorine Retail Seller</option>
                        <option value="3">Kiddies Shop And Botique</option>
                        <option value="3">Laundry (Dry Cleaner)</option>
                        <option value="3">Law Firm</option>
                        <option value="3">Leather Carpets (Linoleum)</option>
                        <option value="3">Liquor|Beer Palour</option>
                        <option value="3">Mai Shai (Tea Maker)</option>
                        <option value="3">Mason</option>
                        <option value="3">Maternity Home</option>
                        <option value="3">Maternity Private Proprietor</option>
                        <option value="3">Meat Seller</option>
                        <option value="3">Meat Seller</option>
                        <option value="3">Medical Laboratory</option>
                        <option value="">Mini Supermarket|Supermarket</option>
                        <option value="">Mobile Phone Dealer</option>
                        <option value="">Mobile Phone Repairer</option>
                        <option value="">Mobile Phone Seller</option>
                        <option value="">Money Lender</option>
                        <option value=""> Motor Cycle Dealer</option>
                        <option value="">Motor Cycle Mechanic</option>
                        <option value="">Motor Cycle Spare Part Dealer </option>
                        <option value="">Motor Dealer/Seller</option>
                        <option value="">Motor Spare Part Dealer</option>
                        <option value="">Motor Vehicle Mechanic</option>
                        <option value="">Musician</option>
                        <option value="">Newspaper/Magazine Vendor</option>
                        <option value="">Optician</option>
                        <option value="">Other Businesses And Trade</option>
                        <option value="">Painter And Decorator</option>
                        <option value="">Paints Dealer</option>
                        <option value="">Palm Oil Miller</option>
                        <option value="">Panel Beaters & Sprayer</option>
                        <option value="">Patent/Propriety Medicine Vendor</option>
                        <option value="">Petrol Filling Station</option>
                        <option value="">Pharmaceutical Shop</option>
                        <option value=""> Phone Accessories</option>
                        <option value="">Photo Color Laboratorie</option>
                        <option value="">Photographers / Photo Developer</option>
                        <option value="">Photographic Materials Shop</option>
                        <option value="">Plastic Dealer</option>
                        <option value=""> Plastic/Rubber Seller</option>
                        <option value="">Plumber</option>
                        <option value="">Plumbing Material With Water Tanks & Access.</option>
                        <option value="">Plumbing Materials Only</option>
                        <option value="">Pool Agent</option>
                        <option value="">Pool Promoter</option>
                        <option value="">Pos Operator (Mobile Money)</option>
                        <option value="">Potter</option>
                        <option value="">Poultry Farmer</option>
                        <option value="">Poultry Feed</option>
                        <option value="">Printer</option>
                        <option value="">Private Medical Practioner</option>
                        <option value="">Private N/P School</option>
                        <option value="">Private Secondary School</option>
                        <option value="">Produce Buyer</option>
                        <option value="">Provision Store</option>
                        <option value="">Pure/Bottle Water Producer</option>
                        <option value="">Pure/Bottle Water Seller</option>
                        <option value="">Raw Food Seller</option>
                        <option value="">Recharge Card Dealer</option>
                        <option value="">Rental</option>
                        <option value="">Restaurant</option>
                        <option>Restaurant (Buka)</option>
                        <option value="">Re-Wire & Battery Charger opt</option>
                        <option value="">Road Side Petty Trader</option>
                        <option value="">Rugs & Carpet</option>
                        <option value="">Sack Bags Seller</option>
                        <option value="">Saw Mill</option>
                        <option value="">School Proprietor</option>
                        <option value="">Shoe Maker</option>
                        <option value="">Shoe Seller</option>
                        <option value="">Shops/Stall</option>
                        <option value="">Solar Panel</option>
                        <option value="">Stylist</option>
                        <option value="">Super Market</option>
                        <option value="">Tailors/Fashion Designer</option>
                        <option value="">Thrift Collector</option>
                        <option value="">Tiler</option>
                        <option value="">Timber Wood Seller</option>
                        <option value="">Tomatoes Seller</option>
                        <option value="">Tuber Dealer</option>
                        <option value="">Tyre Dealer</option>
                        <option value="">Video Club</option>
                        <option value="">Viewing Centre</option>
                        <option value="">Vulcanizer</option>
                        <option value="">Weaver</option>
                        <option value="">Welder</option>
                        <option value="">Wheel Barrow Quiosk</option>
                        <option value="">Wine And Beer License Operator</option>
                        <option value="">Yam Seller</option>
                        <option value="">Yoghurt Seller</option>

                      </select>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="businessname">Business Name:</label>
                      <input type="text" id="businessname" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="businessaddress">Business Address:</label>
                      <input type="text" id="businessaddress" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Business Start date:</label>
                      <input type="date"
                        className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="turnover">Turnover-takings, fees, sales or money earned by your business:</label>
                      <input type="text" id="turnover" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="turnover">Any other business income not included above:</label>
                      <input type="text" id="turnover" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="cashbases">Do you use cash basis, money actually received and paid out, to calculate your income expense ?</label>
                      <div className="flex">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                        </div>

                        <div className="form-check form-check-inline ml-5">
                          <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label className="font-bold" htmlFor="businessincome">Total Business Income:</label>
                      <p className="font-bold" id="businessincome">NGN 0.00</p>
                    </div>

                    <div>
                      <p className="font-bold">Expenses</p>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="expenses">How would you like to record your expenses?</label>
                        <div className="flex">
                          <div className="form-check form-check-inline">
                            <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Total value</label>
                          </div>

                          <div className="form-check form-check-inline ml-5">
                            <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" />
                            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Break down</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      {/* <label htmlFor="item">Item</label> */}
                      <input type="text" id="item" className="form-control w-full rounded"
                        placeholder="Item"
                      />
                      <input type="text" id="item" className="form-control w-full rounded"
                        placeholder="Amount"
                      />
                    </div>


                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <button onClick={addLine}
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        Add Line
                      </button>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label className="font-bold" htmlFor="businessincome">Net Profit:</label>
                      <p className="font-bold" id="businessincome">NGN 0.00</p>
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label className="font-bold" htmlFor="businessincome">Net Loss:</label>
                      <p className="font-bold" id="businessincome">NGN 0.00</p>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="expenses">Are figures provided provisional or estimated?</label>
                      <div className="flex">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                        </div>

                        <div className="form-check form-check-inline ml-5">
                          <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                        </div>
                      </div>
                    </div>
                    <div className='pb-5'>
                      <hr />
                    </div>
                  </div>
                ))}
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  onClick={addFormFields2}
                  className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Add another business
                </button>

                <div className="mb-6">
                  <label htmlFor="comments" className="block">Optional Comments:</label>
                  <textarea name="" id="comments" cols="40" rows="3" className="rounded " ></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button onClick={formTog2} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a href="">
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </form>
            </div>


            <div className="flex justify-between mb-5">

              <p>Are you in a patnership ? </p>


              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange5} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions3" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange6} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions3" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>
            </div>

            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee3}`}>
              <form>
                {formValues3.map((element, index) => (

                  <div className="">
                    <p className="font-bold flex justify-center mb-4"> Add Partner {index + 1}</p>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Partner Name:</label>
                      <input type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Partner Address:</label>
                      <input type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Partner Phone:</label>
                      <input type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Partner Percentage:</label>
                      <input type="text" id="employername" className="form-control w-full rounded"
                      />
                    </div>

                    <div className='pb-5'>
                      <hr />
                    </div>

                  </div>
                ))}

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <button
                    onClick={addFormFields3}
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Add another Partner
                  </button>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive income on rent ? </p>

              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange7} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions4" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange8} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions4" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>

            </div>


            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee4}`}>
              <form>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Property Type:</label>
                    <select name="" id="">
                      <option selected>Select property type</option>
                      <option value="1">Bungalow</option>
                      <option value="2">Penthouse</option>
                      <option value="3">Mansion</option>
                      <option value="3">Apartment or Flat</option>
                      <option value="3">Terraced house</option>
                      <option value="3">Duplex</option>
                      <option value="3">Traditional house</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Property Address:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Rental Type:</label>


                    <select className="form-select" name="" id="typeofbusiness">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Rental Amount(Annual):</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Renter Name:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Renter Phone number:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>


                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Add another property
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="comments">Optional Comments:</label>
                    <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive any bank interest ? </p>


              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange9} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions5" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange10} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions5" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>

            </div>


            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee5}`}>
              <form>
                <div className="">


                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Bank Name:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Bank Account:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Bank Verification Number (BVN):</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Gross Amount:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>


                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Add another Bank
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="comments">Optional Comments:</label>
                    <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive any bank dividends from a Nigerian Company ? </p>

              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange11} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions6" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange12} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions6" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>
            </div>

            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee6}`}>
              <form>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Company Name:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Company address:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Gross Amount:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Add another Company
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="comments">Optional Comments:</label>
                    <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive Pension ? </p>

              <div className="flex">
                <div className="form-check form-check-inline">
                  <input onChange={onChange13} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions7" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange14} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions7" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>
              </div>
            </div>
            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee7}`}>
              <form>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">PFA:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">PFA address:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Gross Amount:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="comments">Optional Comments:</label>
                    <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you make profit on sale of asset ? </p>

              <div className="flex">

                <div className="form-check form-check-inline">
                  <input onChange={onChange15} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions8" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div onChange={onChange16} className="form-check form-check-inline ml-5">
                  <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions8" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>
            </div>

            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee8}`}>

              <form>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Asset Type:</label>
                    <select className="form-select" name="" id="typeofbusiness">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Asset Address:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Buyer:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Buyer address:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Buyer Phone number:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Sale amount:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Add another Asset
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="comments">Optional Comments:</label>
                    <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-between mb-5">

              <p>Do you receive any income from sources outside Nigeria ? </p>

              <div className="flex">

                <div className="form-check form-check-inline flex ustify-evenly">
                  <input onChange={onChange17} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions9" id="inlineRadio1" value="option1" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
                </div>

                <div className="form-check form-check-inline ml-5">
                  <input onChange={onChange18} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions9" id="inlineRadio2" value="option2" />
                  <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
                </div>

              </div>
            </div>

            <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee9}`}>
              <form>
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Source:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Gross Amount:</label>
                    <input type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Add another source
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="comments">Optional Comments:</label>
                    <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>

        </div>
      </Widget>

      <h6 className="p-2">Deductions</h6>

      <Widget>
        <div className="p-10">

          <div className="flex justify-between mb-5">

            <p>Do you contribute towards pension ? </p>


            <div className="flex">

              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange19} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions10" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange20} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions10" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee10}`}>

            <form>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">PFA:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">PFA Address:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">RSA No:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Amount:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-between mb-5">
            <p>Do you contribute towards Life Asurrance ? </p>
            <div className="flex">

              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange21} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions11" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange22} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions11" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>

            </div>
          </div>

          <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee11}`}>
            <form>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Insurance Company:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">No:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Amount:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-between mb-5">
            <p>Do you contribute towards NHIS ? </p>
            <div className="flex">

              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange23} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions12" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange24} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions12" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee12}`}>

            <form>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Company:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Insurance No:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Amount:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea name="" id="comments" cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Widget>
      <h6 className="p-2">Other Asset</h6>

      <Widget>
        <div className="p-10">

          <div className="flex justify-between mb-5">

            <p>Do you own a Vehicle ? </p>


            <div className="flex">
              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange25} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions13" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange26} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions13" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee13}`}>
            <form>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Date of purchase:</label>
                  <input type="date" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Cost:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Brand:</label>
                  <select className="Select Brand" name="" id="typeofbusiness">
                    <option selected>Honda</option>
                    <option value="1">Toyota</option>
                    <option value="2">Benz</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Model:</label>
                  <select className="Select Brand" name="" id="typeofbusiness">
                    <option selected>Honda</option>
                    <option value="1">Toyota</option>
                    <option value="2">Benz</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Year:</label>
                  <select className="Select Brand" name="" id="typeofbusiness">
                    <option selected>2021</option>
                    <option value="1">2022</option>
                    <option value="2">2023</option>
                  </select>
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-between mb-5">

            <p>Do you own a Landed Property ? </p>


            <div className="flex">
              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange27} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions14" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio1">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange28} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions14" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio2">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee14}`}>
            <form>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <textarea cols="40" rows="2" id="employername" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Type of property:</label>
                  <select className="form-select w-full" name="" id="typeofbusiness">
                    <option selected>Select property type</option>
                    <option value="1">Bungalow</option>
                    <option value="2">Penthouse</option>
                    <option value="3">Mansion</option>
                    <option value="3">Apartment or Flat</option>
                    <option value="3">Terraced house</option>
                    <option value="3">Duplex</option>
                    <option value="3">Traditional house</option>
                  </select>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Date of completion/acquisition:</label>
                  <input type="date" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Cost of construction/acquisition:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-between mb-5">

            <p>Do you own a Farm Land ? </p>


            <div className="flex">
              <div className="form-check form-check-inline flex ustify-evenly">
                <input onChange={onChange29} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions15" id="inlineRadio1" value="option1" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
              </div>

              <div className="form-check form-check-inline ml-5">
                <input onChange={onChange30} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions15" id="inlineRadio2" value="option2" />
                <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
              </div>
            </div>
          </div>

          <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee15}`}>
            <form>
              <div className="">
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Address:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Date of acquisition:</label>
                  <input type="date" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Cost of Land:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Cost of Produce:</label>
                  <input type="text" id="employername" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mb-6 flex justify-center">
            <button
              style={{ backgroundColor: "#84abeb" }}
              className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Submit form
            </button>
          </div>
        </div>
      </Widget>

    </>
  )
};