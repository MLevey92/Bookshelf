// deleteShelf.js

document.addEventListener("DOMContentLoaded", () => {
  const deleteShelfButtons = document.querySelectorAll(".delete-shelf-button");

  deleteShelfButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this shelf?"
      );
      if (!confirmDelete) {
        return;
      }

      const shelfId = button.getAttribute("data-shelf-id");

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(`/api/shelves/${shelfId}`, requestOptions);

        if (response.ok) {
          console.log("Shelf deleted successfully!");
          // Reload the page to reflect the changes immediately
          window.location.reload();
        } else {
          console.error("Failed to delete shelf:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting shelf:", error.message);
      }
    });
  });
});
