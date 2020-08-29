var users = [];

const io = require('socket.io')();

io.on('connection',function(socket){
    console.log('new connection made');

    socket.on('get-users', function(data){
        socket.emit('all-users',users);
    });

    socket.on('join',function(data){
        const dupeUser = users.some(user => user.socketid === socket.id);
        if(dupeUser){
            return;
        }
        socket.alias = data.alias;
        var userObj = {
            alias : data.alias,
            socketid : socket.id,
            team : data.team
        };
        users.push(userObj);
        io.emit('all-users',users);
    });

    socket.on('disconnect', function(){
        users = users.filter(function(item){
            return item.alias !== socket.alias;
        });
        io.emit('all-users',users);
    });
});

const port = 8080;
io.listen(port);
console.log('listening on port',port);
