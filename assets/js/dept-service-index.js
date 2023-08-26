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
    },
    list_by_search: function() {
        var search = document.getElementById('search-bar').value;
        
        // Check if search term is not empty
        if (search.trim() !== '') {
          $.ajax({
            url: "rest/search_name/?name=" + search.trim(),
            type: "GET",
           
            success: function(data) {
              $("#dept-list").html("");
              var html = "";
              $('#search-bar').val('');

              for (let i = 0; i<=data.length - 1; i++) {
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
            },
          
          });
        }  else {
            DeptServiceIndex.list();
        }
      }
}