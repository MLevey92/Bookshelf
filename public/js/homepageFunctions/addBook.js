function handleSaveButtonClick(selectedBook, index) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cover_edition_key: selectedBook.cover_edition_key,
      title: selectedBook.title,
      ratings_average: selectedBook.ratings_average,
      first_sentence: selectedBook.first_sentence,
      first_publish_year: selectedBook.first_publish_year,
      author_name: selectedBook.author_name,
      author_key: selectedBook.author_key,
    }),
  };

  fetch("/api/books", requestOptions)
    .then((response) => {
      if (response.ok) {
        // Book successfully created in the database
        console.log("Book saved successfully!");
      } else {
        console.error("Failed to save book:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error saving book:", error.message);
    });
}
