import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartAssessment } from '../assessment/viewAssessment';

const ViewDirectAssessment = () => {
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
      <SectionTitle title="Start Direct Assessment" />

      <Widget>
        <>
          <StartAssessment />
        </>
      </Widget>
    </>
  );
}
export default ViewDirectAssessment