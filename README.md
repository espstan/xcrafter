# xcrafter
Проект маркетплейса по продаже handmade-товаров

[trello](https://trello.com/b/ithVxG0P/2019-03)

Запуск скрипта для виртуального окружения и бд:
файл send_mail.config поместить в ru.xcrafter/
из папки проекта(ru.xcrafter) source bin/init_mail_config.sh потом  source bin/init_venv_and_up_db.sh  потом source bin/init_and_fill_db.sh

Скрипт для запуска сервера с миграций БД (к примеру, если таблицы в БД былт удалены):

1 Запускаем виртуальное окружение и устанавливаем все зависимости: 

#####source bin/deploy_virtualenv.sh 

2 Инициализация БД:

#####python manage.py db init 

3 Миграция:

#####python manage.py db migrate -m '<Ваш комментарий к миграции>'

4 Запуск БД:

#####python manage.py db upgrade

5 Запуск сервера:

######python manage.py runserver

