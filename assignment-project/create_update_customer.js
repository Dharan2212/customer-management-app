// Function to save or update the customer
async function saveCustomer(customer) {
  try {
    const customerForm = document.getElementById('customerForm');
    const formData = new FormData(customerForm);

    // Prepare the request body
    const requestBody = {};
    formData.forEach((value, key) => {
      requestBody[key] = value;
    });

    let url, method;
    if (customer) {
      // Update customer
      url = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${customer.uuid}`;
      method = 'POST';
    } else {
      // Create new customer
      url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create';
      method = 'POST';
    }

    // Make API call to save/update customer using the bearer token
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': 'Bearer YOUR_BEARER_TOKEN', // Replace with actual bearer token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to save/update customer.');
    }

    alert('Customer saved successfully.');
    showCustomerListScreen();
  } catch (error) {
    console.error(error);
    alert('Failed to save/update customer.');
  }
}
