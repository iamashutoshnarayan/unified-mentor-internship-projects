const sumRequestHandler = (req, res) => {
  const body = [];
  req.on('data', (chunk) => body.push(chunk));
  req.on('end', () => {
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    const result = Number(bodyObj.first) + Number(bodyObj.second);
    console.log(result);
    res.setHeader("Content-type", "text/html");
    res.write(`
    <html>
      <head><title>Practise Set</title></head>
      <body>
        <h1>Sum is ${result}</h1>
      </body>
    </html>
    `);
    return res.end();
  });
};

exports.sumRequestHandler = sumRequestHandler;
