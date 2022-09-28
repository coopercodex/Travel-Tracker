// Query Selectors
let firstName = document.getElementById('firstName');
let tripCostForYear = document.getElementById('tripCost');
let pastTrips = document.getElementById('pastTrips');
let presentTrips = document.getElementById('pendingTrips');
let futureTrips = document.getElementById('futureTrips');
let mainSection = document.getElementById('mainSection');
let startDate = document.getElementById("startDateInput");
let selectCity = document.getElementById('select1');
let tripLength = document.getElementById('tripLength');
let travelersGroupSize = document.getElementById('numberOfTravelers')
let possibleTrip = document.getElementById('possibleTrip');
let postError = document.getElementById('postErrorMessage');
let loginButton = document.getElementById('loginBtn');
let userName = document.getElementById('username');
let passWord = document.getElementById('password');
let loginError = document.getElementById('loginError');
let entirePage = document.querySelector('.entire-page');
let widgetsContainer = document.querySelector('.widgets-container')
let loginSection = document.querySelector('.login-page');
let bookingButton = document.querySelector('.book-button');

// EventListeners
mainSection.addEventListener('click', submitButtons);
loginButton.addEventListener('click', userLogin);

// Imports
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import "./css/styles.css";
import { fetchAllData, fetchSingleTravelerData, postTripApplication } from './apiCalls';
import Destination from "../src/destination";
import Traveler from '../src/traveler';
import Trip from "../src/trip";
import dayjs from "dayjs";

// Global Variables
let travelerData;
let traveler;
let destinationData;
let destination;
let tripData;
let trip;
let tripInfo;
let tripsForTraveler;
let travelerTrip;
let travelerId;
let currentDate;
// console.log('This is the JavaScript entry file - your code begins here.');

function initiateData() {
  Promise.all([
    fetchAllData('travelers'),
    fetchAllData('destinations'),
    fetchAllData('trips'),
  ]).then((data) => {
    travelerData = data[0];
    destinationData = data[1];
    tripData = data[2];
    destination = new Destination(destinationData);
    trip = new Trip(tripData);
    currentDate = new Date().toJSON().slice(0, 10).split('-').join('/');
    initializeUser()
    renderTravelInfo(traveler, trip);
    renderTravelersTrips(traveler, trip);
  }).catch(error => `Error: ${error}`);
}

function submitButtons(event) {
  switch (event.target.className) {
    case "check-rate-btn":
      checkInputs(event);
      newTripCost();
  }
}
// const toggleMainPage = () => {
//   loginButton.classList.toggle('hidden');
//   loginSection.classList.toggle('hidden');
//   entirePage.classList.toggle('hidden');
//   widgetsContainer.classList.toggle('hidden');
// }

function userLogin(event) {
  event.preventDefault();
  if (userName.value.slice(0, 8) === 'traveler' && passWord.value === 'travel') {
    travelerId = userName.value.slice(8)
    initializeUser()
  } else {
    loginError.innerText = 'Incorrect'
  }
}

function initializeUser() {
  fetchSingleTravelerData(travelerId).then((data) => {
    traveler = new Traveler(data)
    initiateData()
    // toggleMainPage()
  })
}

function checkInputs() {
  if (selectCity.value === '') {
    console.log(selectCity.value)
    return postError.innerHTML = 'Please choose a date'
  }
}

const sendTripApplication = () => {
  let destinationId = destination.getDestinationId(selectCity.value)
  tripInfo = {
    id: Date.now(),
    userID: traveler.id,
    destinationID: destinationId.id,
    travelers: parseInt(travelersGroupSize.value),
    date: startDate.value.split("-").join("/"),
    duration: parseInt(tripLength.value),
    status: 'pending',
    suggestedActivities: []
  };
  postTripApplication(tripInfo);
  resetInputs();
  renderTravelersTrips(traveler, trip);
}

const resetInputs = () => {
  startDate.value = ''
  tripLength.value = ''
  travelersGroupSize.value = ''
  selectCity.value = ''
}


function newTripCost() {
  let numberOfPeople = travelersGroupSize.value;
  let stayLength = tripLength.value;
  let pendingDestinaiton = destination.getDestinationId(selectCity.value);
  let airCost = numberOfPeople * pendingDestinaiton.estimatedFlightCostPerPerson;
  let lodgingCost = stayLength * pendingDestinaiton.estimatedLodgingCostPerDay;
  let subTotal = (airCost + lodgingCost) * 1.1;
  return possibleTrip.innerHTML = `
    <p>Estimated flights cost: $${airCost.toFixed(2)}</p>
    <p>Estimated lodging cost: $${lodgingCost.toFixed(2)}</p>
    Current total $${subTotal.toFixed(2)}`
}



function destinationInputs() {
  let destinationChoices = destinationData.map((choice) => {
    return `<option> ${choice.destination} </option>`
  })
  selectCity.innerHTML = `
    <label for="destination-selction">Select Trip Destination:</label>
    <select id="select1" name="destination-selection" class="destination-entry-selection" required>
    ${destinationChoices}
    </select>`
}


function renderTravelInfo(traveler, trip) {
  firstName.innerText = ` Welcome Back ${traveler.getTravelerFirstName()}`;
  tripCostForYear.innerText = ` $${trip.getTotalCost(traveler.id, currentDate, destination.destination).toFixed(2)}`;
  destinationInputs()
}

function renderTravelersTrips(traveler, trip) {
  console.log('TRIP IN RENDER', trip);
  Promise.all([fetchAllData('trips')]).then((data) => {
    tripData = data[0];
    trip.tripInformation = tripData; 

    let logPastTrips = trip.getPastTrips(traveler.id, currentDate);
    pastTrips.innerHTML = '';
    if (logPastTrips.length > 0) {
      logPastTrips.forEach((pastTrip) => {
        pastTrips.innerHTML += `<p> Past Trips<br>Trip Date: ${pastTrip.date}<br>
   Travelers: ${pastTrip.travelers} <br>
   Duration: ${pastTrip.duration} <br>
   Status: ${pastTrip.status} <br></p>`
      })
    } else {
      pastTrips.innerHTML += `<h4> You have no past trips.`
    }


    let logPresentTrips = trip.getPendingTrips(traveler.id, currentDate);
    presentTrips.innerHTML = '';
    if (logPresentTrips.length > 0) {
      logPresentTrips.forEach((presentTrip) => {
        presentTrips.innerHTML += `<p>Pending Trips<br>Trip Date: ${presentTrip.date}<br>
   Travelers: ${presentTrip.travelers} <br>
   Duration: ${presentTrip.duration} <br>
   Status: ${presentTrip.status} <br></p>`
      })
    } else {
      presentTrips.innerHTML += `<h4> You have no trips at this time.`;
    }

    let logFutureTrips = trip.getFutureTrips(traveler.id, currentDate);
    futureTrips.innerHTML = '';
    if (logFutureTrips.length > 0) {
      logFutureTrips.forEach((futureTrip) => {
        futureTrips.innerHTML += `<p>Upcoming Trips<br>Trip Date: ${futureTrip.date}<br>
   Travelers: ${futureTrip.travelers} <br>
   Duration: ${futureTrip.duration} <br>
   Status: ${futureTrip.status} <br></p>`
      })
    } else {
      futureTrips.innerHTML += `<h4> You have no upcoming trips.`;
    }
  }).catch(error => `Error: ${error}`);
}

bookingButton.addEventListener('click', () => {
  sendTripApplication();
  initiateData()
})