// Fetch data from the published Google Sheet
$.ajax({
  url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_eTUgtYbWTu9UZ_Gu-AR_azLomICPRO58g9uOm2fhB6d6vXY61_jclvrjImAUHFhkCW4lIFNvbRQ1/pubhtml?gid=0&single=true',
  dataType: 'text',
}).done(function(data) {
  // Parse CSV data into an array of objects
