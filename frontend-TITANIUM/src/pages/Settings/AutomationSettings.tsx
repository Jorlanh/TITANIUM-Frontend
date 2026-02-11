import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Bot, Save, MessageSquare, Clock } from 'lucide-react';
import { TreatmentCategory } from '@/types';
import { toast } from 'sonner';

const mockCategories: TreatmentCategory[] = [
  {
    id: 'cat1',
    name: 'Implante Dentário',
    defaultIntervalDays: 90,
    messages: [
      { id: 'm1', day: 1, content: 'Olá {nome}! Como você está se sentindo após o procedimento de implante? Lembre-se: gelo no rosto por 20 minutos a cada hora. Tome a medicação no horário prescrito. Qualquer dúvida, estamos aqui! 🦷' },
      { id: 'm2', day: 2, content: 'Bom dia {nome}! Segundo dia pós-implante: o inchaço pode aumentar, é normal. Continue com a medicação e alimentação pastosa. Evite esforço físico. Se houver sangramento excessivo, entre em contato.' },
      { id: 'm3', day: 3, content: '{nome}, como está hoje? No 3º dia, o desconforto costuma diminuir. Continue com alimentação leve e higiene bucal delicada na região. Sua próxima consulta de controle está agendada. Cuide-se! 💪' },
    ],
  },
  {
    id: 'cat2',
    name: 'Extração de Siso',
    defaultIntervalDays: 30,
    messages: [
      { id: 'm4', day: 1, content: 'Oi {nome}! Pós-extração do siso: morda a gaze por 30 minutos. Aplique gelo. Não cuspa, não use canudo. Tome a medicação conforme prescrito. Repouso hoje! 🤕' },
      { id: 'm5', day: 2, content: '{nome}, como acordou hoje? Dia 2: o inchaço é esperado. Continue com gelo e alimentação gelada/pastosa. Nada de bochechos fortes. Qualquer sinal de febre, nos avise.' },
      { id: 'm6', day: 3, content: 'Olá {nome}! Terceiro dia após a extração. Você já pode fazer bochechos suaves com água morna e sal. Continue evitando alimentos duros. Em breve estará 100%! 😊' },
    ],
  },
  {
    id: 'cat3',
    name: 'Clareamento Dental',
    defaultIntervalDays: 180,
    messages: [
      { id: 'm7', day: 1, content: 'Oi {nome}! Primeiro dia pós-clareamento: evite alimentos com corantes (café, vinho, beterraba). Sensibilidade é normal nas primeiras 48h. Use o gel dessensibilizante se precisar!' },
      { id: 'm8', day: 2, content: '{nome}, como está a sensibilidade? Continue evitando alimentos coloridos. Se a sensibilidade for intensa, use o dessensibilizante antes de dormir. Seu sorriso vai ficar incrível! ✨' },
      { id: 'm9', day: 3, content: 'Último lembrete {nome}! A partir de amanhã, pode voltar à alimentação normal gradualmente. Para manter o resultado, evite excesso de café e tabaco. Seu sorriso agradece! 😁' },
    ],
  },
];

const AutomationSettings: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(mockCategories[0].id);
  const [messages, setMessages] = useState<Record<string, string>>({});

  const category = mockCategories.find((c) => c.id === selectedCategory)!;

  const getMessageContent = (msgId: string, original: string) => {
    return messages[msgId] ?? original;
  };

  const handleMessageChange = (msgId: string, content: string) => {
    setMessages((prev) => ({ ...prev, [msgId]: content }));
  };

  const handleSave = () => {
    // TODO: Integrate with backend - Save automation messages
    toast.success(`Mensagens de "${category.name}" salvas com sucesso!`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            Enfermeiro Robô
          </h1>
          <p className="text-muted-foreground mt-1">Configure as mensagens automáticas de pós-operatório por categoria de tratamento.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Categoria de Tratamento</CardTitle>
            <CardDescription>Selecione a categoria para editar as mensagens automáticas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Accordion type="multiple" defaultValue={category.messages.map((m) => m.id)} className="space-y-2">
              {category.messages.map((msg) => (
                <AccordionItem key={msg.id} value={msg.id} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">Mensagem Dia {msg.day}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Enviada automaticamente no {msg.day}º dia pós-procedimento
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="space-y-2">
                      <Label htmlFor={msg.id}>Texto da mensagem</Label>
                      <Textarea
                        id={msg.id}
                        value={getMessageContent(msg.id, msg.content)}
                        onChange={(e) => handleMessageChange(msg.id, e.target.value)}
                        className="min-h-[120px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{nome}'}</code> para inserir o nome do paciente automaticamente.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button onClick={handleSave} className="gradient-primary hover:opacity-90">
              <Save className="mr-2 h-4 w-4" />
              Salvar Mensagens
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AutomationSettings;
