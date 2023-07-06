var AppointmentService = {
    init: function() {
        $('#addAppForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                AppointmentService.add(entity);

            }
        });

    },

    list: function() {
        $.ajax({
            url: "rest/locked/appointment",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
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

    add: function(appointment) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/appointment',
            type: 'POST',
            data: JSON.stringify(appointment),
            dataType: "json",
            success: function(result) {
                console.log(result);
                
                $("#addAppModal").modal("hide");
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