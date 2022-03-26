import url from '../../config/url';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import Loader from 'react-loader-spinner';

const ViewDocumentsTcc = () => {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(() => true);
    const [uploads, setUploads] = useState([])
    const uploadBase = 'https://annualuploads.bespoque.dev/rhm-live/uploads/da/tcc/'
    const coverLetter = uploads.map(function (doc) {
        let cover = doc.doc
        return cover
    })

    const applet = uploads.filter(person => person.item === "sign");

    // const docLet = applet.filter(item => item.doc !== null && item !== "")
    const docLet = applet.map(item => item.doc)

    console.log("applet", applet);
    console.log("doclet", docLet);

    useEffect(() => {
        if (router && router.query) {
            let tCCId = router.query.ref;
            let userId = {
                id: `${tCCId}`
            }
            setAuthToken()
            const fetchPost = async () => {
                try {
                    let res = await axios.post(`${url.BASE_URL}forma/view-tcc`, userId);
                    let tccData = res.data.body.tccUploads
                    setUploads(tccData)
                    console.log(tccData);
                    setIsFetching(false)
                } catch (err) {
                    setIsFetching(false)
                    console.log(err);
                }
            };
            fetchPost();
        }
    }, [router]);
    return (

        <>
            {isFetching ? (
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
            )
                :

                <div>
                    <p>View TCC Uploads</p>
                    <div className="grid justify-items-start">

                        <div className="font-semibold">
                            Application letter
                        </div>

                        <div className="flex">
                            {docLet.map((element, i) => (
                                <div key={i} className="p-2">
                                    <a href={`https://annualuploads.bespoque.dev/rhm-live/uploads/da/tcc/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>}
        </>

    )
};

export default ViewDocumentsTcc;
