// import MaterialTable from "material-table";
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import Search from '@material-ui/icons/Search'
import url from '../../config/url';
import axios from "axios";
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import * as Icons from '../../components/Icons/index';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { Delete, WarningRounded, Refresh } from "@material-ui/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setAuthToken from '../../functions/setAuthToken';
import Loader from 'react-loader-spinner';


const fields = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "Assesment Id",
    field: "assessment_id",
  },
  {
    title: "Year",
    field: "year",
  },
  {
    title: "Tax Id",
    field: "kgtin",
  },
  {
    title: "Taxpayer Name",
    field: "tp_name",
  },
  {
    title: "Gross Income",
    field: "overallGross",
  },
  {
    title: "Total Tax Due",
    field: "totalTaxFormated",
  },
  // {
  //   title: "Amount Paid",
  //   field: "taxPaid",
  //   render: (taxPaid) => formatNumber(taxPaid.taxPaid)

  // },
  // {
  //   title: "Balance",
  //   field: "balance",
  //   render: rowData => {
  //     return (
  //       rowData.balance < "0" ? <p style={{ color: "#FF0000", fontWeight: "bold" }}>{rowData.balance}</p> :
  //         rowData.balance > "0" ? <p style={{ color: "#8fce00", fontWeight: "bold" }}>{`+${rowData.balance}`}</p> :
  //           <p>{rowData.balance}</p>
  //     )
  //   }
  // },
  {
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Type",
    field: "assessment_type",
  },
  {
    title: "Print Status",
    field: "printstatus",
  },
  {
    title: "Created Time",
    field: "createtime",
  },

];


