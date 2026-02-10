import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const LESSONS = [
  {
    id: "1.1", title: "Greetings & Introductions", date: "2025-01-06",
    sentences: [
      { es: "Hola, me llamo Carlos.", en: "Hello, my name is Carlos." },
      { es: "Mucho gusto, ¿cómo estás?", en: "Nice to meet you, how are you?" },
      { es: "Buenos días, señor.", en: "Good morning, sir." },
      { es: "¿Cómo está usted hoy?", en: "How are you today? (formal)" },
      { es: "Buenas noches, hasta mañana.", en: "Good night, see you tomorrow." },
    ],
    items: [
      { id:"v1", spanish:"hola", english:"hello", pos:"interjection", tags:["greeting"], lesson:"1.1" },
      { id:"v2", spanish:"buenos días", english:"good morning", pos:"phrase", tags:["greeting","formal"], lesson:"1.1" },
      { id:"v3", spanish:"buenas tardes", english:"good afternoon", pos:"phrase", tags:["greeting"], lesson:"1.1" },
      { id:"v4", spanish:"buenas noches", english:"good evening / good night", pos:"phrase", tags:["greeting"], lesson:"1.1" },
      { id:"v5", spanish:"¿cómo estás?", english:"how are you? (informal)", pos:"phrase", tags:["greeting","informal","question"], lesson:"1.1" },
      { id:"v6", spanish:"¿cómo está usted?", english:"how are you? (formal)", pos:"phrase", tags:["greeting","formal","question"], lesson:"1.1" },
      { id:"v7", spanish:"me llamo", english:"my name is", pos:"phrase", tags:["introduction"], lesson:"1.1" },
      { id:"v8", spanish:"mucho gusto", english:"nice to meet you", pos:"phrase", tags:["greeting"], lesson:"1.1" },
      { id:"v9", spanish:"por favor", english:"please", pos:"phrase", tags:["polite"], lesson:"1.1" },
      { id:"v10", spanish:"gracias", english:"thank you", pos:"phrase", tags:["polite"], lesson:"1.1" },
      { id:"v10b", spanish:"de nada", english:"you're welcome", pos:"phrase", tags:["polite"], lesson:"1.1" },
      { id:"v10c", spanish:"señor", english:"sir / Mr.", pos:"noun", tags:["formal"], lesson:"1.1" },
      { id:"v10d", spanish:"señora", english:"ma'am / Mrs.", pos:"noun", tags:["formal"], lesson:"1.1" },
      { id:"v10e", spanish:"hasta luego", english:"see you later", pos:"phrase", tags:["farewell"], lesson:"1.1" },
      { id:"v10f", spanish:"hasta mañana", english:"see you tomorrow", pos:"phrase", tags:["farewell"], lesson:"1.1" },
      { id:"v10g", spanish:"adiós", english:"goodbye", pos:"interjection", tags:["farewell"], lesson:"1.1" },
      { id:"v10h", spanish:"hoy", english:"today", pos:"adverb", tags:["time"], lesson:"1.1" },
      { id:"v10i", spanish:"mañana", english:"tomorrow / morning", pos:"noun", tags:["time"], lesson:"1.1" },
    ]
  },
  {
    id: "1.2", title: "Common AR Verbs", date: "2025-01-13",
    sentences: [
      { es: "Yo hablo español en el trabajo.", en: "I speak Spanish at work." },
      { es: "Ella estudia todos los días.", en: "She studies every day." },
      { es: "Nosotros cocinamos en la noche.", en: "We cook at night." },
      { es: "¿Tú trabajas los lunes?", en: "Do you work on Mondays?" },
      { es: "Ellos compran comida en el mercado.", en: "They buy food at the market." },
      { es: "Yo camino al parque por la mañana.", en: "I walk to the park in the morning." },
    ],
    items: [
      { id:"v11", spanish:"hablar", english:"to speak", pos:"verb-AR", tags:["verb","AR","infinitive"], lesson:"1.2" },
      { id:"v12", spanish:"yo hablo", english:"I speak", pos:"verb-AR", tags:["verb","AR","yo"], lesson:"1.2" },
      { id:"v13", spanish:"trabajar", english:"to work", pos:"verb-AR", tags:["verb","AR","infinitive"], lesson:"1.2" },
      { id:"v14", spanish:"yo trabajo", english:"I work", pos:"verb-AR", tags:["verb","AR","yo"], lesson:"1.2" },
      { id:"v15", spanish:"estudiar", english:"to study", pos:"verb-AR", tags:["verb","AR","infinitive"], lesson:"1.2" },
      { id:"v15b", spanish:"ella estudia", english:"she studies", pos:"verb-AR", tags:["verb","AR","ella"], lesson:"1.2" },
      { id:"v16", spanish:"necesitar", english:"to need", pos:"verb-AR", tags:["verb","AR","infinitive"], lesson:"1.2" },
      { id:"v17", spanish:"comprar", english:"to buy", pos:"verb-AR", tags:["verb","AR","infinitive"], lesson:"1.2" },
      { id:"v17b", spanish:"ellos compran", english:"they buy", pos:"verb-AR", tags:["verb","AR","ellos"], lesson:"1.2" },
      { id:"v18", spanish:"cocinar", english:"to cook", pos:"verb-AR", tags:["verb","AR","infinitive"], lesson:"1.2" },
      { id:"v18b", spanish:"nosotros cocinamos", english:"we cook", pos:"verb-AR", tags:["verb","AR","nosotros"], lesson:"1.2" },
      { id:"v19", spanish:"caminar", english:"to walk", pos:"verb-AR", tags:["verb","AR","infinitive"], lesson:"1.2" },
      { id:"v20", spanish:"llamar", english:"to call", pos:"verb-AR", tags:["verb","AR","infinitive"], lesson:"1.2" },
      { id:"v20b", spanish:"español", english:"Spanish (language)", pos:"noun", tags:["language"], lesson:"1.2" },
      { id:"v20c", spanish:"el trabajo", english:"work / the job", pos:"noun", tags:["work"], lesson:"1.2" },
      { id:"v20d", spanish:"todos los días", english:"every day", pos:"phrase", tags:["time"], lesson:"1.2" },
      { id:"v20e", spanish:"la noche", english:"the night", pos:"noun", tags:["time"], lesson:"1.2" },
      { id:"v20f", spanish:"el mercado", english:"the market", pos:"noun", tags:["place"], lesson:"1.2" },
      { id:"v20g", spanish:"la comida", english:"the food / meal", pos:"noun", tags:["food"], lesson:"1.2" },
      { id:"v20h", spanish:"el parque", english:"the park", pos:"noun", tags:["place"], lesson:"1.2" },
    ]
  },
  {
    id: "1.3", title: "ER & IR Verbs", date: "2025-01-20",
    sentences: [
      { es: "Yo como el almuerzo a las doce.", en: "I eat lunch at twelve." },
      { es: "Ella bebe agua todos los días.", en: "She drinks water every day." },
      { es: "Nosotros leemos libros en la biblioteca.", en: "We read books in the library." },
      { es: "Tú escribes correos electrónicos.", en: "You write emails." },
      { es: "Ellos viven en una casa grande.", en: "They live in a big house." },
      { es: "Yo abro la puerta.", en: "I open the door." },
    ],
    items: [
      { id:"v21", spanish:"comer", english:"to eat", pos:"verb-ER", tags:["verb","ER","infinitive"], lesson:"1.3" },
      { id:"v21b", spanish:"yo como", english:"I eat", pos:"verb-ER", tags:["verb","ER","yo"], lesson:"1.3" },
      { id:"v22", spanish:"beber", english:"to drink", pos:"verb-ER", tags:["verb","ER","infinitive"], lesson:"1.3" },
      { id:"v22b", spanish:"ella bebe", english:"she drinks", pos:"verb-ER", tags:["verb","ER","ella"], lesson:"1.3" },
      { id:"v23", spanish:"leer", english:"to read", pos:"verb-ER", tags:["verb","ER","infinitive"], lesson:"1.3" },
      { id:"v23b", spanish:"nosotros leemos", english:"we read", pos:"verb-ER", tags:["verb","ER","nosotros"], lesson:"1.3" },
      { id:"v24", spanish:"correr", english:"to run", pos:"verb-ER", tags:["verb","ER","infinitive"], lesson:"1.3" },
      { id:"v25", spanish:"aprender", english:"to learn", pos:"verb-ER", tags:["verb","ER","infinitive"], lesson:"1.3" },
      { id:"v26", spanish:"vivir", english:"to live", pos:"verb-IR", tags:["verb","IR","infinitive"], lesson:"1.3" },
      { id:"v26b", spanish:"ellos viven", english:"they live", pos:"verb-IR", tags:["verb","IR","ellos"], lesson:"1.3" },
      { id:"v27", spanish:"escribir", english:"to write", pos:"verb-IR", tags:["verb","IR","infinitive"], lesson:"1.3" },
      { id:"v27b", spanish:"tú escribes", english:"you write", pos:"verb-IR", tags:["verb","IR","tú"], lesson:"1.3" },
      { id:"v28", spanish:"abrir", english:"to open", pos:"verb-IR", tags:["verb","IR","infinitive"], lesson:"1.3" },
      { id:"v28b", spanish:"yo abro", english:"I open", pos:"verb-IR", tags:["verb","IR","yo"], lesson:"1.3" },
      { id:"v29", spanish:"recibir", english:"to receive", pos:"verb-IR", tags:["verb","IR","infinitive"], lesson:"1.3" },
      { id:"v30", spanish:"decidir", english:"to decide", pos:"verb-IR", tags:["verb","IR","infinitive"], lesson:"1.3" },
      { id:"v30b", spanish:"el almuerzo", english:"lunch", pos:"noun", tags:["food"], lesson:"1.3" },
      { id:"v30c", spanish:"el agua", english:"water", pos:"noun", tags:["food"], lesson:"1.3" },
      { id:"v30d", spanish:"el libro", english:"the book", pos:"noun", tags:["object"], lesson:"1.3" },
      { id:"v30e", spanish:"la biblioteca", english:"the library", pos:"noun", tags:["place"], lesson:"1.3" },
      { id:"v30f", spanish:"la puerta", english:"the door", pos:"noun", tags:["object"], lesson:"1.3" },
      { id:"v30g", spanish:"la casa", english:"the house", pos:"noun", tags:["place"], lesson:"1.3" },
      { id:"v30h", spanish:"grande", english:"big / large", pos:"adjective", tags:["description"], lesson:"1.3" },
    ]
  },
  {
    id: "2.1", title: "Irregular Yo Verbs", date: "2025-01-27",
    sentences: [
      { es: "Yo tengo una reunión a las tres.", en: "I have a meeting at three." },
      { es: "Yo hago la tarea por la noche.", en: "I do the homework at night." },
      { es: "Yo voy al supermercado.", en: "I go to the supermarket." },
      { es: "Yo soy ingeniero.", en: "I am an engineer." },
      { es: "Yo estoy en la oficina.", en: "I am at the office." },
      { es: "Yo sé la respuesta.", en: "I know the answer." },
      { es: "Yo pongo los libros en la mesa.", en: "I put the books on the table." },
    ],
    items: [
      { id:"v31", spanish:"tener", english:"to have", pos:"verb-irregular", tags:["verb","irregular","infinitive"], lesson:"2.1" },
      { id:"v32", spanish:"yo tengo", english:"I have", pos:"verb-irregular", tags:["verb","irregular","yo"], lesson:"2.1" },
      { id:"v33", spanish:"hacer", english:"to do / to make", pos:"verb-irregular", tags:["verb","irregular","infinitive"], lesson:"2.1" },
      { id:"v34", spanish:"yo hago", english:"I do / I make", pos:"verb-irregular", tags:["verb","irregular","yo"], lesson:"2.1" },
      { id:"v35", spanish:"ir", english:"to go", pos:"verb-irregular", tags:["verb","irregular","infinitive"], lesson:"2.1" },
      { id:"v36", spanish:"yo voy", english:"I go", pos:"verb-irregular", tags:["verb","irregular","yo"], lesson:"2.1" },
      { id:"v37", spanish:"ser", english:"to be (permanent)", pos:"verb-irregular", tags:["verb","irregular","infinitive"], lesson:"2.1" },
      { id:"v38", spanish:"yo soy", english:"I am (permanent)", pos:"verb-irregular", tags:["verb","irregular","yo"], lesson:"2.1" },
      { id:"v39", spanish:"estar", english:"to be (temporary)", pos:"verb-irregular", tags:["verb","irregular","infinitive"], lesson:"2.1" },
      { id:"v40", spanish:"yo estoy", english:"I am (temporary)", pos:"verb-irregular", tags:["verb","irregular","yo"], lesson:"2.1" },
      { id:"v40b", spanish:"saber", english:"to know (facts)", pos:"verb-irregular", tags:["verb","irregular","infinitive"], lesson:"2.1" },
      { id:"v40c", spanish:"yo sé", english:"I know", pos:"verb-irregular", tags:["verb","irregular","yo"], lesson:"2.1" },
      { id:"v40d", spanish:"poner", english:"to put / place", pos:"verb-irregular", tags:["verb","irregular","infinitive"], lesson:"2.1" },
      { id:"v40e", spanish:"yo pongo", english:"I put", pos:"verb-irregular", tags:["verb","irregular","yo"], lesson:"2.1" },
      { id:"v40f", spanish:"la reunión", english:"the meeting", pos:"noun", tags:["work"], lesson:"2.1" },
      { id:"v40g", spanish:"la tarea", english:"homework / task", pos:"noun", tags:["school"], lesson:"2.1" },
      { id:"v40h", spanish:"el supermercado", english:"the supermarket", pos:"noun", tags:["place"], lesson:"2.1" },
      { id:"v40i", spanish:"la oficina", english:"the office", pos:"noun", tags:["place","work"], lesson:"2.1" },
      { id:"v40j", spanish:"la mesa", english:"the table", pos:"noun", tags:["object"], lesson:"2.1" },
      { id:"v40k", spanish:"la respuesta", english:"the answer", pos:"noun", tags:["abstract"], lesson:"2.1" },
      { id:"v40l", spanish:"ingeniero", english:"engineer", pos:"noun", tags:["profession"], lesson:"2.1" },
    ]
  },
  {
    id: "2.2", title: "Numbers, Time & Days", date: "2025-02-03",
    sentences: [
      { es: "Son las tres de la tarde.", en: "It is three in the afternoon." },
      { es: "Hoy es lunes.", en: "Today is Monday." },
      { es: "Tengo veinticinco años.", en: "I am twenty-five years old." },
      { es: "La reunión es a las diez.", en: "The meeting is at ten." },
      { es: "Trabajo de lunes a viernes.", en: "I work Monday through Friday." },
    ],
    items: [
      { id:"v50", spanish:"uno", english:"one", pos:"number", tags:["number"], lesson:"2.2" },
      { id:"v51", spanish:"dos", english:"two", pos:"number", tags:["number"], lesson:"2.2" },
      { id:"v52", spanish:"tres", english:"three", pos:"number", tags:["number"], lesson:"2.2" },
      { id:"v53", spanish:"diez", english:"ten", pos:"number", tags:["number"], lesson:"2.2" },
      { id:"v54", spanish:"veinte", english:"twenty", pos:"number", tags:["number"], lesson:"2.2" },
      { id:"v55", spanish:"veinticinco", english:"twenty-five", pos:"number", tags:["number"], lesson:"2.2" },
      { id:"v56", spanish:"lunes", english:"Monday", pos:"noun", tags:["day"], lesson:"2.2" },
      { id:"v57", spanish:"martes", english:"Tuesday", pos:"noun", tags:["day"], lesson:"2.2" },
      { id:"v58", spanish:"miércoles", english:"Wednesday", pos:"noun", tags:["day"], lesson:"2.2" },
      { id:"v59", spanish:"jueves", english:"Thursday", pos:"noun", tags:["day"], lesson:"2.2" },
      { id:"v60", spanish:"viernes", english:"Friday", pos:"noun", tags:["day"], lesson:"2.2" },
      { id:"v61", spanish:"sábado", english:"Saturday", pos:"noun", tags:["day"], lesson:"2.2" },
      { id:"v62", spanish:"domingo", english:"Sunday", pos:"noun", tags:["day"], lesson:"2.2" },
      { id:"v63", spanish:"la hora", english:"the hour / time", pos:"noun", tags:["time"], lesson:"2.2" },
      { id:"v64", spanish:"la tarde", english:"the afternoon", pos:"noun", tags:["time"], lesson:"2.2" },
      { id:"v65", spanish:"el año", english:"the year", pos:"noun", tags:["time"], lesson:"2.2" },
    ]
  },
  {
    id: "2.3", title: "Questions & Connectors", date: "2025-02-10",
    sentences: [
      { es: "¿Qué haces los fines de semana?", en: "What do you do on weekends?" },
      { es: "¿Dónde vives?", en: "Where do you live?" },
      { es: "¿Cuándo es tu cumpleaños?", en: "When is your birthday?" },
      { es: "¿Por qué estudias español?", en: "Why do you study Spanish?" },
      { es: "¿Cuántos hermanos tienes?", en: "How many siblings do you have?" },
      { es: "¿Quién es tu profesor?", en: "Who is your teacher?" },
    ],
    items: [
      { id:"v70", spanish:"¿qué?", english:"what?", pos:"question", tags:["question"], lesson:"2.3" },
      { id:"v71", spanish:"¿dónde?", english:"where?", pos:"question", tags:["question"], lesson:"2.3" },
      { id:"v72", spanish:"¿cuándo?", english:"when?", pos:"question", tags:["question"], lesson:"2.3" },
      { id:"v73", spanish:"¿por qué?", english:"why?", pos:"question", tags:["question"], lesson:"2.3" },
      { id:"v74", spanish:"¿cómo?", english:"how?", pos:"question", tags:["question"], lesson:"2.3" },
      { id:"v75", spanish:"¿cuántos?", english:"how many?", pos:"question", tags:["question"], lesson:"2.3" },
      { id:"v76", spanish:"¿quién?", english:"who?", pos:"question", tags:["question"], lesson:"2.3" },
      { id:"v77", spanish:"el fin de semana", english:"the weekend", pos:"noun", tags:["time"], lesson:"2.3" },
      { id:"v78", spanish:"el cumpleaños", english:"birthday", pos:"noun", tags:["event"], lesson:"2.3" },
      { id:"v79", spanish:"el hermano", english:"brother / sibling", pos:"noun", tags:["family"], lesson:"2.3" },
      { id:"v80", spanish:"el profesor", english:"teacher (m)", pos:"noun", tags:["profession"], lesson:"2.3" },
      { id:"v81", spanish:"la profesora", english:"teacher (f)", pos:"noun", tags:["profession"], lesson:"2.3" },
      { id:"v82", spanish:"porque", english:"because", pos:"conjunction", tags:["connector"], lesson:"2.3" },
      { id:"v83", spanish:"también", english:"also / too", pos:"adverb", tags:["connector"], lesson:"2.3" },
      { id:"v84", spanish:"pero", english:"but", pos:"conjunction", tags:["connector"], lesson:"2.3" },
      { id:"v85", spanish:"y", english:"and", pos:"conjunction", tags:["connector"], lesson:"2.3" },
      { id:"v86", spanish:"o", english:"or", pos:"conjunction", tags:["connector"], lesson:"2.3" },
    ]
  },
];

