export type PageId = 'home' | 'loop' | 'services' | 'managed-soc' | 'vapt' | 'dfir' | 'grc' | 'training' | 'consultation' | 'insights' | 'company';

export interface ServiceItem {
  id: string;
  title: string;
  isFlagship?: boolean;
  iconName: string;
  description: string;
  features: string[];
  route?: PageId;
}

export interface ResearchArticle {
  id: string;
  category: 'THREAT ADVISORY' | 'VULNERABILITY' | 'REGULATORY' | 'COMPANY NEWS';
  categoryColor: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
    initials?: string;
  };
  featured?: boolean;
  coverImage?: string;
  content: {
    executiveSummary: string;
    threatVectors?: string[];
    technicalDetails: string;
    indicatorsOfCompromise?: { type: string; value: string }[];
    remediationSteps: string[];
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  certifications: string[];
  image?: string;
  isFounder?: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
}

export interface LoopStage {
  step: string;
  label?: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconColor: string;
  telemetryOutput: string;
  actions: string[];
  route?: PageId;
}
