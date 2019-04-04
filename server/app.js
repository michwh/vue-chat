const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

let oSockets = []
io.on('connection', socket => {
  console.log(`用户连接成功`)
  oSockets.push(socket)
  // 群聊
  socket.on('sendMsg', data => {
    //broadcast表示发给所有的用户
    socket.broadcast.emit('receiveMsg', data)
  })
  // 上线
  socket.on('online', data => {
    socket.broadcast.emit('online', data)
  })
  // 断开连接
  socket.on('disconnect', () => {
    oSockets.filter(item => item !== socket)
    console.log('用户离线')
  })
})

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname , '../dist/index.html'))
})

app.use(express.static(path.resolve(__dirname, '../dist')))

// 解决跨域问题
// app.all('*', (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header('Access-Control-Allow-Headers', 'Content-type')
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH")
//   res.header('Access-Control-Max-Age', 1728000) //预请求缓存20天
//   next()
// })

server.listen(3001, () => {
    console.log('server has running at port 3001')
})