var NewsServiceIndex = {
    init: function(){
      NewsServiceIndex.list();
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
    }
}