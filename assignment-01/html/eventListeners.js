document.addEventListener('DOMContentLoaded', function() {
  /*
  This is called after the browser
  has loaded the web page
  */

  //add listeners to buttons
  document.getElementById('submit_button').addEventListener('click', function () { handleSubmitButton(); })
  document.getElementById('transpose_up').addEventListener('click', function () { handleTransposeUp(); })
  document.getElementById('transpose_down').addEventListener('click', function () { handleTransposeDown(); })

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
})