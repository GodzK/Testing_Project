const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// API สำหรับเชื่อมต่อรับการอัพเดตราคาหุ้น
app.get('/stock-price', (req, res) => {
  // Set header ให้รู้ว่าเป็น SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // สมมติว่าตรงนี้เป็นการอัพเดตราคาหุ้นทุก ๆ วินาที
  const intervalId = setInterval(() => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    res.write(`data: ${randomNum}\n\n`);
  }, 1000);

  // ถ้า Client ปิด Connection ไปแล้วก็ clearInterval ทิ้งด้วย
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// Start server
const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});