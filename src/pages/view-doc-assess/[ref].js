import url from '../../config/url';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";

const ViewDoc = () => {
    const router = useRouter();
    const [payerprop, setpayerprop] = useState({});
    const [isFetching, setIsFetching] = useState(() => true);
    const [globalAssId, setGlobalAssId] = useState("")
    const [employed, setEmployed] = useState([])

    useEffect(() => {
        if (router && router.query) {
            let routerData = String(router.query.ref);
            let kgtin = routerData.split(',').pop()
            let assessmentId = routerData.split(',').shift()
            let sendData = {
                KGTIN: `${kgtin}`,
                assessment_id: `${assessmentId}`
            }
            setGlobalAssId(assessmentId)
            setAuthToken()
            const fetchPost = async () => {
                try {
                    let res = await axios.post(`${url.BASE_URL}forma/view-assessment`, sendData);
                    let IndData = res.data.body
                    let employedat = IndData.employed
                    setEmployed(employedat)
                } catch (err) {
                    console.log(err);
                }
            };
            fetchPost();
        }
    }, [router]);
    return (
        <>
            <p>Payslip</p>
            <div>
                {employed == null || employed == ""
                    ? <p className="font-bold">No Documents</p> :
                    employed.map((el, i) =>
                        <button key={i}
                            className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                        >
                            <a href={`https://annualuploads.bespoque.dev/rhm/uploads/da/forma/${el.pay_slip}`} target="_blank"> View Documents</a>
                        </button>
                    )
                }
            </div>

        </>
    )
};

export default ViewDoc;
