function getSong() {

    let songName = document.getElementById('name').value
    if(songName === '') {
        return alert('Please enter a song')
    }

    let songDiv = document.getElementById('data')
    songDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
 			songDiv.innerHTML = songDiv.innerHTML + `
			<h1>Songs matching: ${songName} </h1>
			<ul></ul>
      <p>${xhr.responseText}</p>
			`
        }
    }
    xhr.open('GET', `/songs?name=${songName}`, true)
    xhr.send()
}



const ENTER=13

function handleKeyUp(event) {
event.preventDefault()
   if (event.keyCode === ENTER) {
      document.getElementById("submit_button").click()
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit_button').addEventListener('click', getSong)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keyup', handleKeyUp)

})
