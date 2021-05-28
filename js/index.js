window.onload = function(){

    //Iniciar elementos
    var elementBody = document.body;
    //Header
    let logo = document.getElementById('logo');
    let modeNoc = document.getElementById('mode-noc');
    let makeGifo = document.getElementById('makeGifo');
    let imgMakeGifo = document.getElementById('img-makeGifo');
    //Footer
    let iconFB = document.getElementById('iconFB');
    let iconIG = document.getElementById('iconIG');
    let iconTW = document.getElementById('iconTW');
    //Buscador
    let searchWrapper = document.getElementById('content-searchInput');
    let inputBox = document.getElementById('searchInputWrapper');
    let suggBox = document.getElementById('autocom-box');
    let btnSeach = document.getElementById('btnSearch');

    let textSearch = document.getElementById('textSearch');

    let contentListGifoSearch = document.getElementById('content-listGifoSearch');
    let titleSearch = document.getElementById('titleSearch');
    let listGifoSearch = document.getElementById('listGifoSearch');
    let btnSearchMore = document.getElementById('btnSearchMore');
    let imgBtnSearchMore = document.getElementById('img-btnSearchMore');
    //Trending
    let BtnPrevTren = document.getElementById('btnPrev-trendingGifos');
    let imgBtnPrevTren = document.getElementById('imgPrev-trendingGifos');
    let BtnNextTren = document.getElementById('btnNext-trendingGifos');
    let imgBtnNextTren = document.getElementById('imgNext-trendingGifos');
    let listTrendingGifos = document.getElementById('listTrendingGifos');
    //MaxGifo
    let maxGifo = document.getElementById('maxGifo');
    let imgMaxGifo = document.getElementById('img-maxGifo');
    let iconCloseMaxGifo = document.getElementById('icon-close-maxGifo');


    //Modo nocturno
    modeNoc.addEventListener('click', () => {
        elementBody.classList.toggle("dark-mode");
        if(modeNoc.textContent == "MODO NOCTURNO"){
            modeNoc.innerHTML = "MODO DIURNO";
            logo.src = "./images/Logo-modo-noc.svg";
            imgMakeGifo.src = "./images/CTA-crear-gifo-active-modo-noc.svg";
            btnSeach.src = "./images/icon-search-mod-noc.svg"
            iconFB.src = "./images/icon_facebook_noc.svg";
            iconIG.src = "./images/icon_instagram_noc.svg";
            iconTW.src = "./images/icon_twitter_noc.svg";
            imgBtnPrevTren.src = "./images/button-slider-left-md-noct.svg";
            imgBtnNextTren.src = "./images/button-slider-right-md-noct.svg";   
        }    
        else{    
            modeNoc.innerHTML = "MODO NOCTURNO";
            logo.src = "./images/logo-desktop.svg";
            imgMakeGifo.src = "./images/CTA-crear-gifo-active.svg";
            btnSeach.src = "./images/icon-search.svg"
            iconFB.src = "./images/icon_facebook.svg";
            iconIG.src = "./images/icon_instagram.svg";
            iconTW.src = "./images/icon-twitter.svg";
            imgBtnPrevTren.src = "./images/button-slider-left.svg";
            imgBtnNextTren.src = "./images/Button-Slider-right.svg";
        }    
    })

    //Header
    makeGifo.addEventListener('mouseover', ()=>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgMakeGifo.src = "./images/CTA-crear-gifo-hover.svg"
        else
            imgMakeGifo.src = "./images/CTA-crear-gifo-hover-modo-noc.svg"
        
    })

    makeGifo.addEventListener('mouseout',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgMakeGifo.src = "./images/CTA-crear-gifo-active.svg"
        else
            imgMakeGifo.src = "./images/CTA-crear-gifo-active-modo-noc.svg"
    })

    //Footer
    iconFB.addEventListener('mouseover', ()=>{
        iconFB.src = "./images/icon_facebook_hover.svg"
    })

    iconFB.addEventListener('mouseout',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            iconFB.src = "./images/icon_facebook.svg"
        else
            iconFB.src = "./images/icon_facebook_noc.svg"
    })

    iconIG.addEventListener('mouseover', ()=>{
        iconIG.src = "./images/icon_instagram-hover.svg"
    })

    iconIG.addEventListener('mouseout',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            iconIG.src = "./images/icon_instagram.svg"
        else
            iconIG.src = "./images/icon_instagram_noc.svg"
    })

    iconTW.addEventListener('mouseover', ()=>{
        iconTW.src = "./images/icon-twitter-hover.svg"
    })

    iconTW.addEventListener('mouseout',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            iconTW.src = "./images/icon-twitter.svg"
        else
            iconTW.src = "./images/icon_twitter_noc.svg"
    })

    //Buscador - Inicio
    //Recomendaciones - Inicio
    //Completar Base de palabras buscadas
    let suggestion = [];
    async function getTrendingSearch(){
        let response = await fetch('https://api.giphy.com/v1/trending/searches?api_key=l3K24h2y7NIQeI3mg3iX8CLTVep7UdNt&limit=25&rating=g')
        let info = await response.json();
        for (let i = 0; i < info.data.length; i++) {
            suggestion.push(info.data[i]);
        }
        //console.log('Busquedas',suggestion);
    }
    getTrendingSearch();

    inputBox.onkeyup = (e) =>{
        let dataSearch = e.target.value;
        let suggArray = [];
        if(dataSearch){
            suggArray = suggestion.filter((data)=>{
                return data.toLocaleLowerCase().startsWith(dataSearch.toLocaleLowerCase());
            });
            suggArray = suggArray.map((data)=>{
                return data = '<li>'+ data +'</li>';
            });
            searchWrapper.classList.add("active");
            showSuggestions(suggArray);
            let allList = suggBox.querySelectorAll("li");
            for (let i = 0; i < allList.length; i++) {
                allList[i].id = 'sugg' + i;
                interactionSug(i)
            }
        }else{
            searchWrapper.classList.remove("active");
        }  
    }

    function interactionSug(index){
        let opcSugg = document.getElementById(`sugg${index}`);
        opcSugg.addEventListener('click',() =>{
            inputBox.value = opcSugg.textContent;
            inputSearchGifo(inputBox)
        })
    }

    function showSuggestions(list){
        let listData;
        if(!list.length){
            userValue = inputBox.value;
            listData = '<li>' + userValue +'</li>';
        }else{
            listData = list.join('');
        }
        suggBox.innerHTML = listData;
    }
    //Recomendaciones - Fin
    //Lista de busquedas - Inicio
    btnSeach.addEventListener('click', ()=>{
        inputSearchGifo(searchInputWrapper)
    })

    function inputSearchGifo(searchInputWrapper){
        titleSearch.innerHTML = searchInputWrapper.value;
        textSearch.style.display="none";
        contentListGifoSearch.style.display="block";
        let contSearch = 0
        searchGifo(searchInputWrapper.value,contSearch)
        btnSearchMore.style.display="inline-flex";
        btnSearchMore.addEventListener('click', ()=>{
            contSearch +=12;
            searchGifo(searchInputWrapper.value,contSearch)
        })
        imgBtnSearchMore.addEventListener('mouseover',() =>{
            if(modeNoc.textContent == "MODO NOCTURNO")
                imgBtnSearchMore.src = "./images/CTA-ver-mas-hover.svg"
            else
                imgBtnSearchMore.src = "./images/CTA-ver+hover-modo-noc.svg"
        })
        imgBtnSearchMore.addEventListener('mouseout',() =>{
            if(modeNoc.textContent == "MODO NOCTURNO")
                imgBtnSearchMore.src = "./images/CTA-ver-mas.svg"
            else
                imgBtnSearchMore.src = "./images/CTA-ver+-modo-noc.svg"
        })
    }

    async function searchGifo(value, contSearch){
        let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=l3K24h2y7NIQeI3mg3iX8CLTVep7UdNt&q=${value}&limit=25&offset=0&rating=g&lang=en`)
        let info = await response.json()
        //console.log("searchGifosAPI",info)
        renderViewSearch(info,contSearch);
    }
    
    function renderViewSearch(gifos, contSearch){
        let newGifoSearch
        let baseGifoSearch = gifos.data
        //console.log('Gifos:',baseGifoSearch);
        let maxListSearch = contSearch + 12;
        if(maxListSearch > baseGifoSearch.length){
            maxListSearch = baseGifoSearch.length;
            btnSearchMore.style.display="none";
        }
        listGifoSearch.innerHTML = ''; 
        for(let i=contSearch; i<maxListSearch; i++){
            newGifoSearch = document.createElement("li");
            newGifoSearch.classList.add("cardGifo")
            newGifoSearch.innerHTML = `<img class="imgSearch" src="${baseGifoSearch[i].images.original.url}" alt="${baseGifoSearch[i].title}"/>
                                    <div id="overlay" class="overlay">
                                        <div class="opcionGift">
                                            <button class="iconGifts"><img id="iconFav${i}" src="./images/icon-fav.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconDownload${i}" src="./images/icon-download.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconMax${i}" src="./images/icon-max-normal.svg" alt=""></button>
                                        </div>
                                        <div class="infoGifo">
                                            <p>${baseGifoSearch[i].username}</p>
                                            <p>${baseGifoSearch[i].title}</p>
                                        </div>
                                    </div>`                                        
            listGifoSearch.appendChild(newGifoSearch);

            interactionIcons(i,baseGifoSearch);
        }
    }
    //Lista de busquedas - Fin
    //Buscador - Fin

    //Trending - Inicio
    async function trendingGifo(){
        let response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=l3K24h2y7NIQeI3mg3iX8CLTVep7UdNt&limit=15&rating=g')
        let info = await response.json()
        //console.log('trendingGifosAPI',info)
        renderView(info)
    }

    function renderView(gifos){
        let newGifoTrending
        let baseGifoTrending = gifos.data
        //console.log('Gifos:',baseGifoTrending);
        listTrendingGifos.innerHTML = ''; 
        for(let i=0; i<baseGifoTrending.length; i++){
            newGifoTrending = document.createElement("li");
            newGifoTrending.classList.add("cardGifo")
            newGifoTrending.innerHTML = `<img src="${baseGifoTrending[i].images.original.url}" alt="${baseGifoTrending[i].title}"/>
                                    <div id="overlay" class="overlay">
                                        <div class="opcionGift">
                                            <button class="iconGifts"><img id="iconFav${i}" src="./images/icon-fav.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconDownload${i}" src="./images/icon-download.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconMax${i}" src="./images/icon-max-normal.svg" alt=""></button>
                                        </div>
                                        <div class="infoGifo">
                                            <p>${baseGifoTrending[i].username}</p>
                                            <p>${baseGifoTrending[i].title}</p>
                                        </div>
                                    </div>`                                            
            listTrendingGifos.appendChild(newGifoTrending);
            interactionIcons(i,baseGifoTrending);
        }
    }

    trendingGifo();
    let contFavs = 0;
    let gifosFavs = [];
    function interactionIcons(index,baseGifo){
        let iconFav = document.getElementById(`iconFav${index}`);
        let iconDownload = document.getElementById(`iconDownload${index}`);
        let iconMax = document.getElementById(`iconMax${index}`);

        let favSelected = 0;
        iconFav.addEventListener('mouseover',() =>{
            if(favSelected % 2 == 0)
                iconFav.src = "./images/icon-fav-hover.svg"
            else
                iconFav.src = "./images/icon-fav-active.svg" 
        })

        iconFav.addEventListener('mouseout',() =>{
            if(favSelected % 2 == 0)
                iconFav.src = "./images/icon-fav.svg"
            else
                iconFav.src = "./images/icon-fav-active.svg"
        })

        iconFav.addEventListener('click',() =>{
            iconFav.src = "./images/icon-fav-active.svg"
            favSelected++;
            //console.log('ClickFav')
            if(favSelected % 2 != 0){
                contFavs++;
                gifosFavs.push(baseGifo[index]);
                addFavorites(contFavs, gifosFavs)
            }
            else{
                contFavs--;
                for (let i = 0; i < gifosFavs.length; i++) {
                    if(gifosFavs[i].title === baseGifo[index].title){
                        gifosFavs.splice(i,1);
                    } 
                }
                addFavorites(contFavs, gifosFavs)
            }
        })

        iconDownload.addEventListener('mouseover',() =>{
            iconDownload.src = "./images/icon-download-hover.svg"
        })

        iconDownload.addEventListener('mouseout',() =>{
            iconDownload.src = "./images/icon-download.svg"
        })

        iconDownload.addEventListener('click',() =>{    
            let urlGifo = baseGifo[index].images.original.url;
            console.log('urlGifo',urlGifo);
            downloadFile(urlGifo, `${baseGifo[index].title}`);
        })

        iconMax.addEventListener('mouseover',() =>{
            iconMax.src = "./images/icon-max-hover.svg"
        })

        iconMax.addEventListener('mouseout',() =>{
            iconMax.src = "./images/icon-max-normal.svg"
        })

        iconMax.addEventListener('click',() =>{
            resizeGifo(index,baseGifo);
            maxGifo.style.display="flex";
        })
    }

    function addFavorites(contFavs, gifosFavs){
        localStorage.setItem('contadorFavs', contFavs);
        localStorage.setItem('gifosFavs', JSON.stringify(gifosFavs));
    }

    function downloadFile(url, filename){
        fetch(`${url}`).then(
            (response) =>{
                return response.blob().then(
                    (response) => {
                        let newElement = document.createElement("a");
                        newElement.href = URL.createObjectURL(response);
                        newElement.setAttribute("download", filename);
                        newElement.click();
                    }
                )
            }
        )    
    }

    iconCloseMaxGifo.addEventListener('click', () =>{
        maxGifo.style.display="none";
    })

    function resizeGifo(index,baseGifo){
        imgMaxGifo.innerHTML = `<img class="maxImg" src="${baseGifo[index].images.original.url}" alt="${baseGifo[index].title}"/>
                                    <div class="descMaxGifo">
                                    <div class="infoGifo">
                                        <p id="maxGifoUsername">${baseGifo[index].username}</p>
                                        <p id="maxGifoTitle">${baseGifo[index].title}</p>
                                    </div>
                                    <div class="opcionGift">
                                        <button class="iconGifts"><img id="iconFav${index}" src="./images/icon-fav.svg" alt=""></button>
                                        <button class="iconGifts"><img id="iconDownload${index}" src="./images/icon-download.svg" alt=""></button>
                                    </div>
                                </div>`
        interactionIcons(index,baseGifo);                        
    }

    //Flechas de desplazamiento
    let right = 0;
    BtnNextTren.addEventListener('click', ()=>{
        if(right <= 3390)
            right += 1130;
        else
            right = 0;
        listTrendingGifos.style.right= `${right}px`;    
    })

    BtnPrevTren.addEventListener('click', ()=>{
        if(right > 0)
            right -= 1130;
        else
            right = 4520;
        listTrendingGifos.style.right= `${right}px`;
    })

    imgBtnPrevTren.addEventListener('mouseover',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgBtnPrevTren.src = "./images/button-slider-left-hover.svg"
        else
            imgBtnPrevTren.src = "./images/button-slider-left-hover.svg"
    })
    imgBtnPrevTren.addEventListener('mouseout',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgBtnPrevTren.src = "./images/button-slider-left.svg"
        else
            imgBtnPrevTren.src = "./images/button-slider-left-md-noct.svg" 
    })
    imgBtnNextTren.addEventListener('mouseover',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgBtnNextTren.src = "./images/Button-Slider-right-hover.svg"
        else
            imgBtnNextTren.src = "./images/Button-Slider-right-hover.svg"
    })
    imgBtnNextTren.addEventListener('mouseout',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgBtnNextTren.src = "./images/Button-Slider-right.svg"
        else
            imgBtnNextTren.src = "./images/button-slider-right-md-noct.svg" 
    })

    //Trending - Fin
}