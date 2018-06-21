import {find} from './utils.js';

const canvas = find('canvas');
const ctx = canvas.getContext('2d');

const database = [];
database.getNewest = () => database[database.length - 1];

function saveBlob() {
  canvas.toBlob(blob => {
    database.push(blob);
  });
}

function loadBlob(blob) {
	// Default to latest save.
	if (!blob) {
		blob = database.getNewest();
	}

	// Create a <img>
	const img = new window.Image();

  // Prepare load event for when we set the src
  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0);
    // No longer need to read the blob so it's revoked #perf
    URL.revokeObjectURL(url);
  });

  var url = URL.createObjectURL(blob);
  img.src = url;
}

// Draws an image onto a canvas context from a data URL.
function drawDataURL(context, url) {
	const img = new Image();
  img.addEventListener('load', () => {
    context.drawImage(img, 0, 0);
  });
  img.src = url;
}

// Function loadURL(url) {
//   if (!url) {
//     console.log('loadUrl but no url, taking blob to url')
//     blobToDataURL(database.getNewest(), url => loadURL(url))
//     return
//   }
//   drawDataURL(ctx, url)
// }

function clear() {
  console.log('clear');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function save() {
  saveBlob();
}

// Function backup() {
//   const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
//   const json = JSON.stringify(imageData.data)
//   window.prompt(`Here's your painting:`, json)
// }

function load() {
  loadBlob();
}

function download(event) {
	const link = event.currentTarget;
	link.href = canvas.toDataURL();
	link.download = 'painting.png';
	// Return `<a href="${canvas.toDataURL()}" download="painting.png">download</a>`
}

// Function createImage() {
//   const src = saveBlob()
//   return `<img src="${src}">`
// }

export default {
	clear,
	save,
	load,
	download
};
