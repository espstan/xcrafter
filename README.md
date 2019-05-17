# xcrafter
Проект маркетплейса по продаже handmade-товаров

[trello](https://trello.com/b/ithVxG0P/2019-03)

---

### Скрипт для запуска сервера с миграций БД 

Запускаем виртуальное окружение и устанавливаем все зависимости: 

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

