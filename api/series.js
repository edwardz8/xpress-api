const seriesRouter = express.Router({ mergeParams: true});
const express = require('express');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

series.get('/', (req, res, next) => {
  db.all('SELECT * FROM Artist WHERE series', (err, series) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({series: series});
      } next();
});
});

seriessRouter.param('artistId', (req, res, next, seriesId) => {
  const sql = 'SELECT * FROM Artist WHERE series.id = $seriesId';
  const values = {$seriesId: seriesId};
  db.get(sql, values, (error, series) => {
    if (error) {
      next(error);
    } else if (series) {
      req.series = series;
      next();
    } else {
      res.sendStatus(404);
    }
});
});

seriesRouter.get('seriesId', (req, res) => {
    db.get(
      "SELECT * FROM Artist WHERE series = $seriesId",
    {
      $id: req.params.seriesId,
    },
(error, series) => {
  if (error) {
    next(error);
  } else if (series) {
    res.status(200).json({series: series});
} else {
  res.sendStatus(404);
}
}
);
});


module.exports = seriesRouter;
