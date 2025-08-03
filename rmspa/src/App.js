import { useState, useEffect, useRef } from 'react';
// import './style/App.css';



export default function App() {
  const [apiQuery, setApiQuery] = useState(
    `https://rickandmortyapi.com/api/character/?`
  );
  const [characters, setCharacters] = useState([]);
  const [pagePrev, setPagePrev] = useState(null);
  const [pageNext, setPageNext] = useState(null);
  const [extendedCardClass, setExtendedCardClass] = useState(
    "extendedCard, display-none");
  const [extendedCardContent, setExtendedCardContent] = useState({
    gender: undefined,
    image: undefined,
    location: {name: undefined, url: undefined},
    name: undefined,
    origin: {name: undefined, url: undefined},
    species: undefined,
    status: undefined,
    type: undefined
  })

  useEffect(() => {
    fetch(apiQuery)
      .then(response => response.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
          setCharacters(data.results);
          setPagePrev(data.info.prev);
          setPageNext(data.info.next);
        }
      });
  }, [apiQuery]);

  function hideExtendedCard(){
    setExtendedCardClass("extendedCard, display-none");
  }

  return (
    <>

        <header className="header mt-10">
          <Logo />
          <SearchNameBox setApiQuery={setApiQuery}/>
        </header>

        <main className="table">
          <article className={extendedCardClass}>
            <img src={extendedCardContent.image} />
            <div><span>Name:</span> {extendedCardContent.name}</div>
            <div><span>Gender:</span> {extendedCardContent.gender}</div>
            <div><span>Species:</span> {extendedCardContent.species}</div>
            <div><span>Status:</span> {extendedCardContent.status}</div>
            <div><span>Location:</span> {extendedCardContent.location.name}</div>
            <div><span>Origin:</span> {extendedCardContent.origin.name}</div>
            <div><span>Type:</span> {extendedCardContent.type}</div>
            <button onClick={hideExtendedCard}>x</button>
          </article>
          {characters.map(profile => MakeACard(profile, setExtendedCardClass, setExtendedCardContent))}
        </main>

        <footer className="mb-20">
          <NavBar setApiQuery={setApiQuery} 
            pagePrev={pagePrev} pageNext={pageNext}/>
        </footer>

    </>
  );
}


function MakeACard(profile, setExtendedCardClass, setExtendedCardContent){
  function handleClick(){
    setExtendedCardClass("extendedCard");
    setExtendedCardContent(profile);
    console.log(profile);
  }
  return (
    <>
      <article className="briefCard" onClick={handleClick}>
        <img src={profile.image} />
        <div className="briefCard__description">
          <h6>{profile.name}</h6>
          <div><span>Species:</span> {profile.species}</div>
          <div><span>State:</span> {profile.status}</div>
          <div><span>Location:</span> {profile.location.name}</div>
        </div>
        
      </article>
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
      <form className="SearchNameBox ml-20"  role="search">
        <input type="search" placeholder="Enter the name of a character"
          ref={searchRef} />
        <button onClick={() => {
          setApiQuery( `https://rickandmortyapi.com/api/character/?` +
            `name=${searchRef.current.value}`);
        }}>
          Search
        </button>
      </form>
      
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
