// Add an event listener for delete button clicks
document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-book-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
      );
      if (!confirmDelete) {
        return;
      }

      const bookId = button.getAttribute("data-book-id");
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(`/api/books/${bookId}`, requestOptions);

        if (response.ok) {
          console.log("Book deleted successfully!");
          // Reload the page to reflect the changes
          window.location.reload();
        } else {
          console.error("Failed to delete book:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting book:", error.message);
      }
    });
  });
});
