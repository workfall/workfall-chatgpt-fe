import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

export type CustomResponse<T> = {
  payload: T;
};

function App() {
  const [userStory, setUserStory] = useState<CustomResponse<string>>();
  const [inputVal, setInputVal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const fetchUserStory = async (search: string) => {
    setLoading(true)
    const res = await fetch(`http://localhost:3000/generate-user-story?search=${search}`);
    const data = await res.json();
    setUserStory(data);
    setLoading(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    setInputVal(e.target.search.value);
    await fetchUserStory(e.target.search.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Generate a user story for your project</h1>
      </header>
      <main>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="">Project domain e.g ecommerce website</label>
          <div className="field-container">
            <input type="text" placeholder="Search..." name="search" />
            <button type="submit">Search</button>
          </div>
        </form>

        <div className="content">
          {inputVal && <h2>Here is your user story on <span className="ital">{inputVal}</span></h2>}
          {loading && <div className="lds-hourglass"></div>}
          <p>{userStory?.payload}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
