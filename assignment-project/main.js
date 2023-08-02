// Function to show/hide different screens
function showLoginScreen() {
  const appContent = document.getElementById('appContent');
  appContent.innerHTML = '';
  appContent.appendChild(document.importNode(loginTemplate.content, true));
}

function showCustomerListScreen() {
  const appContent = document.getElementById('appContent');
  appContent.innerHTML = '';
  appContent.appendChild(document.importNode(customerListTemplate.content, true));
  fetchCustomerList();
}

function showCreateUpdateCustomerScreen(customer = null) {
  const appContent = document.getElementById('appContent');
  appContent.innerHTML = '';
  appContent.appendChild(document.importNode(createUpdateCustomerTemplate.content, true));

  const customerForm = document.getElementById('customerForm');
  customerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveCustomer(customer); // Function to save or update the customer
  });

  const cancelButton = document.getElementById('cancelButton');
  cancelButton.addEventListener('click', () => {
    showCustomerListScreen();
  });

  // Populate form fields if editing an existing customer
  if (customer) {
    document.getElementById('first_name').value = customer.first_name;
    document.getElementById('last_name').value = customer.last_name;
    document.getElementById('street').value = customer.street;
    document.getElementById('address').value = customer.address;
    document.getElementById('city').value = customer.city;
    document.getElementById('state').value = customer.state;
    document.getElementById('email').value = customer.email;
    document.getElementById('phone').value = customer.phone;
  }
}

function showDeleteCustomerScreen() {
  const appContent = document.getElementById('appContent');
  appContent.innerHTML = '';
  appContent.appendChild(document.importNode(deleteCustomerTemplate.content, true));

  const deleteButton = document.getElementById('deleteButton');
  deleteButton.addEventListener('click', () => {
    const uuid = document.getElementById('uuid').value;
    deleteCustomer(uuid); // Function to delete the customer by UUID
  });

  const cancelButtonDelete = document.getElementById('cancelButtonDelete');
  cancelButtonDelete.addEventListener('click', () => {
    showCustomerListScreen();
  });
}

// Main logic to handle navigation based on user interactions
document.addEventListener('DOMContentLoaded', () => {
  const loginTemplate = document.getElementById('loginTemplate');
  const customerListTemplate = document.getElementById('customerListTemplate');
  const createUpdateCustomerTemplate = document.getElementById('createUpdateCustomerTemplate');
  const deleteCustomerTemplate = document.getElementById('deleteCustomerTemplate');

  showLoginScreen();

  // Logic to handle login and show customer list screen on successful login
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const login_id = document.getElementById('login_id').value;
    const password = document.getElementById('password').value;
    // Your login API call here to authenticate the user and get the bearer token
    // For demo, let's assume successful login and generate a dummy bearer token
    const bearerToken = 'YOUR_BEARER_TOKEN';
    showCustomerListScreen();
  });

  // Logic to handle customer list actions
  const customerTable = document.getElementById('customerTable');
  customerTable.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const action = target.dataset.action;
      const uuid = target.dataset.uuid;
      if (action === 'edit') {
        // Function to fetch customer details by UUID and pass it to showCreateUpdateCustomerScreen()
        const customer = fetchCustomerByUUID(uuid);
        showCreateUpdateCustomerScreen(customer);
      } else if (action === 'delete') {
        showDeleteCustomerScreen();
      }
    }
  });

  // Logic to handle "Add Customer" button click
  const addCustomerButton = document.getElementById('addCustomerButton');
  addCustomerButton.addEventListener('click', () => {
    showCreateUpdateCustomerScreen();
  });
});
