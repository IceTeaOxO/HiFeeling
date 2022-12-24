var express = require('express');
var app = express();

const path = require('path');
const bodyParser = require('body-parser')
// const Articles = require('./db').Articles;


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
// 获取文章列表
app.get('/articles', (req, res, next) => {
    Articles.all((err, articles) => {
        if (err) return next(err);
        res.send(articles)
    })
});
// 获取某一篇文章
app.get('/articles/:id', (req, res, next) => {
    Articles.find(req.params.id, (err, article) => {
        if (err) return next(err);
        res.send(article)
    })
});
// 删除一篇文章
app.delete('/articles/:id', (req, res, next) => {
    Articles.delete(req.params.id, (err, article) => {
        if (err) return next(err);
        res.send("删除成功")
    })
});

// 创建一篇文章 使用消息体解析
app.post('/articles', (req, res, next) => {
    Articles.create({
        "title": req.body.title ? req.body.title : '',
        "content": req.body.content ? req.body.content : ''
    }, (err, data) => {
        if (err) return next(err);
        res.send('添加成功')
    });
});

// 更新一篇文章数据
app.put('/articles/:id', (req, res, next) => {
    Articles.update({
        "id":req.params.id,
        "title": req.body.title ? req.body.title : '',
        "content": req.body.content ? req.body.content : ''
    }, (err, data) => {
        if(err) return next(err);
        res.send('更新成功')
    });
})





















app.get('/ok', function (req, res) {
  res.send('okkkkkk');
  console.log("req")
  
});

app.post('/', function (req, res) {
  //接收post
  console.log("req213")
  console.log(req.body)
  // var user = JSON.parse(req.body)
  res.redirect('http://localhost:3000/num')
  // res.send(JSON.stringify(user))
  // console.log(JSON.stringify(user))
  
  
});



// An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });


app.listen(5000);
console.log('App is listening on port 5000');
