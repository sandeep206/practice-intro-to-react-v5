import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropDown from './UseDropDown';
import Results from './Results';

const SearchParams = () => {

  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);

  const [animal, AnimalDropdown] = useDropDown("Animal", 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropDown("Breed", "", breeds);

  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    })

    setPets(animals || []);
  }

  useEffect (() => {
    pet.breeds("dog").then(console.log, console.error);
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({breeds: apiBreeds}) => {
      const breedStrings = apiBreeds.map(({name}) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">Location
          <input id="location" value={location} placeholder="Location" onChange={e => setLocation(e.target.value)}/>
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  );
};

export default SearchParams;