import { useState } from 'react';
import { Loader2, FileSearch, Tag } from 'lucide-react';
import ResumeUpload from '../components/ResumeUpload';
import AnalysisResult from '../components/AnalysisResult';
import { analyzeResume } from '../services/api';

export default function Home() {
  const [resumeData, setResumeData] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!resumeData || !jobDesc.trim()) return;
    setLoading(true);
    setError('');
    try {
      const result = await analyzeResume(resumeData.id, jobDesc);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResumeData(null);
    setJobDesc('');
    setAnalysisResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileSearch className="w-4 h-4" /> AI-Powered
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Resume Analyzer</h1>
          <p className="text-gray-500 text-lg">Upload your resume, paste a job description, and get instant AI feedback.</p>
        </div>

        {!resumeData ? (
          <ResumeUpload onUploadSuccess={setResumeData} />
        ) : (
          <div className="space-y-6">
            {/* Resume Uploaded Banner */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-800">✅ {resumeData.filename}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {resumeData.extracted_skills.slice(0, 8).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white border border-green-200 text-green-700 rounded-full text-xs">{s}</span>
                  ))}
                  {resumeData.extracted_skills.length > 8 && (
                    <span className="text-xs text-green-600">+{resumeData.extracted_skills.length - 8} more</span>
                  )}
                </div>
              </div>
              <button onClick={handleReset} className="text-sm text-gray-400 hover:text-red-500">Change</button>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <label className="block font-bold text-gray-800 mb-3">Paste Job Description</label>
              <textarea
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
                rows={8}
                placeholder="Paste the full job description here..."
                className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
              <button
                onClick={handleAnalyze}
                disabled={!jobDesc.trim() || loading}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : '🔍 Analyze Resume'}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {analysisResult && <AnalysisResult result={analysisResult} />}
          </div>
        )}
      </div>
    </div>
  );
}