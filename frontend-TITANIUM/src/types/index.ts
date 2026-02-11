// ============= TITANIUM - Global Types =============

export type AppointmentStatus = 
  | 'AGENDADO' 
  | 'CONFIRMADO' 
  | 'EM_ATENDIMENTO' 
  | 'FINALIZADO' 
  | 'FALTOU';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  procedimento: string;
  dentistName: string;
  start: string;
  end: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface WaitingListItem {
  id: string;
  patientName: string;
  phone: string;
  procedimento: string;
  preferencia: string;
  addedAt: string;
}

export interface PatientFull {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  dateOfBirth: string;
  avatarUrl?: string;
  tags: PatientTag[];
  categoriaTratamento: string;
  intervaloRecallDias: number;
  intervaloPersonalizado?: number;
  lastVisit: string;
  nextAppointment?: string;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export interface PatientTag {
  id: string;
  label: string;
  color: 'red' | 'orange' | 'yellow' | 'blue' | 'purple';
}

export interface Exam {
  id: string;
  patientId: string;
  name: string;
  type: 'raio-x' | 'tomografia' | 'pdf' | 'photo';
  thumbnailUrl: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  dentistName: string;
  content: string;
  createdAt: string;
}

export interface AutomationMessage {
  id: string;
  day: number;
  content: string;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  defaultIntervalDays: number;
  messages: AutomationMessage[];
}

export interface NPSFeedback {
  id: string;
  patientName: string;
  score: number;
  comment: string;
  createdAt: string;
}

export interface ReputationData {
  averageScore: number;
  totalResponses: number;
  promoters: number;
  neutrals: number;
  detractors: number;
  recentFeedbacks: NPSFeedback[];
}
