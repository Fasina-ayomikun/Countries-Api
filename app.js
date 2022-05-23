const regionURL = 'https://restcountries.com/v3.1/region/';
const nameURL = 'https://restcountries.com/v3.1/name/';
const allURL = 'https://restcountries.com/v3.1/all';


// darkmode

const section = document.querySelector('.section');
const darkmodeBtn = document.querySelector('.darkmode');
const countryInputContainer = document.querySelector('.country-input-container');
const countriesContainer = document.querySelector('.countries-container');
const input = document.querySelector('.input');
const bodyHead = document.querySelector('.body-head');
const bodyContainer = document.querySelector('.body-info-container');
const seemore = document.querySelector('.see-more');
const seemoreContainer = document.querySelector('.seemore-container');
const countries = document.querySelectorAll('.country');
const countryInput = document.querySelector('.country-input');
const singleCountry = document.querySelector('.single-country')
const searchs = document.querySelectorAll('.search');

darkmodeBtn.addEventListener('click', function(){
    section.classList.toggle('darkmode-activate')
})

countryInputContainer.addEventListener('click',function(e){
    e.preventDefault()
    countriesContainer.classList.toggle('active-country');
})


bodyContainer.addEventListener('click',function(){
    countriesContainer.classList.remove('active-country');
})


let end = 8
const display = (Items)=>{

    const contents = Items.map((content)=>{
  
        const {population,region} = content;
               const capital = content.capital
               const {png:img} = content.flags;
               const {official:name} = content.name;
               
               
                
               
                return` <div class="country-info">
                <img src="${img}" alt="img" class="country-flag">
                <div class="country-details">
                    <h5 class="country-name">${name}</h5>
                    <p class="population">Population: ${population}</p>
                    <p class="region">Region: ${region}</p>
                    <p class="capital">Capital: ${capital}</p>
                </div>
            </div>`
        }).join('')
        bodyContainer.innerHTML = contents
        const countryInfos = bodyContainer.querySelectorAll('.country-info')
        const backhome = document.querySelector('.backhome')
        
        
        countryInfos.forEach((info)=>{
            
            info.addEventListener('click',function(e){
                bodyContainer.style.display = 'none';
                singleCountry.style.display = 'block';
                let name = info.firstElementChild.nextElementSibling.firstChild.nextElementSibling.textContent;
                displaySingleCountry(name)
            })
        })
        backhome.addEventListener('click',function(){
            bodyContainer.style.display = 'grid';
            singleCountry.style.display = 'none'
            bodyHead.style.display = 'flex'
            seemore.style.display = `flex`;
          
        })
}

async function displayItems(){

    try {
        seemore.style.display = `none`;
        bodyHead.style.display ='none';
        bodyContainer.innerHTML = `<h1 class='error'>Loading....</h1>`;
        bodyContainer.style.height = `${100}vh`
        const response = await fetch(allURL);
        const data = await response.json();
        bodyContainer.style.height = `${100}%`;
        seemore.style.display = `flex`;
        bodyHead.style.display ='flex';
        let newd = 0;
        
        
        seemoreContainer.addEventListener('click',function(){
            end = end + 8;
            newd = data.slice(0,end);
            console.log(data);
            display(newd)
        })

        display(data.slice(0,8));
        
        
        
    } catch (error) {
        console.log(error);
        bodyContainer.style.height = `${100}vh`
        seemore.style.display = `none`
        bodyContainer.innerHTML = `<h1 class='error'>oops! Something went wrong, Please Try again</h1>`
        bodyContainer.style.height = `${100}%`
    }
    
}


displayItems()

searchs.forEach((search)=>{
    search.addEventListener('click',async function(){
        let content = input.value;
        try {
            seemore.style.display = `none`
            bodyHead.style.display = 'none'
            bodyContainer.innerHTML = `<h1 class='error'>Loading....</h1>`
            bodyContainer.style.height = `${100}vh`
            const response = await fetch(allURL);
            const data = await response.json()
            
        
        let newItems = data.filter((item)=>{
         
            return item.name.official.toLowerCase().includes(content)
            
        })
        display(newItems)
        bodyContainer.style.height = `${100}%`  ;
        seemore.style.display = `flex`;
        bodyHead.style.display ='flex';  
            if(newItems.length < 1){
                seemore.style.display = `none`
                bodyContainer.innerHTML = `<h1 class='error'>Sorry, country not found</h1>`
            }
        } catch (error) {
            bodyContainer.style.height = `${100}vh`;
                seemore.style.display = `none`
                bodyContainer.innerHTML = `<h1 class='error'>oops! Something went wrong, Please Try again</h1>`
                bodyContainer.style.height = `${100}%`
        }
        
        
    })
})


countries.forEach((country)=>{
    country.addEventListener('click',async function(e){
        const element = e.currentTarget;
        const info = element.textContent.toLowerCase();
        countryInput.textContent = info
        
        try {
            seemore.style.display = `none`;
            bodyHead.style.display = 'none';
            bodyContainer.innerHTML = `<h1 class='error'>Loading....</h1>`;
            bodyContainer.style.height = `${100}vh`;

            const response = await fetch(allURL);
            const data = await response.json()
          
            
            let newCountry = data.filter((item)=>{
        
                return item.region.toLowerCase().includes(info)
                
            })
            bodyContainer.style.height = `${100}%`;
            seemore.style.display = `flex`;
            bodyHead.style.display = 'flex';
            display(newCountry.slice(0,8))
            let newd = 0;
        
        
            seemoreContainer.addEventListener('click',function(){
                end = end + 8;
                newd = data.slice(0,end);
               
                display(newd)
            })
            if(info === 'all'){
                display(data)
            }
        } catch (error) {
            console.log(error);
            bodyContainer.style.height = `${100}vh`;
            seemore.style.display = `none`
            bodyHead.style.display = 'none';
            bodyContainer.innerHTML = `<h1 class='error'>oops! Something went wrong, Please Try again</h1>`
            bodyContainer.style.height = `${100}%`;
            // seemore.style.display = `flex`;
            bodyHead.style.display = 'flex';
        }
    })
    
})


