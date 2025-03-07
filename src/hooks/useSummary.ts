import { useState } from 'react';
import { createTextSummary, createPdfSummary, createYoutubeSummary } from '@/services/api';

interface UseSummaryReturn {
  summary: string | null;
  error: string | null;
  loading: boolean;
  text: string;
  youtubeUrl: string;
  setSummary: (summary: string) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setText: (text: string) => void;
  setYoutubeUrl: (url: string) => void;
  generateTextSummary: (text: string, language?: string) => Promise<void>;
  generatePdfSummary: (pdf: File, language?: string) => Promise<void>;
  generateYoutubeSummary: (url: string, language?: string) => Promise<void>;
}

export const useSummary = (): UseSummaryReturn => {
  const [summary, setSummary] = useState<string | null>(``);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(``)
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');

  const generateTextSummary = async (text: string, language = 'en') => {
    try {
      setLoading(true);
      setError(null);

      const response = await createTextSummary({ text, language });

      console.log("check response.summarization :", response.summarization)
      
      setSummary(response.summarization);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const generatePdfSummary = async (pdf: File, language = 'en') => {
    try {
      setLoading(true);
      setError(null);

      console.log("check pdf", pdf)

      const response = await createPdfSummary({ pdf, language });

      setSummary(response.summarization);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setLoading(false);
    }   
  }

  const generateYoutubeSummary = async (url: string, language = 'en') => {
    try {
      setLoading(true);
      setError(null);

      console.log("check url", url)

      const response = await createYoutubeSummary({ url, language });

      setSummary(response.summarization);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  }



  return { 
    summary, 
    error, 
    loading, 
    text, 
    youtubeUrl,
    setSummary, 
    setError, 
    setLoading, 
    setText, 
    setYoutubeUrl,
    generateTextSummary, 
    generatePdfSummary,
    generateYoutubeSummary
  };
};
