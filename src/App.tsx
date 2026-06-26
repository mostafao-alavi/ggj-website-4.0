import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PressKit from './pages/PressKit';
import Studios from './pages/Studios';
import GGJNext from './pages/GGJNext';
import Volunteers from './pages/Volunteers';
import Sponsors from './pages/Sponsors';
import JamSites from './pages/JamSites';
import Games from './pages/Games';
import AiMentor from './pages/AiMentor';
import Guide from './pages/Guide';
import GoogleSheets from './pages/GoogleSheets';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="press-kit" element={<PressKit />} />
          <Route path="studios" element={<Studios />} />
          <Route path="next" element={<GGJNext />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="jam-sites" element={<JamSites />} />
          <Route path="games" element={<Games />} />
          <Route path="ai-mentor" element={<AiMentor />} />
          <Route path="guide" element={<Guide />} />
          <Route path="google-sheets" element={<GoogleSheets />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
