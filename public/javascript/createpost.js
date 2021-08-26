async function newPostHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/post', {
        method: 'post',
        body: JSON.stringify({
          title,
          content
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/single-post');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector('#save-post-btn').addEventListener('click', newPostHandler);