export interface CourseSection {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  duration: string;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  level: string;
  description: string;
  price: string;
  duration: string;
  material: string[];
  techniques: string[];
  tags: string[];
  image: string;
  longDescription: string;
  sections: CourseSection[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Iniciación al Tatuaje",
    slug: "iniciacion-al-tatuaje",
    level: "Principiante",
    description: "Todo lo que necesitas saber antes de coger una máquina. Higiene, materiales y diseño básico.",
    price: "197€",
    duration: "4 Semanas",
    material: ["Máquina de bobinas básica o rotativa", "Piel sintética de práctica", "Agujas de línea (3RL, 5RL)", "Tinta negra de práctica", "Vaselina y depresores", "Papel hectográfico"],
    techniques: ["Montaje y calibrado de máquina", "Higiene y seguridad (Cross-contamination)", "Técnica de línea limpia", "Relleno sólido básico", "Curación del tatuaje"],
    tags: ["Teoría", "Higiene", "Línea"],
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop",
    longDescription: "Este curso está diseñado para aquellos que nunca han tocado una máquina de tatuar o están en sus primeros pasos.",
    sections: [
      {
        id: "iniciacion-1",
        title: "Bienvenida e Introducción",
        description: "Presentación del curso, objetivos y lo que aprenderás. Conoce la historia del tatuaje y su evolución hasta hoy.",
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop",
        duration: "15 min"
      },
      {
        id: "iniciacion-2",
        title: "Higiene y Seguridad",
        description: "La parte más importante: cómo montar una mesa estéril, cross-contamination, uso de guantes, plásticos protectores y gestión de residuos biológicos.",
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2830&auto=format&fit=crop",
        duration: "30 min"
      },
      {
        id: "iniciacion-3",
        title: "El Equipo: Máquinas y Agujas",
        description: "Diferencias entre bobinas y rotativas. Tipos de agujas (RL, RS, M1, RM) y para qué sirve cada una. Cómo montar y calibrar correctamente.",
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2865&auto=format&fit=crop",
        duration: "45 min"
      },
      {
        id: "iniciacion-4",
        title: "Técnica de Línea Limpia",
        description: "Cómo coger la máquina, velocidad de paso, tensión de la piel y práctica sobre piel sintética para conseguir líneas sólidas y uniformes.",
        imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
        duration: "60 min"
      },
      {
        id: "iniciacion-5",
        title: "Relleno Sólido y Curación",
        description: "Técnica de relleno por pasadas, evitar el sobretatuado, y cómo cuidar correctamente el tatuaje durante su cicatrización.",
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop",
        duration: "45 min"
      }
    ]
  },
  {
    id: 2,
    title: "Técnicas de Sombreado",
    slug: "tecnicas-de-sombreado",
    level: "Intermedio",
    description: "Domina el Black & Grey. Aprende a crear volúmenes, texturas y transiciones suaves.",
    price: "247€",
    duration: "6 Semanas",
    material: ["Máquina rotativa o tipo Pen", "Set de tintas (Greywash)", "Diluyente (Mixing solution)", "Agujas Magnum (7M, 9M) y RM", "Piel sintética de alta calidad"],
    techniques: ["Black & Grey", "Whip Shading (Puntillismo de arrastre)", "Degradados suaves", "Volumetría y luz", "Uso correcto de diluyentes"],
    tags: ["Black & Grey", "Texturas", "Sombreado"],
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop",
    longDescription: "Si ya dominas la línea, es hora de dar vida a tus diseños con el sombreado en Black & Grey.",
    sections: [
      {
        id: "sombreado-1",
        title: "Introducción al Black & Grey",
        description: "Qué es el Black & Grey, historia, referentes del estilo y por qué es la base de todo buen tatuador.",
        imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop",
        duration: "20 min"
      },
      {
        id: "sombreado-2",
        title: "Diluyentes y Gamas de Grises",
        description: "Cómo preparar tu paleta de greywash: agua destilada vs. diluyentes comerciales. Escalas de grises del 10% al 100% de negro.",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop",
        duration: "30 min"
      },
      {
        id: "sombreado-3",
        title: "Agujas Planas y Magnum",
        description: "Uso de curvas magnums (CM), flat magnums y soft edge. Cómo afectan al resultado final y cuándo usar cada configuración.",
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2865&auto=format&fit=crop",
        duration: "35 min"
      },
      {
        id: "sombreado-4",
        title: "Whip Shading",
        description: "La técnica de arrastre o puntillismo de arrastre para crear transiciones naturales y texturas suaves. Práctica intensiva.",
        imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
        duration: "60 min"
      },
      {
        id: "sombreado-5",
        title: "Volumetría y Luz",
        description: "Cómo leer la luz de una referencia, dónde colocar los puntos de luz más brillantes y cómo construir el volumen de una figura.",
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop",
        duration: "50 min"
      },
      {
        id: "sombreado-6",
        title: "Proyecto Final: Pieza Completa",
        description: "Aplicación de todas las técnicas en una pieza de sombreado completa sobre piel sintética, con feedback y correcciones.",
        imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop",
        duration: "90 min"
      }
    ]
  },
  {
    id: 3,
    title: "Realismo Avanzado",
    slug: "realismo-avanzado",
    level: "Avanzado",
    description: "Lleva tu arte al siguiente nivel. Retratos, detalles hiperrealistas y composición compleja.",
    price: "397€",
    duration: "8 Semanas",
    material: ["Máquina Pen de alta precisión", "Set profesional de tintas (Opaque Greys)", "Agujas de cartucho de alta gama (Soft Edge)", "Papel de calco de alta definición", "Impresora térmica (recomendado)"],
    techniques: ["Retrato realista", "Texturas complejas (pelo, piel, metal)", "Mapeo de sombras y luces", "Alto contraste", "Software de edición para stencil"],
    tags: ["Realismo", "Retratos", "Avanzado"],
    image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
    longDescription: "El curso definitivo para tatuadores que buscan la excelencia en el realismo.",
    sections: [
      {
        id: "realismo-1",
        title: "Fundamentos del Realismo",
        description: "Qué diferencia al realismo de otros estilos. Referencias fotográficas, análisis de luz y composición avanzada.",
        imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
        duration: "25 min"
      },
      {
        id: "realismo-2",
        title: "Preparación del Diseño",
        description: "Cómo seleccionar y editar una fotografía de referencia, contraste, niveles y conversión a stencil con software profesional.",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop",
        duration: "40 min"
      },
      {
        id: "realismo-3",
        title: "Textura de Piel y Poros",
        description: "Técnica específica para replicar la textura de la piel humana, poros, arrugas y cicatrices de forma hiperrealista.",
        imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop",
        duration: "55 min"
      },
      {
        id: "realismo-4",
        title: "Textura de Pelo y Animales",
        description: "Stroke by stroke: cómo tatuar pelo de forma individual para conseguir naturalidad. Aplicado a retratos de animales y humanos.",
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop",
        duration: "70 min"
      },
      {
        id: "realismo-5",
        title: "Retrato: Los Ojos",
        description: "Los ojos son el alma de un retrato. Técnica detallada para iris, pupila, reflejo de luz y párpados con acabado hiperrealista.",
        imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
        duration: "80 min"
      },
      {
        id: "realismo-6",
        title: "Alto Contraste y Durabilidad",
        description: "Cómo garantizar que el tatuaje perdure en el tiempo con negro opaco en sombras profundas y blancos limpios en los puntos de luz.",
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2865&auto=format&fit=crop",
        duration: "45 min"
      },
      {
        id: "realismo-7",
        title: "Composición Compleja",
        description: "Cómo abordar una pieza de gran formato con múltiples elementos. Jerarquía visual, flujo de la composición y uso del espacio negativo.",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop",
        duration: "60 min"
      },
      {
        id: "realismo-8",
        title: "Proyecto Final: Retrato Completo",
        description: "Desarrollo de un retrato realista completo desde cero, con revisiones en cada etapa y feedback personalizado.",
        imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
        duration: "120 min"
      }
    ]
  }
];
