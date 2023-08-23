var DoctorServiceIndex = {
    init: function(){
      DoctorServiceIndex.list();
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
    list_by_search: function() {
        var search = document.getElementById('search-bar').value;
        
        // Check if search term is not empty
        if (search.trim() !== '') {
          $.ajax({
            url: "rest/search_name_desc/?dname=" + search.trim(),
            type: "GET",
           
            success: function(data) {
              $("#doctor-list").html("");
              var html = "";
              $('#search-bar').val('');

              for (let i = 0; i<=data.length - 1; i++) {
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
                        </div>
                        </div>
                    </div>
                </div>
                `;
              }
        
              $("#doctor-list").html(html);
            },
          
          });
        }  else {
            DoctorServiceIndex.list();
        }
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
      }
 
      }
