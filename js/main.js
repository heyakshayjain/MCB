// Fetch data from the published Google Sheet
$.ajax({
  url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_eTUgtYbWTu9UZ_Gu-AR_azLomICPRO58g9uOm2fhB6d6vXY61_jclvrjImAUHFhkCW4lIFNvbRQ1/pubhtml?gid=0&single=true',
  dataType: 'text',
}).done(function(data) {
  // Parse CSV data into an array of objects
  var careerOptions = $.csv.toObjects(data);
  
  // Function to display all career options
  function displayCareerOptions() {
    var careerOptionsList = $('#careerOptionsList');
    careerOptionsList.empty();
    for (var i = 0; i < careerOptions.length; i++) {
      var careerOption = careerOptions[i];
      var listItem = $('<li>').text(careerOption.CareerOption);
      careerOptionsList.append(listItem);
    }
  }

  // Display all career options initially
  displayCareerOptions();
  
  // Button click event to display all career options
  $('#showAllBtn').on('click', function() {
    displayCareerOptions();
  });

}).fail(function(jqXHR, textStatus, errorThrown) {
  console.error('Failed to fetch data from Google Sheet:', errorThrown);
});
