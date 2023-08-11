import pandas as pd

# Load the classified songs dataset
song_data = pd.read_csv('classified_songs.csv')

# Group songs by mood
grouped_songs = song_data.groupby('Mood')

# Create playlists for each mood and save as CSV files
for mood, group in grouped_songs:
    playlist_name = f"{mood} Playlist"
    playlist_description = f"Playlist of songs classified as {mood}"
    playlist_filename = f"{mood.lower()}_playlist.csv"

    # Save the songs of the current mood as a CSV file
    group.to_csv(playlist_filename, index=False)

    print(f"Playlist '{playlist_name}' created and saved as '{playlist_filename}'")
