const { sumRequestHandler } = require('./sum');

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === '/') {
    res.setHeader('Content-type','text/html');
    res.write('<p>Welcome to the Calculator App</p><a href="/calculator">Calculator</a>');
    return res.end();
  } else if (req.url.toLowerCase() === '/calculator') {
    res.setHeader('Content-type','text/html');
    res.write('<form action="/calculate-result" method="POST">');
    res.write('<input type="text" name = "first" id="first_input" placeholder="Enter first number">');
    res.write('<input type="text" name = "second" id="sec_input" placeholder="Enter second number">');
    res.write('<input type="submit" value="Sum">');
    res.write('</form>');
    return res.end();
  } else if (req.url === '/calculate-result' && req.method=="POST") {
    return sumRequestHandler(req, res);
  }
   
  res.setHeader('Content-type','text/html');
  res.write(`
    <html>
      <head><title>Practise Set</title></head>
      <body>
        <h1>404 Page Does Not Exist</h1>
        <a href="/">Go To Home</a>
      </body>
    </html>
    `);
    return res.end();
}

exports.requestHandler = requestHandler;