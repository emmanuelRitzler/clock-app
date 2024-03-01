function error() {
    console.error(error);
}

async function fetchQuote() {
    try {
    const response = await fetch("https://api.quotable.io/quotes/random");
    const result = await response.json();
    const quote = document.querySelector('#quote');
    const author = document.querySelector('#author');
    quoteArray = result.content;
    quote.innerHTML = `"${result[0].content}"`;
    author.innerHTML = result[0].author;
    }
    catch {
        error();
    }
}
fetchQuote();

async function fetchTime() {
    try {
        const response = await fetch("http://worldtimeapi.org/api/ip");
        const result = await response.json();
        const datetime = result.datetime;
        const dateObject = new Date(datetime);
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();

        let displayTime = '';

        if (minutes < 10) {
            displayTime = `${hours}:0${minutes}`;
        }
        else {
            displayTime = `${hours}:${minutes}`;
        }

        const time = document.querySelector('#actual-time');
        time.innerHTML = displayTime;
    } catch (error) {
        error();
    }
}
fetchTime();

async function getMessage() {
    try {
        const response = await fetch("http://worldtimeapi.org/api/ip");
        const result = await response.json();
        const datetime = result.datetime;
        const dateObject = new Date(datetime);
        const hours = dateObject.getHours();

        let message = '';

        if (hours >= 5 && hours < 12) {
            message = `Good Morning, it's currently`;
        }
        else if (hours >= 12 && hours < 18) {
            message = `Good Afternoon, it's currently`;
        }
        else {
            message = `Good Evening, it's currently`;
        }

        const greeting = document.querySelector('#greeting-message');
        greeting.innerHTML = message;

        const timezone = document.querySelector('#actual-zone');
        timezone.innerHTML = result.abbreviation;
    }
    catch (error) {
        error();
    }
}
getMessage();

async function changeBackgroundImage() {
    const response = await fetch("http://worldtimeapi.org/api/ip");
    const result = await response.json();
    const datetime = result.datetime;
    const dateObject = new Date(datetime);
    const hours = dateObject.getHours();
    const backgroundImg = document.body;

    if (hours >= 6 && hours < 18) {
        backgroundImg.style.backgroundImage = 'url(assets/desktop/bg-image-daytime.jpg)';
    }
    else if (hours >= 18 && hours < 24) {
        backgroundImg.style.backgroundImage = 'url(assets/desktop/bg-image-nighttime.jpg)';
    }
    else if (hours >= 0 && hours < 6) {
        backgroundImg.style.backgroundImage = 'url(assets/desktop/bg-image-nighttime.jpg)';
    }
    else {
        error();
    }
}
changeBackgroundImage();

async function changeIcon() {
    const response = await fetch("http://worldtimeapi.org/api/ip");
    const result = await response.json();
    const datetime = result.datetime;
    const dateObject = new Date(datetime);
    const hours = dateObject.getHours();
    const icon = document.querySelector('#icon');
    let image = icon.getAttribute('src');

    if (hours < 18) {
        image = 'assets/desktop/icon-sun.svg';
    }
    else if (hours >= 18 && hours < 24) {
        image = 'assets/desktop/icon-moon.svg';
    }
    else {
        error();
    }
    icon.setAttribute('src', image);
}
changeIcon();

async function fetchLocation() {
    const response = await fetch('https://api.ipbase.com/v2/info?apikey=ipb_live_M9R8yrIzgXjESBOsKDq2yoEjUcWMY7fXxRJKhsMa&ip=');
    const result = await response.json();
    const city = result.data.location.city.name_translated;
    const country = result.data.location.country.name_translated;
    const cityCountry = `In ${city}, ${country}`;
    const locationText = document.querySelector('#city');
    locationText.innerHTML = cityCountry;
}
fetchLocation();

// EVENT FOR CHANGING QUOTE

const refreshArrow = document.querySelector('#refresh-arrow');

refreshArrow.addEventListener('click', event => {
    event.preventDefault;

    async function changeQuote() {
        try {
            const response = await fetch("https://api.quotable.io/quotes/random");
            const result = await response.json();
            const quote = document.querySelector('#quote');
            const author = document.querySelector('#author');
            quoteArray = result.content;
            quote.innerHTML = `"${result[0].content}"`;
            author.innerHTML = result[0].author;
        }
        catch {
            error();
        }
    }
    changeQuote();
});

// MENU FOR MORE DATA
let isMoved = false;

