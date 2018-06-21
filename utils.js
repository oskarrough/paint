// Shortcuts to find DOM elements.
const find = document.querySelector.bind(document);
const findAll = document.querySelectorAll.bind(document);

// A utility function to calculate relative click positions.
function point(node, event) {
	const rect = node.getBoundingClientRect();
	return {
		x: event.clientX - rect.left - node.clientLeft,
		y: event.clientY - rect.top - node.clientTop
	};
}

// Converts a data URL to a new Blob
function dataURLtoBlob(dataurl) {
	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {type: mime});
}

// Converts a blob to a data URL
function blobToDataURL(blob, callback) {
	const a = new FileReader();
	a.addEventListener('load', e => {
    callback(e.target.result);
	});
  a.readAsDataURL(blob);
}

export {find, findAll, point, dataURLtoBlob, blobToDataURL};
