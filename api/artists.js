const artistsRouter = express.Router({ mergeParams: true});
const express = require('express');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

artistsRouter.get ('/', (req, res, next) => {
  db.all('SELECT * FROM Artist WHERE Artist.is_currently_employed = 1', (err, artists) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({artists: artists});
      }
});
});

artistsRouter.param('artistId', (req, res, next, artistId) => {
  const sql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
  const values = {$artistId: artistId};
  db.get(sql, values, (error, artist) => {
    if (error) {
      next(error);
    } else if (artist) {
      req.artist = artist;
      next();
    } else {
      res.sendStatus(404);
    }
});
});

artistsRouter.get('artistId', (req, res) => {
    db.get(
      "SELECT * FROM Artist WHERE id = $id",
    {
      $id: req.params.artistId,
    },
(error, artist) => {
  if (error) {
    next(error);
  } else if (artist) {
    res.status(200).json({artist: artist});
} else {
  res.sendStatus(404);
}
}
);
});

/*artistsRouter.post('/', (req, res, next) => {
  const receivedArtist = createElement('artist', req.query);
  if (receivedArtist) {
    artist.push(receivedArtist);
    res.status(201).send(receivedArtist);
  } else {
    res.status(400).send();
  }
});
*/

artistsRouter.get('/', (req, res, next) => {
  const name = req.body.artist.name;
  const dateOfBirth = req.body.artist.dateOfBirth;
  const biography = req.body.artist.biography;
  const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;

  if (!name || !dateOfBirth || !biography) {
    return res.sendStatus(400);
  };
const sql = 'INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)';
const values = {
  $name: name,
  $dateOfBirth: dateOfBirth,
  $biography: biography,
  $isCurrentlyEmployed: isCurrentlyEmployed
};

db.run(sql, values, function(error) {
  db.get(`SELECT * FROM Artist WHERE Artist.id = ${this.lastID}`,
 (error, artist) => {
  res.status(200).json({artist: artist});
});
});
});

artistsRouter.put('artistId', (req, res, next) => {
  req.artist = artist;
  if(artist) {
    res.send(artist)
  } else {
    return res.sendStatus(400);
  };
  db.run(sql, values, function(error) {
    db.get(`SELECT * FROM Artist WHERE Artist.id = ${this.lastID}`,
   (error, artist) => {
    res.status(200).json({artist: artist});
  });
  });
});

artistsRouter.delete('/:artistId', (req, res, next) => {
  if (req.params.artistId) {
    db.run(
      `UPDATE Artist ` +
      `SET is_currently_employed === 0 ` +
      `WHERE id = ${req.params.artistId}`,
      function(error) {
        if (error) {
          console.log(error);
          res.status(400).send();
        }
        db.get(
          "SELECT * FROM Artist WHERE id = $id",
          {
            $id: req.params.artistId,
          },
          (error, rows) => {
            res.status(200).json({ artist: rows });
          }
        );
      }
    );
  } else {
    res.status(404).send();
  }
});


/*artistsRouter.get('/artists/:artistId', (req, res, next) => {
  const artist = getElementById(req.params.id, artist);
  if (artist) {
    res.send(artist);
  } else {
    res.status(404).send();
  }
});
*/


module.exports = artistsRouter;
