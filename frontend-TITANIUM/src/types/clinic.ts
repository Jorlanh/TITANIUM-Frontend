export interface Clinic {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'banned' | 'pending';
  plan: 'basic' | 'pro' | 'enterprise';
  patientsCount: number;
  monthlyRevenue: number;
  createdAt: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  lastVisit: string;
  nextAppointment?: string;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  status: 'active' | 'expired' | 'depleted';
}

export interface FinancialSummary {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  patientsThisMonth: number;
  appointmentsToday: number;
  growthPercentage: number;
}
