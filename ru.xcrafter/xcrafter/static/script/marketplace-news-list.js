const News = [
  {
    id: 1,
    date: '2019-02-05',
    title: 'Требуется сотрудник!',
    flag: true,
    preview: 'Работа мечты! В интернет-магазине Xcrafter требуется консультант!',
    content: 'Если вы увлечены творчеством, рукоделие вдохновляет вас и вы умеете создавать ' +
      'уникальные вещи своими руками, то интернет-магазине Xcrafter станет для вас прекрасным местом, ' +
      'где вы сможете во многом реализовать себя.'
  },
  {
    id: 2,
    date: '2019-03-25',
    title: 'Расширение ассортимента!',
    flag: true,
    preview: 'В интернет-магазине Xcrafter появилась новая возможность добавления товара, теперь вы можете не только ' +
      'совершать покупки в Xcrsfter, но и выставить на продажу свои изделия ручной работы!',
    content: 'В интернет-магазине Xcrafter появилась новая возможность добавления товара, теперь вы можете не только ' +
      'совершать покупки в Xcrsfter, но и выставить на продажу свои изделия ручной работы! Необходимо только пройти ' +
      'регистрацию и проверку качества выставляемого вами товара.'
  },
  {
    id: 3,
    date: '2019-04-05',
    title: 'New 3',
    flag: false,
    preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
      'sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 4,
    date: '2018-12-05',
    title: 'Необыкновенные новогодние подарки!',
    flag: true,
    preview: 'Вдохновляйтесь атмосферой волшебства и покупайте необыкновенные новогодние подарки в интернет-магазине ' +
      'Xcrafter!',
    content: ' Вручение новогодних подарков-одно из самых долгожданных событий детства! И сколько бы лет с тех пор ' +
      'не прошло- ничего не изменилось.Интернет-магазине Xcrafter не только поможет Вам найти самые оригинальные подарки ' +
      'на Новый год для детей, друзей, пап и мам, коллег и возлюбленных, но и заразиться потрясающим новогодним настроением' +
      ' - ярким, волнительным и интригующим!'
  },
  {
    id: 5,
    date: '2019-04-25',
    title: 'New 5',
    flag: false,
    preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
      'sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 6,
    date: '2019-07-17',
    title: 'New 6',
    flag: false,
    preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
      'sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 7,
    date: '2019-11-21',
    title: 'New 7',
    flag: false,
    preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
      'sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 8,
    date: '2019-03-03',
    title: 'New 8',
    flag: false,
    preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. ',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
      'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
      'sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

Date.prototype.toShowFormatDate = function () {
  const month_names = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
  ];
  let day = this.getDate();
  let month_index = this.getMonth();
  let year = this.getFullYear();
  return "" + day + " " + month_names[month_index] + " " + year;
};

function SortByDate( a, b ) {
  if ( a.date > b.date ) {
    return -1;
  }
  if ( a.date < b.date ) {
    return 1;
  }
  return 0;
}


News.sort( SortByDate );
const marketplaceNews = document.getElementById( 'marketplace-news' );
newsList = '<ul>';
News.forEach( function ( item ) {
  if ( item.flag && item.title !== undefined && item.date !== undefined && item.content !== undefined ) {
    let showDate = new Date( item.date ).toShowFormatDate();
    let newTitle = '<h2>' + item.title + '</h2>';
    let newDate = '<p>' + showDate + '</p>';
    let newContent = '<p>' + item.content + '</p>';
    newsList += '<li>' + newTitle + ' ' + newDate + ' ' + newContent + '</li>';
  }
} );
newsList += '</ul>';
marketplaceNews.innerHTML = newsList;
