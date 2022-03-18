import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartAssessment } from '../assessment/viewAssessment';
import StartTcc from '../tccForms/viewTccForms';
import { useEffect } from 'react';
import setAuthToken from '../../functions/setAuthToken';

const ViewTcc = () => {
  // const [post, setPost] = useState(() => []);
  // const [sum, setSum] = useState(() => null);
  // const [totalemp, setTotalemp] = useState('');
  // const [isFetching, setIsFetching] = useState(() => true);
  // const [currentPage, setCurrentPage] = useState(() => 1);
  // const [postPerPage, setPostPerPage] = useState(() => 10);
  // const [year, setYear] = useState('');
  // const [query, setQuery] = useState(() => "");
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
      <SectionTitle title="Start TCC" />

      <Widget>
        <>
          <StartTcc />
        </>
      </Widget>
    </>
  );
}
export default ViewTcc