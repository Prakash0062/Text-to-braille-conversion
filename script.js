
const brailleMapGrade1 = {
  a: "⠁", b: "⠃", c: "⠉", d: "⠙", e: "⠑",
  f: "⠋", g: "⠛", h: "⠓", i: "⠊", j: "⠚",
  k: "⠅", l: "⠇", m: "⠍", n: "⠝", o: "⠕",
  p: "⠏", q: "⠟", r: "⠗", s: "⠎", t: "⠞",
  u: "⠥", v: "⠧", w: "⠺", x: "⠭", y: "⠽", z: "⠵",
  " ": " ",
  1: "⠼⠁", 2: "⠼⠃", 3: "⠼⠉", 4: "⠼⠙", 5: "⠼⠑",
  6: "⠼⠋", 7: "⠼⠛", 8: "⠼⠓", 9: "⠼⠊", 0: "⠼⠚"
};

// Simplified Grade 2 Braille contractions mapping (partial)
const brailleMapGrade2 = {
  "and": "⠯",
  "for": "⠿",
  "the": "⠮",
  "with": "⠺",
  "of": "⠷",
  "to": "⠞",
  "in": "⠔",
  "you": "⠽",
  "it": "⠮",
  "is": "⠮",
  "was": "⠮",
  "he": "⠓",
  "as": "⠜",
  "his": "⠭",
  "I": "⠊",
  "be": "⠃",
  "by": "⠆",
  "have": "⠖",
  "not": "⠴",
  "this": "⠮",
  "but": "⠃",
  "had": "⠙",
  "at": "⠁",
  "from": "⠋",
  "they": "⠮",
  "she": "⠱",
  "or": "⠕",
  "which": "⠱",
  "we": "⠺",
  "there": "⠮",
  "can": "⠉",
  "an": "⠁",
  "were": "⠺",
  "all": "⠁",
  "your": "⠽",
  "when": "⠺",
  "up": "⠥",
  "use": "⠥",
  "word": "⠺",
  "how": "⠓",
  "said": "⠎",
  "each": "⠑",
  "tell": "⠞",
  "does": "⠙",
  "set": "⠎",
  "three": "⠞",
  "want": "⠺",
  "air": "⠁",
  "well": "⠺",
  "also": "⠁",
  "play": "⠏",
  "small": "⠎",
  "end": "⠑",
  "put": "⠏",
  "home": "⠓",
  "read": "⠗",
  "hand": "⠓",
  "port": "⠏",
  "large": "⠇",
  "spell": "⠎",
  "add": "⠁",
  "even": "⠑",
  "land": "⠇",
  "here": "⠓",
  "must": "⠍",
  "big": "⠃",
  "high": "⠓",
  "such": "⠎",
  "follow": "⠋",
  "act": "⠁",
  "why": "⠺",
  "ask": "⠁",
  "men": "⠍"
};

function translateToBraille() {
  const inputText = document.getElementById('inputText').value.toLowerCase();
  const grade = document.getElementById('brailleGrade').value;
  const output = document.getElementById('brailleOutput');

  if (grade === "1") {
    const braille = [...inputText].map(char => {
  if (char === ' ') return ' '; // explicitly handle space
  return brailleMapGrade1[char] || '⍰';
}).join('');

    output.innerText = braille;
  } else if (grade === "2") {
    // Split input into words to check for contractions
    const words = inputText.split(/\s+/);
    const brailleWords = words.map(word => {
      if (brailleMapGrade2[word]) {
        return brailleMapGrade2[word];
      } else {
        // Fallback to Grade 1 character mapping for each letter
        return [...word].map(char => brailleMapGrade1[char] || '⍰').join('');
      }
    });
    output.innerText = brailleWords.join(' ');
  } else {
    output.innerText = "Unsupported Braille grade.";
  }
}

function speakText() {
  const inputText = document.getElementById('inputText').value;
  const utterance = new SpeechSynthesisUtterance(inputText);
  speechSynthesis.speak(utterance);
}

document.getElementById('imageUpload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Display the uploaded image
  const imagePreview = document.getElementById('imagePreview');
  imagePreview.src = URL.createObjectURL(file);
  imagePreview.style.display = 'block';

  Tesseract.recognize(
    file,
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    document.getElementById('inputText').value = text.trim();
    translateToBraille();
  });
});

function exportAsImage() {
  html2canvas(document.querySelector("#brailleOutput")).then(canvas => {
    const link = document.createElement('a');
    link.download = 'braille_output.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Toggle day/night mode
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('toggleThemeBtn');
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    btn.innerText = 'Day';
  } else {
    btn.innerText = 'Night';
  }
}
