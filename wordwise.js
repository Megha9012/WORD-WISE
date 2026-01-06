
const categories = {
  "Vocabulary":[["Aberration","A departure from what is normal"],["Eloquent","Fluent and persuasive"]],
  "Idioms":[["Break the ice","Initiate conversation"],["Hit the sack","Go to bed"]],
  "Phrases":[["By all means","Certainly"],["In the long run","Eventually"]],
  "Synonyms":[["Happy","Joyful"],["Sad","Melancholy"]],
  "Antonyms":[["Hot","Cold"],["Up","Down"]],
  "Business":[["ROI","Return on Investment"],["Synergy","Combined effort"]],
  "Academic":[["Thesis","Research paper"],["Hypothesis","Testable idea"]],
  "Slang":[["Cool","Awesome"],["Ghosted","Cut communication"]],
  "Collocations":[["Make a decision","Correct usage"],["Take a break","Correct usage"]],
  "Proverbs":[["Time is money","Time is valuable"],["Actions speak louder","Deeds matter more"]]
};

const colors = {
  "Vocabulary":["#a3d5ff","#067dab"],
  "Idioms":["#ffb3c6","#c2185b"],
  "Phrases":["#b8f2e6","#00695c"],
  "Synonyms":["#e4ffc7","#558b2f"],
  "Antonyms":["#ffcdd2","#c62828"],
  "Business":["#d7bfff","#6a1b9a"],
  "Academic":["#ffd6a5","#ef6c00"],
  "Slang":["#caffbf","#2e7d32"],
  "Collocations":["#cde7ff","#1565c0"],
  "Proverbs":["#ffadad","#b71c1c"]
};

// Flashcard Elements
const catContainer  = document.getElementById("categoryContainer");
const flashSec      = document.getElementById("flashcardSection");
const frontEl       = document.getElementById("cardFront");
const backEl        = document.getElementById("cardBack");
const innerEl       = document.getElementById("cardInner");
let currentCat="", currentIdx=0;

// Render flashcard categories
Object.keys(categories).forEach(cat=>{
  const d=document.createElement("div");
  d.className="category";
  d.innerText=cat;
  d.style.background=colors[cat][0];
  d.style.color="#000";
  d.onclick=()=>openCat(cat);
  catContainer.appendChild(d);
});

// Open selected flashcard category
function openCat(cat){
  currentCat=cat; currentIdx=0;
  flashSec.style.display="block";
  updateCard();
  window.location.hash="#categories";
}

// Update card content
function updateCard(){
  const [f,b]=categories[currentCat][currentIdx];
  frontEl.innerText=f; backEl.innerText=b;
  frontEl.style.background=colors[currentCat][0];
  backEl.style.background=colors[currentCat][1];
  innerEl.classList.remove("flip");
}

// Flip the card
function flipCard(){ innerEl.classList.toggle("flip"); }

// Go to next card
function nextCard(){
  currentIdx=(currentIdx+1)%categories[currentCat].length;
  updateCard();
}

// Go to previous card
function prevCard(){
  currentIdx=(currentIdx-1+categories[currentCat].length)%categories[currentCat].length;
  updateCard();
}


function addFlashcard(){
  const f=document.getElementById("newFront").value.trim();
  const b=document.getElementById("newBack").value.trim();
  if(!f||!b){ alert("Fill both fields"); return; }
  if(!categories["Custom"]){
    categories["Custom"]=[];
    const d=document.createElement("div");
    d.className="category";
    d.innerText="Custom";
    d.style.background="#ffe680"; d.style.color="#000";
    d.onclick=()=>openCat("Custom");
    catContainer.appendChild(d);
  }
  categories["Custom"].push([f,b]);
  alert("Added to Custom!");
  document.getElementById("newFront").value="";
  document.getElementById("newBack").value="";
}

// Grammar Correction (basic placeholder)
document.querySelector("#grammar button").onclick = ()=>{
  const input = document.querySelector("#grammar textarea").value;
  if(!input){
    alert("Please enter a sentence!");
    return;
  }
  const corrected = input.replace(/\bi\b/g,"I").replace(/\bim\b/gi,"I'm"); // basic small correction
  alert("Suggestion: " + corrected);
};
