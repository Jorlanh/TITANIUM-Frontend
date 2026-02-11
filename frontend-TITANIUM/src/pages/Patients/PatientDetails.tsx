import React, { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  User,
  Calendar,
  Upload,
  Mic,
  MicOff,
  ZoomIn,
  FileText,
  Clock,
  AlertTriangle,
  Heart,
  Pill,
  X,
  ImageIcon,
} from 'lucide-react';
import { PatientFull, PatientTag, Exam, ClinicalNote } from '@/types';
import { toast } from 'sonner';

const mockPatient: PatientFull = {
  id: 'p1',
  name: 'Maria Silva Santos',
  email: 'maria.silva@email.com',
  phone: '(11) 98765-4321',
  cpf: '123.456.789-00',
  dateOfBirth: '1985-03-15',
  tags: [
    { id: 't1', label: 'Diabético', color: 'red' },
    { id: 't2', label: 'Alérgico à Penicilina', color: 'orange' },
    { id: 't3', label: 'Cardíaco', color: 'purple' },
  ],
  categoriaTratamento: 'Ortodontia',
  intervaloRecallDias: 30,
  intervaloPersonalizado: undefined,
  lastVisit: '2026-02-05',
  nextAppointment: '2026-03-07',
  totalSpent: 12500,
  status: 'active',
};

const mockExams: Exam[] = [
  { id: 'e1', patientId: 'p1', name: 'Panorâmica 2026', type: 'raio-x', thumbnailUrl: '/placeholder.svg', fileUrl: '/placeholder.svg', uploadedAt: '2026-01-15' },
  { id: 'e2', patientId: 'p1', name: 'Tomografia Mandíbula', type: 'tomografia', thumbnailUrl: '/placeholder.svg', fileUrl: '/placeholder.svg', uploadedAt: '2025-11-20' },
  { id: 'e3', patientId: 'p1', name: 'Periapical #14', type: 'raio-x', thumbnailUrl: '/placeholder.svg', fileUrl: '/placeholder.svg', uploadedAt: '2025-09-10' },
  { id: 'e4', patientId: 'p1', name: 'Relatório Lab', type: 'pdf', thumbnailUrl: '/placeholder.svg', fileUrl: '/placeholder.svg', uploadedAt: '2025-08-05' },
];

const mockNotes: ClinicalNote[] = [
  { id: 'n1', patientId: 'p1', dentistName: 'Dr. João Silva', content: 'Paciente compareceu para ajuste do aparelho ortodôntico. Troca do arco superior para arco retangular 19x25. Boa higiene oral.', createdAt: '2026-02-05T10:30:00' },
  { id: 'n2', patientId: 'p1', dentistName: 'Dr. João Silva', content: 'Consulta de acompanhamento. Movimentação dentária satisfatória. Paciente relata leve desconforto após última ativação.', createdAt: '2026-01-06T09:00:00' },
  { id: 'n3', patientId: 'p1', dentistName: 'Dra. Carla Mendes', content: 'Limpeza profilática realizada. Orientação sobre uso do fio dental com aparelho. Aplicação de flúor.', createdAt: '2025-12-10T14:00:00' },
];

const tagColorMap: Record<PatientTag['color'], string> = {
  red: 'bg-destructive/10 text-destructive border-destructive/20',
  orange: 'bg-warning/10 text-warning border-warning/20',
  yellow: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  purple: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
};

const tagIconMap: Record<PatientTag['color'], React.ElementType> = {
  red: Heart,
  orange: Pill,
  yellow: AlertTriangle,
  blue: User,
  purple: Heart,
};

