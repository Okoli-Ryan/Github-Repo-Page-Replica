const repoEl = (name, desc, colorcode, stars, forks, update) => {
	const descEl = () => (desc ? `<div class="desc">${desc}</div>` : `<div class="none"></div>`);
	const colorEl = () =>
		colorcode
			? `<div class="primary-code align flex">
    <div class="primary-code-color"></div>
    <span class="primary-code-name">${colorcode.name}</span>
</div>`
			: `<div class="none"></div>`;
	const updated = () =>
		update ? `<div class="updatedAt align flex">Updated at ${update.toString().trim(0, 10)}</div>` : `<div class="none"></div>`;
	const starEl = () =>
		stars
			? `<div class="stars align flex">
    <img src="star.svg" class="star" alt="" /><span class="star-number"
        >${stars}</span
    >
</div>`
			: `<div class="none"></div>`;

	const forkEl = () =>
		forks
			? `<div class="forks align flex">
<img src="fork.svg" alt="" /><span class="fork-number">${forks}</span>
</div>`
			: `<div class="none"></div>`;

	return `<div class="repo flex">
<div class="repo-left flex">
    <div class="repo-name">${name}</div>
    ${descEl()}
    <div class="details flex">
        ${colorEl()}
        ${starEl()}
        ${forkEl()}
        ${updated()}
    </div>
</div>
<div class="repo-right align flex">
    <button class="star-button flex align">
        <img src="star.svg" class="star" alt="" /><span
            id="star-butt"
            class="star-number"
            >Star</span
        >
    </button>
</div>
</div>`;
};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		db = JSON.parse(xhttp.responseText);
		const repoArray = db.repositories.nodes;

		const a = document.querySelectorAll('.pic');
		a.forEach((el) => {
			el.setAttribute('src', db.avatarUrl);
		});

		document.querySelector('.name').innerHTML = db.name;
		document.querySelectorAll('.login').forEach((el) => (el.innerHTML = db.login));
		document.querySelector('.bio').innerHTML = db.bio;
		let repoList = ``;
		repoArray.forEach((el) => {
			repoList += repoEl(
				el.name,
				el.description,
				el.primaryLanguage,
				el.stargazerCount,
				el.forkCount,
				el.updatedAt
			);
		});
		document.querySelector('#find-repo').insertAdjacentHTML('afterend', repoList);
		document
			.querySelectorAll('.primary-code-color')
			.forEach((el, i) => (el.style.backgroundColor = repoArray[i].primaryLanguage.color));
	}

};

xhttp.open('GET', 'http://localhost:4000', true);
xhttp.send();
