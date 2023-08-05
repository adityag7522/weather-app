const apiKey="bfd6689aac6040633348ae935c743537";



const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
    );
    
    var cities = [];

    const d = localStorage.getItem("history");
    if(d)
        cities = d.split(',');
    const state = document.getElementById('state');
    const search = document.getElementById('search');
    const target = document.getElementById('cities');

    if(cities.length > 0)
    {
        cities.forEach(city => {
            display(city);
        });
    }


    async function display(city) {
        if(city === "") return;
        city = city.charAt(0).toUpperCase() + city.slice(1);

        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const data=await fetch(url,{method:"GET"});
        const res=await data.json();
        const temp=res.main.temp.toFixed();
        const maxtmp=res.main.temp_max.toFixed();
        const mintmp=res.main.temp_min.toFixed();
        const cntry=res.sys.country;
        const country = regionNames.of(cntry);
        const type = res.weather[0].description;

        localStorage.setItem("history",cities);

        const code = res.weather[0].icon;
        const img= `http://openweathermap.org/img/wn/${code}.png`
        
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="temperature">
                <div class="temp">${temp}°</div>
                <div class='temps'><span>H: ${maxtmp}</span><span>L: ${mintmp}</span></div>
                <div><span>${city}</span>, <span>${country}</span></div>
            </div>
            <div class="type">
                <img src="${img}" />
                <div>${type}</div>
            </div>
        `

        target.appendChild(card);
    }

    
    search.addEventListener('click',async() => {
        const city = state.value;
        cities.push(city);
        await display(city);
    });



{/* <div class="card">
    <div class="temperature">
        <div class="temp">20°</div>
        <div><span>H: </span><span>L: </span></div>
        <div><span>State</span>,<span>Country</span></div>
    </div>
    <div class="type">
        <img src="https://s3-alpha-sig.figma.com/img/dc56/74da/7415fc93ad3656c3d4ca4a2379e80c63?Expires=1691971200&Signature=ZwzA1J-ItPsUCbEGNc0TyvLOdRBHds7C9TK090vabbcRItpF0-tBemulJKURBtGpYg~gQkoS~Z29cEehxb~M5KGSawNua7x86bm1XpuASf0RvgYwY5oZND4WJ8oFDWy~2jv7KXC50nZWf3zZzVv2cCFLDMgUxdGgC8mx4fTYC3MiOdQqZWjyqBCpU9OhUK3oMiaaIvnfvU7WejSLFVWyEs3pD5mcKJphi2aTEUeUsJbSdjHs~ayprB2lLbtNrJC5~eTmtuLD8lXumo7FI-45uC8UXvzMxnx3C7HdiUGb0wTxleGpbUE2hB-SEPlQe1OKnOHgIBAmQXM62W-fj8UBmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
        <div>Type</div>
    </div>
</div> */}