var express = require('express');
var app = express();

const path = require('path');
const bodyParser = require('body-parser')
const Customer = require('./DB/customer').Customer;
const Perorder = require('./DB/perorder').Perorder;

//避免跨域請求被阻擋
var cors = require('cors');
app.use(cors());
const corsOptions = {
  origin: [
    'http://www.example.com',
    'http://localhost:3000',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['tele-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// app.use(bodyParser.text({type: '*/*'}));
// 使用body-parser,支持编码为json的请求体
app.use(bodyParser.json());
// 支持编码为表单的消息体
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
))
const port = process.env.PORT || 3002

//將網址請求對應到class API
//查詢
app.get('/customer', (req, res, next) => {
    Customer.all((err, customer) => {
        if (err) return next(err);
        //將結果送回給client
        res.send(customer)
    })
});
app.get('/customer/:id', (req, res, next) => {
    Customer.find(req.params.id, (err, customer) => {
        if (err) return next(err);
        res.send(customer)
    })
});
// 删除
// app.delete('/customer/:id', (req, res, next) => {
//     Customer.delete(req.params.id, (err, customer) => {
//         if (err) return next(err);
//         res.send("删除成功")
//     })
// });
// 創建
app.post('/customer', (req, res, next) => {
    Customer.create({
        "cusName": req.body.cusName ? req.body.cusName : '',
        "tele": req.body.tele ? req.body.tele : '',
        "email": req.body.email ? req.body.email : ''
    }, (err, data) => {
        if (err) return next(err);
        res.redirect('http://localhost:3000/num')
    });
});

//回傳號碼
app.get('/OrderNum', (req, res, next) => {
    Customer.num((err, customer) => {
        if (err) return next(err);
        res.send(Object.values(customer))
    })
});




app.post('/menuOrder', (req, res, next) => {
    Perorder.create({
        
        "time": req.body.time ? req.body.time : '',
        "itemNo": req.body.itemNo ? req.body.itemNo : '',
        "Name": req.body.Name ? req.body.Name : '',
        "price": req.body.price ? req.body.price : '',
        "number": req.body.number ? req.body.number : '',
    }, (err, data) => {
        if (err) return next(err);
        res.redirect('http://localhost:3000/info')
    });
});
app.get('/menuOrder', (req, res, next) => {
    Perorder.all((err, perorder) => {
        if (err) return next(err);
        //將結果送回給client
        res.send(perorder)
    })
});

app.get('/orderOrder',(req,res,next)=>{
    // data = [{"time":"2022-12-29 11:11:00","itemNo":1,"Name":"test","price":"1231","number":"2"},{"time":"2022-12-29 11:10:00","itemNo":2,"Name":"test2","price":"11","number":"1"},{"time":"2022-12-29 10:10:00","itemNo":7,"Name":"test3","price":"41","number":"8"}]
    // console.log((data))
    // data = JSON.stringify(data)
    // console.log(typeof(data))
    // res.send(data)
    Perorder.all((err, perorder) => {
        if (err) return next(err);
        //將結果送回給client
        res.send(perorder)
    })

});

app.get('/orderReport',(req,res,next)=>{
    // data = [{
    //     "Name":"餐點A",
    //     "number":13,
    //   },{
    //     "Name":"餐點B",
    //     "number":39,
    //   },
    // ]
    // console.log((data))
    // data = JSON.stringify(data)
    // console.log(typeof(data))
    // res.send(data)
    Perorder.all((err, perorder) => {
        if (err) return next(err);
        //將結果送回給client
        res.send(perorder)
    })

});

















app.get('/ok', function (req, res) {
  res.send('okkkkkk');
  console.log("req")
  
});

app.post('/', function (req, res) {
  //接收post
  console.log("req213")
  console.log(req.body)
  res.redirect('http://localhost:3000/num')
});




app.listen(5000);
console.log('App is listening on port 5000');
