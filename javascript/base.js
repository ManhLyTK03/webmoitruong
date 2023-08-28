const lazyLoad = document.querySelectorAll('[data-src]');
const observer = new IntersectionObserver(element=>{
    element.forEach(entry=>{
        const {target} = entry;
        if(entry.isIntersecting){
            target.style.backgroundImage = `url(${target.getAttribute("data-src")})`;
            observer.unobserve(target);
        }
    })
},{})
lazyLoad.forEach(lazyLoad=>{
    observer.observe(lazyLoad);
})