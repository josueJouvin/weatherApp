const messagePermise = document.querySelector('#messagePermise')
const showHiddenMenu = document.querySelector('#showHiddenMenu')
const searchMenu = document.querySelector('#searchMenu')

document.addEventListener('DOMContentLoaded', () =>{ 
    function success(pos){
        let cords = pos.coords
        const {latitude, longitude} = cords
        accessGranted(latitude,longitude)
    }

    function error(err){
        accessDenied()
    }

    navigator.geolocation.getCurrentPosition(success,error);
})

const accessGranted = (latitude,longitude) =>{
    console.log(latitude, longitude)   
}

const accessDenied = () =>{
    setTimeout(()=>{
        messagePermise.classList.add('hidden')
        showHiddenMenu.classList.remove('hidden')
        searchMenu.classList.remove('hidden')
    }, 4500);
}