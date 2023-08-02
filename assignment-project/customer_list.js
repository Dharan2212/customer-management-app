// Function to fetch the list of customers from the API
async function fetchCustomerList() {
  try {
    // Make API call to get the customer list using the bearer token
    const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_BEARER_TOKEN', // Replace with actual bearer token
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer list.');
    }

    const customers = await response.json();
    populateCustomerTable(customers);
  } catch (error) {
    console.error(error);
    alert('Failed to fetch customer list.');
  }
}

// Function to populate the customer table with data
function populateCustomerTable(customers) {
  const customerTableBody = document.querySelector('#customerTable tbody');
  customerTableBody.innerHTML = '';

  customers.forEach((customer) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${customer.first_name}</td>
      <td>${customer.last_name}</td>
      <td>${customer.street}</td>
      <td>${customer.address}</td>
      <td>${customer.city}</td>
      <td>${customer.state}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>
        <button data-action="edit" data-uuid="${customer.uuid}">Edit</button>
        <button data-action="delete" data-uuid="${customer.uuid}">Delete</button>
      </td>
    `;

    customerTableBody.appendChild(row);
  });
}
