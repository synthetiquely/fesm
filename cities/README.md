# Игра в города

## Описание

Напишите игру, в которой человек и компьютер по очереди называют города таким образом, чтобы название следующего города начиналось на последнюю букву предыдущего. Игра продолжается до тех пор, пока у одного из участников не закончатся варианты. Более подробные правила можно найти в [Википедии](<https://ru.wikipedia.org/wiki/Города_(игра)>).

Игра должна представлять собой веб-страницу с полем, в которое вводится название города — с клавиатуры или голосом. Для голосового ввода можно использовать, например, [Web Speech API](https://developer.mozilla.org/ru/docs/Web/API/Web_Speech_API). Названия городов можно сохранить заранее, запросить полным списком до начала игры или получать по одному в ходе игры. В комментариях к коду поясните, почему вы выбрали тот или иной способ.

Названные города нужно отмечать на карте: координаты можно получить с помощью [прямого геокодирования (пример)](https://tech.yandex.ru/maps/jsbox/2.0/geocode). Города не должны повторяться. В случае повтора должно появиться сообщение об этом. После завершения игры нужно показать списки городов, введённых человеком и компьютером, и подвести итог.

## Инструкция по установке

```shell
  # Склонируйте репозиторий
  git clone

  # Войдите в директорию игры
  cd fesm/cities

  # Установите зависимости с помощью yarn
  yarn
  # или с помощью npm
  npm install

  # Запустите приложение
  yarn start
  # или
  npm start
  # Перейдите в браузере по ссылке localhost:3000
```
