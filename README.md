# Тестовое задание на позицию фронтенд разработчика

## В чём задача?

В рамках тестового задания требуется разработать пользовательский интерфейс для
отправки и получений сообщений WhatsApp с использованием технологии https://green-api.com/docs/api

Ожидаемый результат:

• Пользователь переходит на сайт чата и вводит свои учетные данные из
системы GREEN-API (idInstance, apiTokenInstance)

• Пользователь вводит номер телефона получателя и создает новый чат

• Пользователь пишет текстовое сообщение и отправляет его получателю в
WhatsApp

• Получатель отвечает на сообщение в мессенджере WhatsApp

• Пользователь видит ответ получателя в чате

## Какой стек?
React, Typescript, Redux 🙂

## Алгоритм работы
1. При вводе instanceId и apiTokenInstance отправляем запрос SetSettings с адресом нашего вебхука
2. Создаём комнату в ws (ключ = apiTokenInstance). В комнате содержатся чаты и сообщения в них
2. Создаём чат по номеру (запись в ws)
3. Отправляем сообщение по номеру (https://green-api.com/docs/api/chat-id/) (записываем в мапу с чатом)
4. При получении уведомления на сервер парсим тело запроса, включая имя контакта (если есть) (записывает в чат в ws)
5. Отправвляем по ws уведомление на фронт

## Инструкция по запуску
1. Клонируем репозиторий

git clone https://github.com/ponchik009/TZ-2023-06-05

2. Устанавливаем пакеты

npm install

3. Устанавливаем пакеты для вебхука

cd webhook

npm install

4. Запускаем вебхук на публичном адресе

node webhook.js (или node webhook/webhook.js - если находитесь в корне проекта)

5. В корне проекта создаём файл .env и заполняем по следующему шаблону:

REACT_APP_API_URL = <ссыла на апи green-api> (сейчас: https://api.green-api.com/)

REACT_APP_SOCKET_URL = <ссылка на публичный адрес, на котором запущен вебхук с протоколом ws> (у меня: wss://andromeda.oleg.ninja)

REACT_APP_WEBHOOK_URL = <ссылка на публичный адрес, на котором запущен вебхук с протоколом http> (у меня: https://andromeda.oleg.ninja)

6. Запускаем проект

npm start

## Скриншотики

![изображение](https://github.com/ponchik009/TZ-2023-06-05/assets/98012969/5d16bf88-1292-4b14-8b26-4e3b1dfab275)

![изображение](https://github.com/ponchik009/TZ-2023-06-05/assets/98012969/9ddd334f-c709-42a1-86de-58502c8245ab)

![изображение](https://github.com/ponchik009/TZ-2023-06-05/assets/98012969/bb9a02bd-ecfc-4947-b708-605341a9f32e)

![изображение](https://github.com/ponchik009/TZ-2023-06-05/assets/98012969/edb5616e-e75b-4f3b-8209-70c1659e3f6e)

