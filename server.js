const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded())
var fs = require("fs");

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


//Create a POST route to handle incoming notification
app.post('/send_notif', (req, res) => {

  //Get the notification entry to be written to file
  const sender = req.body.Sender
  const mottaker = req.body.Mottaker
  const linje = "Notifikasjon fra " + sender + " til " + mottaker + "\n"
  
  //Writes the line to the specified file
  fs.appendFile('notifikasjoner.txt', linje, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Notifikasjon skrevet til fil');

});
  //Send response back to client
  res.send({responsemsg: "Notifikasjon mottatt"})

})


// GET route for testing
app.get('/get_test', (req, res) => {
  res.send({ testmsg: 'this is a get test message' });
});

// POST route for testing
app.post('/post_test', (req, res) => {
  console.log(req.body)
  res.send({ testmsg: 'this is a post test message' });
});


