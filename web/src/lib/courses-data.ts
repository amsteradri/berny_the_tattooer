export interface SectionContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'tip' | 'warning';
  text?: string;
  items?: string[];
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  videoId?: string;       // YouTube ID — TEMPORAL, solo para pruebas. Reemplazar con videoPath.
  videoPath?: string;     // Path en Supabase Storage (bucket: "course-videos"), e.g. "iniciacion/seccion-1.mp4"
  imageUrl?: string;
  duration: string;
  content?: SectionContentBlock[];
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
        videoPath: "curso-basico/video1.mp4",
        duration: "15 min",
        content: [
          {
            type: "paragraph",
            text: "Bienvenido al curso de Iniciación al Tatuaje. Este es el punto de partida de todo tatuador profesional: antes de coger una máquina, necesitas entender el oficio, su historia y el compromiso que implica trabajar con piel humana."
          },
          {
            type: "heading",
            text: "¿Qué vas a aprender en este curso?"
          },
          {
            type: "list",
            items: [
              "Los fundamentos técnicos del tatuaje: máquinas, agujas, tintas y materiales",
              "Higiene y esterilización profesional (el pilar más importante del oficio)",
              "Técnica de línea limpia y relleno sólido sobre piel sintética",
              "Cómo preparar y limpiar tu espacio de trabajo",
              "El proceso de cicatrización y los cuidados post-tatuaje"
            ]
          },
          {
            type: "heading",
            text: "Una breve historia del tatuaje"
          },
          {
            type: "paragraph",
            text: "El tatuaje es una de las formas de arte más antiguas de la humanidad. Las evidencias más antiguas datan de hace más de 5.000 años: la momia Ötzi, encontrada en los Alpes, presentaba 61 tatuajes en su cuerpo. Culturas como la polinesia, la japonesa (Irezumi) y las tribus aborígenes de todo el mundo desarrollaron lenguajes visuales complejos a través del tatuaje, cargados de simbolismo espiritual, social y de identidad."
          },
          {
            type: "paragraph",
            text: "En el mundo occidental moderno, el tatuaje vivió un renacimiento a finales del siglo XX. Lo que comenzó siendo marginal se convirtió en una forma de expresión artística mainstream. Hoy, el realismo fotográfico, el fine line, el neotradicional y el black & grey conviven como escuelas estéticas con sus propios referentes, técnicas y seguidores."
          },
          {
            type: "heading",
            text: "El compromiso del tatuador"
          },
          {
            type: "paragraph",
            text: "Tatuar no es solo dominar una técnica: es asumir la responsabilidad de trabajar con el cuerpo de otra persona. Cada trazo es permanente. Por eso, este curso pone el mismo énfasis en la técnica que en la ética profesional, la higiene y el trato con el cliente."
          },
          {
            type: "tip",
            text: "Consejo de Berny: Antes de tatuarte a ti mismo o a alguien más, practica durante semanas en piel sintética. No hay atajos en este oficio. La paciencia y la práctica constante son lo que separa a un tatuador bueno de uno memorable."
          }
        ]
      },
      {
        id: "iniciacion-2",
        title: "Higiene y Seguridad",
        description: "La parte más importante: cómo montar una mesa estéril, cross-contamination, uso de guantes, plásticos protectores y gestión de residuos biológicos.",
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2830&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "30 min",
        content: [
          {
            type: "paragraph",
            text: "La higiene no es una opción: es la base de todo. Trabajar sin los protocolos correctos puede causar infecciones graves en tus clientes, poner en riesgo tu licencia y destruir tu reputación. Aprende esto antes que cualquier técnica."
          },
          {
            type: "heading",
            text: "El concepto de cross-contamination"
          },
          {
            type: "paragraph",
            text: "La contaminación cruzada ocurre cuando microorganismos (bacterias, virus) se transfieren de una superficie contaminada a otra limpia. En el tatuaje, esto sucede cuando tocas con guantes sucios superficies limpias, reutilizas agujas o tintas, o no cubres correctamente el equipo."
          },
          {
            type: "heading",
            text: "Montaje de una mesa estéril: paso a paso"
          },
          {
            type: "list",
            items: [
              "Limpia la superficie con desinfectante hospitalario (clorhexidina o alcohol 70%)",
              "Cubre la mesa con papel desechable o film plástico",
              "Abre los cartuchos/agujas delante del cliente (demostración de esterilidad)",
              "Prepara vasos de tinta desechables — nunca reutilices tinta de un cliente a otro",
              "Ten a mano: vaselina, depresores, papel absorbente, agua destilada para limpiar"
            ]
          },
          {
            type: "heading",
            text: "Zonas a cubrir con plástico protector"
          },
          {
            type: "list",
            items: [
              "Cabezal y cuerpo de la máquina",
              "Cable RCA o inalámbrico",
              "Bote de vaselina y spray de limpieza",
              "Reposabrazos y zonas que el cliente pueda tocar",
              "Lámpara de trabajo"
            ]
          },
          {
            type: "heading",
            text: "Gestión de residuos biológicos"
          },
          {
            type: "paragraph",
            text: "Los residuos de una sesión de tatuaje son residuos biológicos peligrosos. Las agujas usadas van en contenedores sharps (rígidos, homologados). Los guantes, papel absorbente con sangre y materiales contaminados van en bolsa de basura especial (biohazard). Infórmate sobre la normativa de tu comunidad para la recogida de estos residuos."
          },
          {
            type: "warning",
            text: "Nunca reutilices agujas. Nunca. Aunque sea para el mismo cliente en la misma sesión. Las agujas de cartucho y las agujas sueltas son de un solo uso. Esto no es negociable."
          }
        ]
      },
      {
        id: "iniciacion-3",
        title: "El Equipo: Máquinas y Agujas",
        description: "Diferencias entre bobinas y rotativas. Tipos de agujas (RL, RS, M1, RM) y para qué sirve cada una. Cómo montar y calibrar correctamente.",
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2865&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "45 min",
        content: [
          {
            type: "paragraph",
            text: "Conocer tu equipo es fundamental. Una mala elección de máquina o aguja puede arruinar un diseño impecable. En esta sección aprenderás las diferencias entre los tipos de máquinas y cómo elegir la configuración correcta para cada técnica."
          },
          {
            type: "heading",
            text: "Máquinas de bobinas vs. rotativas"
          },
          {
            type: "list",
            items: [
              "Bobinas (Coil): movimiento electromagnético. Más agresivas, vibración mayor. Muy usadas para línea dura y relleno tradicional. Requieren más ajuste y mantenimiento.",
              "Rotativas (Rotary): motor eléctrico continuo. Más suaves con la piel. Ideales para sombreado y realismo. Menor fatiga en mano y brazo del artista.",
              "Tipo Pen: rotativa en formato estilográfico. Las más cómodas para sesiones largas. Cartuchos intercambiables en segundos. La opción favorita de muchos profesionales actuales."
            ]
          },
          {
            type: "heading",
            text: "Nomenclatura de agujas: qué significan los números"
          },
          {
            type: "paragraph",
            text: "Las agujas se nombran con un número (cantidad de puntas) y una letra que indica la configuración. Por ejemplo, 5RL significa 5 puntas en configuración Round Liner."
          },
          {
            type: "list",
            items: [
              "RL (Round Liner): puntas en círculo. Para línea. Cuanto mayor el número, más gruesa la línea.",
              "RS (Round Shader): igual que RL pero con puntas más separadas. Para sombreado suave.",
              "M1 / Magnum: puntas en dos filas alternas. Para sombreado en grandes superficies.",
              "RM (Round Magnum / Curved Magnum): igual que M1 pero curvada. Sigue mejor la curvatura de la piel.",
              "F (Flat): puntas en línea recta. Para relleno de color sólido y detalles geométricos."
            ]
          },
          {
            type: "heading",
            text: "Calibración de la máquina"
          },
          {
            type: "paragraph",
            text: "El voltaje ideal varía según la técnica y la máquina. Como referencia general: 5-7V para línea, 7-9V para sombreado y relleno. Empieza siempre bajo y sube según necesites. El give (profundidad de penetración de la aguja) debe ser de 1-2mm para trabajo en piel."
          },
          {
            type: "tip",
            text: "Para empezar, no necesitas la máquina más cara del mercado. Una rotativa de gama media-baja bien calibrada te permitirá aprender los fundamentos sin variables innecesarias. Invierte en agujas de calidad antes que en una máquina de alta gama."
          }
        ]
      },
      {
        id: "iniciacion-4",
        title: "Técnica de Línea Limpia",
        description: "Cómo coger la máquina, velocidad de paso, tensión de la piel y práctica sobre piel sintética para conseguir líneas sólidas y uniformes.",
        imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "60 min",
        content: [
          {
            type: "paragraph",
            text: "La línea es el alfabeto del tatuaje. Todo lo demás — el sombreado, el color, el realismo — se construye sobre una línea sólida. Si tu línea tiembla o se rompe, el tatuaje se verá amateur independientemente de todo lo demás."
          },
          {
            type: "heading",
            text: "Agarre y postura correcta"
          },
          {
            type: "paragraph",
            text: "Sostén la máquina como si fuera un lápiz, con el dedo corazón apoyado en la piel como punto de pivote. El ángulo de la aguja con la piel debe ser de unos 45-60 grados. Nunca trabajes en perpendicular (90°): aumenta el trauma y dificulta el control."
          },
          {
            type: "heading",
            text: "Los tres factores de la línea perfecta"
          },
          {
            type: "list",
            items: [
              "Velocidad de paso: ni demasiado rápido (línea fina, tinta insuficiente) ni demasiado lento (exceso de tinta, trauma en la piel). Busca un ritmo constante.",
              "Tensión de la piel: estira la piel con la mano libre para tener una superficie plana y firme. Sin tensión, la piel se mueve y la línea tiembla.",
              "Profundidad de la aguja: la tinta debe entrar en la dermis, no solo la epidermis. Si tatúas muy superficial, el color se perderá. Si tatúas muy profundo, el trazo sangra y se expande."
            ]
          },
          {
            type: "heading",
            text: "Ejercicios de práctica en piel sintética"
          },
          {
            type: "list",
            items: [
              "Líneas rectas de extremo a extremo, variando la velocidad hasta encontrar tu ritmo",
              "Curvas en C y en S de diferentes radios",
              "Círculos perfectos a mano alzada",
              "Letras del abecedario en distintos tamaños",
              "Diseños geométricos simples: triángulos, hexágonos, mandalas básicos"
            ]
          },
          {
            type: "tip",
            text: "Practica mínimo 30 minutos al día durante las primeras semanas antes de pasar a piel real. La memoria muscular es real: tu mano necesita repetición para aprender el ritmo correcto."
          }
        ]
      },
      {
        id: "iniciacion-5",
        title: "Relleno Sólido y Curación",
        description: "Técnica de relleno por pasadas, evitar el sobretatuado, y cómo cuidar correctamente el tatuaje durante su cicatrización.",
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "45 min",
        content: [
          {
            type: "paragraph",
            text: "El relleno sólido es, junto con la línea, una de las técnicas más usadas en el tatuaje. Parece simple, pero conseguir un negro sólido y uniforme sin áreas sin cubrir ni sobretatuado requiere técnica y control."
          },
          {
            type: "heading",
            text: "Técnica de relleno por pasadas"
          },
          {
            type: "paragraph",
            text: "El relleno se hace por capas superpuestas, cambiando la dirección en cada pasada (horizontal, vertical, diagonal). Esto asegura cobertura uniforme. Trabaja de afuera hacia adentro si el área es grande, y usa una aguja magnum o curved magnum para abarcar más superficie en cada pasada."
          },
          {
            type: "heading",
            text: "Evitar el sobretatuado"
          },
          {
            type: "paragraph",
            text: "El sobretatuado ocurre cuando pasas demasiadas veces por la misma zona sin dejar que la piel se recupere. La piel se vuelve roja, inflada y deja de retener la tinta. Señales de alerta: la piel empieza a 'escupir' tinta, se forma tejido levantado, sangrado excesivo."
          },
          {
            type: "warning",
            text: "Si la piel empieza a hincharse o a rechazar la tinta, para. Limpia la zona, aplica vaselina y pasa a otra área. Insistir en una zona sobretatuada causa cicatrices y arruina el resultado final."
          },
          {
            type: "heading",
            text: "Cuidados post-tatuaje: las primeras 2 semanas"
          },
          {
            type: "list",
            items: [
              "Primeras 2-4 horas: cubre el tatuaje con film o vendaje especial (Saniderm/Dermalize)",
              "Día 1-3: lava con jabón neutro 2-3 veces al día. Seca dando toquecitos, sin frotar.",
              "Día 3-7: aplica crema sin perfume (Bepanthen, Tattoo Goo) en capa muy fina 2-3 veces al día",
              "Día 7-14: el tatuaje pelará. No arranques la piel. Deja que caiga sola.",
              "Durante todo el proceso: nada de sol directo, piscina, mar ni baños largos"
            ]
          },
          {
            type: "tip",
            text: "Avisa siempre a tu cliente que un 10-20% de pérdida de tinta durante la cicatrización es completamente normal. Los retoques son parte del proceso. Un buen tatuador incluye al menos un retoque gratuito en los primeros meses."
          }
        ]
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
        videoPath: "curso-basico/video1.mp4",
        duration: "20 min",
        content: [
          {
            type: "paragraph",
            text: "El Black & Grey es, para muchos, la escuela técnicamente más exigente del tatuaje. Trabajar solo con negro y sus diluciones obliga a dominar la luz, el volumen y las transiciones de una forma que el color puede enmascarar. Si dominas el B&G, dominas el tatuaje."
          },
          {
            type: "heading",
            text: "Historia y origen"
          },
          {
            type: "paragraph",
            text: "El Black & Grey nació en las prisiones de California en los años 70. Los reclusos, sin acceso a tintas de color, usaban tinta de bolígrafo, hollín o tinta diluida con agua para crear sombreados suaves. El estilo fue popularizado en los 80 por artistas como Jack Rudy y Freddy Negrete en el este de Los Angeles, quienes lo elevaron a una forma de arte respetada con raíces en la cultura chicana."
          },
          {
            type: "heading",
            text: "Referentes del estilo"
          },
          {
            type: "list",
            items: [
              "Jack Rudy: considerado el padre del fine line B&G. Pionero del retrato en B&G.",
              "Freddy Negrete: cofundador del estilo chicano B&G, con raíces en la cultura del Este de LA.",
              "Robert Hernandez: refinó el estilo y lo llevó a los tattoo shops convencionales.",
              "Nikko Hurtado: referente moderno del realismo en color y B&G.",
              "Berny (nuestro instructor): especializado en B&G con influencias del realismo europeo."
            ]
          },
          {
            type: "heading",
            text: "Por qué el B&G es la base de todo"
          },
          {
            type: "paragraph",
            text: "Cuando tatúas en B&G, no puedes esconderte. El color puede disimular errores de volumetría, transiciones bruscas o falta de contraste. En B&G, cada decisión es visible. Por eso, quien domina el Black & Grey tiene las herramientas para dominar cualquier otro estilo."
          },
          {
            type: "tip",
            text: "Antes de pasar a este curso, asegúrate de dominar la línea limpia. El B&G se construye sobre líneas precisas que delimitan las zonas de luz y sombra. Sin esa base, el sombreado se perderá."
          }
        ]
      },
      {
        id: "sombreado-2",
        title: "Diluyentes y Gamas de Grises",
        description: "Cómo preparar tu paleta de greywash: agua destilada vs. diluyentes comerciales. Escalas de grises del 10% al 100% de negro.",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "30 min",
        content: [
          {
            type: "paragraph",
            text: "La paleta de grises es tu herramienta principal en el Black & Grey. Saber preparar y usar cada tono correctamente es lo que separa un sombreado amateur de uno profesional."
          },
          {
            type: "heading",
            text: "Agua destilada vs. diluyentes comerciales"
          },
          {
            type: "paragraph",
            text: "Históricamente, el greywash se preparaba diluyendo tinta negra con agua destilada. Hoy existen diluyentes comerciales (mixing solutions) formulados específicamente para mantener la consistencia de la tinta, mejorar la curación y reducir el trauma en la piel. Para empezar, los diluyentes comerciales son más predecibles y recomendables."
          },
          {
            type: "heading",
            text: "Cómo construir tu escala de grises"
          },
          {
            type: "list",
            items: [
              "100% negro: para las sombras más profundas y el outline final",
              "70% negro: sombras medias-oscuras, volumen principal",
              "40% negro: transición media, zonas de penumbra",
              "20% negro: zonas de luz suave, degradado suave",
              "10% negro: la sombra más clara, casi invisible, para los halos de luz"
            ]
          },
          {
            type: "heading",
            text: "La técnica del 'layering' (capas)"
          },
          {
            type: "paragraph",
            text: "En lugar de intentar conseguir el tono exacto en una sola pasada, los artistas de B&G trabajan por capas. Empiezan con el tono más claro, dejan que la piel se asiente, y van añadiendo capas más oscuras hasta conseguir el volumen y contraste deseado. Esto permite más control y evita el sobretatuado."
          },
          {
            type: "warning",
            text: "No mezcles tintas de diferentes marcas en el mismo vasito. Las formulaciones pueden reaccionar de forma impredecible. Prepara tu escala con tinta de un solo fabricante."
          }
        ]
      },
      {
        id: "sombreado-3",
        title: "Agujas Planas y Magnum",
        description: "Uso de curvas magnums (CM), flat magnums y soft edge. Cómo afectan al resultado final y cuándo usar cada configuración.",
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2865&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "35 min",
        content: [
          {
            type: "paragraph",
            text: "Elegir la aguja correcta para sombrear marca la diferencia entre un resultado suave y profesional o un sombreado duro y con rayas. En esta sección estudiaremos las configuraciones más usadas en B&G."
          },
          {
            type: "heading",
            text: "Curved Magnum (Round Magnum / RM)"
          },
          {
            type: "paragraph",
            text: "La Curved Magnum es la aguja más versátil para sombreado. Sus puntas están curvadas hacia arriba en los extremos, lo que hace que se adapte mejor a la curvatura de la piel, depositando tinta de forma más uniforme. Es la elección principal para degradados suaves y sombreado en grandes áreas."
          },
          {
            type: "heading",
            text: "Flat Magnum (M1)"
          },
          {
            type: "paragraph",
            text: "La Flat Magnum tiene las puntas planas. Es más agresiva que la RM, ideal para rellenos sólidos de color o negro y para trabajo más definido en zonas pequeñas. Requiere más cuidado para no sobre-traumatizar la piel."
          },
          {
            type: "heading",
            text: "Soft Edge Magnum"
          },
          {
            type: "paragraph",
            text: "Las Soft Edge son una variante de la curved magnum con las puntas exteriores más separadas. Crean degradados extremadamente suaves con menos presión, ideales para pieles delicadas o trabajos de fine line B&G."
          },
          {
            type: "list",
            items: [
              "Para degradados amplios y suaves: Curved Magnum 9RM o 11RM",
              "Para sombreado en zonas pequeñas: 5RM o 7RM",
              "Para relleno de negro sólido: Flat Magnum 9M1 o 11M1",
              "Para texturas y detalles finos: Round Shader 5RS o 7RS"
            ]
          },
          {
            type: "tip",
            text: "Empieza siempre con la magnum más pequeña (5RM) para aprender el control antes de pasar a magnums más grandes. Con más puntas, el margen de error aumenta."
          }
        ]
      },
      {
        id: "sombreado-4",
        title: "Whip Shading",
        description: "La técnica de arrastre o puntillismo de arrastre para crear transiciones naturales y texturas suaves. Práctica intensiva.",
        imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "60 min",
        content: [
          {
            type: "paragraph",
            text: "El Whip Shading (o shading de arrastre) es una de las técnicas más características del Black & Grey. Crea transiciones graduales de forma orgánica, sin el aspecto mecánico del sombreado por pasadas."
          },
          {
            type: "heading",
            text: "¿Qué es el Whip Shading?"
          },
          {
            type: "paragraph",
            text: "Es una técnica de movimiento: en lugar de mover la máquina en líneas rectas o círculos uniformes, se realiza un movimiento de 'latigazo' rápido. La aguja entra cargada de tinta en el punto de inicio y sale acelerando, depositando menos tinta al final del trazo. Esto crea de forma natural una transición de oscuro a claro."
          },
          {
            type: "heading",
            text: "Cómo ejecutar el whip shading"
          },
          {
            type: "list",
            items: [
              "Carga bien la aguja de tinta antes de entrar en la piel",
              "Entra en el área oscura con velocidad constante y moderada",
              "Acelera progresivamente hacia el área clara mientras 'lanzas' la máquina",
              "La punta de la aguja debe salir de la piel en el punto más claro",
              "Repite superponiéndote ligeramente al trazo anterior para crear textura"
            ]
          },
          {
            type: "heading",
            text: "Variaciones: el circular shading"
          },
          {
            type: "paragraph",
            text: "Una variante es el circular shading: en lugar de movimientos lineales, se hacen pequeños círculos con la máquina, variando la presión. Crea una textura más suave y es especialmente efectivo para pieles y texturas orgánicas."
          },
          {
            type: "tip",
            text: "Practica el whip shading en papel antes de hacerlo en piel sintética. Carga la magnum con tinta y practica el movimiento de latigazo hasta que sea fluido y consistente. La fluidez del movimiento es todo."
          }
        ]
      },
      {
        id: "sombreado-5",
        title: "Volumetría y Luz",
        description: "Cómo leer la luz de una referencia, dónde colocar los puntos de luz más brillantes y cómo construir el volumen de una figura.",
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "50 min",
        content: [
          {
            type: "paragraph",
            text: "La volumetría es la capacidad de dar sensación de tridimensionalidad a un diseño plano. En Black & Grey, esto se consigue exclusivamente con la distribución de luces y sombras. Sin un análisis correcto de la luz, la figura se verá plana."
          },
          {
            type: "heading",
            text: "Análisis de la fuente de luz"
          },
          {
            type: "paragraph",
            text: "Antes de tatuar, identifica de dónde viene la luz en tu referencia. ¿Es frontal? ¿Lateral? ¿Desde arriba? La posición de la fuente luminosa determina dónde van las sombras más oscuras (alejadas de la luz) y los puntos de máxima luz (los más cercanos y perpendiculares a la fuente)."
          },
          {
            type: "heading",
            text: "Los 5 valores tonales básicos"
          },
          {
            type: "list",
            items: [
              "Luz directa (highlight): la zona más brillante, la más cercana a la fuente. En B&G, se deja sin tinta o con tono mínimo.",
              "Luz media: la transición entre luz y sombra. Tono 20-30%.",
              "Tono medio: la zona neutra, sin luz ni sombra directa. Tono 40-50%.",
              "Sombra: las zonas alejadas de la luz. Tono 70-80%.",
              "Sombra profunda: los puntos de máximo contraste, bordes, oquedades. Negro 100%."
            ]
          },
          {
            type: "heading",
            text: "El truco del squinting"
          },
          {
            type: "paragraph",
            text: "Entrecierra los ojos mientras miras tu referencia. Al reducir la información visual, tu cerebro solo distingue los contrastes más marcados. Los puntos que siguen siendo blancos son tus highlights. Los que son negro total son tus sombras profundas. El resto son tus tonos medios."
          },
          {
            type: "tip",
            text: "Imprime siempre tu referencia en blanco y negro antes de tatuar. Ver el diseño ya en escala de grises te ayuda a identificar los valores tonales que debes replicar en la piel."
          }
        ]
      },
      {
        id: "sombreado-6",
        title: "Proyecto Final: Pieza Completa",
        description: "Aplicación de todas las técnicas en una pieza de sombreado completa sobre piel sintética, con feedback y correcciones.",
        imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "90 min",
        content: [
          {
            type: "paragraph",
            text: "Ha llegado el momento de poner en práctica todo lo aprendido. En esta sección vas a completar una pieza de Black & Grey de principio a fin sobre piel sintética, aplicando cada una de las técnicas del curso de forma integrada."
          },
          {
            type: "heading",
            text: "El proceso de trabajo: de la A a la Z"
          },
          {
            type: "list",
            items: [
              "1. Selecciona una referencia fotográfica en blanco y negro. Elige algo con contrastes marcados.",
              "2. Analiza los valores tonales con la técnica del squinting.",
              "3. Prepara tu escala de grises: 5 tonos diferenciados.",
              "4. Transfiere el diseño a la piel sintética con papel de calco.",
              "5. Outline completo con aguja RL o RS según el grosor deseado.",
              "6. Aplica las sombras más oscuras con negro al 70-100%.",
              "7. Construye los tonos medios con whip shading y curved magnum.",
              "8. Añade los tonos más claros en la última fase.",
              "9. Revisa el conjunto y añade los detalles finales."
            ]
          },
          {
            type: "heading",
            text: "Autoevaluación de tu trabajo"
          },
          {
            type: "paragraph",
            text: "Una vez terminada la pieza, hazte estas preguntas: ¿Se percibe el volumen? ¿Las transiciones son suaves o se notan saltos? ¿El punto de máxima luz está bien definido? ¿Hay suficiente contraste entre luz y sombra? Toma una foto y compárala con la referencia original."
          },
          {
            type: "tip",
            text: "No intentes hacer una pieza perfecta en tu primer intento. El objetivo es identificar tus puntos débiles: ¿dónde tiembla la línea? ¿Dónde el degradado es brusco? Esas son las zonas en las que debes enfocar tu práctica."
          }
        ]
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
        videoPath: "curso-basico/video1.mp4",
        duration: "25 min",
        content: [
          {
            type: "paragraph",
            text: "El realismo en el tatuaje es la disciplina más exigente del oficio. Exige un dominio completo de todas las técnicas previas — línea, sombreado, volumetría — y añade una nueva dimensión: la fidelidad fotográfica. En el realismo, el error es visible a simple vista."
          },
          {
            type: "heading",
            text: "¿Qué define al realismo?"
          },
          {
            type: "list",
            items: [
              "Reproducción fiel de texturas reales: piel, pelo, metal, agua, tela",
              "Iluminación fotográfica: highlights duros, sombras profundas, transiciones precisas",
              "Perspectiva y anatomía correctas, especialmente en retratos",
              "Alto contraste como herramienta principal de profundidad",
              "Ausencia de simplificación: cada detalle de la referencia se respeta"
            ]
          },
          {
            type: "heading",
            text: "Realismo vs. otros estilos"
          },
          {
            type: "paragraph",
            text: "En el neotradicional o el old school, puedes simplificar formas y exagerar colores. En el realismo, no. La anatomía debe ser correcta, las proporciones exactas y la textura identificable. Por eso este curso requiere haber completado los dos anteriores."
          },
          {
            type: "heading",
            text: "La importancia de la referencia fotográfica"
          },
          {
            type: "paragraph",
            text: "Una buena referencia es el 50% del trabajo. Necesitas una foto de alta resolución, con buena iluminación y contraste marcado. Evita fotos con múltiples fuentes de luz, fondos complejos o resolución baja. Aprende a editar tu referencia: aumentar contraste, convertir a B&W y ajustar niveles antes de hacer el stencil."
          },
          {
            type: "tip",
            text: "Cuando un cliente te traiga una referencia de baja calidad o mala iluminación, explícale por qué no es adecuada y ayúdale a encontrar una mejor. Un realismo sobre mala referencia siempre decepciona, aunque la técnica sea buena."
          }
        ]
      },
      {
        id: "realismo-2",
        title: "Preparación del Diseño",
        description: "Cómo seleccionar y editar una fotografía de referencia, contraste, niveles y conversión a stencil con software profesional.",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "40 min",
        content: [
          {
            type: "paragraph",
            text: "El proceso de preparación del diseño en realismo es tan importante como la ejecución. Un mal stencil o una referencia mal procesada garantizan un resultado mediocre independientemente de la técnica."
          },
          {
            type: "heading",
            text: "Edición de la referencia fotográfica"
          },
          {
            type: "list",
            items: [
              "Convierte la foto a escala de grises (B&W) para ver los valores tonales reales",
              "Aumenta el contraste: lleva las sombras más abajo y las luces más arriba",
              "Ajusta los niveles o curvas para definir los 5 tonos que vas a tatuar",
              "Sharpening ligero para reforzar los detalles finos",
              "Ajusta el tamaño final al área de la piel donde vas a trabajar"
            ]
          },
          {
            type: "heading",
            text: "Software recomendado"
          },
          {
            type: "paragraph",
            text: "Photoshop es el estándar de la industria, pero Adobe Lightroom y alternativas gratuitas como GIMP o Photopea (web) funcionan perfectamente para el procesado básico. En móvil, Snapseed es muy efectivo para ajustes rápidos."
          },
          {
            type: "heading",
            text: "Creación del stencil"
          },
          {
            type: "paragraph",
            text: "El stencil es la guía que se transfiere a la piel. Para realismo, usa una impresora térmica (Thermofax o similar) con papel de esténcil de alta definición. Asegúrate de incluir solo los trazos más importantes como guía — el stencil en realismo no es un outline completo, sino una serie de marcas estratégicas que te ayudan a posicionar los elementos clave."
          },
          {
            type: "warning",
            text: "No empieces a tatuar hasta que el stencil esté perfectamente posicionado, bien transferido y completamente seco. Un stencil corrido o borroso en mitad del trabajo es un desastre."
          }
        ]
      },
      {
        id: "realismo-3",
        title: "Textura de Piel y Poros",
        description: "Técnica específica para replicar la textura de la piel humana, poros, arrugas y cicatrices de forma hiperrealista.",
        imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2574&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "55 min",
        content: [
          {
            type: "paragraph",
            text: "Tatuar piel sobre piel es una de las paradojas más fascinantes del realismo. Tienes que replicar, con tinta, una textura que ya existe en el propio soporte. La clave está en entender cómo la luz interactúa con la superficie de la piel real."
          },
          {
            type: "heading",
            text: "Cómo funciona la textura de la piel"
          },
          {
            type: "paragraph",
            text: "La piel humana no es una superficie lisa. Está compuesta de pequeñas crestas, poros y microarrugas que crean sombras minúsculas. En fotografía de alta resolución, estas sombras son visibles como pequeños puntos oscuros (los poros) sobre una superficie más clara."
          },
          {
            type: "heading",
            text: "Técnica para replicar poros"
          },
          {
            type: "list",
            items: [
              "Usa una Round Liner fina (3RL o 5RL) para los poros individuales más grandes",
              "Para áreas de textura general, usa una soft edge magnum con movimiento circular muy corto",
              "Trabaja siempre del tono más oscuro al más claro — los poros son las partes más oscuras",
              "No exageres la textura: debe ser sutil. En piel real, los poros no se ven desde lejos.",
              "Deja los puntos de luz absolutamente limpios, sin textura, para maximizar el contraste"
            ]
          },
          {
            type: "heading",
            text: "Arrugas y pliegues"
          },
          {
            type: "paragraph",
            text: "Las arrugas se tatúan como sombras largas y graduadas. La arruga en sí es la sombra (oscura), y los bordes de la arruga son la luz (clara o blanca). Usa una línea fina para definir el borde de la arruga y whip shading para crear la sombra debajo."
          },
          {
            type: "tip",
            text: "Estudia fotografías macro de piel humana. Fíjate en cómo se distribuye la luz en diferentes zonas (frente, mejillas, cuello). Cada zona tiene una textura diferente que debes aprender a identificar y replicar."
          }
        ]
      },
      {
        id: "realismo-4",
        title: "Textura de Pelo y Animales",
        description: "Stroke by stroke: cómo tatuar pelo de forma individual para conseguir naturalidad. Aplicado a retratos de animales y humanos.",
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2670&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "70 min",
        content: [
          {
            type: "paragraph",
            text: "El pelo es uno de los elementos más complejos del realismo y, a la vez, uno de los más impactantes cuando está bien ejecutado. Un retrato de animal o humano con pelo bien tatuado tiene un nivel de realismo inmediato que impresiona."
          },
          {
            type: "heading",
            text: "La técnica stroke by stroke"
          },
          {
            type: "paragraph",
            text: "La forma más realista de tatuar pelo es trazo a trazo: cada pelo individual se tatúa con un trazo de máquina. Para esto necesitas una aguja de línea fina (3RL o incluso 1RL para cabello muy fino) y un control preciso de la presión y velocidad."
          },
          {
            type: "heading",
            text: "Reglas para tatuar pelo realista"
          },
          {
            type: "list",
            items: [
              "Siempre tatúa en la dirección de crecimiento del pelo — nunca en contra",
              "Varía la longitud y el grosor de los trazos para evitar el aspecto artificial",
              "Tatúa primero las capas más oscuras (pelo de debajo), luego las más claras (pelo de encima)",
              "Deja espacios en blanco entre los trazos — la piel sin tinta representa los highlights",
              "Los pelos del borde exterior deben ser finos y dispersos, nunca con un outline duro"
            ]
          },
          {
            type: "heading",
            text: "Diferencias entre tipos de pelo"
          },
          {
            type: "paragraph",
            text: "El pelo humano es diferente al pelo de un perro o un gato. El cabello humano tiene mechones y capas, con highlights brillantes. El pelo de un perro de pelo corto tiene textura densa y direccional. El pelo de un gato es suave y estratificado. Estudia cada referencia individualmente."
          },
          {
            type: "tip",
            text: "Para el pelo blanco (animales con pelaje claro), tatúas las sombras y dejas la piel en blanco para el pelo en sí. Es un ejercicio de pensamiento inverso: estás tatuando el espacio entre los pelos, no los pelos mismos."
          }
        ]
      },
      {
        id: "realismo-5",
        title: "Retrato: Los Ojos",
        description: "Los ojos son el alma de un retrato. Técnica detallada para iris, pupila, reflejo de luz y párpados con acabado hiperrealista.",
        imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "80 min",
        content: [
          {
            type: "paragraph",
            text: "Los ojos son el primer punto donde el espectador mira un retrato. Si los ojos están bien, el retrato funciona. Si los ojos fallan, nada más importa. Esta sección es la más crítica de todo el curso de realismo."
          },
          {
            type: "heading",
            text: "Anatomía del ojo para el tatuador"
          },
          {
            type: "list",
            items: [
              "Esclerótica (el blanco): casi nunca es blanca pura. Tiene sombras suaves en los bordes y cerca del iris.",
              "Iris: la parte de color. En B&G, es la zona con más riqueza de tonos. Tiene textura radial desde la pupila.",
              "Pupila: negro sólido. El punto de mayor oscuridad del ojo.",
              "Córnea y reflejo de luz (catchlight): el punto o área blanca que da vida al ojo. NUNCA tatúes encima del catchlight.",
              "Párpados: proyectan una sombra sobre la parte superior del iris. Definen la expresión."
            ]
          },
          {
            type: "heading",
            text: "Orden de ejecución"
          },
          {
            type: "list",
            items: [
              "1. Define el outline del párpado superior (línea de las pestañas) con trazo fino y oscuro",
              "2. Tatúa la pupila en negro sólido, dejando el catchlight sin tinta",
              "3. Construye el iris con trazos radiales desde la pupila hacia afuera, variando la oscuridad",
              "4. Sombrea la esclerótica suavemente, más oscuro en los bordes y hacia el lagrimal",
              "5. Añade la sombra del párpado superior sobre el iris",
              "6. Tatúa las pestañas una a una, de más gruesas (raíz) a más finas (punta)"
            ]
          },
          {
            type: "warning",
            text: "El catchlight (reflejo de luz en el ojo) es sagrado. Si lo tatúas por error, el ojo perderá vida inmediatamente. Márcalo claramente en tu stencil y trabaja con cuidado alrededor de él."
          },
          {
            type: "tip",
            text: "Practica el ojo como ejercicio aislado antes de integrarlo en un retrato. Un ojo bien hecho de forma independiente te da la confianza y la referencia de cómo debe verse en el retrato final."
          }
        ]
      },
      {
        id: "realismo-6",
        title: "Alto Contraste y Durabilidad",
        description: "Cómo garantizar que el tatuaje perdure en el tiempo con negro opaco en sombras profundas y blancos limpios en los puntos de luz.",
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2865&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "45 min",
        content: [
          {
            type: "paragraph",
            text: "Un realismo que se ve perfecto recién hecho pero que desaparece en dos años es un fracaso profesional. La durabilidad es tan importante como el resultado inmediato. En esta sección aprenderás a construir el contraste de forma que perdure."
          },
          {
            type: "heading",
            text: "Por qué se degrada el contraste con el tiempo"
          },
          {
            type: "paragraph",
            text: "Con los años, la tinta en la piel se dispersa ligeramente en la dermis. Los tonos medios se 'abren' y se fusionan con los claros. Si tu tatuaje no tiene un contraste muy marcado desde el principio, en 5-10 años todo se verá como un gris uniforme sin definición."
          },
          {
            type: "heading",
            text: "La regla del negro opaco"
          },
          {
            type: "paragraph",
            text: "En las sombras más oscuras de tu realismo, usa siempre negro al 100% de opacidad, bien saturado. No tengas miedo al negro. El negro opaco crea la base de contraste sobre la que todo lo demás se apoya y es lo que dará solidez al tatuaje con el paso del tiempo."
          },
          {
            type: "list",
            items: [
              "Zonas de negro sólido: fondos, sombras profundas, pelo oscuro, pupilas",
              "Usa tintas de alta opacidad (Eternal, Dynamic, World Famous)",
              "Haz varias pasadas lentas para asegurar saturación completa",
              "Evita mezclar negro con diluyente en las zonas de negro sólido"
            ]
          },
          {
            type: "tip",
            text: "Fotografía el tatuaje recién hecho y guarda la foto. Compártela con el cliente y pídele fotos de la evolución a los 3, 6 y 12 meses. Es la mejor forma de aprender cómo envejece tu trabajo y ajustar tu técnica."
          }
        ]
      },
      {
        id: "realismo-7",
        title: "Composición Compleja",
        description: "Cómo abordar una pieza de gran formato con múltiples elementos. Jerarquía visual, flujo de la composición y uso del espacio negativo.",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "60 min",
        content: [
          {
            type: "paragraph",
            text: "Una vez que dominas los elementos individuales (textura, pelo, ojos), el siguiente reto es integrarlos en una composición coherente y visualmente poderosa. La composición es la diferencia entre un tatuaje técnicamente correcto y uno que deja sin respiración."
          },
          {
            type: "heading",
            text: "Jerarquía visual"
          },
          {
            type: "paragraph",
            text: "En una composición compleja, no todos los elementos tienen el mismo peso. El elemento principal (generalmente el rostro o el punto focal) debe tener el mayor contraste y detalle. Los elementos secundarios tienen menos contraste y detalle, lo que crea profundidad visual y guía el ojo del espectador."
          },
          {
            type: "heading",
            text: "El espacio negativo como herramienta"
          },
          {
            type: "paragraph",
            text: "El espacio negativo (la piel sin tinta) no es un vacío: es parte activa de la composición. Úsalo para crear contraste con los elementos oscuros, para dar 'respiro' visual y para definir los bordes de los objetos con luz. Algunas de las piezas de realismo más impactantes son aquellas donde la piel natural forma parte del diseño."
          },
          {
            type: "list",
            items: [
              "Regla de los tercios: divide la composición en 9 partes iguales y coloca los puntos focales en las intersecciones",
              "Líneas de flujo: el ojo debe poder 'viajar' por la composición de forma natural",
              "Contraste de tamaños: elementos grandes vs. pequeños crean dinamismo",
              "Encuadre interno: usa elementos del diseño para encuadrar el elemento principal"
            ]
          },
          {
            type: "tip",
            text: "Antes de tatuar una pieza grande, haz un boceto en miniatura (thumbnail) de toda la composición. Esto te permite ver el conjunto antes de comprometerte con la piel. Ajusta hasta que el flujo visual te satisfaga."
          }
        ]
      },
      {
        id: "realismo-8",
        title: "Proyecto Final: Retrato Completo",
        description: "Desarrollo de un retrato realista completo desde cero, con revisiones en cada etapa y feedback personalizado.",
        imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=2574&auto=format&fit=crop",
        videoPath: "curso-basico/video1.mp4",
        duration: "120 min",
        content: [
          {
            type: "paragraph",
            text: "El proyecto final integra todo lo aprendido en el curso: preparación de referencia, stencil, textura de piel, pelo, ojos, contraste y composición. El objetivo es completar un retrato realista completo sobre piel sintética de alta calidad."
          },
          {
            type: "heading",
            text: "Guía del proyecto final"
          },
          {
            type: "list",
            items: [
              "Selecciona un retrato: humano o animal, con buena iluminación lateral o tres cuartos",
              "Procesa la referencia: B&W, contraste aumentado, niveles ajustados",
              "Crea el stencil y transfiere a la piel sintética",
              "Fase 1: outline de los elementos principales (ojos, nariz, boca, contorno)",
              "Fase 2: sombras profundas en negro sólido",
              "Fase 3: tonos medios con whip shading y magnum",
              "Fase 4: textura de piel y pelo",
              "Fase 5: detalles finales y revisión de contraste",
              "Fotografía el resultado en buena luz y compara con la referencia"
            ]
          },
          {
            type: "heading",
            text: "Criterios de evaluación"
          },
          {
            type: "paragraph",
            text: "Al terminar, evalúa tu trabajo en estos aspectos: ¿se reconoce al sujeto? ¿El contraste es suficiente? ¿Las texturas son identificables (piel, pelo)? ¿Los ojos tienen vida? ¿La composición guía el ojo correctamente?"
          },
          {
            type: "tip",
            text: "Comparte tu proyecto en la comunidad del curso. El feedback de otros alumnos y de Berny te dará una perspectiva externa fundamental. Los mejores artistas son los que nunca dejan de pedir feedback."
          }
        ]
      }
    ]
  }
];
