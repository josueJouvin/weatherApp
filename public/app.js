const messagePermise = document.querySelector('#messagePermise');
const hiddenPrincipal = document.querySelector('#hidden')
const principalMenu = document.querySelector('#principalMenu');
const showHiddenInfo = document.querySelector('#showHiddenInfo').content;
const apiKey = 'f15cad192956337128fb4850f7a258b6';


document.addEventListener('DOMContentLoaded', () =>{
    function success(pos){
        let cords = pos.coords
        const {latitude, longitude} = cords
        accessGranted(latitude,longitude)
        messagePermise.remove()
        hiddenPrincipal.classList.remove('hidden')
    }

    function error(err){
        const city = document.querySelector('#City')
        city.addEventListener('submit', (e) =>{
            e.preventDefault()
            const btnCity = document.querySelector('#btnCity').value
            searchCity(btnCity)
        })
    }

    navigator.geolocation.getCurrentPosition(success,error);
})

const accessGranted = (latitude,longitude) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    
    fetch(url)
        .then(response => response.json())
        .then(data => showHtmlInfoPrincipal(data))
        .catch(err => console.log(err))
}

const showHtmlInfoPrincipal = (data) =>{
    console.log(data)
    const {main,weather,name} = data
    const today = new Date().toDateString()
    const fragment = document.createDocumentFragment()
    
    principalMenu.textContent = ''
    const clone = showHiddenInfo.cloneNode(true)
    clone.querySelector('#weatherImageBackground').setAttribute('style',`${bgImg(weather[0].main)}`)
    clone.querySelector('#weatherImage').src = imgDependingWeather(weather[0].main) 
    clone.querySelector('#temperature').textContent = kelvinACentigrados(main.temp);
    clone.querySelector('#climate').textContent = weather[0].main
    clone.querySelector('#date').textContent = today
    clone.querySelector('#city').textContent = name  

    const btnSearch = clone.querySelector('#searchButton')
    fragment.appendChild(clone)
    principalMenu.appendChild(fragment)

    showHtmlMaxMinTemp(data.main,clone)
    todayHightlights(data)

    searchOtherCities(btnSearch)
}

const imgDependingWeather = (weather) =>{
   if(weather === 'Clear'){
        return './img/Clear.png'    
   }else if(weather === 'Rain'){
        return './img/HeavyRain.png'
   }else if(weather === 'thunderstorm'){
        return './img/Thunderstorm.png'
   }else if(weather === 'Snow'){
        return './img/Snow.png'
   }else{
        return './img/HeavyCloud.png'
   }
}

const bgImg = (weather) =>{
    if(weather === 'Clouds' || weather === 'Rain' || weather === 'Thunderstorm'){
        return 'background-image: url(./img/Cloud-background.png);'
    }else{
        return ''
    }
}

const kelvinACentigrados = grados =>{
    return `${parseInt(grados - 273.15)}°c`
}
    
const showHtmlMaxMinTemp = (data) =>{
    const nextDays = document.querySelector('#nextDays')
    const nextDaysAuto = document.querySelector('#nextDaysAuto').content
    const {temp_max,temp_min} = data
    const fragment = document.createDocumentFragment()
    
    nextDays.textContent = ''
    const clone = nextDaysAuto.cloneNode(true)
    clone.querySelectorAll('.tempMax').forEach(element => {
        element.textContent = kelvinACentigrados(temp_max)
    });
    clone.querySelectorAll('.tempMin').forEach(element => {
        element.textContent = kelvinACentigrados(temp_min)
    });
    clone.querySelectorAll('.day').forEach(element => {
        element.textContent = new Date().toLocaleDateString()
    });

    fragment.appendChild(clone)
    nextDays.appendChild(fragment)
}

const todayHightlights = (data) =>{
    const {visibility,main,wind} = data
    const todayHightlights = document.querySelector('#todayHightlights').content
    const hightlights = document.querySelector('#hightlights')
    const fragment = document.createDocumentFragment()
    const clone = todayHightlights.cloneNode(true)
    hightlights.textContent = '';

    clone.querySelector('#windSpeed').textContent = `${wind.speed} m/s`
    clone.querySelector('#humidity').textContent = `${main.humidity}%`
    clone.querySelector('#visibility').textContent = `${convertVisibility(visibility)}Km`
    clone.querySelector('#airPressure').textContent = `${main.pressure} mb`

    fragment.appendChild(clone)
    hightlights.appendChild(fragment)
}

const convertVisibility = (visibility) =>{
    const sVisibility = String(visibility)
    const firstN = sVisibility.slice(0,1)
    const secondN = sVisibility.slice(1,3)
    return `${firstN}.${secondN}`
}


//MENU
const searchOtherCities = (btnSearch) =>{
    btnSearch.addEventListener('click', () =>{
        const openSearchMenu = document.querySelector('#searchMenu');
        const principalinfoWeather = document.querySelector('#principalinfoWeather');
        openSearchMenu.classList.remove('hidden')
        principalinfoWeather.classList.add('hidden')
    })
    closeSearchMenu()
}

const closeSearchMenu = () =>{
    const btnCloseMenu = document.querySelector('#closeMenu')
    btnCloseMenu.addEventListener('click', () =>{
        const openSearchMenu = document.querySelector('#searchMenu');
        const principalinfoWeather = document.querySelector('#principalinfoWeather');
        openSearchMenu.classList.add('hidden')
        principalinfoWeather.classList.remove('hidden')
    })
    searchCity()
}


const searchCity = () =>{
    const regEx = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const formCity = document.querySelector('#formCity')

    formCity.addEventListener('submit',(e) =>{
        e.preventDefault()
        const inputCity = document.querySelector('#inputCity').value.toLowerCase();
        if(!regEx.test(inputCity) || !inputCity.trim()){
            return errorInputCity('Required field, numbers are not allowed')
        }
        
        searchApiCity(inputCity.trimStart())
    })
}

const searchApiCity = (city) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            if (data.cod === '404') {
                errorInputCity('City not found')
                return;
            }
            showHtmlInfoPrincipal(data)
        })
        
}

const errorInputCity = (menssage) =>{
    const messageError = document.querySelector('#messageError')
    const alert = document.querySelector('.border-indigo-400');

    if (!alert) {
        const alert = document.createElement('div');

        alert.classList.add('bg-indigo-600', 'border-indigo-400', 'text-gray-50', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
        alert.textContent= menssage
        messageError.appendChild(alert)

        setTimeout(()=>{
            alert.remove()
        },3500)
    }
}

