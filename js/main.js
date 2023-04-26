// Function to fetch data from Google Sheets API
function fetchData() {
  fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_eTUgtYbWTu9UZ_Gu-AR_azLomICPRO58g9uOm2fhB6d6vXY61_jclvrjImAUHFhkCW4lIFNvbRQ1/pubhtml?gid=0&single=true')
    .then(response => response.text())
    .then(data => {
      // Parse the data as HTML
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data, 'text/html');
      // Get the table element
      const table = htmlDoc.querySelector('table');
      // Append the table to the data container
      const dataContainer = document.getElementById('data-container');
      dataContainer.innerHTML = table.outerHTML;
    })
    .catch(error => console.error(error));
}

// Add event listener to "Show All" button
const showAllButton = document.getElementById('show-all-button');
showAllButton.addEventListener('click', fetchData);
