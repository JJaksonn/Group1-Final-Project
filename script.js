
const fileInput = document.getElementById("imageUpload");
const imageButton = document.getElementById("imageUploadButton");
const fileNameDisplay = document.getElementById("fileNameDisplay");

// Background color picker
document.getElementById("colorForm").addEventListener("submit", function(event)
{
    event.preventDefault();
    const selectedColor = document.getElementById("favcolor").value;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = selectedColor;
    $('#bgModal').modal('hide');
});


imageButton.addEventListener("click", function() {
    fileInput.click();
});


fileInput.addEventListener("change", function() {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = "No file chosen";
    }
});
// all of the above code was just so I could make the image upload button look good :sob:

// Background image picker
document.getElementById("imageForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const fileInput = document.getElementById("bgImage");
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        document.body.style.backgroundSize = "contain";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(fileInput.files[0]);
      $('#bgModal').modal('hide');
    }
  });

function createNote()
{
    const note = document.createElement("div");
    //adding the classes for functionality and design
    note.classList.add("note");

    //setting the notes position making it moveable and editable
    note.contentEditable = "true";
    note.innerText = "Note...";
    note.style.position = "absolute";
    note.style.left = "50%";
    note.style.top = "50%";
    note.style.transform = "translate(-50%, -50%)";
    note.draggable = true;

    document.getElementById("notesContainer").appendChild(note);
}

document.getElementById("noteBtn").addEventListener("click", createNote);


