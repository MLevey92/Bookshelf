// removeFromShelf.js

document.addEventListener("DOMContentLoaded", () => {
  const removeFromShelfButtons = document.querySelectorAll(
    ".remove-from-shelf-button"
  );

  removeFromShelfButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const bookId = button.getAttribute("data-book-id");

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shelfId: null }), // Set shelfId to null to remove from the shelf
      };

      try {
        const response = await fetch(`/api/books/${bookId}`, requestOptions);

        if (response.ok) {
          console.log("Book removed from shelf successfully!");
          // Reload the page to reflect the changes immediately
          window.location.reload();
        } else {
          console.error(
            "Failed to remove book from shelf:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error removing book from shelf:", error.message);
      }
    });
  });
});
