let KEY = "cFo02eFI8bV1QuOdU0Ceb74nX8aXx3lY4JXjJWdwrGYZZEDFsFj519dl"
let URL = "https://api.pexels.com/v1/search?query="
let options = {
	method: "GET",
	headers: { "Authorization": KEY },
};
let photosContainer = document.querySelector(".photos")
let page = 1
let topics = ["Nature", "Programming", "Cat", "Chocolate", "People", "Cars", "Planet", "Flowers", "Dog"]
let topicsElement = document.querySelector(".header__second ul")
let form = document.querySelector(".header__first form")
let input = document.querySelector(".header__first input")
let showMore = document.querySelector(".show-more")
let openImage = document.querySelector(".open-image")
let searchedText = "nature"
let lastPhoto = document.querySelector(".last-photo img")

topicsElement.addEventListener("click", (event) => {
	if (event.target.closest("li")) {
		photosContainer.innerHTML = ""
		searchedText = event.target.innerHTML
		getPhoto(searchedText, page).then(photos => renderPhoto(photos))
	}
})

form.addEventListener("submit", (event) => {
	event.preventDefault()
	searchedText = input.value
	if (input.value != "") {
		photosContainer.innerHTML = ""
		getPhoto(input.value, page).then(photos => renderPhoto(photos))
	}
})

showMore.addEventListener("click", () => {
	page++
	getPhoto(searchedText, page).then(photos => renderPhoto(photos))
})





function renderTopics() {
	topics.forEach(element => { topicsElement.innerHTML += `<li>${element}</li>` })

}

async function getPhoto(request, page) {
	let res = await fetch(`${URL + request}&page=${page}&per_page=10`, options)
	let photos = await res.json()
	return photos
}

function renderPhoto(data) {
	let { page, photos } = data
	photos.forEach(element => {
		photosContainer.innerHTML += `<div class="photos__item">
			<div class="photos__item-container">
        		<img src=${element.src.portrait} alt="">
			</div>	
    </div>`
	});
}

renderTopics()

photosContainer.addEventListener("click", (event) => {
	let clickedPhotoContainer = event.target.closest(".photos__item-container")
	let clickedPhoto = event.target.closest("img")

	if (clickedPhoto && clickedPhotoContainer) {
		clickedPhotoContainer.classList.toggle("show")
		openImage.classList.toggle("show")
		lastPhoto.src = clickedPhoto.src
		saveLastPhoto(clickedPhoto.src)
	}
})

function saveLastPhoto(imgPath) {
	localStorage.setItem("last-photo", imgPath)
}

function getLastPhoto() {
	let lastPhotoImgPath = localStorage.getItem("last-photo")

	if (lastPhotoImgPath) {
		lastPhoto.src = lastPhotoImgPath
	}
}

getLastPhoto()

getPhoto("nature", page).then(photos => renderPhoto(photos))

