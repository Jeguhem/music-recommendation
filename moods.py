import pandas as pd
# Load the dataset from the CSV file
song_data = pd.read_csv('spotify_songs.csv')
# Classify songs based on valence and energy
moods = []
for index, row in song_data.iterrows():
    valence = row['Valence']
    energy = row['Energy']
    # Classify songs based on the valence-arousal plane
    if valence > 0.5 and energy > 0.5:
        mood = 'Energetic'
    elif valence > 0.5 and energy <= 0.5:
        mood = 'Happy'
    elif valence <= 0.5 and energy > 0.5:
        mood = 'Sad'
    else:
        mood = 'Calm'
    moods.append(mood)
# Add the 'Mood' column to the dataset
song_data['Mood'] = moods
# Save the updated dataset to a new CSV file
song_data.to_csv('classified_songs.csv', index=False)
