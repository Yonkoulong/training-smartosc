$( document ).ready(function() {
    const S = document.querySelector.bind(document);
    const SS = document.querySelectorAll.bind(document);
    
    const sliderPrice = S('#sliderPrice');
    const sliderMonth = S('#sliderMonth');
    const curPriceTop = S('.current-price-top');
    const curPriceBottom = S('.current-price-bottom');
    const curMonthTop = S('.current-month-top');
    const curMonthBottom = S('.current-month-bottom');
    const inputRange = $('.input-range');
    const priceRange = $('#sliderPrice');
    
    const app = {
    
        // handleLoan: function() {
    
        //     // set style progress
        //     inputRange.on('input', (e) => {
        //         const $this = e.target;
        //         const value = e.target.value;
        //         let percentage = (value-$this.min)/($this.max-$this.min)*100
        //         $this.style.background = 'linear-gradient(to right, #FFAF00 0%, #FFAF00 ' + percentage + '%, #fff ' + percentage + '%, white 100%)'
        //     })

        //     priceRange.on('input', (e) => {
        //         const $value = e.target.value;
        //         let value = parseInt($value);
             
        //         curPriceTop.textContent = value.toLocaleString().replaceAll(',', '.');
        //         curPriceBottom.textContent = value.toLocaleString().replaceAll(',', '.') + ' Đồng';
        //     })
    
        // },
    
    
    
        start: function() {
    
            // this.handleLoan();

            this.handlePlan();
        }
    }
    
    app.start();
    
});
