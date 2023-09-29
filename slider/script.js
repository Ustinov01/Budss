const slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    dots = document.querySelectorAll('.dot'),
    activeDotColor = 'red';

let currentIndex = 0;

function slide(wrapper, items, prev, next) {
    let posInitial,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 1,
        allowShift = true;

    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');


    items.style.left = -(slideSize) + "px";


    prev.addEventListener('click', function () { shiftSlide(-1); });
    next.addEventListener('click', function () { shiftSlide(1); });


    dots.forEach((dot, dotIndex) => {
        dot.addEventListener('click', () => {
            goToSlide(dotIndex);
        });
    });


    items.addEventListener('transitionend', checkIndex);

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = items.offsetLeft; }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        }

        allowShift = false;
        updateDots();
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }


    function goToSlide(index) {
        if (index >= 0 && index < slidesLength && index !== currentIndex) {
            items.style.left = -(slideSize * (index + 1)) + "px";
            currentIndex = index;
            updateDots();
        }
    }

    function updateDots() {
        dots.forEach((dot, dotIndex) => {
            dot.style.backgroundColor = (dotIndex === currentIndex) ? activeDotColor : '';
        });
    }

    updateDots();
}

slide(slider, sliderItems, prev, next);
