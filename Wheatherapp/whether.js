const apikey= "7494d4f450c984a6082c832deefbf56d";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox=document.querySelector(".search input");
const searchbtn=document.querySelector(".search button");
const wheathericon=document.querySelector(".whether-icon")
const carddetails=document.querySelector(".card")
const body=document.querySelector("body")
const wheather=document.querySelector(".whether")
const heading=document.querySelector(".heading")
const intialbgc=body.style.backgroundImage


async function whethercheck(allcity){
    const response = await fetch(apiUrl+ allcity +`&appid=${apikey}`)
    var data = await response.json()
    console.log(data);

    if(response.status==404){
        document.querySelector(".error").style.display="block"
        document.querySelector(".whether").style.display="none"
        body.style.backgroundImage=intialbgc
    }else{
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temprature").innerHTML=Math.round(data.main.temp)+"°c";
        document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
        document.querySelector(".wind").innerHTML=data.wind.speed+"KM/h";
    
        if(data.weather[0].main=="Clouds"){
            wheathericon.src="images/clouds.png"
            wheather.style.color="white"
            carddetails.style.border="none"
            searchbox.style.border="1px solid white"
            searchbtn.style.border="none"
            heading.style.display="none"
            body.style.backgroundImage='url("https://wallpapers.com/images/hd/gradient-cloudy-sky-4k-pc-3egacfral9yz8znc.jpg")'
        }else if(data.weather[0].main=="Clear"){
            wheathericon.src="images/clear.png"
            carddetails.style.border="none"
            searchbtn.style.border="none"
            heading.style.display="none"
            body.style.backgroundImage='url("https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2022/10/cloud-photography-tips-6.jpg?resize=1500%2C1000&ssl=1")'
        }else if(data.weather[0].main=="Rain"){
            wheathericon.src="images/rain.png"
            body.style.backgroundImage='url("https://static.vecteezy.com/system/resources/previews/042/195/796/non_2x/ai-generated-rainy-weather-background-free-photo.jpg")'
            wheather.style.color="white"
            heading.style.display="none"
            carddetails.style.border="none"
            searchbox.style.border="1px solid white"
            searchbtn.style.border="none"  
        }else if(data.weather[0].main=="Drizzle"){
            wheathericon.src="images/drizzle.png"
            heading.style.display="none"
        }else if(data.weather[0].main=="Mist"){
            wheathericon.src="images/mist.png"
            body.style.backgroundImage='url("https://images.pexels.com/photos/666839/pexels-photo-666839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
            wheather.style.color="black"
            carddetails.style.border="none"
            searchbox.style.border="1px solid white"
            searchbtn.style.border="none"
            heading.style.display="none"
        }else if(data.weather[0].main=="Haze"){
             wheathericon.src="images/clouds.png"
            body.style.backgroundImage='url("https://media.macphun.com/img/uploads/customer/blog/1691416474/169141668764d0f86fe6c749.79984173.jpg?q=85&w=1680")'
            searchbox.style.border="1px solid black"
            searchbtn.style.border="1px solid black"
            carddetails.style.border="none"


        }
        document.querySelector(".whether").style.display="block"
        document.querySelector(".error").style.display="none"
        

    

    }

  
   
}
searchbtn.addEventListener("click",()=>{
    whethercheck(searchbox.value)
    searchbox.value=""

})
searchbox.addEventListener("keydown",(event)=>{
    if(event.key=="Enter"){
        whethercheck(searchbox.value)
        searchbox.value=""
    }
})
searchbtn.addEventListener("click",()=>{
    whethercheck(searchbox.value)
    searchbox.value=""
    searchbox.focus()
})