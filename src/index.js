'use strict';
console.log('Hello');

import searchImage from './apiService.js';

import imageList from './hbsTemplates/imageList.hbs';

import '../node_modules/material-design-icons/iconfont/material-icons.css';

import './styles.css';

const _ = require('lodash');

const refs = {
	pageBody: document.querySelector('#page-body'),

	searchForm: document.querySelector('#search-form'),

	searchImageInput: document.querySelector('#image-search'),

	imageGallery: document.querySelector('#gallery'),

	loadMoreBtn: document.querySelector('#load-more-btn'),
};

const scrollToNextPage = {
	heigth: 0,
	get heightChange() {
		return this.heigth;
	},
	set heightChange(number) {
		return (this.heigth = number);
	},
};
console.log(refs.pageBody.clientHeight);

refs.searchImageInput.addEventListener(
	'input',
	_.debounce(searchFormHandler, 1500)
);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchFormHandler(e) {
	e.preventDefault();

	if (refs.imageGallery.innerHTML != '') {
		tagCleaner();
		return tagAdder();
	} else {
		return tagAdder();
	}
}

function insertImageInfoGallery(item) {
	refs.imageGallery.insertAdjacentHTML('beforeend', item);
}

function buildGalleryMarkup(item) {
	return imageList(item);
}

function tagCleaner() {
	refs.imageGallery.innerHTML = '';
}

function tagAdder() {
	const inputValue = refs.searchImageInput.value;
	searchImage.searchQuery = inputValue;
	searchImage.fetchImages().then(hits => {
		const markup = buildGalleryMarkup(hits);
		insertImageInfoGallery(markup);
		console.log(hits);
	});
}

function loadMoreBtnHandler() {
	searchImage.fetchImages().then(hits => {
		console.log(document.querySelector('#gallery').offsetHeight);
		scrollToNextPage.heightChange = document.querySelector(
			'#gallery'
		).offsetHeight;

		const markup = buildGalleryMarkup(hits);
		insertImageInfoGallery(markup);
		window.scrollTo({ top: scrollToNextPage.heightChange, behavior: 'smooth' });
		scrollToNextPage.heightChange = document.querySelector(
			'#gallery'
		).offsetHeight;
		console.log(scrollToNextPage.heigth);
	});
}
