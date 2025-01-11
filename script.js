const fileInput = document.getElementById("imageUpload");
const imageButton = document.getElementById("imageUploadButton");
const fileNameDisplay = document.getElementById("fileNameDisplay");

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
/* all of the above code was just so I could make the image upload button look good :sob: */

const bgselect = document.getElementById("bgForm");
bgselect.addEventListener("submit", function(event) {
    event.preventDefault();
    const fileInput = document.getElementById("imageUpload");
    const colorInput = document.getElementById("favcolor");

    if (fileInput.files && fileInput.files.length > 0)
    {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundSize = "contain";
        };
        reader.readAsDataURL(file);
    }

    else
    {
        const selectedColor = colorInput.value;
        document.body.style.backgroundColor = selectedColor;
        document.body.style.backgroundImage = ""; // Clear background image if no file
    }

    $('#myModal').modal('hide');
});