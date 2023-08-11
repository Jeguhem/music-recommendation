import React, { useState } from "react";
import axios from "axios";
import HappyEmoji from "./components/images/happy-emoji.png";
import calmemoji from "./components/images/calm.png";
import sademoji from "./components/images/sad-emoji.png";
import energeticemoji from "./components/images/energetic-emoji.png";

// Import your custom CSS file for styling

function RecommendationForm() {
  const [selectedMood, setSelectedMood] = useState("");
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  const handleMoodSelection = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleRecommendation = () => {
    axios
      .get("http://127.0.0.1:5000/api/recommendation", {
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
    <div className="bg">
      <div className="header">
        <span className="bold">M</span>
        <span className="bold g">R</span>
        <br />
        <p>Welcome to our music recommendation system!!!</p>
        <br />
        <div className="text">
          <p>
            MusicRex is an innovative music recommendation system that caters to
            your current mood. Discover new songs that match your emotions by
            selecting one of the mood categories below. Whether you're feeling
            energetic, calm, happy, or sad, MusicRex will curate a personalized
            playlist that perfectly suits your emotional state. Get started now
            and immerse yourself in the perfect soundtrack for every moment of
            your life.
          </p>
        </div>
      </div>
      <br />
      <div className="contain-img">
        <div className="img_container">
          <label className="ssi">
            <input
              type="radio"
              name="mood"
              value="Energetic"
              checked={selectedMood === "Energetic"}
              onChange={handleMoodSelection}
            />
            <img
              src={energeticemoji}
              className="emoji-img rd"
              alt="Energetic"
            />
            Energetic
          </label>
        </div>

        <div className="img_container">
          <label className="ssi">
            <input
              type="radio"
              name="mood"
              value="Calm"
              checked={selectedMood === "Calm"}
              onChange={handleMoodSelection}
            />
            <img src={calmemoji} className="emoji-img rd c" alt="Calm" />
            Calm
          </label>
        </div>

        <div className="img_container">
          <label className="ssi">
            <input
              type="radio"
              name="mood"
              value="Happy"
              checked={selectedMood === "Happy"}
              onChange={handleMoodSelection}
            />
            <img src={HappyEmoji} className="emoji-img" alt="Happy" />
            Happy
          </label>
        </div>

        <div className="img_container">
          <label className="ssi">
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
      <br />
      <button onClick={handleRecommendation}>Get Recommendations</button>
      <br />
      <br />

      {recommendedSongs.length > 0 && (
        <div>
          <h2>Recommended Songs: {selectedMood}</h2>
          <br />
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Song</th>
                <th>Artist</th>
                <th>Album</th>
              </tr>
            </thead>
            <tbody>
              {recommendedSongs.map((song, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{song["Track Name"]}</td>
                  <td>{song["Artist"]}</td>
                  <td>{song["Album"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {recommendedSongs.length === 0 && <p>No recommendations available.</p>}
    </div>
  );
}

export default RecommendationForm;
