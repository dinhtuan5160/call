var io = require('socket.io')(3000);

var arr= [];
io.on('connection',socket=>{
    socket.on('dang_ky',function (data) {
        arr.push(data);
        socket.peerId = data.peerId;
        socket.broadcast.emit('add_user',data);
        socket.emit('hien_thi',data);
    })
    socket.broadcast.emit('danh_sach',arr);
    socket.on('huy_goi',() =>{
        io.sockets.emit('huy_tat_ca');
    })
    socket.on('disconnect',function () {
        var index = arr.findIndex(data => data.peerId === socket.peerId)
        arr.splice(index,1);
        io.sockets.emit('huy_ket_noi',socket.peerId);
    })
})
