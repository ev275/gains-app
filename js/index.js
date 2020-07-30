const newBtn = document.querySelector("#newBtn")
const newContainer = document.querySelector("#newContainer")
const newWorkoutForm = document.querySelector("#newWorkoutForm")

const workoutsContainer = document.querySelector("#workoutsDiv")

const titleA = qs("#titleA")

const workoutsA = qs("#workoutsA")

const modalBtn = document.querySelector("#modalBtn")
const modalLabel = document.querySelector("#modalLabel")
const updateWorkoutForm = document.querySelector("#editWorkoutForm")
const closeModalBtn = document.querySelector("#closeModalBtn")
const deleteExerciseBtn = document.querySelector("#deleteExerciseBtn")

const logInBtn1 = qs("button#logInBtn1")
const logInBtn2 = qs("button#logInBtn2")
const closeLogInModalBtn = qs("#closeLogin")

const signUpBtn1 = qs("button#signUpBtn1")
const signUpBtn2 = qs("button#signUpBtn2")
const closeSignUpModalBtn = qs("#closeSignup")

const logOutBtn = qs("#logOutBtn")

const navNW = qs("#navNW")
const navW = qs("#navW")
const navLO = qs("#navLO")

//first functions
initialDomManipulation()
renderExercises()
toggleElement(modalBtn)
toggleElement(newContainer)


//Helper Functions
function qs(selector) {
  return document.querySelector(selector)
}

function toggleElement(element) {
  let x = element;
  if (x.style.display === "none") {
    x.style.display = "";
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
  // .then(console.log)
}

newBtn.addEventListener("click", () => {
  toggleElement(newBtn)
  toggleElement(newContainer)
})

function initialDomManipulation() {
  if (localStorage.token) {
    logInBtn1.style.display = "none"
    signUpBtn1.style.display = "none"
    workoutsA.style.display = ""
    newBtn.style.display = ""
    navNW.style.display = ""
    navW.style.display = ""
    navLO.style.display = ""
  } else {
    logInBtn1.style.display = ""
    signUpBtn1.style.display = ""
    workoutsA.style.display = "none"
    newBtn.style.display = "none"
    navNW.style.display = "none"
    navW.style.display = "none"
    navLO.style.display = "none"
  }
  
}

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

      // titleA.dataset.currentuser = userInfo.name
      // titleA.innerText = `Gains - ${userInfo.name}`
      initialDomManipulation()
      renderExercises()

      eventFire(closeSignUpModalBtn, "click")
    }
  })
})


logInBtn2.addEventListener("click", () => {
  // debugger
  let username = qs("input#logInUsername").value
  let password = qs("input#logInPassword").value

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(res => res.json())
  .then(userInfo => {
    if(userInfo.token) {
      localStorage.token = userInfo.token

      // titleA.dataset.currentuser = userInfo.name
      // titleA.innerText = `Gains - ${userInfo.name}`
      initialDomManipulation()
      renderExercises()

      eventFire(closeLogInModalBtn, "click")
      // logInForm.reset()
    }
  })
})

//Log out
logOutBtn.addEventListener("click", () => {
  localStorage.clear()

  initialDomManipulation()
  renderExercises()
})


//Create Exercises
newWorkoutForm.addEventListener("submit", () => {
  event.preventDefault()
  // some function to create workout and render it
  createWorkout(event.target)
  
  newWorkoutForm.reset()

  eventFire(newBtn, "click")
})

