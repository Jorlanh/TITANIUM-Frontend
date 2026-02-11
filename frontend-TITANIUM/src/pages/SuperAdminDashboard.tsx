import React, { useState } from 'react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  MoreVertical,
  Ban,
  Eye,
  Tag,
  Plus,
  AlertTriangle,
} from 'lucide-react';
import { Clinic, Coupon } from '@/types/clinic';
import { toast } from 'sonner';

// Mock data
const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'Clínica Saúde Total',
    email: 'contato@saudetotal.com',
    phone: '(11) 99999-0001',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    status: 'active',
    plan: 'pro',
    patientsCount: 450,
    monthlyRevenue: 45000,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Centro Médico Vida',
    email: 'atendimento@cmvida.com',
    phone: '(11) 99999-0002',
    address: 'Rua Augusta, 500 - São Paulo, SP',
    status: 'active',
    plan: 'enterprise',
    patientsCount: 1200,
    monthlyRevenue: 120000,
    createdAt: '2023-06-20',
  },
  {
    id: '3',
    name: 'Clínica Bem Estar',
    email: 'contato@bemestar.com',
    phone: '(21) 99999-0003',
    address: 'Av. Atlântica, 200 - Rio de Janeiro, RJ',
    status: 'active',
    plan: 'basic',
    patientsCount: 180,
    monthlyRevenue: 18000,
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Instituto Saúde Premium',
    email: 'sac@saudepremium.com',
    phone: '(31) 99999-0004',
    address: 'Rua da Bahia, 800 - Belo Horizonte, MG',
    status: 'banned',
    plan: 'pro',
    patientsCount: 320,
    monthlyRevenue: 0,
    createdAt: '2023-12-01',
  },
  {
    id: '5',
    name: 'Clínica Nova Vida',
    email: 'contato@novavida.com',
    phone: '(41) 99999-0005',
    address: 'Av. Batel, 1500 - Curitiba, PR',
    status: 'pending',
    plan: 'basic',
    patientsCount: 0,
    monthlyRevenue: 0,
    createdAt: '2024-06-01',
  },
];

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'BEMVINDO30',
    discount: 30,
    type: 'percentage',
    validUntil: '2024-12-31',
    usageLimit: 100,
    usageCount: 45,
    status: 'active',
  },
  {
    id: '2',
    code: 'PROMO50',
    discount: 50,
    type: 'fixed',
    validUntil: '2024-08-31',
    usageLimit: 50,
    usageCount: 50,
    status: 'depleted',
  },
];

