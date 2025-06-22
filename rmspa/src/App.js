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

      <div className="content">

        <div className="header">
          <Logo />
          <SearchNameBox setApiQuery={setApiQuery}/>
        </div>

        <div className="table">
          {characters.map(profile => MakeACard(profile))}
        </div>
      
        {/* TODO: replace things below with a component containing two buttons */}
        {/* <ButtonPrev apiQuery={apiQuery} setApiQuery={setApiQuery} />
        <ButtonNext apiQuery={apiQuery} setApiQuery={setApiQuery} /> */}

        <NavBar apiQuery={apiQuery} setApiQuery={setApiQuery} />

      </div>
    </>
  );
}

function MakeACard(profile){
  return (
    <>
      <div className="briefCard">
        <h3>{profile.name}</h3>
        <img src={profile.image} />
        <p><span>Species:</span>{profile.species}</p>
        <p><span>State:</span>{profile.status}</p>
        <p><span>Location:</span>{profile.location.name}</p>
      </div>
    </>
  )

}

function Logo(){
  return (
    <img className="logo" src="logo.webp"></img>
  )
}

function SearchNameBox({setApiQuery}){
  const searchRef = useRef(null);
  return (
    <>
      <div className="SearchNameBox">
        <input type="search" ref={searchRef} />
        <button onClick={() => {
          setApiQuery({
            currentPage: 1,
            name: searchRef.current.value
          });
        }}>
          Search
        </button>
      </div>
      
    </>
  )
}

function NavBar ({apiQuery, setApiQuery}) {
    return (
  <>
    <div className="NavBar">
      <button onClick={() => {
          setApiQuery({
            ...apiQuery,
            currentPage: apiQuery.currentPage - 1
          });
        }}>
          Prev
        </button>

      <button onClick={() => {
        setApiQuery({
          ...apiQuery,
          currentPage: apiQuery.currentPage + 1
        });
      }}>
        Next
      </button>
    </div>

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

function ButtonPrev ({apiQuery, setApiQuery}){
  if (apiQuery.currentPage > 1) {
    return (
    <>
      <button onClick={() => {
        setApiQuery({
          ...apiQuery,
          currentPage: apiQuery.currentPage - 1
        });
      }}>
        Prev
      </button>
    </>
  )
  }
}
