var express = require('express');
var app = express();
var _ = require('underscore')
const path = require('path');
const bodyParser = require('body-parser')
const Customer = require('./DB/customer').Customer;
const Perorder = require('./DB/perorder').Perorder;
const Food = require('./DB/food').Food;

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

app.get('/init', (req, res, next) => {
    //事先寫入餐點資料
    //其實放外面也行，但是為了方面測試先放裡面
    Food.create({
        "itemNo": '1',
        "name": '田園蔬菜歐姆吐司',
        "price" : '40'
    }, (err, data) => {
        if (err) return next(err);
    });
    Food.create({
        "itemNo": '2',
        "name": '田園蔬菜歐姆漢堡',
        "price" : '45'
    }, (err, data) => {
        if (err) return next(err);
    });
    Food.create({
        "itemNo": '3',
        "name": '培根起司歐姆吐司',
        "price" : '40'
    }, (err, data) => {
        if (err) return next(err);
    });
});



//查詢食物資料庫
app.get('/food', (req, res, next) => {
    Food.all((err, food) => {
        if (err) return next(err);
        //將結果送回給client
        res.send(food)
    })
});


//查詢客戶資料庫
app.get('/customer', (req, res, next) => {
    Customer.all((err, customer) => {
        if (err) return next(err);
        //將結果送回給client
        res.send(customer)
    })
});
//根據取餐ID查詢客戶資料
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
// 創建客戶資料
app.post('/customer', (req, res, next) => {
    Customer.create({
        "cusName": req.body.cusName ? req.body.cusName : '',
        "tele": req.body.tele ? req.body.tele : '',
        "email": req.body.email ? req.body.email : '',
        "time" : req.body.time ? req.body.time : '',
        "Num" : req.body.Num ? req.body.Num : ''
    }, (err, data) => {
        if (err) return next(err);
    });

    Customer.newData((err, customer) => {
        if (err) return next(err);
        // setCount(customer['last_insert_rowid()'])
        //更新顧客號碼
    Customer.update({
        "cusName": req.body.cusName ? req.body.cusName : '',
        "tele": req.body.tele ? req.body.tele : '',
        "email": req.body.email ? req.body.email : '',
        "time" : req.body.time ? req.body.time : '',
        "Num" : (customer['last_insert_rowid()'])
    }, (err, data) => {
        if (err) return next(err);
    });
    //更新餐點號碼
    Perorder.update({
        "Num": (customer['last_insert_rowid()']),
        //預設取餐編號為0，如果填完顧客訊息會在更新取餐編號
    }, (err, data) => {
        if (err) return next(err);
    });
    })
    
    //重導向至取得取餐號碼頁
    res.redirect('http://localhost:3000/num')
});

//回傳發放出去的最大顧客取餐號碼
app.get('/OrderNum', (req, res, next) => {
    Customer.num((err, customer) => {
        if (err) return next(err);
        res.send(Object.values(customer))
    })
});



//提交點餐表單
app.post('/menuOrder', (req, res, next) => {
    // console.log(req.body)
    // console.log(typeof(req.body))
    // console.log((req.body.itemNo[2]))
    // console.log((Object.keys(req.body.itemNo)))
    // console.log((Object.values(req.body.number)))
    let value = Object.values(req.body.number)
    // console.log(test)
    // console.log(req.body.itemNo[1])
    value.map((item,index)=>{
        // console.log((item))
        if(item!=""&&item!=0){
            Perorder.create({
                "itemNo": req.body.itemNo[index] ? req.body.itemNo[index] : '',
                "price": req.body.price[index] ? req.body.price[index] : '',
                "number": req.body.number[index] ? req.body.number[index] : '',
                "Num": '0',
                //預設取餐編號為0，如果填完顧客訊息會在更新取餐編號
            }, (err, data) => {
                if (err) return next(err);
            });
        }
    })
    //前端傳回的表單資料是一個物件，需要判斷數量不為0的資料存入資料庫
    
    res.redirect('http://localhost:3000/info')
});
//查看點餐資料庫
app.get('/menuOrder', (req, res, next) => {
    // console.log("menuOrder")
    Perorder.all((err, perorder) => {
        if (err) return next(err);
        //將結果送回給client
        res.send(perorder)
    })
});

app.get('/foodDetail',(req,res,next)=>{
    // console.log(req.query.itemNo)
    Food.find(req.query.itemNo, (err, food) => {
        if (err) return next(err);
        res.send(food)
    })
    // Perorder.all((err, perorder) => {
    //     if (err) return next(err);
    //     //將結果送回給client
    //     res.send(perorder)
    // })

});

//從點餐資料庫中取得報表所需資料
app.get('/orderReport',(req,res,next)=>{
    data = [{
        "Name":"餐點A",
        "number":13,
      },{
        "Name":"餐點B",
        "number":39,
      },
    ]
    // console.log((data))
    // data = JSON.stringify(data)
    // console.log(typeof(data))
    res.send(data)

    // Perorder.all((err, perorder) => {
    //     if (err) return next(err);
    //     //將結果送回給client
    //     res.send(perorder)
    // })

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
