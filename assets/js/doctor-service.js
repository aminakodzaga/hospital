var DoctorService = {
    init: function(){
      $('#addDoctorForm').validate({
        submitHandler: function(form) {
          var todo = Object.fromEntries((new FormData(form)).entries());
          DoctorService.add(todo);
        }
      });
      DoctorService.list();
    },

    list: function() {
        $.ajax({
            url: "rest/doctors",
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
                            <div class="btn-group" role="group">
                            <button type="button" class="btn btn-primary doctor-button" onclick="DoctorService.get(`+data[i].id+`)">Edit</button>
                            <button type="button" class="btn btn-danger doctor-button" onclick="DoctorService.delete(`+data[i].id+`)">Delete</button>
                          </div>
                        </div>
                    </div>
                </div>
                    `;
                }
                $("#doctor-list").html(html);
            }
        })
    },

    get: function(id){
      $('.doctor-button').attr('disabled', true);
      $.get('rest/doctors/'+id, function(data){
      $("#id").val(data.id);
        $("#dname").val(data.dname);
      $("#demail").val(data.demail);
      $("#date").val(data.date);
      $("#specialities").val(data.specialities);
      $("#image").val(data.image);
        $("#exampleModal").modal("show");
        $('.doctor-button').attr('disabled', false);
      })
    },

    add: function(doctor){
      
      $.ajax({
        url: 'rest/locked/doctors',
        type: 'POST',
        data: JSON.stringify(doctor),
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        success: function(result) {
          console.log(result);
          $('.modal-backdrop').remove();
          $("#doctor-list").html(`
          <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
          `);
           
            DoctorService.list(); // perf optimization
            $("#addDoctorModal").modal("hide");
            setTimeout(function() {
              location.reload();
          }, 1000); 
        }
      });
    },

    update: function(){
      $('.save-doctor-button').attr('disabled', true);
      var doctor = {};

      doctor.dname = $('#dname').val();
      doctor.demail = $('#demail').val();
      doctor.date = $('#date').val();
      doctor.specialities = $('#specialities').val();
      doctor.image = $('#image').val();

      $.ajax({
        url: 'rest/locked/doctors/'+$('#id').val(),
        type: 'PUT',
        data: JSON.stringify(doctor),
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        success: function(result) {
            $("#exampleModal").modal("hide");
            $('.save-doctor-button').attr('disabled', false);
            $("#doctor-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            DoctorService.list(); 
        }
      });
    },

    delete: function(id){
      $('.doctor-button').attr('disabled', true);
      $.ajax({
        url: 'rest/locked/doctors/'+id,
        type: 'DELETE',
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        success: function(result) {
            $("#doctor-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            DoctorService.list();
        }
      });
    },
    
}