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
                  <h5>`+data[i].doctor_id+`</h5>
                 
                 
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
                $('.modal-backdrop').remove();
                AppointmentService.list();
                $("#addAppModal").modal("hide");

                toastr.success("Booking added");
                setTimeout(function() {
                    location.reload();
                }, 1000); 
            }
        });
    },


    
    listSortedByDate: function(sortOrder) {
      $.get("rest/appointment", function(data) {
          if (sortOrder === "asc") {
              data.sort((a, b) => a.date.localeCompare(b.date));
          } else if (sortOrder === "desc") {
              data.sort((a, b) => b.date.localeCompare(a.date)); // Descending order
          }

          $("#appointment-list").html(""); // Clear the appointment list container
          var html = "";
          for (let i = 0; i < data.length; i++) {
              // Generate HTML for each appointment and append to 'html' variable
              html += `
              <div class="col-lg-3">
              <div class="card" >
                <img class="card-img-top" >
                <div class="card-body">
                  <h5 class="card-title">`+ data[i].date +`</h5>
                  <h5>`+data[i].name+`</h5>
                  <h5>`+data[i].doctor_id+`</h5>
                 
                 
                </div>
              </div>
            </div>
              `;
          }
          $("#appointment-list").html(html); // Update the appointment list container with sorted HTML
      });
  },
  setupSorting: function() {
    var sortOrder = "asc"; // Initial sorting order is ascending

    $("#sort-by-date").click(function() {
        sortOrder = (sortOrder === "asc") ? "desc" : "asc"; // Toggle sorting order
        AppointmentService.listSortedByDate(sortOrder);
    });
}
};

$(document).ready(function() {
AppointmentService.init();
AppointmentService.setupSorting(); // Call the sorting setup function here
})


  




    

