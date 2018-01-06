const apiRouter = express.Router();


app.get ('/artists', (req, res, next) => {
  res.send (artist);
  if (is_currently_employed === 1) {
  res.send(artist);
} else {
  res.status(404).send();
}
});

app.post('/artists', (req, res, next) => {
  const receivedArtist = createElement('artist', req.query);
  if (receivedArtist) {
    artist.push(receivedArtist);
    res.status(201).send(receivedArtist);
  } else {
    res.status(400).send();
  }
});

app.get('/artists/:artistId', (req, res, next) => {
  const artist = getElementById(req.params.id, artist);
  if (artist) {
    res.send(artist);
  } else {
    res.status(404).send();
  }
});


module.exports = apiRouter;
