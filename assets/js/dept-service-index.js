var DeptServiceIndex = {
    init: function(){
      DeptServiceIndex.list();
    },

    list: function() {
        $.ajax({
            url: "rest/department",
            type: "GET",
            
            success: function(data) {
            $("#dept-list").html("");
            var html = "";
            
            
            for (let i = 0; i<data.length; i++) {
                html += `
                <div class="col-lg-4 col-md-6">
                    <div class="single-key">
                        <i class="fas fa-medkit"></i>
                        <h5>`+data[i].name+`</h5>
                      
                       
                    </div>
                </div>
                    `;
                }
                $("#dept-list").html(html);
            }
        })
    }
}