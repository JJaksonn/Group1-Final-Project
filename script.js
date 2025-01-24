const fileinput = document.getElementById("imageUpload");
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
    fileinput.click();
});


fileinput.addEventListener("change", function() {
    if (fileinput.files.length > 0) {
        fileNameDisplay.textContent = fileinput.files[0].name;
    } else {
        fileNameDisplay.textContent = "No file chosen";
    }
});
// all of the above code was just so we could make the image upload button look good :sob:

// Background image picker
document.getElementById("imageForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const fileinput = document.getElementById("imageUpload");
    if (fileinput.files && fileinput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        document.body.style.backgroundSize = "contain";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(fileinput.files[0]);
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

//the js for the music player
const audio = document.getElementById('audio');
const playBtn = document.querySelector('.play-btn');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const fileInput = document.getElementById('fileInput');
const player = document.getElementById('player');
let isDragging = false;
let offsetX, offsetY;
//to check if the file is uploaded successfully
fileInput.addEventListener('change', (event) =>
{
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audio.src = fileURL;
        playBtn.disabled = false; 
        document.getElementById("status").innerHTML = "file uploaded";
        const playIcon = document.getElementById('play-icon');
        playIcon.src = 'images/play.png'; 
        playIcon.alt = 'Play';
    }
});
//the play pause function
function playPause()
{
    const playIcon = document.getElementById('play-icon');
    if (audio.paused) {
        audio.play();
        playIcon.src = 'images/pause.png'; // Set to the pause icon
        playIcon.alt = 'Pause';
    } else {
        audio.pause();
        playIcon.src = 'images/play.png'; // Set to the play icon
        playIcon.alt = 'Play';
    }
}


audio.addEventListener('timeupdate', updateProgress);

function updateProgress()
{
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

function formatTime(time)
{
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

player.addEventListener('mousedown', (e) =>
{
    e = e || window.event;
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - player.offsetLeft;
    offsetY = e.clientY - player.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging)
    {
        player.style.left = `${e.clientX - offsetX}px`;
        player.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () =>
{
    isDragging = false;
});

function openPlayer()
{
    if (document.getElementById("player").style.visibility === 'visible') {
        document.getElementById("player").style.visibility = 'hidden';
    }
    else {
        document.getElementById("player").style.visibility = 'visible';
    }
}

let elem = document.documentElement;
function handlefullscreen(){
    if(!document.fullscreenElement){
        elem.requestFullscreen?.() || elem.webkitRequestFullscreen?.() || elem.msRequestFullscreen?.();
    }
    else{
        document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.msExitFullscreen?.();
    }
}


