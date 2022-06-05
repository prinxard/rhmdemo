import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartAssessment } from '../assessment/viewAssessment';
import { useEffect } from 'react';
import setAuthToken from '../../functions/setAuthToken';
import { StartTcc } from '../tccForms/viewTccForms';
import { StartReportView } from '../tables/reports';
import { ViewTccPrintTable } from '../tables/viewTccTablePrint';
import { StartAssessmentReportView } from '../tables/assessmentreport';
import { StartUnassessedReportView } from '../tables/unassessedreport';

const StartReportUnassessed = () => {
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
      <SectionTitle title="Unassessed Collections" />

     
        <>
          <StartUnassessedReportView />
        </>
      
    </>
  );
}
export default StartReportUnassessed