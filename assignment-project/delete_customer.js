// Function to delete the customer by UUID
async function deleteCustomer(uuid) {
  try {
    // Make API call to delete customer using the bearer token
    const response = await fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_BEARER_TOKEN', // Replace with actual bearer token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid: uuid }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete customer.');
    }

    alert('Customer deleted successfully.');
    showCustomerListScreen();
  } catch (error) {
    console.error(error);
    alert('Failed to delete customer.');
  }
}
