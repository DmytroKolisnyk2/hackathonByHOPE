import * as functions from "./functions.js";

document.querySelector(".content__reset").addEventListener("click", functions.drawTable);
const refs = {};
window.localStorage.setItem("volume", window.localStorage.getItem("volume") || 1);
window.localStorage.setItem("bg", window.localStorage.getItem("bg") || 1);
refs.volume = +window.localStorage.getItem("volume");
document.querySelector(".main").style.backgroundImage = `url(./img/bg${localStorage.getItem("bg")}.jpg)`;
document.querySelector(".start__btn").addEventListener("click", () => {
    document.querySelector('.wrapper__header__test_it').classList.remove('hidden-modal');
    document.querySelector('.menu').classList.remove('hidden-modal');
    document.querySelector('.start').classList.add('hidden-modal');

});
const keyCloseModal = (event) => {
    if (event.code === "Escape") {
        document.querySelector(".backdrop_authors_modal").classList.add("hidden-modal");
        window.removeEventListener("keydown", keyCloseModal);
    }
};
const keyCloseModal3 = (event) => {
    if (event.code === "Escape") {
        document.querySelector(".backdrop_settings_modal").classList.add("hidden-modal");
        window.removeEventListener("keydown", keyCloseModal3);
    }
};
const backDropCloseModal = (event) => {
    if (event.target === event.currentTarget) {
        event.currentTarget.classList.add("hidden-modal");
    }
};

document.querySelectorAll(".settings_btn--js").forEach((btn) =>
    btn.addEventListener("click", () => {
        // if (!document.querySelector(".start").classList.contains("hidden-modal")) document.querySelector(".audio__main-theme").play();
        window.addEventListener("keydown", keyCloseModal3);
        document.querySelector(".backdrop_settings_modal").classList.remove("hidden-modal");
    })
);
document.querySelectorAll(".close-btn--js").forEach((element) => {
    element.addEventListener("click", (event) => document.querySelector(`#${event.currentTarget.dataset.modal}`).classList.add("hidden-modal"));
});
document.querySelector(".backdrop_settings_modal").addEventListener("click", backDropCloseModal);

document.querySelectorAll(".start__author--js").forEach((btn) =>
    btn.addEventListener("click", () => {
        document.querySelector(".backdrop_authors_modal").classList.remove("hidden-modal");
        window.addEventListener("keydown", keyCloseModal);
        // document.querySelector(".audio__main-theme").play();
    })
);

document.querySelector(".backdrop_authors_modal").addEventListener("click", backDropCloseModal);

document.querySelector(".start__author").addEventListener("click", (event) => {
    document.querySelector(".authors-modal").classList.remove("hidden-modal");
    // document.querySelector(".audio__main-theme").play();
});
document.querySelector(".settings-modal__audio-range").value = refs.volume * 20;
if (refs.volume === 0) {
    document.querySelector("#mute").classList.remove("hidden-modal");
    document.querySelector("#high").classList.add("hidden-modal");
}
document.querySelector(".settings-modal__background-wrapper").children[+window.localStorage.getItem("bg") - 1].classList.add("settings-modal__background--active");
// [...document.querySelector(".audio").children].forEach((audio) => (audio.volume = +audio.dataset.volume * refs.volume));
document.querySelector(".settings-modal__audio-range").addEventListener("input", (event) => {
    window.localStorage.setItem("volume", event.target.value / 20);
    if (+event.target.value === 0) {
        event.target.parentNode.querySelector("#mute").classList.remove("hidden-modal");
        event.target.parentNode.querySelector("#high").classList.add("hidden-modal");
    } else {
        event.target.parentNode.querySelector("#high").classList.remove("hidden-modal");
        event.target.parentNode.querySelector("#mute").classList.add("hidden-modal");
    }
    [...document.querySelector(".audio").children].forEach((audio) => (audio.volume = (+audio.dataset.volume * event.target.value) / 20));
});
document.querySelector(".settings-modal__background-wrapper").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) return;
    window.localStorage.setItem("bg", event.target.dataset.bg);
    event.target.parentNode.querySelector(".settings-modal__background--active").classList.remove("settings-modal__background--active");
    event.target.classList.add("settings-modal__background--active");
    document.querySelector(".main").style.backgroundImage = `url(./img/bg${event.target.dataset.bg}.jpg)`;
});
document.querySelector('.menu__test-selection-wrapper').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) return;
    document.querySelector('.menu').classList.add('hidden-modal');
    functions.makeQuestion(+event.target.dataset.section, 1);
    localStorage.setItem('question-index', 1);
    localStorage.setItem('test-type', +event.target.dataset.section);
});

document.querySelectorAll('.question__btn--arrow').forEach(item => {
    item.addEventListener('click', functions.onClickBtnArrow);
});

document.querySelector('.question__submit').addEventListener('click', functions.onClickBtnSubmit);

const myCanvas = document.getElementById("diagram");
myCanvas.width = 300;
myCanvas.height = 300;

const ctx = myCanvas.getContext("2d");



const myAnswers = {
    "right answers": 3,
    "wrong answers": 7,
};

const myDougnutChart = new functions.Piechart(
    {
        canvas: diagram,
        data: myAnswers,
        colors: ["#2b2e4a", "#e84545"],
        doughnutHoleSize: 0.5
    }
);
myDougnutChart.draw()
document.querySelector('.question__btn--finish').addEventListener('click', functions.checkFinal);
document.querySelector('.results_btn_menu--restart').addEventListener('click', () => {
    document.querySelector('.results').classList.add('hidden-modal');
    functions.makeQuestion(localStorage.getItem('test-type'), 1);
    localStorage.setItem('question-index', 1);
});
document.querySelector('.results_btn_menu--menu').addEventListener('click', () => {
    document.querySelector('.results').classList.add('hidden-modal');
    document.querySelector('.menu').classList.remove('hidden-modal');
});
