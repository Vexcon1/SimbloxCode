const url = require('url');
const urlObj = url.parse(req.url, true);

if (urlObj.query.code) {
href = "index.html"
}
