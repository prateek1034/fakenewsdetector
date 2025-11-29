
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Search, Newspaper, Link as LinkIcon } from 'lucide-react';
import { AnalysisRequest } from '@/types';

interface AnalysisFormProps {
  onAnalyze: (request: AnalysisRequest) => void;
  isAnalyzing: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onAnalyze, isAnalyzing }) => {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze({ text, url: url.trim() || undefined });
    }
  };
  
  const exampleTexts = [
    "Scientists discover revolutionary cancer treatment with 95% success rate in early trials",
    "BREAKING: You won't believe what this politician was caught doing! Shocking scandal exposed!",
    "Study finds moderate exercise improves heart health and longevity",
    "URGENT ALERT: Government hiding the TRUTH about mind-control chemicals in drinking water!!!"
  ];
  
  const handleExampleClick = (example: string) => {
    setText(example);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary-blue" />
            <h2 className="text-lg font-medium">News Content</h2>
          </div>
          <Textarea 
            placeholder="Paste news article text, headline, or claim to analyze..."
            className="min-h-[150px] text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-primary-blue" />
            <h2 className="text-lg font-medium">Source URL (Optional)</h2>
          </div>
          <Input 
            type="url"
            placeholder="https://example.com/news-article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Adding a source URL may improve analysis accuracy</p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary-blue hover:bg-blue-700"
          disabled={!text.trim() || isAnalyzing}
        >
          <Search className="mr-2 h-4 w-4" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Content'}
        </Button>
      </form>
      
      <div className="mt-6">
        <p className="text-sm font-medium mb-2">Try an example:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exampleTexts.map((example, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="justify-start text-left text-xs h-auto py-2 px-3"
              onClick={() => handleExampleClick(example)}
            >
              {example.length > 70 ? `${example.substring(0, 70)}...` : example}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisForm;
