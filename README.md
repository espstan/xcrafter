# xcrafter
Проект маркетплейса по продаже handmade-товаров

[trello](https://trello.com/b/ithVxG0P/2019-03)

---

### Скрипт для запуска сервера с миграций БД 

Перед инициализацией, миграцией и запуска БД (команды manage.py).  
**Обязательно нужно развернуть и активировать виртуальное окружение.**

Запускаем и активируем виртуальное окружение, устанавливаем все зависимости: 
```sh
source bin/deploy_virtualenv.sh
``` 

Инициализация БД:
```sh
python manage.py db init
```
Миграция:
```sh
python manage.py db migrate -m '<Ваш комментарий к миграции>'
```
Запуск БД:
```sh
python manage.py db upgrade
```
Запуск сервера:
```sh
python manage.py runserver
```

---

### Скрипт для запуска и активации виртуального окружения 

**virtualenv**

```sh
source bin/deploy_virtualenv.sh
``` 

---

### Скрипт для активации режима 'Next version mode'

**Запуск режима 'Next version'**

Для активации режима 'Next version mode', надо в браузере перейти по ссылке:

```sh
/cookie-next-version-mode-on
```

### Скрипт для деактивации режима 'Next version mode'

**Выход из режима 'Next version'**

Для деактивации режима 'Next version mode', надо в браузере перейти по ссылке:

```sh
/cookie-next-version-mode-remove
```
