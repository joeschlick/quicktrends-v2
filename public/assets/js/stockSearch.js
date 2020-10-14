const stockInput = $("#stockInput");
const submit = $("#stockSearch");
const trashBtn = $("#trash-btn");
const stockAnchor = $("#stockAnchor");

function submitStock(event) {
  event.preventDefault();
  let stock = stockInput.val();
  $.ajax({
    method: "POST",
    url: "/api/stocks/" + stock,
  }).then(function (data) {
    location.replace("/dashboard/" + data.id);
  });
}

function deleteStock() {
  const data_id = trashBtn.parent().data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/stocks/" + data_id,
  }).then(function () {
    location.reload();
  });
}

// function submitStock(event) {
//   event.preventDefault();
//   let stock = $(this).attr("data-name")
//   $.ajax({
//     method: "POST",
//     url: "/api/stocks/" + stock,
//   }).then(function (data) {
//     location.replace("/dashboard/" + data.id);
//   });
// }

// $("#stockAnchor").on("click", function (event) {
//     event.preventDefault();
//     let reStock = $(this).val()
//     console.log(reStock)
//     $.ajax({
//       method: "POST",
//       url: "/api/stocks/" + reStock,
//     }).then(function () {
//       location.reload();
//     });
// })

submit.on("click", submitStock);
trashBtn.on("click", deleteStock);
stockAnchor.click(function(event){
  console.log("something")
  event.preventDefault();
  let stock = $(this).attr("data-name")
  console.log("stock")
  $.ajax({
    method: "POST",
    url: "/api/stocks/" + stock,
  }).then(function (data) {
    location.replace("/dashboard/" + data.id);
  });
 
});
