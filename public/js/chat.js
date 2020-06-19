const socket = io();

// socket.on('countUpdated', (count) => {
//   console.log('The count has been updated', count);
// });

// document.querySelector('#increment').addEventListener('click', () => {
//   console.log('Clicked');
//   socket.emit('increment');
// });
socket.on('message', (message) => {
  console.log(message);
});

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.querySelector('input').value;
  socket.emit('sendMessage', message);
});

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  });
});
