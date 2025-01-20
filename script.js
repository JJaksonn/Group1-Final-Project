
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
    const fileInput = document.getElementById("imageUpload");
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

//making draggable items and deletable
function dragElement(elmnt, header)
{
    let xpos = 0, ypos = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e)
    {
        e = e || window.event;
        e.preventDefault();

        xpos = e.clientX - elmnt.offsetLeft;
        ypos = e.clientY - elmnt.offsetTop;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e)
    {
        e = e || window.event;
        e.preventDefault();

        const deltaX = e.clientX - xpos;
        const deltaY = e.clientY - ypos;

        elmnt.style.left = deltaX + "px";
        elmnt.style.top = deltaY + "px";
    }

    function closeDragElement(e)
    {
        document.onmouseup = null;
        document.onmousemove = null;

        // Detect if the element overlaps with the trash button
        const trashDiv = document.getElementById("trashDiv");
        const trashRect = trashDiv.getBoundingClientRect();
        const elmntRect = header.getBoundingClientRect();

        if (elmntRect.left < trashRect.right &&
            elmntRect.right > trashRect.left &&
            elmntRect.top < trashRect.bottom &&
            elmntRect.bottom > trashRect.top)
        {
            elmnt.remove();
            header.remove();
        }
    }
}

//spawning in notes
function createNote() {
    const note = document.createElement("div");
    note.classList.add("note");

    const noteHeader = document.createElement("div");
    noteHeader.classList.add("noteHeader");
    noteHeader.innerHTML = `Note:
    <hr width = 100% color = black /> `;


    const noteContent = document.createElement("div");
    noteContent.contentEditable = "true";
    noteContent.innerText = "Note...";

    note.appendChild(noteHeader);
    note.appendChild(noteContent);

    note.style.position = "absolute";
    note.style.left = "50%";
    note.style.top = "50%";
    note.style.transform = "translate(-50%, -50%)";

    dragElement(note, noteHeader);

    document.getElementById("notesContainer").appendChild(note);
}

document.getElementById("noteBtn").addEventListener("click", createNote);
