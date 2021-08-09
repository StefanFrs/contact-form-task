
 $(".datepicker").datepicker({});
 const signUp = (e) => {
   let formData = JSON.parse(localStorage.getItem("formData")) || [];
   formData.push({
     fname: document.getElementById("name").value,
     lname: document.getElementById("last-name").value,
     email: document.getElementById("email").value,
     gender: document.getElementById("dropdown").value,
     date: document.getElementById("date").value,
     image: imgUrl,
   });
   localStorage.setItem("formData", JSON.stringify(formData));
   console.log(localStorage.getItem("formData"));
   dispData();
   e.preventDefault();
 };
 function dispData() {
   console.log(localStorage.getItem("formData"));
   if (localStorage.getItem("formData")) {
     var output = document.querySelector("tbody");
     output.innerHTML = "";
     JSON.parse(localStorage.getItem("formData")).forEach((data) => {
       output.innerHTML += `
                         <tr>
                           <td> <img src=${data.image}> </td>
                             <td>${data.fname}</td>
                             <td>${data.lname}</td>
                             <td>${data.email}</td>
                             <td>${data.gender}</td>
                             <td>${data.date}</td>
                             <td>  <button type="button" class="btn btn-danger" onclick="deleteRow(this)" />Delete </button></td>
                         </tr>
                 `;
     });
   }
 }
 dispData();
 function deleteRow(r) {
   var i = r.parentNode.parentNode.rowIndex;
   document.getElementById("tabel").deleteRow(i);
 }

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
 document.getElementById("customFile").addEventListener("change", encodeImageFileAsURL, false);

 //incercare2
 // function convertImageToBase64(img) {
 //   var canvas = document.createElement("canvas");
 //   canvas.width = img.width;
 //   canvas.height = img.height;

 //   var ctx = canvas.getContext("2d");
 //   ctx.drawImage(img, 0, 0);

 //   var dataURL = canvas.toDataURL("assets/images");

 //   return dataURL.replace(/^data:images\/(png|jpg);base64,/, "");
 // }