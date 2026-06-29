import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { uploadResume } from '../services/api';

export default function ResumeUpload({ onUploadSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const data = await uploadResume(file);
      onUploadSuccess(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'application/pdf': ['.pdf'] }, maxFiles: 1
  });

  return (
    <div className="w-full max-w-lg mx-auto">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}>
        <input {...getInputProps()} />
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-gray-600 font-medium">Analyzing your resume...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              {isDragActive ? <FileText className="w-8 h-8 text-blue-500" /> : <Upload className="w-8 h-8 text-blue-500" />}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragActive ? 'Drop your PDF here!' : 'Upload your Resume'}
              </p>
              <p className="text-sm text-gray-400 mt-1">Drag & drop or click to browse — PDF only</p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
    </div>
  );
}