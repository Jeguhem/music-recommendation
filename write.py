import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import numpy as np

CLIENT_ID = '76ba6975192842ad94dd30785f77e931'
CLIENT_SECRET = 'f6a7c9160c4d4886b12dbc54685516af'

# Authenticate with the Spotify API
auth_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)

# Create an empty DataFrame to store the song data
song_data = pd.DataFrame(columns=['Artist', 'Album', 'Track Name', 'Track ID', 'Energy', 'Key',
                                  'Loudness', 'Instrumentalness', 'Valence',
                                  'Tempo'])

# Set the number of songs to retrieve, the initial offset and limit for API pagination
num_songs = 1000
offset = 5
limit = 50  # Maximum limit per API request


# Retrieve songs in batches until the desired number is reached
while len(song_data) < num_songs:
    # Make the API request to retrieve songs
    results = sp.search(q='year:2010-2023', type='track', offset=offset, limit=limit)
    tracks = results['tracks']['items']

    # Extract relevant information from each track and append to the DataFrame
    song_batch = []
    for track in tracks:
        artist = track['artists'][0]['name']
        album = track['album']['name']
        track_name = track['name']
        track_id = track['id']

        # Retrieve track audio features
        audio_features = sp.audio_features(track_id)[0]
        energy = audio_features['energy']
        key = audio_features['key']
        loudness = audio_features['loudness']
        instrumentalness = audio_features['instrumentalness']
        valence = audio_features['valence']
        tempo = audio_features['tempo']

        song_batch.append({
            'Artist': artist,
            'Album': album,
            'Track Name': track_name,
            'Track ID': track_id,
            'Energy': energy,
            'Key': key,
            'Loudness': loudness,
            'Instrumentalness': instrumentalness,
            'Valence': valence,
            'Tempo': tempo
        })

    # Concatenate the song batch to the existing song_data DataFrame
    song_data = pd.concat([song_data, pd.DataFrame(song_batch)], ignore_index=True)

    # Update the offset for the next API request
    offset += limit

    # Print progress
    print(f'Retrieved {len(song_data)} songs')

# Save the song data to a CSV file
song_data.to_csv('10000_spotify_songs.csv', index=False)
