// Background color picker
document.getElementById("colorForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedColor = document.getElementById("favcolor").value;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = selectedColor;
    $('#bgModal').modal('hide');
  });

  // Background image picker
  document.getElementById("imageForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const fileInput = document.getElementById("bgImage");
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(fileInput.files[0]);
      $('#bgModal').modal('hide');
    }
  });