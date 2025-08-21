import Header from "./Header";
import JobPosts from "./JobPosts";

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Post from "./Post";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Header/> }/>
        <Route path='/post/:id' element={<Post/>}/>
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
