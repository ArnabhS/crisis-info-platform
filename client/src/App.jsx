import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/common/Navbar';
import NewsFeed from './pages/News';
import Alerts from './pages/Alerts';
import HelplinePage from "./pages/HelplineNumbers";


export default function App() {
  return (
    
      <div className="bg-gray-900">
        
      
         <BrowserRouter>
       <Navbar />
          <Routes>
            <Route path="/" element={<NewsFeed />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/helpline-numbers" element={<HelplinePage/>} />
          </Routes>
       
        </BrowserRouter>
      </div>
   
  );
}
