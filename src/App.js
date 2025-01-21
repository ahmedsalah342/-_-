import React, { useState, useEffect } from 'react';
import './App.css';
import SurahList from './components/SurahList';
import AyahDisplay from './components/AyahDisplay';
import IslamicPattern from './components/IslamicPattern';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSurah, setCurrentSurah] = useState(null);
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(response => response.json())
      .then(data => {
        setSurahs(data.data);
      })
      .catch(error => {
        console.error('Error loading surahs:', error);
      });
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      {/* شريط التطبيق */}
      <header className="header">
        <IslamicPattern className="header-pattern" />
        <button className="icon-button menu-button" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="title-container">
          <h1 className="title">القرآن الكريم</h1>
          <div className="title-decoration"></div>
        </div>
        <button className="icon-button theme-button" onClick={toggleTheme}>
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </header>

      <main className="content">
        {/* القائمة الجانبية */}
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="ابحث عن سورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <SurahList
            surahs={surahs.filter(surah => 
              surah.name.includes(searchQuery) ||
              surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            onSelectSurah={(surah) => {
              setCurrentSurah(surah);
              setIsSidebarOpen(false);
            }}
          />
        </div>

        {/* المحتوى الرئيسي */}
        <div className="main-content" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
          {currentSurah ? (
            <AyahDisplay surah={currentSurah} />
          ) : (
            <div className="welcome-message">
              <IslamicPattern className="welcome-pattern" />
              <h2>أهلاً بك في تطبيق القرآن الكريم</h2>
              <p>الرجاء اختيار سورة من القائمة</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
