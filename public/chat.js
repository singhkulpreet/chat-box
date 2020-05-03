var socket=io.connect("http://localhost:3000")

var message=document.getElementById('message')
var handle=document.getElementById('handle')
var btn=document.getElementById('send')
var output=document.getElementById('output')
var feedback=document.getElementById('feedback')



// //send message to all users including sender

// btn.addEventListener('click',()=>{
//     socket.emit("chat",{message:message.value,handle:handle.value})
// })

// socket.on("chat",(data)=>{
//     console.log(data);
//     output.innerHTML+=data.handle+" -------- "+data.message
// })




// //send typing message to all users except sender

// message.addEventListener('keypress',()=>{
//     socket.emit("typing",handle.value)
// })

// socket.on("typing",(data)=>{
//     console.log(data);
//     feedback.innerHTML=data+"   is typing"
// })




// send data to particular user

socket.emit("chatId",{id:Math.floor(Math.random() * 10)})

btn.addEventListener('click',()=>{
    socket.emit("chatUser",{message:message.value,handle:handle.value})
})

socket.on("chatUser",(data)=>{
    console.log("----data---",data);
    output.innerHTML+=data.message+"-----"+data.handle   
})


// //send typing message to all users except sender

message.addEventListener('keypress',()=>{
    socket.emit("chatTyping",handle.value)
})

socket.on("chatTyping",(data)=>{
    console.log(data);
    feedback.innerHTML=data+"   is typing"
})

message.addEventListener('keyup',()=>{
    socket.emit("chatTypingUp",handle.value)
})

socket.on("chatTypingUp",(data)=>{
    console.log(data);
    feedback.innerHTML=""
})