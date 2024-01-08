// addShelf.js

document.addEventListener("DOMContentLoaded", () => {
  const addShelfForm = document.getElementById("add-shelf-form");

  addShelfForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const shelfNameInput = document.getElementById("shelf-name");
    const shelfName = shelfNameInput.value.trim();

    if (shelfName === "") {
      alert("Please enter a shelf name.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: shelfName }),
    };

    try {
      const response = await fetch("/api/shelves", requestOptions);

      if (response.ok) {
        console.log("Shelf added successfully!");
        // Optionally, you can reload the page or update the UI here
        window.location.reload();
      } else {
        console.error("Failed to add shelf:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding shelf:", error.message);
    }
  });
});
