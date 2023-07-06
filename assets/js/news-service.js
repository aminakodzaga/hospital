var NewsService = {
    init: function() {
        $('#addNewsForm').validate({
            submitHandler: function(form) {
                var entity = Object.fromEntries((new FormData(form)).entries());
                NewsService.add(entity);

            }
        });
        NewsService.list();

    },

    list: function() {
        $.ajax({
            url: "rest/news",
            type: "GET",
            success: function(data) {
            $("#news-list").html("");
            var html = "";
            
            
            for (let i = 0; i<data.length; i++) {
                html += `
                <div class="col-lg-4 col-md-6">
        				<div class="single-blog">
        					
        					<div class="blog-detail">
                                <img class="teammempic" alt="" src="assets/images/blog/`+data[i].image+`">
                                <br>
								<h4>`+data[i].nname+`</h4>
								<p> `+data[i].description+`</p>
                                <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary news-button" onclick="NewsService.get(`+data[i].id+`)">Edit</button>
                                <button type="button" class="btn btn-danger news-button" onclick="NewsService.delete(`+data[i].id+`)">Delete</button>
                              </div>
								<div class="link">
									<a href="">Read more </a><i class="fas fa-long-arrow-alt-right"></i>
								</div>
        					</div>
        					
        					
        				</div>
        			</div>
                    `;
                }
                $("#news-list").html(html);
            }
        })
    },

    
 


    get: function(id){
        $('.news-button').attr('disabled', true);
        $.get('rest/news/'+ id, function(data){
            $("#id").val(data.id);
            $("#nname").val(data.nname);
            $("#description").val(data.description);
            $("#image").val(data.image);
       
            $("#exampleModalN").modal("show");
            $('.news-button').attr('disabled', false);
        })
      },

    add: function(news) {
        $.ajax({
            contentType: "application/json",
            url: 'rest/locked/news',
            type: 'POST',
            data: JSON.stringify(news),
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
              },
            success: function(result) {
                console.log(result);
                $("#news-list").html(`
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `);
                NewsService.list();
                $("#addNewsModal").modal("hide");
            }
        });
    },

    update: function(){
        $('.news-button').attr('disabled', true);
        var news = {};
  
        news.nname = $('#nname').val();
        news.description = $('#description').val();
        news.image = $('#image').val();
        
  
        $.ajax({
          url: 'rest/locked/news/'+$('#id').val(),
          type: 'PUT',
          data: JSON.stringify(news),
          contentType: "application/json",
          dataType: "json",
          success: function(result) {
              $("#exampleModalN").modal("hide");
              $('.news-button').attr('disabled', false);
              $("#news-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
              NewsService.list(); // perf optimization
          }
        });
      },

    delete: function(id){
        $('.doctor-button').attr('disabled', true);
        $.ajax({
          url: 'rest/locked/news/'+id,
          type: 'DELETE',
          success: function(result) {
              $("#news-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
              NewsService.list();
          }
        });
      }
}