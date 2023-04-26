// Fetch data from the published Google Sheet
$.ajax({
  url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_eTUgtYbWTu9UZ_Gu-AR_azLomICPRO58g9uOm2fhB6d6vXY61_jclvrjImAUHFhkCW4lIFNvbRQ1/pubhtml?gid=0&single=true', // Replace with the URL of your published Google Sheet
  dataType: 'text',
}).done(function(data) {
  // Parse CSV data into an array of objects
  var careerOptions = $.csv.toObjects(data);

  // Display career options as list items
  var careerOptionsList = $('#careerOptionsList');
  $.each(careerOptions, function(index, careerOption) {
    var listItem = $('<li>').text(careerOption.CareerOption);
    careerOptionsList.append(listItem);
  });

  // Search functionality
  $('#searchInput').on('input', function() {
    var searchTerm = $(this).val().toLowerCase();
    careerOptionsList.find('li').each(function() {
      var listItemText = $(this).text().toLowerCase();
      if (listItemText.indexOf(searchTerm) === -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
}).fail(function() {
  console.error('Failed to fetch data from Google Sheet');
});
