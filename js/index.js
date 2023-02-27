const form =document.querySelector('.createForm');
const error_text=document.querySelector('.error-text');


form.addEventListener('submit',(e)=>{
    e.preventDefault(); 
    getWeather(form.location.value)  
    
})

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getWeather=async(location)=>{
    document.querySelector('.weather-data').innerHTML=`
    <div class="loading">
    </div>`;
    try {
        const res=await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=LKWAWUQNLTYVYBPCTZVYH8GAM`);
        const result = await res.json();
        let content='';
        let daily=''
        let i;
        let fiveDays = result?.days.length-9
        for(i=1;i<fiveDays;i++){
            console.log(result?.days[i]);
            let day = new Date(result?.days[i].datetime);
            let dayName = days[day.getDay()];

            daily+=`
            <div class="conditionDaily">
                <div class="img"><img src="/img/rain.png" alt=""></div>
                <p class="temp">${Math.floor((result?.days[i].temp- 32) * 5/9)} &#8451;</p>
                <p class="day">${result?.days[i].datetime}</p>
                <p class="day">${dayName}</p>
            </div>
            `
        }
        

        document.querySelector('.days').innerHTML=daily;

        content+=`
        <h1 class="location">${result.address}</h1>
            <h4 class="locationResolved">${result.resolvedAddress}</h4>
            <div class="time">
                <p class="datetime">${result.days[0].datetime}</p>
                <p class="timezone">${result.timezone}</p>
            </div>
            <div class="condition">
                <img src="/img/rain.png" alt="">
                <div class="temperature">
                    <p class="temp">${Math.floor((result?.days[i].temp- 32) * 5/9)} &#8451;</p>
                    <p class="condition2">${result.days[0].description}</p>
                </div>
            </div>
            <div class="sunConditions">
                <div class="sunrise">
                    <p>Sunrise</p>
                    <p class="sunriseTime">${result.days[0].sunrise}</p>
                </div>
                <div class="sunset">
                    <p>Sunset</p>
                    <p class="sunsetTime">${result.days[0].sunset}</p>
                </div>
            </div>
        `

        document.querySelector('.weather-data').innerHTML=content;
    } catch (error) {
        document.querySelector('.weather-data').innerHTML="Error occured,try again later";
    }
}


window.addEventListener('DOMContentLoaded',getWeather('Kigali,Rwanda'))