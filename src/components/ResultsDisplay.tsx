
import React from 'react';
import { AnalysisResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle, Info, BarChart2 } from 'lucide-react';
import ConfidenceBar from './ConfidenceBar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) return null;
  
  const { classification, confidenceScore, features, explanation } = result;
  
  const getResultIcon = () => {
    if (classification === 'real') return <CheckCircle className="h-8 w-8 text-truth-real" />;
    if (classification === 'fake') return <XCircle className="h-8 w-8 text-truth-fake" />;
    return <AlertCircle className="h-8 w-8 text-truth-neutral" />;
  };
  
  const getResultColor = () => {
    if (classification === 'real') return 'text-truth-real';
    if (classification === 'fake') return 'text-truth-fake';
    return 'text-truth-neutral';
  };
  
  const getResultText = () => {
    if (classification === 'real') return 'Likely Authentic';
    if (classification === 'fake') return 'Potentially Misleading';
    return 'Inconclusive';
  };
  
  const renderFeatureBar = (label: string, value: number, goodWhenLow: boolean = true) => {
    const percentage = Math.round(value * 100);
    const color = goodWhenLow 
      ? value > 0.7 ? 'bg-truth-fake' : value > 0.4 ? 'bg-amber-400' : 'bg-truth-real'
      : value < 0.3 ? 'bg-truth-fake' : value < 0.6 ? 'bg-amber-400' : 'bg-truth-real';
    
    return (
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm text-gray-500">{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-2" indicatorClassName={color} />
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card className="border-2 overflow-hidden">
        <CardHeader className={cn(
          "pb-2",
          classification === 'real' ? "bg-green-50" : 
          classification === 'fake' ? "bg-red-50" : "bg-gray-50"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getResultIcon()}
              <CardTitle className={cn("text-xl", getResultColor())}>{getResultText()}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ConfidenceBar value={confidenceScore} classification={classification} />
          
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary-blue" />
              <h3 className="font-medium">Analysis Explanation</h3>
            </div>
            <ul className="space-y-2">
              {explanation.map((point, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-primary-blue">•</span>
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="h-5 w-5 text-primary-blue" />
              <h3 className="font-medium">Content Metrics</h3>
            </div>
            
            {renderFeatureBar('Sensationalism', features.sensationalism)}
            {renderFeatureBar('Clickbait Language', features.clickbait)}
            {renderFeatureBar('Emotional Language', features.emotionalLanguage)}
            {renderFeatureBar('Source Credibility', features.sourceCredibility, false)}
            {renderFeatureBar('Factual Consistency', features.factualConsistency, false)}
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-xs text-muted-foreground">
        <p>Note: This is a demonstration. Real-world fact-checking requires multiple sources and expert verification.</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