// Add default fields to all items
LESSONS.forEach(l => l.items.forEach(i => { i.confidence = i.confidence ?? 0; i.lastSeen = i.lastSeen ?? null; i.nextReview = i.nextReview ?? null; i.favorite = i.favorite ?? false; }));

const CONJUGATIONS = {
  hablar:{type:"AR",english:"to speak",present:{yo:"hablo",tú:"hablas","él/ella":"habla",nosotros:"hablamos","ellos/ellas":"hablan"}},
  trabajar:{type:"AR",english:"to work",present:{yo:"trabajo",tú:"trabajas","él/ella":"trabaja",nosotros:"trabajamos","ellos/ellas":"trabajan"}},
  estudiar:{type:"AR",english:"to study",present:{yo:"estudio",tú:"estudias","él/ella":"estudia",nosotros:"estudiamos","ellos/ellas":"estudian"}},
  necesitar:{type:"AR",english:"to need",present:{yo:"necesito",tú:"necesitas","él/ella":"necesita",nosotros:"necesitamos","ellos/ellas":"necesitan"}},
  comprar:{type:"AR",english:"to buy",present:{yo:"compro",tú:"compras","él/ella":"compra",nosotros:"compramos","ellos/ellas":"compran"}},
  cocinar:{type:"AR",english:"to cook",present:{yo:"cocino",tú:"cocinas","él/ella":"cocina",nosotros:"cocinamos","ellos/ellas":"cocinan"}},
  caminar:{type:"AR",english:"to walk",present:{yo:"camino",tú:"caminas","él/ella":"camina",nosotros:"caminamos","ellos/ellas":"caminan"}},
  llamar:{type:"AR",english:"to call",present:{yo:"llamo",tú:"llamas","él/ella":"llama",nosotros:"llamamos","ellos/ellas":"llaman"}},
  comer:{type:"ER",english:"to eat",present:{yo:"como",tú:"comes","él/ella":"come",nosotros:"comemos","ellos/ellas":"comen"}},
  beber:{type:"ER",english:"to drink",present:{yo:"bebo",tú:"bebes","él/ella":"bebe",nosotros:"bebemos","ellos/ellas":"beben"}},
  leer:{type:"ER",english:"to read",present:{yo:"leo",tú:"lees","él/ella":"lee",nosotros:"leemos","ellos/ellas":"leen"}},
  correr:{type:"ER",english:"to run",present:{yo:"corro",tú:"corres","él/ella":"corre",nosotros:"corremos","ellos/ellas":"corren"}},
  aprender:{type:"ER",english:"to learn",present:{yo:"aprendo",tú:"aprendes","él/ella":"aprende",nosotros:"aprendemos","ellos/ellas":"aprenden"}},
  vivir:{type:"IR",english:"to live",present:{yo:"vivo",tú:"vives","él/ella":"vive",nosotros:"vivimos","ellos/ellas":"viven"}},
  escribir:{type:"IR",english:"to write",present:{yo:"escribo",tú:"escribes","él/ella":"escribe",nosotros:"escribimos","ellos/ellas":"escriben"}},
  abrir:{type:"IR",english:"to open",present:{yo:"abro",tú:"abres","él/ella":"abre",nosotros:"abrimos","ellos/ellas":"abren"}},
  recibir:{type:"IR",english:"to receive",present:{yo:"recibo",tú:"recibes","él/ella":"recibe",nosotros:"recibimos","ellos/ellas":"reciben"}},
  decidir:{type:"IR",english:"to decide",present:{yo:"decido",tú:"decides","él/ella":"decide",nosotros:"decidimos","ellos/ellas":"deciden"}},
  tener:{type:"irregular",english:"to have",present:{yo:"tengo",tú:"tienes","él/ella":"tiene",nosotros:"tenemos","ellos/ellas":"tienen"}},
  hacer:{type:"irregular",english:"to do / to make",present:{yo:"hago",tú:"haces","él/ella":"hace",nosotros:"hacemos","ellos/ellas":"hacen"}},
  ir:{type:"irregular",english:"to go",present:{yo:"voy",tú:"vas","él/ella":"va",nosotros:"vamos","ellos/ellas":"van"}},
  ser:{type:"irregular",english:"to be (permanent)",present:{yo:"soy",tú:"eres","él/ella":"es",nosotros:"somos","ellos/ellas":"son"}},
  estar:{type:"irregular",english:"to be (temporary)",present:{yo:"estoy",tú:"estás","él/ella":"está",nosotros:"estamos","ellos/ellas":"están"}},
  saber:{type:"irregular",english:"to know (facts)",present:{yo:"sé",tú:"sabes","él/ella":"sabe",nosotros:"sabemos","ellos/ellas":"saben"}},
  poner:{type:"irregular",english:"to put / place",present:{yo:"pongo",tú:"pones","él/ella":"pone",nosotros:"ponemos","ellos/ellas":"ponen"}},
};

const PRONOUNS = ["yo","tú","él/ella","nosotros","ellos/ellas"];

