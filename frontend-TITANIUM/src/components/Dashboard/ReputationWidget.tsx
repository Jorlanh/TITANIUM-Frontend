import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ReputationData } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

const mockReputation: ReputationData = {
  averageScore: 4.9,
  totalResponses: 342,
  promoters: 285,
  neutrals: 42,
  detractors: 15,
  recentFeedbacks: [
    { id: 'f1', patientName: 'Maria S.', score: 5, comment: 'Atendimento excelente! Equipe super atenciosa.', createdAt: '2026-02-10' },
    { id: 'f2', patientName: 'Carlos F.', score: 5, comment: 'Melhor clínica que já fui. Super recomendo!', createdAt: '2026-02-09' },
    { id: 'f3', patientName: 'Ana O.', score: 4, comment: 'Bom atendimento, só a espera foi um pouco longa.', createdAt: '2026-02-08' },
    { id: 'f4', patientName: 'Pedro S.', score: 5, comment: 'Profissionais incríveis e ambiente acolhedor.', createdAt: '2026-02-07' },
    { id: 'f5', patientName: 'Lucia C.', score: 3, comment: 'Atendimento ok, mas poderia melhorar a comunicação.', createdAt: '2026-02-06' },
  ],
};

const COLORS = ['hsl(142, 72%, 40%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 51%)'];

const ReputationWidget: React.FC = () => {
  const data = mockReputation;
  const pieData = [
    { name: 'Promotores', value: data.promoters },
    { name: 'Neutros', value: data.neutrals },
    { name: 'Detratores', value: data.detractors },
  ];

  const getScoreStars = (score: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < score ? 'fill-warning text-warning' : 'text-muted'}`} />
    ));
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <Star className="h-4 w-4 text-warning" />
            Reputação
          </span>
          <Badge variant="outline" className="text-xs">{data.totalResponses} respostas</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score + Chart side by side */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground">{data.averageScore}</p>
            <div className="flex gap-0.5 justify-center mt-1">
              {getScoreStars(Math.round(data.averageScore))}
            </div>
          </div>
          <div className="flex-1 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={25} outerRadius={42} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`${value}`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 text-xs">
          <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-success" /> Promotores</span>
          <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-warning" /> Neutros</span>
          <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-destructive" /> Detratores</span>
        </div>

        {/* Recent feedbacks */}
        <ScrollArea className="h-[140px]">
          <div className="space-y-3">
            {data.recentFeedbacks.map((fb) => (
              <div key={fb.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{fb.patientName}</span>
                  <div className="flex gap-0.5">{getScoreStars(fb.score)}</div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{fb.comment}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => toast.info('Configuração do link do Google Reviews — integre com o backend.')}
        >
          <ExternalLink className="mr-2 h-3 w-3" />
          Configurar Link do Google Reviews
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReputationWidget;
