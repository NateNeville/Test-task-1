/* Массив с названиями месяцев */
const months = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

/* Коллекции для всех необходимых элементов DOM */
const monthYearFields = document.querySelectorAll('.month-year');
const datesContainers = document.querySelectorAll('.dates');
const prevMonthButtons = document.querySelectorAll('.prev-month');
const nextMonthButtons = document.querySelectorAll('.next-month');
const prevYearButtons = document.querySelectorAll('.prev-year');
const nextYearButtons = document.querySelectorAll('.next-year');
const monthSelectionLinks = document.querySelectorAll('.month-nav-link');

/* Функция для отрисовки календаря */
const renderCalendar = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth(); // (отсчет месяцев начинается с "0" (января))
	const currMonthFirstDateWeekDay = new Date(year, month, 0).getDay(); // день недели на первое число месяца (отсчет дней недели начинается с "0" (воскресенья))
	const currMonthLastDate = new Date(year, month + 1, 0).getDate(); // последнее число текущего месяца

	// Наполняем каждое поле для месяца и года данными
	monthYearFields.forEach((field) => {
		field.textContent = `${months[month]} ${year}`;
	});

	// Задаем начальную разметку для контейнеров, куда позже будем добавлять HTML элементы с датами
	datesContainers.forEach((container) => {
		container.innerHTML = '';
	});

	// Добавляем в разметку даты предыдущего месяца
	datesContainers.forEach((container) => {
		const prevMonthLastDate = new Date(year, month, 0).getDate(); // последнее число предыдущего месяца

		for (let i = currMonthFirstDateWeekDay; i > 0; i--) {
			const dayDiv = document.createElement('div');
			dayDiv.textContent = prevMonthLastDate - i + 1;
			dayDiv.classList.add('fade');

			container.appendChild(dayDiv);
		}
	});

	// Добавляем в разметку даты текущего месяца
	datesContainers.forEach((container) => {
		for (let i = 1; i <= currMonthLastDate; i++) {
			const dayDiv = document.createElement('div');
			dayDiv.textContent = i;

			container.appendChild(dayDiv);
		}
	});

	// Добавляем в разметку даты следующего месяца
	datesContainers.forEach((container) => {
		const nextMonthFirstDateWeekDay = 7 - new Date(year, month + 1, 0).getDay(); // день недели на первое число следующего месяца

		for (let i = 1; i <= nextMonthFirstDateWeekDay; i++) {
			const dayDiv = document.createElement('div');
			dayDiv.textContent = i;
			dayDiv.classList.add('fade');

			container.appendChild(dayDiv);
		}
	});
};

// Создаем переменную со значением необходимой даты и вызываем с ней функцию для отрисовки календаря
let currentDate = new Date(2021, 2, 1);

renderCalendar(currentDate);

/* Добавляем функционал для кнопок перехода к предыдущему месяцу */
prevMonthButtons.forEach((button) => {
	button.addEventListener('click', () => {
		currentDate.setMonth(currentDate.getMonth() - 1);
		renderCalendar(currentDate);
	});
});

/* Добавляем функционал для кнопок перехода к следующему месяцу */
nextMonthButtons.forEach((button) => {
	button.addEventListener('click', () => {
		currentDate.setMonth(currentDate.getMonth() + 1);
		renderCalendar(currentDate);
	});
});

/* Добавляем функционал для кнопок перехода к предыдущему году */
prevYearButtons.forEach((button) => {
	button.addEventListener('click', () => {
		currentDate.setFullYear(currentDate.getFullYear() - 1);
		renderCalendar(currentDate);
	});
});

/* Добавляем функционал для кнопок перехода к следующему году */
nextYearButtons.forEach((button) => {
	button.addEventListener('click', () => {
		currentDate.setFullYear(currentDate.getFullYear() + 1);
		renderCalendar(currentDate);
	});
});

/* Добавляем функционал для кнопок перехода к конкретно выбранному месяцу */
monthSelectionLinks.forEach((link) => {
	link.addEventListener('click', () => {
		// Находим в массиве с названиями месяцев индекс выбранного месяца
		const chosenMonth = months.findIndex((month) => month === link.textContent);

		currentDate.setMonth(chosenMonth);
		renderCalendar(currentDate);
	});
});

/* Добавляем функционал для смены цветовой темы */
const calendarsSection = document.querySelector('.calendars');
const colorThemeChangeButton = document.querySelector('.theme-change-btn');

colorThemeChangeButton.addEventListener('click', () => {
	calendarsSection.classList.toggle('dark');
	colorThemeChangeButton.classList.toggle('active');
});
