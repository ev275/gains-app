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

function fetchUser(id) {
  return fetch(`http://localhost:3000/api/users/${id}`)
  .then( res => res.json())
  .then(console.log)
}

function createWorkout(form) {
  let workoutName = form[0].value

  let [lift1, sets1, reps1, weights1] = [form[1].value, form[2].value, form[3].value, form[4].value]

  let [lift2, sets2, reps2, weights2] = [form[5].value, form[6].value, form[7].value, form[8].value]

  let [lift3, sets3, reps3, weights3] = [form[9].value, form[10].value, form[11].value, form[12].value]

  let [lift4, sets4, reps4, weights4] = [form[13].value, form[14].value, form[15].value, form[16].value]
  if (workoutName) {
    return fetch("http://localhost:3000/api/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: workoutName,
        user_id: 8
      })
    })
    .then(res => res.json())
    .then(newExercise => newExercise)
  }
  if (lift1 && sets1 && reps1 && weights1) {
    console.log("1st lift exists")
  }

  if (lift2 && sets2 && reps2 && weights2) {
    console.log("2nd lift exists")
  }
  debugger
}

toggleElement(newContainer)
newBtn.addEventListener("click", () => {
    toggleElement(newBtn)
    toggleElement(newContainer)
})

newWorkoutForm.addEventListener("submit", () => {
  event.preventDefault()
  // some function to create workout and render it
  createWorkout(event.target)
  
  newWorkoutForm.reset()

  eventFire(newBtn, "click")
})



// function hideSection(tag) {
//     tag.class = tag.class + "hidden"
// }

// hideSection



// toggleElement("#today")
// toggleElement("#today")



