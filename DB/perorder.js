var sqlite3 = require('sqlite3').verbose();
//引入sqlite

const dbname = 'perorder'
const db = new sqlite3.Database(dbname)
//create database

db.serialize(() => {
  const sql = `
      CREATE TABLE IF NOT EXISTS perorder
      (id integer primary key,time TEXT,itemNo TEXT,Name TEXT,price TEXT,number TEXT)
  `;
  // 執行sql指令
  db.run(sql);
});
//initialize database



//class perorder API
//將API對應到sql語法
//cb==callback
class Perorder {
    static all(cb) {
        db.all('SELECT * FROM perorder', cb);
    }
    static find(id, cb) {
        db.get('SELECT * FROM perorder WHERE id = ?', id,cb);
    }
    
    // 添加一个条文章记录
    static create(data, cb) {
        const sql = `
                INSERT INTO 
                perorder(time,itemNo,Name,price,number) 
                VALUES(?,?,?,?,?) 
                ;select last_insert_rowid();`;
        db.run(sql, data.time, data.itemNo,data.Name, data.price,data.number, cb);
    }
    // 删除一篇文章
    static delete(id, cb) {
        if (!id) return cb(new Error(`缺少参数id`));
        db.run('DELETE FROM perorder WHERE id=?', id, cb)
    }
    // 更新一篇文章数据
    // static update(data, cb) {
    //     const sql = `
    //         UPDATE perorder
    //         SET time=?,itemNo=?,itemNo=?
    //         WHERE id=?
    //     `
    //     db.run(sql, data.time, data.itemNo, data.id,data.itemNo, cb)
    // }
}
//匯出Class的API
module.exports.Perorder = Perorder;