async function createWorkout(form) {

  let workoutName = form[0].value
  let [lift1, sets1, reps1, weights1] = [form[1].value, form[2].value, form[3].value, form[4].value]
  let [lift2, sets2, reps2, weights2] = [form[5].value, form[6].value, form[7].value, form[8].value]
  let [lift3, sets3, reps3, weights3] = [form[9].value, form[10].value, form[11].value, form[12].value]
  let [lift4, sets4, reps4, weights4] = [form[13].value, form[14].value, form[15].value, form[16].value]

  if (workoutName) {
    let workOutResponse = await fetch("http://localhost:3000/api/exercises", {
          method: "POST",
          headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
          },
          body: JSON.stringify({
          name: workoutName,
          // user_id: 1
          })
      })

      let newExercise = await workOutResponse.json()

      if (await lift1 && sets1 && reps1 && weights1) {
       let lift1Res = await fetch("http://localhost:3000/api/lifts", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${localStorage.token}`,
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
      //  let ex1 = await lift1Res.json()
      }

      if (await lift2 && sets2 && reps2 && weights2) {
        let lift2Res = await fetch("http://localhost:3000/api/lifts", {
              method: "POST",
              headers: {
              Authorization: `Bearer ${localStorage.token}`,
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

          // let ex2 = await ex2Res.json()
      }

      if (await lift3 && sets3 && reps3 && weights3) {
        let lift3Res = await fetch("http://localhost:3000/api/lifts", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${localStorage.token}`,
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

          // let ex3 = await ex3Res.json()
      }

      if (await lift4 && sets4 && reps4 && weights4) {
        let lift4Res = await fetch("http://localhost:3000/api/lifts", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${localStorage.token}`,
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

        // let ex4 = await ex4Res.json()
      }

      let exWithLifts = await fetch(`http://localhost:3000/api/exercises/${newExercise.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        }
      })
      let createdExercise = await exWithLifts.json()
      // debugger
      renderExercise(createdExercise)
  }
}

//Read Exercises
function renderExercises() {
  workoutsContainer.innerHTML=""
  fetch("http://localhost:3000/api/exercises", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  })
  .then(res => res.json())
  .then(exercises => {
    console.log(exercises)
    exercises.forEach(exercise => renderExercise(exercise))
  })
}

function renderExercise(createdExercise) {
  // debugger
  let div1 = document.createElement("div")
  div1.className = "row justify-content-center no-gutters mb-5 mb-lg-0"
  div1.id = createdExercise.id

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
    modalBtn.dataset.exerciseid = createdExercise.id
    // debugger
    // updateWorkoutForm.exerciseid = createdExercise.id
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
  workoutsContainer.prepend(div1)
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
updateWorkoutForm.addEventListener("submit", async () => {
  event.preventDefault()
  // debugger
  await updateWorkout(event.target)
  renderExercises()
  updateWorkoutForm.reset()
  eventFire(closeModalBtn, "click")
})

async function updateWorkout(form) {
  // debugger
  let id = modalBtn.dataset.exerciseid
  // const updateWorkoutForm = document.querySelector("#editWorkoutForm")
  let workoutName = form[0].value

  let [lift1, sets1, reps1, weights1] = [form[1].value, form[2].value, form[3].value, form[4].value]

  let [lift2, sets2, reps2, weights2] = [form[5].value, form[6].value, form[7].value, form[8].value]

  let [lift3, sets3, reps3, weights3] = [form[9].value, form[10].value, form[11].value, form[12].value]

  let [lift4, sets4, reps4, weights4] = [form[13].value, form[14].value, form[15].value, form[16].value]

  if (workoutName) {
    let exRes = await fetch(`http://localhost:3000/api/exercises/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: workoutName
      })
    })
    
    let updatedExercise = await exRes.json()
    // console.log(updatedExercise)

    if (await lift1 && sets1 && reps1 && weights1) {
      let lift1Res = await fetch(`http://localhost:3000/api/lifts/${updatedExercise.lifts[0].id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: lift1,
          exercise_id: updatedExercise.id, //id isnt showing up
          sets: sets1,
          reps: reps1,
          weights: weights1
        })
      })
    }
    
    if (await lift2 && sets2 && reps2 && weights2) {
      let lift2Res = await fetch(`http://localhost:3000/api/lifts/${updatedExercise.lifts[1].id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
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

    if (await lift3 && sets3 && reps3 && weights3) {
      let lift3res = await fetch(`http://localhost:3000/api/lifts/${updatedExercise.lifts[2].id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
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

    if (await lift4 && sets4 && reps4 && weights4) {
      let lift4Res = await fetch(`http://localhost:3000/api/lifts/${updatedExercise.lifts[1].id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
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
  }
}

//Destroy Exercise
deleteExerciseBtn.addEventListener("click", async () => {
  let id = modalBtn.dataset.exerciseid
  // debugger
  await fetch(`http://localhost:3000/api/exercises/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    }
  })

  document.getElementById(`${id}`).remove()

  // exerciseDiv.remove()

  // renderExercises()

  eventFire(closeModalBtn, "click")
})






