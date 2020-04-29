// Tests for all utility functions
import mockData from '../data/mockData';
import * as utilFunctions from './utilFunctions.js';
import stateAbbreviations from '../data/stateAbbreviations.js';

describe('Utility Functions', () => {
  let alphabatizedResults;
  beforeEach(() => {
    alphabatizedResults = [{ id: 'cd273a24-f8de-44f6-8add-028e22229293',
    name: 'Boston Lobster Feast',
    address1: '8731 International Dr',
    city: 'Orlando',
    state: 'FL',
    zip: '32819',
    lat: '28.43897',
    long: '-81.470707',
    telephone: '(407) 248-8606',
    tags:
     'Social,Food and Dining,Restaurants,Seafood,Social,Food and Dining,Restaurants,American',
    website: 'http://www.bostonlobsterfeast.com',
    genre: 'Seafood,International,American,Oysters,Cafe',
    hours: 'Mon-Fri 4:00 PM-10:00 PM; Sat-Sun 2:00 PM-10:00 PM',
    attire: 'Casual' },
  { id: '0f41a3d0-0641-4eef-b7fd-706f083cf0d5',
    name: 'Fleurie Restaurant',
    address1: '108 3rd St NE',
    city: 'Charlottesville',
    state: 'VA',
    zip: '22902',
    lat: '38.030526',
    long: '-78.479785',
    telephone: '(434) 971-7800',
    tags: 'Social,Food and Dining,Restaurants,French',
    website: 'http://www.fleurierestaurant.com',
    genre: 'French,European,Cafe,Continental,American',
    hours: 'Mon-Thu 5:30 PM-9:00 PM; Fri-Sat 5:30 PM-10:00 PM',
    attire: 'business casual' },
  { id: '00b35e1a-82b1-4988-b8b9-6df826db2818',
    name: 'Matsuhisa',
    address1: '303 E Main St',
    city: 'Aspen',
    state: 'CO',
    zip: '81611',
    lat: '39.190723',
    long: '-106.82031',
    telephone: '(970) 544-6628',
    tags:
     'Social,Food and Dining,Restaurants,Japanese,Social,Food and Dining,Restaurants,Sushi',
    website: 'http://www.matsuhisaaspen.com',
    genre: 'Japanese,Sushi,Asian,Contemporary,Seafood',
    hours: 'Open Daily 5:30 PM-9:00 PM',
    attire: 'business casual' },
  { id: 'f223fdd0-4adc-423e-9747-980a66c256ca',
    name: 'Old Hickory Steakhouse',
    address1: '201 Waterfront St',
    city: 'Oxon Hill',
    state: 'MD',
    zip: '20745',
    lat: '38.782098',
    long: '-77.017492',
    telephone: '(301) 965-4000',
    tags: 'Social,Food and Dining,Restaurants,Steakhouses',
    website: 'http://www.gaylordnational.com',
    genre: 'Steak,American,Contemporary,Seafood,Cafe',
    hours: 'Open Daily 5:30 PM-10:00 PM',
    attire: 'business casual' },
  { id: '0b4bfe46-3e60-4de4-82ba-2dd8e5d46b56',
    name: 'The Capital Grille',
    address1: '500 Crescent Ct',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    lat: '32.794749',
    long: '-96.804099',
    telephone: '(214) 303-0500',
    tags:
     'Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American',
    website: 'http://www.thecapitalgrille.com',
    genre: 'Steak,American',
    hours:
     'Mon-Thu 11:00 AM-10:00 PM; Fri 11:00 AM-11:00 PM; Sat 5:00 PM-11:00 PM; Sun 5:00 PM-9:00 PM',
    attire: 'business casual' } ]
  })

  describe('alphabatizeResults', () => {
    it('should return a new array that is alphabatized', () => {
      let filteredResults = utilFunctions.alphabatizeResults(mockData)
      expect(filteredResults).toEqual(alphabatizedResults);
    });
  });

  describe('filterByState', () => {
    it('should return all records if query is empty string', () => {
      const filteredResults = utilFunctions.filterByState(mockData, "", stateAbbreviations);
      expect(filteredResults).toEqual(mockData);
      expect(filteredResults.length).toEqual(5);
    });

    it('should return an empty array if no results found', () => {
      let filteredResults = utilFunctions.filterByState(mockData, "Arizona", stateAbbreviations);
      expect(filteredResults.length).toBe(0);
      expect(filteredResults).toEqual([]);
    });

    it('should return a new array with only records that match the state abbreviation', () => {
      const result = [
        { id: '00b35e1a-82b1-4988-b8b9-6df826db2818',
          name: 'Matsuhisa',
          address1: '303 E Main St',
          city: 'Aspen',
          state: 'CO',
          zip: '81611',
          lat: '39.190723',
          long: '-106.82031',
          telephone: '(970) 544-6628',
          tags:
          'Social,Food and Dining,Restaurants,Japanese,Social,Food and Dining,Restaurants,Sushi',
          website: 'http://www.matsuhisaaspen.com',
          genre: 'Japanese,Sushi,Asian,Contemporary,Seafood',
          hours: 'Open Daily 5:30 PM-9:00 PM',
          attire: 'business casual'
        }];

      const filteredResults = utilFunctions.filterByState(mockData, "Colorado", stateAbbreviations);

      expect(filteredResults.length).toEqual(1);
      expect(filteredResults).toEqual(result);
    });
  });

  describe('filterByName', () => {
    it('should return all records if query is empty string', () => {
      const filteredResults = utilFunctions.filterByQuery(mockData, "");
      expect(filteredResults).toEqual(mockData);
      expect(filteredResults.length).toEqual(5);
    });

    it('should return an empty array if no results found', () => {
      let filteredResults = utilFunctions.filterByQuery(mockData, "The human torch was denied a bank loan");
      expect(filteredResults.length).toBe(0);
      expect(filteredResults).toEqual([]);
    });

    it('should return a new array, with only records that include the query string', () => {
      const result = [{ id: 'f223fdd0-4adc-423e-9747-980a66c256ca',
      name: 'Old Hickory Steakhouse',
      address1: '201 Waterfront St',
      city: 'Oxon Hill',
      state: 'MD',
      zip: '20745',
      lat: '38.782098',
      long: '-77.017492',
      telephone: '(301) 965-4000',
      tags: 'Social,Food and Dining,Restaurants,Steakhouses',
      website: 'http://www.gaylordnational.com',
      genre: 'Steak,American,Contemporary,Seafood,Cafe',
      hours: 'Open Daily 5:30 PM-10:00 PM',
      attire: 'business casual' }];

      let filteredResults = utilFunctions.filterByQuery(mockData, "Hickory");
      expect(filteredResults.length).toBe(1);
      expect(filteredResults).toEqual(result);
    });
  });
  
  describe('filterByCity', () => {
    it('should return all records if query is an empty string', () => {
      const filteredResults = utilFunctions.filterByQuery(mockData, '');
      expect(filteredResults).toEqual(mockData);
      expect(filteredResults.length).toEqual(5);
    });

    it('should return an empty array if no results are found', () => {
      const filteredResults = utilFunctions.filterByQuery(mockData, "Narnia");
      expect(filteredResults).toEqual([]);
      expect(filteredResults.length).toEqual(0);
    });

    it('should return a new array with only records that include the query string', () => {
      const result = [ { id: 'cd273a24-f8de-44f6-8add-028e22229293',
      name: 'Boston Lobster Feast',
      address1: '8731 International Dr',
      city: 'Orlando',
      state: 'FL',
      zip: '32819',
      lat: '28.43897',
      long: '-81.470707',
      telephone: '(407) 248-8606',
      tags:
       'Social,Food and Dining,Restaurants,Seafood,Social,Food and Dining,Restaurants,American',
      website: 'http://www.bostonlobsterfeast.com',
      genre: 'Seafood,International,American,Oysters,Cafe',
      hours: 'Mon-Fri 4:00 PM-10:00 PM; Sat-Sun 2:00 PM-10:00 PM',
      attire: 'Casual' } ]


      const filteredResults = utilFunctions.filterByQuery(mockData, "Orlando");
      expect(filteredResults).toEqual(result);
      expect(filteredResults.length).toEqual(1);
    });
  });

  describe('filterByGenre', () => {
    it('should return all records if query is an empty string', () => {
      const filteredResults = utilFunctions.filterByQuery(mockData, '');
      expect(filteredResults).toEqual(mockData);
      expect(filteredResults.length).toEqual(5);
    });

    it('should return an empty array if no matches found', () => {
      const filteredResults = utilFunctions.filterByQuery(mockData, "Film Noir");
      expect(filteredResults).toEqual([]);
      expect(filteredResults.length).toEqual(0);
    });

    it('should return a new array with only records that include the query string', () => {
      const result = [ { id: 'cd273a24-f8de-44f6-8add-028e22229293',
      name: 'Boston Lobster Feast',
      address1: '8731 International Dr',
      city: 'Orlando',
      state: 'FL',
      zip: '32819',
      lat: '28.43897',
      long: '-81.470707',
      telephone: '(407) 248-8606',
      tags:
       'Social,Food and Dining,Restaurants,Seafood,Social,Food and Dining,Restaurants,American',
      website: 'http://www.bostonlobsterfeast.com',
      genre: 'Seafood,International,American,Oysters,Cafe',
      hours: 'Mon-Fri 4:00 PM-10:00 PM; Sat-Sun 2:00 PM-10:00 PM',
      attire: 'Casual' },
    { id: '0f41a3d0-0641-4eef-b7fd-706f083cf0d5',
      name: 'Fleurie Restaurant',
      address1: '108 3rd St NE',
      city: 'Charlottesville',
      state: 'VA',
      zip: '22902',
      lat: '38.030526',
      long: '-78.479785',
      telephone: '(434) 971-7800',
      tags: 'Social,Food and Dining,Restaurants,French',
      website: 'http://www.fleurierestaurant.com',
      genre: 'French,European,Cafe,Continental,American',
      hours: 'Mon-Thu 5:30 PM-9:00 PM; Fri-Sat 5:30 PM-10:00 PM',
      attire: 'business casual' },
    { id: 'f223fdd0-4adc-423e-9747-980a66c256ca',
      name: 'Old Hickory Steakhouse',
      address1: '201 Waterfront St',
      city: 'Oxon Hill',
      state: 'MD',
      zip: '20745',
      lat: '38.782098',
      long: '-77.017492',
      telephone: '(301) 965-4000',
      tags: 'Social,Food and Dining,Restaurants,Steakhouses',
      website: 'http://www.gaylordnational.com',
      genre: 'Steak,American,Contemporary,Seafood,Cafe',
      hours: 'Open Daily 5:30 PM-10:00 PM',
      attire: 'business casual' },
    { id: '0b4bfe46-3e60-4de4-82ba-2dd8e5d46b56',
      name: 'The Capital Grille',
      address1: '500 Crescent Ct',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      lat: '32.794749',
      long: '-96.804099',
      telephone: '(214) 303-0500',
      tags:
       'Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American',
      website: 'http://www.thecapitalgrille.com',
      genre: 'Steak,American',
      hours:
       'Mon-Thu 11:00 AM-10:00 PM; Fri 11:00 AM-11:00 PM; Sat 5:00 PM-11:00 PM; Sun 5:00 PM-9:00 PM',
      attire: 'business casual' } ];

      const filteredResults = utilFunctions.filterByQuery(mockData, "American");

      expect(filteredResults).toEqual(result);
      expect(filteredResults.length).toEqual(4);
    });
  });
  describe('filterByCheckboxes', () => {
    it('should return all records if the checkedBoxes array is empty', () => {
      const filteredResults = utilFunctions.filterByCheckboxes(mockData, []);
      expect(filteredResults).toEqual(mockData);
      expect(filteredResults.length).toEqual(5);
    });

    it('should return an empty array if no matches found', () => {
      const filteredResults = utilFunctions.filterByCheckboxes(mockData, ["Peanut Butter", "Toast", "YumYumYum"]);
      expect(filteredResults).toEqual([]);
      expect(filteredResults.length).toEqual(0);
    });

    it('should return a new array with only records that include data from checkedBoxes array', () => {
      const result = [ { id: '00b35e1a-82b1-4988-b8b9-6df826db2818',
      name: 'Matsuhisa',
      address1: '303 E Main St',
      city: 'Aspen',
      state: 'CO',
      zip: '81611',
      lat: '39.190723',
      long: '-106.82031',
      telephone: '(970) 544-6628',
      tags:
       'Social,Food and Dining,Restaurants,Japanese,Social,Food and Dining,Restaurants,Sushi',
      website: 'http://www.matsuhisaaspen.com',
      genre: 'Japanese,Sushi,Asian,Contemporary,Seafood',
      hours: 'Open Daily 5:30 PM-9:00 PM',
      attire: 'business casual' },
    { id: 'f223fdd0-4adc-423e-9747-980a66c256ca',
      name: 'Old Hickory Steakhouse',
      address1: '201 Waterfront St',
      city: 'Oxon Hill',
      state: 'MD',
      zip: '20745',
      lat: '38.782098',
      long: '-77.017492',
      telephone: '(301) 965-4000',
      tags: 'Social,Food and Dining,Restaurants,Steakhouses',
      website: 'http://www.gaylordnational.com',
      genre: 'Steak,American,Contemporary,Seafood,Cafe',
      hours: 'Open Daily 5:30 PM-10:00 PM',
      attire: 'business casual' },
    { id: '0b4bfe46-3e60-4de4-82ba-2dd8e5d46b56',
      name: 'The Capital Grille',
      address1: '500 Crescent Ct',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      lat: '32.794749',
      long: '-96.804099',
      telephone: '(214) 303-0500',
      tags:
       'Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American',
      website: 'http://www.thecapitalgrille.com',
      genre: 'Steak,American',
      hours:
       'Mon-Thu 11:00 AM-10:00 PM; Fri 11:00 AM-11:00 PM; Sat 5:00 PM-11:00 PM; Sun 5:00 PM-9:00 PM',
      attire: 'business casual' } ];


      const filteredResults = utilFunctions.filterByCheckboxes(mockData, ["Steak", "Sushi", "Pasta"]);
      

      expect(filteredResults).toEqual(result);
      expect(filteredResults.length).toEqual(3);
    });
  });
});