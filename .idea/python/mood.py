import json
import requests
from random import shuffle
from spotify import *
from settings import *
from model import User, Track, Playlist, UserTrack, PlaylistTrack, db, connect_to_db
from scipy import stats 
import numpy as np
from flask_sqlalchemy import SQLAlchemy 




def standardize_audio_features(user_tracks):
    """ Return dictionary of standardized audio features. 
    Dict = Track Uri: {Audio Feature: Cumulative Distribution} """

    user_tracks_valence = list(map(lambda track: track.valence, user_tracks))
    valence_array = np.array(user_tracks_valence)
    valence_zscores = stats.zscore(valence_array)
    valence_zscores = valence_zscores.astype(dtype=float).tolist()
    valence_cdf = stats.norm.cdf(valence_zscores)

    user_tracks_energy = list(map(lambda track: track.energy, user_tracks))
    energy_array = np.array(user_tracks_energy)
    energy_zscores = stats.zscore(energy_array)
    energy_zscores = energy_zscores.astype(dtype=float).tolist()
    energy_cdf = stats.norm.cdf(energy_zscores)

    user_tracks_danceability = list(map(lambda track: track.danceability, user_tracks))
    danceability_array = np.array(user_tracks_danceability)
    danceability_zscores = stats.zscore(danceability_array)
    danceability_zscores = danceability_zscores.astype(dtype=float).tolist()
    danceability_cdf = stats.norm.cdf(danceability_zscores)

    user_audio_features = {}

    for i, user_track in enumerate(user_tracks):
        user_audio_features[user_track.uri] = {'valence': valence_cdf[i], 
                                           'energy': energy_cdf[i], 
                                           'danceability': danceability_cdf[i]}
    
    return user_audio_features
