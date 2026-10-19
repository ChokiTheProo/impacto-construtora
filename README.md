# Impacto Construtora — Site

Site institucional da **Impacto Construtora** — Casas Minha Casa Minha Vida em Pirajuí/SP.

## 🚀 Acesso
Site estático — abra \index.html\ ou publique via GitHub Pages.

## 📸 Foto principal (alto padrão)
Hero usando imagem de casa de alto padrão moderna (Unsplash):
\https://images.unsplash.com/photo-1600585154340-be6161a56a0c\
- Para trocar: edite \index.html\ — busque por \hero__poster\ e \preload\ no \<head>\.

## 🎬 Vídeo principal
O site já está preparado para vídeo no topo. Para ativar:

### Caminho do vídeo:
\\\
assets/video/hero.mp4
\\\

### Como baixar/colocar o vídeo:
1. Tenha um vídeo em MP4 (H.264), 1920x1080, 10 a 20 segundos, sem som, até ~10 MB.
2. Renomeie para \hero.mp4\
3. Coloque em: \ssets/video/hero.mp4\ (dentro da pasta do projeto)
4. Enquanto o arquivo não existir, o site mostra a foto de alto padrão no lugar.

> O vídeo só começa a baixar depois que a página carrega (não atrasa o topo).
> Em conexões lentas ou modo economia, ele nem é baixado.

### Onde baixar vídeos gratuitos (alto padrão):
- https://www.pexels.com/pt-br/videos/ (busque: "luxury house", "modern villa aerial")
- https://pixabay.com/videos/search/luxury%20house/
- https://coverr.co/ (categoria Real Estate / Architecture)
Baixe em 1080p, corte para 15s e exporte sem áudio.

## 🛠️ Tecnologias
HTML + CSS + JS vanilla (sem build).

## 📱 Contato
Edite os dados em \js/main.js\ → objeto \CONFIG\.
