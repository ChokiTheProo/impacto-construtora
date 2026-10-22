# Impacto Construtora — Site

Site institucional da **Impacto Construtora** — casas Minha Casa Minha Vida em Pirajuí/SP.
Publicado pelo GitHub Pages: https://chokitheproo.github.io/impacto-construtora/

## Páginas

| Arquivo | Página |
| --- | --- |
| `index.html` | Início (vídeo de capa, modelos em destaque, serviços, depoimentos) |
| `servicos.html` | Serviços, obras e garantia |
| `modelos.html` | Modelos de casas em grade, com filtro (2 quartos, 3 quartos, com suíte) |
| `modelo-casa-ipe.html`, `modelo-casa-jatoba.html`, `modelo-casa-aroeira.html` | Página de cada modelo: visão geral, ficha, fotos e destaques |
| `como-funciona.html` | Passo a passo e faixas do programa |
| `sobre.html` | Sobre a empresa, números, depoimentos e garantia |
| `duvidas.html` | Perguntas frequentes |
| `simular.html` | Formulário de simulação (envia pelo WhatsApp) |

O cabeçalho e o rodapé se repetem em todas as páginas: ao mudar um link do menu
ou um dado do rodapé, mude em todos os arquivos `.html`.

## Vídeo e foto da capa
Ficam em `assets/video/` — veja `assets/video/LEIA-ME.txt` para trocar.

## Ícone do site (favicon)
`favicon.svg` e `favicon.ico` (aba do navegador), `assets/apple-touch-icon.png` (iPhone),
`assets/icon-192.png` e `assets/icon-512.png` (Android, listados em `site.webmanifest`).
Todos têm o mesmo desenho: a casa branca do logo sobre o vermelho da marca (#D00D12).

## Dados da empresa
WhatsApp, telefone e redes sociais: `js/main.js` → objeto `CONFIG`.

## Ainda são exemplos
Depoimentos, números ("+300 casas", "10 anos"), dados dos modelos e fotos (Unsplash)
precisam ser trocados pelos reais.

## Atualizar o cache
Ao mudar `css/style.css` ou `js/main.js`, aumente o `?v=` nos links de todas as páginas.

## Tecnologias
HTML + CSS + JS puro (sem build). Fontes hospedadas em `assets/fonts/`.
