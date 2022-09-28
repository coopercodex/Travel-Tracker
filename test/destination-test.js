import { expect } from 'chai';
import Destination from "../src/destination";
import { destinationsData } from "../src/sample-data";

describe('Destination', () => {
  let destination1


  beforeEach(() => {
    destination1 = new Destination(destinationsData);

  })

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  })

  it('should be an instance of Destination', () => {
    expect(destination1).to.be.an.instanceOf(Destination);
  })

  it('should get a destination by id', () => {
    expect(destination1.getDestinationId('Lima, Peru')).to.deep.equal(
      {
        id: 1,
        destination: 'Lima, Peru',
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
        alt: 'overview of city buildings with a clear sky'
      })
  })

  it('should get a destinations location', () => {
    expect(destination1.destination[0].destination).to.equal('Lima, Peru')
  })

})
