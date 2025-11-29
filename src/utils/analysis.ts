import { AnalysisRequest, AnalysisResult } from "../types";

// This is a mock implementation for the demo
// In a real application, this would connect to a ML model or API
export const analyzeText = (request: AnalysisRequest): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Mock analysis logic - in a real app this would be ML-based
      const text = request.text.toLowerCase();
      
      // Simple heuristics for demo purposes
      const hasClickbaitTerms = /you won't believe|shocking|mind-blowing|incredible|unbelievable/.test(text);
      const hasSensationalTerms = /exclusive|breaking|urgent|emergency|alert/.test(text);
      const hasEmotionalLanguage = /outrage|devastated|thrilled|furious|ecstatic/.test(text);
      
      // Calculate mock metrics
      const sensationalism = Math.min(hasSensationalTerms ? 0.7 + Math.random() * 0.3 : Math.random() * 0.4, 1);
      const clickbait = Math.min(hasClickbaitTerms ? 0.8 + Math.random() * 0.2 : Math.random() * 0.3, 1);
      const emotionalLanguage = Math.min(hasEmotionalLanguage ? 0.6 + Math.random() * 0.4 : Math.random() * 0.5, 1);
      
      // Mock source credibility (would be based on domain reputation in a real app)
      const sourceCredibility = request.url ? 0.3 + Math.random() * 0.4 : 0.5;
      
      // Mock factual consistency (would use fact-checking databases in a real app)
      const factualConsistency = Math.max(0, 1 - (sensationalism + clickbait) / 2);
      
      // Calculate overall score - weighted combination of features
      const overallScore = (
        sensationalism * 0.25 + 
        clickbait * 0.25 + 
        emotionalLanguage * 0.15 + 
        (1 - sourceCredibility) * 0.15 + 
        (1 - factualConsistency) * 0.2
      );
      
      // Classify based on overall score
      const classification = overallScore > 0.6 ? 'fake' : 'real';
      const confidenceScore = Math.abs(overallScore - 0.5) * 2; // Scale to 0-1 range
      
      // Generate explanation
      const explanation = [];
      if (sensationalism > 0.6) explanation.push("Contains sensationalist language typically found in misleading content");
      if (clickbait > 0.7) explanation.push("Uses clickbait tactics common in unreliable sources");
      if (emotionalLanguage > 0.7) explanation.push("Heavy use of emotional language often indicates manipulation");
      if (sourceCredibility < 0.4) explanation.push("Source has low credibility ratings in our database");
      if (factualConsistency < 0.4) explanation.push("Contains claims that contradict established facts");
      
      if (classification === 'real' && confidenceScore > 0.7) {
        explanation.push("Content appears balanced and fact-based");
        explanation.push("Language is measured and avoids sensationalism");
      }
      
      if (explanation.length === 0) {
        explanation.push(classification === 'fake' 
          ? "Multiple subtle indicators of potentially misleading content" 
          : "No clear indicators of misinformation detected");
      }
      
      resolve({
        classification,
        confidenceScore,
        features: {
          sensationalism,
          clickbait,
          emotionalLanguage,
          sourceCredibility,
          factualConsistency
        },
        explanation
      });
    }, 1500);
  });
};