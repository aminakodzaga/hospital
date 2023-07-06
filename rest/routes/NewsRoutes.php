<?php

Flight::route('GET /news', function(){
    Flight::json(Flight::news_service() -> get_all());
    
});


Flight::route("GET /news_by_id", function(){
  Flight::json(Flight::news_service()->get_by_id(Flight::request()->query['id']));
});


Flight::route('GET /news/@id', function($id){
    Flight::json(Flight::news_service() -> get_by_id($id));
  
});


Flight::route('POST /locked/news', function(){
  $request = Flight::request()->data->getData();
  Flight::json(['message' => "news added successfully",
                'data' => Flight::news_service()->add($request)
               ]);
    

  });

 
  Flight::route('PUT /locked/news/@id', function($id){
    $news = Flight::request()->data->getData();
    Flight::json(['message' => "news edit successfully",
                  'data' => Flight::news_service()->update($news, $id)
                 ]);
  });


Flight::route('DELETE /locked/news/@id', function($id){
    Flight::news_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>