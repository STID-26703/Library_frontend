import './App.css'
import LibraryBooks from './components/LibraryBooks'
import LibraryFooter from './components/LibraryFooter'
import LibraryHeader from './components/LibraryHeader'
import LibraryLogin from './components/LibraryLogin'
import Office from './components/Office'
import { Route, Routes } from 'react-router'


function App() {
  return (
    <div className="app-shell">
      <LibraryHeader />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<LibraryLogin />} />
          <Route path="/Books" element={<LibraryBooks />} />
          <Route path="/Office" element={<Office />} />
        </Routes>
      </main>
      <LibraryFooter />
    </div>
  );
}

export default App
