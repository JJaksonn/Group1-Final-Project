
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
function createNote()
{
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

//making to do lists
function createTDLists()
{
    const TDList = document.createElement("div");
    TDList.classList.add("TDList");

    const listHeader = document.createElement("div");
    listHeader.classList.add("listHeader");
    listHeader.innerHTML = `To Do:
    <hr width="100%" color="black" />`;

    const listContent = document.createElement("div");
    listContent.innerHTML = `
        <div id="todoForm">
            <input
                type="text"
                class="inputItem"
                name="listInputBox"
                placeholder="Add Task"/>

            <button class="ListInputBtn">Add</button>
        </div>
        <h4>Task List</h4>
        <ul class="listContainer"></ul>`;

    TDList.appendChild(listHeader);
    TDList.appendChild(listContent);

    TDList.style.position = "absolute";
    TDList.style.left = "50%";
    TDList.style.top = "50%";
    TDList.style.transform = "translate(-50%, -50%)";

    dragElement(TDList, listHeader);

    const inputBox = listContent.querySelector(".inputItem");
    const listContainer = listContent.querySelector(".listContainer");
    const addButton = listContent.querySelector(".ListInputBtn");

    addButton.addEventListener("click", function () {
        addTask(inputBox, listContainer);
    });

    document.getElementById("notesContainer").appendChild(TDList);
}
document.getElementById("listBtn").addEventListener("click", createTDLists);


//all the code needed for the to do lists
const inputBox = document.getElementById("listInputBox");
const listContainer = document.getElementById("listContainer");
function addTask(inputBox, listContainer) {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `
    <label>
        <input type="checkbox">
        <span>${task}</span>
    </label>
    <span class="listEditBtn">Edit</span>
    <span class="listDeleteBtn">Delete</span>`;

    listContainer.appendChild(li);
    inputBox.value = "";

    const checkbox = li.querySelector("input");
    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
    });

    const deleteBtn = li.querySelector(".listDeleteBtn");
    deleteBtn.addEventListener("click", function () {
        listContainer.removeChild(li);
    });

    const editBtn = li.querySelector(".listEditBtn");
    editBtn.addEventListener("click", function () {
        const newTask = prompt("Edit Task:", task);
        if (newTask !== null && newTask.trim() !== "") {
            li.querySelector("span").textContent = newTask.trim();
        }
    });
}