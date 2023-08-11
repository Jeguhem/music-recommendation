import React, { useState } from 'react';
import axios from 'axios';

function RecommendationForm() {
  const [selectedMood, setSelectedMood] = useState('');
  const [recommendedSong, setRecommendedSong] = useState(null);

  const handleMoodSelection = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleRecommendation = () => {
    const datas = {mood:selectedMood};
    axios
      .get('http://127.0.0.1:5000/api/recommendation', datas, {
        params: {
          mood: selectedMood,
        },
      })
      fetch('http://127.0.0.1:5000/api/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set the Content-Type header to 'application/json'
        },
        body: JSON.stringify({
          mood: selectedMood // Replace 'Happy' with the actual selected mood value
        })
      })
      .then((response) => {
        setRecommendedSong(response.data.song);
      })
      .catch((error) => {
        console.error(error);
        setRecommendedSong(null); // Reset the recommended song state on error
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });

  };

  return (
    <div>
      <div id='select'>
        <label htmlFor="moodSelect">Select Mood:</label>
        <select id="moodSelect" value={selectedMood} onChange={handleMoodSelection}>
          <option value="">Select</option>
          <option value="Energetic">Energetic</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Calm">Calm</option>
        </select>
      </div>
      <button onClick={handleRecommendation}>Get Recommendation</button>
      {recommendedSong !== null && (
        <div>
          <h2>Recommended Song:</h2>
          <p>Track Name: {recommendedSong}</p>
        </div>
      )}
      {recommendedSong === "" && (
        <p>No recommendation found for the selected mood.</p>
      )}
      {recommendedSong === "Invalid mood. Please select a valid mood." && (
        <p style={{ color: 'red' }}>Invalid mood. Please select a valid mood.</p>
      )}
    </div>
  );
}

export default RecommendationForm;
