import React from "react";

const Home = ({ pokemons }) => {
  return (
    <div className="home-page">
      <PokeList pokemons={pokemons} />
    </div>
  );
};

export default Home;
