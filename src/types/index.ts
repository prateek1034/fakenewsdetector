
export interface AnalysisResult {
    classification: 'real' | 'fake' | null;
    confidenceScore: number;
    features: {
      sensationalism: number;
      clickbait: number;
      emotionalLanguage: number;
      sourceCredibility: number;
      factualConsistency: number;
    };
    explanation: string[];
  }
  
  export interface AnalysisRequest {
    text: string;
    url?: string;
  }
  