bgselect = document.getElementById("colorForm")
bgselect.addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedColor = document.getElementById("favcolor").value;
    document.body.style.backgroundColor = selectedColor;
    $('#myModal').modal('hide');
});