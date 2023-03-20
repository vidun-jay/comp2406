//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page

let username = ""
let success_flag = false // login success flag

socket.on('serverSays', function(message, recipients) {

  // if username is blank don't let them see messages
  if (username == "") return

  socket.emit('serverSays', 'You are connected to CHAT SERVER')
  let msgDiv = document.createElement('div')

  /*
  What is the distinction among the following options to set
  the content? That is, the difference among:
  .innerHTML, .innerText, .textContent
  */
  //msgDiv.innerHTML = message
  // msgDiv.innerText = message
  msgDiv.textContent = message

// check if the message is from the current client
if (message.startsWith(`${username}: `)) {
  // if the message is from the current client, display it in blue
  msgDiv.style.background = "#4389F7";
  msgDiv.style.color = "#FFFFFF";
}

  // private
  if (recipients.length > 0) {
    // check if you're the intended person
    if (recipients.includes(username) || message.startsWith(`${username}: `)) {
      if (!message.startsWith(`${username}: `)) msgDiv.style.color = 'red'
      document.getElementById('messages').appendChild(msgDiv)
    }
  }
  else {
      document.getElementById('messages').appendChild(msgDiv)
  }
})

function sendMessage() {

  // if username is blank don't let them send messages
  if (username == "") return;

  socket.emit('serverSays', 'You are connected to CHAT SERVER')

  const message = `${username}: ${document.getElementById('msgBox').value.trim()}`
  if(message === '') return //do nothing

  socket.emit('clientSays', message)
  document.getElementById('msgBox').value = ''
}

function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {
    sendMessage()
    return false //don't propogate event
  }
}

//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
  document.getElementById('send_button').addEventListener('click', sendMessage)
  document.getElementById('connect_button').addEventListener('click', validUsername)
  document.getElementById('clear_button').addEventListener('click', clear)

  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})

/**
 *
 * @param {string} username Checks if a username is valid
 * @returns true if valid,
 * @returns false if invalid
 */
function validUsername() {

  username = document.getElementById('connectBox').value.trim()
  document.getElementById('msgBox').username = ''

  const first_char = username.charAt(0)
  // check if the first character is a letter using regex
  if (!first_char.match(/[a-zA-Z]/)) {
    alert("Invalid username! Try again.")
    return false;
  }

  // check if all the characters are letters or numbers
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    alert("Invalid username! Try again.")
    return false;
  }

  // otherwise
  socket.emit('onConnect', `${username}`)
  // socket.emit('onConnect', `username`)
  return true;
}

/**
 * Clear the screen
 */
function clear() {
  document.getElementById('messages').innerText = ""
}