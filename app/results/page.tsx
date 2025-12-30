import { aquariusData } from '../data/aquarius.generated';
import ResultsClient from './ResultsClient';

export default function ResultsPage() {
  return <ResultsClient results={aquariusData.results} />;
}
