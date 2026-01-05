import { Suspense } from 'react';
import { aquariusData } from '../data/aquarius.generated';
import ResultsClient from './ResultsClient';

function ResultsContent() {
  return <ResultsClient results={aquariusData.results} projects={aquariusData.projects} />;
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-void" />}>
      <ResultsContent />
    </Suspense>
  );
}
