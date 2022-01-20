import logo from './logo.svg';
import React from "react";
import './App.css';
import Title from "./components/Title";
import Form from "./components/Form";
import MainCard from './components/MainCard';
import FetchCat from './components/FetchCat';
import JsonLocalStorage from './components/JasonLocalStorage';
import Favorites from './components/Favorites';

const App = () => {
  const CAT1 =
    "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 =
    "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 =
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [counter, setCounter] = React.useState(() => {
    return JsonLocalStorage.getItem("counter");
  });
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return JsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(mainCat)

  // Set the first cat image
  async function setInitialCat() {
    const newCat = await FetchCat('First cat');
    setMainCat(newCat);
  }

  // Call setInitialCat() just once
  React.useEffect(() => {
    setInitialCat();
  }, [])

  async function updateMainCat(value) {
    const newCat = await FetchCat(value);

    setMainCat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      JsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    JsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const counterTitle = counter === null ? "" : counter + " ";

  return (
    <div>
      <Title>{counterTitle}CAT MEME</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
