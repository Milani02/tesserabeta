export type PropertyCategory =
  | "residencial"
  | "lancamento"
  | "comercial"
  | "industrial"
  | "rural";

export interface PropertyStat {
  label: string;
  value: string;
}

export interface Property {
  code: string;
  title: string;
  category: PropertyCategory;
  location: string;
  city: string;
  price: string;
  pricePrefix?: string;
  priceNote: string;
  stats: PropertyStat[];
  highlights: string[];
  description: string;
  cover: string;
}

export const categories: {
  id: PropertyCategory | "todos";
  label: string;
  description: string;
  hook?: string;
  image?: string;
}[] = [
  {
    id: "todos",
    label: "Todos",
    description: "O portfólio completo, sem filtro.",
  },
  {
    id: "residencial",
    label: "Alto padrão",
    description: "Mansões e casas de assinatura em condomínios fechados.",
    hook: "Endereços que viram sobrenome.",
    image: "/mansoes/mansao-01-terraco-entardecer.jpg",
  },
  {
    id: "lancamento",
    label: "Lançamentos",
    description: "Empreendimentos na planta e em construção, com condições de lançamento.",
    hook: "Compre antes da fundação.",
    image: "/mansoes/mansao-14-notting-hill.jpg",
  },
  {
    id: "comercial",
    label: "Comercial",
    description: "Lojas, salas e pontos comerciais para operação ou investimento.",
    hook: "Onde o seu negócio ganha vitrine.",
    image: "/mansoes/mansao-12-loja-centro.jpg",
  },
  {
    id: "industrial",
    label: "Industrial",
    description: "Galpões e barracões com acesso facilitado para operação logística.",
    hook: "Estrutura pronta para operar.",
    image: "/mansoes/mansao-13-galpao-ibipora.jpg",
  },
  {
    id: "rural",
    label: "Rural",
    description: "Fazendas, sítios e chácaras produtivas ou de lazer.",
    hook: "Terra que produz e valoriza.",
    image: "/mansoes/mansao-11-fazenda-tibagi.jpg",
  },
];

