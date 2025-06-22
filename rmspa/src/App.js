import { useState, useEffect, useRef } from 'react';
import './App.css';



export default function App() {
  const [apiQuery, setApiQuery] = useState(
    `https://rickandmortyapi.com/api/character/?`
  );
  const [characters, setCharacters] = useState([]);
  const [pagePrev, setPagePrev] = useState(null);
  const [pageNext, setPageNext] = useState(null);

  useEffect(() => {
    fetch(apiQuery)
      .then(response => response.json())
      .then((data) => {
        setCharacters(data.results);
        setPagePrev(data.info.prev);
        setPageNext(data.info.next);
  });
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

        <NavBar setApiQuery={setApiQuery} 
          pagePrev={pagePrev} pageNext={pageNext}/>

      </div>
    </>
  );
}

function MakeACard(profile){
  return (
    <>
      <div className="briefCard">
        <img src={profile.image} />
        <div className="briefCard__description">
          <h3>{profile.name}</h3>
          <p><span>Species:</span> {profile.species}</p>
          <p><span>State:</span> {profile.status}</p>
          <p><span>Location:</span> {profile.location.name}</p>
        </div>
        
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
        <input type="search" placeholder="Enter the name of a character"
          ref={searchRef} />
        <button onClick={() => {
          setApiQuery( `https://rickandmortyapi.com/api/character/?` +
            `name=${searchRef.current.value}`);
          }}>
          Search
        </button>
      </div>
      
    </>
  )
}

function NavBar ({setApiQuery, pagePrev, pageNext}) {
    return (
  <>
    <div className="NavBar">
      <button onClick={() => {
        if (pagePrev) {
          setApiQuery(pagePrev);
        }
        }}>
          {'<< '}Prev
        </button>

      <button onClick={() => {
        if (pageNext) {
          setApiQuery(pageNext);
        }
      }}>
        Next{' >>'}
      </button>
    </div>

  </>
)
}
