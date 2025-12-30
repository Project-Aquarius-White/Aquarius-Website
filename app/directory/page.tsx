import { aquariusData } from '../data/aquarius.generated';
import DirectoryClient from './DirectoryClient';

export default function DirectoryPage() {
  return <DirectoryClient projects={aquariusData.projects} />;
}
