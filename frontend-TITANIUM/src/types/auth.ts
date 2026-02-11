export type UserRole = 'ADMIN_PLATAFORMA' | 'ADMIN_CLINICA';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  clinicId?: string;
  clinicName?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
