const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStar = false, isDragging = false, prevPageX,prevScrollLeft, positionDiff;



const showHideIcon = () =>{
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    // showing and hiding prev/next icon accroding to carousel scroll left value
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcon (),60); // calling showHideIcon after 60ms
    })
});

const autoSlide = () =>  {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;
    positionDiff = Math.abs(positionDiff);// making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // get diference value that need to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft){ // if is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : positionDiff;
    }
    // if is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : positionDiff;
}

const DragStar = (e) => {
    // Updatating global variables value on mouse down event
    isDragStar = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStar) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touchend[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcon();
}
const dragStop = () => {
    isDragStar = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();

}

carousel.addEventListener("mousedown",DragStar);
carousel.addEventListener("touchstar",DragStar);


carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("touchmove",dragging);


carousel.addEventListener("mouseup",dragStop);

carousel.addEventListener("mouseleave",dragStop);
carousel.addEventListener("touchend",dragStop);