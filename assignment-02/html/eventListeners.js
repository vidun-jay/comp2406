document.addEventListener('DOMContentLoaded', function() {
  //This is called after the browser has loaded the web page

  //add mouse down listener to our canvas object
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)
  //add listener to puzzle button
  document.getElementById('puzzle_button').addEventListener('click', handlePuzzleButton)
  //add listener to solve button with fetch
  document.getElementById('solve_button').addEventListener('click', handleSolveButton)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)

  timer = setInterval(handleTimer, 100)

  drawCanvas()
})