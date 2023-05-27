let minValue = parseInt(prompt('Минимальное знание числа для игры','0')) || 0;
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100')) || 100;

if (isNaN(minValue)) {
    minValue = 0;
}

if (isNaN(maxValue)) {
    maxValue = 100;
}

minValue = (minValue < -999) ? -999 : (minValue > 999) ? 999 : minValue;
maxValue = (maxValue < -999) ? -999 : (maxValue > 999) ? 999 : maxValue;
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`; 
const num = answerNumber;
const text = numberToText(num);
answerField.innerText = `Вы загадали число ${text }?`

function numberToText(num) {
    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
  
    if (num === 0) {
      return 'ноль';
    }
  
    if (num < 0) {
      return 'минус ' + numberToText(Math.abs(num));
    }
  
    if (num < 20) {
      return units[num];
    }
  
    if (num < 100) {
      const tensText = tens[Math.floor(num / 10)];
      const unitsText = units[num % 10];
      return (tensText + ' ' + unitsText).trim();
    }
  
    if (num < 1000) {
      const hundredsText = hundreds[Math.floor(num / 100)];
      const remainderText = numberToText(num % 100);
      return (hundredsText + ' ' + remainderText).trim();
    }
  
    if (String(num).length <= 20) {
      return String(num);
    }
  
    return 'Число слишком большое для текстовой записи';
  }

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = parseInt(prompt('Минимальное значение числа для игры', '0'));
    maxValue = parseInt(prompt('Максимальное значение числа для игры', '100'));
    orderNumber = 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    gameRun = true;

    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${answerNumber}?`;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const answerPhrase = `Не могу определить число!\n\u{1F914}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            const phraseRandom = Math.floor(Math.random() * 3); // Генерируем случайное число от 0 до 2
            let answerPhrase = '';

            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Легко! Это число ${answerNumber}?`;
                    break;
                case 1:
                    answerPhrase = `Может быть, число ${answerNumber}?`;
                    break;
                case 2:
                    answerPhrase = `Думаю, это число ${answerNumber}.`;
                    break;
            }

            answerField.innerText = answerPhrase;
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            const phraseRandom = Math.floor(Math.random() * 3); 
            let answerPhrase = '';

            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Наверное, это число ${answerNumber}?`;
                    break;
                case 1:
                    answerPhrase = `Уверен, это число ${answerNumber}?`;
                    break;
                case 2:
                    answerPhrase = `Скорее всего, это число ${answerNumber}.`;
                    break;
            }

            answerField.innerText = answerPhrase;
        }
    }
});


document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        const phraseRandom = Math.floor(Math.random() * 3);
        let answerPhrase = '';

        switch (phraseRandom) {
            case 0:
                answerPhrase = `Я всегда угадываю! Твое число - ${numberToText(answerNumber)}\n\u{1F60E}`;
                break;
            case 1:
                answerPhrase = `Это было просто! Загаданное число - ${numberToText(answerNumber)}\n\u{1F643}`;
                break;
            case 2:
                answerPhrase = `Мне несложно! Ответ - ${numberToText(answerNumber)}.\u{1F601}`;
                break;
        }

        answerField.innerText = answerPhrase;
        gameRun = false;
    }
});


