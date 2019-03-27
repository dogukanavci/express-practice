console.log('server running');

const fs = require('fs');
const express = require('express');
const app = express();
var data = fs.readFileSync('word.json');
var words = JSON.parse(data);

const server = app.listen(3000, listening);

function listening(){
  console.log('LISTENING on port 3000');
}

app.get('/add/:database/:score',addWord);

function addWord(request ,response){
  let input = request.params;
  let database = input.database;
  let score = Number(input.score);

  words[database] = score;
  fs.writeFile('word.json',JSON.stringify(words, null, 2),finished);
  function finished(err){
    console.log('Success adding objects to JSON file');
    response.send(database+' : '+ score + ' added to JSON');
  }
}
app.get('/view',view);

function view(req,res){
  res.send('The JSON file has the following content: ' + JSON.stringify(words, null, 2));
}

app.get('/*',hi);
function hi(req,res){
  res.send('Hello you can add components JSON file with routing /add/obj/5 and view the file with the routing /view');
}
