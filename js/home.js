var questionDiv = document.getElementById('question');
var answer = document.getElementById('answer');
var btn = document.getElementById('btn');
var modal = document.getElementById('modal');
var startBtn = document.getElementById('start');

var questionP = document.getElementById('q')
var ask = [
	{ 
        question: 'What is s the primary difference between process and thread?'
    },
	{ 
        question: 'List out different OOPS principles?'
    },
	{ 
		question: 'What is an abstract class?'
	},
    { 
        question: 'Distinguish between constructor and method'
    },
	{ 
		question: 'List out Layers of OSI Model'
	}
];
var score = document.getElementById('score');
var scoreNb = 0;
var number = 0;

var modalHeader = document.getElementById('modal-header');
var headerH2 = modalHeader.querySelector('h2');
var correction = document.getElementById('correction');

function startGame() {
	questionDiv.style.display = 'block';
	answer.style.display = 'block';
	btn.style.display = 'block';
	startBtn.style.display = 'none';
	questionP.innerHTML = ask[number].question;
	score.innerHTML = scoreNb;
}

function nextQuestion() {
	if(answer.value === ask[number].answer) {
		scoreNb++;
		number++;
		score.innerHTML = scoreNb;
		questionP.innerHTML = ask[number].question;
		answer.value = '';
	} else if(number === 2) {
		finalQuestion();
	} else {
		number++;
		questionP.innerHTML = ask[number].question;
		answer.value = '';
	}
}

function finalQuestion() {
	if(answer.value === 'Green') {
		scoreNb++;
		endGame();
	} else {
		endGame();
	}
}

function endGame() {
		modal.style.display = 'block';
		headerH2.innerHTML = 'Results';
		correction.innerHTML = 'You got ' + scoreNb + ' correct answers'; 
}

function resetGame() {
	modal.style.display = 'none';
	questionDiv.style.display = 'none';
	answer.style.display = 'none';
	btn.style.display = 'none';
	startBtn.style.display = 'block';
	answer.value = '';
	scoreNb = 0;
	number = 0;
}