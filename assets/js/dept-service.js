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
                        <p>`+data[i].description+`</p>
                        <button type="button" class="btn btn-primary missing-button" onClick="DeptService.get(` + data[i].id + `)">EDIT</button>

                    </div>
                </div>
                    `;
                }
                $("#dept-list").html(html);
            }
        })
    },

    list_by_id: function(id) {
        $('.dept-button').attr('disabled', true);
        
        $.ajax({
            url: 'rest/department/' + id,
            type: 'GET',
            success: function(data) {
            $("#id").val(data.id);
            $("#name").val(data.name); 
            $("#description").val(data.description);            

            var html = "";
            
                html += `
                
                        <img class="rounded w-50" src="images/missing/`+data.image+`" alt="Image"><br>
                        <p class="list-group-item-text"><strong>ID: </strong>` + data.id + `</p>
                        <p class="list-group-item-text"><strong>First Name: </strong>` + data.first_name + `</p>
                        
                        
                    `;
            
            $("#exampleModalD").modal("show");
            $('.dept-button').attr('disabled', false);
            
        }});
    },


    get: function(id) {
        $.ajax({
            url: 'rest/department/' + id,
            type: 'GET',
            success: function(data) {
                $("#id").val(data.id);
                $("#name").val(data.name);
                $("#description").val(data.description);
                $("#exampleModalD").modal("show");
        }});
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

    update: function() {
        var dept = {};
        dept.id = $('#id').val();
        dept.name = $('#name').val();
        dept.description = $('#description').val();

        $.ajax({
            contentType: "application/json",
            url: 'rest/department/' + $('#id').val(),
            type: 'PUT',
            data: JSON.stringify(dept),
            dataType: "json",
            success: function(result) {
                console.log(result);

                $("#exampleModalD").modal("hide");
                $("#dept-list").html(`
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `);
                DeptService.list();
            }
        });
    },

    delete: function(id) {
        $('.dept-button').attr('disabled', true);
        $.ajax({
            url: 'rest/locked/dept/' + id,
            type: 'DELETE',
            success: function(result) {
                $("#missing-list").html();
                DeptService.list();
            }
        });
    }
}