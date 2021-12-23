const http = require("http");

const port = 5000;
console.log(`HTTP server created, listening on port ${port}...`);
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end(`<h1> Home page</h1>
      <a href="/about">About Page</a>
      <br>
      <a href='/123123'>Random path </a>
    `);
  } else if (req.url === "/about") {
    res.end(`<h1>About page</h1>
    <a href="/">Back Home</a>`);
  } else {
    res.end(`
  <h1>Oops..!</h1>
  <p>We can't seem to find your page</p>
  <a href='/'>Go back to safety here</a>`);
  }
});

server.listen(port);
