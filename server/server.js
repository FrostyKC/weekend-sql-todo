const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const pool = require('./modules/pool.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// ROUTES

app.get('/todo', (req, res) => {
  const queryText = 'SELECT * FROM "To-Do" ORDER BY "task_completed";';

  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/todo', (req, res) => {
  const todoData = req.body;
  const queryText = `INSERT INTO "To-Do" ("task", "task_completed")
  VALUES ($1, $2);`;

  const queryArray = [todoData.task, todoData.task_completed];

  if (todoData.task) {
    pool
      .query(queryText, queryArray)
      .then((dbResponse) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

app.delete('/todo/:id', (req, res) => {
  // req.params is {} { id: '' }
  const todoId = req.params.id;
  const queryText = `DELETE FROM "To-Do" WHERE id=$1;`;
  const queryArrayData = [todoId];

  pool
    .query(queryText, queryArrayData)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.put('/todo/task_completed/:id', (req, res) => {
  const newTodoInfo = req.body;
  const queryText = `UPDATE "To-Do" SET task_completed=$1 WHERE id=$2;`;
  const queryArray = [newTodoInfo.task_completed, req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warning(err);
      res.sendStatus(500);
    });
});

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
