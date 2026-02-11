import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  RefreshCw,
  Clock,
  Zap,
  Phone,
  User,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { Appointment, AppointmentStatus, WaitingListItem } from '@/types';
import { toast } from 'sonner';

const statusConfig: Record<AppointmentStatus, { label: string; bg: string; border: string }> = {
  AGENDADO: { label: 'Agendado', bg: 'bg-muted', border: 'border-l-muted-foreground' },
  CONFIRMADO: { label: 'Confirmado', bg: 'bg-success/10', border: 'border-l-success' },
  EM_ATENDIMENTO: { label: 'Em Atendimento', bg: 'bg-blue-500/10', border: 'border-l-blue-500' },
  FINALIZADO: { label: 'Finalizado', bg: 'bg-violet-500/10', border: 'border-l-violet-500' },
  FALTOU: { label: 'Faltou', bg: 'bg-destructive/10', border: 'border-l-destructive' },
};

const mockAppointments: Appointment[] = [
  { id: '1', patientId: 'p1', patientName: 'Maria Silva', procedimento: 'Limpeza', dentistName: 'Dr. João', start: new Date().toISOString().split('T')[0] + 'T09:00:00', end: new Date().toISOString().split('T')[0] + 'T10:00:00', status: 'CONFIRMADO' },
  { id: '2', patientId: 'p2', patientName: 'Carlos Ferreira', procedimento: 'Canal', dentistName: 'Dr. João', start: new Date().toISOString().split('T')[0] + 'T10:30:00', end: new Date().toISOString().split('T')[0] + 'T12:00:00', status: 'AGENDADO' },
  { id: '3', patientId: 'p3', patientName: 'Ana Oliveira', procedimento: 'Restauração', dentistName: 'Dra. Carla', start: new Date().toISOString().split('T')[0] + 'T14:00:00', end: new Date().toISOString().split('T')[0] + 'T15:00:00', status: 'EM_ATENDIMENTO' },
  { id: '4', patientId: 'p4', patientName: 'Pedro Santos', procedimento: 'Extração', dentistName: 'Dr. João', start: new Date(Date.now() - 86400000).toISOString().split('T')[0] + 'T11:00:00', end: new Date(Date.now() - 86400000).toISOString().split('T')[0] + 'T12:00:00', status: 'FINALIZADO' },
  { id: '5', patientId: 'p5', patientName: 'Lucia Costa', procedimento: 'Ortodontia', dentistName: 'Dra. Carla', start: new Date(Date.now() - 86400000).toISOString().split('T')[0] + 'T09:00:00', end: new Date(Date.now() - 86400000).toISOString().split('T')[0] + 'T10:00:00', status: 'FALTOU' },
];

const mockWaitingList: WaitingListItem[] = [
  { id: 'w1', patientName: 'Roberto Alves', phone: '(11) 99999-1111', procedimento: 'Implante', preferencia: 'Manhã (8h-12h)', addedAt: '2026-02-08' },
  { id: 'w2', patientName: 'Juliana Martins', phone: '(11) 99999-2222', procedimento: 'Clareamento', preferencia: 'Tarde (14h-18h)', addedAt: '2026-02-09' },
  { id: 'w3', patientName: 'Fernando Souza', phone: '(11) 99999-3333', procedimento: 'Prótese', preferencia: 'Qualquer horário', addedAt: '2026-02-10' },
  { id: 'w4', patientName: 'Patrícia Lima', phone: '(11) 99999-4444', procedimento: 'Limpeza', preferencia: 'Manhã (8h-12h)', addedAt: '2026-02-10' },
  { id: 'w5', patientName: 'Marcos Oliveira', phone: '(11) 99999-5555', procedimento: 'Canal', preferencia: 'Tarde (14h-18h)', addedAt: '2026-02-11' },
];

const CalendarPage: React.FC = () => {
  const [syncingGoogle, setSyncingGoogle] = useState(false);
  const [fillingWait, setFillingWait] = useState(false);

  const handleGoogleSync = async () => {
    setSyncingGoogle(true);
    // TODO: Integrate with backend - OAuth Google Calendar
    await new Promise((r) => setTimeout(r, 2000));
    setSyncingGoogle(false);
    toast.success('Google Agenda sincronizado com sucesso!');
  };

  const handleFillVacancy = async () => {
    setFillingWait(true);
    // TODO: Integrate with backend - Send messages to top 5
    await new Promise((r) => setTimeout(r, 2500));
    setFillingWait(false);
    toast.success('Mensagem enviada para os 5 primeiros da lista de espera!');
  };

  const calendarEvents = mockAppointments.map((apt) => {
    const cfg = statusConfig[apt.status];
    const colorMap: Record<AppointmentStatus, string> = {
      AGENDADO: '#94a3b8',
      CONFIRMADO: '#10b981',
      EM_ATENDIMENTO: '#3b82f6',
      FINALIZADO: '#8b5cf6',
      FALTOU: '#ef4444',
    };
    return {
      id: apt.id,
      title: `${apt.patientName} - ${apt.procedimento}`,
      start: apt.start,
      end: apt.end,
      backgroundColor: colorMap[apt.status] + '20',
      borderColor: colorMap[apt.status],
      textColor: colorMap[apt.status],
      extendedProps: { status: apt.status, dentist: apt.dentistName },
    };
  });

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Centro de Comando</h1>
            <p className="text-muted-foreground mt-1">Agenda e lista de espera</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleGoogleSync} disabled={syncingGoogle}>
              {syncingGoogle ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Sincronizar Google Agenda
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="gradient-accent hover:opacity-90">
                  <Clock className="mr-2 h-4 w-4" />
                  Lista de Espera
                  <Badge variant="secondary" className="ml-2 bg-primary-foreground/20 text-primary-foreground">{mockWaitingList.length}</Badge>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Lista de Espera Turbo
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Button onClick={handleFillVacancy} disabled={fillingWait} className="w-full gradient-primary hover:opacity-90">
                    {fillingWait ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando mensagens...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Preencher Vaga Automaticamente
                      </>
                    )}
                  </Button>
                  
                  {mockWaitingList.map((item, idx) => (
                    <Card key={item.id} className="animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="font-medium text-foreground">{item.patientName}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">#{idx + 1}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.procedimento}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {item.preferencia}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {item.phone}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs">
              <div className={`h-3 w-3 rounded-full ${cfg.bg} border ${cfg.border.replace('border-l-', 'border-')}`} />
              <span className="text-muted-foreground">{cfg.label}</span>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <Card className="overflow-hidden">
          <CardContent className="p-2 md:p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              locale="pt-br"
              events={calendarEvents}
              editable
              selectable
              nowIndicator
              slotMinTime="07:00:00"
              slotMaxTime="21:00:00"
              allDaySlot={false}
              height="auto"
              contentHeight={600}
              eventClick={(info) => {
                toast.info(`${info.event.title} — Status: ${info.event.extendedProps.status}`);
              }}
              buttonText={{
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
              }}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
