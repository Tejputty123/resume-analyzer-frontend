import axios from 'axios';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || '/api/v1'
});

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await API.post('/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const analyzeResume = async (resumeId, jobDescription) => {
  const res = await API.post('/analyze', {
    resume_id: resumeId,
    job_description: jobDescription
  });
  return res.data;
};