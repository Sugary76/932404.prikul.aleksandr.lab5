let userName = prompt("Введите имя");

if (userName === null || userName.trim() === "") {
    userName = "Анонимный пользователь";
}

alert("Здравствуй, " + userName + "!");

console.log("Скрипт запущен. Пользователь: ", userName);

const gameHours = [11, 2, 12, 3, 9, 1];

function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function popGamesFilter(arr, limit) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > limit) {
            result.push(arr[i]);
        }
    }
    return result;
}

function getSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function lightGamesCount(arr, limit) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= limit) {
            count++;
        }
    }
    return count;
}

const totalHours = getSum(gameHours);
const maxHours = findMax(gameHours);
const popGames = popGamesFilter(gameHours, 10);
const popHours = getSum(popGames);
const lightGames = lightGamesCount(gameHours, 3);
const lightGamesShare = (lightGames / gameHours.length) * 100;

alert("Вы провели " + totalHours + " часов в играх, из них " + popHours + " часов – в самых популярных");

console.log("Всего часов в играх за неделю: ", totalHours);
console.log("Максимум в одной игре: ", maxHours);
console.log("Часы в играх со временем более 10 часов: ", popGames.join(", "));
console.log("Количество коротких игровых сессий: ", lightGames);
console.log("Доля коротких игровых сессий: ", lightGamesShare + "%");

if (totalHours > 25) {
    console.log("Возможно, стоит сбалансировать время между играми и учёбой");
}

const GAMES_KEY = "gamesList";
const THEME_KEY = "siteTheme";

function getElementByIdSafe(id) {
    const element = document.getElementById(id); 
    if (element === null) {
        console.error("Элемент не найден: #" + id);
    }
    return element;
}

function reportError(message) {
    alert(message);
    console.error(message);
}

const defaultGames = [
    { title: "Cyberpunk 2077", genre: "Action/RPG", rating: 5 },
    { title: "The Witcher 3: Wild Hunt", genre: "RPG", rating: 5 },
    { title: "Dead By Daylight", genre: "Survival Horror", rating: 4 }
];

function createGameCard(game) {
    const card = document.createElement("article");
    card.className = "game-card";

    const title = document.createElement("h3");
    title.textContent = game.title;

    const genre = document.createElement("p");
    genre.className = "game-genre";
    genre.textContent = game.genre;

    const rating = document.createElement("p");
    rating.className = "game-rating";
    rating.setAttribute("data-rating", game.rating);
    rating.textContent = game.rating+"/5";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Удалить";
    deleteBtn.addEventListener("click", function () {
        card.remove();
        saveGamesToStorage();
        updateCounter();
    });

    card.append(title, genre, rating, deleteBtn);
    return card;
}

function updateCounter() {
    const counter = getElementByIdSafe("games-counter");
    if (counter === null) {
        return;
    }
    const cards = document.querySelectorAll(".game-card");
    counter.textContent = "Всего игр в списке: " + cards.length;
}

function saveGamesToStorage() {
    const cards = document.querySelectorAll(".game-card");
    const games = [];
    cards.forEach(function (card) {
        games.push({
            title: card.querySelector("h3").textContent,
            genre: card.querySelector(".game-genre").textContent,
            rating: Number(card.querySelector(".game-rating").getAttribute("data-rating"))
        });
    });
    localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}

function loadGamesFromStorage() {
    const raw = localStorage.getItem(GAMES_KEY);
    if (raw === null) {
        return defaultGames;
    }
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        console.error("Не удалось прочитать список игр: ожидался массив");
        return defaultGames;
    } catch (error) {
        console.error("Ошибка чтения данных из localStorage:", error);
        return defaultGames;
    }
}

function renderGames(games) {
    const container = getElementByIdSafe("games-container");
    if (container === null) {
        return;
    }
    container.textContent = "";
    games.forEach(function (game) {
        container.append(createGameCard(game));
    });
    updateCounter();
}

function addGame() {
    const container = getElementByIdSafe("games-container");
    if (container === null) {
        return;
    }

    const title = prompt("Введите название игры:");
    if (title === null || title.trim() === "") {
        reportError("Не удалось добавить игру: название пустое.");
        return;
    }

    const genre = prompt("Введите жанр игры:");
    if (genre === null || genre.trim() === "") {
        reportError("Не удалось добавить игру: жанр пустой.");
        return;
    }

    const ratingInput = prompt("Введите рейтинг от 1 до 5:");
    const rating = Number(ratingInput);
    if (ratingInput === null || ratingInput.trim() === "" ||
        Number.isNaN(rating) || !Number.isInteger(rating) || rating < 1 || rating > 5) {
        reportError("Не удалось добавить игру: рейтинг должен быть целым числом от 1 до 5.");
        return;
    }

    container.append(createGameCard({
        title: title.trim(),
        genre: genre.trim(),
        rating: rating
    }));
    saveGamesToStorage();
    updateCounter();
}

function removeLastGame() {
    const lastCard = document.querySelector("#games-container .game-card:last-child");
    if (lastCard === null) {
        reportError("Невозможно удалить: список игр уже пуст");
        return;
    }
    lastCard.remove();
    saveGamesToStorage();
    updateCounter();
}

function applyTheme(theme) {
    if (theme === "light") {
        document.body.setAttribute("data-theme", "light");
    } else {
        document.body.removeAttribute("data-theme");
    }
    const themeBtn = getElementByIdSafe("theme-toggle");
    if (themeBtn !== null) {
        themeBtn.textContent = (theme === "light") ? "Тёмная тема" : "Светлая тема";
    }
}

function toggleTheme() {
    const current = document.body.getAttribute("data-theme");
    const next = (current === "light") ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
}

function initToggleButtons() {
    const buttons = document.querySelectorAll(".toggle-content");
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const targetId = btn.getAttribute("data-target");
            const content = document.getElementById(targetId);
            if (content === null) {
                console.error("Не найден блок для кнопки: #" + targetId);
                return;
            }
            content.classList.toggle("hidden");
            btn.textContent = content.classList.contains("hidden") ? "Показать" : "Скрыть";
        });
    });
}

function init() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    applyTheme(savedTheme === "light" ? "light" : "dark");

    renderGames(loadGamesFromStorage());
    saveGamesToStorage();

    const addBtn = getElementByIdSafe("add-game");
    if (addBtn !== null) {
        addBtn.addEventListener("click", addGame);
    }

    const removeLastBtn = getElementByIdSafe("remove-last");
    if (removeLastBtn !== null) {
        removeLastBtn.addEventListener("click", removeLastGame);
    }

    const themeBtn = getElementByIdSafe("theme-toggle");
    if (themeBtn !== null) {
        themeBtn.addEventListener("click", toggleTheme);
    }

    initToggleButtons();
}

init();