const header = document.querySelector('header');
window.onscroll = () => {
    if (window.scrollY > 0) {
        header.setAttribute('id','header-scroll');
    } else {
        header.removeAttribute('id','header-scroll');
    }
};
const language__text = document.querySelector(".head__language-text");
var check = true;
function language() {
    check=!check;
    if(check) {
        language__text.innerHTML = "VN";
    }
    if(check==false){
        language__text.innerHTML = "US";
    }
}



const slide__tablet = document.querySelectorAll(".slide__main__img");
if (window.innerWidth >= 1024){
}
else{
    slide__tablet.forEach(element=>{
        var newSrc = element.getAttribute("data-src").replace(".jpg", "t.jpg");
        element.setAttribute("data-src", newSrc);
        console.log(element.getAttribute("data-src"));
        element.style.backgroundImage = `url(${element.getAttribute("data-src")})`;
    })
}



const project__main_img = document.querySelector(".project__main-img");
const project__main_text = document.querySelector(".project__main-text");

const chuyen_max = 4;
var chuyen = 1;

img_duan = [
    "img/duan1.jpg",
    "img/duan2.jpg",
    "img/duan3.jpg",
    "img/duan4.jpg"
]


function project_next(){
    chuyen++;
    if(chuyen>chuyen_max){chuyen=1;}
    project__main_img.style.backgroundImage=`url(${img_duan[chuyen-1]})`;
    if(chuyen%2==0){
        project__main_img.id="project__main-img--click";
        project__main_text.id="project__main-text--click";
    }
    else{
        project__main_img.removeAttribute("id");
        project__main_text.removeAttribute("id");
    }
}






const form = document.getElementById("form");
const location__value = document.getElementById("location");
const decorate = document.querySelector(".contact__main-right--before");
const error_note = document.querySelector(".contact__main-right--ask__note");
const input = document.querySelectorAll(".contact__main-right--ask__input");
const error = document.querySelectorAll(".contact__main-right--ask__error");

input.forEach((element, i) => {
    element.onfocus=function(){
        decorate.setAttribute("id","contact__main-right--before__focus");
        error[i].style.display="none";
        element.removeAttribute("id","input__error");
        error_note.style.display="none";
    }
    element.onblur=function(){
        decorate.removeAttribute("id","contact__main-right--before__focus");
    }
})
form.onsubmit = function(i){
    i.preventDefault();
    var check_submit = true;
    input.forEach((element,index) => {
        if(element.value==""){
            error[index].style.display="block";
            element.setAttribute("id","input__error");
            check_submit=false;
        }
        error_note.style.display="block";
    })
    if(check_submit){
        let data = {
            'entry.1429125587':input[0].value,
            'entry.438064827':input[1].value,
            'entry.119624009':location__value.value,
        }
        
        let queryString = new URLSearchParams(data);
        queryString = queryString.toString();

        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe3dDwPqPshp-OYhoGNDb0Ik2dVgJnR-hrBXfVvx_yPQ9sFKw/formResponse', true);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(queryString);
        input[0].value="";
        input[1].value="";
        location__value.value="Hà Nội";
        console.log(error_note.textContent="Gửi yêu cầu thành công");
        error_note.style.color="green";
        error_note.style.display="block";
    }
}






const project__number = document.querySelectorAll(".project__data-item--number");
let project__number_max = [];
project__number.forEach((element,index) => {
    project__number_max[index]=element.innerHTML;
})
const observer__project = new IntersectionObserver(element=>{
    element.forEach(entry=>{
        const {target} = entry;
        if(entry.isIntersecting){
            nayso();
            observer__project.unobserve(target);
        }
    })
},{})
function nayso(){
    project__number.forEach((element, index) => {
    let currentValue = 0;
    const targetValue = project__number_max[index];
    const increment = Math.ceil(targetValue / 500); // Tăng dần 0.2% giá trị max mỗi 10ms
    
    const intervalId = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            clearInterval(intervalId);
            currentValue = targetValue;
        }
        element.innerHTML = currentValue; // Hiển thị giá trị tăng dần cho phần tử tương ứng
    }, 20);
    });
}
project__number.forEach(lazyLoad =>{
    observer__project.observe(lazyLoad);
})


const feedback__company_img = document.querySelectorAll(".feedback__company-img");
const feedback__main = document.querySelectorAll(".feedback__main");
const slide__main = document.querySelectorAll(".slide__main");
var feedback__main__chack = 50;
var feedback__company_img__chack = 50;
if (window.innerWidth >= 1024){
    feedback__main__chack = 50;
    feedback__company_img__chack = 20;
}
else if(window.innerWidth >=740 && window.innerWidth <1024){
    feedback__main__chack = 100;
    feedback__company_img__chack = 33.33333;
}
else{
    feedback__main__chack = 100;
    feedback__company_img__chack = 50;
}
feedback__company_img.forEach(element=>{
    let i = parseInt(element.getAttribute("data-left")) || 0;
    element.style.left = `${i*feedback__company_img__chack}%`;
})
feedback__main.forEach(element=>{
    let i = parseInt(element.getAttribute("data-left")) || 0;
    element.style.left = `${i*feedback__main__chack}%`;
})
slide__main.forEach(element=>{
    let i = parseInt(element.getAttribute("data-left")) || 0;
    element.style.left = `${i*100}%`;
})
slide__next(feedback__company_img,feedback__company_img__chack,"block",4000);
slide__next(feedback__main,feedback__main__chack,"flex",10000);
slide__next(slide__main,100,"block",8000);
function slide__next(item,position,display,time) {
    setInterval(() => {
        item.forEach((element,index)=>{
            i = parseInt(element.getAttribute("data-left")) || 0;
            i--;
            if(i<-1){
                i=item.length-2;
                element.style.display="none";
                setTimeout(() => {
                    element.style.display=`${display}`;
                }, 500);
            }
            element.style.left = `${i*position}%`;
            element.setAttribute("data-left", i.toString());
        })
    }, time);
}
feedback__company_img.forEach((element)=>{
    let data_src = element.getAttribute("data-src");
    element.addEventListener("mouseover", function() {
        let data_src1 = data_src.replace(".png", "1.png");
        element.style.backgroundImage = `url("${data_src1}")`;
    });
    element.addEventListener("mouseout", function() {
        element.style.backgroundImage = `url("${data_src}")`;
    });
})
const an_lazy = document.querySelectorAll('.an_lazy');
const observer_an = new IntersectionObserver(element=>{
    element.forEach(entry=>{
        const {target} = entry;
        if(entry.isIntersecting){
            target.id="active_load";
            observer_an.unobserve(target);
        }
    })
},{})
an_lazy.forEach(lazyLoad=>{
    observer_an.observe(lazyLoad);
})


const menu__main = document.querySelector('.menu__main');
const menu__main_list = document.querySelectorAll('.menu__main--item__ul');
var menu__main_checked = false;
var menu__main_list_checked = false;
function menu__mobile(){
    menu__main_checked=!menu__main_checked;
    if(menu__main_checked==true){
        menu__main.id = "menu--on";
    }
    else{
        menu__main.removeAttribute("id","menu--on");
    }
}
function menu__mobile_list(element){
    menu__main_list_checked=!menu__main_list_checked;
    if(menu__main_list_checked==true){
        menu__main_list[element].style.display="block";
    }
    else{
        menu__main_list[element].style.display="none";
    }
}
