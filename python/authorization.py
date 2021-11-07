# importing the necessary packages
import spotipy 
sp = spotipy.Spotify() 
from spotipy.oauth2 import SpotifyClientCredentials 
import spotipy.util as util
import pandas as pd


# setting up authorization
cid = "bb65b3cce54e4aa49376f5fec02fe7d4"
secret = "2620cd71806b4c49b78832958399ab96"
# saving the info you're going to need
username = 'your_account_number'
scope = 'user-library-read'  # check the documentation
authorization_url = 'https://accounts.spotify.com/authorize'
token_url = 'https://accounts.spotify.com/api/token'
redirect_uri = 'https://localhost:3000/auth/callback/'

token = util.prompt_for_user_token(username,scope,client_id='bb65b3cce54e4aa49376f5fec02fe7d4',client_secret= '2620cd71806b4c49b78832958399ab96',redirect_uri='http://localhost:3000/auth/callback')
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


# retrieving you access token
auth = SpotifyClientCredentials(
client_id=cid,
client_secret=secret)
# save your token
token = auth.get_access_token()
spotify = spotipy.Spotify(auth=token)
# check if everything is in order
print(token)
print(spotify)


# create empty lists where the results are going to be stored
artist_name = []
track_name = []
popularity = []
track_id = []

for i in range(1):
    track_results = sp.search(q='year:2020', type='track', limit=1,offset=0)
    for i, t in enumerate(track_results['tracks']['items']):
        artist_name.append(t['artists'][0]['name'])
        track_name.append(t['name'])
        track_id.append(t['id'])
        popularity.append(t['popularity'])

print('number of elements in the track_id list:', len(track_id))

df_tracks = pd.DataFrame({'artist_name':artist_name,'track_name':track_name,'track_id':track_id,'popularity':popularity})
print(df_tracks.shape)
# check if everything is ok
df_tracks.head()

# empty list, batchsize and the counter for None results
rows = []
batchsize = 1  #not sure was 100 before
None_counter = 0

for i in range(0,len(df_tracks['track_id']),batchsize):
    batch = df_tracks['track_id'][i:i+batchsize]
    feature_results = sp.audio_features(batch)
    for i, t in enumerate(feature_results):
        if t == None:
            None_counter = None_counter + 1
        else:
            rows.append(t)
            
print('Number of tracks where no audio features were available:',None_counter)

# saving the features in a data frame
df_audio_features = pd.DataFrame.from_dict(rows,orient='columns')
print("Shape of the dataset:", df_audio_features.shape)
df_audio_features.head()


columns_to_drop = ['analysis_url','track_href','type','uri']
df_audio_features.drop(columns_to_drop, axis=1,inplace=True)

df_audio_features.rename(columns={'id': 'track_id'}, inplace=True)

df_audio_features.shape

# merge both dataframes 
df = pd.merge(df_tracks,df_audio_features,on='track_id',how='inner') 
print("Shape of the dataset:", df_audio_features.shape)
df.head()

print (track_id)

print (df_audio_features.valence)

df.to_csv('spotify_data.csv')

if (df_audio_features.valence > 0.670) :
    print("Mood is: Happy")

if (df_audio_features.valence > 0.570):
    print("Mood is: Energetic")

if (df_audio_features.valence > 0.470):
    print("Mood is: Aggressive")

if (df_audio_features.valence > 0.370):
    print("Mood is: Dark")

if (df_audio_features.valence > 0.050):
    print("Mood is: Relaxing")

