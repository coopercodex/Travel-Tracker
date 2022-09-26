import { expect } from 'chai';
import Traveler from "../src/traveler";
import { sampleTravelers, tripsData, destinationsData } from "../src/sample-data";

describe('Traveler', () => {
  let traveler1


beforeEach(() => {
  traveler1 = new Traveler(sampleTravelers[0]);
})

it ('should be a function', () => {
  expect(Traveler).to.be.a('function');
})

it('should be an instance of traveler', () => {
  expect(traveler1).to.be.an.instanceOf(Traveler);
})

it('should have a travelers first name', () => {
  expect(traveler1.getTravelerFirstName(1)).to.equal("Ham")
})

it('should have the travelers type', () => {
  expect(traveler1.travelerType).to.equal('relaxer')
})


it.skip('should caculate cost of trips of most recent year', () => {
  expect(traveler1.getCostOfTripsOfYear(1, destinationsData)).to.equal()
})

})
