var sqlite3 = require('sqlite3').verbose();
//引入sqlite

const dbname = 'customer'
const db = new sqlite3.Database(dbname)
//create database

db.serialize(() => {
  const sql = `
      CREATE TABLE IF NOT EXISTS customer
      (id integer primary key,cusName TEXT,tele TEXT,email TEXT,time TEXT,Num TEXT)
  `;
  // 執行sql指令
  db.run(sql);
});
//initialize database



//class customer API
//將API對應到sql語法
//cb==callback
class Customer {
    static all(cb) {
        db.all('SELECT * FROM customer', cb);
    }
    static find(id, cb) {
        db.get('SELECT * FROM customer WHERE id = ?', id,cb);
    }
    //取得最大的ID號碼
    static num(cb){
        db.get('SELECT MAX(id) FROM customer;',cb)
    }
    // 添加一个条文章记录
    static create(data, cb) {
        const sql = `
                INSERT INTO 
                customer(cusName,tele,email,time,Num) 
                VALUES(?,?,?,?,?) 
                ;select last_insert_rowid();`;
        db.run(sql, data.cusName, data.tele,data.email,data.time,data.Num, cb);
    }
    // 删除
    static delete(id, cb) {
        if (!id) return cb(new Error(`缺少参数id`));
        db.run('DELETE FROM customer WHERE id=?', id, cb)
    }
    // 更新
    static update(data, cb) {
        const sql = `
            UPDATE customer
            SET cusName=?,tele=?,email=?,time=?,Num=?
            WHERE Num=""
        `
        //因為顧客ID=取餐編號，所以直接更新
        db.run(sql, data.cusName, data.tele, data.email,data.time, data.Num , cb)
    }
    //取得最新一筆資料，嘗試把最新的資料當作參數，這樣就能得到id了
    static newData(cb) {
        const sql = `

        select last_insert_rowid();
        `
        //因為顧客ID=取餐編號，所以直接更新
        db.get(sql, cb)
    }
}
//匯出Class的API
module.exports.Customer = Customer;
