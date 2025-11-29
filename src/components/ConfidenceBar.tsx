import React from 'react';
import { cn } from '@/lib/utils';

interface ConfidenceBarProps {
  value: number;
  classification: 'real' | 'fake' | null;
}

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ value, classification }) => {
  const percentage = Math.round(value * 100);
  
  const getBarColor = () => {
    if (classification === 'real') return 'bg-truth-real';
    if (classification === 'fake') return 'bg-truth-fake';
    return 'bg-truth-neutral';
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm">
        <span>Confidence</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={cn("h-2.5 rounded-full", getBarColor())}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
};

export default ConfidenceBar;
