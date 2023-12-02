function fetchCustomerNames() {
    //database stuff
}


// Function to display customer names
function displayCustomerNames() {
    const customerNames = fetchCustomerNames(); // Fetch customer names from the database
    console.log("Customer names:");
    customerNames.forEach((customer, index) => {
      console.log(`${index + 1}. ${customer}`);
    });
  }