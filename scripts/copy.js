import cpy from 'cpy';

await cpy([
	'src/popup.html',
	'src/manifest.json', 
	'src/nopointer.css', 
	'src/popup.css', 
], 'dist',  {flat: true});
