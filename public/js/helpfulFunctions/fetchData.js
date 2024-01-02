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
    data = data.docs;

    // You can now work with the 'data' object
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error.message);
  }
}

module.exports = fetchData;
