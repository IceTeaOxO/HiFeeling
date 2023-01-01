var sqlite3 = require('sqlite3').verbose();
//引入sqlite

const dbname = 'food'
const db = new sqlite3.Database(dbname)
//create database

db.serialize(() => {
  const sql = `
      CREATE TABLE IF NOT EXISTS food
      (id integer primary key,cusName TEXT,tele TEXT,email TEXT)
  `;
  // 執行sql指令
  db.run(sql);
});
//initialize database



//class food API
//將API對應到sql語法
//cb==callback
class Food {
    static all(cb) {
        db.all('SELECT * FROM food', cb);
    }
    static find(id, cb) {
        db.get('SELECT * FROM food WHERE id = ?', id,cb);
    }
    static num(cb){
        db.get('SELECT MAX(id) FROM food;',cb)
    }
    // 添加一个条文章记录
    static create(data, cb) {
        const sql = `
                INSERT INTO 
                food(cusName,tele,email) 
                VALUES(?,?,?) 
                ;select last_insert_rowid();`;
        db.run(sql, data.cusName, data.tele,data.email, cb);
    }
    // 删除一篇文章
    static delete(id, cb) {
        if (!id) return cb(new Error(`缺少参数id`));
        db.run('DELETE FROM food WHERE id=?', id, cb)
    }
    // 更新一篇文章数据
    static update(data, cb) {
        const sql = `
            UPDATE food
            SET cusName=?,tele=?,email=?
            WHERE id=?
        `
        db.run(sql, data.cusName, data.tele, data.id,data.email, cb)
    }
}
//匯出Class的API
module.exports.Food = Food;
