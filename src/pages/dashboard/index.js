import Widget1 from '../../components/dashboard/widget-1';
import Section from '../../components/dashboard/section';
import SectionTitle from '../../components/dashboard/section-title';
import { Table } from '../../components/tables/tables';
import Spinner from '../../components/spiner';
import * as Icons from '../../components/Icons/index';
import { formatNumber } from '../../functions/numbers';
import url from '../../config/url';
import UseFetcher from '../../components/fetcher/useFetcher';

const Index = () => {
  const { data, isLoading, error } = UseFetcher(
    `${url.BASE_URL}user/dashboard`
  );

  return (
    <>
      {isLoading && <Spinner />}
      {data?.length > 0 && (
        <>
          <SectionTitle title="Overview" subtitle="Dashboard" />
          <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <div className="w-full lg:w-1/4">
              <Widget1
                color="green"
                title="Total remittance"
                description={formatNumber(data[0].totalRemittance)}
                right={<Icons.TotalRemittance />}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Widget1
                color="red"
                title="Pending Remittance"
                description={formatNumber(data[0].pendingRemittance)}
                right={<Icons.PendingRemittance />}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Widget1
                color="blue"
                title="Revenue Items"
                description={formatNumber(data[0].revenueItems)}
                right={<Icons.RevenueItems />}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Widget1
                color="yellow"
                title="Tax receipts"
                description={formatNumber(data[0].taxReceipts)}
                right={<Icons.TaxReceipt />}
              />
            </div>
          </div>

          <div className="w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <Section title="Recent Remittances">
              <div className="flex flex-col w-full">
                <div className="w-full">
                  <Table recentRemittance={data[0].recentRemittance} />
                </div>
              </div>
            </Section>
          </div>
        </>
      )}
    </>
  );
};
export default Index;
