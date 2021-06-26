import questions from './arrayTests.js';

const answersArray = ["", "", "", "", "", "", "", "", "", ""];
export const addAnswer = function () {
    const inputRadios = document.querySelectorAll('.question__form--variant');

    for (let i = 0, length = inputRadios.length; i < length; i++) {
        if (inputRadios[i].checked) {
            answersArray.splice(localStorage.getItem("question-index") - 1, 1, inputRadios[i].value);
            localStorage.setItem("answers", JSON.stringify(answersArray));
            // console.log(JSON.parse(answersArray));
            questionIndex++;
            break;
        }
    }
}

document.querySelector('.question__submit').addEventListener('click', addAnswer);
const questionRef = document.querySelector('.question');
export const makeQuestion = (section, questionIndex) => {
    questionRef.classList.remove('hidden-modal');
    const questionPath = questions[section - 1][questionIndex - 1];
    questionRef.querySelector('.question__title').textContent = questionPath.headlineOfQuestion;
    const formString = `<div class="question__form--label-wrapper">
                <input checked type="radio" class="question__form--variant" id="question__form--answer1" data-question-index="1" name="answer" value="1">
                <label class="question__form--label" for="question__form--answer1" id="question__form--label-1">${questionPath.answer1}</label>
            </div>
            <div class="question__form--label-wrapper">
                <input type="radio" class="question__form--variant" id="question__form--answer2" data-question-index="2" name="answer" value="2">
                <label class="question__form--label" for="question__form--answer2" id="question__form--label-2">${questionPath.answer2}</label>
            </div>
            <div class="question__form--label-wrapper">
                <input type="radio" class="question__form--variant" id="question__form--answer3" data-question-index="3" name="answer" value="3">
                <label class="question__form--label" for="question__form--answer3" id="question__form--label-3">${questionPath.answer3}</label>
            </div>
            <div class="question__form--label-wrapper">
                <input type="radio" class="question__form--variant" id="question__form--answer4" data-question-index="4" name="answer" value="4">
                <label class="question__form--label" id="question__form--label-4" for="question__form--answer4">${questionPath.answer4}</label>
            </div>`;
    questionRef.querySelector('.question__form').innerHTML = formString;
    document.querySelector('.question__counter').classList.remove('hidden-modal');
    document.querySelector('.question__counter').textContent = `${questionIndex}/${questions[section - 1].length}`;
};

export const onClickBtnArrow = (event) => {
    if (event.target.dataset.value === 'right') {
        if (+localStorage.getItem('question-index') === 10) {
            return
        }
        localStorage.setItem('question-index', +localStorage.getItem('question-index') + 1);
        return makeQuestion(+localStorage.getItem('test-type'), +localStorage.getItem('question-index'));
    }
    if (event.target.dataset.value === 'left') {
        if (+localStorage.getItem('question-index') === 1) {
            return
        }
        localStorage.setItem('question-index', +localStorage.getItem('question-index') - 1);
        return makeQuestion(+localStorage.getItem('test-type'), +localStorage.getItem('question-index'));
    }
};

export const onClickBtnSubmit = () => {
    if (+localStorage.getItem('question-index') === 10) {
        return
    }
    localStorage.setItem('question-index', +localStorage.getItem('question-index') + 1);
    return makeQuestion(+localStorage.getItem('test-type'), +localStorage.getItem('question-index'));

};

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}
export const Piechart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    this.draw = function () {
        let total_value = 0;
        let color_index = 0;
        for (const categ in this.options.data) {
            let val = this.options.data[categ];
            total_value += val;
        }

        let start_angle = 0;
        for (const categ in this.options.data) {
            let val = this.options.data[categ];
            const slice_angle = 2 * Math.PI * val / total_value;

            drawPieSlice(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                Math.min(this.canvas.width / 2, this.canvas.height / 2),
                start_angle,
                start_angle + slice_angle,
                this.colors[color_index % this.colors.length]
            );

            start_angle += slice_angle;
            color_index++;
        }

    }
}
export const checkFinal = () => {
    const answersArray = JSON.parse(localStorage.getItem('answers'));
    // const answersArray = ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3"];
    const testType = localStorage.getItem('test-type');
    const result = answersArray.reduce((acc, item, index) => {
        if (item === questions[testType - 1][index].rightAnswer) acc++;
        return acc;
    }, 0);
    document.querySelector('.results__percent--js').textContent = `${Math.round(result / questions[testType - 1].length*100)}`;
    document.querySelector('.question').classList.add('hidden-modal');
    document.querySelector('.results').classList.remove('hidden-modal');
    questionRef.classList.add('hidden-modal');

};

