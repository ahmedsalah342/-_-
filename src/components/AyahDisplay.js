import React, { useEffect, useState } from 'react';
import './AyahDisplay.css';
import IslamicPattern from './IslamicPattern';

const AyahDisplay = ({ surah }) => {
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (surah) {
      Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`),
        fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/ar.muyassar`)
      ])
        .then(([ayahsRes, tafsirRes]) => Promise.all([ayahsRes.json(), tafsirRes.json()]))
        .then(([ayahsData, tafsirData]) => {
          const combinedAyahs = ayahsData.data.ayahs.map((ayah, index) => ({
            ...ayah,
            tafsir: tafsirData.data.ayahs[index].text
          }));
          setAyahs(combinedAyahs);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading ayahs:', error);
          setLoading(false);
        });
    }
  }, [surah]);

  if (!surah) return null;
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="ayah-display">
      {/* رأس السورة */}
      <div className="surah-header">
        <IslamicPattern className="header-pattern" />
        <h2 className="surah-title">سورة {surah.name}</h2>
        {surah.number !== 9 && (
          <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        )}
      </div>

      {/* الآيات */}
      <div className="ayahs-container">
        {ayahs.map((ayah) => (
          <div key={ayah.number} className="ayah-container">
            <div className="ayah-number">
              <span>{ayah.numberInSurah}</span>
            </div>
            <div className="ayah-content">
              <p className="ayah-text">{ayah.text}</p>
              <div className="tafsir-container">
                <h4 className="tafsir-label">التفسير:</h4>
                <p className="tafsir-text">{ayah.tafsir}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AyahDisplay;
