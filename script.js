// আপনার কপি করা নতুন Web App URL এখানে বসান
const scriptURL = 'https://script.google.com/macros/s/AKfycbybB9KbPb1sHlbWTaEGXGN2h9aXlUME5VSG-VGi-8wLwrCq0zTsYVWw3gjW5t9tZqF8/exec';
const form = document.getElementById('orderForm');
const successMessage = document.getElementById('successMessage');

// ১. টাইমার লজিক (২০ মিনিটের জন্য)
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(document.getElementById('minutes')) document.getElementById('minutes').textContent = minutes;
        if(document.getElementById('seconds')) document.getElementById('seconds').textContent = seconds;
        if (--timer < 0) timer = duration;
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    startTimer(60 * 20);

    // ২. অর্ডার ফর্ম সাবমিশন লজিক
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = "প্রসেস হচ্ছে...";

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                alert('ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।');
                form.reset();
                form.style.display = 'none'; // ফর্ম হাইড হবে
                successMessage.classList.remove('hidden'); // সাকসেস মেসেজ দেখাবে
                submitBtn.disabled = false;
                submitBtn.innerHTML = "অর্ডার কনফার্ম করুন";
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                submitBtn.disabled = false;
                submitBtn.innerHTML = "অর্ডার কনফার্ম করুন";
            });
    });

    // ৩. স্মুথ স্ক্রলিং
    document.querySelectorAll('a[href^="#"], .grid-order-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector('#order');
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
let slideIndex = 0;
let autoTimer;

showSlides(); // Start slider

// Next/Previous controls
function plusSlides(n) {
    clearTimeout(autoTimer); // Manual click korle auto bondho hobe temporarily
    slideIndex += n;
    let slides = document.getElementsByClassName("my-slide");
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    displaySlides(slideIndex);
}

// Dot controls
function currentSlide(n) {
    clearTimeout(autoTimer);
    displaySlides(slideIndex = n);
}

function displaySlides(n) {
    let i;
    let slides = document.getElementsByClassName("my-slide");
    let dots = document.getElementsByClassName("dot");
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    
    // Resume auto play
    autoTimer = setTimeout(showSlides, 4000); 
}

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("my-slide");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    autoTimer = setTimeout(showSlides, 4000); // Proticulture 4 sec por change hobe
}