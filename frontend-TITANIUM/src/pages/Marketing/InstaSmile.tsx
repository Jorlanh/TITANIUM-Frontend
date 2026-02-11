import React, { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Upload,
  Sparkles,
  Download,
  Copy,
  ImageIcon,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

const InstaSmile: React.FC = () => {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [caption, setCaption] = useState('');
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (type: 'before' | 'after', files: FileList | null) => {
    if (!files || !files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'before') setBeforeImage(e.target?.result as string);
      else setAfterImage(e.target?.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleGenerate = async () => {
    if (!beforeImage || !afterImage) {
      toast.error('Envie as fotos antes e depois!');
      return;
    }
    setGenerating(true);
    setGenerated(false);
    // TODO: Integrate with backend - AI post generation
    await new Promise((r) => setTimeout(r, 3000));
    setCaption('✨ Transformação incrível! Nosso paciente chegou buscando um sorriso novo e saiu com autoestima renovada! 😁\n\n🦷 Procedimento: Lentes de contato dental\n⏱️ Tempo: 2 sessões\n💎 Resultado: Natural e harmonioso\n\n📞 Agende sua avaliação gratuita!\n\n#Odontologia #AntesEDepois #LentesDeContato #Sorriso #TransformacaoDental #OdontoEstetica');
    setGenerating(false);
    setGenerated(true);
    toast.success('Post gerado com sucesso!');
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    toast.success('Legenda copiada!');
  };

  const Dropzone: React.FC<{ label: string; image: string | null; inputRef: React.RefObject<HTMLInputElement>; type: 'before' | 'after' }> = ({ label, image, inputRef, type }) => (
    <div
      className={`relative border-2 border-dashed rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all ${
        image ? 'border-success/50 bg-success/5' : 'border-border hover:border-primary/50 hover:bg-primary/5'
      }`}
      onClick={() => inputRef.current?.click()}
    >
      {image ? (
        <img src={image} alt={label} className="w-full h-full object-cover rounded-xl" />
      ) : (
        <div className="text-center space-y-3 p-4">
          <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
          <div>
            <p className="font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">Clique ou arraste a foto</p>
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(type, e.target.files)} />
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">InstaSmile Generator</h1>
          <p className="text-muted-foreground mt-1">Crie posts profissionais antes/depois com IA</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Fotos do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Dropzone label="Foto Antes" image={beforeImage} inputRef={beforeRef as React.RefObject<HTMLInputElement>} type="before" />
                  <Dropzone label="Foto Depois" image={afterImage} inputRef={afterRef as React.RefObject<HTMLInputElement>} type="after" />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={generating || !beforeImage || !afterImage}
              className="w-full h-12 gradient-primary hover:opacity-90 text-base"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Gerando post com IA...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Gerar Post com IA
                </>
              )}
            </Button>
          </div>

          {/* Right: Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview do Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {generating ? (
                  <div className="space-y-4">
                    <Skeleton className="w-full aspect-[2/1] rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : generated && beforeImage && afterImage ? (
                  <>
                    {/* Image Preview */}
                    <div className="relative rounded-lg overflow-hidden border">
                      <div className="grid grid-cols-2">
                        <div className="relative">
                          <img src={beforeImage} alt="Antes" className="w-full aspect-square object-cover" />
                          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">ANTES</div>
                        </div>
                        <div className="relative">
                          <img src={afterImage} alt="Depois" className="w-full aspect-square object-cover" />
                          <div className="absolute bottom-2 left-2 bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded">DEPOIS</div>
                        </div>
                      </div>
                      {/* Logo overlay */}
                      <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                        <div className="h-5 w-5 rounded gradient-primary flex items-center justify-center">
                          <span className="text-[8px] font-bold text-primary-foreground">T</span>
                        </div>
                        <span className="text-xs font-semibold text-foreground">TITANIUM</span>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Legenda sugerida</Label>
                      <Textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="min-h-[160px] text-sm"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1" onClick={() => toast.info('Download simulado!')}>
                        <Download className="mr-2 h-4 w-4" />
                        Baixar Imagem
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={handleCopyCaption}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Legenda
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">Envie as fotos e clique em "Gerar Post" para ver o preview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstaSmile;
