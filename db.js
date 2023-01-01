var sqlite3 = require('sqlite3').verbose();
//引入sqlite

const dbname = 'mydb'
const db = new sqlite3.Database(dbname)
//create database

db.serialize(() => {
  const sql = `
      CREATE TABLE IF NOT EXISTS articles
      (id integer primary key,title,content TEXT)
  `;
  // 執行sql指令
  db.run(sql);
});
//initialize database



//class Articles API
//將API對應到sql語法
class Articles {
    // 获取所有文章
    static all(cb) {
        db.all('SELECT * FROM articles', cb);
    }
    // 根据id 获取文章
    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id,cb);
    }
    // 添加一个条文章记录
    static create(data, cb) {
        const sql = `
                INSERT INTO 
                articles(title,content) 
                VALUES(?,?) 
                ;select last_insert_rowid();`;
        db.run(sql, data.title, data.content, cb);
    }
    // 删除一篇文章
    static delete(id, cb) {
        if (!id) return cb(new Error(`缺少参数id`));
        db.run('DELETE FROM articles WHERE id=?', id, cb)
    }
    // 更新一篇文章数据
    static update(data, cb) {
        const sql = `
            UPDATE articles
            SET title=?,content=?
            WHERE id=?
        `
        db.run(sql, data.title, data.content, data.id, cb)
    }
}
//匯出Class的API
module.exports.Articles = Articles;
