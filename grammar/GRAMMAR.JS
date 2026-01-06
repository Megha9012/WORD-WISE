async function checkGrammar() {
  const text = document.getElementById('grammarInput').value.trim();
  const resultDiv = document.getElementById('grammarResult');

  if (!text) {
    alert("Please type or paste a paragraph or sentence first!");
    return;
  }

  resultDiv.innerHTML = "Checking grammar...";

  const url = "https://api.languagetoolplus.com/v2/check";

  const params = new URLSearchParams();
  params.append("text", text);
  params.append("language", "en-US");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const data = await response.json();
    
    if (data.matches.length === 0) {
      resultDiv.innerHTML = "✅ No mistakes found! Your text is perfect.";
      
      createGrammarFlashcard(text);
      
    } else {
      let correctedText = text;
      let suggestionList = `<strong>Suggestions:</strong><br><ul>`;

      data.matches.forEach(match => {
        const wrongText = match.context.text.substr(match.context.offset, match.context.length);
        const suggestions = match.replacements.map(r => r.value).join(', ');

        suggestionList += `<li><strong>Wrong:</strong> "${wrongText}" <br>
                            <strong>Suggestion:</strong> ${suggestions}</li><br>`;

        if (match.replacements.length > 0) {
          correctedText = correctedText.replace(wrongText, match.replacements[0].value);
        }
      });

      suggestionList += `</ul>`;

      resultDiv.innerHTML = suggestionList + `<br><br><strong>Corrected Text:</strong><br>${correctedText}`;

      createGrammarFlashcard(correctedText);
    }

  } catch (error) {
    console.error("Error checking grammar:", error);
    resultDiv.innerHTML = "❌ Error checking grammar. Try again!";
  }
}

function createGrammarFlashcard(correctedText){
  if(!categories["Grammar Corrections"]){
    categories["Grammar Corrections"] = [];
    const d = document.createElement("div");
    d.className = "category";
    d.innerText = "Grammar Corrections";
    d.style.background = "#e0c3fc"; 
    d.style.color = "#000";
    d.onclick = () => openCat("Grammar Corrections");
    catContainer.appendChild(d);
  }

  categories["Grammar Corrections"].push([correctedText, "Corrected Paragraph/Sentence"]);

  alert("Flashcard Created from Corrected Grammar!");
}
