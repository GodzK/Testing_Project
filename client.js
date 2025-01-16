const webSocket = new WebSocket('ws://localhost:8080'); // เชื่อมต่อไปยัง WebSocket server

webSocket.onopen = () => {
    console.log('WebSocket connection established');
};

webSocket.onmessage = (event) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `Received message: ${event.data}<br>`; // แสดงข้อความที่ได้รับ
};

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    webSocket.send(message); // ส่งข้อความไปยังเซิร์ฟเวอร์
    const show = document.getElementById("show");
    const text = document.createElement('p')
    text.textContent = message
    show.appendChild(text)
    show.appendChild(message)
    messageInput.value = ''; // ล้างช่องข้อความ
}
