'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const cookieButton = document.querySelectorAll('.button-cookie'),
        closer = document.querySelector('.cookie-close'),
        cookie = document.querySelector('.cookie'),
        scrollblock = document.querySelector('.scrollmenu');


    //cookie block

    function closeCookie(trigger, modal) {
        if (trigger.length > 0) {
            trigger.forEach(item => {
                item.addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            })
        } else {
            trigger.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
    }
    closeCookie(cookieButton, cookie);
    closeCookie(closer, cookie);


    // cookie block showing

    function showCookie(modal) {
        modal.classList.add('active');
    }

    setTimeout(() => {
        showCookie(cookie);
    }, 3000);


    //topmenu fixed

    function topScroll(block) {
        window.addEventListener("scroll", function () {

            if (scrollY >= 50) {
                block.style.position = "fixed";
                block.style.top = "0";
            } else {
                block.style.position = "absolute";
                block.style.top = "38px";
            }
        });
    }

    topScroll(scrollblock);



    $(document).ready(function () {

        $.validator.addMethod("phoneValidation", function (value, element) {
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            return this.optional(element) || phoneRegex.test(value);
        }, "Please enter a correct phone number");

        //form validate

        $('.modal-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    phoneValidation: true
                },
                email: {
                    required: true,
                    email: true
                },
                company: {
                    required: false
                },
                website: {
                    required: false
                }
            }
        });

        //flag mask

        const input = document.querySelector("#phone");
        const iti = window.intlTelInput(input, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js",
            separateDialCode: true,
            initialCountry: "ru",
            autoPlaceholder: "off",
            placeholderNumberType: "MOBILE",
            formatOnDisplay: true,
        });


    });




    //modal

    function bindModals(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelectorAll(closeSelector),
            overlay = document.querySelector('.overlay');



        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                overlay.style.display = 'block';
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';


            });
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        close.forEach(item => {
            item.addEventListener('click', () => {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            });
        });
    }


    bindModals('[data-modal]', '#modalForm', '[data-close]');




    //button style by validation


    function changeButtonClassByValidaton() {
        const requiredInputs = document.querySelectorAll('.required');
        const submitBtn = document.getElementById('submit');

        requiredInputs.forEach(input => {
            input.addEventListener('input', checkInputs);
        });

        function checkInputs() {
            let allFilled = true;
            requiredInputs.forEach(input => {
                if (input.value.trim() === '') {
                    allFilled = false;
                }
            });

            if (allFilled) {
                submitBtn.classList.remove('button-disactive');
            } else {
                submitBtn.classList.add('button-disactive');
            }
        }
    }

    changeButtonClassByValidaton();




    //form submit
    function submitForm() {
        const modalForm = document.getElementById('modalForm'),
            modalMiniForm = document.getElementById('thanks'),
            overlay = document.querySelector('.overlay'),
            form = document.querySelector('.modal-form');



        modalForm.addEventListener('submit', function (e) {
            e.preventDefault();


            modalForm.style.display = 'none';
            modalMiniForm.style.display = 'block';

            setTimeout(function () {
                modalMiniForm.style.display = 'none';
                overlay.style.display = 'none';
                form.reset();
                modalForm.style.display = 'block';
            }, 1500);
        });
    }

    submitForm();




    const menu = document.querySelector('.menu'),
        hamburger = document.querySelector('.hamburger'),
        closeMenu = document.querySelector('.menu-close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('menu-active');
    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove('menu-active');
    });
});






