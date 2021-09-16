async function logout() {
    const response = await fetch('/api/user/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      alert('you have logged out');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout);
  