const hideNewBtn = document.querySelector("#hideNewBtn")
const newContainer = document.querySelector("#newContainer")

toggleElement(newContainer)
hideNewBtn.addEventListener("click", () => {
    toggleElement(hideNewBtn)
    toggleElement(newContainer)
})

fetch("http://localhost:3000/api/users/8")
.then( res => res.json())
.then(console.log)

// function hideSection(tag) {
//     tag.class = tag.class + "hidden"
// }

// hideSection

function toggleElement(element) {
    let x = element;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}

// toggleElement("#today")
// toggleElement("#today")



