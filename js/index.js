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
    fetch("http://localhost:3000/api/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: workoutName,
        user_id: 1
      })
    })
    .then(res => res.json())
    .then(newExercise => {
      if (lift1 && sets1 && reps1 && weights1) {
        fetch("http://localhost:3000/api/lifts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: lift1,
            exercise_id: newExercise.id,
            sets: sets1,
            reps: reps1,
            weights: weights1
          })
        })
      }
      if (lift2 && sets2 && reps2 && weights2) {
        fetch("http://localhost:3000/api/lifts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: lift2,
            exercise_id: newExercise.id,
            sets: sets2,
            reps: reps2,
            weights: weights2
          })
        })
      }
      if (lift3 && sets3 && reps3 && weights3) {
        fetch("http://localhost:3000/api/lifts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: lift3,
            exercise_id: newExercise.id,
            sets: sets3,
            reps: reps3,
            weights: weights3
          })
        })
      }
      if (lift4 && sets4 && reps4 && weights4) {
        fetch("http://localhost:3000/api/lifts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: lift4,
            exercise_id: newExercise.id,
            sets: sets4,
            reps: reps4,
            weights: weights4
          })
        })
      }
      fetch(`http://localhost:3000/api/exercises/${newExercise.id}`)
      .then(res => res.json())
      .then(json => console.log(json))
    })
  }
  
  // debugger
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



