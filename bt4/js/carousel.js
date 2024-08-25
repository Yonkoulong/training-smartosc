$.fn.jqueryCarousel = function(options) {
    var defaults = {
        speed: 0.5,
        pause: 2000,
        // adaptiveHeight: true,
    };
    
    options = $.extend(defaults, options);

    let positionX = 0;
    let index = 0;
    var timer;

    const actions = (function() {
        
        return {

            init(el) {
                this.getViewport(el);
            },
            
            getViewport(el) {
                const wrapper = $("<div/>", { class: "carousel-wrapper" });
                const viewport = $("<div/>", { class: "carousel-viewport"});
                
                $(viewport)
                .append(this.addIndicators(el))
                .prepend(this.addBtnPrev(el))
                .append(this.addItems(el))
                .append(this.addBtnNext(el))
                
                $(wrapper).append(viewport);
                $(el).append(wrapper);  
               
                this.windowLoad(el);
                this.addCloneSilde(el);
                this.handleResizeUI(el);
            },

            windowLoad(el) {
                $(window).on("load", () => {
                    let positionClone = 0;
                    positionClone = positionClone - $('.slider-cloned:first-child img').width();
                    $(el).find('.slider-list').css('left', positionClone);
                    this.resHeightImg(el)
                })
            }, 

            resHeightImg(el) {  
                const image = $(el).find("li img");
                const viewport = $(el).find(".carousel-viewport");
                viewport.css({'height': $(image[index+1]).height()});
            },

            addItems(el) {
                const sliderMain = $("<div/>", { class: "slider-main"});
                const slideList = $(el).find('ul').addClass("slider-list");
                $(el).find('ul li').addClass("slider-item");
                $(sliderMain).append($(el).find(slideList))
                return sliderMain;
            },

            addBtnNext(el) {
                const itagNext = $("<i/>", { class: "fa-solid fa-angle-right icon-next"});
                return itagNext;
            },
            
            addBtnPrev(el) {
                const itagPrev = $("<i/>", { class: "fa-solid fa-angle-left icon-prev"});
                return itagPrev;
            },

            addIndicators(el) {
                const carouselDots = $("<ul/>", { class: "carousel-dots"})
                const sliderItem = $(el).find("li");
                for(let i = 0; i < sliderItem.length; i++) {
                    const dot = $("<li/>", { class: "dot"}).attr("data-index", i);
                    $(carouselDots).append(dot);
                }
                return carouselDots;
            },
            
            addCloneSilde(el) {
                const firstSlide = $(el).find(".slider-item:first-child");
                const lastSlide = $(el).find(".slider-item:last-child");
                $(firstSlide).before(lastSlide.clone().addClass("slider-cloned"));
                $(lastSlide).after(firstSlide.clone().addClass("slider-cloned"));
            },
            
            handleActiveIndicators(el) {  
                const sliderItemWidth = $(el).find('li img').width();
                $(".dot:first-child").addClass("active");
                const dots = $(el).find(".dot");

                for(let i = 0; i < dots.length; i++){

                    $(dots[i]).on("click", (e) => {
                        //remove active dot
                        for(let i = 0; i < dots.length; i++){
                            $(dots[i]).removeClass("active");
                        }

                        //add active dot
                        $(e.target).addClass("active");
                        $(".slider-item").addClass("active");
                        const dotIndex = parseInt(e.target.dataset.index);
                        index = dotIndex;
                        this.resHeightImg(el)
                        positionX = -1 * index * sliderItemWidth;
                        this.transitionSlide(1, el); 
                        console.log("index:" + index);
                    })
                }
            },

            toggleIndicators(el) {
                const dots = $(el).find('.dot');

                 //remove active dot
                 for(let i = 0; i < dots.length; i++){
                    $(dots[i]).removeClass("active");
                }     

                //add active dot           
                $(dots[index]).addClass("active");
            },

            nextSlide(el) {
                $(el).find(".icon-next").on('click', () => { 
                    this.handleMoveSlide(1, el);
                })
            },

            prevSlide(el) {
                $(el).find(".icon-prev").on('click', () => { 
                    this.handleMoveSlide(-1, el);
                })
            },

            handleMoveSlide(direction, el) {
                
                if(timer) return;

                if (direction === 1) {
                    this.moveSlideNext(el)

                } else if (direction === -1) {
                    this.moveSlidePrev(el)
                }
                this.toggleIndicators(el);
            },

            moveSlideNext(el) {
                const sliderItemWidth = $(el).find('.slider-item img').width();
                const slideslength = $(el).find(".slider-item").length; 

                if (index == slideslength - 3) {
                    positionX = positionX - sliderItemWidth;
                    this.transitionSlide(1, el);
                    positionX = 0;

                    timer = setTimeout(()=>{
                        this.transitionSlide(-1, el);
                        timer = 0;
                    }, 500)

                    index = 0;
                    this.resHeightImg(el)
                }else{
                    index++;
                    positionX = positionX - sliderItemWidth;
                    this.resHeightImg(el)
                    this.transitionSlide(1, el);
                }  
            },

            moveSlidePrev(el) {
                const sliderItemWidth = $(el).find('.slider-item img').width();
                const slideslength = $(el).find(".slider-item").length; 

                index--;

                    if (index < 0) {
        
                        index = slideslength - 3;
                        positionX = positionX + $('.slider-item img').width();
                        this.resHeightImg(el)
                        this.transitionSlide(1, el);
                        positionX = -1 * index * sliderItemWidth;    

                        timer = setTimeout(() => {
                            this.transitionSlide(0, el);
                            timer = 0;
                        }, 500)

                    } else {
                        positionX = positionX + $('.slider-item img').width();
                        this.resHeightImg(el)
                        this.transitionSlide(1, el);
                    }
            },

            transitionSlide(status, el) {

                if(status === 1) {

                    $(el).find('.slider-list').css({
                        "transform": `translateX(${positionX}px)`,
                        "transition": `transform ${options.speed}s linear` 
                    })
                } else if(status === -1) {

                    $(el).find('.slider-list').css({
                        "transform": `translateX(0px)`,
                        "transition": "none" 
                    })
                } else {

                    $(el).find('.slider-list').css({
                        'transform':  `translateX(${positionX}px)`,
                        "transition": "none" 
                    });
                }
            },

            handleResizeUI(el) {
                const $this = this;
                $(window).on("resize", () => {

                    //handle width view when resize
                    let viewport = $(el).find(".carousel-viewport").width();
                    positionX = -1 * viewport * index;
                    $(el).find('.slider-list').css('transform', `translateX(${positionX}px)`);
                    this.hideClone(el)
                    //handle height view when resize
                    $this.resHeightImg(el);
                })
            },

            handleSwipeSlide(el) {
                const $this = this;
                const sliders = $(el).find(".slider-list");
                const slider = $(el).find(".slider-item");

                let isDown = false;
                let initialPosition;
                let posX1;
                let posX2;
                let finalPosition;

                if(timer) return;

                $(sliders).on("mousedown touchstart", (e) => {
                    isDown = true;
                    dragStart(e);
                });
                
                $(sliders).on("mousemove touchmove", (e) => {
                    if(!isDown) return;
                    dragMove(e);
                });
               
                $(sliders).on("mouseup touchend", (e) => {
                    isDown = false;
                    dragEnd(e);
                });

                $(sliders).on("mouseleave touchcancle", (e) => {
                    isDown = false;
                    dragCancle(e);
                });
                
                function dragStart(e) {                    
                    $(el).find(".slider-list").addClass("grapping");
                    initialPosition = sliders.offset().left;

                    if (e.type == "mousedown") {
                        posX1 = e.screenX + initialPosition;

                    } else if(e.type == "touchstart") {
                        if(e.touches.length !== 1) return;
                        posX1 = e.originalEvent.touches[0].screenX + initialPosition;
                        console.log("step 1");
                    }

                }

                function dragMove(e) {
                    
                    if(e.type == "mousemove") {
                        e.preventDefault();
                        let x2 = e.screenX + sliders.offset().left; 
                        let moving = x2 - posX1;

                        console.log("moving: ", moving);

                        slider.css({
                            "transform": `translateX(${moving}px)`,
                            "transition": "transform .2s linear"
                        })
                       
                    } else if(e.type == "touchmove") {

                        if(e.touches.length !== 1) return;              
                        e.preventDefault();
                        let x2 = e.touches[0].screenX + sliders.offset().left; 
                        let moving = x2 - posX1;
                        console.log("moving: ", moving);

                        slider.css({
                            "transform": `translateX(${moving}px)`,
                            "transition": "transform .2s linear"
                        })
                    }
                }

                function dragEnd(e) {
                    $(el).find(".slider-list").removeClass("grapping");
                    

                    if(e.type == "mouseup") {
                        posX2 = e.screenX + sliders.offset().left; 
                        finalPosition = posX2 - posX1;

                        if(finalPosition < -200) {
                            $this.moveSlideNext(el);

                        } else if (finalPosition > 200) {
                            $this.moveSlidePrev(el);
                            
                        }

                    } else if(e.type == "touchend") {
                        posX2 = e.originalEvent.changedTouches[0].screenX + sliders.offset().left;
                        finalPosition = posX2 - posX1;
                        console.log(finalPosition);
                        if(finalPosition < -100) {
                            $this.moveSlideNext(el);    

                        } else if (finalPosition > 100) {
                            $this.moveSlidePrev(el);

                        }
                    }

                    $this.toggleIndicators(el);
                    //restart move slide
                    dragCancle(e);
                }

                function dragCancle(e) {
                    slider.css({
                        "transform": `translateX(0px)`,
                        "transition": "transform .5s linear"
                    })
                }
            },

            handleEvents(el) {
                this.nextSlide(el);
                this.prevSlide(el);
                this.handleActiveIndicators(el);
                this.handleSwipeSlide(el);
            },
        }
    })();

    return this.each(function() {
        const el = $(this);
        actions.init(el);
        actions.handleEvents(el);
    });
};
