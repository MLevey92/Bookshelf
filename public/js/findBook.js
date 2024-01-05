const formEl = document.getElementById("searchForm");
const resultsEl = document.getElementById("results");
const inputEl = document.getElementById("input");


function formHandler(event) {
    event.preventDefault();

    const searchBy = getRadioValue();
    const queryURL = `https://openlibrary.org/search.json?${searchBy}=${spacesToPlusesAndTrim(inputEl.value)}`;
    
    fetchData(queryURL);
}

async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        let data = await response.json();
        data = data.docs;

        console.log(data);
    } catch (error) {
        console.error("Error during fetch:", error.message);
    }

}

//Get value of checked radio button, used in query
function getRadioValue() {
    const radios = document.getElementsByName("searchBy");

    for (i=0;i<radios.length;i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function spacesToPlusesAndTrim(inputString) {
  // Trimming whitespace from both ends first
  inputString = inputString.trim();
  // Use the replace method with a regular expression to replace all spaces with '+'
  const resultString = inputString.replace(/ +/g, "+");
  return resultString;
}

formEl.addEventListener("submit", formHandler)