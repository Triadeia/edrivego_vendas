# edrivego_vendas

Landing page de **vendas** da eDrive Go — aluguel de BYD Dolphin 0km para motoristas de app.

- Página estática (`index.html`, auto-contida) derivada da landing original.
- Locação: **R$ 1.500 / semana**, com pagamento antecipado em **1x no cartão ou Pix**.
- Caução: **R$ 2.000**, em até **4x no cartão**, separada do aluguel semanal.
- Todos os CTAs abrem o **grupo de vendas no WhatsApp**.
- Sem pré-reserva, formulário ou lista de espera; atendimento pelo WhatsApp.

## Deploy (Vercel)

Site estático. A Vercel serve `index.html` na raiz automaticamente — sem build.
`vercel.json` define os headers de segurança e as rotas das páginas do Instagram.

## Links do Instagram

- [@edrivego.br](https://edrivego.com/ig-ego): download do GO APP e links para `/dolphin` e `/mg4`.
- [@goapp.br](https://edrivego.com/ig-go): aplicativo e grupo de cupons.

As páginas são `ig-ego.html` e `ig-go.html`, com logo em `ig-assets/`. A página `ig-go` continua usando `ig-assets/styles.css`.

A árvore `ig-ego` usa fundo preto, imagem do aplicativo fornecida pelo cliente e vídeos dos carros com máscara preta e texto HTML. Seus estilos críticos são inline, sem fontes externas ou framework. As mídias ficam em `ig-assets/ego/`, com nomes versionados: imagem WebP e trechos de 8 segundos extraídos dos vídeos das páginas Dolphin e MG4, em H.264 720 × 270, sem áudio e com início rápido. Os vídeos carregam depois das imagens, apenas quando visíveis; pausam fora da tela e em abas ocultas. Preferências de movimento reduzido, economia de dados e conexão 2G mantêm as capas estáticas. O visitante também pode pausar os vídeos pelo controle da página.

## MG4 Comfort

- Página independente: `/mg4`; central de ajuda: `/mg4/sac`.
- Semana antecipada: **R$ 1.800**, em **1x no cartão ou Pix**.
- Caução: **R$ 3.000**, em até **4x no cartão ou à vista no Pix**.
- **5 recargas gratuitas por semana**; nos outros 2 dias, **R$ 0,89/kWh**.
- Vídeos da capa do [site oficial da MG](https://mgmotoroficial.com.br/model/mg4), convertidos integralmente para H.264, sem áudio e com início rápido: versão horizontal para computador (60 s) e vertical para celular (30 s), em `mg4/assets/`.
- Vídeos de origem: [horizontal](https://www.youtube.com/watch?v=31cMP5V0hZk) e [vertical](https://www.youtube.com/watch?v=bigJjKlPDh8).
- Imagens e dados do modelo: [MG Motor Brasil](https://mgmotoroficial.com.br/model/mg4).
- A calculadora usa a tarifa de energia paga e não desconta as recargas gratuitas, aluguel ou caução.
- A página inicial mantém as condições do BYD Dolphin.

## BYD Dolphin

A página `/dolphin` duplica a oferta atual do BYD da página inicial, com os mesmos textos, vídeo, imagens, preços e botões do WhatsApp. Possui URL canônica própria e compartilha os arquivos de imagem em `/assets/`.
