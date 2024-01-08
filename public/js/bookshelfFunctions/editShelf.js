// editShelf.js

document.addEventListener("DOMContentLoaded", () => {
  const editShelfButtons = document.querySelectorAll(".edit-shelf-button");

  editShelfButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const shelfId = button.getAttribute("data-shelf-id");

      // Check if the edit form already exists
      const existingForm = document.querySelector(
        `.edit-shelf-form[data-shelf-id="${shelfId}"]`
      );

      if (!existingForm) {
        // Create the edit form using a template literal
        const editFormHTML = `
          <form class="edit-shelf-form" data-shelf-id="${shelfId}">
            <label for="new-shelf-name">New Shelf Name:</label>
            <input type="text" id="new-shelf-name" name="newShelfName" required>
            <button type="submit">Save Changes</button>
          </form>
        `;

        // Append the form to the corresponding my-shelves div
        const myShelvesDiv = button.closest(".my-shelves");
        myShelvesDiv.insertAdjacentHTML("beforeend", editFormHTML);
      }

      // Toggle visibility of the corresponding edit form
      const editForm = document.querySelector(
        `.edit-shelf-form[data-shelf-id="${shelfId}"]`
      );
      editForm.classList.toggle("hidden");
    });
  });

  // Add event listener for form submission
  document.addEventListener("submit", async (event) => {
    if (event.target.classList.contains("edit-shelf-form")) {
      event.preventDefault();

      const shelfId = event.target.getAttribute("data-shelf-id");
      const newShelfName = event.target
        .querySelector("#new-shelf-name")
        .value.trim();

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newShelfName }),
      };

      try {
        const response = await fetch(`/api/shelves/${shelfId}`, requestOptions);

        if (response.ok) {
          console.log("Shelf name updated successfully!");
          // Reload the page to reflect the changes immediately
          window.location.reload();
        } else {
          console.error("Failed to update shelf name:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating shelf name:", error.message);
      }
    }
  });
});