export default function Approvedassessmentreport({ FilteredData }) {
  const [modal, setModal] = useState(false);
  const [revisedmodal, setRevisedModal] = useState(false);
  const [revisedAssFields, setRevisedAssFields] = useState({});
  const [isFetching, setIsFetching] = useState(() => false);
  const [assessId, setAssessId] = useState('');
  const [createErrors, setCreateErrors] = useState([]);
  const router = useRouter();

  let items = FilteredData

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const reportRange = [39]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups
  const DeleteRange = [1, 12]

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleObjectionModal = () => {
    setRevisedModal(!revisedmodal);
  };

  setAuthToken();
  const DeleteAssessment = async (data) => {
    data.preventDefault()
    setIsFetching(true)
    let deleteOBJ = {
      assessment_id: assessId
    }
    try {
      await axios.delete(`${url.BASE_URL}forma/del-assessment`, { data: deleteOBJ })
      setIsFetching(false)
      toast.success("Deleted Successfully!");
      window.location.reload()
    } catch (error) {
      toast.error("Failed Try again!");
      setIsFetching(false)
    }
  };




  const ReviseAssessment = (e) => {
    console.log("revisedAssFields", revisedAssFields);
    e.preventDefault()
    setIsFetching(true)

    axios.post(`${url.BASE_URL}forma/new-objection`, revisedAssFields)
      .then(function (response) {
        setRevisedModal(!revisedmodal);
        setIsFetching(false)
        toast.success("Created successfully!");
        router.push(`/revise-assessment/${revisedAssFields.kgtin}_${response.data.body.assessment_id}`)
      })
      .catch(function (error) {
        setIsFetching(false)
        if (error) {
          setCreateErrors(error.response.data.message)
          toast.error(createErrors)
          setRevisedModal(!revisedmodal);
        } else {
          toast.error("Failed Try again!");

        }

      })

  };


  return (
    <>
      <ToastContainer />
      {modal && (
        <div className="modal">
          {/* <div onClick={toggleModal} className="overlay"></div> */}
          <div className="modal-content" width="300">
            <form onSubmit={DeleteAssessment}>
              <div className="flex justify-center">
                <WarningRounded
                  size={15}
                  className="text-yellow-400"
                />
              </div>
              <p>Are you sure you want to delete?</p>
              {/* <textarea required className="form-control w-full rounded" minlength="10" maxlength="50" onChange={(e) => setComment(e.target.value)}></textarea> */}
              <div className="mt-2 flex justify-between">
                <button onClick={toggleModal}
                  className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Cancel
                </button>
                <div>

                </div>
                <button
                  className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Continue
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
      {revisedmodal && (
        <div className="modal">
          {/* <div onClick={toggleModal} className="overlay"></div> */}
          <div className="modal-content" width="300">
            <form onSubmit={ReviseAssessment}>
              <div className="flex justify-center">
                <WarningRounded
                  size={15}
                  className="text-yellow-400"
                />
              </div>
              <p>Are you sure you want to create a revised Assessment?</p>
              {/* <textarea required className="form-control w-full rounded" minlength="10" maxlength="50" onChange={(e) => setComment(e.target.value)}></textarea> */}
              <div className="mt-2 flex justify-between">
                <button onClick={toggleObjectionModal}
                  className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Cancel
                </button>
                <div>

                </div>
                <button
                  className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Continue
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {isFetching && (
        <div className="flex justify-start item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p className="font-bold">Processing...</p>
        </div>
      )}
      <MaterialTable title="Approved Assessments"
        data={items}
        columns={fields}
        actions={[
          () => {
            if (userGroup.some(r => DeleteRange.includes(r))) {
              return {
                icon: Delete,
                tooltip: 'Delete Assessment',
                onClick: (event, rowData) => {
                  event.preventDefault()
                  setAssessId(rowData.assessment_id)
                  setModal(true)
                },
              };
            }
            else {
              return {

                icon: Delete,
                tooltip: 'Delete Assessment',
                hidden: true,
                onClick: (event, rowData) => {
                  event.preventDefault()
                  setAssessId(rowData.assessment_id)
                  setModal(true)
                }
              };
            }
          },
          {
            icon: Refresh,
            tooltip: 'Revise Assessment',
            onClick: (event, rowData) => {
              event.preventDefault()
              setRevisedAssFields(
                {
                  "kgtin": rowData.kgtin,
                  "year": rowData.year,
                  "da_assessment_id": rowData.assessment_id,
                  "station": rowData.tax_office
                }
              )
              setRevisedModal(true)
            }
          },
        ]}
        // renderSummaryRow={({ column, data }) =>
        //   column.field === "taxPaid"
        //     ? {
        //       value: formatNumber(data.reduce((agg, row) => Number(agg) + (Number(row.taxPaid)), 0)),
        //       style: { fontWeight: "bold" },
        //     }
        //     : undefined
        // }
        options={{
          search: true,
          paging: true,
          filtering: true,
          actionsColumnIndex: -1,
          rowStyle: (rowData) => {
            if (rowData.printstatus === "Yes") {
              return {
                color: "#5f9f45"
                // backgroundColor: "#156448",
              }
            } else {
              return {};
            }
          },
          // exportButton: {
          //   csv: true,
          //   pdf: false
          // },
          // exportMenu: [
          //   {
          //     label: "Export CSV",
          //     exportFunc: (cols, datas) =>
          //       ExportCsv(fields, items, "myCsvFileName"),
          //   },
          // ],
          // exportAllData: true,

        }}
        icons={{
          Check: Check,
          DetailPanel: ChevronRight,
          Export: SaveAlt,
          Filter: () => <Icons.Filter />,
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
          Search: Search,
          ThirdStateCheck: Remove,
          Clear: Clear,
          SortArrow: ArrowDownward
        }}

      // onRowClick={(event, rowData) => {

      //     if (userGroup.some(r => reportRange.includes(r))) {
      //         ''

      //     }
      //     else {
      //         window.open(`view/collections/${rowData.idpymt}`, "_self")
      //         event.stopPropagation();
      //     }
      // }}
      />
      <style
        jsx>{
          `
        body.active-modal {
          overflow-y: hidden;
      }
      
      // .btn-modal {
      //     padding: 10px 20px;
      //     display: block;
      //     margin: 100px auto 0;
      //     font-size: 18px;
      // }
      
      .modal, .overlay {
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: fixed;
      }
      
      .overlay {
          background: rgba(49,49,49,0.8);
      }
      .modal-content {
          position: absolute;
          top: 20%;
          left: 60%;
          transform: translate(-50%, -50%);
          line-height: 1.4;
          background: #f1f1f1;
          padding: 14px 28px;
          border-radius: 3px;
          max-width: 400px;
          min-width: 300px;
      }
      
      .close-modal {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 7px;
      }
        `
        }
      </style>
    </>
  )
}
