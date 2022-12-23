var express = require('express');
var app = express();

const path = require('path');

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
//避免跨域請求被阻擋
var cors = require('cors');
app.use(cors());
const corsOptions = {
  origin: [
    'http://www.example.com',
    'http://localhost:3000',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// app.use((req, res, next)=> {
//   res.header('Access-Control-Allow-Origin', "*")
//   res.header('Access-Control-Allow-Credentials', false)
//   next()
// })


app.get('/num', function (req, res) {
  res.send('okkkkkk');
  console.log("req")
  // console.log(res);
})

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
    
});







app.get('/', function(req, res) {
  // do something
  // console.log(req.body)
  // console.log(req)
  console.log("////////")
})



app.listen(5000);
console.log('App is listening on port 5000');
