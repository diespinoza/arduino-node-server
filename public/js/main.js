//main.js file
const deleteBttns = document.querySelectorAll('.rm-animation');

Array.from(deleteBttns).forEach((element) => {
  element.addEventListener('click', deleteAnimation)
})

async function deleteAnimation(){
  //childnodes 1 and 3 extract the correct strings
  const aName = this.parentNode.childNodes[1].innerText;
  const aDelay = this.parentNode.childNodes[3].innerText;

  try{
    const response = await fetch('deleteAnimation', {
      method: 'delete',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        'animationD': aName,
        'delayD' : aDelay
      })
    })
    const data = await response.json()
    console.log(data)
    //not sure what this does
    location.reload()

  } catch(err) {
    console.log(err)
  }

}

