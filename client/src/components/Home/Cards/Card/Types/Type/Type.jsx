import React from "react";
import style from './Type.module.css'
const colors = {
  fire: 'fire',
  grass: 'grass',
  electric: 'electric',
  water: 'water',
  ground: 'ground',
  rock: 'rock',
  fairy: 'fairy',
  poison: 'poison',
  bug: 'bug',
  dragon: 'dragon',
  psychic: 'psychic',
  flying: 'flying',
  fighting: 'fighting',
  normal: 'normal',
  ice:'ice'
};

export function Type({tipo}) {
  const colorBackground= colors[tipo];
  return (<h2 className={`${style[colorBackground]}`}>{tipo}</h2>);
}

export default Type;