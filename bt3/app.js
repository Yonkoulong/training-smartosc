const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// select banner
const bannerBtn = $(".banner-btn .btn");
const bannerIcon = $(".banner-icon-mobile");

// select loan
const loan = $(".loan");
const sliderPrice = $("#sliderPrice");
const sliderMonth = $("#sliderMonth");
const curPriceTop = $(".current-price-top");
const curPriceBottom = $(".current-price-bottom");
const curMonthTop = $(".current-month-top");
const curMonthBottom = $(".current-month-bottom");
const inputs = $$(".loan-item-child input");
const formSelect = $(".form-select");
const btnActive = $(".loan-btn .btn-active");


// select plan
const plan = $(".plan");
const planContent = $(".plan-content");
const planList = $(".plan-list");
const planRotage = $(".plan-rotage");
var planNumber = 0;

// select request
const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

//select footer arrow
const footer = $("#footer");
const scrollTop = $(".footer__arrow");



const app = {
    plans: [
        {
            title: 1,
            money: '40.000.000',
            time: 24,
            income: '6.894.247',
            interest: '0,9',
            payment: '4.625.000',
        },
    ],

    // render interface
    renderPlan: function () {
        const htmls = this.plans.map((plan, index) => {

            return `
                        <div class="plan-item" data-index="${index}">
                        <div class="plan-item__header">
                            <h1 class="title">Phương án ${plan.title}</h1>
                            <img src="./assets/icons/close.png" alt="" class="icon-remove">
                        </div>
                        <div class="plan-item__body">
                            <div class="detail-row">
                                <p class="s-6">Số tiền vay (Đồng)</p>
                                <b class="">${plan.money}</b>
                            </div>
                            <div class="detail-row">
                                <p class="s-6">thời gian vay (Tháng)</p>
                                <b class="">${plan.time}</b>
                            </div>
                            <div class="detail-row">
                                <p class="s-6">Lãi suất(%/Tháng)</p>
                                <b class="">${plan.interest}</b>
                            </div>
                            <div class="detail-row">
                                <p class="s-6">Thu nhập tối thiểu (Đồng)</p>
                                <b class="">${plan.income}</b>
                            </div>
                        </div>
                        <div class="plan-item__footer">
                            <div class="detail-row">
                                <p class="s-6">Tiền gốc và lãi trả hàng tháng <br>(Đồng)</p>
                                <b class="">${plan.payment}</b>
                            </div>
                        </div>
                        <div class="plan-item__btn">
                            <button class="btn btn-primary">Xem chi tiết
                                <i class="fa-solid fa-angle-right"></i>
                            </button>
                            <button class="btn btn-outline">Đăng ký ngay</button>
                        </div>
                    </div>
                `
        })
        planList.innerHTML = htmls.join('')
    },

    // handle event plan
    handleEventPlan: function () {
        const _this = this;

        window.addEventListener('resize', wrappResize);

        // handle event when user change width
        function wrappResize() {
            resizeAddPlan();
            resizeDeletePlan();
        }

        //execute when length array == 3
        function resizeAddPlan() {
            const w = window.outerWidth;
            if (_this.plans.length == 3) {
                if (w < 1024) {
                    disabledPlanMobile();
                }
            }
        }

        //execute when length array < 3
        function resizeDeletePlan() {
            const w = window.outerWidth;
            if (w < 1024) {
                enablePlanMobile();
            }
        }

        // add plan
        planRotage.onclick = function () {
            const w = window.outerWidth;
            if (_this.plans.length < 3) {
                planNumber++;

                _this.plans.push({
                    title: 2,
                    money: '30.000.000',
                    time: 24,
                    income: '6.894.247',
                    interest: '0,9',
                    payment: '4.625.000'
                })
                _this.renderPlan();
                const planItems = document.querySelectorAll('.plan-item');
                const planItemWidth = planItems[0].offsetWidth;
                planList.scrollTo(planItemWidth * planNumber, 0)

                if (_this.plans.length == 3) {
                    if (w < 1024) {
                        disabledPlanMobile();
                    }
                }
            }
        }
        // end addPlan

        // delete plan
        planList.onclick = function (e) {
            const w = window.outerWidth;
            const planItem = e.target.closest('.plan-item');
            const iconDelete = e.target.closest('.icon-remove');

            if (_this.plans.length == 1) {
                iconDelete.onclick = function () {
                    alert('Cannot delete')
                }
            } else {
                iconDelete.onclick = function () {
                    planNumber--;
                    var indexTrace = Number(planItem.dataset.index);
                    _this.plans.splice(indexTrace, 1);
                    alert('delete success');
                    _this.renderPlan();
                    if (w < 1024) {
                        enablePlanMobile();
                    }
                }
            }
        }
        //end deletePlan

        //disabled Plan mobile
        function disabledPlanMobile() {
            if (_this.plans.length == 3) {
                const textAdd = document.querySelector(".text-add");
                const iconAdd = document.querySelector(".icon-add");
                textAdd.style.color = "var(--border-color)";
                iconAdd.style.filter = "invert(92%) sepia(12%) saturate(0%) hue-rotate(143deg) brightness(92%) contrast(91%)";
            }
        }

        // enabled Plan mobile
        function enablePlanMobile() {
            if (_this.plans.length < 3) {
                const textAdd = document.querySelector(".text-add");
                const iconAdd = document.querySelector(".icon-add");
                textAdd.style.color = "var(--primary-color)";
                iconAdd.style.filter = "invert(56%) sepia(88%) saturate(503%) hue-rotate(0deg) brightness(107%) contrast(106%)";
            }
        }
    },

    // loan calculate
    handleLoan: function () {
        // handle range price
        sliderPrice.oninput = () => {
            let value = parseInt(sliderPrice.value);
            let percentage = (value - sliderPrice.min) / (sliderPrice.max - sliderPrice.min) * 100
            sliderPrice.style.background = 'linear-gradient(to right, #FFAF00 0%, #FFAF00 ' + percentage + '%, #E5E6EA ' + percentage + '%, #E5E6EA 100%)'

            curPriceTop.textContent = value.toLocaleString().replaceAll(',', '.');
            curPriceBottom.textContent = value.toLocaleString().replaceAll(',', '.') + ' Đồng';
        }

        //handle range month
        sliderMonth.oninput = () => {
            let value = sliderMonth.value;
            curMonthTop.textContent = value;
            curMonthBottom.textContent = value + ' Tháng';

            let percentage = (value - sliderMonth.min) / (sliderMonth.max - sliderMonth.min) * 100
            sliderMonth.style.background = 'linear-gradient(to right, #FFAF00 0%, #FFAF00 ' + percentage + '%, #E5E6EA ' + percentage + '%, #E5E6EA 100%)'

        }
    },

    //dynamic button when action loan calculate
    dynamicDisable: function () {
        const _this = this;
        const w = window.outerWidth;

        if (sliderPrice.value > 0 && sliderMonth.value > 1 && formSelect.value > 0) {
            btnActive.classList.add("btn-primary");
            btnActive.classList.remove("btn-active");
            const btnPrimary = document.querySelector(".btn-primary");
            btnPrimary.onclick = function () {

                if (window.getComputedStyle(plan).display === "none") {
                    console.log('step 1');
                    plan.style.display = "block";
                }
                else if (plan.style.display === "block" && _this.plans.length < 3) {
                    console.log('step 2');
                    planNumber++;

                    _this.plans.push({
                        title: 2,
                        money: '30.000.000',
                        time: 24,
                        income: '6.894.247',
                        interest: '0,9',
                        payment: '4.625.000'
                    })

                    _this.renderPlan();
                    const planItems = document.querySelectorAll('.plan-item');
                    const planItemWidth = planItems[0].offsetWidth;
                    planList.scrollTo(planItemWidth * planNumber, 0);
                }
                else {
                    if (w >= 1024) {
                        console.log('step 3');
                        plan.style.display = "none";
                    }
                }
            }
        }

        else {
            btnActive.classList.remove("btn-primary");
            btnActive.classList.add("btn-active");
        }
    },

    //handleScroll
    handleScroll: function () {
        //scroll to Loan Calculate
        bannerBtn.onclick = function () {
            window.scrollTo({
                top: loan.offsetTop
            });
        }

        //scroll to bottom 
        bannerIcon.onclick = function () {
            window.scrollTo({
                top: footer.offsetTop
            })
        }

        //scroll to top
        scrollTop.onclick = function () {
            window.scroll(0, 0);
        }
    },

    // request
    handleActive: function () {
        tabs.forEach((tab, index) => {
            const pane = panes[index];

            tab.onclick = function () {
                const tabActive = $(".tab-item.active");
                const panActive = $(".tab-pane.active")

                tabActive.classList.remove("active");
                panActive.classList.remove("active");

                tab.classList.add("active");
                pane.classList.add("active");

            }
        })
    },

    start: function () {
        //handle calcualte loan
        this.handleLoan();

        //handle tabs at request-content
        this.handleActive();

        //run handle scroll
        this.handleScroll()

        //render plan
        this.renderPlan();

        //handle plan event
        this.handleEventPlan();
    }
}

app.start();

