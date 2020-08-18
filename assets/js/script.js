$(document).ready(function () {
  // Set time
  $("#currentDay").text(moment().format("LL"));

  let todayPlan = [];

  // Get input button
  $("button").on("click", function () {
    //Getting Input
    let eventTime = $(this).parent().children(".hour").text();
    let eventPlan = $(this).prev().val();
    recordEvent(eventTime, eventPlan);
  });

  // Store input
  function storePlan() {
    localStorage.setItem("timePlan", JSON.stringify(todayPlan));
  }

  // Record the event
  function recordEvent(timeID, planID) {
    // Create an planner object
    let eventName = {
      time: timeID,
      plan: planID
    };

    // Save the most recent plan
    todayPlan = todayPlan.filter(function (timeSlot) {
      if (timeSlot.time != eventName.time) {
        return true;
      }
    });

    // Add plan to an array
    todayPlan.push(eventName);
    storePlan();
  }

  // Display event
  function showEvent() {
    let timeArray = [];

    $(".hour").each(function () {
      timeArray.push($(this).text());
    });

    for (let i = 0; i < todayPlan.length; i++) {
      let inputEvent = todayPlan[i];

      // Find time of an event and print out plan
      index = jQuery.inArray(inputEvent.time, timeArray);
      planEl = $($(".description").get(index));
      planEl.text(inputEvent.plan);
    }
  }

  // Get stored plans
  init();
  function init() {
    let storedPlans = JSON.parse(localStorage.getItem("timePlan"));

    if (storedPlans !== null) {
      todayPlan = storedPlans;
    }
    showEvent();
  }

  // Check time and set background
  checkTime();
  function checkTime() {
    // Actual time
    let theTime = moment().format("HH");

    $(".time-block").each(function () {
      let plannerTime = $(this).attr("id").split("-");

      if (parseInt(plannerTime[1]) < theTime) {
        $(this).addClass("past");
      } else if (parseInt(plannerTime[1]) == theTime) {
        $(this).removeClass("past").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  setInterval(checkTime, 15000);
});
