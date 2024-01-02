function cleanupOLkey(url) {
  // Split the URL by '/'
  const parts = url.split("/");

  // Get the last part of the array
  const key = parts[parts.length - 1];

  return key;
}

// Example usage:
// const bookUrl = "/works/OL476641W";    <-- this is how the 'key' field looks in the json response from the openlibrary api
// const key = cleanupOLkey(bookUrl);
// console.log(key);
// Output: OL476641W

module.exports = cleanupOLkey;
