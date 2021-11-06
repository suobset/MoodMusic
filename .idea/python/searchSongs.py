    def track(self, track_id, market=None):
        """ returns a single track given the track's ID, URI or URL
            Parameters:
                - track_id - a spotify URI, URL or ID
                - market - an ISO 3166-1 alpha-2 country code.
        """

        trid = self._get_id("track", track_id)
        return self._get("tracks/" + trid, market=market)

    def tracks(self, tracks, market=None):
        """ returns a list of tracks given a list of track IDs, URIs, or URLs
            Parameters:
                - tracks - a list of spotify URIs, URLs or IDs. Maximum: 50 IDs.
                - market - an ISO 3166-1 alpha-2 country code.
        """

        tlist = [self._get_id("track", t) for t in tracks]
        return self._get("tracks/?ids=" + ",".join(tlist), market=market)

    def artist(self, artist_id):
        """ returns a single artist given the artist's ID, URI or URL
            Parameters:
                - artist_id - an artist ID, URI or URL
        """

        trid = self._get_id("artist", artist_id)
        return self._get("artists/" + trid)

    def artists(self, artists):
        """ returns a list of artists given the artist IDs, URIs, or URLs
            Parameters:
                - artists - a list of  artist IDs, URIs or URLs
        """

        tlist = [self._get_id("artist", a) for a in artists]
        return self._get("artists/?ids=" + ",".join(tlist))

    def search(self, q, limit=10, offset=0, type="track", market=None):
        """ searches for an item
            Parameters:
                - q - the search query (see how to write a query in the
                      official documentation https://developer.spotify.com/documentation/web-api/reference/search/)  # noqa
                - limit - the number of items to return (min = 1, default = 10, max = 50). The limit is applied
                          within each type, not on the total response.
                - offset - the index of the first item to return
                - type - the types of items to return. One or more of 'artist', 'album',
                         'track', 'playlist', 'show', and 'episode'.  If multiple types are desired,
                         pass in a comma separated string; e.g., 'track,album,episode'.
                - market - An ISO 3166-1 alpha-2 country code or the string
                           from_token.
        """
        return self._get(
            "search", q=q, limit=limit, offset=offset, type=type, market=market
        )

    def audio_analysis(self, track_id):
        """ Get audio analysis for a track based upon its Spotify ID
            Parameters:
                - track_id - a track URI, URL or ID
        """
        trid = self._get_id("track", track_id)
        return self._get("audio-analysis/" + trid)

    def audio_features(self, tracks=[]):
        """ Get audio features for one or multiple tracks based upon their Spotify IDs
            Parameters:
                - tracks - a list of track URIs, URLs or IDs, maximum: 100 ids
        """
        if isinstance(tracks, str):
            trackid = self._get_id("track", tracks)
            results = self._get("audio-features/?ids=" + trackid)
        else:
            tlist = [self._get_id("track", t) for t in tracks]
            results = self._get("audio-features/?ids=" + ",".join(tlist))
        # the response has changed, look for the new style first, and if
        # its not there, fallback on the old style
        if "audio_features" in results:
            return results["audio_features"]
        else:
            return results
