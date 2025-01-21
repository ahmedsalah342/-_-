import React from 'react';
import './SurahList.css';

const SurahItem = ({ surah, onSelect }) => (
  <div className="surah-item" onClick={() => onSelect(surah)}>
    <div className="surah-number">
      <span>{surah.number}</span>
    </div>
    <div className="surah-details">
      <h3 className="surah-name">{surah.name}</h3>
      <p className="surah-info">
        {surah.englishName} • {surah.numberOfAyahs} آية
      </p>
    </div>
    <div className="decoration"></div>
  </div>
);

const SurahList = ({ surahs, onSelectSurah }) => {
  return (
    <div className="surah-list">
      {surahs.map((surah) => (
        <SurahItem
          key={surah.number}
          surah={surah}
          onSelect={onSelectSurah}
        />
      ))}
    </div>
  );
};

export default SurahList;
