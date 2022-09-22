import { expect } from 'chai';
import Traveler from "../src/traveler";
import TravelerRepository from '../src/travelersRepository';
import { sampleTravelers } from "../src/sample-data";

describe('Traveler Repository', () => {
  let sampleTraveler1
  let singleTraveler1


  beforeEach(() => {
    sampleTraveler1 = new TravelerRepository(sampleTravelers)
    singleTraveler1 = new Traveler(sampleTravelers[0])
  });

  it('should be a function', function () {
    console.log(sampleTraveler1)
    expect(TravelerRepository).to.be.a('function');
  });

  it('should be an instance of traveler repository', () => {
    expect(sampleTraveler1).to.be.an.instanceOf(TravelerRepository);
  })

  it('should hold all travelers data', () => {
    expect(sampleTraveler1.traveler).to.equal(sampleTravelers)
  })

  it('should get travelers by id', () => {
    expect(sampleTraveler1.getTravelerById(1)).to.deep.equal(singleTraveler1)
  })
})