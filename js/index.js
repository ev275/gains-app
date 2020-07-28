const newBtn = document.querySelector("#newBtn")
const newContainer = document.querySelector("#newContainer")
const newWorkoutForm = document.querySelector("#newWorkoutForm")

const workoutsContainer = document.querySelector("#workoutsDiv")

const modalBtn = document.querySelector("#modalBtn")
const modalLabel = document.querySelector("#modalLabel")
const updateWorkoutForm = document.querySelector("#editWorkoutForm")
const closeModalBtn = document.querySelector("#closeModalBtn")
const deleteExerciseBtn = document.querySelector("#deleteExerciseBtn")

toggleElement(modalBtn)
renderExercises()
toggleElement(newContainer)

//Helper Functions
function qs(selector) {
  return document.querySelector(selector)
}

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

newBtn.addEventListener("click", () => {
  toggleElement(newBtn)
  toggleElement(newContainer)
})

//Sign up
const signUpForm = qs("form#signUpForm")
signUpForm.addEventListener("submit", () => {

  event.preventDefault()
  
  let username = event.target[0].value
  let password = event.target[1].value
  let name = event.target[2].value
  let sex = event.target[3].value
  let age = event.target[4].value
  let weight = event.target[5].value
  let height = +(event.target[6].value * 12) + +event.target[7].value
  // debugger

  fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password,
      name,
      sex,
      age,
      weight,
      height
    })
  })
  .then(res => res.json())
  .then(userInfo => {
    if(userInfo.token) {
      localStorage.token = userInfo.token
      console.log(localStorage)
    }
  })
})

//Log in
const logInForm = qs("form#logInForm")
logInForm.addEventListener("submit", () => {
  event.preventDefault()

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: event.target[0].value,
      password: event.target[1].value,
    })
  })
  .then(res => res.json())
  .then(userInfo => {
    if(userInfo.token) {
      localStorage.token = userInfo.token
      console.log(localStorage)
    }
  })
})


//Create Exercises
newWorkoutForm.addEventListener("submit", () => {
  event.preventDefault()
  // some function to create workout and render it
  createWorkout(event.target)
  
  newWorkoutForm.reset()

  eventFire(newBtn, "click")
})

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
      // debugger
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
      return newExercise
    })
    .then(newExercise =>{
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
      return newExercise
    })
    .then(newExercise => {
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
      return newExercise
    })
    .then(newExercise => {
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
      return newExercise
    })
    .then( newExercise => {
      // debugger
      fetch(`http://localhost:3000/api/exercises`)
      .then(res => res.json())
      .then(createdExercise => {
        console.log(createdExercise)
        renderExercise(createdExercise[createdExercise.length - 1])
      })
    })
  }
  // debugger
}

// function async createAsyncWorkout(form) {
//   let workoutName = form[0].value
//   let [lift1, sets1, reps1, weights1] = [form[1].value, form[2].value, form[3].value, form[4].value]
//   let [lift2, sets2, reps2, weights2] = [form[5].value, form[6].value, form[7].value, form[8].value]
//   let [lift3, sets3, reps3, weights3] = [form[9].value, form[10].value, form[11].value, form[12].value]
//   let [lift4, sets4, reps4, weights4] = [form[13].value, form[14].value, form[15].value, form[16].value]
//   if (workoutName) {
//     let res = await fetch("http://localhost:3000/api/exercises", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       body: JSON.stringify({
//         name: workoutName,
//         user_id: 1
//       })
//     })
//    newEx = await res.json()
//    await if (lift1 && sets1 && reps1 && weights1) {
//    let res = await fetch("http://localhost:3000/api/lifts", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//           },
//           body: JSON.stringify({
//             name: lift1,
//             exercise_id: newExercise.id,
//             sets: sets1,
//             reps: reps1,
//             weights: weights1
//           })
//         })
//       }

//Read Exercises
function renderExercises() {
  workoutsContainer.innerHTML=""
  fetch("http://localhost:3000/api/exercises")
  .then(res => res.json())
  .then(exercises => {
    exercises.forEach(exercise => renderExercise(exercise))
  })
}

