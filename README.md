安裝相關套件+啟動後端
npm install
npm run server
切換到client並安裝+啟動前端
cd client
npm install
npm start

使用ngrok服務(需要註冊帳號)
ngrok http 3000 -host-header="localhost:3000"
ngrok http --host-header=rewrite 3000