function normConj(s,pronoun) {
  let t = s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
  if(pronoun){const p=pronoun.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();t=t.replace(new RegExp("^"+p.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s+"),"");}
  return t;
}

function useSpeech() {
  const [listening,setListening]=useState(false);
  const [text,setText]=useState("");
  const [alts,setAlts]=useState([]);
  const recRef=useRef(null);
  const SR=typeof window!=="undefined"&&(window.SpeechRecognition||window.webkitSpeechRecognition);
  const supported=!!SR;

  const toggle=useCallback(()=>{
    if(!SR)return;
    if(listening){try{recRef.current&&recRef.current.stop()}catch(e){}setListening(false);return}
    try{
      const r=new SR();
      r.lang="es-US";r.continuous=false;r.interimResults=true;r.maxAlternatives=5;
      r.onresult=ev=>{
        let t="",finals=[];
        for(let i=0;i<ev.results.length;i++){
          t+=ev.results[i][0].transcript;
          if(ev.results[i].isFinal)for(let j=0;j<ev.results[i].length;j++)finals.push(ev.results[i][j].transcript);
        }
        setText(t);if(finals.length)setAlts(finals);
      };
      r.onerror=()=>setListening(false);
      r.onend=()=>setListening(false);
      r.start();recRef.current=r;setListening(true);
    }catch(e){setListening(false)}
  },[SR,listening]);

  const reset=useCallback(()=>{setText("");setAlts([])},[]);
  return {listening,text,alts,supported,toggle,setText,reset};
}

function shuffle(a) { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]} return b; }
function getNextReview(c) { return Date.now()+[0,1,3,7,14,30][Math.min(c,5)]*864e5; }
function isDue(i) { return !i.nextReview||Date.now()>=i.nextReview; }
function posLabel(p) { return {"verb-AR":"AR verb","verb-ER":"ER verb","verb-IR":"IR verb","verb-irregular":"Irregular",noun:"Noun",phrase:"Phrase",interjection:"Interj.",adjective:"Adj.",question:"Question",number:"Number",conjunction:"Conj.",adverb:"Adverb",custom:"Custom"}[p]||p; }
function confColor(c) { return c>=4?"#2d6a4f":c>=2?"#e09f3e":"#c1121f"; }
function confLabel(c) { return c>=4?"Mastered":c>=2?"Learning":"New"; }

const IC = {
  home:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  cards:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  build:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>,
  book:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  chart:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  drive:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 2 6.172 10H22l-6.172 10H2l6.172-10H2Z"/></svg>,
  plus:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  chk:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  xx:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  skip:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="5 4 15 12 5 20"/><line x1="19" y1="5" x2="19" y2="19"/></svg>,
  flip:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  filt:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  srch:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  del:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  arr:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  star:(f)=><svg width="16" height="16" viewBox="0 0 24 24" fill={f?"currentColor":"none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  gear:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  mic:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  conj:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16"/><path d="M4 12h10"/><path d="M4 17h7"/><path d="M18 14l3 3-3 3"/></svg>,
};

// Local parser: extracts vocabulary and sentences from lesson text
function parseLesson(text, fileId, fileName) {
  const lines = text.split(/\n/).map(l=>l.trim()).filter(Boolean);
  const vocab = [], sentences = [];
  let title = fileName.replace(/\.[^.]+$/,"");

  // Try to extract lesson number from filename or text (e.g., "Lesson 3.1", "L3.1", "Unit 2", "Lección 4.2")
  let lessonNum = null;
  const numFromFile = fileName.match(/(?:lesson|lección|lecci[oó]n|unit|unidad|^L)\s*(\d+(?:\.\d+)?)/i)
    || fileName.match(/(\d+(?:\.\d+)?)/);
  if(numFromFile) lessonNum = numFromFile[1];

  const numFromText = text.match(/^(?:lesson|lección|lecci[oó]n|unit|unidad)\s*(\d+(?:\.\d+)?)/im);
  if(!lessonNum && numFromText) lessonNum = numFromText[1];

  // Detect title from first line or "Lesson X:" / "Lección X:" patterns
  const titleMatch = text.match(/^(?:lesson|lección|unit|unidad)\s*[:\-–]?\s*(?:\d+(?:\.\d+)?\s*[:\-–]?\s*)?(.+)/im);
  if(titleMatch) title = titleMatch[1].trim();

  for(const line of lines) {
    // Match vocabulary patterns: "spanish - english", "spanish = english", "spanish: english", "spanish — english"
    const vocabMatch = line.match(/^[•\-\*\d.\)]*\s*([¿¡]?[a-záéíóúñü\s,()\/]+?)\s*[-=–—:]\s*(.+)$/i);
    if(vocabMatch) {
      const sp = vocabMatch[1].trim(), en = vocabMatch[2].trim().replace(/\s*\([^)]*\)\s*$/, x=>x).trim();
      if(sp && en && sp.length < 80 && en.length < 120) {
        // Detect part of speech
        let pos = "phrase";
        const spLow = sp.toLowerCase();
        if(/^(yo|tú|él|ella|usted|nosotros|ellos|ellas|ustedes)\s/.test(spLow)) pos = "phrase";
        else if(spLow.endsWith("ar")) pos = "verb-AR";
        else if(spLow.endsWith("er")) pos = "verb-ER";
        else if(spLow.endsWith("ir") && spLow !== "sir") pos = "verb-IR";
        else if(/^(el|la|los|las|un|una)\s/.test(spLow)) pos = "noun";
        else if(/^¿/.test(sp)) pos = "question";
        else if(/^\d+$/.test(sp) || /^(uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|veinte|treinta|cien)\b/i.test(sp)) pos = "number";
        else if(/^(y|o|pero|porque|sino|aunque|ni|que)\b$/i.test(sp)) pos = "conjunction";
        else if(sp.split(" ").length === 1 && !spLow.endsWith("ar") && !spLow.endsWith("er") && !spLow.endsWith("ir")) pos = "noun";

        // Detect irregular verbs
        if(pos.startsWith("verb") && /^(ser|estar|ir|tener|hacer|poder|saber|poner|venir|decir|salir|dar|ver|querer|conocer|traer|oír|caer)\b/i.test(spLow)) pos = "verb-irregular";

        // Build tags
        const tags = [pos.startsWith("verb")?pos.split("-")[1]:""].filter(Boolean);
        if(pos.startsWith("verb")) tags.push("verb");
        if(pos === "noun") tags.push("noun");

        vocab.push({ spanish: sp, english: en, pos, tags });
      }
    }

    // Match sentence patterns: lines with both Spanish chars and enough length
    const sentMatch = line.match(/^[•\-\*\d.\)]*\s*([¿¡]?[A-ZÁÉÍÓÚÑÜ][^-=–—]*[.?!])\s*[-=–—]\s*([A-Z][^-=–—]*[.?!])\s*$/);
    if(sentMatch) {
      sentences.push({ es: sentMatch[1].trim(), en: sentMatch[2].trim() });
    }
  }

  const lessonId = lessonNum || `d-${fileId.slice(0,6)}`;
  return {
    id: lessonId,
    title,
    date: new Date().toISOString().split("T")[0],
    sentences,
    items: vocab.map((v, i) => ({
      id: `d-${fileId}-${i}`,
      spanish: v.spanish,
      english: v.english,
      pos: v.pos,
      tags: v.tags.length ? v.tags : ["imported"],
      lesson: lessonId,
      confidence: 0,
      lastSeen: null,
      nextReview: null,
      favorite: false,
    })),
  };
}

// Get set of already-imported file IDs from localStorage
function getImported() { try{return JSON.parse(localStorage.getItem("lengua-imported")||"[]")}catch(e){return[]} }
function markImported(ids) { const prev=getImported(); localStorage.setItem("lengua-imported",JSON.stringify([...new Set([...prev,...ids])])) }

// Sync with Google Drive: scan folder, download & parse new files, update lessons
async function syncDrive(ds, lessons, setLessons, setSync) {
  if(!ds.folderId||!ds.apiKey) return;
  setSync(s=>({...s, syncing:true}));
  try {
    const r = await fetch(`https://www.googleapis.com/drive/v3/files?q='${ds.folderId}'+in+parents+and+trashed=false&key=${ds.apiKey}&fields=files(id,name,mimeType,modifiedTime)`);
    if(!r.ok) throw new Error(`Drive API ${r.status}`);
    const data = await r.json();
    const files = data.files||[];
    const imported = getImported();
    const newFiles = files.filter(f=>!imported.includes(f.id));

    let added = 0;
    for(const f of newFiles) {
      try {
        let txt = "";
        if(f.mimeType==="application/vnd.google-apps.document") {
          const er = await fetch(`https://www.googleapis.com/drive/v3/files/${f.id}/export?mimeType=text/plain&key=${ds.apiKey}`);
          if(!er.ok) continue;
          txt = await er.text();
        } else {
          const dr = await fetch(`https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${ds.apiKey}`);
          if(!dr.ok) continue;
          txt = await dr.text();
        }
        const lesson = parseLesson(txt, f.id, f.name);
        if(lesson.items.length) {
          setLessons(p=>{const x=p.findIndex(l=>l.id===lesson.id);if(x>=0){const n=[...p];n[x]=lesson;return n}return[...p,lesson]});
          added += lesson.items.length;
        }
        markImported([f.id]);
      } catch(e) { /* skip file on error */ }
    }
    setSync({syncing:false, lastSync:Date.now(), newFiles:newFiles.length, newWords:added, totalFiles:files.length});
  } catch(e) {
    setSync(s=>({...s, syncing:false, error:e.message}));
  }
}

function useIsMobile(bp=768) {
  const [mob, setMob] = useState(()=>typeof window!=="undefined"&&window.innerWidth<bp);
  useEffect(()=>{const h=()=>setMob(window.innerWidth<bp);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h)},[bp]);
  return mob;
}

const IC_menu=<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IC_close=<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

