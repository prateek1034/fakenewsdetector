import React, { useState } from 'react';
import Header from '@/components/Header';
import AnalysisForm from '@/components/AnalysisForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { AnalysisRequest, AnalysisResult } from '@/types';
import { analyzeText } from '@/utils/analysis';
import { Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const { toast } = useToast();

    const handleAnalyze = async (request: AnalysisRequest) => {
    try {
        setIsAnalyzing(true);
        setResult(null);
        
        const analysisResult = await analyzeText(request);
        
        setResult(analysisResult);
        
        toast({
        title: "Analysis Complete",
        description: "The content has been analyzed successfully.",
        duration: 3000,
        });
    } catch (error) {
        console.error("Analysis error:", error);
        toast({
        title: "Analysis Failed",
        description: "There was an error processing your request.",
        variant: "destructive",
        duration: 5000,
        });
    } finally {
        setIsAnalyzing(false);
    }
    };

    return (
    <div className="min-h-screen bg-gradient-light">
        <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {!result && (
                <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                    Detect Misinformation with AI
                </h2>
                <p className="mt-2 text-muted-foreground">
                    Paste news content or claims to analyze for potential misinformation
                </p>
                </div>
            )}
            
            {!result ? (
                <AnalysisForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            ) : (
                <>
                <ResultsDisplay result={result} />
                <div className="mt-8 text-center">
                    <button
                    onClick={() => setResult(null)}
                    className="text-primary-blue hover:text-blue-700 font-medium"
                    >
                    Analyze another article
                    </button>
                </div>
                </>
            )}
            </div>
            
            {!result && (
            <div className="mt-12">
                <Separator className="mb-8" />
                <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary-blue" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Text Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                    Our AI examines language patterns to identify sensationalism and misleading content
                    </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary-blue" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Source Verification</h3>
                    <p className="text-sm text-muted-foreground">
                    Evaluate the credibility of news sources based on their track record
                    </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary-blue" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Fact Checking</h3>
                    <p className="text-sm text-muted-foreground">
                    Compare claims against known facts from reliable databases
                    </p>
                </div>
                </div>
            </div>
            )}

            <div className="mt-16 text-center text-xs text-muted-foreground">
            <p>© 2025 Truth Sifter | AI-Powered Misinformation Detection</p>
            <p className="mt-1">A demonstration project - results should be verified</p>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Index;