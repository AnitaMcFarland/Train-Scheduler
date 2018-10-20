// Initialize Firebase
var config = {
  apiKey: "AIzaSyD8BlrVw0Y1PzWrKw_lNUtw6R6W9Jan5_4",
  authDomain: "train-27961.firebaseapp.com",
  databaseURL: "https://train-27961.firebaseio.com",
  projectId: "train-27961",
  storageBucket: "train-27961.appspot.com",
  messagingSenderId: "467278021990"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on(
  "click",
  function(event) {
    console.log("click");
    event.preventDefault();

    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Grabbed values from text boxes
    var trainName = $("#form-name")
      .val()
      .trim();
    console.log(trainName);
    var destination = $("#form-destination")
      .val()
      .trim();
    var frequency = $("#form-frequency")
      .val()
      .trim();

    var firstTime = $("#form-time")
      .val()
      .trim();
    // minutesAway = $("#tMinutesTillTrain-input")
    //   .val()
    //   .trim();

    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      nextArrival: firstTime,
    //   minutesAway: tMinutesTillTrain
    });
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    console.log (sv);
    // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(sv.trainName),
    $("<td>").text(sv.destination),
    $("<td>").text(sv.frequency),
    $("<td>").text(sv.nextArrival),
    $("<td>").text(sv.minutesAway),
  
  );

  // Append the new row to the table
  $("#currentTrainSchedule > tbody").append(newRow);

// Change the HTML to reflect
// $("#trainName-display").text(sv.trainName);
// $("#destination-display").text(sv.destination);
// $("#frequency-display").text(sv.frequency);
// $("#nextArrival-display").text(sv.nextArrival);
// $("#minutesAway-display").text(sv.minutesAway);

// Handle the errors
},
function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});
