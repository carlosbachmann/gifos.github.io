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
    //Container Gifos
    let imgRecorded = document.getElementById("imgRecorded");
    let videoRecorded = document.getElementById("videoRecorded");
    let overlay = document.getElementById("overlay"); 
    let iconDownload = document.getElementById("iconDownload"); 
    let iconLink = document.getElementById("iconLink");
    let boxMakeGifoTitle = document.getElementById("boxMakeGifoTitle");
    let boxMakeGifoSubtitle = document.getElementById("boxMakeGifoSubtitle");
    let imgCamara = document.getElementById("imgCamara");
    let imgPelicula = document.getElementById("imgPelicula");
    //Process
    let number1 = document.getElementById("number1");
    let number2 = document.getElementById("number2");
    let number3 = document.getElementById("number3");
    //Timer
    let timer = document.getElementById("timer");
    let hour = document.getElementById("hour");
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");
    //Button Record
    let btnRecord = document.getElementById("btnRecord");

    //Iniciar variables
    let recorder, streaming;
    let form = new FormData();
    let arrayMyGifos = [];
    let totalSeconds,interval;

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
            imgCamara.src = "./images/camara-modo-noc.svg";
            imgPelicula.src = "./images/pelicula-modo-noc.svg";
            btnRecord.style.color = "white";
        }    
        else{    
            modeNoc.innerHTML = "MODO NOCTURNO";
            logo.src = "./images/logo-desktop.svg";
            imgMakeGifo.src = "./images/CTA-crear-gifo-active.svg";
            iconFB.src = "./images/icon_facebook.svg";
            iconIG.src = "./images/icon_instagram.svg";
            iconTW.src = "./images/icon-twitter.svg";
            imgCamara.src = "./images/camara.svg";
            imgPelicula.src = "./images/pelicula.svg";
            btnRecord.style.color = "#572EE5";
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

    //Button Record
    btnRecord.addEventListener('mouseover', ()=>{
        btnRecord.style.backgroundColor = "#572EE5";
        btnRecord.style.color = "white";
    })

    btnRecord.addEventListener('mouseout',() =>{
        if(modeNoc.textContent == "MODO NOCTURNO"){
            btnRecord.style.backgroundColor = "transparent";
            btnRecord.style.color = "#572EE5";
        }
        else{
            btnRecord.style.backgroundColor = "transparent";
            btnRecord.style.color = "white";
        }
    })


    function loadStorage(){
        if(localStorage.getItem('myGifos')){
            arrayMyGifos = JSON.parse(localStorage.getItem('myGifos'));
        }
    }

    loadStorage();

    btnRecord.addEventListener('click', cameraAccess);

    function cameraAccess(){
        number1.style.backgroundColor = "#572EE5"
        number1.style.color = "white"
        boxMakeGifoTitle.innerHTML = '¿Nos das acceso<br>a tu camara?';
        boxMakeGifoSubtitle.innerHTML = 'El acceso a tu camara será valido sólo<br>por el tiempo en que estes creando el gifo';
        getStreamAndRecord();
    }

    function getStreamAndRecord(){
        navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream){
            boxMakeGifoTitle.innerHTML = '';
            boxMakeGifoSubtitle.innerHTML = '';
            videoRecorded.classList.add('showVideo');
            videoRecorded.srcObject = stream;
            videoRecorded.play();
            number1.style.backgroundColor = "transparent";
            number1.style.color = "#572EE5"
            number2.style.backgroundColor = "#572EE5"
            number2.style.color = "white"
            streaming = stream;
            btnRecord.innerHTML = "GRABAR";
            btnRecord.removeEventListener('click', cameraAccess);
            btnRecord.addEventListener('click', startRecording);
        })
        .catch(function(err){
            console.log("Something went wrong!")
        });
    }

    function startRecording(){
        recorder = null;
        totalSeconds = 0;
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        interval = setInterval(setTime, 1000);
        recorder = RecordRTC(streaming,{
            type: 'gif',
            frameRate: 1,
            quality:10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function(){
                console.log('started');
                btnRecord.innerHTML = 'FINALIZAR';
            },
            onGifPreview: function(gifURL){
                imgRecorded.src = gifURL;
            }
        });

        recorder.startRecording();
        recorder.camera = streaming;
        passValueRecorder()
        console.log('recorder2', recorder);
        console.log('streaming', streaming);
    }

    function passValueRecorder(){
        btnRecord.removeEventListener('click', startRecording);
        btnRecord.addEventListener('click', stopRecordingIntermediate)
    }

    function stopRecordingIntermediate(){
        console.log('recorder', recorder);
        resetInterval();
        recorder.stopRecording(stopRecordingCallback);
    }

    function stopRecordingCallback(){
        videoRecorded.classList.remove('showVideo');
        imgRecorded.classList.add('showImg');
        timer.innerHTML = "REPETIR CAPTURA";
        timer.style.textDecoration = "underline";
        timer.style.textDecorationColor = "#4EE3C0";
        timer.style.marginLeft = "340px"
        btnRecord.innerHTML = 'SUBIR GIFO';
        number2.style.backgroundColor = "transparent";
        number2.style.color = "#572EE5"
        number3.style.backgroundColor = "#572EE5"
        number3.style.color = "white"
        imgRecorded.src = URL.createObjectURL(recorder.getBlob());
        form.append('file', recorder.getBlob(), 'myGifo.gif');
        btnRecord.removeEventListener('click', stopRecordingIntermediate);
        timer.addEventListener('click', () =>{
            imgRecorded.classList.remove('showImg');
            number3.style.backgroundColor = "transparent";
            number3.style.color = "#572EE5"
            timer.innerHTML = `<label id="hour">00</label><label>:</label><label id="minutes">00</label><label>:</label><label id="seconds">00</label>`;
            timer.style.textDecoration = "none";
            timer.style.marginLeft = "420px"
            cameraAccess();
        });
        btnRecord.addEventListener('click', () =>{
            let send = fetch(`http://upload.giphy.com/v1/gifs?api_key=l3K24h2y7NIQeI3mg3iX8CLTVep7UdNt&file=${form}`, {method: 'POST', body: form});
            send.then(
                (sucess) =>{
                    return sucess.json();
                }
            ).then(
                (response) => {
                    arrayMyGifos.push(response.data.id);
                    localStorage.setItem('myGifos', JSON.stringify(arrayMyGifos));
                    localStorage.setItem('contMyGifos', arrayMyGifos.length);
                    gifoUp(response.data.id)
                }
            )    
        })
        recorder.camera.stop();
        recorder.destroy();
        recorder = null;
        console.log("Fin");
    }

    async function gifoUp(Mygifo){
        btnRecord.style.display = "none";
        overlay.style.display = "block";

        let response = await fetch(`https://api.giphy.com/v1/gifs/${Mygifo}?api_key=l3K24h2y7NIQeI3mg3iX8CLTVep7UdNt`)
        let info = await response.json();
        let urlGifo = info.data.images.original.url;
        console.log('urlGifo',urlGifo);

        iconDownload.addEventListener('click',() =>{    
            downloadFile(urlGifo, `${info.data.title}`);
        })

        iconLink.addEventListener('click',() =>{
            var copyUrl = document.createElement('textarea');
            copyUrl.value = urlGifo;
            copyUrl.setAttribute('readonly', '');
            copyUrl.style = {position: 'absolute', left: '-9999px'};
            document.body.appendChild(copyUrl);
            copyUrl.select();
            document.execCommand('copy');
            document.body.removeChild(copyUrl);
            alert("Gifo copiado en portapapeles");
        }) 
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

    function setTime(){
        totalSeconds++;
        seconds.innerHTML = pad(totalSeconds%60);
        minutes.innerHTML = pad(parseInt(totalSeconds/60));
    }

    function pad(val){
        let valueString = val + "";
        if(valueString.length < 2){
            return "0" + valueString;
        }else{
            return valueString;
        }
    }

    function resetInterval(){
        clearInterval(interval);
    }

}