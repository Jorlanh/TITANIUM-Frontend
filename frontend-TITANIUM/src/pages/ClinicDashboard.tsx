import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Search,
  Plus,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Patient, FinancialSummary } from '@/types/clinic';
import { useAuth } from '@/contexts/AuthContext';
import ReputationWidget from '@/components/Dashboard/ReputationWidget';

// Mock data
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    cpf: '***.***.***-12',
    lastVisit: '2024-06-10',
    nextAppointment: '2024-06-20',
    totalSpent: 2500,
    status: 'active',
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '(11) 98765-4322',
    cpf: '***.***.***-34',
    lastVisit: '2024-06-08',
    nextAppointment: '2024-06-25',
    totalSpent: 4200,
    status: 'active',
  },
  {
    id: '3',
    name: 'Ana Oliveira',
    email: 'ana.oliveira@email.com',
    phone: '(11) 98765-4323',
    cpf: '***.***.***-56',
    lastVisit: '2024-05-15',
    totalSpent: 1800,
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Carlos Ferreira',
    email: 'carlos.f@email.com',
    phone: '(11) 98765-4324',
    cpf: '***.***.***-78',
    lastVisit: '2024-06-12',
    nextAppointment: '2024-06-18',
    totalSpent: 6500,
    status: 'active',
  },
  {
    id: '5',
    name: 'Beatriz Costa',
    email: 'beatriz.costa@email.com',
    phone: '(11) 98765-4325',
    cpf: '***.***.***-90',
    lastVisit: '2024-06-14',
    nextAppointment: '2024-06-21',
    totalSpent: 3200,
    status: 'active',
  },
];

const mockFinancial: FinancialSummary = {
  totalRevenue: 285000,
  monthlyRevenue: 45000,
  pendingPayments: 8500,
  patientsThisMonth: 78,
  appointmentsToday: 12,
  growthPercentage: 18,
};

const recentTransactions = [
  { id: 1, patient: 'Maria Silva', amount: 350, type: 'Consulta', date: '14/06/2024', status: 'paid' },
  { id: 2, patient: 'João Santos', amount: 800, type: 'Procedimento', date: '14/06/2024', status: 'paid' },
  { id: 3, patient: 'Carlos Ferreira', amount: 250, type: 'Retorno', date: '13/06/2024', status: 'pending' },
  { id: 4, patient: 'Beatriz Costa', amount: 450, type: 'Consulta', date: '13/06/2024', status: 'paid' },
];

const ClinicDashboard: React.FC = () => {
  const [patients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Olá, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Resumo da sua clínica hoje, {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <Button className="gradient-primary hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Receita Mensal"
            value={formatCurrency(mockFinancial.monthlyRevenue)}
            icon={DollarSign}
            variant="primary"
            trend={{ value: mockFinancial.growthPercentage, isPositive: true }}
          />
          <StatCard
            title="Consultas Hoje"
            value={mockFinancial.appointmentsToday}
            description="3 confirmadas"
            icon={Calendar}
            variant="accent"
          />
          <StatCard
            title="Pacientes Ativos"
            value={patients.filter(p => p.status === 'active').length}
            description={`de ${patients.length} total`}
            icon={Users}
          />
          <StatCard
            title="Pagamentos Pendentes"
            value={formatCurrency(mockFinancial.pendingPayments)}
            icon={Clock}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Patients List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Pacientes Recentes</CardTitle>
                    <CardDescription>
                      Lista dos últimos pacientes atendidos
                    </CardDescription>
                  </div>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar pacientes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Paciente</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Última Visita</TableHead>
                        <TableHead>Próxima</TableHead>
                        <TableHead className="text-right">Total Gasto</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.slice(0, 5).map((patient, index) => (
                        <TableRow 
                          key={patient.id}
                          className="animate-fade-in cursor-pointer hover:bg-muted/50 transition-colors"
                          style={{ animationDelay: `${index * 50}ms` }}
                          onClick={() => navigate(`/clinica/pacientes/${patient.id}`)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                                {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-sm text-muted-foreground">{patient.cpf}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                {patient.phone}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                {patient.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(patient.lastVisit)}</TableCell>
                          <TableCell>
                            {patient.nextAppointment ? (
                              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                {formatDate(patient.nextAppointment)}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(patient.totalSpent)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">Ver Todos os Pacientes</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Transactions */}
          <div className="space-y-6">
            {/* Reputation Widget */}
            <ReputationWidget />

            {/* Financial Summary */}
            <Card className="gradient-hero text-white">
              <CardHeader>
                <CardTitle className="text-white/90">Resumo Financeiro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-white/60">Receita Total</p>
                  <p className="text-3xl font-bold">{formatCurrency(mockFinancial.totalRevenue)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-success" />
                    <span className="text-success">+{mockFinancial.growthPercentage}%</span>
                  </div>
                  <span className="text-sm text-white/60">vs mês anterior</span>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Pacientes este mês</span>
                    <span className="font-medium">{mockFinancial.patientsThisMonth}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Últimas Transações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          transaction.status === 'paid' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {transaction.status === 'paid' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.patient}</p>
                          <p className="text-xs text-muted-foreground">{transaction.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-primary">
                  Ver Todas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicDashboard;
