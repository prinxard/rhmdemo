import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";
import MaterialTable, { MTableToolbar } from "material-table";
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import ReactToPrint from "react-to-print";
import { CoatOfArms, KgirsLogo, KogiGov, TccbgImage } from "../Images/Images";
import QRCode from "react-qr-code";
import { addDays, subDays } from 'date-fns';
import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Controller, useForm } from "react-hook-form";
import { FormatMoneyComponentBOJ } from "../FormInput/formInputs";
import { useRouter } from "next/router";
import Reportstable from "../../pages/reports/reportstable";


export const StartReportView = () => {
  const [fixedValues, SetFixValuesStart] = useState({ amount: 0 });
  const [fixedValuesend, SetFixValuesEnd] = useState({ amount: 0 });
  const [revenueItem, setRevenueItem] = useState([]);
  const [station, setStation] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableState, setTableState] = useState("hidden");


  const router = useRouter();

  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 30),
      endDate: (new Date()),
      key: 'selection'
    }
  ]);

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

  let startDate = dateformat(state[0].startDate, "yyyy-mm-dd")
  let endDate = dateformat(state[0].endDate, "yyyy-mm-dd")

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()


  let startFigure = watch("amountStart", "0").replace(/,/g, '')
  let endFigure = watch("amountEnd", "0").replace(/,/g, '');

  useEffect(() => {

    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}user/items`);
        let itemsBody = res.data.body
        let revItems = itemsBody.revItem
        let office = itemsBody.taxOffice
        setStation(office)
        setRevenueItem(revItems)

      } catch (e) {
        // setIsFetching(false);
        console.log(e);
      }
    };
    fetchPost();

  }, []);


  const AdvancedSearch = (data) => {
    setIsFetching(true)
    data.trandateStart = startDate
    data.trandateEnd = endDate
    data.amountStart = startFigure
    data.amountEnd = endFigure

    axios.post(`${url.BASE_URL}collection/view-collection-report`, data)
      .then(function (response) {
        let search = response.data.body;

        setFilteredData(search)
        console.log("FilteredData", FilteredData);
        setIsFetching(false)
        setTableState('')
      })
      .catch(function (error) {
        setTableState('')
        setIsFetching(false)

      })
  }

  return (
    <>
      <div className="border mb-3 block p-6 rounded-lg bg-white w-full">
        <form onSubmit={handleSubmit(AdvancedSearch)}>
          <div className="grid grid-cols-4 gap-4 place-items-center">
            <div className="form-group mb-6">
              <label className="" htmlFor="kgtin"> Taxpayer ID</label>
              <input type="text" ref={register()} name="t_payer" className="form-control w-full rounded font-light text-gray-500" />
            </div>

            <div className="form-group mb-6">
              <label className="" htmlFor="kgtin"> Assessment ID</label>
              <input type="text" ref={register()} name="assessment_id" className="form-control w-full rounded font-light text-gray-500"
              />
            </div>

            <div className="form-group mb-6">
              <label className="" htmlFor="kgtin"> Reference ID</label>
              <input type="text" ref={register()} name="ref" className="form-control w-full rounded font-light text-gray-500"
              />
            </div>

            <div className="form-group mb-6">
              <label className="" htmlFor="kgtin"> Tax Station</label>
              <select ref={register()} name="station" className="form-control w-full rounded font-light text-gray-500">
                {station.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
              </select>
            </div>

          </div>

          <div className="flex justify-center mb-7">
            <div>
              <p className="font-bold text-center mb-5">Date Range</p>
              <DateRangePicker
                onChange={item => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                direction="horizontal"

              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-4 place-items-center">
              <div className="justify-self-center font-bold mb-6">
                <p>Amount</p>
              </div>

              <div className="form-group mb-6">
                <p className="text-center">Start Amount</p>
                <FormatMoneyComponentBOJ
                  ref={register()}
                  name="amountStart"
                  control={control}
                  defaultValue={""}
                  onValueChange={(v) => SetFixValuesStart({ amount: v })}
                />
              </div>

              <div className="form-group mb-6">
                <p className="text-center">End Amount</p>
                <FormatMoneyComponentBOJ
                  ref={register()}
                  name="amountEnd"
                  control={control}
                  defaultValue={""}
                  onValueChange={(v) => SetFixValuesEnd({ amount: v })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-4 place-items-center">
              <div className="justify-self-center mb-6 font-bold">
                <p>Revenue Item</p>
              </div>
              <div className="form-group ">
                <p className="text-center">Select Revenue Item</p>
                <select ref={register()} name="rev_sub" className="form-control w-full rounded font-light text-gray-500">
                  {revenueItem.map((item) => <option key={item.rev_code} value={item.rev_code}>{item.item}</option>)}
                </select>
              </div>
              <div className="form-group hidden">
                <p className="text-center">Payment Channel</p>
                <input type="text" ref={register()} name="channel_id" className="form-control w-full rounded font-light text-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end my-4">
            <div className="grid grid-cols-2 gap-4 justify-self-center">
              <div className="form-group">
                <button className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

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
          <p className="font-bold">Processing...</p>
        </div>
      ) :
        <div className={`${tableState}`}>
          <Reportstable FilteredData={FilteredData} />
        </div>
      }
    </>
  );
};