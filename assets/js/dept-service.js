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
                        <i class="fas fa-heartbeat"></i>
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
            url: 'rest/locked/department',
            type: 'POST',
            data: JSON.stringify(dept),
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(result) {
                console.log(result);
                $('.modal-backdrop').remove();
                $("#dept-list").html(`
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `);
                                   

                DeptService.list();
                $("#addDeptModal").modal("hide");
                setTimeout(function() {
                    location.reload();
                }, 1000); 
               

            }
        });
    },
    update: function(){
        $('.save-dept-button').attr('disabled', true);
        var dept = {};
        dept.name = $('#name').val();
        dept.description = $('#description').val();
        $.ajax({
        url: 'rest/locked/department/'+$('#id').val(),
        type: 'PUT',
        data: JSON.stringify(dept),
        contentType: "application/json",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
        },
        success: function(result) {
            $("#exampleModalD").modal("hide");
            $('.save-dept-button').attr('disabled', false);
            $("#dept-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            DeptService.list();
        }
        });
    },
  
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