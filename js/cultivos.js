const CULTIVOS = [

  {
    id: "pimenta",
    name: "Pimenta",
    emoji: "🌶️",

    img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=700&q=80",

    water: "1 vez ao dia",

    temp: "18°C a 30°C",

    min: "10°C",

    max: "35°C",

    level: "Média",

    tip:
      "Mantenha o solo levemente úmido, evitando encharcamento. " +
      "Em períodos muito quentes, monitore a umidade com maior frequência."
  },


  {
    id: "milho",
    name: "Milho",
    emoji: "🌽",

    img: "https://images.unsplash.com/photo-1601593768799-76c5f6d2d9e0?auto=format&fit=crop&w=700&q=80",

    water: "1 vez ao dia",

    temp: "18°C a 30°C",

    min: "10°C",

    max: "35°C",

    level: "Alta",

    tip:
      "A necessidade de água aumenta em fases de crescimento e formação " +
      "das espigas. Priorize irrigação no início da manhã ou fim da tarde."
  },


  {
    id: "mandioca",
    name: "Mandioca",
    emoji: "🌱",

    img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=700&q=80",

    water: "2 a 3 vezes/semana",

    temp: "20°C a 30°C",

    min: "15°C",

    max: "38°C",

    level: "Baixa",

    tip:
      "Depois de estabelecida, a mandioca é relativamente tolerante " +
      "a períodos de menor disponibilidade de água. Evite excesso de irrigação."
  },


  {
    id: "alface",
    name: "Alface",
    emoji: "🥬",

    img: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?auto=format&fit=crop&w=700&q=80",

    water: "1 a 2 vezes ao dia",

    temp: "15°C a 22°C",

    min: "5°C",

    max: "30°C",

    level: "Média",

    tip:
      "A alface possui raízes rasas e se beneficia de umidade regular. " +
      "Regue suavemente e prefira horários mais frescos."
  },


  {
    id: "couve",
    name: "Couve",
    emoji: "🥬",

    img: "https://images.unsplash.com/photo-1593023452584-5f7a4b1d1f49?auto=format&fit=crop&w=700&q=80",

    water: "1 vez ao dia",

    temp: "15°C a 25°C",

    min: "5°C",

    max: "32°C",

    level: "Média",

    tip:
      "Mantenha umidade constante no solo, mas sem encharcar. " +
      "A cobertura morta pode reduzir a evaporação."
  },


  {
    id: "tomate",
    name: "Tomate",
    emoji: "🍅",

    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80",

    water: "1 vez ao dia",

    temp: "18°C a 27°C",

    min: "10°C",

    max: "35°C",

    level: "Alta",

    tip:
      "Evite grandes oscilações de umidade. Irrigue próximo ao solo " +
      "e evite molhar excessivamente as folhas."
  },


  {
    id: "cenoura",
    name: "Cenoura",
    emoji: "🥕",

    img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=80",

    water: "1 vez ao dia",

    temp: "15°C a 24°C",

    min: "5°C",

    max: "30°C",

    level: "Média",

    tip:
      "A umidade uniforme favorece raízes bem formadas. " +
      "Evite deixar o solo secar completamente durante a germinação."
  },


  {
    id: "pepino",
    name: "Pepino",
    emoji: "🥒",

    img: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=700&q=80",

    water: "1 vez ao dia",

    temp: "18°C a 30°C",

    min: "12°C",

    max: "35°C",

    level: "Alta",

    tip:
      "O pepino apresenta demanda elevada de água. Em dias quentes, " +
      "confira a umidade do solo antes de decidir uma segunda irrigação."
  },


  {
    id: "feijao",
    name: "Feijão",
    emoji: "🫘",

    img: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=700&q=80",

    water: "3 a 4 vezes/semana",

    temp: "18°C a 28°C",

    min: "12°C",

    max: "35°C",

    level: "Média",

    tip:
      "A regularidade da água é importante, principalmente na floração " +
      "e formação das vagens. Evite excesso de água."
  },


  {
    id: "morango",
    name: "Morango",
    emoji: "🍓",

    img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=80",

    water: "1 vez ao dia",

    temp: "15°C a 25°C",

    min: "5°C",

    max: "30°C",

    level: "Média",

    tip:
      "Prefira irrigação localizada, como gotejamento, para reduzir " +
      "perdas por evaporação e manter frutos e folhas mais secos."
  }

];
