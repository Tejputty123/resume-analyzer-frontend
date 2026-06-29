import { CheckCircle, XCircle, Lightbulb, Tag } from 'lucide-react';
import ScoreGauge from './ScoreGauge';

export default function AnalysisResult({ result }) {
  return (
    <div className="space-y-6">
      {/* ATS Score */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">ATS Compatibility Score</h2>
        <ScoreGauge score={Math.round(result.ats_score)} />
        <p className="text-gray-500 text-sm mt-2 text-center max-w-xs">
          {result.ats_score >= 75 ? '🎉 Great match! Your resume is well-optimized.' :
           result.ats_score >= 50 ? '⚠️ Moderate match. Consider the suggestions below.' :
           '❌ Low match. Significant improvements needed.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" /> Matched Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matched_skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{skill}</span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-500" /> Missing Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missing_skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" /> AI Improvement Suggestions
        </h3>
        <ol className="space-y-3">
          {result.suggestions.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-600">
              <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}