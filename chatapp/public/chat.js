const socket=io()
const totalClients=document.getElementById("clients-total")

const messageContainer=document.getElementById("message-container")
const nameInput=document.getElementById("name-input")
const messageForm=document.getElementById("message-form")
const messageInput=document.getElementById("message-input")
const chatProfileName=document.getElementById("profileinputbox")
const userpopup=document.getElementById("usernamePopup");
const userpopupButton=document.getElementById("popupbutton")



socket.on('totalclients',(data)=>{
    console.log(data);
    totalClients.innerHTML=`Total clients:${data}`

})
messageForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    sendMessage()
})

function sendMessage(){
    if(messageInput.value==='') return
    console.log(messageInput.value);

    const data={
        name:nameInput.value,
        message:messageInput.value,
        dateTime:new Date()
    }
    socket.emit('message',data) 
    addMessage(true,data)
    messageInput.value=''

}
socket.on('chatMessage',(data)=>{
    console.log(data);
    addMessage(false,data)
    
})


function addMessage(isOwnMessage,data){
   clearFeedback()
   const now = new Date();
   const hours = now.getHours();
   const minutes = now.getMinutes();

   // Format hours and minutes
   const formattedHours = hours % 12 || 12; // Convert to 12-hour format
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Pad minutes with leading zero if needed
   const ampm = hours >= 12 ? 'pm' : 'am'; // Determine AM or PM

   // Create time string in 'h:mmam/pm' format
   const timeString = `${formattedHours}:${formattedMinutes}${ampm}`;
    const element=`
    <li class="${isOwnMessage?'message-right':'message-left'}">
                <p class="message">
                    ${data.message}
                    <span>${data.name}  ${timeString}</span>
                </p>
            </li>
    `
    messageContainer.innerHTML+=element
    scrollToBottom()
}

function scrollToBottom(){
    messageContainer.scroll(0,messageContainer.scrollHeight);
}

messageInput.addEventListener('focus',(e)=>{
    socket.emit('feedback',{
        feedback:`✒${nameInput.value} is typing`
    })

}),
messageInput.addEventListener("keypress",(e)=>{
    socket.emit('feedback',{
        feedback:`✒${nameInput.value} is typing`
    })
})
messageInput.addEventListener("blur",()=>{
    socket.emit('feedback',{
        feedback:"",
    })
})

socket.on('feedback',(data)=>{
    clearFeedback()
    const element=`
    <li class="message-feedback">
                <p class="feedback" id="feedback">
                    ${data.feedback}
                </p>
            </li>`
            messageContainer.innerHTML+=element
})

socket.on('usernames', (usernames) => {
    // Update the UI to show the list of usernames
    // Example: Update a user list element
    console.log('Usernames list:', usernames);
});
userpopup.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = nameInput.value.trim();
    if (username) {
        socket.emit('setUsername', username);
        chatProfileName.innerText = username;
        userpopup.style.display = 'none';
    }
});




function clearFeedback(){
    document.querySelectorAll('li.message-feedback').forEach(element=>{
        element.parentNode.removeChild(element)
    })
}


userpopup.addEventListener("submit",(e)=>{
    e.preventDefault()
    userpopup.style.display='none'
})

