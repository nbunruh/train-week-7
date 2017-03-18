// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDcnHKUo_RwrK1mjzprPixUJGc9AKZ8GQ4",
    authDomain: "rps-week-7.firebaseapp.com",
    databaseURL: "https://rps-week-7.firebaseio.com",
    storageBucket: "rps-week-7.appspot.com",
    messagingSenderId: "1043861354907"
  };
  firebase.initializeApp(config);

var  database = firebase.database();
$('#addTrainBtn').on("click", function() {
  // takes user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  // temporary local object to hold train data
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    // sends train data to database
  database.ref().push(newTrain);
  console.log(newTrain.name);
  // clears all the input fields
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
 
  return false;
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  // store the child snapshot
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
  // first Train pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);
  // stores time difference in variable
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + timeDiff);
  // finds how much time is left and stores it in variable
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
  // stores minutes left until arrival in variable
  var minToTrain = frequency - timeRemainder;
  // next train
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});