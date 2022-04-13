import Widget1 from '../../components/dashboard/widget-1';
import Section from '../../components/dashboard/section';
import SectionTitle from '../../components/dashboard/section-title';
import { Table } from '../../components/tables/tables';
import Spinner from '../../components/spiner';
import * as Icons from '../../components/Icons/index';
import { formatNumber } from '../../functions/numbers';
import url from '../../config/url';
import UseFetcher from '../../components/fetcher/useFetcher';
import Link from 'next/link';
import Widget from '../../components/widget';
import { IconTabs } from "../../components/tabs"
import { RechartsBar1 } from '../../components/recharts/bar-1';
import { AssesmentCount } from './headoffice';


const Index = () => {
  // const { data, isLoading, error } = UseFetcher(
  //   `${url.BASE_URL}user/dashboard`
  // );


  const tabsWithIcons = [
    {
      index: 0,
      title: (
        <>
          <p>Head Office</p>
        </>
      ),
      content: (
        <>
          <div>
            <AssesmentCount />
          </div>
        </>
      ),
    },
    {
      index: 1,
      title: (
        <>
          <p>Area Tax Office</p>
        </>
      ),
      content: (
        <>
          <p>Test2</p>
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
