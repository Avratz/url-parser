import '../css/main.css';
/**
 * Summary: This function parses an url using the format that is passed as an argument.
 * @param {String} fullUrl the url to parse
 * @param {String?} urlFormatString the url format to parse the url with
 * @return {Object} the parsed url ordered by keys and values
 */
function parseUrlByUrlFormat(fullUrl, urlFormatString = '/:version/api/:collection/:id') {
	try {
		if (!fullUrl.includes('/')) {
			throw new Error('Must be a valid url');
		}
		if (!urlFormatString.includes('/')) {
			throw new Error('Must be a valid url format string');
		}

		const parsedUrl = {};
		const valueEmpty = (value) => value !== '';

		let [url, extra] = fullUrl.trim().split('?').filter(valueEmpty);

		extra
			?.split('&')
			.filter(valueEmpty)
			.forEach((item) => {
				const [key, value] = item.split('=');
				if (value === undefined) {
					return undefined;
				}
				parsedUrl[key] = value.trim();
			});

		//split url and urlFormatString by / and filter empty values
		const urlFormatStringSplitted = urlFormatString.split('/').filter(valueEmpty);
		const urlSplitted = url.split('/').filter(valueEmpty);

		if (urlFormatStringSplitted.length !== urlSplitted.length) {
			throw new Error('Url format and url must have the same number of segments');
		}
		// search the variables parts of the urlFormatString and match them with the url
		urlFormatStringSplitted.forEach((item, index) => {
			//if item dont starts with : returns
			if (item[0] !== ':') return undefined;

			const key = item.slice(1);
			const value = urlSplitted[index] !== undefined ? urlSplitted[index] : '';
			parsedUrl[key] = value.trim();
		});

		return parsedUrl;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		return { error: error.message };
	}
}

//selectors
const formatUrl = document.querySelector('#urlFormat');
const urlInput = document.querySelector('#url');
const form = document.querySelector('form');

// listen to submit event on form
form.addEventListener('submit', (event) => {
	event.preventDefault();
	const $resultElement = document.querySelector('#result');
	$resultElement.innerHTML = JSON.stringify(
		parseUrlByUrlFormat(urlInput.value, formatUrl.value),
		null,
		2,
	);
	$resultElement.classList.remove('hidden');
});
