// const line = document.querySelectorAll('ul#badassQuotes li');
const ul = document.querySelector('#badassQuotes');
const checkButton = document.querySelector('button');
const feedbackArray = document.querySelectorAll('.feedback');

const maximusOriginal = ["My name is Maximus Decimus Meridius", "Commander of the armies of the north", "General of the Felix Legions", "Loyal to the true emperor, Marcus Aurelius", "Father to a murdered son", "Husband to a murdered wife", "And I will have my vengence, in this life or the next"];
const ozymendiasOriginal = ['I met a stranger from an antique land who said', 'Two vast and trunkless legs of stone stand in the desert', 'Near them, on the sand, half sunk, a shattered visage lies', 'Whose frown, and curled lip, and sneer of cold command', 'Tell that its sculptor well those passions read', 'The hand that mocked them and the heart that fed', 'And on the pedistal these words remain:', '"My name is Ozymendias, King of Kings, look upon my works ye Mighty, and Despair', 'Nothing beside remains', 'Round the decay of that collosal wreck', 'Boundless and bare', 'The lone and level sands strech far away'];

const quotes = [
  ['Maximus', maximusOriginal], ['Ozymendias', ozymendiasOriginal]
]

let selectedOriginal;
let selectedShuffle;

const setup = (() => {
  renderRadios();
  hideFeedback();
  selectedOriginal = quotes[0][1];
  selectedShuffle = durstenfeldShuffle([...selectedOriginal]);
  renderQuote(selectedShuffle);
})();

function renderRadios() {
  const $radioButtons = $('#radioButtons');
  for (let i = 0; i < quotes.length; i +=1) {
    let inputHTML;
    if (i === 0) {
      inputHTML = `<input type="radio" name="quote" value=${quotes[i][0]} checked>${quotes[i][0]}<br>`
    } else {
      inputHTML = `<input type="radio" name="quote" value=${quotes[i][0]}>${quotes[i][0]}<br>`
    }
    const $inputElement = $(inputHTML);
    $inputElement.on('click', (event) => {
      const clickedButtonName = $(event.target).val();
      for (let quote of quotes) {
        if (quote[0] === clickedButtonName) selectedOriginal = quote[1];
      }
      selectedShuffle = durstenfeldShuffle([...selectedOriginal]);
      renderQuote(selectedShuffle);
      hideFeedback();
    });
    $radioButtons.append($inputElement);    
  }
}

function  durstenfeldShuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const getCurrentOrder = () => {
  const quoteArray = [];
  for (let i = 0; i < ul.children.length; i+=1) {
    const text = ul.children[i].textContent.replace('UpDown', '');
    quoteArray.push(text);
  }
  return quoteArray;
};

function renderQuote(shuffledQuote) {
  while(ul.firstChild) ul.removeChild(ul.firstChild);
  for (let line in shuffledQuote) {
      const liElement = document.createElement('li');
      liElement.textContent = shuffledQuote[line]; //?
      const upButton = document.createElement('button');
      upButton.textContent = 'Up';
      upButton.className = 'upButton'
      const downButton = document.createElement('button');
      downButton.textContent = 'Down';
      downButton.className = 'downButton'
      ul.appendChild(liElement);
      liElement.appendChild(upButton);
      liElement.appendChild(downButton);    
  }
}

function compareArray(array1, array2) {
  for (let i = 0; i < array1.length; i +=1) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

function hideFeedback() {
  for (let i = 0; i < feedbackArray.length; i+=1) {
    feedbackArray[i].style.color = 'red';
    feedbackArray[i].style.display = 'none';
  }
}

checkButton.addEventListener('click', () => {
  const isCorrectOrder = compareArray(selectedOriginal, getCurrentOrder());
  if (isCorrectOrder) {
    feedbackArray[1].style.display = 'none';
    feedbackArray[0].style.display = 'block';
  } else {
    feedbackArray[0].style.display = 'none';
    feedbackArray[1].style.display = 'block';
  }
});

ul.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    if (event.target.className === 'upButton') {
      const parentLi = event.target.parentNode;
      const grandparentUl = parentLi.parentNode;
      const siblingLi = parentLi.previousElementSibling;
      grandparentUl.insertBefore(parentLi, siblingLi);
    }
    if (event.target.className === 'downButton') {
      const parentLi = event.target.parentNode;
      const grandparentUl = parentLi.parentNode;
      if (parentLi.nextElementSibling) {
        const nextLi = parentLi.nextElementSibling;
        grandparentUl.insertBefore(parentLi, parentLi.nextElementSibling.nextElementSibling);
      } else {
        grandparentUl.insertBefore(parentLi, grandparentUl.firstElementChild);
      }
    }  
  }
});



