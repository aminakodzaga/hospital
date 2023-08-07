var DeptService = {
    init: function() {
        $('#addDeptForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                DeptService.add(entity);

            }
        });
        DeptService.list();

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
                       
                        <button type="button" class="btn btn-primary dept-button" onClick="DeptService.get(` + data[i].id + `)">EDIT</button>
                        <button type="button" class="btn btn-danger dept-button" onClick="DeptService.delete(` + data[i].id + `)">DELETE</button>
                    </div>
                </div>
                    `;
                }
                
                $("#dept-list").html(html);
            }
        })
    },

    
    get: function(id) {
        $.get('rest/department/'+id, function(data){
                $("#id").val(data.id);
                $("#name").val(data.name);
              
                
                $("#exampleModalD").modal("show");
        });
    },

    add: function(dept) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/department',
            type: 'POST',
            data: JSON.stringify(dept),
            dataType: "json",
           
            success: function(result) {
                console.log(result);
                    

                DeptService.list();
                $("#addDeptModal").modal("hide");
                
                
            }
        });
    },


    showEditDialog: function (id) {
        $("#exampleModalD").modal("show");
        
        $("#exampleModalLabel").hide();
        $.ajax({
          url: "rest/department/" + id,
          
          type: "GET",
          success: function (data) {
            console.log(data);
           
         
            $("#name").val(data.name);
            $("#id").val(data.id);
         
            $("#exampleModalLabel").show();
          },
        });
      },
      update: function (department) {
        
        $.ajax({
          url: "rest/department/" + department.id,
       
          type: "PUT",
          data: JSON.stringify(student),
          contentType: "application/json",
          dataType: "json",
          success: function (result) {
          
            $("#exampleModalD").modal("toggle");
            DeptService.get();
          },
        
        });
      },
    




   /* update: function(){
        $('.save-dept-button').attr('disabled', true);
        
        var dept = {};

        dept.name = $('#name').val();
      
        var id = $('#id').val();
        console.log(id);
       

        $.ajax({
        url: 'rest/department/'+ id,
        type: 'PUT',
        data: JSON.stringify(dept),
        contentType: "application/json",
        dataType: "json",
       
        success: function(result) {
            $("#exampleModalD").modal("hide");
            $('.save-dept-button').attr('disabled', false);
            $("#dept-list").html();
            DeptService.list();
        }
        });
    },*/
  

    delete: function(id) {
        $('.dept-button').attr('disabled', true);
        $.ajax({
            url: 'rest/locked/department/' + id,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(result) {
                $("#dept-list").html();
                DeptService.list();
            }
        });
    }
}