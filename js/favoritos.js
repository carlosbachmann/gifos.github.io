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
    //Favoritos
    let noFavorites = document.getElementById('noFavorites');
    let contentFavorites = document.getElementById('content-Favorites');
    let listGifosFavs = document.getElementById('listGifosFavs');
    let btnMoreFavs = document.getElementById('btnMoreFavs');
    let imgBtnMoreFavs = document.getElementById('img-btnMoreFavs');
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
    
    //Cargar LocalStorage
    let storageGifosFavs = localStorage.getItem('gifosFavs');
    let storageContFavs = parseInt(localStorage.getItem('contadorFavs'));
    
    //Modo nocturno
    modeNoc.addEventListener('click', () => {
        elementBody.classList.toggle("dark-mode");
        if(modeNoc.textContent == "MODO NOCTURNO"){
            modeNoc.innerHTML = "MODO DIURNO";
            logo.src = "./images/Logo-modo-noc.svg";
            imgMakeGifo.src = "./images/CTA-crear-gifo-active-modo-noc.svg";
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

    //Favoritos - Inicio
    let contGifosFavs = 0
    let arrayGifosFavs = [];
    let gifosAdded = [];
    let maxListFavs = 0;

    favoritesGifos(contGifosFavs);
    function favoritesGifos(contFavs){
        if(storageContFavs){
            gifosAdded = JSON.parse(localStorage.getItem('gifosFavs'));
            contGifosFavs = storageContFavs;
            arrayGifosFavs = gifosAdded;
            renderViewFavs(gifosAdded,contFavs);
        }else{
            noFavorites.style.display="block";
            btnMoreFavs.style.display="none";
        }      
    }

    //Boton ver mas favoritos
    btnMoreFavs.addEventListener('click', ()=>{
        favoritesGifos(maxListMyGifos)
    })
    imgBtnMoreFavs.addEventListener('mouseover',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgBtnMoreFavs.src = "./images/CTA-ver-mas-hover.svg"
        else
            imgBtnMoreFavs.src = "./images/CTA-ver+hover-modo-noc.svg"
    })
    imgBtnMoreFavs.addEventListener('mouseout',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgBtnMoreFavs.src = "./images/CTA-ver-mas.svg"
        else
            imgBtnMoreFavs.src = "./images/CTA-ver+-modo-noc.svg"
    })

    function renderViewFavs(gifos, cont){
        let newGifoFavs,buttonfavs;
        let baseGifoFavs = gifos;
        //console.log('GifosFavs:',baseGifoFavs);
        maxListFavs = cont + 12;
        if(contGifosFavs){
            noFavorites.style.display="none";
            contentFavorites.style.display="block";
        }
        else{
            noFavorites.style.display="block";
            contentFavorites.style.display="none";
        }    
        if(maxListFavs > baseGifoFavs.length){
            maxListFavs = baseGifoFavs.length;
            btnMoreFavs.style.display="none";
        }else{
            btnMoreFavs.style.display="inline";
        }
        if(cont == 0) 
            listGifosFavs.innerHTML = '';
        for(let i=cont; i<maxListFavs; i++){
            newGifoFavs = document.createElement("li");
            newGifoFavs.classList.add("cardGifo")
            newGifoFavs.innerHTML = `<img class="imgFavs" src="${baseGifoFavs[i].images.original.url}" alt="${baseGifoFavs[i].title}"/>
                                    <div id="overlay" class="overlay">
                                        <div class="opcionGift">
                                            <button class="iconGifts"><img id="iconFavTrash${i}" src="./images/icon-trash-normal.svg" alt=""></button>
                                            <button id="buttonfavs${i}" class="iconGifts"><img id="iconFavLike${i}" src="./images/icon-fav.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconFavDownload${i}" src="./images/icon-download.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconFavMax${i}" src="./images/icon-max-normal.svg" alt=""></button>
                                        </div>
                                        <div class="infoGifo">
                                            <p>${baseGifoFavs[i].username}</p>
                                            <p>${baseGifoFavs[i].title}</p>
                                        </div>
                                    </div>`                                            
            listGifosFavs.appendChild(newGifoFavs);
            buttonfavs = document.getElementById(`buttonfavs${i}`);
            buttonfavs.style.display="none";
            interactionIconsFavs(i,baseGifoFavs,"Fav");
        }
    }

    let favSelected = [];
    function interactionIconsFavs(index,baseGifo,type){
        let iconFav = document.getElementById(`icon${type}Like${index}`);
        let iconTrash = document.getElementById(`icon${type}Trash${index}`);
        let iconDownload = document.getElementById(`icon${type}Download${index}`);
        let iconMax = document.getElementById(`icon${type}Max${index}`);

        //let favSelected = 0;
        iconFav.addEventListener('mouseover',() =>{
            if(favSelected[index] % 2 == 0)
                iconFav.src = "./images/icon-fav-hover.svg"
            else
                iconFav.src = "./images/icon-fav-active.svg" 
        })

        iconFav.addEventListener('mouseout',() =>{
            if(favSelected[index] % 2 == 0)
                iconFav.src = "./images/icon-fav.svg"
            else
                iconFav.src = "./images/icon-fav-active.svg"
        })

        iconFav.addEventListener('click',() =>{
            iconFav.src = "./images/icon-fav-active.svg"
            favSelected[index]++;
            //console.log('ClickFav')
            if(favSelected[index] % 2 != 0){
                contGifosFavs++;
                arrayGifosFavs.push(baseGifo[index]);
            }
            else{
                contGifosFavs--;
                for (let i = 0; i < arrayGifosFavs.length; i++) {
                    if(arrayGifosFavs[i].title === baseGifo[index].title){
                        arrayGifosFavs.splice(i,1);
                    } 
                } 
            }
            addFavorites(contGifosFavs, arrayGifosFavs);
            renderViewFavs(arrayGifosFavs, 0);
        })

        iconTrash.addEventListener('mouseover',() =>{
            iconTrash.src = "./images/icon-trash-hover.svg"
        })

        iconTrash.addEventListener('mouseout',() =>{
            iconTrash.src = "./images/icon-trash-normal.svg"
        })

        iconTrash.addEventListener('click',() =>{
            contGifosFavs--;
            for (let i = 0; i < arrayGifosFavs.length; i++) {
                if(arrayGifosFavs[i].title === baseGifo[index].title){
                    disLikeGifo(baseGifo,index);
                    arrayGifosFavs.splice(i,1);
                    break;
                } 
            }
            //console.log("Tresh",baseGifo[index].title)
            addFavorites(contGifosFavs, arrayGifosFavs);
            renderViewFavs(arrayGifosFavs, 0);
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
            resizeGifo(index,baseGifo,type);
            maxGifo.style.display="flex";
        })
    }

    function addFavorites(contGifosFavs, arrayGifosFavs){
        localStorage.setItem('contadorFavs', contGifosFavs);
        localStorage.setItem('gifosFavs', JSON.stringify(arrayGifosFavs));
    }

    function disLikeGifo(baseGifo,index){
        for (let i = 0; i < baseGifoTrending.length; i++) {
            if(baseGifo[index].title === baseGifoTrending[i].title){
                favSelected[i]--;
                let iconFav = document.getElementById(`iconTrenLike${i}`);
                iconFav.src = "./images/icon-fav.svg";
                break;
            }
            
        }
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

    function resizeGifo(index,baseGifo,type){
        if(type === "Tren"){
            imgMaxGifo.innerHTML = `<img class="maxImg" src="${baseGifo[index].images.original.url}" alt="${baseGifo[index].title}"/>
            <div class="descMaxGifo">
                <div class="infoGifo">
                    <p id="maxGifoUsername">${baseGifo[index].username}</p>
                    <p id="maxGifoTitle">${baseGifo[index].title}</p>
                </div>
                <div class="opcionGift">
                    <button class="iconGifts"><img id="icon${type}Like${index}" src="./images/icon-fav.svg" alt=""></button>
                    <button class="iconGifts"><img id="icon${type}Download${index}" src="./images/icon-download.svg" alt=""></button>
                </div>
            </div>`
            interactionIconsFavs(index,baseGifo,type);  
        }else{
            imgMaxGifo.innerHTML = `<img class="maxImg" src="${baseGifo[index].images.original.url}" alt="${baseGifo[index].title}"/>
            <div class="descMaxGifo">
                <div class="infoGifo">
                    <p id="maxGifoUsername">${baseGifo[index].username}</p>
                    <p id="maxGifoTitle">${baseGifo[index].title}</p>
                </div>
                <div class="opcionGift">
                    <button class="iconGifts"><img id="icon${type}Trash${index}" src="./images/icon-trash-normal.svg" alt=""></button>
                    <button class="iconGifts"><img id="icon${type}Download${index}" src="./images/icon-download.svg" alt=""></button>
                </div>
            </div>`
            interactionIconsFavs(index,baseGifo,type);  
        }
                              
    }
    //Favoritos - Fin

    //Trending - Inicio
    async function trendingGifo(){
        let response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=l3K24h2y7NIQeI3mg3iX8CLTVep7UdNt&limit=15&rating=g')
        let info = await response.json()
        //console.log('trendingGifosAPI',info)
        renderView(info)
    }

    let baseGifoTrending;
    function renderView(gifos){
        let newGifoTrending
        baseGifoTrending = gifos.data
        //console.log('Gifos:',baseGifoTrending);
        listTrendingGifos.innerHTML = ''; 
        for(let i=0; i<baseGifoTrending.length; i++){
            newGifoTrending = document.createElement("li");
            newGifoTrending.classList.add("cardGifo")
            newGifoTrending.innerHTML = `<img src="${baseGifoTrending[i].images.original.url}" alt="${baseGifoTrending[i].title}"/>
                                    <div id="overlay" class="overlay">
                                        <div class="opcionGift">
                                            <button id="buttonTrash${i}" class="iconGifts"><img id="iconTrenTrash${i}" src="./images/icon-trash-normal.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconTrenLike${i}" src="./images/icon-fav.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconTrenDownload${i}" src="./images/icon-download.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconTrenMax${i}" src="./images/icon-max-normal.svg" alt=""></button>
                                        </div>
                                        <div class="infoGifo">
                                            <p>${baseGifoTrending[i].username}</p>
                                            <p>${baseGifoTrending[i].title}</p>
                                        </div>
                                    </div>`                                            
            listTrendingGifos.appendChild(newGifoTrending);
            favSelected[i]=0
            iconTrash = document.getElementById(`buttonTrash${i}`);
            iconTrash.style.display="none";
            interactionIconsFavs(i,baseGifoTrending,"Tren");
        }
    }

    trendingGifo();

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