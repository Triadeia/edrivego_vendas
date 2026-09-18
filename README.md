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

- [@edrivego.br](https://edrivego.com/ig-ego): aplicativo e grupo sobre aluguel de carro.
- [@goapp.br](https://edrivego.com/ig-go): aplicativo e grupo de cupons.

As páginas são `ig-ego.html` e `ig-go.html`. Logo e estilos compartilhados ficam em `ig-assets/`. Os dois botões aumentam e diminuem suavemente em ciclos de 4,5 segundos, junto com o brilho e o contorno. A animação respeita a preferência por movimento reduzido. A URL do CSS leva uma versão para renovar o cache após mudanças visuais.
