import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import NewOrder from './pages/NewOrder';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Success } from './pages/Success';
import { Tutorials } from './pages/Tutorials';
import { Settings } from './pages/Settings';
import { Layout } from './components/Layout';
import { useSettingsStore } from './store/settings';
import { LanguageSelectionModal } from './components/LanguageSelectionModal';

function App() {
  const { language, direction } = useSettingsStore();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <>
      <LanguageSelectionModal />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<Layout />}>
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;