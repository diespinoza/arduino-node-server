var url = require("url");
var parsedURL = url.parse("https://www.notion.so/Software-Engineering-Bootcamp-4b107d3c8e344de1942ac13f606cd633?p=4bfab898cd0c4508af3a9ab439c706f5");

console.log(parsedURL.protocol);
console.log(parsedURL.host);
console.log(parsedURL.query);
