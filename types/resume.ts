export interface Resume {
  id: string;
  user_id: string;
  title: string;
  content: ResumeContent;
  template_id: string;
  created_at: string;
}

export interface ResumeContent {
  extracted_text?: string;
  skills?: string[];
  experience?: ExperienceItem[];
  education?: EducationItem[];
  [key: string]: unknown;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skills_required: string[];
  matchScore?: number;
  salary?: string;
  posted_at?: string;
}

export interface Skill {
  name: string;
  category: 'matched' | 'missing' | 'suggestion';
}

export interface MatchAnalysis {
  jobId: string;
  matchScore: number;
  matched: string[];
  missing: string[];
  suggestions: string[];
  summary: string;
}
