import React, { useState, createContext, useContext } from 'react';
import { AuthPage } from './components/AuthPage';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { translations } from './components/translations';

// Language Context
const LanguageContext = createContext({
  language: 'english',
  setLanguage: (lang: string) => {},
  t: (key: string) => key
});

export const useLanguage = () => useContext(LanguageContext);

// User Context
const UserContext = createContext({
  user: null as any,
  setUser: (user: any) => {},
  logout: () => {}
});

export const useUser = () => useContext(UserContext);

function App() {
  const [language, setLanguage] = useState('english');
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('auth');

  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('auth');
  };

  const languageValue = {
    language,
    setLanguage,
    t
  };

  const userValue = {
    user,
    setUser,
    logout
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <LanguageContext.Provider value={languageValue}>
      <UserContext.Provider value={userValue}>
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
          {!user ? (
            <AuthPage onLogin={handleLogin} />
          ) : currentPage === 'home' ? (
            <HomePage onNavigate={navigateToPage} />
          ) : currentPage === 'dashboard' ? (
            <Dashboard onNavigate={navigateToPage} />
          ) : (
            <HomePage onNavigate={navigateToPage} />
          )}
        </div>
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;