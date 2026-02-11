import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  Users,
  TrendingUp,
  Zap,
  Star,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Bot,
  Camera,
  ChevronRight,
  Play,
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Agenda Inteligente',
    description: 'Centro de comando com lista de espera turbo e sincronização Google Agenda.',
  },
  {
    icon: Users,
    title: 'Prontuário Digital',
    description: 'Ditado por IA, upload de exames com galeria e timeline clínica completa.',
  },
  {
    icon: Camera,
    title: 'InstaSmile Generator',
    description: 'Gere posts antes/depois com IA para redes sociais em segundos.',
  },
  {
    icon: Star,
    title: 'Gerador de Estrelas',
    description: 'NPS automático e gestão de reputação com link direto pro Google Reviews.',
  },
  {
    icon: Bot,
    title: 'Enfermeiro Robô',
    description: 'Automação pós-operatória com mensagens personalizadas por tratamento.',
  },
  {
    icon: TrendingUp,
    title: 'Financeiro Completo',
    description: 'Relatórios, cobranças automáticas e controle de inadimplência.',
  },
];

const plans = [
  {
    name: 'Starter',
    price: 'R$ 297',
    period: '/mês',
    description: 'Para clínicas iniciando a transformação digital',
    features: [
      'Até 200 pacientes ativos',
      'Agenda Inteligente & Lista de Espera',
      'Prontuário Digital com Upload',
      'Galeria de Exames (GED)',
      'Suporte por Email',
    ],
    cta: 'Começar Grátis',
    popular: false,
  },
  {
    name: 'Professional',
    price: 'R$ 597',
    period: '/mês',
    description: 'Para clínicas que querem crescer com automação',
    features: [
      'Tudo do plano Starter, mais:',
      'Pacientes Ilimitados',
      'InstaSmile Generator (Marketing IA)',
      'Enfermeiro Robô (Pós-Operatório)',
      'Gerador de Estrelas (NPS)',
      'Suporte via WhatsApp',
    ],
    cta: 'Teste 14 dias grátis',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'R$ 997',
    period: '/mês',
    description: 'Para redes e clínicas premium',
    features: [
      'Tudo do plano Professional, mais:',
      'Gestão Multi-unidades / Franquias',
      'Anamnese por Voz (Ditado IA)',
      'Relatórios Financeiros Avançados',
      'Prioridade Máxima no Suporte',
      'Migração de Dados Assistida',
    ],
    cta: 'Falar com Vendas',
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Dra. Camila Rocha',
    clinic: 'Odonto Excellence',
    text: 'O TITANIUM revolucionou minha clínica. Reduzi 70% do tempo administrativo e aumentei o faturamento em 40%.',
    score: 5,
  },
  {
    name: 'Dr. Ricardo Mendes',
    clinic: 'Sorriso Perfeito',
    text: 'O Enfermeiro Robô é genial. Meus pacientes elogiam o acompanhamento pós-operatório.',
    score: 5,
  },
  {
    name: 'Dra. Fernanda Lima',
    clinic: 'Clínica Integrada',
    text: 'O InstaSmile Generator me deu presença digital profissional sem precisar de agência.',
    score: 5,
  },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TITANIUM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Planos</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Depoimentos</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Entrar
            </Button>
            <Button className="gradient-primary hover:opacity-90" onClick={() => navigate('/login')}>
              Começar Grátis
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Plataforma #1 em gestão odontológica com IA
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Sua clínica no{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                próximo nível
              </span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground">
              Agenda inteligente, prontuário com ditado por IA, marketing automatizado e 
              gestão financeira completa. Tudo em uma plataforma de elite.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gradient-primary hover:opacity-90 h-12 px-8 text-base" onClick={() => navigate('/login')}>
                Teste 14 dias grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                <Play className="mr-2 h-5 w-5" />
                Ver demonstração
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Sem cartão de crédito
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Setup em 5 minutos
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Suporte humanizado
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2.500+', label: 'Clínicas ativas' },
              { value: '1.2M+', label: 'Pacientes gerenciados' },
              { value: '98%', label: 'Satisfação dos clientes' },
              { value: '40%', label: 'Aumento médio de receita' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Tudo que sua clínica precisa
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              6 módulos integrados que transformam a gestão da sua clínica odontológica.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:gradient-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Planos que cabem no seu bolso
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comece grátis e escale conforme sua clínica cresce.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular ? 'border-primary shadow-glow ring-1 ring-primary/20' : 'border-border/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 gradient-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Mais popular
                  </div>
                )}
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        {/* Se o texto começar com "Tudo do plano...", usamos destaque, senão Check normal */}
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${f.startsWith('Tudo do plano') ? 'text-primary font-bold' : 'text-success'}`} />
                        <span className={f.startsWith('Tudo do plano') ? 'font-semibold text-primary' : ''}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'gradient-primary hover:opacity-90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/login')}
                  >
                    {plan.cta}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Quem usa, recomenda
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Veja o que dentistas de todo o Brasil dizem sobre o TITANIUM.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.score }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.clinic}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl gradient-hero p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pronto para transformar sua clínica?
              </h2>
              <p className="text-lg text-white/70 max-w-xl mx-auto">
                Junte-se a mais de 2.500 clínicas que já usam o TITANIUM para crescer com inteligência.
              </p>
              <Button size="lg" className="gradient-primary hover:opacity-90 h-12 px-8 text-base" onClick={() => navigate('/login')}>
                Começar agora — é grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">TITANIUM</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 TITANIUM. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;