const cityName = document.getElementById('cityName')
const submitBtn =  document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');

const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');

const temp_real_value = document.getElementById('temp_real_value');



const datahide = document.querySelector('.middle_layer'); // if nothing is entered middle layer data is hidden

const getInfo = async (event) => {
    event.preventDefault();
//    alert('hii');
   let cityVal = cityName.value;

   if (cityVal === "") {
    city_name.innerText = `Please Enter City name to search`;
    datahide.classList.add('data_hide');

   } else {
    try {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=a470056ba29d65d6ad8263a985d4ba04`
    const response = await fetch(url);  // await means wait till you get data
    // console.log(response); // here we get response in the form of JSON
    const data = await response.json(); // it converts JSON to object
    const arrData = [data]; // as API is present in formv in arr[data]

    city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;  // {} and `` are used to display 2 data simult.
    temp_real_value.innerText = arrData[0].main.temp;
    const tempMood = arrData[0].weather[0].main;

    //condition to check sunny or cloudy
   if(tempMood == "Clear"){
    temp_status.innerHTML = "<i class = 'fas fa-sun' style='color:#eccc68';></i>";  // this type of style is known as inline styling
   }else if(tempMood == "Clouds"){
    temp_status.innerHTML = "<i class = 'fas fa-cloud'></i>";
   }else if(tempMood == "Rain"){
    temp_status.innerHTML = "<i class = 'fas fa-cloud-rain'></i>";
   }else{
    temp_status.innerHTML = "<i class = 'fas fa-cloud'></i>";
   }

   datahide.classList.remove('data_hide'); // if city entered is correct then remove the hide property

    } catch{
        city_name.innerText = `Plz enter the city name properly`;
        datahide.classList.add('data_hide');

    }
    
   }
}
submitBtn.addEventListener('click', getInfo);//when someone clicks on button getInfo func is called