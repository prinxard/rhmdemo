import SectionTitle from '../../components/dashboard/section-title';
import Widget from '../../components/widget';
import { IconTabs } from "../../components/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { AssesmentCount } from '../../components/rhmdashboard/headoffice';
import { ATOPie } from '../../components/rhmdashboard/ato';
import { memo, useEffect, useState } from 'react';
import UseFetcher from '../../components/fetcher/useFetcher';
import url from "../../config/url";



const Index = () => {

  const[assessData, setAssessData] = useState([])
  const[cummulativeAssess, setCummAssess] = useState([])
  const[assessOverviewVariable, setAssessOverView] = useState([])
  const[cumPerformanceVariable, setCumPerformance] = useState([])

  const { data, isLoading, isError } = UseFetcher(
    `${url.BASE_URL}forma/dashboard`
  );


  useEffect(() => {
    if (data) {
      const assessmentCount = data.assessmentCount
      const assessmentOverview = data.assessmentOverview
      const assessmentCumm = data.cummulativeAssessment
      const cummPerf = data.cummulativePerfomance
      setAssessData(assessmentCount)
      setAssessOverView(assessmentOverview)
      setCummAssess(assessmentCumm)
      setCumPerformance(cummPerf)
      console.log("cummPerfFunct", cummPerf);
      
    }
  }, [data]);
  
  console.log("cumPerformanceParent", cumPerformanceVariable);

  // const assessmentCountData = data
  // console.log("assessmentCountData", assessmentCountData);

  const tabsWithIcons = [
    {
      index: 0,
      title: (
        <>
          <p>All Tax Offices </p>
        </>
      ),
      content: (
        <>
          <div>
            {/* <AssesmentCount testCountData={assessmentCountData} /> */}
            <AssesmentCount  assessCountData={assessData} 
            assessOverviewData={assessOverviewVariable} 
            cummulativeAssess ={cummulativeAssess}
            cumPerformance ={cumPerformanceVariable}
            />
          </div>
        </>
      ),
    },
    {
      index: 1,
      title: (
        <>
          <p>My Tax Office</p>
        </>
      ),
      content: (
        <>
          <ATOPie />
        </>
      ),
    },
  ];


  return (
    <>
      <SectionTitle subtitle="Dashboard" />
      <Widget>
        <div className="flex justify-center">
          <div className="w-full">
            <IconTabs tabs={tabsWithIcons} />
          </div>
        </div>
      </Widget>
    </>
  );
};
export default Index;
