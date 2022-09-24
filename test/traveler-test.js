import { expect } from 'chai';
import Traveler from "../src/traveler";
import { sampleTravelers } from "../src/sample-data";

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

it('should have a travelers id', () => {
  expect(traveler1.id).to.equal(1)
})

it('should have a travelers name', () => {
  expect(traveler1.name).to.equal("Ham Leadbeater")
})

it('should have a travelers first name', () => {
  expect(traveler1.getTravelerFirstName()).to.equal("Ham")
})

it('should have the travelers type', () =>{
  expect(traveler1.travelerType).to.equal('relaxer')
})

it('should get travelers by id', () => {
  expect(traveler1.getTravelerById(1)).to.equal(1)
})


})
