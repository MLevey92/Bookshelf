// addToShelf.js

document.addEventListener("DOMContentLoaded", () => {
  const showAddToShelfButtons = document.querySelectorAll(
    ".show-add-to-shelf-form-button"
  );

  showAddToShelfButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-book-id");

      // Toggle visibility of the corresponding Add to Shelf form
      const addToShelfForm = document.querySelector(
        `.add-to-shelf-form[data-book-id="${bookId}"]`
      );
      addToShelfForm.classList.toggle("hidden");
    });
  });

  // Add event listener for form submission
  document.addEventListener("submit", async (event) => {
    if (event.target.classList.contains("add-to-shelf-form")) {
      event.preventDefault();

      const bookId = event.target.getAttribute("data-book-id");
      const selectedShelfId = event.target.querySelector(
        `#shelf-selector-${bookId}`
      ).value;

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shelfId: selectedShelfId }),
      };

      try {
        const response = await fetch(
          `/api/books/${bookId}`,
          requestOptions
        );

        if (response.ok) {
          console.log("Book added to shelf successfully!");
          // Reload the page to reflect the changes immediately
          window.location.reload();
        } else {
          console.error("Failed to add book to shelf:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding book to shelf:", error.message);
      }
    }
  });
});
