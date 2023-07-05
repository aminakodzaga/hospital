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

    list: function(){
      $.get("rest/doctors", function(data) {
        $("#doctor-list").html("");
        var html = "";
        for(let i = 0; i < data.length; i++){
          html += `
          <div class="col-lg-4">
          <h2>`+ data[i].dname +`</h2>
          <p>`+ data[i].specialities +`</p>
            <p>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary doctor-button" onclick="DoctorService.get(`+data[i].id+`)">Edit</button>
                <button type="button" class="btn btn-danger doctor-button" onclick="DoctorService.delete(`+data[i].id+`)">Delete</button>
              </div>
            </p>
          </div>`;
        }
        $("#doctor-list").html(html);
      });
    },

    get: function(id){
      $('.doctor-button').attr('disabled', true);
      $.get('rest/doctors/'+id, function(data){
      $("#id").val(data.id);
        $("#dname").val(data.dname);
      $("#demail").val(data.demail);
      $("#specialities").val(data.specialities);
      $("#image").val(data.image);
        $("#exampleModal").modal("show");
        $('.doctor-button').attr('disabled', false);
      })
    },

    add: function(doctor){
      $.ajax({
        url: 'rest/doctors',
        type: 'POST',
        data: JSON.stringify(doctor),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#doctor-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            DoctorService.list(); // perf optimization
            $("#addDoctorModal").modal("hide");
        }
      });
    },

    update: function(){
      $('.save-doctor-button').attr('disabled', true);
      var doctor = {};

      doctor.dname = $('#dname').val();
      doctor.demail = $('#demail').val();
      doctor.dpassword = $('#dpassword').val();
      doctor.specialities = $('#specialities').val();
      doctor.image = $('#image').val();

      $.ajax({
        url: 'rest/doctors/'+$('#id').val(),
        type: 'PUT',
        data: JSON.stringify(doctor),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#exampleModal").modal("hide");
            $('.save-doctor-button').attr('disabled', false);
            $("#doctor-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            DoctorService.list(); // perf optimization
        }
      });
    },

    delete: function(id){
      $('.doctor-button').attr('disabled', true);
      $.ajax({
        url: 'rest/doctors/'+id,
        type: 'DELETE',
        success: function(result) {
            $("#doctor-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            DoctorService.list();
        }
      });
    },
}