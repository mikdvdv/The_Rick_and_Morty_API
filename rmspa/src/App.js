import { useState, useEffect, useRef } from 'react';
import './App.css';



export default function App() {
  const [apiQuery, setApiQuery] = useState({
    currentPage: 1,
    name: ""
  });
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?` +
      `page=${apiQuery.currentPage}&` + 
      `name=${apiQuery.name}`)
      .then(response => response.json())
      .then(data => setCharacters(data.results));
  }, [apiQuery]);

  return (
    <>

      <SearchNameBox setApiQuery={setApiQuery}/>

      {characters.map(profile => MakeACard(profile))}

      <ButtonNext apiQuery={apiQuery} setApiQuery={setApiQuery} />

    </>
  );
}

function MakeACard(profile){
  return (
    <>
      <div>{profile.name}</div>
    </>
  )

}

function SearchNameBox({setApiQuery}){
  const searchRef = useRef(null);
  return (
    <>
      <input type="search" ref={searchRef} />
      <button onClick={() => {
        setApiQuery({
          currentPage: 1,
          name: searchRef.current.value
        });
      }}>
        Search
      </button>
    </>
  )
}

function ButtonNext ({apiQuery, setApiQuery}){
    return (
    <>
      <button onClick={() => {
        setApiQuery({
          ...apiQuery,
          currentPage: apiQuery.currentPage + 1
        });
      }}>
        Next
      </button>
    </>
  )

}

