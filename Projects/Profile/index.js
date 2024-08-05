let showMoreBtn = document.querySelector(".show-more");
let showMoreDropdown = document.querySelector(".show-more-dropdown");
let showProfileBtn = document.querySelector('.show-profile-btn');
let secondaryProfile = document.querySelector('.profile-secondary');
let documentBody = document.querySelector('body');




let handleShowMore = function () {
    if (showMoreBtn.classList.contains('active')) {
        showMoreBtn.classList.remove('active');
        showMoreDropdown.classList.add('hidden');
    } else {
        showMoreBtn.classList.add('active');
        showMoreDropdown.classList.remove('hidden');
    }
}

showMoreBtn.addEventListener('click', handleShowMore);

let handleShowProfile = function () {
    if (showProfileBtn.classList.contains('active')) {
        showProfileBtn.classList.remove('active');
        secondaryProfile.classList.remove('active');
    } else {
        showProfileBtn.classList.add('active');
        secondaryProfile.classList.add('active');
    }
}

showProfileBtn.addEventListener('click', handleShowProfile);

let hideProfile = function () {
    if (secondaryProfile.classList.contains('active')) {
        showProfileBtn.classList.remove('active');
        secondaryProfile.classList.remove('active');
    }
}

document.addEventListener('click', function (e) {
    console.log(e.pageX);
    if (e.pageX >= 352) {
        hideProfile();
    }
})