    //1. handle menu bar: open and close

    const s = document.querySelector.bind(document);
    const ss = document.querySelectorAll.bind(document);

    const menuBar = s('.header__menu');
    const sideBar = s('.header__sidebar');
    const close = s('.close-icon');
    const sideBar__item = ss('.header__sidebar--item-link');
    const arrowTop  = s('.footer__arrow');

    

    const app = {

        handleSidebar: function() {    
            //open menuBar
            menuBar.onclick = function() {
                sideBar.style.width = "100%";
            }

            // close menuBar
            close.onclick = function() {
                sideBar.style.width = "0";
            }
            
            // close menuBar when click a tag
            sideBar__item.forEach( function(element, number) {
                element.onclick = function() { 
                    sideBar.style.width = "0";
                }
            })
            
            //scroll to top
            arrowTop.onclick = function() {
                window.scroll(0, 0);
            }
        },  
        


        start: function() {
            //handle these function in here
            this.handleSidebar();
        }
    }    

    app.start();

    