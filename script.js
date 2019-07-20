const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const restart = document.getElementById("restart");
const correctAnswers = document.getElementById("correctAnswers");
let count = 0;
const questionTime = 10;
const guageWidth = 150;
const guageunit = guageWidth / questionTime;
let TIMER;
let score =0;

let questions = [
	{
		question : "An entity is represented in an E-R model as a(n):",
		imgSrc : "pic.png",
		choiceA : "Arrow ",
		choiceB : "Dashed line ",
		choiceC : "Crow’s foot",
		correct : "B"
	},
	{
		question : "Which of the following is not an E-R model relationship?",
		imgSrc : "pic.png",
		choiceA : "Some-to-many",
		choiceB : "One-to-one",
		choiceC : "One-to-many",
		correct : "A"
	},
	{
		question : "Which of the following symbols represents a many-to-many relationship in an E-R model?",
		imgSrc : "pic.png",
		choiceA : "a straight line",
		choiceB : "a dashed line",
		choiceC : "crow’s foot at both ends",
		correct : "C"
	},
	{
		question : "Which of the following can contain repeating groups?",
		imgSrc : "pic.png",
		choiceA : " 1NF",
		choiceB : "unnormalized data",
		choiceC : "3NF",
		correct : "B"
	},
	
	{
		question : "Which of the following has no partial or transitive dependencies?",
		imgSrc : "pic.png",
		choiceA : "1NF",
		choiceB : "2NF",
		choiceC : "3NF",
		correct : "C"
	},
	
	{
		question : "Which of the following symbols represents a one-to-many relationship in an E-R model?",
		imgSrc : "pic.png",
		choiceA : "crow’s foot at one end",
		choiceB : "a dashed line",
		choiceC : "a straight line",
		correct : "A"
	},
	
	{
		question : " The unique identifier for a record is called the?",
		imgSrc : "pic.png",
		choiceA : "turn key ",
		choiceB : " foreign key ",
		choiceC : "primary key ",
		correct : "C"
	},
	
	{
		question : "Which of the following has no partial dependencies but can contain transitive dependencies?",
		imgSrc : "pic.png",
		choiceA : "1NF",
		choiceB : "2NF ",
		choiceC : "3NF",
		correct : "A"
	},
	
	{
		question : "A unique identifier for a data row that consists of more than one field is commonly called a?",
		imgSrc : "pic.png",
		choiceA : "foreign key ",
		choiceB : "primary plus key",
		choiceC : "composite primary key ",
		correct : "C"
	},
	
	{
		question : " Which of the following symbols represents an optional relationship in an E-R model?",
		imgSrc : "pic.png",
		choiceA : "a straight line",
		choiceB : "a dashed line",
		choiceC : "crow’s foot at both ends",
		correct : "B"
	},
	
	{
		question : " Which of the following, when used in an E-R model, indicates the need for an additional table?",
		imgSrc : "pic.png",
		choiceA : "one-to-one relationship ",
		choiceB : "one-to-many relationship",
		choiceC : "many-to-many relationship",
		correct : "C"
	},
	
	{
		question : "Which of the following represents a field in a table?",
		imgSrc : "pic.png",
		choiceA : "a column",
		choiceB : "a row",
		choiceC : "a record",
		correct : "A"
	},
	
	{
		question : "Which of the following defines a relationship in which data can have multiple occurrences in each entity?",
		imgSrc : "pic.png",
		choiceA : "one-to-one",
		choiceB : "one-to-many",
		choiceC : "many-to-many ",
		correct : "C"
	},
	{
		question : "Which of the following is used to join data contained in two or more tables?",
		imgSrc : "pic.png",
		choiceA : "common field",
		choiceB : "primary key",
		choiceC : "foreign key",
		correct : "C"
	},
	{
		question : "Which clause is required in a SELECT statement?",
		imgSrc : "pic.png",
		choiceA : "WHERE",
		choiceB : "FROM ",
		choiceC : "ORDER BY",
		correct : "B"
	},
	{
		question : "The default width of a VARCHAR2 field is:",
		imgSrc : "pic.png",
		choiceA : "30",
		choiceB : "None",
		choiceC : "255",
		correct : "B"
	},
	{
		question : "Which of the following characters can be used in a table name?",
		imgSrc : "pic.png",
		choiceA : "–",
		choiceB : "(",
		choiceC : "%",
		correct : "A"
	},
	{
		question : "Which of the following is a valid datatype?",
		imgSrc : "pic.png",
		choiceA : "CHAR3",
		choiceB : "VARCHAR4(3) ",
		choiceC : "NUMBER",
		correct : "C"
	},
	{
		question : "Which of the following is not a valid constraint type?",
		imgSrc : "pic.png",
		choiceA : "FOREIGN KEY",
		choiceB : "UNIQUE ",
		choiceC : "PRIMARY KEY",
		correct : "A"
	},
	{
		question : "Which of the following commands can you use to rename a constraint?",
		imgSrc : "pic.png",
		choiceA : "MOVE",
		choiceB : "ALTER CONSTRAINT ",
		choiceC : "None",
		correct : "A"
	}
	
	
	



];
let shuffledQuestions = shuffle(questions);
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const lastQuestion = questions.length - 1;
let runningQuestion = 0;

//renderQ

function renderQuestion(){
	 let q = shuffledQuestions[runningQuestion];
	 question.innerHTML = "<p>"+ q.question+ "</p>";
	 qImg.innerHTML = "<img src="+ q.imgSrc +">";
	 choiceA.innerHTML = q.choiceA;
	 choiceB.innerHTML = q.choiceB;
	 choiceC.innerHTML = q.choiceC;
	 
}



start.addEventListener("click", startQuiz);
restart.addEventListener("click", restartQuiz);

function startQuiz(){
start.style.display = "none";
renderQuestion();
quiz.style.display = "block";
//renderprogress();
renderCounter();
TIMER = setInterval(renderCounter,1000);
}
//render progress
function restartQuiz(){
	runningQuestion = 0;
	score = 0;
	count = 0;
	renderQuestion();
	
	
}
function renderProgress(){
	for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
		progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
	}
}
 
 


function renderCounter(){
	if(count <= questionTime){
		counter.innerHTML = count;
		timeGauge.style.width = count * guageunit + "px";
		count++
	}
	else{
		count = 0;
		if(runningQuestion < lastQuestion){
		runningQuestion++;
		renderQuestion();
	}
	else{
		clearInterval(TIMER);
		scoreRender();
	}
	}
}

function checkAnswer(answer){
	if (answer == questions[runningQuestion].correct){
		++score;
	}
	else{
		alert("You answered: "+answer+" Correct answer is: " + questions[runningQuestion].correct);
		
	}
	count=0;
	if(runningQuestion < lastQuestion){
		runningQuestion++;
		renderQuestion();
	}
	else{
		clearInterval(TIMER);
		scoreRender();
		restart.style.display = "none";
		correctAnswers.style.display = "block";
	}
	
	
	
}
function scoreRender(){
	scoreDiv.style.display = "block";
	const scorePercent = Math.round(100 * score /(questions.length));
	

	scoreDiv.innerHTML +="<p>"+scorePercent+"%</p>"
}


