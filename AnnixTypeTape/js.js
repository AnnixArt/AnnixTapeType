const phrases = [
  "Annix type tape clav améliore sa vitesse de frappe chaque jour grâce à l'application AninixType.",
  "Pratiquer régulièrement est la clé pour progresser efficacement au clavier.",
  "Le soleil brille fort aujourd'hui dans un ciel sans nuages.",
  "Je bois un thé chaud en hiver, près de la fenêtre givrée.",

  "programmation",
  "infrastructure",
  "experimentation",
  "caracteristique",
  "intelligemment",
  "restructuration",

  "Les enfants jouent dans le jardin pendant que les oiseaux chantent.",
  "Il faut écrire sans faire d’erreurs pour progresser rapidement.",
  "Le chat noir saute sur le lit et poursuit une ombre invisible.",
  "Nous partons en voyage demain matin, très tôt avec nos valises prêtes.",

  "fonctionnalité",
  "interprétation",
  "accessibilité",
  "architecture",
  "decentralisation",

  "La pluie tombe doucement ce soir, accompagnée d’un vent léger.",
  "Elle lit un bon roman français sous une couverture bien chaude.",
  "Apprendre à taper vite est utile pour tous les métiers numériques.",
  "Le silence est parfois une réponse plus puissante que les mots.",

  "dactylographie",
  "international",
  "personnalisation",
  "optimisation",
  "experimentation",

  "Chaque jour est une nouvelle opportunité d’apprendre quelque chose de précieux.",
  "Il faut beaucoup de patience pour maitriser l'art de la frappe rapide.",
  "La bibliothèque est remplie de vieux livres à l'odeur apaisante.",
  "Le vent souffle fort sur les montagnes enneigées en hiver.",

  "responsabilité",
  "administration",
  "fonctionnement",
  "configurations",
  "encyclopédique",

  "Le clavier devient un outil magique entre les mains d’un dactylographe expert.",
  "Aninix Type vous aide à améliorer votre précision et votre vitesse au quotidien.",
  "Une phrase bien écrite est plus belle qu’un long discours brouillon.",
  "Les développeurs passent de nombreuses heures à taper du code chaque jour.",
  "Un bon exercice de frappe commence toujours par une posture confortable.",

  "télécommunication",
  "désynchronisation",
  "microprocesseur",
  "surdéveloppement",
  "multiplication"
];

const phraseEl = document.getElementById("phrase");
const inputEl = document.getElementById("input");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const countEl = document.getElementById("count");
const refreshBtn = document.getElementById("refresh");
const keyboardEl = document.getElementById("keyboard");

let currentPhrase = "";
let startTime = null;
let correctChars = 0;
let totalChars = 0;
let phrasesTyped = 0;

function renderKeyboard() {
  const keys = "azertyuiopqsdfghjklmwxcvbnçéèàù,.;!?/:|'".split("");
  keyboardEl.innerHTML = "";
  keys.forEach(k => {
    const keyEl = document.createElement("div");
    keyEl.classList.add("key");
    keyEl.id = "key-" + k;
    keyEl.textContent = k;
    keyboardEl.appendChild(keyEl);
  });
}

function highlightKeyboard(char) {
  const id = "key-" + char;
  const key = document.getElementById(id);
  if (key) {
    key.classList.add("active");
    setTimeout(() => key.classList.remove("active"), 100);
  }
}

function setNewPhrase() {
  currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  displayPhrase("");
  inputEl.value = "";
  startTime = new Date();
}

function displayPhrase(input) {
  phraseEl.innerHTML = "";
  for (let i = 0; i < currentPhrase.length; i++) {
    const span = document.createElement("span");
    span.textContent = currentPhrase[i];
    if (input[i]) {
      span.className = input[i] === currentPhrase[i] ? "correct" : "incorrect";
    }
    phraseEl.appendChild(span);
  }
}

function updateStats(input) {
  const timeElapsed = (new Date() - startTime) / 1000 / 60;
  const words = input.trim().split(/\s+/).length;
  const wpm = Math.round(correctChars / 5 / timeElapsed);
  const accuracy = totalChars ? Math.round((correctChars / totalChars) * 100) : 0;

  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
  accuracyEl.textContent = isNaN(accuracy) ? 0 : accuracy;
  countEl.textContent = phrasesTyped;
}

inputEl.addEventListener("input", () => {
  const input = inputEl.value;
  displayPhrase(input);

  const lastChar = input.slice(-1);
  if (lastChar.match(/[a-zA-Z0-9,.;!?çéèàù ]/)) {
    highlightKeyboard(lastChar);
  }

  totalChars = input.length;
  correctChars = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentPhrase[i]) {
      correctChars++;
    }
  }

  updateStats(input);

  if (input === currentPhrase) {
    phrasesTyped++;
    setTimeout(setNewPhrase, 300);
  }
});

refreshBtn.addEventListener("click", () => {
  setNewPhrase();
});

window.onload = () => {
  renderKeyboard();
  setNewPhrase();
  inputEl.focus();
};

function changeMode() {
  const mode = document.getElementById("modeSelector").value;
  const app = document.querySelector(".app");
  app.classList.remove("tablet", "phone", "pc");
  app.classList.add(mode);
}
