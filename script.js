const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get quote from forismatic.com
getQuote();

async function getQuote() {
  showLoadingSpinner();

  const proxyURL = "https://quicors.herokuapp.com/";
  const apiURL = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyURL + apiURL);
    var data = await response.json();

    if (!data.quoteAuthor) {
      authorText.innerText = "-Unknown";
    } else {
      authorText.innerText = "- " + data.quoteAuthor;
    }

    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-text");
    }

    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    handleError();
  }
}

function handleError() {
  removeLoadingSpinner();
  quoteText.innerText = "Oops, missing quote, please graba another.";
  authorText.innerText = "";
  console.log(error);
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterURL, "_blank");
}

function keyEventHandler(event) {
  if (event.keyCode == 13 || event.keyCode == 32) {
    getQuote();
  }
}

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
addEventListener("keydown", keyEventHandler);
