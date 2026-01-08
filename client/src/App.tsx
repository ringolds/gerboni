import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Display from './pages/Display'
import './App.css'

function App() {
  return (
      <Router>
        <div id = "root">
          <div className="sidebar">
            <nav>
              <Link to="/">Home</Link>{" | "}
              <Link to="/upload">Upload</Link>{" | "}
              <Link to="/display">Display</Link>
            </nav>
          </div>
          <div className='main'>
            <Routes>
              <Route path = "/" element = {<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path = "/display" element = {<Display />}/>
            </Routes>
          </div>
        </div>
      </Router>
  )
}

export default App
