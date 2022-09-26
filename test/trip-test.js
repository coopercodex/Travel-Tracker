import { expect } from 'chai';
import Traveler from '../src/traveler';
import Trip from "../src/trip";
import { destinationsData, tripsData } from "../src/sample-data";

describe('Trip', () => {
  let trip1


  beforeEach(() => {
    trip1 = new Trip(tripsData);

  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  })

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceOf(Trip);
  })

  it('should get travelers trips by id', () => {
    expect(trip1.getTravelersTripsById(1)).to.deep.equal(
      [
        {
          id: 1,
          userID: 1,
          destinationID: 49,
          travelers: 1,
          date: '2022/09/16',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 2,
          userID: 1,
          destinationID: 25,
          travelers: 5,
          date: '2022/10/04',
          duration: 18,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 3,
          userID: 1,
          destinationID: 22,
          travelers: 4,
          date: '2021/05/22',
          duration: 17,
          status: 'pending',
          suggestedActivities: []
        }
      ]
    )
  })

  it('should get all destinations', () => {
    expect(trip1.getDestinations(1, destinationsData)).to.deep.equal(
      [
        {
          id: 1,
          destination: 'Lima, Peru',
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 400,
          image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
          alt: 'overview of city buildings with a clear sky'
        },
        {
          id: 2,
          destination: 'Stockholm, Sweden',
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 780,
          image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          alt: 'city with boats on the water during the day time'
        }
      ]
    )
  })

  it('should get trips for the year', () => {
    expect(trip1.getThisYearsTrips(1, '2022/09/26')).to.deep.equal(
      [
        {
          id: 1,
          userID: 1,
          destinationID: 49,
          travelers: 1,
          date: '2022/09/16',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 2,
          userID: 1,
          destinationID: 25,
          travelers: 5,
          date: '2022/10/04',
          duration: 18,
          status: 'approved',
          suggestedActivities: []
        }
      ]
    )
  })


  it('should get yearly cost of lodging', () => {
    expect(trip1.getLodgingCost(1, '2022/09/26', destinationsData)).to.equal(2360)
  })

  it('should get yearly cost of flights', () => {
    expect(trip1.getFlightCost(1, '2022/09/26', destinationsData)).to.equal(4300 )
  })

  it('should get total cost of trips for year', () => {
    expect(trip1.getTotalCost(1, '2022/09/26', destinationsData)).to.equal(7326)
  })


  it('should return a travelers past trips', () => {
    expect(trip1.getPastTrips(1, '2022/09/26')).to.deep.equal(
      [
        {
          id: 1,
          userID: 1,
          destinationID: 49,
          travelers: 1,
          date: '2022/09/16',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 3,
          userID: 1,
          destinationID: 22,
          travelers: 4,
          date: '2021/05/22',
          duration: 17,
          status: 'pending',
          suggestedActivities: []
        }
      ]
    )
  })

  it('should return a travelers future trips', () => {
    expect(trip1.getFutureTrips(1, '2022/09/26')).to.deep.equal(
      [
        {
          id: 2,
          userID: 1,
          destinationID: 25,
          travelers: 5,
          date: '2022/10/04',
          duration: 18,
          status: 'approved',
          suggestedActivities: []
        }
      ]
    )
  })

  it('should return a travelers pending trips', () => {
    expect(trip1.getPendingTrips(1, '2022/09/26')).to.deep.equal(
    [
      {
        id: 3,
        userID: 1,
        destinationID: 22,
        travelers: 4,
        date: '2021/05/22',
        duration: 17,
        status: 'pending',
        suggestedActivities: []
      }
    ]
    )
  })

})