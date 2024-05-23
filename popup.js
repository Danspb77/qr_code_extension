document.getElementById('urlForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const url = document.getElementById('urlInput').value;
    if (url) {
      alert(`URL submitted: ${url}`);
      // Here you can add any additional logic to handle the URL
      // For example, send it to the background script or open it in a new tab
    }
  });
  