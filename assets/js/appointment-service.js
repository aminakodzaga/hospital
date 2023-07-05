var AppointmentService = {
    init: function() {
        $('#addMissingForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                DoctorService.add(entity);

            }
        });
        AppointmentService.list();

    },

    list: function() {
        $.ajax({
            url: "rest/appointment",
            type: "GET",
            success: function(data) {
            $("#doctor-list").html("");
            var html = "";
            
            
            for (let i = 0; i<data.length; i++) {
                html += `
                <div class="col-md-3 col-sm-6">
                    <div class="user-card">
                        <div class="userar">
                            <img class="teammempic" alt="" src="assets/images/team/`+data[i].image+`">
                        </div>
                        <div class="detfs">
                            <strong><p>`+data[i].dname+`<i> - `+data[i].specialities+`</i></p></strong>
                            <p>`+data[i].demail+`</p>

                        </div>
                    </div>
                </div>
                    `;
                }
                $("#doctor-list").html(html);
            }
        })
    },
    
    list_by_id: function(id) {
        $('.missing-button').attr('disabled', true);
        $('#missing-item').html('loading...');
        $.ajax({
            url: 'rest/missing/' + id,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(data) {
            $("#id").val(data.id);
            $("#status").val(data.status); 

            var dateStrS = data.last_time_seen;
            var dateS = new Date(dateStrS);
            var optionsS = { month: 'short', day: 'numeric', year: 'numeric' };
            var formattedDateS = dateS.toLocaleDateString('en-US', optionsS);

            var dateStr = data.date_of_birth;
            var date = new Date(dateStr);
            var options = { month: 'short', day: 'numeric', year: 'numeric' };
            var formattedDate = date.toLocaleDateString('en-US', options);

            
                var html = "";
            
                html += `
                
                        <img class="rounded w-50" src="images/missing/`+data.image+`" alt="Image"><br>
                        <p class="list-group-item-text"><strong>ID: </strong>` + data.id + `</p>
                        <p class="list-group-item-text"><strong>First Name: </strong>` + data.first_name + `</p>
                        <p class="list-group-item-text"><strong>Last Name: </strong>` + data.last_name + `</p>
                        <p class="list-group-item-text"><strong>Place and Date of Birth: </strong>` +data.place_of_birth+ ", " + formattedDate + `</p>
                        <p class="list-group-item-text"><strong>Disappearance: </strong> `+data.last_place_seen+ " - " + formattedDateS + `</p>
                        <p class="list-group-item-text"><strong>Contact: </strong>` + data.contact + `</p>
                        <p class="list-group-item-text"><strong>Description: </strong>` + data.description + `</p>
                        <p class="list-group-item-text"><strong>Physical Charasteristics: </strong>` + data.physical_chars + `</p>
                        
                    `;
            

            
            
            $("#exampleModalM").modal("show");
            $("#missing-item").html(html);
            $('.missing-button').attr('disabled', false);
            
        }});
    },


    get: function(id) {
        $('.missing-button').attr('disabled', true);
        $.ajax({
            url: 'rest/missing/' + id,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(data) {
            $("#id").val(data.id);
            $("#first_name").val(data.first_name);
            $("#last_name").val(data.last_name);
            $("#date_of_birth").val(data.date_of_birth);
            $("#place_of_birth").val(data.place_of_birth);
            $("#last_time_seen").val(data.last_time_seen);
            $("#last_place_seen").val(data.last_place_seen);
            $("#contact").val(data.contact);
            $("#description").val(data.description);
            $("#physical_chars").val(data.physical_chars);
            $("#image").val(data.image);
            $("#exampleModalM").show();
            $('.missing-button').attr('disabled', false);
        }});
    },

    add: function(missing) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/missing',
            type: 'POST',
            data: JSON.stringify(missing),
            dataType: "json",
            success: function(result) {
                console.log(result);
                $("#missing-list").html(`
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `);
                AppointmentService.list();
                $("#addMissingModal").hide();
            }
        });
    },

    update: function() {
        $('.save-missing-button').attr('disabled', true);
        var missing = {};
        missing.id = $('#id').val();
        missing.first_name = $('#first_name').val();
        missing.last_name = $('#last_name').val();
        missing.image = $('#image').val();
        missing.description = $('#description').val();
        console.log($('#description').val());

        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/missing/' + $('#id').val(),
            type: 'PUT',
            data: JSON.stringify(missing),
            dataType: "json",
            success: function(result) {
                console.log(result);

                $("#exampleModalM").modal("hide");
                $("#missing-list").html(`
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `);
                $('.save-missing-button').attr('disabled', false);
                AppointmentService.list();
            }
        });
    },

    delete: function(id) {
        $('.missing-button').attr('disabled', true);
        $.ajax({
            url: 'rest/locked/missing/' + id,
            type: 'DELETE',
            success: function(result) {
                $("#missing-list").html();
                AppointmentService.list();
            }
        });
    }
}