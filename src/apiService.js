const baseUrl = 'https://pixabay.com/api/';
const MyAPIKey = '17820819-7325a21fc26dbd04468dfd17d';
export default {
	pageNumber: 1,
	query: '',
	fetchImages() {
		const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.pageNumber}&per_page=12&key=${MyAPIKey}`;

		return fetch(baseUrl + requestParams)
			.then(response => response.json())
			.then(parsedResponse => {
				this.incrementPageNumber();
				return parsedResponse;
			});
	},
	get searchQuery() {
		return this.query;
	},
	set searchQuery(string) {
		this.query = string;
	},
	incrementPageNumber() {
		this.pageNumber += 1;
	},
};
