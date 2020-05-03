var express=require('express')
var socket=require('socket.io')
var path=require('path')
var app=express()


// app.get('/',(req,res)=>{
//     console.log('yeah');
//     //res.render('index')
// })



var server=app.listen('3000',()=>{
    console.log('server connected at 3000');
})

app.use(express.static('public'))

var people={}
var io=socket(server)

io.on('connection',(socket)=>{
    console.log("ggg");
    
    console.log(socket.id);
    

    //send message to all user including sender

    // socket.on("chat",(data)=>{
    //     console.log(data);
    //     io.sockets.emit("chat",data)
    // })




    // //send message to all user except sender (broadcast)

    // socket.on("typing",(data)=>{
    //     console.log(data);        
    //     socket.broadcast.emit("typing",data)
    // })



     // //send message to specific user

        socket.on('chatId',(data)=>{
            people[data.id]=socket.id
            console.log("people",people);
            
            io.sockets.emit("chatId",people)
        })

        socket.on("chatUser",(data)=>{
            console.log("chatUser-------"+data.handle);
            socket.broadcast.to(people[data.handle]).emit( 'chatUser', data );
        })

    // //send message to all user except sender (broadcast)

    socket.on("chatTyping",(data)=>{
        console.log(data);        
        socket.broadcast.to(people[data]).emit( 'chatTyping', data );
    }) 
    
    socket.on("chatTypingUp",(data)=>{
        console.log(data);        
        socket.broadcast.to(people[data]).emit( 'chatTypingUp', data );
    }) 

    socket.on("disconnect",()=>{

        spot=getKeyByValue(people,socket.id)
        console.log('user ' + spot +'---------'+socket.id +' disconnected');
        delete people[spot]
        
    })
    
})


  
  


function getKeyByValue(value) {
    console.log('get key',value);
    
    return Object.keys(people).find(key => people[key] == value);
  }
