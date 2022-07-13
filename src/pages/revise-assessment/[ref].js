import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import setAuthToken from '../../functions/setAuthToken';
import url from '../../config/url';
import axios from "axios";
import Loader from 'react-loader-spinner';
import SectionTitle from '../../components/section-title';

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


  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split(',').pop()
      let assessId = routerData.split(',').shift()
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
        <form>
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
        </form>
      </div>
    </>
  )
}