const dices = document.querySelectorAll('.dice');
dices.forEach((dice)=>{
    dice.addEventListener('click',function(){
        shuffle()
    })
})
async function shuffle(){
    try {
        seemore.style.display = `none`;
        bodyHead.style.display = 'none';
        bodyContainer.innerHTML = `<h1 class='error'>Loading...</h1>`;
        bodyContainer.style.height = `${100}vh`;

        const response = await fetch(allURL);
        const data = await response.json()
        const shuffles = data.map((content)=>{
            let index = 0
            if(index < data.length -1){
                index = Math.floor(Math.random() * data.length)
            }

            const {population,region} = data[index];
                const capital = data[index].capital
                const {png:img} = data[index].flags;
                const {official:name} = data[index].name;
                
                    return` <div class="country-info">
                    <img src="${img}" alt="img" class="country-flag">
                    <div class="country-details">
                        <h5 class="country-name">${name}</h5>
                        <p class="population">Population: ${population}</p>
                        <p class="region">Region: ${region}</p>
                        <p class="capital">Capital: ${capital}</p>
                    </div>
                </div>`
            }).join('')
            bodyContainer.innerHTML = shuffles; 
            const countryInfos = bodyContainer.querySelectorAll('.country-info')
        const backhome = document.querySelector('.backhome')
        
        
        countryInfos.forEach((info)=>{
            
            info.addEventListener('click',function(e){
                bodyContainer.style.display = 'none';
                singleCountry.style.display = 'block';
                let name = info.firstElementChild.nextElementSibling.firstChild.nextElementSibling.textContent;
                displaySingleCountry(name)
            })
        })
        backhome.addEventListener('click',function(){
            bodyContainer.style.display = 'grid';
            singleCountry.style.display = 'none'
            bodyHead.style.display = 'flex'
            seemore.style.display = `flex`;
          
        })
        
      
            bodyContainer.style.height = `${100}%`;
           
            bodyHead.style.display = 'flex';
    } catch (error) {
        console.log(error);
        bodyContainer.style.height = `${100}vh`;
            seemore.style.display = `none`;
            bodyHead.style.display = 'none';
            bodyContainer.innerHTML = `<h1 class='error'>oops! Something went wrong, Please Try again</h1>`
            bodyContainer.style.height = `${100}%`;
            seemore.style.display = `flex`;
            bodyHead.style.display = 'flex';
        }
}

const singleContent = document.querySelector('.single-content')



const displaySingleCountry = async (name)=>{
    try {
        seemore.style.display = `none`
        bodyHead.style.display = `none`
        singleContent.innerHTML = `<h1 class='error'>Loading....</h1>`;


        

        const response = await fetch(`${nameURL}${name}`);
        const data = await response.json();
        
        let pos = 0;
        let div = 0;
        const singlecountries = data.filter((country)=>{
           
           
            const {population,region,subregion} = country;
                const capital = country.capital
                const {png:img} = country.flags;
                const {official:name} = country.name;
            
                let nativeNames = 0;
              
                let tld = 0
                if(country.tld){
                    tld = country.tld[0]
                }
                if(country.name.nativeName){
                    nativeNames =Object.values(country.name.nativeName);
                    nativeNames = nativeNames[0].official
                }
                let currencyName;
                let currencySym;
                
                if(country.currencies){
                      
                    let currencies = Object.values(country.currencies);
                    currencyName = currencies[0].name;
                    currencySym = currencies[0].symbol;
                    
                }
                let languages = 0
                if(country.languages){
                    languages = Object.values(country.languages);
    
                    for(let i = 0;i < languages.length; i++){
        
                        pos = languages[i];
                    }
                }
            
                   singleContent.innerHTML = `<img src="${img}" alt="flag" class="single-flag">
                    <div class="flag-details">
                        <h1 class="flag-name">${name}</h1>
                        <div class="flag-infos">
                            <div class="column1">
                                <p >Native Name: <span class="native">${nativeNames}</span></p>
                                <p >Population:<span class="single-population"> ${population}</span></p>
                                <p >Region:<span class="single-region"> ${region}</span></p>
                                <p >Sub Region: <span class="sub-region">${subregion} </span></p>
                                <p >Capital: <span class="single-capital">${capital} </span></p>
                            </div>
                            <div class="column2">
                                <p >Top Level Domain:<span class="top-domain"> ${tld}</span></p>
                                <p>Currencies:<span  class="currencies"> ${currencySym} ${currencyName} </span></p>
                                <p >languages:<span class="languages"> ${pos} </span></p>
                            </div>
                        </div>
                        <div class="border-countries">
                            <p>Border Countries: </p>
                            <div class='borders'>
                            </div>
                        </div>
                    </div>`
        })
        const borders = singleContent.querySelector('.borders')
        if(data[0].borders){
            
            data[0].borders.map((border)=>{
            div = document.createElement('div');
            div.classList.add('border-country');
            div.textContent = border;
            borders.appendChild(div)
        })
        }
        
        
    } catch (error) {
        console.log(error);
        seemore.style.display = `none`;
        bodyHead.style.display = 'none';
        singleContent.innerHTML = `<h1 class='error'>oops! Something went wrong, Please Try again</h1>`;

    }
   
}
