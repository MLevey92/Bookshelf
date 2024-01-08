// ! This function cleans form inputs before fetching data with them
// ? Turns this: "   the  lion   the   witch  and  the  wardrobe  " Into this: "the+lion+the+witch+and+the+wardrobe"
function spacesToPlusesAndTrim(inputString) {
  // Trimming whitespace from both ends first
  inputString = inputString.trim();
  // Use the replace method with a regular expression to replace all spaces with '+'
  const resultString = inputString.replace(/ +/g, "+");
  return resultString;
}

// ! function to make a fetch request (GET) with a given URL
async function fetchData(url) {
  try {
    // Step 1: Use fetch to make the request
    const response = await fetch(url);

    // Step 2: Wait for the response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Step 3: Parse the JSON data
    let data = await response.json();
    // each Book is nestled in the 'docs' array from the api
    data = data.docs;

    // You can now work with the 'data' object
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error.message);
  }
}

// ! Lil function to turn 4.7619047 into 4.8
function roundToTenths(number) {
  return Number(number.toFixed(1));
}

// Function to check if a sentence is likely to be in English
function isEnglish(sentence) {
  // Replace this with your own logic
  // For simplicity, checking if the sentence contains common English words
  const englishWords = [
    "the",
    "and",
    "it",
    "was",
    "have",
    "are",
    "is",
    "in",
    "to",
    "of",
    "a",
  ];
  return englishWords.some((word) => sentence.toLowerCase().includes(word));
}

// Function to get the first English sentence from an array of sentences
function getFirstEnglishSentence(sentences) {
  if (!sentences) {
    return null; // If sentences array is null, return null
  }

  for (const sentence of sentences) {
    if (sentence && isEnglish(sentence)) {
      return sentence.trim(); // Return the first English sentence
    }
  }

  // If no English sentence is found, return null
  return null;
}


