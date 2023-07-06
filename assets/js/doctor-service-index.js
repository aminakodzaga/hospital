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
    }
}