// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAaeIdMWs85oKT_67jgYPD_aVbtcST5Nhs",
  authDomain: "contact-form-6049d.firebaseapp.com",
  databaseURL:
    "https://contact-form-6049d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "contact-form-6049d",
  storageBucket: "contact-form-6049d.appspot.com",
  messagingSenderId: "806657448188",
  appId: "1:806657448188:web:6953215cee5552ae939f79",
  measurementId: "G-2WFXKYCD8K",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var messageRef = firebase.database().ref("messages");
// var fname = document.getElementById('name').value;

$(".datepicker").datepicker({});

document.getElementById("survey-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  // Get values
  var fname = getInputVal("name");
  var lname = getInputVal("last-name");
  var email = getInputVal("email");
  var gender = getInputVal("dropdown");
  var date = getInputVal("date");
  var image = imgUrl;

  // Function to get get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }

  // Save message
  saveMessage(fname, lname, email, gender, date, image);

  // Show alert
  alert("User added");

  // Clear form
  document.getElementById("survey-form").reset();
}

//validation function
function validateForm() {
  var x = document.forms["survey-form"]["name"].value;
  if (x == null || x == "") {
    alert("First name must be filled out");
    return false;
  }

  var y = document.forms["survey-form"]["last-name"].value;
  if (y == null || y == "") {
    alert("Last name name must be filled out");
    return false;
  }

  var z = document.forms["survey-form"]["email"].value;
  if (z == null || z== "") {
    alert("Email name name must be filled out");
    return false;
  }

  var w = document.forms["survey-form"]["date"].value;
  if (w== null || w== "") {
    alert("You have to pick your birth date");
    return false;
  }
}

//delete from table + database

function deleteRow(r, id) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("tabel").deleteRow(i);

  const dbRef = firebase.database().ref();
  const userRef = dbRef.child("messages/" + id);
  userRef.remove();
}

//format image to base64 string

function encodeImageFileAsURL() {
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      imgUrl = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
document
  .getElementById("customFile")
  .addEventListener("change", encodeImageFileAsURL, false);

//push all data to firebase db

function saveMessage(fname, lname, email, gender, date, image) {
  var newMessageRef = messageRef.push();
  newMessageRef.set({
    fname: fname,
    lname: lname,
    email: email,
    gender: gender,
    date: date,
    image: imgUrl,
  });
}

//Select all the data from db page load
var initload = false;
function SelectAllData() {
  firebase
    .database()
    .ref("messages")
    .once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const employee = { id: childSnapshot.key, ...childSnapshot.val() };
        AddItemsToTable(
          employee.fname,
          employee.lname,
          employee.email,
          employee.gender,
          employee.date,
          employee.image,
          employee.id
        );
      });
      initload = true;
    });

  // function (AllRecords) {
  //   AllRecords.forEach(
  //     function (CurrentRecord) {
  //       var id = CurrentRecord.val().id;
  //       var fname = CurrentRecord.val().fname;
  //       var lname = CurrentRecord.val().lname;
  //       var email = CurrentRecord.val().email;
  //       var gender = CurrentRecord.val().gender;
  //       var date = CurrentRecord.val().date;
  //       var image = CurrentRecord.val().image;
  //       AddItemsToTable(fname, lname, email, gender, date, image , id);
  //     }
  //   );
  // });
}
window.onload = SelectAllData;

//display data on table

var id = 0;

function AddItemsToTable(fname, lname, email, gender, date, image, id) {
  var tbody = document.getElementById("tbody-test");
  var trow = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var td6 = document.createElement("td");
  var td7 = document.createElement("td");
  var td8 = document.createElement("td");

  td1.innerHTML = id;
  td2.innerHTML = "<img src=" + image + ">";
  td3.innerHTML = fname;
  td4.innerHTML = lname;
  td5.innerHTML = email;
  td6.innerHTML = gender;
  td7.innerHTML = date;
  td8.innerHTML =
    '<input type="button" value="Delete" onclick="deleteRow(this,\'' +
    id +
    "')\" />";

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(td7);
  trow.appendChild(td8);
  tbody.appendChild(trow);
}

messageRef.on("child_added", (snapshot) => {
  if (initload) {
    const employee = { id: snapshot.key, ...snapshot.val() };
    AddItemsToTable(
      employee.fname,
      employee.lname,
      employee.email,
      employee.gender,
      employee.date,
      employee.image,
      employee.id
    );
  }
});
