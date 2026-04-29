// Placeholder visual para a foto principal do hero.
// SUBSTITUIR antes de publicar: usar uma das 29 fotos profissionais disponíveis.
// Critério: Dra. Nathalia agachada na altura de um gato, luz natural, expressão tranquila,
// composição cotidiana (não institucional). Salvar em public/photos/hero.jpg
// e trocar este componente por <Image src="/photos/hero.jpg" ... />.

export default function HeroPhoto() {
  return (
    <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-gradient-to-br from-purple-deep/10 via-turquoise/10 to-magenta/10 flex items-center justify-center border border-graphite/10">
      <div className="absolute inset-4 rounded-card border-2 border-dashed border-purple-deep/30 flex flex-col items-center justify-center text-center px-6 gap-2">
        <div className="text-purple-deep/70 font-semibold text-sm uppercase tracking-widest">
          Placeholder · foto do hero
        </div>
        <p className="text-graphite/70 text-sm leading-relaxed max-w-xs">
          Dra. Nathalia agachada na altura de um gato, luz natural, expressão tranquila — foto cotidiana, não institucional.
        </p>
        <div className="text-xs text-graphite/50 mt-3">
          Substituir antes de publicar:<br />
          <code className="text-purple-deep/80">public/photos/hero.jpg</code>
        </div>
      </div>
    </div>
  );
}
