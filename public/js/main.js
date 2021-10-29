//main.js file
const deleteBttns = document.querySelectorAll('.rm-animation');
const formDOM = document.querySelector('.animation-form');
const animationSelectDOM = document.querySelector('.animation-select');
const animationInputDOM = document.querySelector('.animation-delay');

Array.from(deleteBttns).forEach((element) => {
  element.addEventListener('click', deleteAnimation)
})

formDOM.addEventListener('submit', createAnimation);



// formDOM.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const name = animationSelectDOM;
//   const delay = animationInputDOM;

//   console.log(name.value);
//   console.log(delay.value);

// })



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


async function createAnimation(e){
  try{
    e.preventDefault();
    const name = animationSelectDOM;
    const delay = animationInputDOM;

    const response = await fetch('api/v1/animations', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        'name': name.value,
        'delay' : delay.value
      })
    })
    const data = await response.json()
    // do nothing with data, just reload the page
    // maybe check if the response was successful status
    // console.log(data)
    location.reload()

  } catch(error){
    console.log(error)
  }

}

