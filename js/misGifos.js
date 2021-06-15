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
    let noMyGifos = document.getElementById('noMyGifos');
    let contentMyGifos = document.getElementById('content-MyGifos');
    let listMyGifos = document.getElementById('listMyGifos');
    let btnMoreMyGifos = document.getElementById('btnMoreMyGifos');
    let imgBtnMoreMyGifos = document.getElementById('img-btnMoreMyGifos');
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
    let storageMyGifos = [];
    let storageContMyGifos = parseInt(localStorage.getItem('contMyGifos'));
    
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

    //Mis Gifos - Inicio
    let contGifosMyGifos = 0
    let gifosAdded = [];
    let arrayMyGifos = [];
    let arrayMyGifosInfo = [];
    let maxListMyGifos = 0;

    MyGifos(contGifosMyGifos);
    function MyGifos(contMyGifos){
        if(storageContMyGifos){
            gifosAdded = JSON.parse(localStorage.getItem('myGifos'));
            contGifosMyGifos = storageContMyGifos;
            arrayMyGifos = gifosAdded;
            renderViewMyGifos(gifosAdded,contMyGifos);
        }else{
            noMyGifos.style.display="block";
            btnMoreMyGifos.style.display="none";
        }      
    }

    //Boton ver mas gifos
    btnMoreMyGifos.addEventListener('click', ()=>{
        MyGifos(maxListMyGifos)
    })
    imgBtnMoreMyGifos.addEventListener('mouseover',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgBtnMoreMyGifos.src = "./images/CTA-ver-mas-hover.svg"
        else
            imgBtnMoreMyGifos.src = "./images/CTA-ver+hover-modo-noc.svg"
    })
    imgBtnMoreMyGifos.addEventListener('mouseout',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO")
            imgBtnMoreMyGifos.src = "./images/CTA-ver-mas.svg"
        else
            imgBtnMoreMyGifos.src = "./images/CTA-ver+-modo-noc.svg"
    })

    
    async function renderViewMyGifos(gifos, cont){
        let newMyGifo,buttonMyGifo;
        let baseMyGifo = gifos;
        //console.log('GifosFavs:',baseGifoFavs);
        maxListMyGifos = cont + 12;
        if(contGifosMyGifos){
            noMyGifos.style.display="none";
            contentMyGifos.style.display="block";
        }
        else{
            noMyGifos.style.display="block";
            contentMyGifos.style.display="none";
        }    
        if(maxListMyGifos > baseMyGifo.length){
            maxListMyGifos = baseMyGifo.length;
            btnMoreMyGifos.style.display="none";
        }else{
            btnMoreMyGifos.style.display="inline";
        }
        if(cont == 0) 
            listMyGifos.innerHTML = '';
        for(let i=cont; i<maxListMyGifos; i++){
            newMyGifo = document.createElement("li");
            newMyGifo.classList.add("cardGifo")
            let response = await fetch(`https://api.giphy.com/v1/gifs/${baseMyGifo[i]}?api_key=l3K24h2y7NIQeI3mg3iX8CLTVep7UdNt`)
            let info = await response.json();
            newMyGifo.innerHTML = `<img class="imgMyGifo" src="${info.data.images.original.url}" alt="${info.data.title}"/>
                                    <div id="overlay" class="overlay">
                                        <div class="opcionGift">
                                            <button class="iconGifts"><img id="iconMyTrash${i}" src="./images/icon-trash-normal.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconMyDownload${i}" src="./images/icon-download.svg" alt=""></button>
                                            <button class="iconGifts"><img id="iconMyMax${i}" src="./images/icon-max-normal.svg" alt=""></button>
                                        </div>
                                        <div class="infoGifo">
                                            <p>${info.data.username}</p>
                                            <p>${info.data.title}</p>
                                        </div>
                                    </div>`                                            
            listMyGifos.appendChild(newMyGifo);
            arrayMyGifosInfo.push(info);
            interactionIconsMyGifo(i,info,"My");
        }
    }

    let favSelected = [];
    async function interactionIconsMyGifo(index,info,type){
        let iconTrash = document.getElementById(`icon${type}Trash${index}`);
        let iconDownload = document.getElementById(`icon${type}Download${index}`);
        let iconMax = document.getElementById(`icon${type}Max${index}`);

        iconTrash.addEventListener('mouseover',() =>{
            iconTrash.src = "./images/icon-trash-hover.svg"
        })

        iconTrash.addEventListener('mouseout',() =>{
            iconTrash.src = "./images/icon-trash-normal.svg"
        })

        iconTrash.addEventListener('click',() =>{
            contGifosMyGifos--;
            for (let i = 0; i < arrayMyGifos.length; i++) {
                if(arrayMyGifosInfo[i].data.images.original.url === info.data.images.original.url){
                    arrayMyGifos.splice(i,1);
                    arrayMyGifosInfo.splice(i,1);
                    break;
                } 
            }
            addMyGifos(contGifosMyGifos, arrayMyGifos);
            renderViewMyGifos(arrayMyGifos, 0);
        })

        iconDownload.addEventListener('mouseover',() =>{
            iconDownload.src = "./images/icon-download-hover.svg"
        })

        iconDownload.addEventListener('mouseout',() =>{
            iconDownload.src = "./images/icon-download.svg"
        })

        iconDownload.addEventListener('click',() =>{    
            let urlGifo = info.images.original.url;
            console.log('urlGifo',urlGifo);
            downloadFile(urlGifo, `${info.title}`);
        })

        iconMax.addEventListener('mouseover',() =>{
            iconMax.src = "./images/icon-max-hover.svg"
        })

        iconMax.addEventListener('mouseout',() =>{
            iconMax.src = "./images/icon-max-normal.svg"
        })

        iconMax.addEventListener('click',() =>{
            resizeMyGifo(index,info,type);
            maxGifo.style.display="flex";
        })
    }

    function addMyGifos(contGifosMyGifos, arrayMyGifos){
        localStorage.setItem('myGifos', JSON.stringify(arrayMyGifos));
        localStorage.setItem('contMyGifos', contGifosMyGifos);
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

    function resizeMyGifo(index,info,type){
        imgMaxGifo.innerHTML = `<img class="maxImg" src="${info.data.images.original.url}" alt="${info.data.title}"/>
                                    <div class="descMaxGifo">
                                    <div class="infoGifo">
                                        <p id="maxGifoUsername">${info.data.username}</p>
                                        <p id="maxGifoTitle">${info.data.title}</p>
                                    </div>
                                    <div class="opcionGift">
                                        <button class="iconGifts"><img id="iconMyTrash${index}" src="./images/icon-trash-normal.svg" alt=""></button>
                                        <button class="iconGifts"><img id="iconMyDownload${index}" src="./images/icon-download.svg" alt=""></button>
                                    </div>
                                </div>`
        interactionIconsMyGifo(index,info,type)                      
    }
    //Mis Gifos - Fin

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
            interactionIcons(i,baseGifoTrending);
        }
    }

    let contFavs = 0;
    let gifosFavs = [];
    function interactionIcons(index,baseGifo){
        let iconFav = document.getElementById(`iconTrenLike${index}`);
        let iconDownload = document.getElementById(`iconTrenDownload${index}`);
        let iconMax = document.getElementById(`iconTrenMax${index}`);

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

    function addFavorites(contGifosMyGifos, arrayMyGifos){
        localStorage.setItem('contadorFavs', contGifosMyGifos);
        localStorage.setItem('gifosFavs', JSON.stringify(arrayMyGifos));
    }

    function resizeGifo(index,baseGifo,type){
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
        interactionIcons(index,baseGifo,type);                        
    }

    trendingGifo();

    //Flechas de desplazamiento
    let right = 0;
    BtnNextTren.addEventListener('click', ()=>{
        if(right <= 2970)
            right += 990;
        else
            right = 0;
        listTrendingGifos.style.right= `${right}px`;    
    })

    BtnPrevTren.addEventListener('click', ()=>{
        if(right > 0)
            right -= 990;
        else
            right = 3960;
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