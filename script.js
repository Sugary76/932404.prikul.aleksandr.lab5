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
