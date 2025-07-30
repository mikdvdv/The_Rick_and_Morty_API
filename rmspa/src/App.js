import { useState, useEffect, useRef } from 'react';
// import './style/App.css';



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
        if (!data.error) {
          console.log(data);
          setCharacters(data.results);
          setPagePrev(data.info.prev);
          setPageNext(data.info.next);
        }
      });
  }, [apiQuery]);

  return (
    <>

      {/* <div className="content"> */}

        <header className="header mt-10">
          <Logo />
          <SearchNameBox setApiQuery={setApiQuery}/>
        </header>

        <main className="table">
          {characters.map(profile => MakeACard(profile))}
        </main>

        <footer>
          <NavBar setApiQuery={setApiQuery} 
            pagePrev={pagePrev} pageNext={pageNext}/>
        </footer>
        

      {/* </div> */}
    </>
  );
}

function MakeACard(profile){
  function handleClick(){
    console.log(profile);
    return (
      <>
        <div className='extendedCard'>

        </div>
      </>
    )
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
