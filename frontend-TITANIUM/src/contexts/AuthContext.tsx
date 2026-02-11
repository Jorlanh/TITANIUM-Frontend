import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthState, LoginCredentials, UserRole } from '@/types/auth';
import api, { setTokens, clearTokens, getAccessToken } from '@/lib/axios';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'admin@plataforma.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@plataforma.com',
      name: 'Super Admin',
      role: 'ADMIN_PLATAFORMA',
    },
  },
  'admin@clinica.com': {
    password: 'clinica123',
    user: {
      id: '2',
      email: 'admin@clinica.com',
      name: 'Dr. João Silva',
      role: 'ADMIN_CLINICA',
      clinicId: 'clinic-1',
      clinicName: 'Clínica Saúde Total',
    },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          // In production, validate token with backend
          // For demo, check stored user
          const storedUser = sessionStorage.getItem('user');
          if (storedUser) {
            setState({
              user: JSON.parse(storedUser),
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          }
        } catch {
          clearTokens();
        }
      }
      setState((prev) => ({ ...prev, isLoading: false }));
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // In production, this would be an API call
      // For demo, using mock data
      const mockUser = MOCK_USERS[credentials.email];
      
      if (!mockUser || mockUser.password !== credentials.password) {
        throw new Error('Credenciais inválidas');
      }

      // Simulate API response with tokens
      const mockTokens = {
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
      };

      setTokens(mockTokens.accessToken, mockTokens.refreshToken);
      sessionStorage.setItem('user', JSON.stringify(mockUser.user));

      setState({
        user: mockUser.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    sessionStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const hasRole = useCallback(
    (role: UserRole | UserRole[]) => {
      if (!state.user) return false;
      if (Array.isArray(role)) {
        return role.includes(state.user.role);
      }
      return state.user.role === role;
    },
    [state.user]
  );

  return (
    <AuthContext.Provider value={{ ...state, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