export const properties: Property[] = [
  {
    code: "CA0206-TFZA",
    title: "Residência de esquina com terraço e solarium",
    category: "residencial",
    location: "Royal Boulevard Residence & Resort",
    city: "Ibiporã/PR",
    price: "R$ 3.500.000",
    priceNote: "R$ 8.149/m² · cond. R$ 700/mês",
    stats: [
      { label: "Área const.", value: "429 m²" },
      { label: "Suítes", value: "4" },
      { label: "Banheiros", value: "6" },
    ],
    highlights: [
      "Suíte master com hidromassagem",
      "Piscina aquecida com hidromassagem e sauna",
      "Cozinha gourmet com churrasqueira automatizada",
      "Terraço de 100 m² com solarium",
      "Energia fotovoltaica e elevador",
    ],
    description:
      "Casa de esquina no Royal Boulevard Residence & Resort, com acabamentos de alto padrão do térreo ao terraço. O programa reúne quatro suítes — a master com hidromassagem —, cozinha gourmet com churrasqueira automatizada e uma área de lazer completa: piscina aquecida, hidromassagem, sauna e um terraço de 100 m² com solarium para aproveitar a vista do condomínio.",
    cover: "/mansoes/mansao-01-terraco-entardecer.jpg",
  },
  {
    code: "CA0207-TFZA",
    title: "Sobrado com pé-direito de 4,5 m e rooftop",
    category: "residencial",
    location: "Royal Boulevard Residence & Resort",
    city: "Ibiporã/PR",
    price: "R$ 2.650.000",
    priceNote: "R$ 8.520/m² · cond. R$ 700/mês",
    stats: [
      { label: "Área const.", value: "311 m²" },
      { label: "Suítes", value: "3" },
      { label: "Banheiros", value: "5" },
    ],
    highlights: [
      "Arquitetura imponente com ambientes integrados",
      "Pé-direito de 4,50 m no pavimento superior",
      "Cozinha e sala de jantar gourmet",
      "Sauna, solarium e piscina com vista panorâmica",
      "Duas suítes com sacada privativa",
    ],
    description:
      "Sobrado no Royal Boulevard Residence & Resort com pé-direito de 4,5 m no pavimento superior, reforçando a sensação de amplitude dos ambientes integrados. As três suítes incluem duas com sacada privativa, e a área de lazer soma sauna, solarium e piscina com vista panorâmica sobre o condomínio.",
    cover: "/mansoes/mansao-09-piscina-vista.jpg",
  },
  {
    code: "CA0169-TFZA",
    title: "Casa térrea em condomínio fechado",
    category: "residencial",
    location: "Condomínio Village Premium",
    city: "Londrina/PR",
    price: "R$ 2.500.000",
    priceNote: "R$ 10.000/m² · cond. sob consulta",
    stats: [
      { label: "Área const.", value: "250 m²" },
      { label: "Suítes", value: "3" },
      { label: "Banheiros", value: "3" },
    ],
    highlights: [
      "Piscina e área gourmet com churrasqueira",
      "Energia solar e cisterna de captação de água",
      "Garagem coberta para 3 veículos",
      "A poucos minutos da Gleba Palhano e do Catuaí Shopping",
    ],
    description:
      "Casa térrea no Condomínio Village Premium, projetada para o dia a dia em família: cozinha espaçosa integrada a duas salas, área gourmet com piscina e churrasqueira, e garagem coberta para três veículos. O sistema de energia solar e a cisterna de captação de água reduzem os custos fixos, e a localização coloca a faculdade e o Catuaí Shopping a poucos minutos de distância.",
    cover: "/mansoes/mansao-06-piscina-living.jpg",
  },
  {
    code: "25401932-TFZA",
    title: "Notting Hill — torre única com 4 unidades por andar",
    category: "lancamento",
    location: "Gleba Palhano, Alto da Gleba",
    city: "Londrina/PR",
    price: "R$ 1.475.000",
    pricePrefix: "A partir de",
    priceNote: "134 m² úteis · 225 m² privativos",
    stats: [
      { label: "Quartos", value: "3" },
      { label: "Suítes", value: "3" },
      { label: "Andares", value: "23" },
    ],
    highlights: [
      "Projeto de Celso Akira, interiores de Chris Brasil",
      "Apenas 4 unidades por andar, hall privativo",
      "4 elevadores — 2 sociais, 1 serviço, 1 emergência",
      "Infraestrutura para carregamento de veículo elétrico",
    ],
    description:
      "Lançamento inspirado na arquitetura residencial londrina, o Notting Hill ocupa um terreno de 2.914 m² na Alto da Gleba com uma única torre de 23 andares e apenas 4 unidades por pavimento. A arquitetura é assinada por Celso Akira, os interiores por Chris Brasil e o paisagismo por Ivan Pona (IO Paisagismo). Circulação social e de serviço são separadas, com 4 elevadores no total, e todas as plantas trazem 3 suítes.",
    cover: "/mansoes/mansao-14-notting-hill.jpg",
  },
  {
    code: "LO0047-TFZA",
    title: "Loja de esquina com mezanino, no coração do Centro",
    category: "comercial",
    location: "Rua Pernambuco, Centro",
    city: "Londrina/PR",
    price: "R$ 3.000.000",
    priceNote: "R$ 11.538/m² · 19 m de testada",
    stats: [
      { label: "Área útil", value: "260 m²" },
      { label: "Área total", value: "290 m²" },
      { label: "Banheiros", value: "4" },
    ],
    highlights: [
      "Mezanino interno e pé-direito duplo",
      "6 vagas de garagem descobertas",
      "Grande fluxo de pessoas e veículos na região central",
      "Estrutura versátil para diferentes segmentos de negócio",
    ],
    description:
      "Loja de esquina com 19 metros de testada no coração do Centro de Londrina, com pé-direito duplo e mezanino interno que multiplicam as possibilidades de layout. São quatro ambientes de 65 m² cada, recepção, copa e escritório, além de 6 vagas de garagem descobertas — uma oportunidade tanto para instalar um negócio próprio quanto para investir em uma região de alto fluxo.",
    cover: "/mansoes/mansao-12-loja-centro.jpg",
  },
  {
    code: "GA0002-TFZA",
    title: "Galpão logístico com acesso para caminhões, na BR-369",
    category: "industrial",
    location: "Parque San Rafael, BR-369",
    city: "Ibiporã/PR",
    price: "R$ 8.000",
    priceNote: "aluguel mensal · terreno de 890 m²",
    stats: [
      { label: "Área const.", value: "300 m²" },
      { label: "Terreno", value: "890 m²" },
      { label: "Acesso", value: "Caminhão" },
    ],
    highlights: [
      "Entrada facilitada para veículos de carga",
      "Recepção, escritórios e depósito segregados",
      "Cozinha, vestiário e instalação de gás com laudo do corpo de bombeiros",
      "Frente para a rodovia BR-369",
    ],
    description:
      "Galpão para locação com frente para a BR-369, no Parque San Rafael em Ibiporã. O terreno de 890 m² comporta entrada facilitada para caminhões, recepção e escritórios administrativos separados da área de armazenagem, além de cozinha, vestiário e instalação de gás já com laudo do corpo de bombeiros — pronto para operação logística ou industrial de médio porte.",
    cover: "/mansoes/mansao-13-galpao-ibipora.jpg",
  },
  {
    code: "FA0129-TFZA",
    title: "Fazenda beira de pista, a 3 km do centro de Tibagi",
    category: "rural",
    location: "Zona Rural",
    city: "Tibagi/PR",
    price: "R$ 32.000.000",
    priceNote: "R$ 310 mil/alqueire · 250,4 hectares",
    stats: [
      { label: "Área total", value: "103,5 alq." },
      { label: "Lavoura", value: "58 alq." },
      { label: "Pastagem", value: "15 alq." },
    ],
    highlights: [
      "Sede, casa de colono, barracão e mangueira para gado",
      "Altitude de 800 m, a 3 km da cidade e junto à rodovia",
      "Água e energia elétrica na propriedade",
      "Proximidade com as cooperativas Batavo e Coamo",
    ],
    description:
      "Fazenda de 103,5 alqueires (250,4 hectares) às margens de rodovia, a apenas 3 km do centro de Tibagi e a 800 m de altitude. Da área total, 58 alqueires já estão em lavoura — com potencial de expansão para 63 — e 15 alqueires são de pastagem, complementados por reserva e mata nativa. A infraestrutura inclui casa sede, casa de colono, barracão e mangueira para o gado, com água e energia elétrica disponíveis e proximidade às cooperativas Batavo e Coamo.",
    cover: "/mansoes/mansao-11-fazenda-tibagi.jpg",
  },
];
