import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartAssessment } from '../assessment/viewAssessment';
import { useEffect } from 'react';
import setAuthToken from '../../functions/setAuthToken';
import { StartTcc } from '../tccForms/viewTccForms';
import { StartReportView } from '../tables/reports';

const StartReport = () => {
  useEffect(() => {
    setAuthToken();
    const fetchPost = async () => {
      try {


      } catch (e) {


      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <SectionTitle title="Generate Report" />

      <Widget>
        <>
        
          <StartReportView />

        </>
      </Widget>
    </>
  );
}
export default StartReport