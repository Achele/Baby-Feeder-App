// PSEUDO CODE
// We add an event (click) to the radio buttons to indicate which breast is the food canteen at the moment
// Add event(click) to Start and Stop buttons. This event should show the timer and also start/stop the timer.
// The stop button also should capture the feeding duration and display(store) the feeding duration. This will also reset the timer.
// The feeding logs will be a different page
// CHange feeding logs to an icon(like paper/stack of papers)

// Declaring the Variable
const leftFoodBank = document.querySelector(".left");
const rightFoodBank = document.querySelector(".right");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".stop");
let foodBankChosen = '';
let feedingLog = []



const getStopWatchEl = document.querySelector("#watch")


let [hrs, min, sec, millisec] = [0, 0, 0, 0]
let integer = null
// Add event listerner
leftFoodBank.addEventListener("click", () => {
  foodBankChosen = 'leftFoodBank'
  startBtn.disabled = false
})

rightFoodBank.addEventListener("click", () => {
  foodBankChosen = 'rightFoodBank'
  startBtn.disabled = false
})

startBtn.addEventListener("click", displayTimer)

function displayTimer() {
  if (foodBankChosen !== '') {
    // startBtn.disabled = false
  }
  if (integer !== null) {
    clearInterval(integer)
  }
  integer = setInterval(getInterval, 10)
}

const getInterval = () => {
  millisec += 10;
  if (millisec === 1000) {
    millisec = 0;
    sec++;
  } if (sec === 60) {
    sec = 0;
    min++;

  } if (min === 60) {
    min = 0
    hrs++

  } else if (hrs === 24) {
    // console.log("stop")
  }

  let ms = millisec < 10 ? "00" + millisec : millisec < 100 ? "00" + millisec : millisec

  let stringMs = ms.toString().slice(-3, -1)


  let h = hrs < 10 ? "0" + hrs : hrs
  let s = sec < 10 ? '0' + sec : sec;
  let m = min < 10 ? '0' + min : min;
  getStopWatchEl.textContent =
    `${h}:${m}:${s}:${stringMs}`

}

const getResetBtn = document.querySelector(".reset")

let getTime = new Date()
let date = getTime.toDateString();
let minutes = getTime.getMinutes()
let seconds = getTime.getSeconds()
let hours = getTime.getHours()

getResetBtn.addEventListener("click", () => {
  //before the stopwatch is reset get the log
  let stopWatchData = getStopWatchEl.textContent;
  startBtn.disabled = true
  if (stopWatchData !== '00:00:00:00') {
    let log = {
      date,
      time: `${hours}:${minutes}:${seconds}`,
      foodBankChosen,
      stopWatchData
    };
    recentLog()
    // console.log(log);
    //push log into the feedinglog 
    feedingLog.push(log);
    console.log(feedingLog);

    const localStorageLog = JSON.stringify(feedingLog)
    localStorage.setItem('log', localStorageLog)
    //clear the stopwatch
    clearInterval(integer);
    [hrs, min, sec, millisec] = [00, 00, 00, 00];
    //reset textContent
    getStopWatchEl.textContent = '00:00:00:00';
    leftFoodBank.checked = false
    rightFoodBank.checked = false
  }
})



pauseBtn.addEventListener("click", () => {
  clearInterval(integer)
})

// create function to display most recent feeding time under the feeding log link
//create function to grab whatever is in the timer textContent and place into feeding logs
//make sure each time you click radio buttons the timer needs to reset to zero

const recentLog = () => {
  if (getStopWatchEl.textContent !== '00:00:00:00') {
    document.querySelector('.recentlog').textContent = getStopWatchEl.textContent
  }

}


