const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const loginId = document.getElementById('login_id').value;
  const password = document.getElementById('password').value;

  // Your login API call here to obtain the bearer token
  try {
    const response = await fetch('http://localhost:6385/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login_id: loginId, password: password }),
    });

    if (response.ok) {
      const data = await response.json();
      const bearerToken = data.token;
      showCustomerListScreen(bearerToken);
    } else {
      console.error('Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
