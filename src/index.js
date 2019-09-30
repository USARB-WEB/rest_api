const express = require ('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'web2'
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', [
  async (request, response, next) => {
    response.send({
      name: 'Test'
    });
  }
]);


app.get('/students', [
  async (request, response, next) => {
    db.connect();
    db.query("SELECT name FROM students", (error, results, fields) => {
      if(error) {
        response.send(error);
      }
      response.send(results);
    });
    db.end();
  }
]);

app.post('/students', [
  (request, response, next) => {
    db.query(`INSERT INTO students SET name = '${request.body.name}', age = ${request.body.age}`, (error, results, fields) => {
      if(error) {
        response.send(error);
      }
      response.send(results);
    });
    db.end();
  }
]);

app.patch('/students/:id', [
  (request, response, next) => {
    db.query(`UPDATE students SET name = '${request.body.name}', age = ${request.body.age} WHERE id = ${request.params.id}`, (error, results, fields) => {
      if(error) {
        response.send(error);
      }
      response.send(results);
    });
    db.end();
  }
]);

app.delete('/students/:id', [
  (request, response, next) => {
    db.query(`DELETE FROM students WHERE id = ${request.params.id}`, (error, results, fields) => {
      if(error) {
        response.send(error);
      }
      response.send(results);
    });
    db.end();
  }
]);

app.listen(3000);
