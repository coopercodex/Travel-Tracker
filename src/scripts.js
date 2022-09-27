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
let estimatedTotal = document.getElementById('total');
let loginButton = document.getElementById('loginBtn');
let userName = document.getElementById('username');
let passWord = document.getElementById('password');
let loginError = document.getElementById('loginError');
let entirePage = document.querySelector('.entire-page');
let widgetsContainer = document.querySelector('.widgets-container')
let loginSection = document.querySelector('.login-page');
let bookingButton = document.querySelector('.book-button');




// EventListners
// window.addEventListener('load', initiateData);
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
// import { destinationsData } from "../src/sample-data";

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
    travelerData = data[0].travelers;
    console.log('TDATA', travelerData)
    destinationData = data[1].destinations;
    console.log('DDDATA', travelerData)
    tripData = data[2].trips;
    console.log(tripData)
    // traveler = new Traveler(travelerData);
    destination = new Destination(destinationData);
    trip = new Trip(tripData);
    currentDate = new Date().toJSON().slice(0, 10).split('-').join('/');
    renderTravelInfo(traveler, trip)
    renderTravelersTrips(traveler, trip)
  })
}

function submitButtons(event) {
  switch (event.target.className) {
    case "check-rate-btn":
      checkInputs(event);
      newTripCost();

  }
}
const toggleMainPage = () => {
  loginButton.classList.toggle('hidden');
  loginSection.classList.toggle('hidden');
  entirePage.classList.toggle('hidden');
  widgetsContainer.classList.toggle('hidden');
}

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
    console.log('dataa', data)
    traveler = new Traveler(data)
    console.log('theTraveler', traveler)
    initiateData()
    toggleMainPage()
  })
}

function checkInputs() {
  if (selectCity.value === '') {
    console.log(selectCity.value)
    return postError.innerHTML = 'Please choose a date'
  }
}

const getDestinationId = (location) => {
  const destinationId = destinationData.find(place => place.destination === location)
  return destinationId.id
}


const sendTripApplication = () => {
  tripInfo = {
   id: Date.now(),
   userID: traveler.id,
   destinationID: getDestinationId(selectCity.value),
   travelers: parseInt(travelersGroupSize.value),
   date: startDate.value.split("-").join("/"),
   duration: parseInt(tripLength.value),
   status: 'pending',
   suggestedActivities: []
 };
 postTripApplication(tripInfo)
 console.log('TRIP', tripInfo)
 resetInputs()
 console.log('TRIPAfterRest', tripInfo)
 renderTravelersTrips(traveler, trip)
}
//update traveler trips to call traveler method ^

const resetInputs = () => {
  startDate.value = ''
  tripLength.value = ''
  travelersGroupSize.value = ''
  selectCity.value = ''
  presentTrips.innerHTML += ''
}


function newTripCost(event) {
  let targetDestination = selectCity.value;
  let numberOfPeople = travelersGroupSize.value;
  let stayLength = tripLength.value;
  console.log(destinationData)
  let pendingDestinaiton = destinationData.find((location) => location.destination === targetDestination);
  let airCost = numberOfPeople * pendingDestinaiton.estimatedFlightCostPerPerson;
  let lodgingCost = stayLength * pendingDestinaiton.estimatedLodgingCostPerDay;
  let subTotal = (airCost + lodgingCost) * 1.1;
  return possibleTrip.innerHTML = `
    <p>Estimated flights cost: $${airCost}</p>
    <p>Estimated lodging cost: $${lodgingCost}</p>
    Current total $${subTotal}`
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
  tripCostForYear.innerText = ` $${trip.getTotalCost(traveler.id, currentDate, destination.destination)}`;
  destinationInputs()
}

function renderTravelersTrips(traveler, trip) {
  console.log(traveler, trip)
  let logpastTrips = trip.getPastTrips(traveler.id, currentDate);
  pastTrips.innerHTML = '';
  if (logpastTrips.length > 0) {
    logpastTrips.forEach((trip) => {
      pastTrips.innerHTML += `<p> Past Trips<br>Trip Date: ${trip.date}<br>
   Travelers: ${trip.travelers} <br>
   Duration: ${trip.duration} <br>
   Status: ${trip.status} <br></p>`
    })
  } else {
    pastTrips.innerHTML += `<h4> You have no past trips.`
  }


  let logPresentTrips = trip.getPendingTrips(traveler.id, currentDate);
  presentTrips.innerHTML = '';
  if (logPresentTrips.length > 0) {
    logPresentTrips.forEach((trip) => {
      presentTrips.innerHTML += `<p>Pending Trips<br>Trip Date: ${trip.date}<br>
   Travelers: ${trip.travelers} <br>
   Duration: ${trip.duration} <br>
   Status: ${trip.status} <br></p>`
    })
  } else {
    presentTrips.innerHTML += `<h4> You have no trips at this time.`;
  }

  let logFutureTrips = trip.getFutureTrips(traveler.id, currentDate);
  futureTrips.innerHTML = '';
  console.log(futureTrips)
  console.log('Future Trips', logFutureTrips)
  if (logFutureTrips.length > 0) {
    logFutureTrips.forEach((trip) => {
      futureTrips.innerHTML += `<p>Upcoming Trips<br>Trip Date: ${trip.date}<br>
   Travelers: ${trip.travelers} <br>
   Duration: ${trip.duration} <br>
   Status: ${trip.status} <br></p>`
    })
  } else {
    futureTrips.innerHTML += `<h4> You have no upcoming trips.`;
  }

}

bookingButton.addEventListener('click', sendTripApplication)





