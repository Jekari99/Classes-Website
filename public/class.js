let button = document.getElementById("add-btn");

button.addEventListener("click", () => {
    alert("New Class Added!");
});

function clearField() {
    document.getElementById("class_category").value = "";
    document.getElementById("class_number").value = "";
    document.getElementById("professor").value = "";
}
