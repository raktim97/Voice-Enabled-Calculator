const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('.btn');
const operators = document.querySelectorAll('.operator');
const btnEqual = document.getElementById('btn-equal');
const btnAc = document.getElementById('btn-ac');
const btnDel = document.getElementById('btn-del');
const btnVoice = document.getElementById('voice-button');

// This is the code for Voice mode of the calculator
let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.lang = 'en-US';
recognition.maxResults = 10;
recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    const calculation = parseTranscript(transcript);
    display.value = calculation;
};

btnVoice.addEventListener('click', () => {
    recognition.start();
});

function parseTranscript(transcript) {
    const numbers = transcript.match(/\d+/g);
    const operator = transcript.match(/[+\-*/]/g);
    if (numbers && operator) {
        const num1 = parseInt(numbers[0]);
        const num2 = parseInt(numbers[1]);
        const op = operator[0];
        switch (op) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return 'Invalid operator';
        }
    } else {
        return 'Invalid input';
    }
}
// This is the code for normal calculator
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentValue = display.value;
    const newValue = currentValue + button.dataset.value;
    display.value = newValue;
    display.focus();
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    const currentValue = display.value;
    const newValue = currentValue + operator.dataset.operator;
    display.value = newValue;
    display.focus();
  });
});

btnEqual.addEventListener('click', evaluateExpression);

btnAc.addEventListener('click', () => {
  display.value = '';
  display.focus();
});

display.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    evaluateExpression();
  }
});

btnDel.addEventListener('click', () => {
  const currentValue = display.value;
  const newValue = currentValue.slice(0, -1);
  display.value = newValue;
  display.focus();
});

function evaluateExpression() {
  const expression = display.value;
  const validChars = /^[\d+\-*\/\. ()]+$/;

  if (validChars.test(expression)) {
    try {
      const result = eval(expression);
      display.value = result.toString();
    } catch (error) {
      display.value = 'Error: Invalid expression';
    }
  } else {
    display.value = 'Error: Invalid characters';
  }
}
