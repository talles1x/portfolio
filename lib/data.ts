export type Link = {
  label: string;
  href: string;
};

export type Category = "Web" | "Mobile" | "Design" | "Algoritmos";

export type Project = {
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  team: "Individual" | "Em equipe" | "Cliente";
  categories: Category[];
  links: Link[];
  note?: string;
};

export type Experience = {
  role: string;
  company: string;
  context: string;
  items: string[];
};

export type UxLaw = {
  name: string;
  rule: string;
  applied: string;
  /** id do elemento da página onde a lei foi aplicada */
  target: string;
  /** alternativa quando o alvo não aparece na tela (ex.: celular) */
  fallback?: string;
};

export const profile = {
  name: "Talles Oliveira",
  role: "Front-end Developer & UI/UX Designer",
  location: "Monteiro – PB, Brasil",
  about: [
    "Desenvolvo interfaces pensando primeiro em quem vai usar. Começo no Figma, com wireframes e protótipos navegáveis guiados por Leis de UX e Gestalt, e levo o design até o código com React, Next.js e TypeScript.",
    "Hoje trabalho como Desenvolvedor de Sistemas na SuperNet e atendo clientes como freelancer, cuidando da interface do primeiro rascunho até o deploy.",
  ],
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
    role: "Desenvolvedor Front-end",
    company: "Baby Piscinas",
    context: "Freelance · Landing page",
    items: [
      "Do protótipo no Figma ao código em React + TypeScript",
      "SEO, eventos de conversão no GA4 e WhatsApp com mensagem pronta",
      "Otimização de imagens e cabeçalhos de segurança",
    ],
  },
];

export const categories: Category[] = ["Web", "Mobile", "Design", "Algoritmos"];

export const projects: Project[] = [
  {
    title: "Baby Piscinas",
    summary: "Landing page de vendas desenhada no Figma e levada para produção.",
    highlights: [
      "Formulário de orçamento e WhatsApp com mensagem pronta",
      "SEO com dados estruturados e prévia de compartilhamento",
      "Eventos de conversão no GA4",
    ],
    stack: ["React", "TypeScript", "Vite", "Figma"],
    team: "Cliente",
    categories: ["Web", "Design"],
    links: [],
    note: "Código privado do cliente",
  },
  {
    title: "Heavy",
    summary: "E-commerce de moda com vitrine, página de produto e login.",
    highlights: [
      "Rotas dinâmicas com React Router",
      "Usuário logado em estado global (Context API)",
      "Header responsivo com hook próprio",
    ],
    stack: ["React", "React Router", "Context API", "CSS"],
    team: "Em equipe",
    categories: ["Web"],
    links: [{ label: "Código", href: "https://github.com/talles1x/Ecommerce-Heavy" }],
  },
  {
    title: "Travan",
    summary: "App de passagens de van e ônibus para empresas de transporte intermunicipal.",
    highlights: [
      "Mapa de assentos por tipo de veículo e pagamento com Pix",
      "Bilhete digital com QR code e cancelamento com reembolso",
      "Painel da operação com vendas do dia e validação de embarque",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Expo Router"],
    team: "Individual",
    categories: ["Mobile", "Design"],
    links: [{ label: "Código", href: "https://github.com/talles1x/travan" }],
    note: "v2 da versão feita em equipe",
  },
  {
    title: "Marketplace",
    summary: "Projeto universitário fullstack de marketplace.",
    highlights: ["Front-end em React", "API em Node.js"],
    stack: ["React", "Node.js", "HTML", "CSS"],
    team: "Em equipe",
    categories: ["Web"],
    links: [
      { label: "Front-end", href: "https://github.com/Batissta/marketplace" },
      { label: "API", href: "https://github.com/lealgabryell/MarketplaceBackEnd" },
    ],
  },
  {
    title: "Simulador de Memória",
    summary: "Compara First, Next, Best e Worst Fit em 100 simulações por algoritmo.",
    highlights: [
      "Memória modelada como lista duplamente encadeada",
      "Divisão e fusão de blocos contra fragmentação",
    ],
    stack: ["JavaScript", "Node.js"],
    team: "Individual",
    categories: ["Algoritmos"],
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
    categories: ["Web", "Design"],
    links: [
      { label: "Código", href: "https://github.com/Tech-Priest1/Caminhos-do-Frio" },
    ],
  },
];

export const stack: Record<string, string[]> = {
  "Front-end": ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  Mobile: ["React Native", "Expo"],
  Design: ["Figma", "Prototipagem", "UI Design", "Leis de UX", "Gestalt"],
  Ferramentas: ["Git", "GitHub", "Node.js", "Vercel"],
};

export const education = {
  course: "Bacharelado em Sistemas de Informação",
  school: "UNIFACISA",
  period: "2023 – 2027",
};

export const uxLaws: UxLaw[] = [
  {
    name: "Lei de Fitts",
    rule: "Alvos maiores e mais próximos são mais rápidos de clicar.",
    applied: "O botão principal do topo é grande e fica logo abaixo do texto.",
    target: "hero-cta",
  },
  {
    name: "Lei de Hick",
    rule: "Quanto mais opções, mais tempo para decidir.",
    applied: "Os projetos têm só cinco filtros.",
    target: "project-filters",
  },
  {
    name: "Lei de Jakob",
    rule: "Usuários preferem que o site funcione como os que já conhecem.",
    applied: "Navegação fixa no topo, com a seção atual marcada.",
    target: "site-nav",
    fallback: "menu-button",
  },
  {
    name: "Lei de Miller",
    rule: "Guardamos poucos itens de cada vez na memória.",
    applied: "A stack está dividida em quatro grupos curtos.",
    target: "stack-grid",
  },
  {
    name: "Efeito Von Restorff",
    rule: "O que é diferente do resto é lembrado.",
    applied: "Só existe uma cor de destaque: o que é roxo merece atenção.",
    target: "hero-highlight",
  },
  {
    name: "Limiar de Doherty",
    rule: "Respostas abaixo de 400 ms mantêm a pessoa engajada.",
    applied: "Cada interação, como este card de Design ↔ Código, responde na hora.",
    target: "design-code",
  },
  {
    name: "Efeito estética-usabilidade",
    rule: "Interfaces bonitas parecem mais fáceis de usar.",
    applied: "O carro 3D chama atenção, mas os controles continuam poucos, grandes e com rótulo.",
    target: "garagem-canvas",
  },
];
