# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## START PROJECT

git clone https://github.com/yungalesgerov/githubSearc.git

npm install

npm run dev

## PROJECT DESCRIPTION

Приложение с использованием технологий - Vite, Typescript, React, GraphQL

Составляющие :

1. Главная страница – список репозиториев с возможностью поиска и страницами
2. Карточка репозитория – страница с детальной информацией по репозиторию

## Главная страница

Ключевые элементы страницы:

- `Поле для поиска` репозиториев
- `Список репозиториев`
- `Paginator` – список страниц

При введении текста в `Поле для поиска`, должен происходить поиск по названию среди всех репозиториев Github и выводиться его результат в `Список репозиториев` ниже.

Если в поле ничего не введено, то показывается список репозиториев текущего пользователя.

Примерная структура элементов списка:

`[Название репозитория]` - `[кол-во звёзд на github]` - `[дата последнего коммита]` - `[ссылка на Github]`

Внизу страницы есть `Paginator` вида [1, 2, 3, 4, 5]. Не показывать больше 10 страниц.

При клике на вторую страницу показываются репозитории с 11 по 20. При клике на третью страницу показываются репозитории с 21 по 30 … и т.д.

Выбранная страница в `Paginator` должна отличаться по стилю от всех остальных.

При перезагрузке страницы состояние выбранных фильтров (поиска и страницы) должно сохраняться и использоваться для первоначального запроса.

Поиск должен происходить на стороне API.

При клике на название репозитория происходит переход на `Карточку репозитория`.

## **Карточка репозитория**

Карточка должна иметь следующую структуру:

- [`Название репозитория`] - [`кол-во звёзд на github`] - [`дата последнего коммита`]
- [`Фото владельца репозитория, если есть`] - [`Nickname владельца репозитория с ссылкой на него`]
- [`Список используемых языков в репозитории`]
- [`Краткое описание репозитория`]

## Требования :

- Основные технологии - Vite, Typescript, React, GraphQL
- Архитектура приложения должна соответствовать FSD
- Использовать стейт-менеджер на выбор: zustand / effector (желательно). Данные должны храниться в стейт-менеджере.
- Готовые UI библиотеки использовать нельзя, все нужно сверстать самостоятельно
- Структура приложения должна быть с расчетом на будущий рост
