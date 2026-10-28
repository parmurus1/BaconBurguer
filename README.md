# Bacon Burguer · site vitrine

Site estático (HTML + CSS + JS, sem build) da Bacon Burguer Hamburgueria, Jardim Vergueiro, São Paulo.
Todo pedido é feito fora do site: **Saipos** (https://baconburguer.saipos.com/home) ou **Keeta**.

## Rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Publicar

Funciona como está em GitHub Pages, Netlify ou Vercel: é só apontar para a raiz do repositório.

## Estrutura

```
index.html             página única (cardápio, a casa, onde fica)
favicon.svg
assets/css/style.css   visual "cartaz de letrista"
assets/js/main.js      placa ABERTO/FECHADO, cartazes colando, barra de pedido no celular
assets/fonts/          Alfa Slab One, Permanent Marker, Archivo (auto-hospedadas)
assets/img/            fotos dos lanches e da casa, porco.svg
```

## Como editar

- **Preços e lanches:** em `index.html`, cada lanche é um `<li class="cartaz oferta">` dentro de `#cardapio`. O preço fica em `.preco__int` (reais) e `.preco__cent` (centavos). Atualize também o `aria-label` do preço.
- **Horário:** mude no `index.html` (lista `#onde`), no `HORARIO` em `assets/js/main.js` (é o que liga a placa ABERTO/FECHADO) e no JSON-LD no `<head>`.
- **Links de pedido:** procure por `saipos.com` e `mykeeta.com` no `index.html`.

## Pendências (trocar quando chegar o material)

- [ ] Logo oficial do porco: `assets/img/porco.svg`, o `<symbol id="pig">` no `index.html` e o `favicon.svg` são um redesenho provisório a partir do adesivo.
- [ ] Bebidas além do shake (refri, suco etc.), se quiserem destacar.
- [ ] Fotos dos lanches em alta resolução (as atuais têm 700px de largura e ficam um pouco moles em celular com tela retina). Com os originais, gerar versões de 1400px e usar `srcset`.
- [ ] Mais fotos da casa e da fachada.