const SuperAdminDashboard: React.FC = () => {
  const [clinics, setClinics] = useState(mockClinics);
  const [searchTerm, setSearchTerm] = useState('');
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    type: 'percentage' as 'percentage' | 'fixed',
    validUntil: '',
    usageLimit: '',
  });

  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = clinics.reduce((sum, c) => sum + c.monthlyRevenue, 0);
  const totalPatients = clinics.reduce((sum, c) => sum + c.patientsCount, 0);
  const activeClinics = clinics.filter((c) => c.status === 'active').length;

  const handleBanClinic = () => {
    if (!selectedClinic) return;
    
    setClinics(clinics.map(c => 
      c.id === selectedClinic.id 
        ? { ...c, status: c.status === 'banned' ? 'active' : 'banned' as const }
        : c
    ));
    
    toast.success(
      selectedClinic.status === 'banned' 
        ? `${selectedClinic.name} foi reativada` 
        : `${selectedClinic.name} foi banida`
    );
    setBanDialogOpen(false);
    setSelectedClinic(null);
  };

  const handleCreateCoupon = () => {
    toast.success(`Cupom ${newCoupon.code} criado com sucesso!`);
    setCouponDialogOpen(false);
    setNewCoupon({
      code: '',
      discount: '',
      type: 'percentage',
      validUntil: '',
      usageLimit: '',
    });
  };

  const getStatusBadge = (status: Clinic['status']) => {
    const variants = {
      active: 'bg-success/10 text-success border-success/20',
      banned: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
    };
    const labels = {
      active: 'Ativa',
      banned: 'Banida',
      pending: 'Pendente',
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getPlanBadge = (plan: Clinic['plan']) => {
    const variants = {
      basic: 'bg-muted text-muted-foreground',
      pro: 'bg-primary/10 text-primary',
      enterprise: 'gradient-accent text-accent-foreground',
    };
    return (
      <Badge className={variants[plan]}>
        {plan.charAt(0).toUpperCase() + plan.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Super Admin</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todas as clínicas da plataforma
            </p>
          </div>
          <Dialog open={couponDialogOpen} onOpenChange={setCouponDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-accent hover:opacity-90">
                <Tag className="mr-2 h-4 w-4" />
                Criar Cupom
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle>Criar Novo Cupom</DialogTitle>
                <DialogDescription>
                  Crie um cupom de desconto para as clínicas
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código do Cupom</Label>
                  <Input
                    id="code"
                    placeholder="EX: PROMO20"
                    value={newCoupon.code}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount">Desconto</Label>
                    <Input
                      id="discount"
                      type="number"
                      placeholder="30"
                      value={newCoupon.discount}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, discount: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <select
                      id="type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newCoupon.type}
                      onChange={(e) =>
                        setNewCoupon({
                          ...newCoupon,
                          type: e.target.value as 'percentage' | 'fixed',
                        })
                      }
                    >
                      <option value="percentage">Porcentagem (%)</option>
                      <option value="fixed">Valor Fixo (R$)</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="validUntil">Válido até</Label>
                    <Input
                      id="validUntil"
                      type="date"
                      value={newCoupon.validUntil}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, validUntil: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usageLimit">Limite de uso</Label>
                    <Input
                      id="usageLimit"
                      type="number"
                      placeholder="100"
                      value={newCoupon.usageLimit}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, usageLimit: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCouponDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateCoupon} className="gradient-primary">
                  Criar Cupom
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Clínicas Ativas"
            value={activeClinics}
            description={`de ${clinics.length} total`}
            icon={Building2}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Pacientes"
            value={totalPatients.toLocaleString('pt-BR')}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Receita Mensal"
            value={formatCurrency(totalRevenue)}
            icon={DollarSign}
            variant="accent"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Taxa de Crescimento"
            value="23%"
            description="Novos cadastros"
            icon={TrendingUp}
          />
        </div>

        {/* Clinics Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Clínicas Cadastradas</CardTitle>
                <CardDescription>
                  Gerencie todas as clínicas da plataforma
                </CardDescription>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar clínicas..."
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
                    <TableHead>Clínica</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead className="text-right">Pacientes</TableHead>
                    <TableHead className="text-right">Receita/Mês</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClinics.map((clinic, index) => (
                    <TableRow 
                      key={clinic.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{clinic.name}</p>
                          <p className="text-sm text-muted-foreground">{clinic.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(clinic.status)}</TableCell>
                      <TableCell>{getPlanBadge(clinic.plan)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {clinic.patientsCount.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(clinic.monthlyRevenue)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setSelectedClinic(clinic);
                                setBanDialogOpen(true);
                              }}
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              {clinic.status === 'banned' ? 'Reativar' : 'Banir'} Clínica
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Ban Confirmation Dialog */}
        <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                {selectedClinic?.status === 'banned' ? 'Reativar' : 'Banir'} Clínica
              </DialogTitle>
              <DialogDescription>
                {selectedClinic?.status === 'banned' 
                  ? `Tem certeza que deseja reativar a clínica "${selectedClinic?.name}"?`
                  : `Tem certeza que deseja banir a clínica "${selectedClinic?.name}"? Ela perderá acesso à plataforma.`
                }
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBanDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant={selectedClinic?.status === 'banned' ? 'default' : 'destructive'}
                onClick={handleBanClinic}
              >
                {selectedClinic?.status === 'banned' ? 'Reativar' : 'Banir'} Clínica
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
