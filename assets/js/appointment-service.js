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
        $.get("rest/locked/appointment", function(data) {
          $("#appointment-list").html("");
          var html = "";
          for(let i = 0; i < data.length; i++){
            html += `
            <div class="col-lg-3">
              <div class="card" >
                <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17ff3c8cf14%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17ff3c8cf14%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.19140625%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">`+ data[i].id +`</h5>
                 
                 
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
        $.get('rest/locked/appointment/'+id, function(data){
        $("#id").val(data.id);
          $("#date").val(data.date);
        $("#doctor_id").val(data.doctor_id);
        $("#name").val(data.name);
        $("#address").val(data.address);
        $("#country").val(data.country);
          $("#exampleModal").modal("show");
          $('.appointment-button').attr('disabled', false);
        })
      },

    add: function(appointment) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/appointment',
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