// Query Selectors
let firstName = document.getElementById('firstName');
let tripCostForYear = document.getElementById('tripCost');
let pastTrips = document.getElementById('pastTrips')
let startDate = document.getElementsByClassName(".start-date-input")






// EventListners
window.addEventListener('load', initiateData);




// Imports
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import "./css/styles.css";
import { fetchAllData } from './apiCalls';
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
    destinationData = data[1].destinations;
    tripData = data[2].trips;
    traveler = new Traveler(travelerData[2]);
    destination = new Destination(destinationData);
    trip = new Trip(tripData);
    currentDate = new Date().toJSON().slice(0, 10).split('-').join('/');
    renderTravelInfo(traveler, trip)
    // renderTravelersTrips()
    // getTravelerTrips()
  })
}


function renderTravelInfo(traveler, trip) {
  firstName.innerText = ` Welcome Back ${traveler.getTravelerFirstName()}`;
  tripCostForYear.innerText = ` $${trip.getTotalCost(traveler.id, currentDate, destination.destination)}`;

}

function renderTravelersTrips() {


  // let destination = destinationRepo.getDestinationId(3)
  // let upcomingTrips = tripRepo.getUpcomingTrips()
  // console.log(`${tripRepo.getCurrentTrips()}`)
  // pastTrips.innerHTML = '';
  // pastTrips.innerHTML +=  `${upcomingTrips.forEach((tru) => {
  //   return tru
  // })}`;


}

// function getTravelerTrips() {
//   // console.log(traveler.id)
//   tripsForTraveler = trip.getTravelersTripsById(9);
//   travelerTrip = new Trip(tripsForTraveler);
//   // console.log(tripsForTraveler)
//   travelerTrip.getPastTrips();
//   travelerTrip.getCurrentTrips();
//   travelerTrip.getUpcomingTrips();
// }

// function trips() {

// }
 