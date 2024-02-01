import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from './pages/landing/Landing';

function App() {
  return (
    <div className="app_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
