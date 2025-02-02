# ToDoDo App

This project is a ToDo application built with SvelteKit and Firebase.

## Technologies Used

- **SvelteKit**: A framework for building Svelte applications.
- **Firebase**: A platform developed by Google for creating mobile and web applications.
  - **Firebase Authentication**: For user authentication.
  - **Firestore**: For storing and syncing data in real-time.
  - **Firebase Hosting**: For hosting the web application.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/Evgenii-Mishechkin/tododo.git
cd tododo

```

2. Create a .env file in the root directory and add your Firebase configuration:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
3. Install dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Building
To create a production version of your app:
```bash
npm run build
```
You can preview the production build with:
npm run preview

### README.md (Русский)


# Приложение ToDoDo

Этот проект представляет собой приложение для управления задачами, созданное с использованием SvelteKit и Firebase.

## Используемые технологии

- **SvelteKit**: Фреймворк для создания приложений на Svelte.
- **Firebase**: Платформа, разработанная Google для создания мобильных и веб-приложений.
  - **Firebase Authentication**: Для аутентификации пользователей.
  - **Firestore**: Для хранения и синхронизации данных в реальном времени.
  - **Firebase Hosting**: Для хостинга веб-приложения.

## Установка

### Предварительные требования

- Node.js (v14 или выше)
- npm (v6 или выше)

### Шаги

1. Клонируйте репозиторий:

```bash
git clone https://github.com/yourusername/tododo-app.git
cd tododo-app
```
2. Создайте файл .env в корневом каталоге и добавьте вашу конфигурацию Firebase:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
3.Установите зависимости:

```bash
npm install
```
4. Запустите сервер разработки:

```bash
npm run dev
# или запустите сервер и откройте приложение в новой вкладке браузера
npm run dev -- --open
```
Сборка
Для создания производственной версии вашего приложения:

```bash
npm run build
```
Вы можете просмотреть производственную сборку с помощью:
```bash
npm run preview
```
