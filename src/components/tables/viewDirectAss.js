import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTitle from "../section-title";
import { useState } from "react";
import setAuthToken from "../../functions/setAuthToken";
import url from '../../config/url';
import axios from "axios";
import { stringify } from "uuid";
import { useForm } from 'react-hook-form';
import { FiTriangle } from "react-icons/fi";

const fields = [
  {
    name: "Assessment Id",
    key: "assessment_id",
  },
  {
    name: "KGTIN",
    key: "kgtin",
  },
  {
    name: "Name",
    key: "tp_name",
  },
  {
    name: "Year",
    key: "year",
  },
  {
    name: "Status",
    key: "status",
  },
  // {
  //   name: "Comment",
  //   key: "comment",
  // },
  {
    name: "Created Time",
    key: "createtime",
  },

];

export const ViewPendingTable = ({ remittance }) => {
  let items = remittance;
  console.log(remittance)


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
                  <td key={j}>
                    <Link href={`/view/pendingdirect/${remittance.assessment_id},${remittance.kgtin}`}>
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
        <div className="mt-16"></div>
        <hr />
      </Widget>
    </>
  );
};

export const ViewSinglePendingTable = ({ indvData, residentialAd, pensDeduct, routerAssId, changed, changedPensDed }) => {
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
  const [isFetching3, setIsFetching3] = useState(() => false);
  const [isFetching4, setIsFetching4] = useState(() => false);
  const [isFetching5, setIsFetching5] = useState(() => false);
  const [isFetching6, setIsFetching6] = useState(() => false);
  const [isFetching7, setIsFetching7] = useState(() => false);
  const [isFetching8, setIsFetching8] = useState(() => false);
  const [isFetching9, setIsFetching9] = useState(() => false);
  const [isFetching10, setIsFetching10] = useState(() => false);
  const [isFetching11, setIsFetching11] = useState(() => false);
  const [isFetching12, setIsFetching12] = useState(() => false);
  const [isFetching13, setIsFetching13] = useState(() => false);
  const [isFetching14, setIsFetching14] = useState(() => false);
  const [isFetching15, setIsFetching15] = useState(() => false);
  const [isFetching16, setIsFetching16] = useState(() => false);
  const [isFetching17, setIsFetching17] = useState(() => false);
  const [isFetching18, setIsFetching18] = useState(() => false);
  const [isFetching19, setIsFetching19] = useState(() => false);
  const [isFetching20, setIsFetching20] = useState(() => false);
  const [isFetching21, setIsFetching21] = useState(() => false);
  const [isFetching22, setIsFetching22] = useState(() => false);
  const [isFetching23, setIsFetching23] = useState(() => false);

  let residentialAddr = residentialAd

  setAuthToken();

  let submitDataResAdd = async (e, index) => {
    e.preventDefault()
    setIsFetching6(true)

    try {
      let res = await axios.put(`${url.BASE_URL}forma/residence-addr`, residentialAddr[0]);
      setIsFetching6(false)
      toast.success("Updated Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      setIsFetching6(false)
    }

  }

  let submitDataPensDed = async (e, index) => {
    e.preventDefault()
    // setIsFetching6(true)

    let formVal = (pensDeduct)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/pension-ded`, element)
        .then(function (response) {
          // setIsFetching12(false)
          toast.success("Saved Successfully!");
        })
        .catch(function (error) {
          // setIsFetching12(false)
          toast.error("Failed! please try again");
        });
    }

  }

  const onChange = e => {
    let toggleval = ''
    setToggle(toggleval)
  };

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
    let toggleva = 'hidden'
    setToggle10(toggleva)

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
  const formTog13 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle13(toggleval)

  };

  const formTog14 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle14(toggleval)

  };
  const formTog15 = e => {
    e.preventDefault()
    let toggleval = 'hidden'
    setToggle15(toggleval)

  };
 
  return (
    <>
      <ToastContainer />

      <div className="block p-6 rounded-lg bg-white w-full">
        <div className="flex">
          <h6 className="p-2">Taxpayer Information</h6>
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
        {isFetching6 && (
          <div className="flex justify-center item mb-2">
            <Loader
              visible={isFetching6}
              type="BallTriangle"
              color="#00FA9A"
              height={19}
              width={19}
              timeout={0}
              className="ml-2"
            />
            <p className="font-bold">Saving...</p>
          </div>
        )}
        <form onSubmit={submitDataResAdd}>
          {residentialAddr.map((ind, i) => (
            <div>
              <div className="grid grid-cols-3 gap-4">
                <div className="mb-6">
                  <p>House No</p>

                  <input onChange={(e) => changed(e, i, "house_no")} name="house_no" key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                    value={ind.house_no} />

                </div>
                <div className="form-group mb-6">
                  <p>Street</p>

                  <input onChange={(e) => changed(e, i, "street")} key={i} name="street" type="text" className="form-control w-full rounded font-light text-gray-500"
                    value={ind.street} />

                </div>
                <div className="form-group mb-6">
                  <p>LGA</p>

                  <input onChange={(e) => changed(e, i, "lga")} name="lga" key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                    value={ind.lga} />

                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="form-group mb-6">
                  <p>Town</p>

                  <input onChange={(e) => changed(e, i, "town")} name="town" key={i} type="text" className="form-control w-full rounded font-light text-gray-500"
                    value={ind.town} />

                </div>

                <div className="form-check form-check-inline">
                  <p>Type of Residence</p>


                  <select onChange={(e) => changed(e, i, "residence_type")} className="form-select w-full" name="residence_type" >
                    <option value="select">Select</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Apartment or Flat">Apartment or Flat</option>
                    <option value="Terraced house">Terraced house</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Traditional house">Traditional house</option>
                  </select>


                </div>

                <div className="form-check form-check-inline ml-5 self-center">
                  <p>Do you own your place of residence?</p>
                  <div className="flex">
                    <div className="form-check form-check-inline">
                      <input onClick={onresidenceToggleYes} onChange={(e) => changed(e, i, "residence_owner")} name="residence_owner" value="Owner" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Owner</label>
                    </div>

                    <div className="form-check form-check-inline ml-5">
                      <input onClick={onresidenceToggleNo} onChange={(e) => changed(e, i, "residence_owner")} name="residence_owner" value="Rented" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                      <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Rented</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`grid grid-cols-3 gap-4 ${resiToggle}`}>
                <div className="form-group mb-6">
                  <p>Annual rent</p>

                  <input onChange={(e) => changed(e, i, "annual_rent")} key={i} name="annual_rent" type="text" className="form-control w-full rounded font-light text-gray-500"
                    value={ind.annual_rent} />

                </div>

                <div className="form-group mb-6">
                  <p>Owner name</p>

                  <input onChange={(e) => changed(e, i, "owner_name")} key={i} name="owner_name" type="text" className="form-control w-full rounded font-light text-gray-500"
                    value={ind.owner_name} />

                </div>
                <div className="form-group mb-6">
                  <p>Owner Phone</p>

                  <input onChange={(e) => changed(e, i, "owner_phone")} key={i} name="owner_phone" type="text" className="form-control w-full rounded font-light text-gray-500"
                    value={ind.owner_phone} />

                </div>
              </div>
              <div>
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </form>
      </div>


      {isFetching4 && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching4}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p className="font-bold">Saving...</p>
        </div>
      )}
      <h6>Pension</h6>
      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full`}>

        <form onSubmit={submitDataPensDed}>

          {pensDeduct == null ?
            <div div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">PFA:</label>
                <input name="pfa" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">PFA Address:</label>
                <input name="pfa_addr" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">RSA No:</label>
                <input name="rsa_no" type="number" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Amount:</label>
                <input required placeholder="₦" name="amount" type="number" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="comments">Optional Comments:</label>
                <textarea name="comments" id="comments" cols="40" rows="2" className="rounded"></textarea>
              </div>
              <div className="mb-6 flex justify-between">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                  disabled
                >
                  Save
                </button>
                {/* <button onClick={formTog10} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
              <a href="">
                <FiTriangle
                  size={15}
                  className="stroke-current text-green-500"
                />
              </a>
            </button> */}
              </div>
            </div>

            :
            <div div className="">
              {pensDeduct.map((ind, i) => (
                <div className="border-b-2 mb-3">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">PFA:</label>
                    <input value={ind.pfa} name="pfa" type="text" onChange={(e) => changedPensDed(e, i, "pfa")} key={i} className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">PFA Address:</label>
                    <input value={ind.pfa_addr} name="pfa_addr" type="text" onChange={(e) => changedPensDed(e, i, "pfa_addr")} key={i} className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">RSA No:</label>
                    <input value={ind.rsa_no} name="rsa_no" type="number" onChange={(e) => changedPensDed(e, i, "rsa_no")} key={i} className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Amount:</label>
                    <input value={ind.amount} required placeholder="₦" name="amount" type="number" onChange={(e) => changedPensDed(e, i, "amount")} key={i} className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="comments">Optional Comments:</label>
                    <textarea value={ind.comments} name="comments" onChange={(e) => changedPensDed(e, i, "comments")} key={i} cols="40" rows="2" className="rounded"></textarea>
                  </div>

                </div>
              ))}
             
              <div className="mb-6 flex justify-between">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Update
                </button>
                {/* <button onClick={formTog10} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                <a href="">
                  <FiTriangle
                    size={15}
                    className="stroke-current text-green-500"
                  />
                </a>
              </button> */}
              </div>
            </div>


          }
        </form>
      </div >


    </>
  );
};