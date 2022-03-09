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
import { useRouter } from "next/router";

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
  {
    name: "Comment",
    key: "comment",
  },
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

export const ViewSinglePendingTable = ({ indvData, pensDeduct,
  routerAssId, changed, changedPensDed, changedEmploy, employment,
  changedSelfEmployed, selfEmployment, changedExpenses, expenses, lifeass, changedLap, nhis, changedNhis,
  partner, changedPartner, rentIncome, changedRentIncome, bankInterest, changedBankInterest, dividends,
  changedBankDividends, changedPension, pension, residentialAddr, asset, changedAsset, outsideSource,
  changedOutsideSource, changedVehicles, vehicles, changedLand, land, farm, changedFarm, changedSpouse, spouse,
  changedChildren, children, domestic, changedDomestic, assessment

}) => {
  console.log(bankInterest);
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
  const [isFetching, setIsFetching] = useState(() => false);
  const router = useRouter();

  const [residentialAddress, setResidentialAddress] = useState(
    {
      assessment_id: "", house_no: "", street: "", town: "", lga: "", residence_type: "",
      residence_owner: "", annual_rent: "", owner_name: "", owner_phone: ""
    }
  )

  setAuthToken();
  let submitDataResAddr = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let resAddObj = {
      assessment_id: `${assessment_id}`,
      house_no: `${residentialAddress.house_no}`,
      street: `${residentialAddress.street}`,
      town: `${residentialAddress.town}`,
      lga: `${residentialAddress.lga}`,
      residence_type: `${residentialAddress.residence_type}`,
      residence_owner: `${residentialAddress.residence_owner}`,
      annual_rent: `${residentialAddress.annual_rent}`,
      owner_name: `${residentialAddress.owner_name}`,
      owner_phone: `${residentialAddress.owner_phone}`,
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/residence-addr`, resAddObj);
      setIsFetching(false)
      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error("error, Please try again!");
      setIsFetching(false)
    }

  }

  function handleResidentialChange(evt) {
    const value = evt.target.value;
    setResidentialAddress({
      ...residentialAddress,
      [evt.target.name]: value
    });
    console.log(residentialAddress);
  }


  const [spouseIns, setSpouseIns] = useState(
    [{
      assessment_id: `${assessment_id}`, name: "", employer: "",
      dob: "", occupation: "", employer_addr: ""
    }]
  )

  let handleSpouseChange = (i, e) => {
    let newSpouseValues = [...spouseIns];
    newSpouseValues[i][e.target.name] = e.target.value;
    setSpouseIns(newSpouseValues);
  }

  let addSpouseFields = () => {
    setSpouseIns([...spouseIns, {
      assessment_id: `${assessment_id}`,
      name: "", employer: "", dob: "", occupation: "", employer_addr: ""
    }])
  }

  let removeSpouseFields = (i) => {
    let newSpouseValues = [...spouseIns];
    newSpouseValues.splice(i, 1);
    setSpouseIns(newSpouseValues)
  }

  let handleSpouseChangeIns = (i, e) => {
    let newSpouseValues = [...spouseIns];
    newSpouseValues[i][e.target.name] = e.target.value;
    setSpouseIns(newSpouseValues);
  }

  let handleSpouseSubmit = (event) => {
    setIsFetching(true)
    event.preventDefault();
    let formVal = (spouseIns)
    for (let index = 0; index < formVal.length; index++) {
      const element = formVal[index];
      axios.post(`${url.BASE_URL}forma/spouse`, element)
        .then(function (response) {
          toast.success("Saved Successfully!");
          setIsFetching(false)
        })
        .catch(function (error) {
          toast.error("Failed! please try again");
          setIsFetching(false)
        });
    }
  }

  let assessment_id = routerAssId
  let lapAmount
  let NhisAmount
  let penDeductAmount
  let employmentGross
  let incomeEarned
  let otherIncome
  let expenseAmout
  let totalBusInc
  let netProfit

  lifeass.forEach((el, i) => (
    lapAmount = el.amount
  ))

  nhis.forEach((el, i) => (
    NhisAmount = el.amount
  ))

  pensDeduct.forEach((el, i) => (
    penDeductAmount = el.amount
  ))

  selfEmployment.forEach((el, i) => (
    incomeEarned = el.income_earned
  ))


  selfEmployment.forEach((el, i) => (
    otherIncome = el.other_income
  ))

  employment.forEach((el, i) => (
    employmentGross = el.gross_pay
  ))

  expenses.forEach((el, i) => (
    expenseAmout = el.amount
  ))
  let earnedInc = Number(incomeEarned)
  let otherInc = Number(otherIncome)
  let expAmt = Number(expenseAmout)

  totalBusInc = earnedInc + otherInc

  // console.log("earned", earnedInc);
  // console.log("other", otherInc);
  // console.log("Expenses", expAmt);

  // console.log("total Bus Inc", totalBusInc);
  netProfit = totalBusInc - expAmt

  // console.log("Net", netProfit);
  // console.log(totalBusInc - expenseAmout);

  setAuthToken();
  let submitForm = (e) => {
    e.preventDefault()
    let assessFormObj = {
      assessment_id: `${assessment_id}`,
      employed: `${employmentGross}`,
      selfEmployed: `${netProfit}`,
      nhis: `${NhisAmount}`,
      lap: `${lapAmount}`,
      pension: `${penDeductAmount}`,
    }
    axios.put(`${url.BASE_URL}forma/tax-cal`, assessFormObj)
      .then(function (response) {
        setIsFetching(false)
        toast.success("Updated Successfully!");
        router.push('/view/completeddirect')
      })
      .catch(function (error) {
        setIsFetching(false)
        toast.error("Failed! please try again");
      });

  }




  setAuthToken();

  let submitDataResAdd = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    try {
      let res = await axios.put(`${url.BASE_URL}forma/residence-addr`, residentialAddr[0]);
      setIsFetching(false)
      toast.success("Updated Successfully!");

    } catch (error) {
      toast.error("error, Please try again!");
      setIsFetching(false)
    }

  }

  setAuthToken();
  let submitDataPensDed = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)

    let formVal = (pensDeduct)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/pension-ded`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataEmployment = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    let formVal = (employment)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/employed`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataSelfEmployment = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    let formVal = (selfEmployment)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/self-employed`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataExpenses = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (expenses)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/expenses`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataLap = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (lifeass)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/lap`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataNhis = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (nhis)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/nhis`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataPartner = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (partner)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/partner`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataRentIncome = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (rentIncome)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/rent-income`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataBankInterest = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (bankInterest)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/bank-interest`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataBankDividends = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (dividends)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/dividends`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataPension = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (pension)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/pension`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataAsset = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (asset)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/assets`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataOutside = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (outsideSource)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/outside-source`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataVehicles = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (vehicles)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/vechicles`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataLand = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (land)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/land`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataFarm = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (farm)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/farm`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataSpouse = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (spouse)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/spouse`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataChildren = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (children)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/spouse`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
          toast.error("Failed! please try again");
        });
    }

  }
  setAuthToken();
  let submitDataDomestic = async (e, index) => {
    e.preventDefault()
    setIsFetching(true)
    let formVal = (domestic)
    for (let indexAr = 0; indexAr < formVal.length; indexAr++) {
      const element = formVal[indexAr];
      axios.put(`${url.BASE_URL}forma/domestic-staff`, element)
        .then(function (response) {
          setIsFetching(false)
          toast.success("Updated Successfully!");
        })
        .catch(function (error) {
          setIsFetching(false)
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

      {isFetching && (
        <div>

          <div className="flex  justify-center item mb-2">
            <Loader
              visible={isFetching}
              type="BallTriangle"
              color="#00FA9A"
              height={19}
              width={19}
              timeout={0}
              className="ml-2"
            />
            <p className="font-bold">Updating...</p>
          </div>
        </div>
      )}

      <div className="block p-6 rounded-lg bg-white w-full">
        <div className="flex justify-around mb-5">
          <h6 className="p-2">Taxpayer Information</h6>
          <div>
            <div>
              <div>
                <p className="font-bold">
                  Comment
                </p>
                {assessment.map((com, i) => (
                  <p key={i}>{com.comment}</p>
                ))}
              </div>
            </div>
          </div>
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

        <div>
          {residentialAddr == null || residentialAddr == "" ?
            <form onSubmit={submitDataResAddr}>
              <div className="grid grid-cols-3 gap-4">
                <div className="mb-6">
                  <p>House No</p>
                  <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                    name="house_no" value={residentialAddress.house_no} disabled />
                </div>

                <div className="form-group mb-6">
                  <p>Street</p>
                  <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                    name="street" value={residentialAddress.street} disabled />
                </div>
                <div className="form-group mb-6">
                  <p>LGA</p>
                  <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                    name="lga" value={residentialAddress.lga} disabled />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="form-group mb-6">
                  <p>Town</p>
                  <input onChange={handleResidentialChange} type="text" className="form-control w-full rounded font-light text-gray-500"
                    name="town" value={residentialAddress.town} />

                </div>

                <div className="form-check form-check-inline">
                  <p>Type of Residence</p>
                  <select onChange={handleResidentialChange} className="form-select w-full" name="residence_type" value={residentialAddress.residence_type}>
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
                      <input onClick={onresidenceToggleYes} onChange={handleResidentialChange} name="residence_owner" value="Owner" checked={residentialAddress.residence_owner === "Owner"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Owner</label>
                    </div>

                    <div className="form-check form-check-inline ml-5">
                      <input onClick={onresidenceToggleNo} onChange={handleResidentialChange} name="residence_owner" value="Rented" checked={residentialAddress.residence_owner === "Rented"} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                      <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Rented</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`grid grid-cols-3 gap-4 ${resiToggle}`}>
                <div className="form-group mb-6">
                  <input onChange={handleResidentialChange} type="text" name="annual_rent" value={residentialAddress.annual_rent} className="form-control w-full rounded"
                    placeholder="Annual rent" />
                </div>

                <div className="form-group mb-6">
                  <input onChange={handleResidentialChange} type="text" name="owner_name" value={residentialAddress.owner_name} className="form-control w-full rounded"
                    placeholder="Name of owner" />
                </div>
                <div className="form-group mb-6">
                  <input onChange={handleResidentialChange} type="text" name="owner_phone" value={residentialAddress.owner_phone} className="form-control w-full rounded"
                    placeholder="Phone number" />
                </div>
              </div>
              <div>
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form> :
            <div>
              <form onSubmit={submitDataResAdd}>
                {residentialAddr.map((ind, i) => (
                  <div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="mb-6">
                        <p>House No</p>

                        <input onChange={(e) => changed(e, i, "house_no")} name="house_no" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.house_no} />

                      </div>
                      <div className="form-group mb-6">
                        <p>Street</p>

                        <input onChange={(e) => changed(e, i, "street")} name="street" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.street} />

                      </div>
                      <div className="form-group mb-6">
                        <p>LGA</p>

                        <input onChange={(e) => changed(e, i, "lga")} name="lga" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.lga} />

                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="form-group mb-6">
                        <p>Town</p>

                        <input onChange={(e) => changed(e, i, "town")} name="town" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.town} />

                      </div>

                      <div className="form-check form-check-inline">
                        <p>Type of Residence</p>
                        <select value={ind.residence_type} onChange={(e) => changed(e, i, "residence_type")} className="form-select w-full" name="residence_type" >
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
                            <input onClick={onresidenceToggleYes} onChange={(e) => changed(e, i, "residence_owner")} name="residence_owner" value={ind.residence_owner} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Owner</label>
                          </div>

                          <div className="form-check form-check-inline ml-5">
                            <input onClick={onresidenceToggleNo} onChange={(e) => changed(e, i, "residence_owner")} name="residence_owner" value={ind.residence_owner} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Rented</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`grid grid-cols-3 gap-4 ${resiToggle}`}>
                      <div className="form-group mb-6">
                        <p>Annual rent</p>

                        <input onChange={(e) => changed(e, i, "annual_rent")} name="annual_rent" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.annual_rent} />

                      </div>

                      <div className="form-group mb-6">
                        <p>Owner name</p>

                        <input onChange={(e) => changed(e, i, "owner_name")} name="owner_name" type="text" className="form-control w-full rounded font-light text-gray-500"
                          value={ind.owner_name} />

                      </div>
                      <div className="form-group mb-6">
                        <p>Owner Phone</p>

                        <input onChange={(e) => changed(e, i, "owner_phone")} name="owner_phone" type="text" className="form-control w-full rounded font-light text-gray-500"
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
          }


        </div>

      </div>



      <div className="block p-6 rounded-lg bg-white w-full">

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-6">
            <p>Spouse</p>
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

        <div className={`${marriedToggle}`}>

          {spouse == null || spouse == "" ?
            <div>
              <form className="border p-3" onSubmit={handleSpouseSubmit}>
                {spouseIns.map((element, index) => (
                  <div className="grid border-b-2 m-3 p-3 grid-cols-3 gap-4" key={index}>
                    <div className="form-group mb-6">
                      <p>Name of spouse</p>
                      <input required name="name" value={element.name || ""} onChange={e => handleSpouseChangeIns(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Name of spouse" />
                    </div>

                    <div className="form-group mb-6">
                      <p>Date of Birth</p>
                      <input required name="dob" value={element.dob || ""} onChange={e => handleSpouseChangeIns(index, e)} type="date" className="form-control w-full rounded"
                        placeholder="Date of birth" />
                    </div>
                    <div className="form-group mb-6">
                      <p>Occupation</p>
                      <input name="occupation" value={element.occupation || ""} onChange={e => handleSpouseChangeIns(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Occupation" />
                    </div>
                    <div className="form-group mb-6">
                      <p>Business/Employer</p>
                      <input name="employer" value={element.employer || ""} onChange={e => handleSpouseChangeIns(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Employer/Business of spouse" />
                    </div>
                    <div className="form-group mb-6">
                      <p>Office/Business Address</p>
                      <input name="employer_addr" value={element.employer_addr || ""} onChange={e => handleSpouseChangeIns(index, e)} type="text" className="form-control w-full rounded"
                        placeholder="Employer's/business address of spouse" />
                    </div>
                    {
                      index ?
                        <div className="form-group place-self-center">
                          <button onClick={removeSpouseFields}

                            className="btn btn-default bg-red-600 text-white btn-outlined bg-transparent rounded-md"
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                        : null
                    }

                  </div>
                ))}
                <div className="flex justify-between p-3">
                  <button onClick={addSpouseFields}
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="button"
                  >
                    Add Spouse
                  </button>
                  <button
                    // style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 bg-green-600 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            :
            <div>
              <form onSubmit={submitDataSpouse} className="border p-3">
                <div>
                  {spouse.map((ind, i) => (

                    <div>
                      <div className="grid border-b-2 m-3 p-3 grid-cols-3 gap-4">
                        <div className="form-group mb-6">
                          <p>Name of spouse</p>
                          <input value={ind.name} onChange={(e) => changedSpouse(e, i, "name")} required name="name" type="text" className="form-control w-full rounded" />
                        </div>

                        <div className="form-group mb-6">
                          <p>Date of Birth</p>
                          <input required name="dob" type="date" className="form-control w-full rounded"
                            value={ind.dob} onChange={(e) => changedSpouse(e, i, "dob")} />
                        </div>
                        <div className="form-group mb-6">
                          <p>Occupation</p>
                          <input name="occupation" type="text" className="form-control w-full rounded"
                            value={ind.occupation} onChange={(e) => changedSpouse(e, i, "occupation")} />
                        </div>
                        <div className="form-group mb-6">
                          <p>Business/Employer</p>
                          <input name="employer" type="text" className="form-control w-full rounded"
                            value={ind.employer} onChange={(e) => changedSpouse(e, i, "employer")} />
                        </div>
                        <div className="form-group mb-6">
                          <p>Office/Business Address</p>
                          <textarea name="employer_addr" type="text" className="form-control w-full rounded"
                            value={ind.employer_addr} onChange={(e) => changedSpouse(e, i, "employer_addr")} />
                        </div>
                      </div>

                    </div>
                  ))}
                  <div className="flex justify-between p-3">

                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Update
                    </button>

                  </div>
                </div>
              </form>
            </div>

          }
        </div>


      </div>



      <div className="block p-6 rounded-lg bg-white w-full">

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-6">
            <p>Children</p>
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
        <div className={`${childrenToggle} border`}>

          <form onSubmit={submitDataChildren}>
            {children == null || children == "" ?

              <div>

                <div className={`grid m-3 p-3 border-b-2 grid-cols-3 gap-4`}>
                  <div className="form-group mb-6">
                    <p>Name of Child</p>
                    <input name="name" type="text" className="form-control w-full rounded"
                      placeholder="Name of child in full" />
                  </div>
                  <div className="form-group mb-6">
                    <p>Date of Birth</p>
                    <input required name="dob" type="date" className="form-control w-full rounded"
                      placeholder="Date of birth" />
                  </div>
                  <div className="form-group mb-6">
                    Child School Name
                    <input name="school_name" type="text" className="form-control w-full rounded"
                      placeholder="Name of child's school" />
                  </div>
                  <div className="form-group ">
                    School Address
                    <input name="school_addr" type="text" className="form-control w-full rounded"
                      placeholder="Address of child's school" />
                  </div>
                  <div className="form-group">
                    <p>School Fees</p>
                    <input name="school_fees" type="text" className="form-control w-full rounded"
                      placeholder="Child's school fees per session" />
                  </div>
                  <div className="form-group">
                    <p>Child's Income</p>
                    <input name="child_income" type="text" className="form-control w-full rounded"
                      placeholder="Child's income in own right" />
                  </div>
                  <div></div>

                  <div></div>
                </div>

                <div className="flex justify-between p-3">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                    disabled
                  >
                    Save
                  </button>

                </div>
              </div> :
              <div>
                {children.map((ind, i) => (
                  <div>
                    <div className={`grid m-3 p-3 border-b-2 grid-cols-3 gap-4`}>
                      <div className="form-group mb-6">
                        <p>Name of Child</p>
                        <input name="name" type="text" className="form-control w-full rounded"
                          value={ind.name} onChange={(e) => changedChildren(e, i, "name")} />
                      </div>
                      <div className="form-group mb-6">
                        <p>Date of Birth</p>
                        <input required name="dob" type="date" className="form-control w-full rounded"
                          value={ind.dob} onChange={(e) => changedChildren(e, i, "dob")} />
                      </div>
                      <div className="form-group mb-6">
                        Child School Name
                        <input name="school_name" type="text" className="form-control w-full rounded"
                          value={ind.school_name} onChange={(e) => changedChildren(e, i, "school_name")} />
                      </div>
                      <div className="form-group ">
                        School Address
                        <input name="school_addr" type="text" className="form-control w-full rounded"
                          value={ind.school_addr} onChange={(e) => changedChildren(e, i, "school_addr")} />
                      </div>
                      <div className="form-group">
                        <p>School Fees</p>
                        <input name="school_fees" type="text" className="form-control w-full rounded"
                          value={ind.school_fees} onChange={(e) => changedChildren(e, i, "school_fees")} />
                      </div>
                      <div className="form-group">
                        <p>Child's Income</p>
                        <input name="child_income" type="text" className="form-control w-full rounded"
                          value={ind.child_income} onChange={(e) => changedChildren(e, i, "child_income")} />
                      </div>
                      <div></div>

                      <div></div>
                    </div>

                  </div>
                ))}
                <div className="flex justify-between p-3">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update
                  </button>

                </div>
              </div>
            }
          </form>
        </div>
      </div>

      <div className="block p-6 rounded-lg bg-white w-full">

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-6">
            <p>Domestic Staff</p>
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

        <form onSubmit={submitDataDomestic} className={`${servantsToggle} border`}>
          {domestic == null || domestic == "" ?

            <div>
              <div className={`grid grid-cols-3 m-3 p-3 border-b-2 gap-4`}>
                <div className="form-group mb-6">
                  <p>Title</p>
                  <select name="title" className="form-select w-full" >
                    <option value="Mrs">Mrs</option>
                    <option value="Mr">Mr</option>
                    <option value="Miss">Miss</option>
                  </select>
                </div>

                <div className="form-group mb-6">
                  <p>Name</p>
                  <input name="name" type="text" className="form-control w-full rounded"
                    placeholder="Full name" />
                </div>

                <div className="form-group mb-6">
                  <p>House Number</p>
                  <input name="house_no" type="text" className="form-control w-full rounded"
                    placeholder="House/plot no" />
                </div>
                <div className="form-group mb-6">
                  <p>Street</p>
                  <input name="street" type="text" className="form-control w-full rounded"
                    placeholder="Street" />
                </div>
                <div className="form-group mb-6">
                  <p>Town</p>
                  <input type="text" name="town" className="form-control w-full rounded"
                    placeholder="Town/Area" />
                </div>
                <div className="form-group mb-6">
                  <p>LGA</p>
                  <select name="lga" className="form-select w-full"  >
                    <option value="kabba">Select</option>
                    <option value="Adavi">Adavi</option>
                    <option value="Ajaokuta">Ajaokuta</option>
                    <option value="Ankpa">Ankpa</option>
                    <option value="Bassa">Bassa</option>
                  </select>
                </div>
                <div className="form-group mb-6">
                  <p>State</p>
                  <select className="form-select w-full" name="state">
                    <option value="Abia">Abia</option>
                    <option value="Akwa Ibom">Akwa Ibom</option>
                    <option value="Bauchi">Bauchi</option>
                    <option value="Bayelsa">Bayelsa</option>
                    <option value="Benue">Benue</option>
                    <option value="Borno">Borno</option>
                    <option value="Cross River">Cross River</option>
                    <option value="Delta">Delta</option>
                    <option value="Edo">Edo</option>
                    <option value="Ekiti">Ekiti</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Gombe">Gombe</option>
                    <option value="Imo">Imo</option>
                    <option value="Jigawa">Jigawa</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Kano">Kano</option>
                    <option value="Katsina">Katsina</option>
                    <option value="Kebbi">Kebbi</option>
                    <option value="Kogi">Kogi</option>
                    <option value="Kwara">Kwara</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Nasarawa">Nasarawa</option>
                    <option value="Niger">Niger</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Ondo">Ondo</option>
                    <option value="Osun">Osun</option>
                  </select>
                </div>
                <div className="form-group mb-6">
                  <p>Annual Pay</p>
                  <input name="amount_paid" type="text" className="form-control w-full rounded"
                    placeholder="Amount paid (Annual)" />
                </div>

                <div className="flex justify-between self-center">
                  <div className="form-check form-check-inline ">
                    <input name="payer" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
                    <label className="form-check-label  text-gray-800" for="inlineRadio10">Paid by employer</label>
                  </div>

                  <div className="form-check form-check-inline ml-5">
                    <input name="payer" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" />
                    <label className="form-check-label  text-gray-800" for="inlineRadio20">Paid by self</label>
                  </div>
                </div>
                <div></div>
                <div></div>
              </div>

              <div className="flex justify-between p-3">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                  disabled
                >
                  Save
                </button>

              </div>
            </div> :
            <div>
              {domestic.map((ind, i) => (

                <div>
                  <div className={`grid grid-cols-3 m-3 p-3 border-b-2 gap-4`}>
                    <div className="form-group mb-6">
                      <p>Title</p>
                      <select onChange={(e) => changedDomestic(e, i, "title")} value={ind.title} name="title" className="form-select w-full" >
                        <option value="Mrs">Mrs</option>
                        <option value="Mr">Mr</option>
                        <option value="Miss">Miss</option>
                      </select>
                    </div>

                    <div className="form-group mb-6">
                      <p>Name</p>
                      <input name="name" type="text" className="form-control w-full rounded"
                        value={ind.name} onChange={(e) => changedDomestic(e, i, "name")} />
                    </div>

                    <div className="form-group mb-6">
                      <p>House Number</p>
                      <input name="house_no" type="text" className="form-control w-full rounded"
                        value={ind.house_no} onChange={(e) => changedDomestic(e, i, "house_no")} />
                    </div>
                    <div className="form-group mb-6">
                      <p>Street</p>
                      <input name="street" type="text" className="form-control w-full rounded"
                        value={ind.street} onChange={(e) => changedDomestic(e, i, "street")} />
                    </div>
                    <div className="form-group mb-6">
                      <p>Town</p>
                      <input type="text" name="town" className="form-control w-full rounded"
                        value={ind.town} onChange={(e) => changedDomestic(e, i, "town")} />
                    </div>
                    <div className="form-group mb-6">
                      <p>LGA</p>
                      <input type="text" name="lga" className="form-control w-full rounded"
                        value={ind.lga} onChange={(e) => changedDomestic(e, i, "lga")} />
                    </div>
                    <div className="form-group mb-6">
                      <p>State</p>
                      <select value={ind.state} onChange={(e) => changedDomestic(e, i, "state")} className="form-select w-full" name="state">
                        <option value="ABUJA FCT">ABUJA FCT</option>
                        <option value="ABIA">ABIA</option>
                        <option value="ADAMAWA">ADAMAWA</option>
                        <option value="AKWA IBOM">AKWA IBOM</option>
                        <option value="ANAMBRA">ANAMBRA</option>
                        <option value="BAUCHI">BAUCHI</option>
                        <option value="BAYELSA">BAYELSA</option>
                        <option value="BENUE">BENUE</option>
                        <option value="BORNO">BORNO</option>
                        <option value="CROSS RIVER">CROSS RIVER</option>
                        <option value="DELTA">DELTA</option>
                        <option value="EBONYI">EBONYI</option>
                        <option value="EDO">EDO</option>
                        <option value="EKITI">EKITI</option>
                        <option value="ENUGU">ENUGU</option>
                        <option value="GOMBE">GOMBE</option>
                        <option value="IMO">IMO</option>
                        <option value="JIGAWA">JIGAWA</option>
                        <option value="KADUNA">KADUNA</option>
                        <option value="KANO">KANO</option>
                        <option value="KATSINA">KATSINA</option>
                        <option value="KEBBI">KEBBI</option>
                        <option value="KOGI">KOGI</option>
                        <option value="KWARA">KWARA</option>
                        <option value="LAGOS">LAGOS</option>
                        <option value="NASSARAWA">NASSARAWA</option>
                        <option value="NIGER">NIGER</option>
                        <option value="OGUN">OGUN</option>
                        <option value="ONDO" >ONDO</option>
                        <option value="OSUN">OSUN</option>
                        <option value="OYO">OYO</option>
                        <option value="PLATEAU">PLATEAU</option>
                        <option value="RIVERS">RIVERS</option>
                        <option value="SOKOTO">SOKOTO</option>
                        <option value="TARABA">TARABA</option>
                        <option value="YOBE">YOBE</option>
                        <option value="ZAMFARA">ZAMFARA</option>
                      </select>
                    </div>
                    <div className="form-group mb-6">
                      <p>Annual Pay</p>
                      <input name="amount_paid" type="text" className="form-control w-full rounded"
                        value={ind.amount_paid} onChange={(e) => changedDomestic(e, i, "amount_paid")} />
                    </div>

                    <div className="form-group mb-6">
                      <p>Payer</p>
                      <select value={ind.payer} onChange={(e) => changedDomestic(e, i, "payer")} name="payer" className="form-select w-full" >
                        <option>Paid by Employer</option>
                        <option>Paid by self</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between p-3">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 mb-4 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Update
                </button>

              </div>
            </div>
          }
        </form>


      </div>



      <div className="flex justify-between mb-5">
        <p>Pension deduction </p>
        <div className="flex">

          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange19} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions10" id="inlineRadio1" value="option1" />
            <label onClick="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onChange={onChange20} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions10" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee10}`}>

        <form onSubmit={submitDataPensDed}>

          {pensDeduct == null || pensDeduct == "" ?
            <div div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>PFA:</label>
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
                <input name="rsa_no" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Amount:</label>
                <input required placeholder="₦" name="amount" type="text" className="form-control w-full rounded"
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
                <button onClick={formTog10} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>

            :
            <div className="">
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
                    <input value={ind.rsa_no} name="rsa_no" type="text" onChange={(e) => changedPensDed(e, i, "rsa_no")} key={i} className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Amount:</label>
                    <input value={ind.amount} required placeholder="₦" name="amount" type="text" onChange={(e) => changedPensDed(e, i, "amount")} key={i} className="form-control w-full rounded"
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
                <button onClick={formTog10} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>


          }
        </form>
      </div >

      <div className="flex justify-between mb-5 ">
        <p>Employment</p>
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
        <form onSubmit={submitDataEmployment}>
          {employment == null || employment == "" ?
            <div>
              <div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Employer Name:</label>
                  <input required type="text" name="emp_name" className="form-control w-full rounded" />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Employer Address:</label>
                  <input required type="text" name="emp_addr" className="form-control w-full rounded" />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Your start date:</label>
                  <input type="date" name="start_date" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Gross pay:</label>
                  <input required placeholder="₦" type="text" name="gross_pay" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Tax deducted:</label>
                  <input placeholder="₦" type="text" name="tax_deducted" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label>Upload Pay slip or schedule:</label>
                  <input type="file" name="pay_slip" className="w-full"
                  />
                </div>
                <div className='pb-5'>
                  <hr />
                </div>
              </div>

              <div className="mb-6 flex justify-around">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                  disabled
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
            </div>
            :
            <div>
              {employment.map((ind, i) => (
                <div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Employer Name:</label>
                    <input value={ind.emp_name} onChange={(e) => changedEmploy(e, i, "emp_name")} key={i} required type="text" name="emp_name" className="form-control w-full rounded" />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Employer Address:</label>
                    <input value={ind.emp_addr} onChange={(e) => changedEmploy(e, i, "emp_addr")} key={i} required type="text" name="emp_addr" className="form-control w-full rounded" />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Your start date:</label>
                    <input value={ind.start_date} onChange={(e) => changedEmploy(e, i, "start_date")} key={i} type="date" name="start_date" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Gross pay:</label>
                    <input required value={ind.gross_pay} onChange={(e) => changedEmploy(e, i, "gross_pay")} key={i} placeholder="₦" type="text" name="gross_pay" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Tax deducted:</label>
                    <input value={ind.tax_deducted} onChange={(e) => changedEmploy(e, i, "tax_deducted")} key={i} placeholder="₦" type="text" name="tax_deducted" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Upload Pay slip or schedule:</label>
                    <input type="file" onChange={(e) => changedEmploy(e, i, "pay_slip")} key={i} name="pay_slip" className="w-full"
                    />
                  </div>
                  <div className='pb-5'>
                    <hr />
                  </div>
                </div>
              ))}

              <div className="mb-6 flex justify-around">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Update
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
            </div>
          }
        </form>
      </div>

      <div>
        <div className="flex justify-between mb-5">
          <p>self employed </p>

          <div className="flex">

            <div className="form-check form-check-inline">
              <input onClick={onChange3} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions2" id="inlineRadio1" value="option1" />
              <label required className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
            </div>

            <div className="form-check form-check-inline ml-5">
              <input required onClick={onChange4} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="option2" />
              <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex justify-center border mb-3 p-6 rounded-lg bg-white w-fulll ${togglee2}`}>
        <div>
          <form onSubmit={submitDataSelfEmployment}>
            {selfEmployment == null || selfEmployment == "" ?
              <div>
                <div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="typeofbusiness">Type of business:</label>
                    <select className="form-select" name="business_type" >
                      <option value="select">Select Business </option>
                      <option value="Agro Allied Products">Agro Allied Products</option>
                      <option value="Aircondition Repairer">Aircondition Repairer</option>
                      <option value="Aluminum Doors & Windows">Aluminum Doors & Windows</option>
                      <option value="Animal Feed Maker">Animal Feed Maker</option>
                      <option value="Architechtural Design">Architechtural Design</option>
                      <option value="Architect">Architect</option>
                      <option value="Artist And Song-Writer">Artist And Song-Writer</option>
                      <option value="Baby Wear">Baby Wear</option>
                      <option value="Curtain & Interior Decoration">Curtain & Interior Decoration</option>
                      <option value="Cyber Cafe Operator">Cyber Cafe Operator</option>
                      <option value="Dealers In Mattress/Foams">Dealers In Mattress/Foams</option>
                      <option value="Djs Entertainment">Djs Entertainment</option>
                      <option value="Doors Seller">Doors Seller</option>
                      <option value="Drama Group">Drama Group</option>
                      <option value="Electrical Parts & Fitting">Electrical Parts & Fitting</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Electronics Dealer">Electronics Dealer</option>
                      <option value="Engine Oil/ Kerosene Seller">Engine Oil/ Kerosene Seller</option>
                      <option value="Estate Managers/ Agent">Estate Managers/ Agent</option>
                      <option value="Event Centre">Event Centre</option>
                      <option value="Event Planner">Event Planner</option>
                      <option value="Fashion Designer">Fashion Designer</option>
                      <option value="Films & Cinemas Center">Films & Cinemas Center</option>
                      <option value="Fish Seller">Fish Seller</option>
                      <option value="Fowl Seller">Fowl Seller</option>
                      <option value="Fruit Seller">Fruit Seller</option>
                      <option value="Furnishing Materials Seller">Furnishing Materials Seller</option>
                      <option value="Furniture / Furnishing Materials Seller">Furniture / Furnishing Materials Seller</option>
                      <option value="Furniture Maker">Furniture Maker</option>
                      <option value="Gas Refilling Seller">Gas Refilling Seller</option>
                      <option value="Generator Mechanic">Generator Mechanic</option>
                      <option value="Gift Shop">Gift Shop</option>
                      <option value="Graphic Arts & Design">Graphic Arts & Design</option>
                      <option value="Grinding Mill">Grinding Mill</option>
                      <option value="Guest House">Guest House</option>
                      <option value="Hairdressers And Barber">Hairdressers And Barber</option>
                      <option value="Higher Institutions Private">Higher Institutions Private</option>
                      <option value="Horticulture / Florist">Horticulture / Florist</option>
                      <option value="Hotel Proprietor">Hotel Proprietor</option>
                      <option value="Ict/ Computer Accessories">Ict/ Computer Accessories</option>
                      <option value="Interior Decorator">Interior Decorator</option>
                      <option value="Iron Bender">Iron Bender</option>
                      <option value="Jewelry Seller">Jewelry Seller</option>
                      <option value="Kerorine Retail Seller">Kerorine Retail Seller</option>
                      <option value="Kiddies Shop And Botique">Kiddies Shop And Botique</option>
                      <option value="Laundry (Dry Cleaner)">Laundry (Dry Cleaner)</option>
                      <option value="Law Firm3">Law Firm</option>
                      <option value="Leather Carpets (Linoleum)">Leather Carpets (Linoleum)</option>
                      <option value="Liquor|Beer Palour">Liquor|Beer Palour</option>
                      <option value="Mai Shai (Tea Maker)">Mai Shai (Tea Maker)</option>
                      <option value="Mason">Mason</option>
                      <option value="Maternity Home">Maternity Home</option>
                      <option value="Maternity Private Proprietor">Maternity Private Proprietor</option>
                      <option value="Meat Seller">Meat Seller</option>
                      <option value="Medical Laboratory">Medical Laboratory</option>
                      <option value="Mini Supermarket|Supermarket">Mini Supermarket|Supermarket</option>
                      <option value="Mobile Phone Dealer">Mobile Phone Dealer</option>
                      <option value="Mobile Phone Repairer">Mobile Phone Repairer</option>
                      <option value="Mobile Phone Seller">Mobile Phone Seller</option>
                      <option value="Money Lender">Money Lender</option>
                      <option value="Motor Cycle Dealer">Motor Cycle Dealer</option>
                      <option value="Motor Cycle Mechanic">Motor Cycle Mechanic</option>
                      <option value="Motor Cycle Spare Part Dealer">Motor Cycle Spare Part Dealer</option>
                      <option value="Motor Dealer/Seller">Motor Dealer/Seller</option>
                      <option value="Motor Spare Part Dealer">Motor Spare Part Dealer</option>
                      <option value="Motor Vehicle Mechanic">Motor Vehicle Mechanic</option>
                      <option value="Musician">Musician</option>
                      <option value="Newspaper/Magazine Vendor">Newspaper/Magazine Vendor</option>
                      <option value="Optician">Optician</option>
                      <option value="Other Businesses And Trade">Other Businesses And Trade</option>
                      <option value="Painter And Decorator">Painter And Decorator</option>
                      <option value="Paints Dealer">Paints Dealer</option>
                      <option value="Palm Oil Miller">Palm Oil Miller</option>
                      <option value="Panel Beaters & Sprayer">Panel Beaters & Sprayer</option>
                      <option value="Patent/Propriety Medicine Vendor">Patent/Propriety Medicine Vendor</option>
                      <option value="Petrol Filling Station">Petrol Filling Station</option>
                      <option value="Pharmaceutical Shop">Pharmaceutical Shop</option>
                      <option value="Phone Accessories"> Phone Accessories</option>
                      <option value="Photo Color Laboratorie">Photo Color Laboratorie</option>
                      <option value="Photographers / Photo Developer">Photographers / Photo Developer</option>
                      <option value="Photographic Materials Shop">Photographic Materials Shop</option>
                      <option value="Plastic Dealer">Plastic Dealer</option>
                      <option value="Plastic/Rubber Seller">Plastic/Rubber Seller</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Plumbing Material With Water Tanks & Access.">Plumbing Material With Water Tanks & Access.</option>
                      <option value="Plumbing Materials Only">Plumbing Materials Only</option>
                      <option value="Pool Agent">Pool Agent</option>
                      <option value="Pool Promoter">Pool Promoter</option>
                      <option value="Pos Operator (Mobile Money)">Pos Operator (Mobile Money)</option>
                      <option value="Potter">Potter</option>
                      <option value="Poultry Farmer">Poultry Farmer</option>
                      <option value="Poultry Feed">Poultry Feed</option>
                      <option value="Printer">Printer</option>
                      <option value="Private Medical Practioner">Private Medical Practioner</option>
                      <option value="Private N/P School">Private N/P School</option>
                      <option value="Private Secondary School">Private Secondary School</option>
                      <option value="Produce Buyer">Produce Buyer</option>
                      <option value="Provision Store">Provision Store</option>
                      <option value="Pure/Bottle Water Producer">Pure/Bottle Water Producer</option>
                      <option value="Pure/Bottle Water Seller">Pure/Bottle Water Seller</option>
                      <option value="Raw Food Seller">Raw Food Seller</option>
                      <option value="Recharge Card Dealer">Recharge Card Dealer</option>
                      <option value="Rental">Rental</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Restaurant (Buka)">Restaurant (Buka)</option>
                      <option value="Re-Wire & Battery Charger opt">Re-Wire & Battery Charger opt</option>
                      <option value="Road Side Petty Trader">Road Side Petty Trader</option>
                      <option value="Rugs & Carpet">Rugs & Carpet</option>
                      <option value="Sack Bags Seller">Sack Bags Seller</option>
                      <option value="Saw Mill">Saw Mill</option>
                      <option value="School Proprietor">School Proprietor</option>
                      <option value="Shoe Maker">Shoe Maker</option>
                      <option value="Shoe Seller">Shoe Seller</option>
                      <option value="Shops/Stall">Shops/Stall</option>
                      <option value="Solar Panel">Solar Panel</option>
                      <option value="Stylist">Stylist</option>
                      <option value="Super Market">Super Market</option>
                      <option value="Tailors/Fashion Designer">Tailors/Fashion Designer</option>
                      <option value="Thrift Collector">Thrift Collector</option>
                      <option value="Tiler">Tiler</option>
                      <option value="Timber Wood Seller">Timber Wood Seller</option>
                      <option value="Tomatoes Seller">Tomatoes Seller</option>
                      <option value="Tuber Dealer">Tuber Dealer</option>
                      <option value="Tyre Dealer">Tyre Dealer</option>
                      <option value="Video Club">Video Club</option>
                      <option value="Viewing Centre">Viewing Centre</option>
                      <option value="Vulcanizer">Vulcanizer</option>
                      <option value="Weaver">Weaver</option>
                      <option value="Weaver">Welder</option>
                      <option value="Wheel Barrow Quiosk">Wheel Barrow Quiosk</option>
                      <option value="Wine And Beer License Operator">Wine And Beer License Operator</option>
                      <option value="Yam Seller">Yam Seller</option>
                      <option value="Yoghurt Seller">Yoghurt Seller</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >Business Name:</label>
                    <input name="business_name" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Business Address:</label>
                    <input name="business_addr" type="text" id="businessaddress" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Business Start date:</label>
                    <input name="business_start_date" type="date" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="turnover">Turnover-takings, fees, sales or money earned by your business:</label>
                    <input required placeholder="₦" name="income_earned" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="turnover">Any other business income not included above:</label>
                    <input placeholder="₦" name="other_income" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="cashbases">Do you use cash basis, money actually received and paid out, to calculate your income expense ?</label>
                    <div className="flex">
                      <div className="form-check form-check-inline">
                        <input required value="Yes" name="cash_inc_expense" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                        <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">No</label>
                      </div>

                      <div className="form-check form-check-inline ml-5">
                        <input required value="No" name="cash_inc_expense" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                        <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Yes</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="expenses">How would you like to record your expenses?</label>
                      <div className="flex">
                        <div className="form-check form-check-inline">
                          <input value="Break down" name="expense" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Break down</label>
                        </div>

                        <div className="form-check form-check-inline ml-5">
                          <input value="Total" name="expense" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Total</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="expenses">Are figures provided provisional or estimated?</label>
                    <div className="flex">
                      <div className="form-check form-check-inline">
                        <input value="Estimated" name="figures_estimated" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                        <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Estimated</label>
                      </div>

                      <div className="form-check form-check-inline ml-5">
                        <input value="Estimated" name="Provisional" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                        <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Provisional</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <label className="font-bold"> Total Business Income :</label>
                    <p className="font-bold"> NGN {totalBusInc}</p>
                  </div>
                  <div className='pb-5'>
                    <hr />
                  </div>
                </div><div className="mb-6 flex justify-between">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                    disabled
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
              </div>
              :
              <div>
                {selfEmployment.map((ind, i) => (
                  <div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="typeofbusiness">Type of business:</label>
                      <select onChange={(e) => changedSelfEmployed(e, i, "business_type")} key={i} value={ind.business_type} className="form-select" name="business_type" >
                        <option value="select">Select Business </option>
                        <option value="Agro Allied Products">Agro Allied Products</option>
                        <option value="Aircondition Repairer">Aircondition Repairer</option>
                        <option value="Aluminum Doors & Windows">Aluminum Doors & Windows</option>
                        <option value="Animal Feed Maker">Animal Feed Maker</option>
                        <option value="Architechtural Design">Architechtural Design</option>
                        <option value="Architect">Architect</option>
                        <option value="Artist And Song-Writer">Artist And Song-Writer</option>
                        <option value="Baby Wear">Baby Wear</option>
                        <option value="Curtain & Interior Decoration">Curtain & Interior Decoration</option>
                        <option value="Cyber Cafe Operator">Cyber Cafe Operator</option>
                        <option value="Dealers In Mattress/Foams">Dealers In Mattress/Foams</option>
                        <option value="Djs Entertainment">Djs Entertainment</option>
                        <option value="Doors Seller">Doors Seller</option>
                        <option value="Drama Group">Drama Group</option>
                        <option value="Electrical Parts & Fitting">Electrical Parts & Fitting</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Electronics Dealer">Electronics Dealer</option>
                        <option value="Engine Oil/ Kerosene Seller">Engine Oil/ Kerosene Seller</option>
                        <option value="Estate Managers/ Agent">Estate Managers/ Agent</option>
                        <option value="Event Centre">Event Centre</option>
                        <option value="Event Planner">Event Planner</option>
                        <option value="Fashion Designer">Fashion Designer</option>
                        <option value="Films & Cinemas Center">Films & Cinemas Center</option>
                        <option value="Fish Seller">Fish Seller</option>
                        <option value="Fowl Seller">Fowl Seller</option>
                        <option value="Fruit Seller">Fruit Seller</option>
                        <option value="Furnishing Materials Seller">Furnishing Materials Seller</option>
                        <option value="Furniture / Furnishing Materials Seller">Furniture / Furnishing Materials Seller</option>
                        <option value="Furniture Maker">Furniture Maker</option>
                        <option value="Gas Refilling Seller">Gas Refilling Seller</option>
                        <option value="Generator Mechanic">Generator Mechanic</option>
                        <option value="Gift Shop">Gift Shop</option>
                        <option value="Graphic Arts & Design">Graphic Arts & Design</option>
                        <option value="Grinding Mill">Grinding Mill</option>
                        <option value="Guest House">Guest House</option>
                        <option value="Hairdressers And Barber">Hairdressers And Barber</option>
                        <option value="Higher Institutions Private">Higher Institutions Private</option>
                        <option value="Horticulture / Florist">Horticulture / Florist</option>
                        <option value="Hotel Proprietor">Hotel Proprietor</option>
                        <option value="Ict/ Computer Accessories">Ict/ Computer Accessories</option>
                        <option value="Interior Decorator">Interior Decorator</option>
                        <option value="Iron Bender">Iron Bender</option>
                        <option value="Jewelry Seller">Jewelry Seller</option>
                        <option value="Kerorine Retail Seller">Kerorine Retail Seller</option>
                        <option value="Kiddies Shop And Botique">Kiddies Shop And Botique</option>
                        <option value="Laundry (Dry Cleaner)">Laundry (Dry Cleaner)</option>
                        <option value="Law Firm3">Law Firm</option>
                        <option value="Leather Carpets (Linoleum)">Leather Carpets (Linoleum)</option>
                        <option value="Liquor|Beer Palour">Liquor|Beer Palour</option>
                        <option value="Mai Shai (Tea Maker)">Mai Shai (Tea Maker)</option>
                        <option value="Mason">Mason</option>
                        <option value="Maternity Home">Maternity Home</option>
                        <option value="Maternity Private Proprietor">Maternity Private Proprietor</option>
                        <option value="Meat Seller">Meat Seller</option>
                        <option value="Medical Laboratory">Medical Laboratory</option>
                        <option value="Mini Supermarket|Supermarket">Mini Supermarket|Supermarket</option>
                        <option value="Mobile Phone Dealer">Mobile Phone Dealer</option>
                        <option value="Mobile Phone Repairer">Mobile Phone Repairer</option>
                        <option value="Mobile Phone Seller">Mobile Phone Seller</option>
                        <option value="Money Lender">Money Lender</option>
                        <option value="Motor Cycle Dealer">Motor Cycle Dealer</option>
                        <option value="Motor Cycle Mechanic">Motor Cycle Mechanic</option>
                        <option value="Motor Cycle Spare Part Dealer">Motor Cycle Spare Part Dealer</option>
                        <option value="Motor Dealer/Seller">Motor Dealer/Seller</option>
                        <option value="Motor Spare Part Dealer">Motor Spare Part Dealer</option>
                        <option value="Motor Vehicle Mechanic">Motor Vehicle Mechanic</option>
                        <option value="Musician">Musician</option>
                        <option value="Newspaper/Magazine Vendor">Newspaper/Magazine Vendor</option>
                        <option value="Optician">Optician</option>
                        <option value="Other Businesses And Trade">Other Businesses And Trade</option>
                        <option value="Painter And Decorator">Painter And Decorator</option>
                        <option value="Paints Dealer">Paints Dealer</option>
                        <option value="Palm Oil Miller">Palm Oil Miller</option>
                        <option value="Panel Beaters & Sprayer">Panel Beaters & Sprayer</option>
                        <option value="Patent/Propriety Medicine Vendor">Patent/Propriety Medicine Vendor</option>
                        <option value="Petrol Filling Station">Petrol Filling Station</option>
                        <option value="Pharmaceutical Shop">Pharmaceutical Shop</option>
                        <option value="Phone Accessories"> Phone Accessories</option>
                        <option value="Photo Color Laboratorie">Photo Color Laboratorie</option>
                        <option value="Photographers / Photo Developer">Photographers / Photo Developer</option>
                        <option value="Photographic Materials Shop">Photographic Materials Shop</option>
                        <option value="Plastic Dealer">Plastic Dealer</option>
                        <option value="Plastic/Rubber Seller">Plastic/Rubber Seller</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Plumbing Material With Water Tanks & Access.">Plumbing Material With Water Tanks & Access.</option>
                        <option value="Plumbing Materials Only">Plumbing Materials Only</option>
                        <option value="Pool Agent">Pool Agent</option>
                        <option value="Pool Promoter">Pool Promoter</option>
                        <option value="Pos Operator (Mobile Money)">Pos Operator (Mobile Money)</option>
                        <option value="Potter">Potter</option>
                        <option value="Poultry Farmer">Poultry Farmer</option>
                        <option value="Poultry Feed">Poultry Feed</option>
                        <option value="Printer">Printer</option>
                        <option value="Private Medical Practioner">Private Medical Practioner</option>
                        <option value="Private N/P School">Private N/P School</option>
                        <option value="Private Secondary School">Private Secondary School</option>
                        <option value="Produce Buyer">Produce Buyer</option>
                        <option value="Provision Store">Provision Store</option>
                        <option value="Pure/Bottle Water Producer">Pure/Bottle Water Producer</option>
                        <option value="Pure/Bottle Water Seller">Pure/Bottle Water Seller</option>
                        <option value="Raw Food Seller">Raw Food Seller</option>
                        <option value="Recharge Card Dealer">Recharge Card Dealer</option>
                        <option value="Rental">Rental</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Restaurant (Buka)">Restaurant (Buka)</option>
                        <option value="Re-Wire & Battery Charger opt">Re-Wire & Battery Charger opt</option>
                        <option value="Road Side Petty Trader">Road Side Petty Trader</option>
                        <option value="Rugs & Carpet">Rugs & Carpet</option>
                        <option value="Sack Bags Seller">Sack Bags Seller</option>
                        <option value="Saw Mill">Saw Mill</option>
                        <option value="School Proprietor">School Proprietor</option>
                        <option value="Shoe Maker">Shoe Maker</option>
                        <option value="Shoe Seller">Shoe Seller</option>
                        <option value="Shops/Stall">Shops/Stall</option>
                        <option value="Solar Panel">Solar Panel</option>
                        <option value="Stylist">Stylist</option>
                        <option value="Super Market">Super Market</option>
                        <option value="Tailors/Fashion Designer">Tailors/Fashion Designer</option>
                        <option value="Thrift Collector">Thrift Collector</option>
                        <option value="Tiler">Tiler</option>
                        <option value="Timber Wood Seller">Timber Wood Seller</option>
                        <option value="Tomatoes Seller">Tomatoes Seller</option>
                        <option value="Tuber Dealer">Tuber Dealer</option>
                        <option value="Tyre Dealer">Tyre Dealer</option>
                        <option value="Video Club">Video Club</option>
                        <option value="Viewing Centre">Viewing Centre</option>
                        <option value="Vulcanizer">Vulcanizer</option>
                        <option value="Weaver">Weaver</option>
                        <option value="Weaver">Welder</option>
                        <option value="Wheel Barrow Quiosk">Wheel Barrow Quiosk</option>
                        <option value="Wine And Beer License Operator">Wine And Beer License Operator</option>
                        <option value="Yam Seller">Yam Seller</option>
                        <option value="Yoghurt Seller">Yoghurt Seller</option>
                      </select>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label >Business Name:</label>
                      <input onChange={(e) => changedSelfEmployed(e, i, "business_name")} key={i} value={ind.business_name} name="business_name" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Business Address:</label>
                      <input value={ind.business_addr} onChange={(e) => changedSelfEmployed(e, i, "business_addr")} key={i} name="business_addr" type="text" id="businessaddress" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Business Start date:</label>
                      <input value={ind.business_start_date} onChange={(e) => changedSelfEmployed(e, i, "business_start_date")} name="business_start_date" type="date" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="turnover">Turnover-takings, fees, sales or money earned by your business:</label>
                      <input value={ind.income_earned} onChange={(e) => changedSelfEmployed(e, i, "income_earned")} required placeholder="₦" name="income_earned" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="turnover">Any other business income not included above:</label>
                      <input value={ind.other_income} onChange={(e) => changedSelfEmployed(e, i, "other_income")} placeholder="₦" name="other_income" type="text" className="form-control w-full rounded"
                      />
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Do you use cash basis, money actually received and paid out, to calculate your income expense ?</label>
                      <div className="flex">
                        <div className="form-check form-check-inline">
                          <select name="cash_inc_expense" onChange={(e) => changedSelfEmployed(e, i, "cash_inc_expense")} value={ind.cash_inc_expense} className="w-64">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                          {/* <input onChange={(e) => changedSelfEmployed(e, i, "cash_inc_expense")} name={`cash_inc_expense`} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">No</label>
                        </div>

                        <div className="form-check form-check-inline ml-5">
                          <input onChange={(e) => changedSelfEmployed(e, i, "cash_inc_expense")} required name={`cash_inc_expense`} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Yes</label> */}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <label htmlFor="expenses">How would you like to record your expenses?</label>
                        <div className="flex">
                          <div className="form-check form-check-inline">
                            <select name="expense" onChange={(e) => changedSelfEmployed(e, i, "expense")} value={ind.expense} className="w-64">
                              <option value="break down">Break Down</option>
                              <option value="total">Total</option>
                            </select>
                            {/* <input onChange={(e) => changedSelfEmployed(e, i, "expense")} value="Break down" name="expense" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Break down</label>
                          </div>

                          <div className="form-check form-check-inline ml-5">
                            <input value="Total" name="expense" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Total</label> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="expenses">Are figures provided provisional or estimated?</label>
                      <div className="flex">
                        <div className="form-check form-check-inline">
                          <select name="figures_estimated" onChange={(e) => changedSelfEmployed(e, i, "figures_estimated")} value={ind.figures_estimated} className="w-64">
                            <option value="estimated">Estimated</option>
                            <option value="provisional">Provisional</option>
                          </select>
                          {/* <input onChange={(e) => changedSelfEmployed(e, i, "figures_estimated")} value="Estimated" name="figures_estimated" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio1" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Estimated</label>
                        </div>

                        <div className="form-check form-check-inline ml-5">
                          <input onChange={(e) => changedSelfEmployed(e, i, "figures_estimated")} value="Estimated" name="figures_estimated" className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineRadio2" />
                          <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">Provisional</label> */}
                        </div>
                      </div>
                    </div>
                    <div className='pb-5'>
                      <hr />
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

                  <button onClick={formTog2} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <a href="">
                      <FiTriangle
                        size={15}
                        className="stroke-current text-green-500"
                      />
                    </a>
                  </button>
                </div>
              </div>
            }

          </form>



          <form onSubmit={submitDataExpenses}>
            {expenses == null || expenses == "" ?
              <div>
                <p className="font-bold">Expenses</p>
                <div className="mb-6 grid grid-cols-3 gap-4">

                  <input required name="item" type="text" className="form-control w-full rounded"
                    placeholder="Item"
                  />
                  <input required name="amount" type="text" className="form-control w-full rounded"
                    placeholder="Amount"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                    disabled
                  >
                    Save Expenses
                  </button>
                </div>
              </div>
              :
              <div>
                {expenses.map((ind, i) => (
                  <div>
                    <p className="font-bold">Expenses</p>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <input required name="item" key={i} type="text" className="form-control w-full rounded"
                        value={ind.item} placeholder="Item" onChange={(e) => changedExpenses(e, i, "item")}
                      />
                      <input required name="amount" type="text" className="form-control w-full rounded"
                        value={ind.amount} placeholder="Value" key={i} onChange={(e) => changedExpenses(e, i, "amount")}
                      />
                    </div>
                  </div>

                ))}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <button
                    style={{ backgroundColor: "#84abeb" }}
                    className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                    type="submit"
                  >
                    Update Expenses
                  </button>
                </div>
              </div>
            }
          </form>
        </div>
      </div>
      <div className="flex justify-between mb-5">
        <p>Life Assurance </p>
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
        <form onSubmit={submitDataLap}>
          {lifeass == null || lifeass == "" ?
            <div div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Insurance Company:</label>
                <input name="company" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Address:</label>
                <input name="addr" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">RSA No:</label>
                <input name="rsa_no" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Amount:</label>
                <input required placeholder="₦" name="amount" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="comments">Optional Comments:</label>
                <textarea name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog11} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>

            </div>
            :
            <div>
              {lifeass.map((ind, i) => (

                <div div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Insurance Company:</label>
                    <input value={ind.company} key={i} onChange={(e) => changedLap(e, i, "company")} name="company" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Address:</label>
                    <input value={ind.addr} key={i} onChange={(e) => changedLap(e, i, "addr")} name="addr" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">RSA No:</label>
                    <input value={ind.rsa_no} onChange={(e) => changedLap(e, i, "rsa_no")} name="rsa_no" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="employername">Amount:</label>
                    <input value={ind.amount} onChange={(e) => changedLap(e, i, "amount")} required placeholder="₦" name="amount" type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label htmlFor="comments">Optional Comments:</label>
                    <textarea value={ind.comments} onChange={(e) => changedLap(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                </div>
              ))}
              <div className="mb-6 flex justify-between">
                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Update Lap
                </button>
                <button onClick={formTog11} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }


        </form>
      </div >

      <div className="flex justify-between mb-5">
        <p>NHIS</p>
        <div className="flex">

          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange23} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions12" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange24} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions12" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>



      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee12}`}>
        <form onSubmit={submitDataNhis}>
          {nhis == null || nhis == "" ?
            <div div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Company:</label>
                <input name="company" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Address:</label>
                <input name="addr" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Insurance No:</label>
                <input required name="insurance_no" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Amount:</label>
                <input required name="amount" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="comments">Optional Comments:</label>
                <textarea name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog12} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div className="">
              {nhis.map((ind, i) => (
                <div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Company:</label>
                    <input value={ind.company} onChange={(e) => changedNhis(e, i, "company")} name="company" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Address:</label>
                    <input value={ind.addr} onChange={(e) => changedNhis(e, i, "addr")} name="addr" type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Insurance No:</label>
                    <input value={ind.insurance_no} onChange={(e) => changedNhis(e, i, "insurance_no")} required name="insurance_no" type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Amount:</label>
                    <input value={ind.amount} onChange={(e) => changedNhis(e, i, "amount")} required name="amount" type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea value={ind.comments} onChange={(e) => changedNhis(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog12} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }


        </form>
      </div >

      <div className="flex justify-between mb-5">

        <p>Partnership</p>


        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange5} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions3" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange6} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions3" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>
      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee3}`}>
        <form onSubmit={submitDataPartner}>
          {partner == null || partner == "" ?

            <div>
              <div className="">
                <p className="font-bold flex justify-center mb-4"></p>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label >Partner Name:</label>
                  <input required name="name" type="text" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Partner Address:</label>
                  <input name="addr" type="text" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Partner Phone:</label>
                  <input name="phone" type="text" className="form-control w-full rounded"
                  />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="employername">Partner Percentage:</label>
                  <input name="percentage" type="text" className="form-control w-full rounded"
                  />
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <label htmlFor="comments">Optional Comments:</label>
                  <textarea name="comments" cols="40" rows="2" className="rounded"></textarea>
                </div>
                <div className='pb-5'>
                  <hr />
                </div>
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
                <button onClick={formTog3} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {partner.map((ind, i) => (
                <div>
                  <div className="">
                    <p className="font-bold flex justify-center mb-4"></p>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label >Partner Name:</label>
                      <input value={ind.name} onChange={(e) => changedPartner(e, i, "name")} required name="name" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label>Partner Address:</label>
                      <input value={ind.addr} onChange={(e) => changedPartner(e, i, "addr")} name="addr" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Partner Phone:</label>
                      <input value={ind.phone} onChange={(e) => changedPartner(e, i, "phone")} name="phone" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="employername">Partner Percentage:</label>
                      <input value={ind.percentage} onChange={(e) => changedPartner(e, i, "percentage")} name="percentage" type="text" className="form-control w-full rounded"
                      />
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <label htmlFor="comments">Optional Comments:</label>
                      <textarea value={ind.comments} onChange={(e) => changedPartner(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                    </div>
                    <div className='pb-5'>
                      <hr />
                    </div>
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
                <button onClick={formTog3} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }
        </form>
      </div>

      <div className="flex justify-between mb-5">

        <p>Rent Income </p>

        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange7} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions4" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange8} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions4" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>

      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee4}`}>

        <form onSubmit={submitDataRentIncome}>
          {rentIncome == null || rentIncome == "" ?

            <div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Property Type:</label>
                <select name="prop_type">
                  <option value="Bungalow">Bungalow</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Mansion">Mansion</option>
                  <option value="Apartment or Flat">Apartment or Flat</option>
                  <option value="Terraced house">Terraced house</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Traditional house">Traditional house</option>
                </select>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Property Address:</label>
                <input type="text" name="prop_address" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Rental Type:</label>
                <select className="form-select" name="rental_type">
                  <option value="Lease">Lease</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Rental Amount(Annual):</label>
                <input type="text" placeholder="₦" name="rental_amount" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Renter Name:</label>
                <input type="text" name="renter_name" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <labe>Renter Phone number:</labe>
                <input type="text" name="renter_phone" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Optional Comments:</label>
                <textarea name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog4} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {rentIncome.map((ind, i) => (

                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Property Type:</label>
                    <select value={ind.prop_type} onChange={(e) => changedRentIncome(e, i, "prop_type")} name="prop_type">
                      <option value="Bungalow">Bungalow</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Mansion">Mansion</option>
                      <option value="Apartment or Flat">Apartment or Flat</option>
                      <option value="Terraced house">Terraced house</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Traditional house">Traditional house</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Property Address:</label>
                    <textarea onChange={(e) => changedRentIncome(e, i, "prop_address")} value={ind.prop_address} name="prop_address" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Rental Type:</label>
                    <select value={ind.rental_type} onChange={(e) => changedRentIncome(e, i, "rental_type")} className="form-select" name="rental_type">
                      <option value="Lease">Lease</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Rental Amount(Annual):</label>
                    <input value={ind.rental_amount} onChange={(e) => changedRentIncome(e, i, "rental_amount")} type="text" placeholder="₦" name="rental_amount" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Renter Name:</label>
                    <input value={ind.renter_name} onChange={(e) => changedRentIncome(e, i, "renter_name")} type="text" name="renter_name" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <labe>Renter Phone number:</labe>
                    <input value={ind.renter_phone} onChange={(e) => changedRentIncome(e, i, "renter_phone")} type="text" name="renter_phone" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea value={ind.comments} onChange={(e) => changedRentIncome(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog4} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }
        </form>
      </div>


      <div className="flex justify-between mb-5">

        <p>Bank interest </p>


        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange9} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions5" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange10} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions5" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>

      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee5}`}>
        <form onSubmit={submitDataBankInterest}>
          {bankInterest == null || bankInterest == "" ?

            <div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Bank Name:</label>
                <input name="name" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Bank Account:</label>
                <input name="account" type="text" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Bank Verification Number (BVN):</label>
                <input name="bvn" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label >Gross Amount:</label>
                <input required name="gross_amount" placeholder="₦" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Optional Comments:</label>
                <textarea name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog5} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {bankInterest.map((ind, i) => (
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Bank Name:</label>
                    <input value={ind.name} onChange={(e) => changedBankInterest(e, i, "name")} name="name" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Bank Account:</label>
                    <input value={ind.account} onChange={(e) => changedBankInterest(e, i, "account")} name="account" type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Bank Verification Number (BVN):</label>
                    <input value={ind.bvn} onChange={(e) => changedBankInterest(e, i, "bvn")} name="bvn" type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >Gross Amount:</label>
                    <input value={ind.gross_amount} onChange={(e) => changedBankInterest(e, i, "gross_amount")} required name="gross_amount" placeholder="₦" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea value={ind.comments} onChange={(e) => changedBankInterest(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog5} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }
        </form>
      </div>

      <div className="flex justify-between mb-5">

        <p>Bank dividends </p>

        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange11} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions6" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange12} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions6" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>
      </div>
      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee6}`}>
        <form onSubmit={submitDataBankDividends}>
          {dividends == null || dividends == "" ?

            <div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Company Name:</label>
                <input name="name" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Company address:</label>
                <textarea name="addr" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Gross Amount:</label>
                <input required name="amount" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Optional Comments:</label>
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
                <button onClick={formTog6} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {dividends.map((ind, i) => (
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Company Name:</label>
                    <input value={ind.name} onChange={(e) => changedBankDividends(e, i, "name")} name="name" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Company address:</label>
                    <textarea value={ind.addr} onChange={(e) => changedBankDividends(e, i, "addr")} name="addr" type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Gross Amount:</label>
                    <input value={ind.amount} onChange={(e) => changedBankDividends(e, i, "amount")} required name="amount" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea value={ind.comments} onChange={(e) => changedBankDividends(e, i, "comments")} name="comments" id="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog6} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }
        </form>
      </div>

      <div className="flex justify-between mb-5">

        <p>Pension </p>

        <div className="flex">
          <div className="form-check form-check-inline">
            <input onClick={onChange13} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions7" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange14} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions7" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>
      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee7}`}>
        <form onSubmit={submitDataPension}>
          {pension == null || pension == "" ?

            <div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label >PFA:</label>
                <input name="pfa" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>PFA address:</label>
                <input name="pfa_addr" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label> Gross Amount:</label>
                <input required name="gross_amount" placeholder="₦" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Optional Comments:</label>
                <textarea name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog7} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {pension.map((ind, i) => (

                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >PFA:</label>
                    <input value={ind.pfa} onChange={(e) => changedPension(e, i, "pfa")} name="pfa" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>PFA address:</label>
                    <textarea value={ind.pfa_addr} onChange={(e) => changedPension(e, i, "pfa_addr")} name="pfa_addr" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label> Gross Amount:</label>
                    <input value={ind.gross_amount} onChange={(e) => changedPension(e, i, "gross_amount")} required name="gross_amount" placeholder="₦" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea value={ind.comments} onChange={(e) => changedPension(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog7} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }
        </form>
      </div>
      <div className="flex justify-between mb-5">

        <p>Sale of Asset </p>

        <div className="flex">

          <div className="form-check form-check-inline">
            <input onClick={onChange15} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions8" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div onClick={onChange16} className="form-check form-check-inline ml-5">
            <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions8" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>
      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee8}`}>

        <form onSubmit={submitDataAsset}>
          {asset == null || asset == "" ?
            <div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label >Asset Type:</label>
                <select className="form-select" name="asset_type">
                  <option value="landed property">Landed Property</option>
                  <option value="house">House</option>
                  <option value="farm land">Farm Land</option>
                </select>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label >Asset Address:</label>
                <input name="asset_addr" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Buyer:</label>
                <input name="buyer_name" type="text" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Buyer address:</label>
                <input name="buyer_addr" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Buyer Phone number:</label>
                <input name="buyer_phone" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Sale amount:</label>
                <input required name="amount" placeholder="₦" type="text" id="employername" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Optional Comments:</label>
                <textarea name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog8} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {asset.map((ind, i) => (
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >Asset Type:</label>
                    <select value={ind.asset_type} onChange={(e) => changedAsset(e, i, "asset_type")} className="form-select" name="asset_type">
                      <option value="landed property">Landed Property</option>
                      <option value="house">House</option>
                      <option value="farm land">Farm Land</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label >Asset Address:</label>
                    <textarea value={ind.asset_addr} onChange={(e) => changedAsset(e, i, "asset_addr")} name="asset_addr" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Buyer:</label>
                    <input value={ind.buyer_name} onChange={(e) => changedAsset(e, i, "buyer_name")} name="buyer_name" type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Buyer address:</label>
                    <textarea value={ind.buyer_addr} onChange={(e) => changedAsset(e, i, "buyer_addr")} name="buyer_addr" type="text" id="employername" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Buyer Phone number:</label>
                    <input value={ind.buyer_phone} onChange={(e) => changedAsset(e, i, "buyer_phone")} name="buyer_phone" type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Sale amount:</label>
                    <input value={ind.amount} onChange={(e) => changedAsset(e, i, "amount")} required name="amount" placeholder="₦" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea value={ind.comments} onChange={(e) => changedAsset(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Update
                    </button>
                    <button onClick={formTog8} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                      <a href="">
                        <FiTriangle
                          size={15}
                          className="stroke-current text-green-500"
                        />
                      </a>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          }
        </form>
      </div>

      <div className="flex justify-between mb-5">

        <p>Outside Source </p>

        <div className="flex">

          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange17} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions9" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange18} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions9" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>

        </div>
      </div>

      <div className={`flex justify-center border mb-3 block p-6 rounded-lg bg-white w-full ${togglee9}`}>
        <form onSubmit={submitDataOutside}>
          {outsideSource == null || outsideSource == "" ?
            <div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Source:</label>
                <input name="source" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Gross Amount:</label>
                <input required placeholder="₦" name="gross_amount" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Optional Comments:</label>
                <textarea name="comments" cols="40" rows="2" className="rounded"></textarea>
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
                <button onClick={formTog9} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {outsideSource.map((ind, i) => (
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Source:</label>
                    <input value={ind.source} onChange={(e) => changedOutsideSource(e, i, "source")} name="source" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Gross Amount:</label>
                    <input value={ind.gross_amount} onChange={(e) => changedOutsideSource(e, i, "gross_amount")} required placeholder="₦" name="gross_amount" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Optional Comments:</label>
                    <textarea value={ind.comments} onChange={(e) => changedOutsideSource(e, i, "comments")} name="comments" cols="40" rows="2" className="rounded"></textarea>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <button
                      style={{ backgroundColor: "#84abeb" }}
                      className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Update
                    </button>
                    <button onClick={formTog9} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                      <a href="">
                        <FiTriangle
                          size={15}
                          className="stroke-current text-green-500"
                        />
                      </a>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          }
        </form>
      </div>

      <div className="flex justify-between mb-5">

        <p>Vehicle </p>


        <div className="flex">
          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange25} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions13" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange26} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions13" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>

      <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee13}`}>
        <form onSubmit={submitDataVehicles}>
          {vehicles == null || vehicles == "" ?

            <div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Date of purchase:</label>
                <input required name="purchase_date" type="date" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Cost:</label>
                <input required name="cost" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Brand:</label>
                <input type="text" name="brand"></input>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <labe>Model:</labe>
                <input name="model" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Year:</label>
                <input type="text" placeholder="YYYY" min="1990" max="2100"></input>
                {/* <input required name="year" type="date" className="form-control w-full rounded"
                /> */}
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
                <button onClick={formTog13} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {vehicles.map((ind, i) => (
                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Date of purchase:</label>
                    <input value={ind.purchase_date} onChange={(e) => changedVehicles(e, i, "purchase_date")} required name="purchase_date" type="date" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Cost:</label>
                    <input value={ind.cost} onChange={(e) => changedVehicles(e, i, "cost")} required name="cost" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Brand:</label>
                    <input value={ind.brand} onChange={(e) => changedVehicles(e, i, "brand")} type="text" name="brand"></input>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <labe>Model:</labe>
                    <input value={ind.model} onChange={(e) => changedVehicles(e, i, "model")} name="model" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Year:</label>
                    <input value={ind.year} onChange={(e) => changedVehicles(e, i, "year")} type="text" placeholder="YYYY" min="1990" max="2100"></input>


                  </div>
                  <div className="m-3">

                    <hr />
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
                <button onClick={formTog13} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }
        </form>
      </div>

      <div className="flex justify-between mb-5">

        <p>Landed Property </p>


        <div className="flex">
          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange27} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions14" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio1">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange28} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions14" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio2">No</label>
          </div>
        </div>
      </div>
      <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee14}`}>
        <form onSubmit={submitDataLand}>
          {land == null || land == "" ?
            <div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Address:</label>
                <textarea name="addr" cols="40" rows="2" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Type of property:</label>
                <select name="prop_type" className="form-select w-full">
                  <option value="Bungalow">Bungalow</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Mansion">Mansion</option>
                  <option value="Apartment or Flat">Apartment or Flat</option>
                  <option value="Terraced house">Terraced house</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Traditional house">Traditional house</option>
                </select>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Date of completion/acquisition:</label>
                <input required name="date_completion" type="date" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Cost of construction/acquisition:</label>
                <input required name="construction_cost" type="text" className="form-control w-full rounded"
                />
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
                <button onClick={formTog14} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {land.map((ind, i) => (

                <div className="" key={i}>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Address:</label>
                    <textarea value={ind.addr} onChange={(e) => changedLand(e, i, "addr")} name="addr" cols="40" rows="2" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Type of property:</label>
                    <select value={ind.prop_type} onChange={(e) => changedLand(e, i, "prop_type")} name="prop_type" className="form-select w-full">
                      <option value="Bungalow">Bungalow</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Mansion">Mansion</option>
                      <option value="Apartment or Flat">Apartment or Flat</option>
                      <option value="Terraced house">Terraced house</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Traditional house">Traditional house</option>
                    </select>
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Date of completion/acquisition:</label>
                    <input value={ind.date_completion} onChange={(e) => changedLand(e, i, "date_completion")} required name="date_completion" type="date" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Cost of construction/acquisition:</label>
                    <input value={ind.construction_cost} onChange={(e) => changedLand(e, i, "construction_cost")} required name="construction_cost" type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="m-3">
                    <hr />
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
                <button onClick={formTog14} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }
        </form>
      </div>
      <div className="flex justify-between mb-5">

        <p>Farmland </p>


        <div className="flex">
          <div className="form-check form-check-inline flex ustify-evenly">
            <input onClick={onChange29} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions15" id="inlineRadio1" value="option1" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio10">Yes</label>
          </div>

          <div className="form-check form-check-inline ml-5">
            <input onClick={onChange30} className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions15" id="inlineRadio2" value="option2" />
            <label className="form-check-label inline-block text-gray-800" for="inlineRadio20">No</label>
          </div>
        </div>
      </div>

      <div className={`flex justify-start border mb-3 block p-6 rounded-lg bg-white w-full ${togglee15}`}>
        <form onSubmit={submitDataFarm}>
          {farm == null || farm == "" ?

            <div className="">
              <div className="mb-6 grid grid-cols-3 gap-4">
                <abel>Address:</abel>
                <input name="addr" type="text" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Date of acquisition:</label>
                <input required name="acq_date" type="date" className="form-control w-full rounded"
                />
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Cost of Land:</label>
                <input required placeholder="₦" name="land_cost" type="text" className="form-control w-full rounded"
                />
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label>Cost of Produce:</label>
                <input required name="produce_cost" type="text" className="form-control w-full rounded"
                />
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
                <button onClick={formTog15} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div> :
            <div>
              {farm.map((ind, i) => (

                <div className="">
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <abel>Address:</abel>
                    <textarea value={ind.addr} onChange={(e) => changedFarm(e, i, "addr")} name="addr" type="text" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Date of acquisition:</label>
                    <input value={ind.acq_date} onChange={(e) => changedFarm(e, i, "acq_date")} required name="acq_date" type="date" className="form-control w-full rounded"
                    />
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Cost of Land:</label>
                    <input value={ind.land_cost} onChange={(e) => changedFarm(e, i, "land_cost")} required placeholder="₦" name="land_cost" type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <label>Cost of Produce:</label>
                    <input value={ind.produce_cost} onChange={(e) => changedFarm(e, i, "produce_cost")} required name="produce_cost" type="text" className="form-control w-full rounded"
                    />
                  </div>
                  <div className="m-3">
                    <hr />
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
                <button onClick={formTog15} className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <a href="">
                    <FiTriangle
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </a>
                </button>
              </div>
            </div>
          }
        </form>
      </div>
      <form onSubmit={submitForm}>

        <div className="mb-6 flex justify-center">
          <button
            style={{ backgroundColor: "#84abeb" }}
            className="btn w-64 btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          >
            Submit form
          </button>
        </div>
      </form>
    </>
  );
};