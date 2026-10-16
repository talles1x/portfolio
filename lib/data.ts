export type Link = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  team: "Individual" | "Em equipe" | "Cliente";
  links: Link[];
  note?: string;
};

export type Experience = {
  role: string;
  company: string;
  context: string;
  items: string[];
};

export const profile = {
  name: "Talles Oliveira",
  role: "Front-end Developer & UI/UX Designer",
  tagline: "Do protótipo no Figma ao código em produção.",
  location: "Monteiro – PB",
  about:
    "Desenvolvo interfaces pensando primeiro em quem vai usar. Começo no Figma, com wireframes e protótipos navegáveis guiados por Leis de UX e Gestalt, e levo o design até o código com React, Next.js e TypeScript.",
  links: {
    github: "https://github.com/talles1x",
    linkedin: "https://www.linkedin.com/in/talles-oliveira-trs/",
  },
};

export const experiences: Experience[] = [
  {
    role: "Desenvolvedor de Sistemas",
    company: "SuperNet",
    context: "Provedor de internet",
    items: [
      "Sistemas internos para a operação da empresa",
      "Sites e landing pages institucionais",
      "Bot de WhatsApp para autoatendimento financeiro integrado ao SGP",
      "Suporte e infraestrutura de TI",
    ],
  },
  {
    role: "Desenvolvedor Front-end (freelance)",
    company: "Baby Piscinas",
    context: "Landing page",
    items: [
      "Do protótipo no Figma ao código em React + TypeScript",
      "SEO, eventos de conversão no GA4 e WhatsApp com mensagem pronta",
      "Otimização de imagens e cabeçalhos de segurança",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Baby Piscinas",
    summary: "Landing page de vendas desenhada no Figma e levada para produção.",
    highlights: [
      "Formulário de orçamento e botão de WhatsApp com mensagem pronta",
      "SEO com dados estruturados e prévia de compartilhamento",
      "Eventos de conversão no GA4 e carregamento sob demanda de imagens",
    ],
    stack: ["React", "TypeScript", "Vite", "Figma", "Vercel"],
    team: "Cliente",
    links: [],
    note: "Código privado do cliente",
  },
  {
    title: "Heavy",
    summary: "E-commerce de moda com vitrine, página de produto e login.",
    highlights: [
      "Rotas dinâmicas com React Router (/produto/:id)",
      "Usuário logado em estado global com Context API",
      "Header responsivo com hook próprio (useMedia)",
    ],
    stack: ["React", "React Router", "Context API", "CSS"],
    team: "Em equipe",
    links: [{ label: "Código", href: "https://github.com/talles1x/Ecommerce-Heavy" }],
  },
  {
    title: "Travan",
    summary: "Aplicativo mobile desenvolvido em equipe na faculdade.",
    highlights: ["Telas mobile em React Native", "Tipagem com TypeScript"],
    stack: ["React Native", "TypeScript"],
    team: "Em equipe",
    links: [
      { label: "Código", href: "https://github.com/Batissta/travan-react-native" },
    ],
  },
  {
    title: "Marketplace",
    summary: "Projeto universitário fullstack de marketplace.",
    highlights: ["Front-end em React", "API em Node.js"],
    stack: ["React", "Node.js", "HTML", "CSS"],
    team: "Em equipe",
    links: [
      { label: "Front-end", href: "https://github.com/Batissta/marketplace" },
      { label: "API", href: "https://github.com/lealgabryell/MarketplaceBackEnd" },
    ],
  },
  {
    title: "Simulador de Alocação de Memória",
    summary: "Compara First, Next, Best e Worst Fit em 100 simulações por algoritmo.",
    highlights: [
      "Memória modelada como lista duplamente encadeada",
      "Divisão e fusão de blocos para reduzir fragmentação",
    ],
    stack: ["JavaScript", "Node.js"],
    team: "Individual",
    links: [
      { label: "Código", href: "https://github.com/talles1x/ProjetoRobertaAlgoritimos" },
    ],
  },
  {
    title: "Caminhos do Frio",
    summary: "Redesign do site Caminhos do Frio.",
    highlights: ["Nova interface do site", "Trabalho colaborativo com Git"],
    stack: ["HTML", "CSS", "Git"],
    team: "Em equipe",
    links: [
      { label: "Código", href: "https://github.com/Tech-Priest1/Caminhos-do-Frio" },
    ],
  },
];

export const stack = {
  "Front-end": ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  Mobile: ["React Native"],
  Design: ["Figma", "Prototipagem", "UI Design", "Leis de UX", "Gestalt"],
  Ferramentas: ["Git", "GitHub", "Node.js", "Vercel", "VS Code"],
};

export const education = {
  course: "Bacharelado em Sistemas de Informação",
  school: "UNIFACISA",
  period: "2023 – 2027",
};