const arrow = document.querySelector('#arrow-down-container');
arrow.addEventListener('click', event => {
    event.preventDefault;

    if (!isMoved) {
        function removeQuote() {
            const quote = document.querySelector('#quote');
            const author = document.querySelector('#author');
            const arrow = document.querySelector('#refresh-arrow');
    
            quote.style.display = 'none';
            author.style.display = 'none';
            arrow.style.display = 'none';
        }
        removeQuote();
    
        function changeTextButton() {
            const textButton = document.querySelector('#button-text');
            textButton.innerHTML = 'LESS';
        }
        changeTextButton();
    
        function changeArrowButton() {
            const arrowButton = document.querySelector('#arrow-down');
            arrowButton.setAttribute('src', 'assets/desktop/icon-arrow-up.svg');
        }
        changeArrowButton();
    
        function moveUpTime() {
            const time = document.querySelector('#actual-time');
            time.style.gridRow = '2 / 4';
        }
        moveUpTime();
    
        function moveUpLocation() {
            const location = document.querySelector('.location');
            location.style.gridRow = '4 / 6';
        }
        moveUpLocation();
    
        function moveUpWelcomeText() {
            const welcomeText = document.querySelector('.welcome-text');
            welcomeText.style.gridRow = '2 / 3'; 
        }
        moveUpWelcomeText();
    
        function moveUpZone() {
            const zone = document.querySelector('#actual-zone');
            zone.style.gridRow = '4 / 5';
        }
        moveUpZone();
    
        function moveUpButton() {
            const button = document.querySelector('.button');
            button.style.gridRow = '4 / 6';
        }
        moveUpButton();

        const greyContainer = document.querySelector('#grey-container');
        greyContainer.style.display = 'flex';

        isMoved = true;
    }
    else {
        function removeQuote() {
            const quote = document.querySelector('#quote');
            const author = document.querySelector('#author');
            const arrow = document.querySelector('#refresh-arrow');
    
            quote.style.display = '';
            author.style.display = '';
            arrow.style.display = '';
        }
        removeQuote();
    
        function changeTextButton() {
            const textButton = document.querySelector('#button-text');
            textButton.innerHTML = 'MORE';
        }
        changeTextButton();
    
        function changeArrowButton() {
            const arrowButton = document.querySelector('#arrow-down');
            arrowButton.setAttribute('src', 'assets/desktop/icon-arrow-down.svg');
        }
        changeArrowButton();
    
        function moveDownTime() {
            const time = document.querySelector('#actual-time');
            time.style.gridRow = '7 / 9';
        }
        moveDownTime();
    
        function moveDownLocation() {
            const location = document.querySelector('.location');
            location.style.gridRow = '10 / 11';
        }
        moveDownLocation();
    
        function moveDownWelcomeText() {
            const welcomeText = document.querySelector('.welcome-text');
            welcomeText.style.gridRow = '7 / 8'; 
        }
        moveDownWelcomeText();
    
        function moveDownZone() {
            const zone = document.querySelector('#actual-zone');
            zone.style.gridRow = '9 / 10';
        }
        moveDownZone();
    
        function moveDownButton() {
            const button = document.querySelector('.button');
            button.style.gridRow = '10 / 11';
        }
        moveDownButton();

        const greyContainer = document.querySelector('#grey-container');
        greyContainer.style.display = 'none';

        isMoved = false;
    }
})

// FETCHING DATA FOR GREY CONTAINER

async function fetchCurrentTime() {
    const response = await fetch("http://worldtimeapi.org/api/ip")
    const result = await response.json();
    const timezone = result.timezone;

    const timeZoneText = document.querySelector('#timezone-text');
    timeZoneText.innerHTML = timezone;
}
fetchCurrentTime();

async function fetchDayWeek() {
    const response = await fetch("http://worldtimeapi.org/api/ip")
    const result = await response.json();
    const weekDay = result.day_of_week;

    const weekDayNumber = document.querySelector('#weekday-number');
    weekDayNumber.innerHTML = weekDay;
}
fetchDayWeek();

async function fetchDayYear() {
    const response = await fetch("http://worldtimeapi.org/api/ip")
    const result = await response.json();
    const yearDay = result.day_of_year;

    const yearDayNumber = document.querySelector('#yearday-number');
    yearDayNumber.innerHTML = yearDay;
}
fetchDayYear();

async function fetchWeekNumber() {
    const response = await fetch("http://worldtimeapi.org/api/ip")
    const result = await response.json();
    const week = result.week_number;

    const weekNumber = document.querySelector('#week');
    weekNumber.innerHTML = week;
}
fetchWeekNumber();
