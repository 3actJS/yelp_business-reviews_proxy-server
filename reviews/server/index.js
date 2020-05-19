const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/reviews/restaurants/:id', (req, res) => {
  console.log(req.query);
  if(req.query.sort_by) {
    return db.sortReviews(req.params.id, req.query.sort_by, (error, data) => {
      if (error) {
        console.log(error);
        res.status(404).send('error GET on sort reviews');
      } else {
        res.status(200).send(data);
      }
    })
  } else if (req.query.q) {
    return db.searchedReviews(req.params.id, req.query.q, (error, data) => {
      if (error) {
        console.log(error);
        res.status(404).send('error GET on searched reviews');
      } else {
        res.status(200).send(data);
      }
    });
  }
  db.allReviews(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
      res.status(404).send('error GET request on all reviews');
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/reviews/emoji', (req, res) => {
    db.emojiPlus(req.body, (err, data) => {
        if (err) {
          res.status(404).send('error updating emoji')
        } else {
          res.status(200).send(data)
        }
      });
    }
  )

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
