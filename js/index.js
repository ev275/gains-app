const newBtn = document.querySelector("#newBtn")
const newContainer = document.querySelector("#newContainer")
const newWorkoutForm = document.querySelector("#newWorkoutForm")

function toggleElement(element) {
  let x = element;
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

toggleElement(newContainer)
newBtn.addEventListener("click", () => {
    toggleElement(newBtn)
    toggleElement(newContainer)
})

newWorkoutForm.addEventListener("submit", () => {
  event.preventDefault()
  // some function to create workout and render it
  
  newWorkoutForm.reset()

  eventFire(newBtn, "click")
})



fetch("http://localhost:3000/api/users/8")
.then( res => res.json())
.then(console.log)

// function hideSection(tag) {
//     tag.class = tag.class + "hidden"
// }

// hideSection



// toggleElement("#today")
// toggleElement("#today")



