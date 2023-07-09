var AppointmentService = {
    init: function() {
        $('#addAppForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                AppointmentService.add(entity);

            }
        });

    },

    list: function(){
        $.get("rest/appointment", function(data) {
          $("#appointment-list").html("");
          var html = "";
          for(let i = 0; i < data.length; i++){
            html += `
            <div class="col-lg-3">
              <div class="card" >
                <img class="card-img-top" >
                <div class="card-body">
                  <h5 class="card-title">`+ data[i].date +`</h5>
                  <h5>`+data[i].name+`</h5>
                  <h5>`+data[i].id+`</h5>
                 
                 
                </div>
              </div>
            </div>
            `;
          }
          $("#appointment-list").html(html);
        });
      },
    
    

      get: function(id){
        $('.appointment-button').attr('disabled', true);
        $.get('rest/appointment/'+id, function(data){
        $("#id").val(data.id);
          $("#date").val(data.date);
        $("#doctor_id").val(data.doctor_id);
        $("#name").val(data.name);
        $("#address").val(data.address);
        $("#country").val(data.country);
        $("#card").val(data.card);
          $("#exampleModal").modal("show");
          $('.appointment-button').attr('disabled', false);
        })
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

}