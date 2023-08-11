from flask import Flask, request, jsonify
import random
import pandas as pd


from flask_cors import CORS  # Import the CORS extension

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})




# Load all playlist datasets
calm_songs = pd.read_csv('./calm_playlist.csv')
happy_songs = pd.read_csv('./happy_playlist.csv')
energetic_songs = pd.read_csv('./energetic_playlist.csv')
sad_songs = pd.read_csv('./sad_playlist.csv')

@app.route('/api/recommendation', methods=['GET', 'POST'])
def get_recommendation():
    # mood = request.args.get('mood')
    data = request.get_json()  # Extract the JSON data from the request body
    selected_mood = data.get('mood')  # Extract the value of the 'mood' key


    # Select the playlist based on the mood
    playlist = None
    if selected_mood == 'Calm':
        playlist = calm_songs
    elif selected_mood == 'Happy':
        playlist = happy_songs
    elif selected_mood == 'Energetic':
        playlist = energetic_songs
    elif selected_mood == 'Sad':
        playlist = sad_songs

    if playlist is None or playlist.empty:
        return jsonify({'song': None})

    # Select a random song from the playlist
    else:
        recommended_song = random.choice(playlist['Track Name','Artist'])
        return jsonify({'song': recommended_song})

    # return jsonify({'song': recommended_song})

if __name__ == '__main__':
    app.run(debug= True, port=5000)
# debug= True, port=9090