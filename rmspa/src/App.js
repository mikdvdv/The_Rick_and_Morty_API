import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';



export default function App() {
  const [currentPage, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}&name=rick`)
      .then(response => response.json())
      .then(data => setCharacters(data.results));
  }, [currentPage]);

  console.log(characters);

  return (
    <>
      {characters.map(profile => Card(profile))}
      <button onClick={() => setPage(currentPage + 1)}>
        Next
      </button>
    </>
  );
}

function Card(profile){
  return (
    <>
      <div>{profile.name}</div>
    </>
  )

}





