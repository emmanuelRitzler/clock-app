// ERROR HANDLING

function error() {
    console.error(error);
}

// FETCHING DATA

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
        const response = await fetch("https://worldtimeapi.org/api/ip");
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
        const response = await fetch("https://worldtimeapi.org/api/ip");
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

        if (hours >= 0 && hours < 5 && window.innerWidth < 471) {
            message = `Good Evening`;
        }
        else if (hours >= 5 && hours < 12 && window.innerWidth < 471) {
            message = `Good Morning`;
        }
        else if (hours >= 12 && hours < 18 && window.innerWidth < 471) {
            message = `Good Afternoon`;
        }
        else if (hours >= 18 && hours < 24 && window.innerWidth < 471) {
            message = `Good Evening`;
        }
        else {
            error();
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
    const response = await fetch("https://worldtimeapi.org/api/ip");
    const result = await response.json();
    const datetime = result.datetime;
    const dateObject = new Date(datetime);
    const hours = dateObject.getHours();
    const backgroundImg = document.body;

    if (hours >= 6 && hours < 18) {
        backgroundImg.style.backgroundImage = 'url(starter-code/assets/desktop/bg-image-daytime.jpg)';
    }
    else if (hours >= 18 && hours < 24) {
        backgroundImg.style.backgroundImage = 'url(starter-code/assets/desktop/bg-image-nighttime.jpg)';
    }
    else if (hours >= 0 && hours < 6) {
        backgroundImg.style.backgroundImage = 'url(starter-code/assets/desktop/bg-image-nighttime.jpg)';
    }
    else {
        error();
    }
}
changeBackgroundImage();

async function changeColorContainer() {
    const response = await fetch("https://worldtimeapi.org/api/ip");
    const result = await response.json();
    const datetime = result.datetime;
    const dateObject = new Date(datetime);
    const hours = dateObject.getHours();
    const containerColor = document.querySelector('#grey-container');

    if (hours >= 6 && hours < 18) {
        containerColor.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
        containerColor.style.color = 'rgb(0, 0, 0)'
    }
    else if (hours >= 18 && hours < 24) {
        containerColor.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        containerColor.style.color = 'rgb(255, 255, 255)'
    }
    else if (hours >= 0 && hours < 6) {
        containerColor.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        containerColor.style.color = 'rgb(255, 255, 255)'
    }
    else {
        error();
    }
}
changeColorContainer();

async function changeIcon() {
    const response = await fetch("https://worldtimeapi.org/api/ip");
    const result = await response.json();
    const datetime = result.datetime;
    const dateObject = new Date(datetime);
    const hours = dateObject.getHours();
    const icon = document.querySelector('#icon');
    let image = icon.getAttribute('src');

    if (hours < 18) {
        image = 'starter-code/assets/desktop/icon-sun.svg';
    }
    else if (hours >= 18 && hours < 24) {
        image = 'starter-code/assets/desktop/icon-moon.svg';
    }
    else {
        error();
    }
    icon.setAttribute('src', image);
}
changeIcon();

async function fetchLocation() {
    const response = await fetch('http://ip-api.com/json/');
    const result = await response.json();
    console.log(result);
    const city = result.city;
    const country = result.country;
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
            arrowButton.setAttribute('src', 'starter-code/assets/desktop/icon-arrow-up.svg');
        }
        changeArrowButton();
    
        function moveUpTime() {
            const time = document.querySelector('.time-and-zone');
            if (window.innerWidth > 471 && window.innerWidth < 845) {
                time.style.gridRow = '3 / 6'
            } 
            else if (window.innerWidth <= 470) {
                time.style.gridRow = '3 / 4'
            }
            else {
                time.style.gridRow = '2 / 4';
            }
        }
        moveUpTime();
    
        function moveUpLocation() {
            const location = document.querySelector('#city');
            if (window.innerWidth > 471 && window.innerWidth < 845) {
                location.style.gridRow = '9 / 10';
            } else {
                location.style.gridRow = '2 / 4';
            }
        }
        moveUpLocation();
    
        function moveUpWelcomeText() {
            const welcomeText = document.querySelector('.welcome-text');
            if (window.innerWidth > 471 && window.innerWidth < 845) {
                welcomeText.style.gridRow = '3 / 4'
            }
            else if (window.innerWidth <= 470) {
                welcomeText.style.gridRow = '4 / 5';
            } 
            else {
                welcomeText.style.gridRow = '2 / 3'; 
            }
        }
        moveUpWelcomeText();
    
        function moveUpZone() {
            const zone = document.querySelector('#actual-zone');
            zone.style.gridRow = '4 / 5';
        }
        moveUpZone();
    
        function moveUpButton() {
            const button = document.querySelector('.button-and-loc');
            if (window.innerWidth > 471 && window.innerWidth < 845) {
                button.style.gridRow = '6 / 8'
            }
            else if (window.innerWidth <= 470) {
                button.style.gridRow = '7 / 8';
            } 
            else {
                button.style.gridRow = '4 / 6';
            }
        }
        moveUpButton();

        function moveUpButtonTwo() {
            const button = document.querySelector('#more-button');
            if (window.innerWidth > 471 && window.innerWidth < 845) {
                button.style.gridRow = '5 / 9'
            }
            else if (window.innerWidth <= 470) {
                button.style.gridRow = '7 / 8';
            } 
            else {
                button.style.gridRow = '4 / 6';
            }
        }
        moveUpButtonTwo();

        function paddingButton() {
            const button = document.querySelector('.button');
            if (window.innerWidth > 471 && window.innerWidth < 845) {
                button.style.marginBottom = '3000px'
            }
            else {
                button.style.paddingBottom = '0px';
            }
        }
        paddingButton();

        const greyContainer = document.querySelector('#grey-container');
        greyContainer.style.display = 'flex';

        const bodyBackground = document.body;
        if (window.innerWidth > 471 && window.innerWidth < 845) {
            bodyBackground.style.height = '1024px';
        }
        else if (window.innerWidth <= 470) {
            bodyBackground.style.height = '667px';
        } 
        else {
            bodyBackground.style.backgroundSize = 'cover';
        }

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
            arrowButton.setAttribute('src', 'starter-code/assets/desktop/icon-arrow-down.svg');
        }
        changeArrowButton();
    
        function moveDownTime() {
            const time = document.querySelector('.time-and-zone');
            if (window.innerWidth <= 470) {
                time.style.gridRow = '6 / 8'
            } else {
                time.style.gridRow = '7 / 9';
            }
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
            const button = document.querySelector('.button-and-loc');
            button.style.gridRow = '10 / 11';
        }
        moveDownButton();

        const greyContainer = document.querySelector('#grey-container');
        greyContainer.style.display = 'none';

        const bodyBackground = document.body;
        if (window.innerWidth > 471 && window.innerWidth < 845) {
            bodyBackground.style.backgroundSize = 'cover';
        } else {
            bodyBackground.style.backgroundSize = 'cover';
        }

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
