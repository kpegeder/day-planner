// const today = moment();
$("#currentDay").text(moment().format("MMMM Do YYYY"));

let todayPlan = [];

init();
checkTime();

// Get input button
$("button").on("click", function () {
  //Getting Input
  let eventTime = $(this).parent().children(".hour").text();
  let eventPlan = $(this).prev().val();
  recordEvent(eventTime, eventPlan);
});

// Store input
function storePlan(time, plan) {
  localStorage.setItem("timePlan", JSON.stringify(todayPlan));
}

// Record the event
function recordEvent(timeID, planID) {
  let eventName = {
    time: timeID,
    plan: planID
  };
  console.log(eventName);
  // Don't record in no input
  if (eventName.plan === "") {
    return;
  }

  todayPlan.push(eventName);
  $("#eventInput").val("");
  storePlan();
}

// Display event
function showEvent() {
  let timeArray = [];
  console.log(typeof $(this).text());
  $(".hour").each(function () {
    console.log("Round");
    timeArray.push($(this).text());

    // if ($(this).text() == todayPlan[i].time) {
    //   console.log("True");
    // }
    // i++;
  });
  console.log(timeArray);
  // for (let i = 0; i < todayPlan.length; i++) {
  //   let inputEvent = todayPlan[i];
  //   $(".description").text(inputEvent.plan);

  //   console.log(inputEvent);
  // }
}

// Get stored plans
function init() {
  let storedPlans = JSON.parse(localStorage.getItem("timePlan"));
  if (storedPlans !== null) {
    todayPlan = storedPlans;
  }
  showEvent();
}

// Check time
function checkTime() {
  // Actual time
  let theTime = moment().format("HH");

  $(".time-block").each(function () {
    let plannerTime = $(this).attr("id").split("-");

    if (parseInt(plannerTime[1]) < theTime) {
      $(this).addClass("past");
    } else if (parseInt(plannerTime[1]) == theTime) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}
