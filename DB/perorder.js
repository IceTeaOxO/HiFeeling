var sqlite3 = require('sqlite3').verbose();
//引入sqlite

const dbname = 'perorder'
const db = new sqlite3.Database(dbname)
//create database

db.serialize(() => {
  const sql = `
      CREATE TABLE IF NOT EXISTS perorder
      (id integer primary key,itemNo TEXT,price TEXT,number TEXT,Num TEXT)
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
                perorder(itemNo,price,number,Num) 
                VALUES(?,?,?,?) 
                ;select last_insert_rowid();`;
        db.run(sql, data.itemNo,data.price,data.number,data.Num, cb);
    }
    // 删除
    static delete(id, cb) {
        if (!id) return cb(new Error(`缺少参数id`));
        db.run('DELETE FROM perorder WHERE id=?', id, cb)
    }
    // 更新
    //傳入顧客ID當作取餐編號
    static update(data, cb) {
        const sql = `
            UPDATE perorder
            SET Num=?
            WHERE Num=?
        `
        db.run(sql, data.Num,"0", cb)
    }
}
//匯出Class的API
module.exports.Perorder = Perorder;
