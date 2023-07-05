<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

Flight::route('GET /department', function(){
    Flight::json(Flight::department_service() -> get_all());
    
});


Flight::route("GET /department_by_id", function(){
  Flight::json(Flight::department_service()->get_by_id(Flight::request()->query['id']));
});


Flight::route('GET /department/@id', function($id){
    Flight::json(Flight::department_service() -> get_by_id($id));
  
});


Flight::route('POST /department', function(){
  Flight::json(Flight::department_service()->add(Flight::request()->data->getData()));
    

  });

 
  Flight::route('PUT /department/@id', function($id){
    $department = Flight::request()->data->getData();
    Flight::json(['message' => "department edit successfully",
                  'data' => Flight::department_service()->update($department, $id)
                 ]);
  });


Flight::route('DELETE /department/@id', function($id){
    Flight::department_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>