// ! This function cleans form inputs before fetching data with them
// ? Turns this: "   the  lion   the   witch  and  the  wardrobe  " Into this: "the+lion+the+witch+and+the+wardrobe"
function spacesToPlusesAndTrim(inputString) {
  // Trimming whitespace from both ends first
  inputString = inputString.trim();
  // Use the replace method with a regular expression to replace all spaces with '+'
  const resultString = inputString.replace(/ +/g, "+");
  return resultString;
}

module.exports = spacesToPlusesAndTrim;
