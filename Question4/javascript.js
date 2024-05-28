$(document).ready(function() {
  
    $.ajax({
        url: 'get.php',
        type: 'GET',
        data: { type: 'country' },
        success: function(data) {
            console.log(data); 
            data.forEach(function(country) {
                $('#country').append('<option value="' + country.id + '">' + country.name + '</option>');
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching countries:", error); 
        }
    });


    $('#country').change(function() {
        var countryId = $(this).val();
        $('#state').prop('disabled', countryId === '');
        $('#state').html('<option value="">Select State</option>');
        $('#city').html('<option value="">Select City</option>').prop('disabled', true);

        if (countryId !== '') {
            $.ajax({
                url: 'get.php',
                type: 'GET',
                data: { type: 'state', id: countryId },
                success: function(data) {
                    console.log(data); 
                    data.forEach(function(state) {
                        $('#state').append('<option value="' + state.id + '">' + state.name + '</option>');
                    });
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching states:", error); 
                }
            });
        }
    });

    $('#state').change(function() {
        var stateId = $(this).val();
        $('#city').prop('disabled', stateId === '');
        $('#city').html('<option value="">Select City</option>');

        if (stateId !== '') {
            $.ajax({
                url: 'get.php',
                type: 'GET',
                data: { type: 'city', id: stateId },
                success: function(data) {
                    console.log(data); 
                    data.forEach(function(city) {
                        $('#city').append('<option value="' + city.id + '">' + city.name + '</option>');
                    });
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching cities:", error); 
                }
            });
        }
    });
});