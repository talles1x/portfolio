# Portfólio — Talles Oliveira

Meu portfólio pessoal como **Front-end Developer & UI/UX Designer**, feito com **Next.js, TypeScript e Tailwind CSS**.

![Prévia do portfólio](docs/preview.jpg)

## Destaques

- **App Router do Next.js** com a página gerada de forma estática (SSG)
- **Conteúdo tipado** em `lib/data.ts`: experiências, projetos e stack ficam separados dos componentes, então atualizar o portfólio é só editar um arquivo
- **Componentes reutilizáveis** (`Header`, `Section`, `ProjectCard`)
- **Responsivo e acessível**: HTML semântico, foco visível no teclado e contraste alto
- **SEO**: metadados e Open Graph configurados no layout

## Tecnologias

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · ESLint

## Como rodar

```bash
git clone https://github.com/talles1x/portfolio.git
cd portfolio
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura

```
app/
├── layout.tsx      # fontes, metadados e SEO
├── page.tsx        # seções da página
└── globals.css     # tema (cores e tipografia)
components/
├── Header.tsx
├── Section.tsx
└── ProjectCard.tsx
lib/
└── data.ts         # conteúdo tipado do portfólio
```
