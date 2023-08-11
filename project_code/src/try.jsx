import React, { useState } from 'react';
import axios from 'axios';
import HappyEmoji from "./components/images/happy-emoji.png";
import calmemoji from "./components/images/calm.png";
import sademoji from "./components/images/sad-emoji.png";
import energeticemoji from "./components/images/energetic-emoji.png";

function RecommendationForm() {
  const [selectedMood, setSelectedMood] = useState('');
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  const handleMoodSelection = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleRecommendation = () => {
    axios
      .get('http://127.0.0.1:5000/api/recommendation', {
        params: {
          mood: selectedMood,
        },
      })
      .then((response) => {
        setRecommendedSongs(response.data.songs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='bg'>
        <div className='header'>
            <span className='bold '>M</span>
            <span className='bold  g'>R</span>
            <br></br>
            <p>Welcome  to our music recommendation system!!!</p><br></br>
            <div className='text'>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores laudantium incidunt, commodi blanditiis autem itaque suscipit illum aliquam. Blanditiis vel obcaecati dolores perspiciatis, eligendi nesciunt magnam neque? Expedita, dolores quia.</p>
            </div>
        </div>
        <br></br>
      <div className="contain-img">
        <div className="img_container">
          <label className="gh">
            <input
              type="radio"
              name="mood"
              value="Energetic"
              checked={selectedMood === "Energetic"}
              onChange={handleMoodSelection}
            />
            <img src={energeticemoji} className="emoji-img rd " alt="Energetic" />
            Energetic
          </label>
        </div>

        <div className="img_container">
          <label className="gh">
            <input
              type="radio"
              name="mood"
              value="Calm"
              checked={selectedMood === "Calm"}
              onChange={handleMoodSelection}
            />
            <img src={calmemoji} className="emoji-img rd" alt="Calm" />
            Calm
          </label>
        </div>

        <div className="img_container">
          <label className="gh">
            <input
              type="radio"
              name="mood"
              value="Happy"
              checked={selectedMood === "Happy"}
              onChange={handleMoodSelection}
            />
            <img src={HappyEmoji} className="emoji-img " alt="Happy" />
            Happy
          </label>
        </div>

        <div className="img_container">
          <label className="gh">
            <input
              type="radio"
              name="mood"
              value="Sad"
              checked={selectedMood === "Sad"}
              onChange={handleMoodSelection}
            />
            <img src={sademoji} className="emoji-img rd" alt="Sad" />
            Sad
          </label>
        </div>
      </div>
      <br></br>
      <button onClick={handleRecommendation}>Get Recommendations</button>
      <br></br><br></br>

      {recommendedSongs.length > 0 && (
        <div>
          <h2>Recommended Songs:</h2>
          <ul>
            {recommendedSongs.map((song, index) => (
              <li key={index}>
                <p>Song: {song['Track Name']}</p>
                <p>Artist: {song['Artist']}</p>
                <p>Album: {song['Album']}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendedSongs.length === 0 && <p>No recommendations available.</p>}
    </div>
  );
}

export default RecommendationForm;
