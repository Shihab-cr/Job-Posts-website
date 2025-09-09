import Header from "./Header";


import {HashRouter, Routes, Route} from 'react-router-dom'
import Post from "./Post";

function App() {
  return (
    <HashRouter>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Header/> }/>
        <Route path='/post/:id' element={<Post/>}/>
      </Routes>
      
    </div>
    </HashRouter>
  );
}

export default App;
