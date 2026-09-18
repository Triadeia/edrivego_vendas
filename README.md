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

As páginas são `ig-ego.html` e `ig-go.html`, com estilos críticos inline e mídias versionadas em `ig-assets/`.

A árvore `ig-ego` usa fundo preto, imagem do aplicativo fornecida pelo cliente e vídeos dos carros com máscara preta e texto HTML. Seus estilos críticos são inline, sem fontes externas ou framework. As mídias ficam em `ig-assets/ego/`, com nomes versionados: imagem WebP e trechos de 8 segundos extraídos dos vídeos das páginas Dolphin e MG4, em H.264 720 × 270, sem áudio e com início rápido. Os vídeos carregam depois das imagens, apenas quando visíveis; pausam fora da tela e em abas ocultas. Preferências de movimento reduzido, economia de dados e conexão 2G mantêm as capas estáticas. A página não exibe controle de pausa. A borda roxa de 1,5 px tem luz em movimento; um cursor decorativo com profundidade percorre os três cartões em ciclos de 14 segundos, sincronizado com zoom suave de 2,5%. O cursor não intercepta cliques. A demonstração pausa durante interação por mouse ou teclado e quando sai da tela. Esses efeitos também respeitam movimento reduzido e economia de dados. O comportamento está em `ig-assets/ego/experience-v2.js`; os nomes versionados evitam conteúdo antigo no cache.

## GO App

A página `/ig-go` usa a mesma estrutura visual da árvore eDrive GO: fundo preto, logo branca GO fornecida pelo cliente, perfil `@goapp.br`, bordas roxas com luz em movimento e cursor com profundidade. O cursor percorre os dois cartões em ciclos de 12 segundos, com zoom de 2,5% sincronizado.

- Primeiro cartão: arte de download fornecida pelo cliente, link de passageiros `https://aqr.la/go_p`.
- Segundo cartão: arte de primeira viagem grátis fornecida pelo cliente, mantendo o grupo de cupons original do WhatsApp.
- Imagens WebP responsivas de 720 e 1200 px em `ig-assets/go/`; logo SVG original. Os textos das artes foram preservados, com descrições acessíveis nos links.
- Animações sem bibliotecas, pausadas fora da tela/aba oculta e desativadas para movimento reduzido, economia de dados ou conexão 2G. Os efeitos não interceptam cliques.
- Cache imutável dos assets versionados, sem alterações na página `/ig-ego`.

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

## Cadastro MG4 Comfort

A página `/mg4-forms` duplica `/mg4`, preservando vídeos, imagens, condições comerciais e calculadora. Seus quatro CTAs de locação exibem **QUERO ALUGAR MEU MG4** e levam a `https://forms.gle/QBCDY3Up9GVc984x5`, com a orientação de cadastro abaixo de cada botão. Os textos do fluxo de locação foram adaptados para o formulário, e a página tem URL canônica própria. A rota é servida por `mg4-forms/index.html`, sem necessidade de rewrite. A página original `/mg4` continua com seu fluxo de atendimento anterior.

## BYD Dolphin

A página `/dolphin` duplica a oferta atual do BYD da página inicial, com os mesmos textos, vídeo, imagens, preços e botões do WhatsApp. Possui URL canônica própria e compartilha os arquivos de imagem em `/assets/`.

## Links para aluguel

A página `/app-alugar` duplica a estrutura de `/ig-ego` e apresenta somente os dois cartões de locação: BYD Dolphin GS (`/dolphin`) e MG4 Comfort (`/mg4`). Mantém a logo, o perfil `@edrivego.br`, os vídeos otimizados, as bordas com luz roxa e o cursor com zoom suave. O download do aplicativo não aparece nesta página.

Os vídeos e capas são compartilhados com a página original, que permanece intacta. A animação é adaptada para dois cartões em ciclos de 12 segundos, com JavaScript versionado em `ig-assets/ego/rental-v1.js`. A rota está definida em `vercel.json`; título, descrição e URL canônica são próprios.
