let notesData = require('./db/db.json')
const express = require('express')
const fs = require('fs')

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


// GET `/notes` - Should return the `notes.html` file.
app.get('/notes',function(req,res) {
    res.redirect('/notes.html')
})


// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', function(req,res){
    for (const [id,obj] of notesData.entries()){
        obj.id = id+1
    }
    res.send(notesData)
})


// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
app.delete('/api/notes/:id', function(req,res){
    notesData.splice(req.params.id , 1)
    fs.writeFileSync('./db/db.json', JSON.stringify(notesData))
    res.send(notesData)
})


// POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', function(req,res){
    notesData.push(req.body)
    fs.writeFileSync('./db/db.json', JSON.stringify(notesData))
    res.send(notesData)

})


// GET `*` - Should return the `index.html` file
app.get('*',function(req,res) {
    res.redirect('/')
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});