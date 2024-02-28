function error() {
    console.error(error);
}

async function fetchQuote() {
    try {
    const response = await fetch("https://api.quotable.io/quotes/random");
    const result = await response.json();
    const quote = document.querySelector('#quote');
    const author = document.querySelector('#author');
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

    if (hours < 17) {
        image = 'assets/desktop/icon-sun.svg';
    }
    else if (hours >= 17 && hours < 24) {
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