function renderExercise(createdExercise) {
  // debugger
  let div1 = document.createElement("div")
  div1.className = "row justify-content-center no-gutters mb-5 mb-lg-0"

  let div2 = document.createElement("div")
  div2.className = "col-xl-4 col-lg-5"

  let div3 = document.createElement("div")
  div3.className = "featured-text text-center text-lg-left"

  let h4 = document.createElement("h4")
  h4.innerText = createdExercise.name //change to exercise name and date
  
  div3.append(h4)
  div2.append(div3)

  let tableDiv = document.createElement("div")
  tableDiv.className = "col-lg-6"
  tableDiv.id = "tableDiv"

  tableDiv.addEventListener("click", () => {
    modalBtn.exerciseid = createdExercise.id
    updateWorkoutForm.exerciseid = createdExercise.id
    modalLabel.innerText = createdExercise.name
    eventFire(modalBtn, "click")
  })

  let table = document.createElement("table")
  table.className = "table table-dark table-bordered"

  let thead = document.createElement("thead")

  let tr = document.createElement("tr")

  let liftHead = document.createElement("th")
  liftHead.scope = "col"
  liftHead.innerText = "Lift"

  let setsHead = document.createElement("th")
  setsHead.scope = "col"
  setsHead.innerText = "Sets"

  let repsHead = document.createElement("th")
  repsHead.scope = "col"
  repsHead.innerText = "Reps"

  let weightsHead = document.createElement("th")
  weightsHead.scope = "col"
  weightsHead.innerText = "Weights"

  tr.append(liftHead, setsHead, repsHead, weightsHead)
  thead.append(tr)

  let bodyTag = document.createElement("tbody")
  // debugger
  createdExercise.lifts.forEach(lift => {
    renderLift(lift, bodyTag)
  })

  table.append(thead, bodyTag)
  tableDiv.append(table)
  div1.append(div2, tableDiv)
  workoutsContainer.append(div1)
}

function renderLift(lift, bodyTag) {
  let rowTag = document.createElement("tr")

  let nameTag = document.createElement("td")
  nameTag.innerText = lift.name

  let setsTag = document.createElement("td")
  setsTag.innerText = lift.setts.length

  let repsTag = document.createElement("td")
  let reps_array = []
  lift.setts.forEach( set => reps_array.push(set.reps))
  let reps_string = reps_array.join(', ')
  repsTag.innerText = reps_string

  let weightsTag = document.createElement("td")
  let weights_array = []
  lift.setts.forEach(set => weights_array.push(set.weight))
  let weights_string = weights_array.join(', ')
  weightsTag.innerText = weights_string

  rowTag.append(nameTag, setsTag, repsTag, weightsTag)
  bodyTag.append(rowTag)
}

//Update exercise
updateWorkoutForm.addEventListener("submit", () => {
  event.preventDefault()
  // debugger
  updateWorkout(event.target)
  updateWorkoutForm.reset()
  eventFire(closeModalBtn, "click")
})

function updateWorkout(form) {
  // debugger
  let id = updateWorkoutForm.exerciseid
  // debugger
  // const updateWorkoutForm = document.querySelector("#editWorkoutForm")
  let workoutName = form[0].value

  let [lift1, sets1, reps1, weights1] = [form[1].value, form[2].value, form[3].value, form[4].value]

  let [lift2, sets2, reps2, weights2] = [form[5].value, form[6].value, form[7].value, form[8].value]

  let [lift3, sets3, reps3, weights3] = [form[9].value, form[10].value, form[11].value, form[12].value]

  let [lift4, sets4, reps4, weights4] = [form[13].value, form[14].value, form[15].value, form[16].value]
  if (workoutName) {
    fetch(`http://localhost:3000/api/exercises/${id}`, {
      method: "PATCH",
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
    .then(updatedExercise => {
      // debugger
      if (lift1 && sets1 && reps1 && weights1) {
        fetch(`http://localhost:3000/api/lifts/${updatedExercise.lifts[0].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: lift1,
            exercise_id: updatedExercise.id,
            sets: sets1,
            reps: reps1,
            weights: weights1
          })
        })
      }
      return updatedExercise
    })
    .then(updatedExercise =>{
      if (lift2 && sets2 && reps2 && weights2) {
        fetch(`http://localhost:3000/api/lifts/${updatedExercise.lifts[1].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: lift2,
            exercise_id: updatedExercise.id,
            sets: sets2,
            reps: reps2,
            weights: weights2
          })
        })
      }
      return updatedExercise
    })
    .then(updatedExercise => {
      if (lift3 && sets3 && reps3 && weights3) {
        fetch(`http://localhost:3000/api/lifts/${updatedExercise.lifts[2].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: lift3,
            exercise_id: updatedExercise.id,
            sets: sets3,
            reps: reps3,
            weights: weights3
          })
        })
      }
      return updatedExercise
    })
    .then(updatedExercise => {
      if (lift4 && sets4 && reps4 && weights4) {
        fetch(`http://localhost:3000/api/lifts/${updatedExercise.lifts[1].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: lift4,
            exercise_id: updatedExercise.id,
            sets: sets4,
            reps: reps4,
            weights: weights4
          })
        })
      }
      return updatedExercise
    })
    .then( updatedExercise => {
      // debugger
      fetch(`http://localhost:3000/api/exercises/${updatedExercise.id}`)
      .then(res => res.json())
      .then(updatedExercise => {
        renderExercises()
      })
    })
  }
}

//Destroy Exercise
deleteExerciseBtn.addEventListener("click", () => {
  let id = updateWorkoutForm.exerciseid

  fetch(`http://localhost:3000/api/exercises/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(json => {
    renderExercises()
    eventFire(closeModalBtn, "click")
  })
})









