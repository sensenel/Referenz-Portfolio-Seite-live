'use-strict'

/*
 * INFO: 
 * Normalerweiise werden styles und JS zu Gunsten der Performance "ge'minified" / komprimiert
 * Als Referenz und für die Lesbarkeit habe ich diese Files so belassen.
 * Ch. Gabler
*/

/*var's*/
    //headerArr von script.js
    //imgrArr von script.js
    //contentHeader von script.js

    let imgLayer = $('#img-layer'),
        view = $('#view'),
        currentImg = '',
        body = document.getElementById('body'),
        imageWrapper = document.getElementsByClassName('image-wrapper'),
        directLinks = document.getElementsByClassName('direct-links'),
        headerFxEnter = new TimelineMax({paused: true}),
        headerFxLeave = new TimelineMax({paused:true}),
        imgFade = new TimelineMax({paused:true});
    

    headerFxEnter.set(imgLayer, { x: '0%' , willChange:"transform"})
                .to(imgLayer, 0.5, { x: '100%', delay: 0.3, ease: Power3.easeOut});

    headerFxLeave.set(imgLayer, { x: '-100%', willChange:"transform"})
                .to(imgLayer, 0.5, { x: '0%', delay: 0.2, ease: Power3.easeOut});

                
    document.addEventListener("DOMContentLoaded", function(event) {
        
        window.onload = function() {

            window.requestAnimationFrame(function() {      
                
                //Header-Image Slider reveal
                    directLinks[0].addEventListener('mouseenter', () => {        
                        headerFxEnter.restart();
                        headerFxLeave.progress(1, true); //immernoch Hänger bei den Tweens manchmal; evtl hiermit besser (?)
                    });
                    directLinks[0].addEventListener('mouseleave', () => {
                        headerFxLeave.restart();
                    });

                //END ----> Header-Image Slider reveal

                //image-wrapper to header transition Unterseiten
                getTop = el => el.offsetTop + (el.offsetParent && getTop(el.offsetParent));
                
                var imgWrapTransTop = getTop(imageWrapper[0]);             
                
                if(window.addEventListener){
                    window.addEventListener('resize', (imgWrapTransTop) => { //imgWrapTransTop als param übergeben um on the fly zu initialisieren
                        imgWrapTransTop = getTop(imageWrapper[0]);
                        console.log(imgWrapTransTop);                        
                        return imgWrapTransTop;// imgWrapTransTop zurückgeben für headderArr event click
                    });
                }
                let imgWrapTrans = new TimelineMax({paused:true});  
             
                /**
                 * nur so ist imgWrapper immer gleich platziert und rückt bei klick auf unterseite auf top 0!
                 * window listener resize erstellt dynamisch imgWrapTransTop, übergibt ab headerArr eventlistener 
                 * und erstellt DANN den tween
                 */

                headerArr.forEach((el, i) => {
                    el.addEventListener('click', (e) => {
                        //sicher gehen, dass imgs sichtbar bleiben bei click:
                            imgLayer.remove();
                            imgArr[i].style.opacity = '1';
                        //detail body class add
                            body.classList.remove('start');
                            body.classList.add('detail');

                        imgWrapTrans.fromTo(imageWrapper, 1, {top: imgWrapTransTop}, {top: 0, 'width': '100%', 'height': '370px', ease: Power3.easeOut}, "imgTransMarker")
                                    .fromTo(view, 1.7, {y: 600}, {y: -70, ease: Power4.easeOut}, "imgTransMarker")                            
                                    .fromTo(view, 0.7, {alpha: 0}, {alpha: 1, ease: Power4.easeIn}, "imgTransMarker+=0.3")
                                    .to($('header .profil'), 0.5, {y: -30, x: -30, scale: 0.7}, "imgTransMarker+=0.2");
                                    /**
                                     * async await f. contentElemente nicht möglich; alternativ über css transitions - siehe styles.css
                                     */

                        imgWrapTrans.restart().timeScale(1);
                    });
                });

            //ProfilBild Animation

                /*jQurery*/
                $('.profil-item--container').append('<div class="itemBckgr"></div>');
                /*END ---> jQurery*/

                let profil = document.getElementsByClassName('profil'),
                    profilLinks = document.getElementsByClassName('profil-links'),
                    itmBgCss = CSSRulePlugin.getRule('.itemBckgr'),
                    itemBckground = [... document.querySelectorAll('.itemBckgr')],
                    profilItemContainer = [... document.querySelectorAll('.profil-item--container')],
                    profilChilds = [... document.querySelectorAll('.profil-item')],
                    tl = new TimelineMax({paused:true});

                tl.staggerFromTo(
                    profilItemContainer, 1, {x: 0, y: -40}, {x: -40, y: -10},0.5, "start")
                .staggerFromTo(
                    profilItemContainer, 2.5, {scale: 0}, {scale: 0.8}, 0.2, "start")
                .to(profilLinks, 1, { 
                    transformOrigin: "40px 40px", rotation: -180, scale: 1, x: 10, y: 40, ease: Power2.easeIn}, "start+=0.1")
                .staggerTo(
                    profilChilds, 0.5, {rotation: -180}, 0.2, "start+=0.3")
                .to(
                    itemBckground, 0.7, {borderRadius: "5%", stagger: 0.2, ease: Power4.easeIn}, "start+=0.15")
                .to(
                    itemBckground, 1.2, {rotation: 630, stagger: 0.15}, "start+=0.35")
                .to(
                    itmBgCss, 0.3, {"border-color": "rgba(255,255,255,0)", stagger: 0.2}, "start+=0.7")
                .to(
                    itmBgCss, 0.6, {"background": "rgba(255,255,255,1)", stagger: 0.4}, "start+=0.8")
                .to(
                    itemBckground, 0.4, {scaleX: 0.05, scaleY: 2, stagger: 0.2}, "start+=1.5")
                .fromTo(
                    profilChilds, 0.3, {alpha: 0.3, scale: 0, 'width': '0px'}, {alpha: 1, scale: 1, 'width': '180px', stagger: 0.25}, "start+=1.8")
                .to(
                    itemBckground, 0.2, {left: "-100%", stagger: 0.15})
                .to(
                    itemBckground, 0.2, {scaleY: 5.25, x: -65, stagger: 0.1}, "start+=2.2")
                .to(
                    itemBckground, 0.1, {scaleY: 0, stagger: 0.15}, "start+=2.9");

                
                profil[0].addEventListener('mouseenter', (e) => {
                    if(!body.classList.contains('skills')) {
                        tl.restart().timeScale(1.5);
                        profilLinks[0].classList.add('stop'); // wg BorderPing Animation              
                    }
                });
                
                profil[0].addEventListener('mouseleave', (e) => {
                    if(!body.classList.contains('skills')) {
                        tl.reverse();            
                        profilLinks[0].classList.remove('stop');
                    }
                });


            //END --> ProfilBild Animation

            // skills Overlay animation

            let skillBtn = $('#skills'),
                skillClose = $('#skill-close'),
                skillSet = document.getElementById('skill-set'),
                skillLoader = document.getElementById('skill-loader'),
                skillAngles = [$('.angle.top-left'), $('.angle.top-right'), $('.angle.bottom-left'), $('.angle.bottom-right')],
                skillTl = new TimelineMax({ paused: true });
                                
                const showSkillSet = () => {
                    progRun("start"); // siehe jQuery helpers script.js
                    
                    // SKill-counter
                    for(let i = 1; i <=15; i++) {
                        let start; // erster step zum timestamp
                        const el = document.getElementById('count-' + i); // get element
                        const final = parseInt(el.textContent, 10); //finale number parsen 
                        let duration = (final * 100) / 3 ; // duration in ms und je nach höhe von final unterschiedlich lang                     
                        const step = ts => {
                        if (!start) {
                            start = ts;
                        }
                        // Zeitfragment je duration
                        let progress = (ts - start) / duration;
                        
                        el.textContent = Math.floor(progress * final) + '%'; // set the text
                            if (progress < 1) {
                                // falls nicht 100% complete, request weiteren animationframe
                                requestAnimationFrame(step);
                            }
                        }    
                        // start animation
                        requestAnimationFrame(step);
                    }
                    // END --> SKill-counter                  
                }


                    skillTl.set(skillLoader, {'background': 'transparent'})
                            .fromTo(
                                skillAngles, .1, {scale: 0, alpha: 0}, {scale: 1, alpha: 1}, "start")
                            .fromTo(
                                skillLoader, .3, {'width': '0px', 'height': '0px'}, {'width': '60px', 'height': '60px', ease: Power4.easeOut}, "start")
                            .fromTo(
                                skillLoader, 0.8, {rotate: 0}, {rotate: 360, ease: Power4.easeOut}, "start+=0.1")                        
                            .fromTo(
                                skillLoader, .1, {'background': 'tranparent'}, {'background': '#fff', repeat: 8 }, "start+=0.8")
                            .set(skillLoader, {'background': 'transparent'})
                            .fromTo(
                                skillLoader, .5, {'top': 'calc(100vh / 2 - 50px)', 'left': 'calc(100vw / 2 - 50px)'}, 
                                                {'top': 'calc(100vh / 2 - 380px)', 'left': 'calc(100vw / 2 - 492px)'}, "start+=1.1")
                            .fromTo(
                                skillLoader, 1, {'width': '50px', 'height': '50px'}, {'width': '1044px', 'height': '788px', ease: Power4.easeOut}, "expand")
                            .fromTo(
                                skillSet, .7, {alpha: 0, scale: 0}, {alpha: 1, scale: 1, ease: Power2.easeIn, onComplete: showSkillSet}, "expand+=0.2");
                
                // vars für bei skillTl start jQuery toggled classes entfernen:
                let mnuBtn = document.getElementById('mnu-button'),
                    navContentA = [... document.querySelectorAll('.nav-content a')];
                
                skillBtn[0].addEventListener("click", (e) => {

                    body.classList.add('skills');

                    if(body.classList.contains('mnu-open')) {
                        body.classList.remove('mnu-open');
                        mnuBtn.classList.remove('open');
                        navContentA.forEach(el => el.classList.remove('init'));
                    }

                    skillTl.restart();
                });

                skillClose[0].addEventListener('click', () => {
                    body.classList.remove('skills');
                    progRun("reverse"); // siehe jQuery helpers script.js
                    skillSet.style.cssText = 'opacity: 0; transform: scale(0);';
                    //skillTl.progress(0).pause();
                    skillTl.reverse(1.4, false)
                });


            // END ---> skills Overlay animation

           });

           // CodeWars Logo parallax hover
            var request = null;
            var mouse = { x: 0, y: 0 };
            var cx = window.innerWidth / 2;
            var cy = window.innerHeight / 2;
        
            $('.nav-content').mousemove(function(event) {
          
                mouse.x = event.pageX;
                mouse.y = event.pageY;
            
                cancelAnimationFrame(request);
                request = requestAnimationFrame(update);	
            });
        
            function update() {
          
                dx = mouse.x - cx;
                dy = mouse.y - cy;
        
                tiltx = (dy / cy);
                tilty = - (dx / cx);
                radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
                degree = (radius * 300);
                TweenLite.to(".codewars-img", 1, {transform:'rotate3d(' + (tiltx / 8) + ', ' + tilty + ', 0, -' + degree + 'deg)', ease:Power2.easeOut});
            }
            
            $(window).resize(function() {
                cx = window.innerWidth / 2;
                cy = window.innerHeight / 2;
            });	
            // END ---> CodeWars Logo parallax hover

            //von unterseiten zurück auf Start reagieren die timelines manchmal nicht-deswegen bei onload reset
            setTimeout(() =>{
/*                 headerFxEnter.progress(0, true);
                headerFxLeave.progress(0, true); */
                body.classList.add('ready');
            }, 100);

        };
    });