export default function App() {
  const [view, setView] = useState("home");
  const [lessons, setLessons] = useState(LESSONS);
  const [custom, setCustom] = useState([]);
  const [pf, setPf] = useState({ lesson:"all", verbType:"all" });
  const [pm, setPm] = useState("es-en");
  const [hist, setHist] = useState([]);
  const [ds, setDs] = useState(()=>{try{const v=JSON.parse(localStorage.getItem("lengua-drive")||"null");return v&&v.folderId?v:{folderId:"",apiKey:""}}catch(e){return{folderId:"",apiKey:""}}});
  const [sideOpen, setSideOpen] = useState(false);
  const [driveSync, setDriveSync] = useState({syncing:false,lastSync:null,newFiles:0});
  const [conjProg, setConjProg] = useState(()=>{try{return JSON.parse(localStorage.getItem("lengua-conj-progress")||"{}")}catch(e){return{}}});

  // Persist conjugation progress
  useEffect(()=>{localStorage.setItem("lengua-conj-progress",JSON.stringify(conjProg))},[conjProg]);
  const updConj = useCallback((key,correct)=>{setConjProg(p=>{const prev=p[key]||{confidence:0,lastSeen:null,nextReview:null};const nc=correct?Math.min(prev.confidence+1,5):Math.max(prev.confidence-1,0);return{...p,[key]:{confidence:nc,lastSeen:Date.now(),nextReview:getNextReview(nc)}}})},[]);

  // Persist drive settings
  useEffect(()=>{if(ds.folderId||ds.apiKey)localStorage.setItem("lengua-drive",JSON.stringify(ds))},[ds]);

  // Auto-sync on mount when credentials exist
  useEffect(()=>{if(ds.folderId&&ds.apiKey){syncDrive(ds,lessons,setLessons,setDriveSync)}},[]);// eslint-disable-line react-hooks/exhaustive-deps
  const mob = useIsMobile();

  const all = useMemo(()=>[...lessons.flatMap(l=>l.items),...custom],[lessons,custom]);
  const sents = useMemo(()=>lessons.flatMap(l=>(l.sentences||[]).map(s=>({...s,lesson:l.id}))),[lessons]);
  const fi = useMemo(()=>{let r=all;if(pf.lesson!=="all")r=r.filter(i=>i.lesson===pf.lesson);if(pf.verbType!=="all")r=r.filter(i=>i.tags.includes(pf.verbType));return r},[all,pf]);
  const fs = useMemo(()=>pf.lesson!=="all"&&pf.lesson!=="custom"?sents.filter(s=>s.lesson===pf.lesson):sents,[sents,pf]);
  const st = useMemo(()=>{const t=all.length,m=all.filter(i=>i.confidence>=4).length,l=all.filter(i=>i.confidence>=2&&i.confidence<4).length;return{total:t,mastered:m,learning:l,newItems:t-m-l,due:all.filter(isDue).length}},[all]);

  const upd = useCallback((id,u)=>{setLessons(p=>p.map(l=>({...l,items:l.items.map(i=>i.id===id?{...i,...u}:i)})));setCustom(p=>p.map(i=>i.id===id?{...i,...u}:i))},[]);
  const addC = useCallback(w=>setCustom(p=>[...p,{...w,id:`c${Date.now()}${Math.random().toString(36).slice(2,5)}`,confidence:0,lastSeen:null,nextReview:null,favorite:false,lesson:"custom",tags:w.tags||["custom"],pos:w.pos||"custom"}]),[]);
  const delC = useCallback(id=>setCustom(p=>p.filter(w=>w.id!==id)),[]);
  const nav = useCallback(id=>{setView(id);setSideOpen(false)},[]);

  return (
    <div style={Z.app}><style>{CSS}</style>
      {mob&&<header style={Z.mobHead}>
        <button style={Z.hamBtn} onClick={()=>setSideOpen(true)}>{IC_menu}</button>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{...Z.logo,width:30,height:30,fontSize:17}}>ñ</div><span style={{fontSize:16,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#1d3557"}}>Lengua</span></div>
        <div style={{...Z.badgeN,width:24,height:24,fontSize:11}}>{st.due}</div>
      </header>}
      {mob&&sideOpen&&<div style={Z.overlay} onClick={()=>setSideOpen(false)}/>}
      <nav style={mob?{...Z.side,...Z.sideMob,...(sideOpen?Z.sideOpen:{})}:Z.side}>
        <div style={Z.sHead}>
          <div style={Z.logo}>ñ</div><div><div style={Z.logoT}>Lengua</div><div style={Z.logoS}>tu español</div></div>
          {mob&&<button style={{...Z.hamBtn,marginLeft:"auto",color:"#fff"}} onClick={()=>setSideOpen(false)}>{IC_close}</button>}
        </div>
        <div style={Z.sNav}>
          {[["home","Inicio",IC.home],["practice","Tarjetas",IC.cards],["sentences","Oraciones",IC.build],["conjugation","Conjugación",IC.conj],["dictionary","Diccionario",IC.book],["progress","Progreso",IC.chart],["drive","Drive",IC.drive],["settings","Settings",IC.gear]].map(([id,lb,ic])=>(
            <button key={id} onClick={()=>nav(id)} style={{...Z.nBtn,...(view===id?Z.nAct:{})}}><span style={{opacity:view===id?1:.6}}>{ic}</span><span>{lb}</span></button>
          ))}
        </div>
        <div style={Z.sFoot}><div style={Z.badge}><span style={Z.badgeN}>{st.due}</span><span style={Z.badgeL}>Due for review</span></div></div>
      </nav>
      <main style={{...Z.main,...(mob?{paddingTop:56}:{})}}>
        {view==="home"&&<Home st={st} lessons={lessons} all={all} go={nav} sf={setPf} mob={mob}/>}
        {view==="practice"&&<Flashcards fi={fi} pf={pf} sf={setPf} pm={pm} spm={setPm} lessons={lessons} upd={upd} sh={setHist} mob={mob}/>}
        {view==="sentences"&&<Sentences fs={fs} pf={pf} sf={setPf} lessons={lessons} mob={mob}/>}
        {view==="conjugation"&&<Conjugacion conjProg={conjProg} updConj={updConj} mob={mob}/>}
        {view==="dictionary"&&<Dict all={all} custom={custom} addC={addC} delC={delC} upd={upd} lessons={lessons} mob={mob}/>}
        {view==="progress"&&<Prog st={st} all={all} lessons={lessons} hist={hist} mob={mob}/>}
        {view==="drive"&&<Drive ds={ds} sds={setDs} lessons={lessons} sl={setLessons} mob={mob} sync={driveSync} onSync={()=>syncDrive(ds,lessons,setLessons,setDriveSync)}/>}
        {view==="settings"&&<Settings mob={mob}/>}
      </main>
    </div>
  );
}

function Home({st,lessons,all,go,sf,mob}) {
  const str = all.filter(i=>i.confidence===0&&i.lastSeen).slice(0,5);
  return <div style={mob?Z.pgM:Z.pg}>
    <h1 style={mob?Z.h1M:Z.h1}>¡Bienvenido!</h1><p style={Z.sub}>Your Spanish learning dashboard</p>
    <div style={mob?Z.sgM:Z.sg}>{[["Total Words",st.total,"#264653"],["Mastered",st.mastered,"#2d6a4f"],["Learning",st.learning,"#e09f3e"],["Due Today",st.due,"#c1121f"]].map(([l,v,c])=><div key={l} style={{...Z.sc,borderLeft:`4px solid ${c}`}}><div style={{fontSize:mob?22:28,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:c}}>{v}</div><div style={{fontSize:mob?12:13,color:"#868e96",marginTop:2}}>{l}</div></div>)}</div>
    <div style={mob?Z.tcM:Z.tc}>
      <div style={mob?Z.cardM:Z.card}><h3 style={Z.ch}>Lessons</h3>
        {lessons.map(l=>{const m=l.items.filter(i=>i.confidence>=4).length,p=Math.round(m/l.items.length*100);return <button key={l.id} style={Z.lRow} onClick={()=>{sf({lesson:l.id,verbType:"all"});go("practice")}}>
          <div><div style={{fontSize:11,fontWeight:600,color:"#e76f51",letterSpacing:.5}}>LESSON {l.id}</div><div style={{fontSize:14,fontWeight:500,color:"#264653"}}>{l.title}</div></div>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={Z.bO}><div style={{...Z.bI,width:`${p}%`}}/></div><span style={{fontSize:13,fontWeight:600,color:"#495057",minWidth:36,textAlign:"right"}}>{p}%</span></div>
        </button>})}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div style={mob?Z.cardM:Z.card}><h3 style={Z.ch}>Quick Practice</h3>
          {[["All Vocabulary","all","all","practice"],["AR Verbs","all","AR","practice"],["Irregular Verbs","all","irregular","practice"],["Sentence Builder","all","all","sentences"],["Conjugation Practice","all","all","conjugation"]].map(([lb,l,v,vw])=>(
            <button key={lb} style={Z.qBtn} onClick={()=>{sf({lesson:l,verbType:v});go(vw)}}><span>{lb}</span>{IC.arr}</button>
          ))}
        </div>
        {str.length>0&&<div style={mob?Z.cardM:Z.card}><h3 style={Z.ch}>Needs Work</h3>{str.map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f0f0f0",fontSize:14}}><span style={{fontWeight:600,color:"#1d3557"}}>{i.spanish}</span><span style={{color:"#868e96"}}>{i.english}</span></div>)}</div>}
      </div>
    </div>
  </div>;
}

function Flashcards({fi,pf,sf,pm,spm,lessons,upd,sh,mob}) {
  const [dk,setDk]=useState([]);const [idx,setIdx]=useState(0);const [fl,setFl]=useState(false);const [ss,setSs]=useState({c:0,w:0,s:0});const [on,setOn]=useState(false);
  const go=useCallback(()=>{const d=fi.filter(isDue);setDk(shuffle(d.length>0?d:fi).slice(0,20));setIdx(0);setFl(false);setSs({c:0,w:0,s:0});setOn(true)},[fi]);
  const cd=dk[idx],done=idx>=dk.length&&on;
  const ans=useCallback(t=>{if(!cd)return;const n=Date.now();if(t==="k"){const nc=Math.min(cd.confidence+1,5);upd(cd.id,{confidence:nc,lastSeen:n,nextReview:getNextReview(nc)});setSs(s=>({...s,c:s.c+1}))}else if(t==="w"){upd(cd.id,{confidence:Math.max(cd.confidence-1,0),lastSeen:n,nextReview:getNextReview(0)});setSs(s=>({...s,w:s.w+1}))}else setSs(s=>({...s,s:s.s+1}));setFl(false);setIdx(i=>i+1)},[cd,upd]);
  useEffect(()=>{const h=e=>{if(!on||done)return;if(e.code==="Space"){e.preventDefault();setFl(f=>!f)}if(fl&&e.key==="1")ans("k");if(fl&&e.key==="2")ans("w");if(e.key==="3")ans("s")};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h)},[on,fl,done,ans]);

  return <div style={mob?Z.pgM:Z.pg}>
    <h1 style={mob?Z.h1M:Z.h1}>Tarjetas</h1><p style={Z.sub}>Flashcard practice with spaced repetition</p>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:mob?"flex-start":"center",gap:mob?8:12,marginBottom:16,flexWrap:"wrap",flexDirection:mob?"column":"row"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",width:mob?"100%":"auto"}}>{IC.filt}
        <select style={{...Z.sel,...(mob?{flex:1,fontSize:12}:{})}} value={pf.lesson} onChange={e=>sf(f=>({...f,lesson:e.target.value}))}><option value="all">All Lessons</option>{lessons.map(l=><option key={l.id} value={l.id}>L{l.id} – {l.title}</option>)}<option value="custom">Custom</option></select>
        <select style={{...Z.sel,...(mob?{fontSize:12}:{})}} value={pf.verbType} onChange={e=>sf(f=>({...f,verbType:e.target.value}))}><option value="all">All Types</option><option value="AR">AR</option><option value="ER">ER</option><option value="IR">IR</option><option value="irregular">Irregular</option></select>
      </div>
      <div style={{display:"flex",gap:4}}>{["es-en","en-es"].map(m=><button key={m} style={{padding:mob?"6px 10px":"6px 14px",borderRadius:6,border:"1px solid #dee2e6",background:pm===m?"#1d3557":"#fff",color:pm===m?"#fff":"#868e96",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} onClick={()=>spm(m)}>{m==="es-en"?"ES→EN":"EN→ES"}</button>)}</div>
    </div>
    <p style={{fontSize:13,color:"#868e96",marginBottom:20}}>{fi.length} cards · {fi.filter(isDue).length} due</p>
    {!on&&!done&&<div style={{textAlign:"center",padding:mob?"40px 0":"60px 0"}}><button style={mob?Z.startBtnM:Z.startBtn} onClick={go} disabled={!fi.length}>Start Practice</button><p style={{fontSize:13,color:"#868e96",marginTop:12}}>Up to 20 cards · Due items first</p></div>}
    {on&&!done&&cd&&<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:mob?8:12,width:"100%",maxWidth:540,marginBottom:mob?12:20,fontSize:13,color:"#868e96"}}><span>{idx+1}/{dk.length}</span><div style={{flex:1,height:4,background:"#e9ecef",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",background:"linear-gradient(90deg,#e76f51,#f4a261)",borderRadius:2,width:`${idx/dk.length*100}%`,transition:"width .3s"}}/></div><span style={{color:"#2d6a4f"}}>✓{ss.c}</span><span style={{color:"#c1121f"}}>✗{ss.w}</span></div>
      <div style={mob?Z.fcM:Z.fc} onClick={()=>setFl(f=>!f)} className="fch">
        <button onClick={e=>{e.stopPropagation();upd(cd.id,{favorite:!cd.favorite})}} style={{position:"absolute",top:mob?10:16,right:mob?10:16,background:"none",border:"none",cursor:"pointer",color:"#f4a261",padding:4}}>{IC.star(cd.favorite)}</button>
        <div style={Z.cLbl}>{fl?(pm==="es-en"?"ENGLISH":"ESPAÑOL"):(pm==="es-en"?"ESPAÑOL":"ENGLISH")}</div>
        <div style={mob?Z.cWordM:Z.cWord}>{fl?(pm==="es-en"?cd.english:cd.spanish):(pm==="es-en"?cd.spanish:cd.english)}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}><span style={Z.posT}>{posLabel(cd.pos)}</span><span style={Z.lesT}>L{cd.lesson}</span><span style={{fontSize:11,fontWeight:600,color:confColor(cd.confidence)}}>{confLabel(cd.confidence)}</span></div>
        {!fl&&<div style={{display:"flex",alignItems:"center",gap:6,marginTop:mob?16:24,fontSize:13,color:"#adb5bd"}}>{IC.flip} Tap to flip{!mob&&" · Space"}</div>}
      </div>
      {fl&&<div style={{display:"flex",gap:mob?6:10,marginTop:mob?12:20,width:"100%",maxWidth:540,flexDirection:mob?"column":"row"}}>
        <button style={{...Z.aBtn,background:"#d8f3dc",color:"#2d6a4f"}} onClick={()=>ans("k")}>{IC.chk} Know it</button>
        <button style={{...Z.aBtn,background:"#fde8e8",color:"#c1121f"}} onClick={()=>ans("w")}>{IC.xx} Needs work</button>
        <button style={{...Z.aBtn,background:"#e9ecef",color:"#495057"}} onClick={()=>ans("s")}>{IC.skip} Skip</button>
      </div>}
    </div>}
    {done&&<ResultCard c={ss.c} w={ss.w} s={ss.s} again={go} finish={()=>{sh(p=>[...p,{date:Date.now(),correct:ss.c,wrong:ss.w,skipped:ss.s}]);setOn(false);setDk([]);setIdx(0)}} title="¡Bien hecho!" labels={["Knew it","Needs work","Skipped"]} mob={mob}/>}
  </div>;
}

function Sentences({fs,pf,sf,lessons,mob}) {
  const [q,setQ]=useState([]);const [ci,setCi]=useState(0);const [placed,setPlaced]=useState([]);const [avail,setAvail]=useState([]);const [res,setRes]=useState(null);const [on,setOn]=useState(false);const [sc,setSc]=useState({c:0,w:0,t:0});const [hint,setHint]=useState(false);
  const [mode,setMode]=useState("build");const [typed,setTyped]=useState("");
  const speech=useSpeech();const typedRef=useRef(null);

  const setup=s=>{const w=s.es.match(/[¿¡]?[\wáéíóúñüÁÉÍÓÚÑÜ]+[.,?!]?/gi)||[];setPlaced([]);setAvail(shuffle(w.map((x,i)=>({id:i,word:x}))));setRes(null);setHint(false);setTyped("");speech.reset()};
  const go=useCallback(()=>{const qq=shuffle(fs).slice(0,10);setQ(qq);setCi(0);setSc({c:0,w:0,t:qq.length});setOn(true);setRes(null);if(qq.length)setup(qq[0]);if(mode==="type")setTimeout(()=>typedRef.current&&typedRef.current.focus(),100)},[fs,mode]);
  const cur=q[ci],done=ci>=q.length&&on;
  const add=w=>{setPlaced(p=>[...p,w]);setAvail(a=>a.filter(x=>x.id!==w.id))};
  const rem=w=>{setAvail(a=>[...a,w]);setPlaced(p=>p.filter(x=>x.id!==w.id))};
  const normS=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[¿¡.,?!]/g,"").replace(/\s+/g," ").trim().toLowerCase();
  const check=()=>{
    if(!cur)return;
    if(speech.listening)speech.toggle();
    const att=mode==="type"?typed:placed.map(w=>w.word).join(" ");
    const expected=normS(cur.es);
    let correct=normS(att)===expected;
    if(!correct&&mode==="type"&&speech.alts.length)correct=speech.alts.some(a=>normS(a)===expected);
    if(correct){setRes("y");setSc(s=>({...s,c:s.c+1}))}else{setRes("n");setSc(s=>({...s,w:s.w+1}))}
  };
  const next=()=>{const n=ci+1;setCi(n);if(n<q.length)setup(q[n]);if(mode==="type")setTimeout(()=>typedRef.current&&typedRef.current.focus(),50)};
  const hasInput=mode==="type"?typed.trim().length>0:placed.length>0;

  // sync speech text into typed input
  useEffect(()=>{if(speech.text&&mode==="type")setTyped(speech.text)},[speech.text,mode]);

  // keyboard: Enter to check/next in type mode
  useEffect(()=>{
    if(mode!=="type"||!on||done)return;
    const h=e=>{if(e.key==="Enter"){e.preventDefault();if(res)next();else if(typed.trim())check()}};
    window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);
  },[mode,on,done,res,typed,check,next]);

  const modeBtn=(m,label)=>({padding:mob?"6px 10px":"6px 14px",borderRadius:6,border:"1px solid #dee2e6",background:mode===m?"#1d3557":"#fff",color:mode===m?"#fff":"#868e96",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"});

  return <div style={mob?Z.pgM:Z.pg}>
    <h1 style={mob?Z.h1M:Z.h1}>Oraciones</h1><p style={Z.sub}>Build or type sentences in Spanish</p>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:mob?"flex-start":"center",gap:mob?8:12,marginBottom:16,flexWrap:"wrap",flexDirection:mob?"column":"row"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,width:mob?"100%":"auto"}}>{IC.filt}<select style={{...Z.sel,...(mob?{flex:1}:{})}} value={pf.lesson} onChange={e=>sf(f=>({...f,lesson:e.target.value}))}><option value="all">All Lessons</option>{lessons.map(l=><option key={l.id} value={l.id}>L{l.id} – {l.title}</option>)}</select></div>
      <div style={{display:"flex",gap:4}}><button style={modeBtn("build")} onClick={()=>setMode("build")}>Build</button><button style={modeBtn("type")} onClick={()=>setMode("type")}>Type / Speak</button></div>
    </div>
    <p style={{fontSize:13,color:"#868e96",marginBottom:20}}>{fs.length} sentences available</p>
    {!on&&<div style={{textAlign:"center",padding:mob?"40px 0":"60px 0"}}><button style={mob?Z.startBtnM:Z.startBtn} onClick={go} disabled={!fs.length}>Start Sentence Practice</button><p style={{fontSize:13,color:"#868e96",marginTop:12}}>{mode==="build"?"Read the English · Build the Spanish":"Read the English · Type or speak the Spanish"}</p></div>}
    {on&&!done&&cur&&<div style={{maxWidth:640,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:mob?8:12,marginBottom:mob?16:24,fontSize:13,color:"#868e96"}}><span>{ci+1}/{q.length}</span><div style={{flex:1,height:4,background:"#e9ecef",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",background:"linear-gradient(90deg,#e76f51,#f4a261)",borderRadius:2,width:`${ci/q.length*100}%`,transition:"width .3s"}}/></div><span style={{color:"#2d6a4f"}}>✓{sc.c}</span><span style={{color:"#c1121f"}}>✗{sc.w}</span></div>
      <div style={{...Z.prompt,...(mob?{padding:"20px 16px"}:{})}}><div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:"#868e96",marginBottom:8}}>TRANSLATE TO SPANISH</div><div style={{fontSize:mob?18:22,fontWeight:600,fontFamily:"'DM Serif Display',serif",color:"#1d3557",lineHeight:1.4}}>{cur.en}</div><div style={{fontSize:12,color:"#adb5bd",marginTop:8}}>Lesson {cur.lesson}</div></div>

      {mode==="build"&&<>
        <div style={Z.drop}>{!placed.length&&<span style={{color:"#ccc",fontSize:mob?13:14,fontStyle:"italic"}}>Tap words to build the sentence...</span>}{placed.map(w=><button key={w.id} onClick={()=>!res&&rem(w)} style={{...Z.chip,...(mob?{padding:"6px 12px",fontSize:14}:{}),...(res==="y"?{background:"#d8f3dc",borderColor:"#2d6a4f",color:"#2d6a4f"}:{}),...(res==="n"?{background:"#fde8e8",borderColor:"#c1121f",color:"#c1121f"}:{}),cursor:res?"default":"pointer"}}>{w.word}</button>)}</div>
        {!res&&<div style={Z.bank}>{avail.map(w=><button key={w.id} onClick={()=>add(w)} style={{...Z.chipB,...(mob?{padding:"6px 12px",fontSize:14}:{})}}>{w.word}</button>)}{!avail.length&&placed.length>0&&<span style={{color:"#adb5bd",fontSize:13}}>All words placed!</span>}</div>}
      </>}

      {mode==="type"&&<div style={{marginBottom:16}}>
        <div style={Z.conjInput}>
          <input ref={typedRef} style={{...Z.conjInp,fontSize:16,textAlign:"left",...(res==="y"?{borderColor:"#2d6a4f",background:"#f0faf0"}:{}),...(res==="n"?{borderColor:"#c1121f",background:"#fef5f5"}:{})}} value={typed} onChange={e=>!res&&setTyped(e.target.value)} placeholder="Type or speak the sentence..." disabled={!!res} autoComplete="off" autoCapitalize="off" spellCheck="false"/>
          {speech.supported&&<button onClick={speech.toggle} className={speech.listening?"mic-pulse":""} style={{...Z.micBtn,...(speech.listening?Z.micBtnActive:{})}}>{IC.mic}</button>}
        </div>
        {speech.listening&&<div style={{fontSize:12,color:"#c1121f",marginTop:6,textAlign:"center"}}>Listening... speak now</div>}
      </div>}

      {!res&&<div style={{display:"flex",gap:mob?6:10,marginTop:mob?12:20,justifyContent:"center",flexWrap:"wrap"}}>
        <button style={{...Z.aBtn,background:"#1d3557",color:"#fff",maxWidth:mob?"100%":200,flex:mob?"1 1 100%":"1"}} onClick={check} disabled={!hasInput}>Check Answer</button>
        {mode==="build"&&<button style={{...Z.aBtn,background:"#f0f0f0",color:"#495057",maxWidth:mob?"48%":140,flex:mob?"1":"1"}} onClick={()=>setHint(true)}>Hint</button>}
        <button style={{...Z.aBtn,background:"#f0f0f0",color:"#495057",maxWidth:mob?"48%":140,flex:mob?"1":"1"}} onClick={()=>{if(speech.listening)speech.toggle();setRes("n");setSc(s=>({...s,w:s.w+1}))}}>Skip</button>
      </div>}
      {hint&&!res&&mode==="build"&&<div style={{marginTop:12,padding:"12px 16px",background:"#fef3cd",borderRadius:8,fontSize:14,color:"#856404",textAlign:"center"}}>First word: <strong>{(cur.es.match(/[¿¡]?[\wáéíóúñüÁÉÍÓÚÑÜ]+/i)||[""])[0]}</strong></div>}
      {res&&<div style={{marginTop:20,textAlign:"center"}}>
        {res==="y"&&<div style={{fontSize:18,fontWeight:700,color:"#2d6a4f",marginBottom:8}}>✓ ¡Correcto!</div>}
        {res==="n"&&<div><div style={{fontSize:18,fontWeight:700,color:"#c1121f",marginBottom:8}}>✗ Not quite</div><div style={{padding:"12px 16px",background:"#f0f7f0",borderRadius:8,fontSize:15,color:"#2d6a4f",marginBottom:8}}>Correct: <strong>{cur.es}</strong></div></div>}
        <button style={{...(mob?Z.startBtnM:Z.startBtn),marginTop:12}} onClick={next}>Next →</button>
      </div>}
    </div>}
    {done&&<ResultCard c={sc.c} w={sc.w} again={go} finish={()=>setOn(false)} title="¡Terminado!" labels={["Correct","Incorrect"]} mob={mob}/>}
  </div>;
}

function Dict({all,custom,addC,delC,upd,lessons,mob}) {
  const [s,setS]=useState("");const [fl,setFl]=useState("all");const [show,setShow]=useState(false);const [nw,setNw]=useState({spanish:"",english:"",notes:"",context:"general"});
  const [sort,setSort]=useState({col:"spanish",dir:"asc"});
  const [editing,setEditing]=useState(null);const [editVals,setEditVals]=useState({});
  const posOpts=["noun","verb-AR","verb-ER","verb-IR","verb-irregular","phrase","interjection","adjective","question","number","conjunction","adverb","custom"];
  const confFromLabel=v=>v==="Mastered"?4:v==="Learning"?2:0;
  const toggleSort=col=>{setSort(p=>p.col===col?{col,dir:p.dir==="asc"?"desc":"asc"}:{col,dir:"asc"})};
  const sortArrow=col=>sort.col===col?(sort.dir==="asc"?" \u25B2":" \u25BC"):"";
  const startEdit=i=>{setEditing(i.id);setEditVals({spanish:i.spanish,english:i.english,pos:i.pos,lesson:i.lesson,status:confLabel(i.confidence)})};
  const saveEdit=id=>{const u={spanish:editVals.spanish,english:editVals.english,pos:editVals.pos,lesson:editVals.lesson,confidence:confFromLabel(editVals.status)};upd(id,u);setEditing(null)};
  const cancelEdit=()=>setEditing(null);
  const f=useMemo(()=>{let r=all;if(fl!=="all")r=r.filter(i=>i.lesson===fl);if(s){const q=s.toLowerCase();r=r.filter(i=>i.spanish.toLowerCase().includes(q)||i.english.toLowerCase().includes(q))}const sc=sort.col;const dir=sort.dir==="asc"?1:-1;return [...r].sort((a,b)=>{let av,bv;if(sc==="spanish"||sc==="english"){av=a[sc].toLowerCase();bv=b[sc].toLowerCase();return av.localeCompare(bv,"es")*dir}if(sc==="type"){av=posLabel(a.pos);bv=posLabel(b.pos);return av.localeCompare(bv)*dir}if(sc==="source"){av=a.lesson==="custom"?"Custom":`L${a.lesson}`;bv=b.lesson==="custom"?"Custom":`L${b.lesson}`;return av.localeCompare(bv)*dir}if(sc==="status"){av=a.confidence;bv=b.confidence;return (av-bv)*dir}return 0})},[all,fl,s,sort]);
  const add=()=>{if(nw.spanish&&nw.english){addC(nw);setNw({spanish:"",english:"",notes:"",context:"general"});setShow(false)}};
  const thStyle={flex:2,cursor:"pointer",userSelect:"none"};const thStyle1={flex:1,cursor:"pointer",userSelect:"none"};
  const editInp={padding:"6px 8px",borderRadius:6,border:"1px solid #dee2e6",fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",color:"#264653",background:"#fff",width:"100%",boxSizing:"border-box"};
  const editSel={...editInp,cursor:"pointer"};
  const savBtnS={padding:"5px 14px",borderRadius:6,border:"none",background:"#2d6a4f",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"};
  const canBtnS={padding:"5px 14px",borderRadius:6,border:"1px solid #dee2e6",background:"#fff",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",color:"#495057"};

  return <div style={mob?Z.pgM:Z.pg}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:mob?"flex-start":"center",marginBottom:mob?16:24,gap:mob?8:0,flexWrap:"wrap"}}><div><h1 style={mob?Z.h1M:Z.h1}>Diccionario</h1><p style={{...Z.sub,marginBottom:mob?8:24}}>{all.length} words</p></div><button style={Z.addBtn} onClick={()=>setShow(x=>!x)}>{IC.plus} Add Word</button></div>
    {show&&<div style={{...(mob?Z.cardM:Z.card),marginBottom:16}}>
      <h3 style={{margin:"0 0 12px",fontWeight:600,fontSize:15}}>Add Custom Word</h3>
      <div style={{display:"flex",gap:10,marginBottom:8,flexDirection:mob?"column":"row"}}><input style={Z.inp} placeholder="Spanish" value={nw.spanish} onChange={e=>setNw(w=>({...w,spanish:e.target.value}))}/><input style={Z.inp} placeholder="English" value={nw.english} onChange={e=>setNw(w=>({...w,english:e.target.value}))}/></div>
      <div style={{display:"flex",gap:10,marginBottom:8,flexDirection:mob?"column":"row"}}><input style={Z.inp} placeholder="Notes (optional)" value={nw.notes} onChange={e=>setNw(w=>({...w,notes:e.target.value}))}/><select style={Z.sel} value={nw.context} onChange={e=>setNw(w=>({...w,context:e.target.value}))}><option value="general">General</option><option value="work">Work</option><option value="family">Family</option><option value="travel">Travel</option></select></div>
      <div style={{display:"flex",gap:8}}><button style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#2d6a4f",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} onClick={add}>Save</button><button style={{padding:"8px 20px",borderRadius:8,border:"1px solid #dee2e6",background:"#fff",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",color:"#495057"}} onClick={()=>setShow(false)}>Cancel</button></div>
    </div>}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:mob?8:12,marginBottom:16,flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:8,border:"1px solid #dee2e6",background:"#fff",flex:1,maxWidth:mob?"100%":320,color:"#868e96"}}>{IC.srch}<input style={{border:"none",outline:"none",fontSize:13,fontFamily:"'DM Sans',sans-serif",flex:1,color:"#264653",background:"transparent"}} placeholder="Search..." value={s} onChange={e=>setS(e.target.value)}/></div>
      <select style={Z.sel} value={fl} onChange={e=>setFl(e.target.value)}><option value="all">All</option>{lessons.map(l=><option key={l.id} value={l.id}>L{l.id}</option>)}<option value="custom">Custom</option></select>
      {mob&&<select style={Z.sel} value={sort.col} onChange={e=>toggleSort(e.target.value)}><option value="spanish">Sort: Spanish{sortArrow("spanish")}</option><option value="english">Sort: English{sortArrow("english")}</option><option value="type">Sort: Type{sortArrow("type")}</option><option value="source">Sort: Source{sortArrow("source")}</option><option value="status">Sort: Status{sortArrow("status")}</option></select>}
    </div>
    {mob?<div style={{display:"flex",flexDirection:"column",gap:8}}>
      {f.map(i=>editing===i.id?<div key={i.id} style={{background:"#fff",borderRadius:10,padding:"14px 16px",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
          <div><label style={{fontSize:11,fontWeight:600,color:"#868e96",textTransform:"uppercase",letterSpacing:.5}}>Spanish</label><input style={editInp} value={editVals.spanish} onChange={e=>setEditVals(v=>({...v,spanish:e.target.value}))}/></div>
          <div><label style={{fontSize:11,fontWeight:600,color:"#868e96",textTransform:"uppercase",letterSpacing:.5}}>English</label><input style={editInp} value={editVals.english} onChange={e=>setEditVals(v=>({...v,english:e.target.value}))}/></div>
          <div><label style={{fontSize:11,fontWeight:600,color:"#868e96",textTransform:"uppercase",letterSpacing:.5}}>Type</label><select style={editSel} value={editVals.pos} onChange={e=>setEditVals(v=>({...v,pos:e.target.value}))}>{posOpts.map(p=><option key={p} value={p}>{posLabel(p)}</option>)}</select></div>
          <div><label style={{fontSize:11,fontWeight:600,color:"#868e96",textTransform:"uppercase",letterSpacing:.5}}>Source</label><select style={editSel} value={editVals.lesson} onChange={e=>setEditVals(v=>({...v,lesson:e.target.value}))}>{lessons.map(l=><option key={l.id} value={l.id}>L{l.id}</option>)}<option value="custom">Custom</option></select></div>
          <div><label style={{fontSize:11,fontWeight:600,color:"#868e96",textTransform:"uppercase",letterSpacing:.5}}>Status</label><select style={editSel} value={editVals.status} onChange={e=>setEditVals(v=>({...v,status:e.target.value}))}><option>New</option><option>Learning</option><option>Mastered</option></select></div>
        </div>
        <div style={{display:"flex",gap:8}}><button style={savBtnS} onClick={()=>saveEdit(i.id)}>Save</button><button style={canBtnS} onClick={cancelEdit}>Cancel</button></div>
      </div>:<div key={i.id} style={{background:"#fff",borderRadius:10,padding:"14px 16px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",cursor:"pointer"}} onClick={()=>startEdit(i)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
          <div><div style={{fontSize:16,fontWeight:600,color:"#1d3557"}}>{i.spanish}</div><div style={{fontSize:14,color:"#495057",marginTop:2}}>{i.english}</div></div>
          <div style={{display:"flex",gap:4}}><button style={Z.iBtn} onClick={e=>{e.stopPropagation();upd(i.id,{favorite:!i.favorite})}}>{IC.star(i.favorite)}</button>{i.lesson==="custom"&&<button style={Z.iBtn} onClick={e=>{e.stopPropagation();delC(i.id)}}>{IC.del}</button>}</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}><span style={Z.posT}>{posLabel(i.pos)}</span><span style={Z.lesT}>{i.lesson==="custom"?"Custom":`L${i.lesson}`}</span><span style={{display:"flex",alignItems:"center",gap:4,fontSize:12}}><span style={{width:7,height:7,borderRadius:"50%",background:confColor(i.confidence),display:"inline-block"}}/>{confLabel(i.confidence)}</span></div>
      </div>)}
      {!f.length&&<div style={{padding:"40px 20px",textAlign:"center",color:"#adb5bd",fontSize:14}}>No words match</div>}
    </div>
    :<div style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
      <div style={{display:"flex",padding:"12px 20px",fontSize:11,fontWeight:700,letterSpacing:.5,textTransform:"uppercase",color:"#868e96",background:"#fafaf8",borderBottom:"1px solid #e9ecef"}}><span style={thStyle} onClick={()=>toggleSort("spanish")}>Spanish{sortArrow("spanish")}</span><span style={thStyle} onClick={()=>toggleSort("english")}>English{sortArrow("english")}</span><span style={thStyle1} onClick={()=>toggleSort("type")}>Type{sortArrow("type")}</span><span style={thStyle1} onClick={()=>toggleSort("source")}>Source{sortArrow("source")}</span><span style={thStyle1} onClick={()=>toggleSort("status")}>Status{sortArrow("status")}</span><span style={{width:80}}/></div>
      {f.map(i=>editing===i.id?<div key={i.id} style={{display:"flex",alignItems:"center",padding:"8px 20px",fontSize:14,borderBottom:"1px solid #f0f0f0",gap:8}}>
        <span style={{flex:2}}><input style={editInp} value={editVals.spanish} onChange={e=>setEditVals(v=>({...v,spanish:e.target.value}))}/></span>
        <span style={{flex:2}}><input style={editInp} value={editVals.english} onChange={e=>setEditVals(v=>({...v,english:e.target.value}))}/></span>
        <span style={{flex:1}}><select style={editSel} value={editVals.pos} onChange={e=>setEditVals(v=>({...v,pos:e.target.value}))}>{posOpts.map(p=><option key={p} value={p}>{posLabel(p)}</option>)}</select></span>
        <span style={{flex:1}}><select style={editSel} value={editVals.lesson} onChange={e=>setEditVals(v=>({...v,lesson:e.target.value}))}>{lessons.map(l=><option key={l.id} value={l.id}>L{l.id}</option>)}<option value="custom">Custom</option></select></span>
        <span style={{flex:1}}><select style={editSel} value={editVals.status} onChange={e=>setEditVals(v=>({...v,status:e.target.value}))}><option>New</option><option>Learning</option><option>Mastered</option></select></span>
        <span style={{width:80,display:"flex",gap:4,justifyContent:"flex-end"}}><button style={savBtnS} onClick={()=>saveEdit(i.id)}>Save</button><button style={canBtnS} onClick={cancelEdit}>{"\u2715"}</button></span>
      </div>:<div key={i.id} style={{display:"flex",alignItems:"center",padding:"12px 20px",fontSize:14,borderBottom:"1px solid #f0f0f0",cursor:"pointer"}} onClick={()=>startEdit(i)}>
        <span style={{flex:2,fontWeight:600,color:"#1d3557"}}>{i.spanish}</span><span style={{flex:2,color:"#495057"}}>{i.english}</span><span style={{flex:1}}><span style={Z.posT}>{posLabel(i.pos)}</span></span><span style={{flex:1,color:"#868e96"}}>{i.lesson==="custom"?"Custom":`L${i.lesson}`}</span>
        <span style={{flex:1,display:"flex",alignItems:"center",gap:4,fontSize:13}}><span style={{width:8,height:8,borderRadius:"50%",background:confColor(i.confidence),display:"inline-block"}}/>{confLabel(i.confidence)}</span>
        <span style={{width:80,display:"flex",gap:4,justifyContent:"flex-end"}}><button style={Z.iBtn} onClick={e=>{e.stopPropagation();upd(i.id,{favorite:!i.favorite})}}>{IC.star(i.favorite)}</button>{i.lesson==="custom"&&<button style={Z.iBtn} onClick={e=>{e.stopPropagation();delC(i.id)}}>{IC.del}</button>}</span>
      </div>)}
      {!f.length&&<div style={{padding:"40px 20px",textAlign:"center",color:"#adb5bd",fontSize:14}}>No words match</div>}
    </div>}
  </div>;
}

function Prog({st,all,lessons,hist,mob}) {
  const vb=useMemo(()=>["AR","ER","IR","irregular"].map(t=>{const i=all.filter(x=>x.tags.includes(t)),m=i.filter(x=>x.confidence>=4).length;return{type:t,total:i.length,m,pct:i.length?Math.round(m/i.length*100):0}}),[all]);
  const pct=st.total?Math.round(st.mastered/st.total*100):0,r=44,c=2*Math.PI*r,off=c-pct/100*c;
  return <div style={mob?Z.pgM:Z.pg}>
    <h1 style={mob?Z.h1M:Z.h1}>Progreso</h1><p style={Z.sub}>Track your learning journey</p>
    <div style={mob?Z.sgM:Z.sg}>{[["Total",st.total,"#264653"],["Mastered",st.mastered,"#2d6a4f"],["Learning",st.learning,"#e09f3e"],["New",st.newItems,"#c1121f"]].map(([l,v,c])=><div key={l} style={{...Z.sc,borderLeft:`4px solid ${c}`}}><div style={{fontSize:mob?22:28,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:c}}>{v}</div><div style={{fontSize:mob?12:13,color:"#868e96",marginTop:2}}>{l}</div></div>)}</div>
    <div style={mob?Z.cardM:Z.card}>
      <h3 style={Z.ch}>Overall Mastery</h3>
      <div style={{display:"flex",alignItems:"center",gap:mob?20:32,padding:"8px 0",flexDirection:mob?"column":"row"}}>
        <svg width="110" height="110" viewBox="0 0 110 110"><circle cx="55" cy="55" r={r} fill="none" stroke="#e9ecef" strokeWidth="8"/><circle cx="55" cy="55" r={r} fill="none" stroke="#2d6a4f" strokeWidth="8" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" transform="rotate(-90 55 55)" style={{transition:"stroke-dashoffset .6s"}}/><text x="55" y="55" textAnchor="middle" dominantBaseline="central" style={{fontSize:20,fontWeight:700,fill:"#264653",fontFamily:"'DM Sans',sans-serif"}}>{pct}%</text></svg>
        <div style={{textAlign:mob?"center":"left"}}><div style={{fontSize:14,color:"#495057",marginBottom:8}}>{st.mastered} of {st.total} words mastered</div><div style={{display:"flex",gap:16,justifyContent:mob?"center":"flex-start"}}>{[["#2d6a4f","Mastered"],["#e09f3e","Learning"],["#c1121f","New"]].map(([c,l])=><span key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:13}}><span style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block"}}/>{l}</span>)}</div></div>
      </div>
    </div>
    <div style={{...(mob?Z.tcM:Z.tc),marginTop:16}}>
      <div style={mob?Z.cardM:Z.card}><h3 style={Z.ch}>Verb Types</h3>{vb.map(v=><div key={v.type} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:14,marginBottom:4}}><span style={{fontWeight:600}}>{v.type}</span><span style={{color:"#868e96"}}>{v.m}/{v.total}</span></div><div style={Z.bO}><div style={{...Z.bI,width:`${v.pct}%`}}/></div></div>)}</div>
      <div style={mob?Z.cardM:Z.card}><h3 style={Z.ch}>By Lesson</h3>{lessons.map(l=>{const m=l.items.filter(i=>i.confidence>=4).length,p=Math.round(m/l.items.length*100);return <div key={l.id} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:14,marginBottom:4}}><span style={{fontWeight:600}}>L{l.id}</span><span style={{color:"#868e96"}}>{p}%</span></div><div style={Z.bO}><div style={{...Z.bI,width:`${p}%`}}/></div></div>})}</div>
    </div>
    {hist.length>0&&<div style={{...(mob?Z.cardM:Z.card),marginTop:16}}><h3 style={Z.ch}>Recent Sessions</h3>{hist.slice(-5).reverse().map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f0f0f0",fontSize:14}}><span style={{color:"#495057"}}>{new Date(s.date).toLocaleDateString()}</span><div style={{display:"flex",gap:mob?10:16}}><span style={{color:"#2d6a4f"}}>✓{s.correct}</span><span style={{color:"#c1121f"}}>✗{s.wrong}</span><span style={{color:"#868e96"}}>⟫{s.skipped}</span></div></div>)}</div>}
  </div>;
}

function Drive({ds,sds,mob,sync,onSync}) {
  const [showSetup,setShowSetup]=useState(!ds.folderId||!ds.apiKey);
  const connected=!!(ds.folderId&&ds.apiKey);
  const imported=getImported();

  const disconnect=()=>{sds({folderId:"",apiKey:""});localStorage.removeItem("lengua-drive");localStorage.removeItem("lengua-imported");setShowSetup(true)};
  const resync=()=>{localStorage.removeItem("lengua-imported");onSync()};

  return <div style={mob?Z.pgM:Z.pg}>
    <h1 style={mob?Z.h1M:Z.h1}>Google Drive Sync</h1><p style={Z.sub}>Automatically import vocabulary from your homework folder</p>

    {connected&&<div style={{...(mob?Z.cardM:Z.card),marginBottom:16,borderLeft:"4px solid #2d6a4f"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{width:10,height:10,borderRadius:"50%",background:sync.syncing?"#e09f3e":"#2d6a4f",display:"inline-block"}}/>
          <span style={{fontSize:14,fontWeight:600,color:"#1d3557"}}>{sync.syncing?"Syncing...":"Connected"}</span>
        </div>
        <button style={{padding:"6px 14px",borderRadius:6,border:"1px solid #dee2e6",background:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",color:"#495057"}} onClick={onSync} disabled={sync.syncing}>Sync Now</button>
      </div>
      {sync.lastSync&&<div style={{marginTop:10,fontSize:13,color:"#868e96"}}>
        Last sync: {new Date(sync.lastSync).toLocaleString()} · {sync.totalFiles||0} files in folder · {imported.length} imported
      </div>}
      {sync.newWords>0&&<div style={{marginTop:6,fontSize:13,color:"#2d6a4f",fontWeight:600}}>+{sync.newWords} new words added from {sync.newFiles} new file{sync.newFiles!==1?"s":""}</div>}
      {sync.newFiles===0&&sync.lastSync&&!sync.syncing&&<div style={{marginTop:6,fontSize:13,color:"#868e96"}}>Everything up to date</div>}
      {sync.error&&<div style={{marginTop:6,fontSize:13,color:"#c1121f"}}>{sync.error}</div>}
    </div>}

    {connected&&<div style={{...(mob?Z.cardM:Z.card),marginBottom:16}}>
      <h3 style={Z.ch}>How it works</h3>
      <div style={{fontSize:14,color:"#495057",lineHeight:1.7}}>
        <p style={{marginBottom:8}}>Your Drive folder is linked. New homework documents are automatically detected and parsed each time you open the app.</p>
        <p style={{marginBottom:8}}>Format your docs with vocabulary like:</p>
        <div style={{background:"#fafaf8",borderRadius:8,padding:"12px 16px",fontSize:13,fontFamily:"monospace",color:"#264653",marginBottom:8,lineHeight:1.6}}>
          hola - hello<br/>buenos días - good morning<br/>hablar - to speak<br/>el libro - the book
        </div>
        <p style={{fontSize:13,color:"#868e96"}}>Supports patterns: <code>word - translation</code>, <code>word = translation</code>, <code>word: translation</code></p>
      </div>
    </div>}

    {connected&&<div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
      <button style={{padding:"8px 16px",borderRadius:6,border:"1px solid #dee2e6",background:"#fff",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",color:"#495057"}} onClick={()=>setShowSetup(x=>!x)}>{showSetup?"Hide":"Edit"} Settings</button>
      <button style={{padding:"8px 16px",borderRadius:6,border:"1px solid #dee2e6",background:"#fff",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",color:"#495057"}} onClick={resync}>Re-import All Files</button>
      <button style={{padding:"8px 16px",borderRadius:6,border:"1px solid #fde8e8",background:"#fff",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",color:"#c1121f"}} onClick={disconnect}>Disconnect</button>
    </div>}

    {showSetup&&<>
      {!connected&&<div style={{...(mob?Z.cardM:Z.card),marginBottom:16}}><h3 style={Z.ch}>One-time Setup</h3><ol style={{fontSize:mob?13:14,color:"#495057",lineHeight:1.8,paddingLeft:20,margin:0}}>
        <li>Create a folder in Google Drive for your homework docs</li>
        <li>Share it as <strong>"Anyone with the link"</strong> (Viewer)</li>
        <li>Copy the folder ID from the URL (the part after <code>/folders/</code>)</li>
        <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener" style={{color:"#e76f51"}}>Google Cloud Console</a> → New Project → Enable <strong>Google Drive API</strong> → Create <strong>API Key</strong></li>
        <li>Paste both below and hit Connect</li>
      </ol></div>}
      <div style={{...(mob?Z.cardM:Z.card),marginBottom:16}}><h3 style={Z.ch}>{connected?"Settings":"Connection"}</h3>
        <div style={{marginBottom:10}}><label style={{fontSize:12,fontWeight:600,color:"#495057",display:"block",marginBottom:4}}>Folder ID</label><input style={{...Z.inp,width:"100%"}} placeholder="1aBcDeFgHiJk..." value={ds.folderId} onChange={e=>sds(s=>({...s,folderId:e.target.value}))}/></div>
        <div style={{marginBottom:14}}><label style={{fontSize:12,fontWeight:600,color:"#495057",display:"block",marginBottom:4}}>API Key</label><input style={{...Z.inp,width:"100%"}} type="password" placeholder="AIza..." value={ds.apiKey} onChange={e=>sds(s=>({...s,apiKey:e.target.value}))}/></div>
        <button style={mob?Z.startBtnM:Z.startBtn} onClick={()=>{setShowSetup(false);onSync()}} disabled={!ds.folderId||!ds.apiKey||sync.syncing}>{sync.syncing?"Connecting...":"Connect & Sync"}</button>
      </div>
    </>}
  </div>;
}

function Conjugacion({conjProg,updConj,mob}) {
  const [dk,setDk]=useState([]);const [idx,setIdx]=useState(0);const [inp,setInp]=useState("");const [res,setRes]=useState(null);const [ss,setSs]=useState({c:0,w:0});const [on,setOn]=useState(false);
  const [filtType,setFiltType]=useState("all");const [filtPron,setFiltPron]=useState("all");
  const inpRef=useRef(null);
  const speech=useSpeech();

  const cards=useMemo(()=>{
    let list=[];
    for(const [verb,data] of Object.entries(CONJUGATIONS)){
      if(filtType!=="all"&&data.type!==filtType)continue;
      for(const pron of PRONOUNS){
        if(filtPron!=="all"&&pron!==filtPron)continue;
        const key=verb+"-"+pron;
        const prog=conjProg[key]||{confidence:0,lastSeen:null,nextReview:null};
        list.push({verb,pron,answer:data.present[pron],type:data.type,english:data.english,key,...prog});
      }
    }
    return list;
  },[filtType,filtPron,conjProg]);

  const dueCount=cards.filter(c=>!c.nextReview||Date.now()>=c.nextReview).length;

  const go=useCallback(()=>{
    const due=cards.filter(c=>!c.nextReview||Date.now()>=c.nextReview);
    setDk(shuffle(due.length>0?due:cards).slice(0,20));setIdx(0);setInp("");setRes(null);setSs({c:0,w:0});setOn(true);
    setTimeout(()=>inpRef.current&&inpRef.current.focus(),100);
  },[cards]);

  const cd=dk[idx],done=idx>=dk.length&&on;

  const check=useCallback(()=>{
    if(!cd||res)return;
    if(speech.listening)speech.toggle();
    const expected=normConj(cd.answer,null);
    let correct=normConj(inp,cd.pron)===expected;
    if(!correct&&speech.alts.length)correct=speech.alts.some(a=>normConj(a,cd.pron)===expected);
    setRes(correct?"y":"n");updConj(cd.key,correct);setSs(s=>({...s,[correct?"c":"w"]:s[correct?"c":"w"]+1}));
  },[cd,inp,res,updConj,speech]);

  const next=useCallback(()=>{
    setRes(null);setInp("");speech.reset();setIdx(i=>i+1);
    setTimeout(()=>inpRef.current&&inpRef.current.focus(),50);
  },[speech]);

  // sync speech text into input (user can edit before submitting)
  useEffect(()=>{if(speech.text)setInp(speech.text)},[speech.text]);

  // keyboard: Enter=check/next, Escape=skip
  useEffect(()=>{
    const h=e=>{
      if(!on||done)return;
      if(e.key==="Enter"){e.preventDefault();if(res)next();else check()}
      if(e.key==="Escape"&&!res){setRes("n");updConj(cd.key,false);setSs(s=>({...s,w:s.w+1}))}
    };
    window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);
  },[on,done,res,check,next,cd,updConj]);

  const typeBadgeColor={AR:"#e76f51",ER:"#2a9d8f",IR:"#264653",irregular:"#9b2226"};

  return <div style={mob?Z.pgM:Z.pg}>
    <h1 style={mob?Z.h1M:Z.h1}>Conjugación</h1><p style={Z.sub}>Practice verb conjugations — type or speak your answer</p>

    {!on&&!done&&<>
      <div style={{...(mob?Z.cardM:Z.card),marginBottom:16}}>
        <h3 style={Z.ch}>Filters</h3>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:12}}>
          <div><label style={{fontSize:12,fontWeight:600,color:"#495057",display:"block",marginBottom:4}}>Verb Type</label>
            <select style={Z.sel} value={filtType} onChange={e=>setFiltType(e.target.value)}><option value="all">All Types</option><option value="AR">AR</option><option value="ER">ER</option><option value="IR">IR</option><option value="irregular">Irregular</option></select>
          </div>
          <div><label style={{fontSize:12,fontWeight:600,color:"#495057",display:"block",marginBottom:4}}>Pronoun</label>
            <select style={Z.sel} value={filtPron} onChange={e=>setFiltPron(e.target.value)}><option value="all">All Pronouns</option>{PRONOUNS.map(p=><option key={p} value={p}>{p}</option>)}</select>
          </div>
        </div>
        <p style={{fontSize:13,color:"#868e96"}}>{cards.length} cards · {dueCount} due</p>
      </div>
      <div style={{textAlign:"center",padding:mob?"40px 0":"60px 0"}}><button style={mob?Z.startBtnM:Z.startBtn} onClick={go} disabled={!cards.length}>Start Practice</button><p style={{fontSize:13,color:"#868e96",marginTop:12}}>Up to 20 cards · Due items first</p></div>
    </>}

    {on&&!done&&cd&&<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:mob?8:12,width:"100%",maxWidth:540,marginBottom:mob?12:20,fontSize:13,color:"#868e96"}}><span>{idx+1}/{dk.length}</span><div style={{flex:1,height:4,background:"#e9ecef",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",background:"linear-gradient(90deg,#e76f51,#f4a261)",borderRadius:2,width:`${idx/dk.length*100}%`,transition:"width .3s"}}/></div><span style={{color:"#2d6a4f"}}>✓{ss.c}</span><span style={{color:"#c1121f"}}>✗{ss.w}</span></div>
      <div style={mob?Z.conjCardM:Z.conjCard}>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:12,flexWrap:"wrap"}}>
          <span style={{...Z.posT,background:typeBadgeColor[cd.type]||"#e9ecef",color:"#fff"}}>{cd.type}</span>
        </div>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:"#868e96",textTransform:"uppercase",marginBottom:8}}>CONJUGATE</div>
        <div style={{fontSize:mob?28:34,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#1d3557",marginBottom:4}}>{cd.verb}</div>
        <div style={{fontSize:14,color:"#868e96",marginBottom:16}}>{cd.english}</div>
        <div style={Z.pronoun}>{cd.pron}</div>
        <div style={Z.conjInput}>
          <input ref={inpRef} style={{...Z.conjInp,...(res==="y"?{borderColor:"#2d6a4f",background:"#f0faf0"}:{}),...(res==="n"?{borderColor:"#c1121f",background:"#fef5f5"}:{})}} value={inp} onChange={e=>!res&&setInp(e.target.value)} placeholder="Type conjugation..." disabled={!!res} autoComplete="off" autoCapitalize="off" spellCheck="false"/>
          {speech.supported&&<button onClick={speech.toggle} className={speech.listening?"mic-pulse":""} style={{...Z.micBtn,...(speech.listening?Z.micBtnActive:{})}}>{IC.mic}</button>}
        </div>
        {!res&&<div style={{display:"flex",gap:mob?6:10,marginTop:16,width:"100%",justifyContent:"center",flexDirection:mob?"column":"row"}}>
          <button style={{...Z.aBtn,background:"#1d3557",color:"#fff",maxWidth:mob?"100%":200}} onClick={check} disabled={!inp.trim()}>Check</button>
          <button style={{...Z.aBtn,background:"#f0f0f0",color:"#495057",maxWidth:mob?"100%":140}} onClick={()=>{setRes("n");updConj(cd.key,false);setSs(s=>({...s,w:s.w+1}))}}>Skip</button>
        </div>}
        {res==="y"&&<div style={{marginTop:16,fontSize:18,fontWeight:700,color:"#2d6a4f"}}>Correct!</div>}
        {res==="n"&&<div style={{marginTop:16,textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:"#c1121f",marginBottom:6}}>Incorrect</div><div style={{fontSize:15,color:"#495057"}}>Correct answer: <strong style={{color:"#2d6a4f"}}>{cd.answer}</strong></div></div>}
        {res&&<button style={{...(mob?Z.startBtnM:Z.startBtn),marginTop:16}} onClick={next}>Next →</button>}
      </div>
    </div>}

    {done&&<ResultCard c={ss.c} w={ss.w} again={go} finish={()=>{setOn(false);setDk([]);setIdx(0)}} title="¡Bien hecho!" labels={["Correct","Incorrect"]} mob={mob}/>}
  </div>;
}

function ResultCard({c,w,s,again,finish,title,labels,mob}) {
  const btn=mob?Z.startBtnM:Z.startBtn;
  return <div style={{display:"flex",justifyContent:"center",padding:mob?"20px 0":"40px 0"}}><div style={mob?Z.resCardM:Z.resCard}>
    <h2 style={{fontSize:mob?26:32,fontFamily:"'DM Serif Display',serif",color:"#1d3557"}}>{title}</h2>
    <p style={{fontSize:14,color:"#868e96",margin:"4px 0 24px"}}>Session Complete</p>
    <div style={{display:"flex",justifyContent:"center",gap:mob?20:32}}>
      {[[c,"#2d6a4f",labels[0]],[w,"#c1121f",labels[1]],...(s!=null?[[s,"#666",labels[2]]]:[])].map(([n,cl,l])=><div key={l} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,fontSize:13,color:"#495057"}}><span style={{fontSize:mob?28:36,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:cl}}>{n}</span><span>{l}</span></div>)}
    </div>
    <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:24,flexDirection:mob?"column":"row"}}><button style={btn} onClick={again}>Again</button><button style={{...btn,background:"#4a4e69"}} onClick={finish}>Finish</button></div>
  </div></div>;
}

const CHANGELOG = [
  {
    version: "1.5.1", date: "2026-02-09",
    added: [
      "Conjugation Practice page — present-tense verb conjugations for 25 verbs (125 cards)",
      "Speech recognition input on Conjugation and Sentences pages (Chrome, Edge, Safari)",
      "Type / Speak mode for Sentences — type or dictate full sentences instead of word arrangement",
      "Continuous speech recognition with real-time interim results for better accuracy",
      "Filter conjugations by verb type (AR/ER/IR/Irregular) and pronoun",
      "Spaced repetition for conjugation progress with localStorage persistence",
    ],
  },
  {
    version: "1.4.0", date: "2026-02-09",
    added: [
      "Sortable dictionary columns — click any column header to sort ascending/descending",
      "Inline editing — click any word row to edit all fields with Save/Cancel",
    ],
  },
  {
    version: "1.3.0", date: "2026-02-09",
    added: ["In-app Settings page with changelog visible to all users"],
  },
  {
    version: "1.2.0", date: "2026-02-09",
    added: [
      "Auto-sync Google Drive integration — link a folder once, new docs are automatically imported on each app load",
      "Local vocabulary parser — works offline, no external API needed",
      "Credentials and import history saved to localStorage",
      "Sync Now, Re-import All, and Disconnect controls",
    ],
    removed: ["Anthropic API dependency for document parsing", "Manual per-file Import button workflow"],
  },
  {
    version: "1.1.0", date: "2026-02-09",
    added: [
      "Full mobile responsiveness for phone-friendly experience",
      "Collapsible sidebar with hamburger menu on mobile",
      "Fixed mobile header bar with logo and due-count badge",
      "Card-based dictionary layout on mobile",
      "Responsive typography, padding, and stacked layouts",
    ],
  },
  {
    version: "1.0.0", date: "2026-02-09",
    added: [
      "Initial release of Lengua Spanish Learning App",
      "6 built-in lessons: greetings, AR/ER/IR verbs, irregular verbs, numbers, questions",
      "Flashcard practice with spaced repetition",
      "Sentence builder exercises",
      "Vocabulary dictionary with search and filtering",
      "Progress tracking with mastery stats",
      "GitHub Pages deployment",
    ],
  },
];

function Settings({mob}) {
  return <div style={mob?Z.pgM:Z.pg}>
    <h1 style={mob?Z.h1M:Z.h1}>Settings</h1><p style={Z.sub}>App info and changelog</p>

    <div style={{...(mob?Z.cardM:Z.card),marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <div style={Z.logo}>ñ</div>
        <div>
          <div style={{fontSize:18,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#1d3557"}}>Lengua</div>
          <div style={{fontSize:13,color:"#868e96"}}>Version {CHANGELOG[0].version}</div>
        </div>
      </div>
      <p style={{fontSize:14,color:"#495057",lineHeight:1.6}}>A Spanish vocabulary and sentence practice app with spaced repetition and Google Drive sync.</p>
    </div>

    <div style={{...(mob?Z.cardM:Z.card)}}>
      <h3 style={Z.ch}>Changelog</h3>
      {CHANGELOG.map(rel=><div key={rel.version} style={{marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <span style={{fontSize:16,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#1d3557"}}>v{rel.version}</span>
          <span style={{fontSize:12,color:"#868e96",padding:"2px 8px",background:"#f0f0f0",borderRadius:4}}>{rel.date}</span>
        </div>
        {rel.added&&<div style={{marginBottom:8}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:.5,color:"#2d6a4f",marginBottom:4}}>ADDED</div>
          {rel.added.map((item,i)=><div key={i} style={{fontSize:14,color:"#495057",padding:"4px 0 4px 14px",borderLeft:"2px solid #d8f3dc",marginBottom:2,lineHeight:1.5}}>{item}</div>)}
        </div>}
        {rel.changed&&<div style={{marginBottom:8}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:.5,color:"#e09f3e",marginBottom:4}}>CHANGED</div>
          {rel.changed.map((item,i)=><div key={i} style={{fontSize:14,color:"#495057",padding:"4px 0 4px 14px",borderLeft:"2px solid #fef3cd",marginBottom:2,lineHeight:1.5}}>{item}</div>)}
        </div>}
        {rel.fixed&&<div style={{marginBottom:8}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:.5,color:"#264653",marginBottom:4}}>FIXED</div>
          {rel.fixed.map((item,i)=><div key={i} style={{fontSize:14,color:"#495057",padding:"4px 0 4px 14px",borderLeft:"2px solid #dee2e6",marginBottom:2,lineHeight:1.5}}>{item}</div>)}
        </div>}
        {rel.removed&&<div style={{marginBottom:8}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:.5,color:"#c1121f",marginBottom:4}}>REMOVED</div>
          {rel.removed.map((item,i)=><div key={i} style={{fontSize:14,color:"#495057",padding:"4px 0 4px 14px",borderLeft:"2px solid #fde8e8",marginBottom:2,lineHeight:1.5}}>{item}</div>)}
        </div>}
      </div>)}
    </div>
  </div>;
}

const CSS=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Serif+Display&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif;background:#f8f7f4;color:#264653;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#ccc;border-radius:3px}
.fch{cursor:pointer;transition:transform .15s,box-shadow .15s}.fch:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.12)}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}.mic-pulse{animation:pulse 1.2s ease-in-out infinite}
@media(max-width:768px){.fch:hover{transform:none;box-shadow:0 8px 32px rgba(0,0,0,.08)}}`;

const Z={
  app:{display:"flex",minHeight:"100vh",background:"#f8f7f4"},
  side:{width:210,background:"#1d3557",color:"#fff",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",flexShrink:0},
  sideMob:{position:"fixed",top:0,left:0,bottom:0,width:260,height:"100vh",zIndex:1000,transform:"translateX(-100%)",transition:"transform .25s ease",boxShadow:"4px 0 24px rgba(0,0,0,.3)"},
  sideOpen:{transform:"translateX(0)"},
  overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.4)",zIndex:999,animation:"fadeIn .2s ease"},
  mobHead:{position:"fixed",top:0,left:0,right:0,height:56,background:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",zIndex:900,boxShadow:"0 1px 4px rgba(0,0,0,.08)",borderBottom:"1px solid #e9ecef"},
  hamBtn:{background:"none",border:"none",cursor:"pointer",padding:6,display:"flex",alignItems:"center",justifyContent:"center",color:"#1d3557"},
  sHead:{padding:"24px 18px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(255,255,255,.08)"},
  logo:{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#e76f51,#f4a261)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#fff"},
  logoT:{fontSize:17,fontWeight:700,fontFamily:"'DM Serif Display',serif",letterSpacing:.3},
  logoS:{fontSize:11,opacity:.5,letterSpacing:.5},
  sNav:{padding:"16px 10px",flex:1,display:"flex",flexDirection:"column",gap:2},
  nBtn:{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,border:"none",background:"transparent",color:"#fff",fontSize:14,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textAlign:"left",width:"100%",transition:"background .15s"},
  nAct:{background:"rgba(255,255,255,.12)"},
  sFoot:{padding:"16px 18px",borderTop:"1px solid rgba(255,255,255,.08)"},
  badge:{background:"rgba(231,111,81,.15)",borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:8},
  badgeN:{background:"#e76f51",color:"#fff",borderRadius:6,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700},
  badgeL:{fontSize:12,opacity:.7},
  main:{flex:1,overflow:"auto"},
  pg:{maxWidth:960,margin:"0 auto",padding:"32px 32px 64px",animation:"fadeIn .3s ease"},
  pgM:{maxWidth:960,margin:"0 auto",padding:"16px 14px 40px",animation:"fadeIn .3s ease"},
  h1:{fontSize:30,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#1d3557",marginBottom:4},
  h1M:{fontSize:24,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#1d3557",marginBottom:4},
  sub:{fontSize:15,color:"#868e96",marginBottom:24},
  sg:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:24},
  sgM:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:20},
  sc:{background:"#fff",borderRadius:10,padding:"18px 20px",boxShadow:"0 1px 3px rgba(0,0,0,.05)"},
  card:{background:"#fff",borderRadius:12,padding:"20px 24px",boxShadow:"0 1px 3px rgba(0,0,0,.05)"},
  cardM:{background:"#fff",borderRadius:10,padding:"16px 14px",boxShadow:"0 1px 3px rgba(0,0,0,.05)"},
  ch:{fontSize:16,fontWeight:700,marginBottom:16,fontFamily:"'DM Sans',sans-serif",color:"#1d3557"},
  tc:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},
  tcM:{display:"grid",gridTemplateColumns:"1fr",gap:12},
  lRow:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderRadius:8,border:"none",background:"#fafaf8",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",width:"100%",textAlign:"left",transition:"background .15s",marginBottom:4},
  bO:{width:80,height:6,background:"#e9ecef",borderRadius:3,overflow:"hidden"},
  bI:{height:"100%",background:"linear-gradient(90deg,#2d6a4f,#52b788)",borderRadius:3,transition:"width .4s"},
  qBtn:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderRadius:8,border:"1px solid #e9ecef",background:"#fafaf8",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,color:"#264653",width:"100%",marginBottom:6},
  sel:{padding:"8px 12px",borderRadius:8,border:"1px solid #dee2e6",background:"#fff",fontSize:13,fontFamily:"'DM Sans',sans-serif",color:"#495057",cursor:"pointer",outline:"none"},
  startBtn:{padding:"14px 36px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#e76f51,#f4a261)",color:"#fff",fontSize:16,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",boxShadow:"0 4px 16px rgba(231,111,81,.3)",transition:"transform .15s"},
  startBtnM:{padding:"14px 24px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#e76f51,#f4a261)",color:"#fff",fontSize:15,fontWeight:700,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",boxShadow:"0 4px 16px rgba(231,111,81,.3)",width:"100%"},
  fc:{width:"100%",maxWidth:540,minHeight:300,background:"#fff",borderRadius:16,padding:"40px 36px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:"0 8px 32px rgba(0,0,0,.08)",userSelect:"none"},
  fcM:{width:"100%",minHeight:220,background:"#fff",borderRadius:14,padding:"28px 20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",boxShadow:"0 6px 24px rgba(0,0,0,.08)",userSelect:"none"},
  cLbl:{fontSize:11,fontWeight:700,letterSpacing:2,color:"#868e96",textTransform:"uppercase",marginBottom:12},
  cWord:{fontSize:32,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#1d3557",textAlign:"center",lineHeight:1.3,marginBottom:20},
  cWordM:{fontSize:24,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#1d3557",textAlign:"center",lineHeight:1.3,marginBottom:16},
  posT:{fontSize:11,fontWeight:600,padding:"3px 8px",borderRadius:4,background:"#e9ecef",color:"#495057"},
  lesT:{fontSize:11,fontWeight:600,padding:"3px 8px",borderRadius:4,background:"#dfe8f5",color:"#1d3557"},
  aBtn:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"14px 0",borderRadius:10,border:"none",fontSize:14,fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"},
  resCard:{background:"#fff",borderRadius:16,padding:"48px 56px",textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,.08)",maxWidth:480,width:"100%"},
  resCardM:{background:"#fff",borderRadius:14,padding:"32px 20px",textAlign:"center",boxShadow:"0 6px 24px rgba(0,0,0,.08)",width:"100%"},
  prompt:{background:"#fff",borderRadius:12,padding:"28px 32px",boxShadow:"0 4px 20px rgba(0,0,0,.06)",marginBottom:20,textAlign:"center"},
  drop:{minHeight:64,background:"#fafaf8",border:"2px dashed #dee2e6",borderRadius:12,padding:"16px 20px",display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",justifyContent:"center",marginBottom:12},
  bank:{minHeight:48,padding:"12px 16px",display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",justifyContent:"center"},
  chip:{padding:"8px 16px",borderRadius:8,border:"2px solid #1d3557",background:"#e8f0fe",color:"#1d3557",fontSize:15,fontWeight:600,fontFamily:"'DM Sans',sans-serif",transition:"all .15s"},
  chipB:{padding:"8px 16px",borderRadius:8,border:"2px solid #dee2e6",background:"#fff",color:"#264653",fontSize:15,fontWeight:500,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",transition:"all .15s"},
  addBtn:{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",borderRadius:8,border:"none",background:"#1d3557",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"},
  inp:{flex:1,padding:"10px 14px",borderRadius:8,border:"1px solid #dee2e6",fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",color:"#264653",background:"#fff"},
  iBtn:{background:"none",border:"none",cursor:"pointer",color:"#adb5bd",padding:2,display:"flex",alignItems:"center"},
  conjCard:{width:"100%",maxWidth:540,background:"#fff",borderRadius:16,padding:"40px 36px",display:"flex",flexDirection:"column",alignItems:"center",boxShadow:"0 8px 32px rgba(0,0,0,.08)"},
  conjCardM:{width:"100%",background:"#fff",borderRadius:14,padding:"28px 20px",display:"flex",flexDirection:"column",alignItems:"center",boxShadow:"0 6px 24px rgba(0,0,0,.08)"},
  conjInput:{display:"flex",gap:8,alignItems:"center",width:"100%",maxWidth:360},
  conjInp:{flex:1,padding:"12px 16px",borderRadius:10,border:"2px solid #dee2e6",fontSize:18,fontFamily:"'DM Sans',sans-serif",textAlign:"center",outline:"none",color:"#264653",background:"#fff",transition:"border-color .2s, background .2s"},
  micBtn:{width:44,height:44,borderRadius:"50%",border:"2px solid #dee2e6",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#868e96",transition:"all .2s",flexShrink:0},
  micBtnActive:{borderColor:"#c1121f",background:"#fde8e8",color:"#c1121f"},
  pronoun:{fontSize:28,fontWeight:700,fontFamily:"'DM Serif Display',serif",color:"#e76f51",marginBottom:16},
};
