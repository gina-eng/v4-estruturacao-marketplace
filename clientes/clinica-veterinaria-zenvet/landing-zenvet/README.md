# Landing Page Zenvet

Stack: Next.js 14 (App Router) + React 18 + Tailwind CSS 3. Dados vêm do JSON output da skill `ee-s3-landing-page` (em `../outputs/ee-s3-landing-page.json`) — a copy fica versionada com o resto do cliente.

## Dev local

```bash
npm install
npm run dev
# abre http://localhost:3001
```

## Pendências antes de publicar

1. **Foto do hero** — substituir `components/HeroPhoto.tsx` por `<Image>` apontando para uma das 29 fotos profissionais existentes (sugestão: Dra. Nathalia agachada na altura do gato, luz natural). Salvar em `public/photos/hero.jpg`.
2. **Depoimentos** — `social_proof.testimonials` no JSON tem 3 placeholders. Coletar reais (Google Reviews / Loíse / IG) e atualizar o JSON; o componente já trata o estado "placeholder" visualmente.
3. **Domínio** — definir antes do deploy: `clinicazenvet.com.br` (substitui site atual) ou subdomínio `agendar.clinicazenvet.com.br`.
4. **Schema.org** — adicionar JSON-LD `Veterinarian` no layout para rich snippets do Google.

## Deploy (quando aprovar)

```bash
npm run build
# Vercel:
vercel --prod
```