const PatientDetails: React.FC = () => {
  const [patient] = useState(mockPatient);
  const [customInterval, setCustomInterval] = useState<string>(patient.intervaloPersonalizado?.toString() || '');
  const [lightboxExam, setLightboxExam] = useState<Exam | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(mockNotes);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const age = Math.floor((Date.now() - new Date(patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  const handleDictation = async () => {
    if (isRecording) {
      setIsRecording(false);
      // TODO: Integrate with backend - Speech-to-Text API
      await new Promise((r) => setTimeout(r, 1500));
      setNewNote((prev) => prev + (prev ? ' ' : '') + 'Paciente apresenta boa evolução no tratamento. Sem queixas de dor. Próxima consulta agendada para ajuste de manutenção.');
      toast.success('Transcrição concluída!');
    } else {
      setIsRecording(true);
      toast.info('Gravando... Fale sua anotação.');
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note: ClinicalNote = {
      id: `n${Date.now()}`,
      patientId: patient.id,
      dentistName: 'Dr. João Silva',
      content: newNote,
      createdAt: new Date().toISOString(),
    };
    setNotes([note, ...notes]);
    setNewNote('');
    toast.success('Evolução adicionada!');
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    // TODO: Integrate with backend - File upload
    toast.success(`${files.length} arquivo(s) enviado(s) com sucesso!`);
    setDragOver(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Patient Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-20 w-20 shrink-0">
                <AvatarFallback className="gradient-primary text-primary-foreground text-2xl font-bold">
                  {patient.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
                  <p className="text-muted-foreground">{age} anos • {patient.phone} • {patient.email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {patient.tags.map((tag) => {
                    const Icon = tagIconMap[tag.color];
                    return (
                      <Badge key={tag.id} variant="outline" className={tagColorMap[tag.color]}>
                        <Icon className="h-3 w-3 mr-1" />
                        {tag.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div className="text-right space-y-1 shrink-0">
                <p className="text-sm text-muted-foreground">Próxima consulta</p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Calendar className="h-4 w-4" />
                  {patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleDateString('pt-BR') : 'Não agendada'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="dados" className="space-y-4">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="dados">Dados & Recall</TabsTrigger>
            <TabsTrigger value="exames">Exames</TabsTrigger>
            <TabsTrigger value="prontuario">Prontuário</TabsTrigger>
          </TabsList>

          {/* Tab: Dados & Recall */}
          <TabsContent value="dados">
            <Card>
              <CardHeader>
                <CardTitle>Categoria de Tratamento & Recall</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Categoria de Tratamento Atual</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">{patient.categoriaTratamento}</span>
                      <Badge variant="outline" className="ml-auto">Padrão: {patient.intervaloRecallDias} dias</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customInterval">Intervalo Personalizado (dias)</Label>
                    <Input
                      id="customInterval"
                      type="number"
                      placeholder={`Padrão: ${patient.intervaloRecallDias} dias`}
                      value={customInterval}
                      onChange={(e) => setCustomInterval(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Defina um intervalo específico para este paciente se quiser ignorar o padrão da categoria.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Última visita: {new Date(patient.lastVisit).toLocaleDateString('pt-BR')} — 
                    Próximo recall: {new Date(new Date(patient.lastVisit).getTime() + (parseInt(customInterval) || patient.intervaloRecallDias) * 86400000).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Exames */}
          <TabsContent value="exames">
            <Card>
              <CardHeader>
                <CardTitle>Exames & Documentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); handleFileUpload(e.dataTransfer.files); }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-foreground font-medium">Arraste arquivos aqui ou clique para selecionar</p>
                  <p className="text-sm text-muted-foreground mt-1">Raio-X, Tomografias, PDFs — até 50MB</p>
                  <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="group relative aspect-square rounded-lg overflow-hidden border cursor-pointer hover:ring-2 ring-primary transition-all"
                      onClick={() => setLightboxExam(exam)}
                    >
                      <img src={exam.thumbnailUrl} alt={exam.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <div>
                          <p className="text-white text-sm font-medium truncate">{exam.name}</p>
                          <p className="text-white/70 text-xs">{new Date(exam.uploadedAt).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <ZoomIn className="absolute top-3 right-3 h-5 w-5 text-white" />
                      </div>
                      {exam.type === 'pdf' && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-destructive/80 text-destructive-foreground text-xs">PDF</Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Prontuário */}
          <TabsContent value="prontuario">
            <Card>
              <CardHeader>
                <CardTitle>Prontuário Inteligente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* New Note */}
                <div className="space-y-3">
                  <div className="relative">
                    <Textarea
                      placeholder="Escreva a evolução clínica ou use o ditado por IA..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[120px] pr-16"
                    />
                    {/* Floating Mic Button */}
                    <Button
                      size="icon"
                      className={`absolute bottom-3 right-3 rounded-full h-10 w-10 ${
                        isRecording ? 'bg-destructive hover:bg-destructive/90 animate-pulse' : 'gradient-primary hover:opacity-90'
                      }`}
                      onClick={handleDictation}
                    >
                      {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                  </div>
                  {isRecording && (
                    <div className="flex items-center gap-2 text-destructive text-sm animate-pulse">
                      <div className="h-2 w-2 rounded-full bg-destructive" />
                      Gravando... Clique no microfone para parar.
                    </div>
                  )}
                  <Button onClick={handleAddNote} disabled={!newNote.trim()} className="gradient-primary hover:opacity-90">
                    Salvar Evolução
                  </Button>
                </div>

                {/* Timeline */}
                <div className="relative space-y-0">
                  <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />
                  {notes.map((note, idx) => (
                    <div key={note.id} className="relative pl-12 pb-6 animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
                      <div className="absolute left-2 top-1 h-4 w-4 rounded-full bg-primary border-2 border-card" />
                      <div className="rounded-lg border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{note.dentistName}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleDateString('pt-BR')} às {new Date(note.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{note.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Lightbox */}
        <Dialog open={!!lightboxExam} onOpenChange={() => setLightboxExam(null)}>
          <DialogContent className="max-w-3xl bg-card">
            <DialogHeader>
              <DialogTitle>{lightboxExam?.name}</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <img src={lightboxExam?.fileUrl} alt={lightboxExam?.name} className="w-full rounded-lg" />
            </div>
            <p className="text-xs text-muted-foreground">
              Enviado em {lightboxExam && new Date(lightboxExam.uploadedAt).toLocaleDateString('pt-BR')}
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PatientDetails;
