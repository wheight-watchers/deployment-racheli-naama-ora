function getDiaryForCurrentuser() {
  debugger;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("userId");
  const userDiary = new URL(`https://safe-tor-83297.herokuapp.com/users/${id}/diary`)

  const xhr = new XMLHttpRequest();
  xhr.open("GET", userDiary);
  xhr.send();
  xhr.onload = () => {
    const diary = JSON.parse(xhr.response);
    let table = `<table>
      <tr>
      <th>Date</th>
      <th>Breakfast</th>
      <th>Lunch</th>
      <th>Dinner</th>
      <th>Intermediate snack</th>
      </tr>
      `;
    diary.forEach((day) => {
      debugger;
      table += `<tr><th>${day.date}</th>`;
      let foods1 = "";
      day.summary[0].Breakfast.forEach((i, ind) => {
        debugger;
        foods1 += Object.byString(day.summary[0], `Breakfast[${ind}]`) + ", ";
      });
      table += `<td>${foods1}</td>`;
      let foods2 = "";
      day.summary[1].Lunch.forEach((i, ind) => {
        debugger;
        foods2 += Object.byString(day.summary[1], `Lunch[${ind}]`) + ", ";
      });
      table += `<td>${foods2}</td>`;
      let foods3 = "";
      day.summary[2].Dinner.forEach((i, ind) => {
        debugger;
        foods3 += Object.byString(day.summary[2], `Dinner[${ind}]`) + ", ";
      });
      table += `<td>${foods3}</td>`;
      let foods4 = "";
      day.summary[3].IntermediateSnack.forEach((i, ind) => {
        debugger;
        foods4 +=
          Object.byString(day.summary[3], `IntermediateSnack[${ind}]`) + ", ";
      });
      table += `<td>${foods4}</td>`;
      debugger;
      table += `</tr>`;
    });
    table += `</table>`;
    document.getElementById("diary").innerHTML += table;
  }
}

Object.byString = function (o, s) {
  debugger;
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  let a = s.split(".");
  for ( i = 0, n = a.length; i < n; ++i) {
    let k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  debugger;
  const dateInput = document.getElementById("dateInput");
  dateInput.value = new Date().toLocaleDateString();
  modal.style.display = "block";
  debugger;
  addInputForBreakfast();
  addInputForLunch();
  addInputForDinner();
  addInputForSnack();
};
numOfInputsForBreakfast = 0;
function addInputForBreakfast() {
  debugger;
  let lastNum = numOfInputsForBreakfast - 1;
  let lastInput = document.getElementById("inputForBreakFast" + lastNum);
  if (!lastInput || lastInput.value !== "") {
    if (lastInput) {
      lastInput.removeEventListener("input", addInputForBreakfast);
    }
    debugger;
    let body = document.getElementById("Breakfast_inputs");
    let input = document.createElement("input");
    input.id = "inputForBreakFast" + numOfInputsForBreakfast;
    numOfInputsForBreakfast += 1;
    input.addEventListener("input", addInputForBreakfast);
    body.appendChild(input);
  }
}
numOfInputsForLunch = 0;
function addInputForLunch() {
  debugger;
  let lastNum = numOfInputsForLunch - 1;
  let lastInput = document.getElementById("inputForLunch" + lastNum);
  if (!lastInput || lastInput.value !== "") {
    if (lastInput) {
      lastInput.removeEventListener("input", addInputForLunch);
    }
    debugger;
    let body = document.getElementById("Lunch_inputs");
    let input = document.createElement("input");
    input.id = "inputForLunch" + numOfInputsForLunch;
    numOfInputsForLunch += 1;
    input.addEventListener("input", addInputForLunch);
    body.appendChild(input);
  }
}
numOfInputsForDinner = 0;
function addInputForDinner() {
  debugger;
  let lastNum = numOfInputsForDinner - 1;
  let lastInput = document.getElementById("inputForDinner" + lastNum);
  if (!lastInput || lastInput.value !== "") {
    if (lastInput) {
      lastInput.removeEventListener("input", addInputForDinner);
    }
    debugger;
    let body = document.getElementById("Dinner_inputs");
    let input = document.createElement("input");
    input.id = "inputForDinner" + numOfInputsForDinner;
    numOfInputsForDinner += 1;
    input.addEventListener("input", addInputForDinner);
    body.appendChild(input);
  }
}

numOfInputsForSnack = 0;
function addInputForSnack() {
  debugger;
  let lastNum = numOfInputsForSnack - 1;
  let lastInput = document.getElementById("inputForSnack" + lastNum);
  if (!lastInput || lastInput.value !== "") {
    if (lastInput) {
      lastInput.removeEventListener("input", addInputForSnack);
    }
    debugger;
    let body = document.getElementById("IntermediateSnack_inputs");
    let input = document.createElement("input");
    input.id = "inputForSnack" + numOfInputsForSnack;
    numOfInputsForSnack += 1;
    input.addEventListener("input", addInputForSnack);
    body.appendChild(input);
  }
}


span.onclick = function () {
  modal.style.display = "none";
};
async function addDayToDiary() {
  debugger;
  const dateInput = document.getElementById("dateInput").value;
  let snackArr = [];
  for (let index = 0; index < numOfInputsForSnack; index++) {
    debugger;
    const element = document.getElementById("inputForSnack" + index).value;
    snackArr.push(element);
  }
  let breakfastArr = [];
  for (let index = 0; index < numOfInputsForBreakfast; index++) {
    const element = document.getElementById("inputForBreakFast" + index).value;
    breakfastArr.push(element);
  }
  let lunchArr = [];
  for (let index = 0; index < numOfInputsForLunch; index++) {
    const element = document.getElementById("inputForLunch" + index).value;
    lunchArr.push(element);
  }
  let dinnertArr = [];
  for (let index = 0; index < numOfInputsForDinner; index++) {
    const element = document.getElementById("inputForDinner" + index).value;
    dinnertArr.push(element);
  }

  const data = {
    date: dateInput,
    summary: [
      {
        Breakfast: breakfastArr,
      },
      {
        Lunch: lunchArr,
      },
      {
        Dinner: dinnertArr,
      },
      {
        IntermediateSnack: snackArr,
      },
    ],
  };
  debugger
  const params = new URLSearchParams(window.location.search);
  const id = params.get("userId");
  // let diary = [];
  const xhr = new XMLHttpRequest();
  const userDiary = new URL(`https://safe-tor-83297.herokuapp.com/users/${id}/diary`)

  // xhr.open("GET", userDiary);
  // xhr.send();
  // xhr.onload = () => {
  //   debugger;
  //   if (xhr.status != 200) {
  //     alert(`Error ${xhr.status}: ${xhr.statusText}`);
  //   } else {
  //      diary =await JSON.parse(xhr.response);
  //   }
  //   diary[diary.length] = data;
    await fetch(userDiary, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => {
        debugger;
        response.json();
      })
      .then((data) => {
        alert("Success:", data);
      })
      .catch((error) => {
        alert("Error:", error);
      });

    const content_IntermediateSnack_inputs = document.getElementById(
      "IntermediateSnack_inputs"
    );
    content_IntermediateSnack_inputs.innerHTML = "";
    const content_Dinner_inputs = document.getElementById("Dinner_inputs");
    content_Dinner_inputs.innerHTML = "";
    const content_Lunch_inputs = document.getElementById("Lunch_inputs");
    content_Lunch_inputs.innerHTML = "";
    const content_Breakfast_inputs =
      document.getElementById("Breakfast_inputs");
    content_Breakfast_inputs.innerHTML = "";
    modal.style.display = "none";
  // };
}
