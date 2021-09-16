async function updatePostHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const body = document.querySelector('input[name="content"]').value.trim();
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/updatepost`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  async function deletePostHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

     const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE',
     });

     if (response.ok) {
        document.location.replace('/');
     }
  };

  document.getElementbyId('#save-post-btn').addEventListener('submit', updatePostHandler);
  document.getElementbyId('#delete-post-btn').addEventListener('submit', deletePostHandler);
