// "use strict";
/* https://api.dictionaryapi.dev/api/v2/entries/en/<word>

As an example, to get definition of English word hello, you can send request to

https://api.dictionaryapi.dev/api/v2/entries/en/hello */

// COMMON STUFF
const dicWrapper = document.querySelector(".dic__details");
const inputSearchInput = document.querySelector(".search__box");
const searchIcon = document.querySelector(".search");
const searchedWord = document.querySelector(".word");
const wordDetail = document.querySelector(".word--detail");
const wordFonetic = document.querySelector(".pronunciation");
const wordMeaning = document.querySelector(".word--meaning");
const wordExample = document.querySelector(".example");
const wordSynonyms = document.querySelector(".synonym");
const searchDescription = document.querySelector(".description");
let pronuncitionAudio;
let voiceIcon;

// Searching the word;

const searchWord = function () {
  let word = inputSearchInput.value;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let definition = data[0].meanings[0].definitions[0].definition;

      let partOfSpeech = data[0].meanings[0].partOfSpeech;

      let phonetic = data[0].phonetic;

      let word = data[0].word;

      let synonyms = [...data[0].meanings[0].definitions[0]?.synonyms];

      let example = data[0].meanings[0].definitions[0].example;

      pronuncitionAudio = `http:${data[0].phonetics[0].audio}`;

      let markup = `<div class="main__detail">
      <div class="word__details">
        <h2 class="word">${word}</h2>
        <p class="word--detail">
          ${partOfSpeech} <span class="pronunciation">/${phonetic}/</span>
        </p>
      </div>

      <p class="pronunce__icon"><i class="uil uil-volume-up"></i></p>
    </div>
    <hr />

    <div class="meaning meaning-1">
      <h3 class="word__title">Meaning</h3>
      <p class="word__meaning word--meaning">
        ${definition}
      </p>
    </div>
    <hr />

    <div class="meaning meaning-2">
      <h3 class="word__title">Example</h3>
      <p class="word__meaning example">
        ${example}
      </p>
    </div>
    <hr />

    <div class="meaning meaning-3">
      <h3 class="word__title">Synonyms</h3>
      <p class="word__meaning synonym">
      ${findSynonym(synonyms)}
      </p>
    </div>`;

      // Now we should add the markup to our container
      dicWrapper.innerHTML = markup;

      // Grabbing the voice icon
      voiceIcon = document.querySelector(".pronunce__icon");

      // The pronunciation voice
      voiceIcon.addEventListener("click", () => {
        let audio = new Audio(pronuncitionAudio);
        audio.play();
      });

      inputSearchInput.value = "";
      searchDescription.innerText = "";
    })
    .catch(
      (searchDescription.innerText = `Sorry, the word ${inputSearchInput.value} is not valid. Please search another one.`)
    );
};

searchIcon.addEventListener("click", searchWord);
inputSearchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    searchWord();
  }
});

findSynonym = function (synonyms) {
  let synList = [];
  if (synonyms.length === 0) return " ";
  else {
    synonyms.forEach((word, i) => {
      if (i > 4) return;
      else {
        synList.push(word);
      }
    });
  }
  return synList.join(", ");
};
