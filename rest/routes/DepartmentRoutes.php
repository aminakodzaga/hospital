<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/**
 * @OA\Get(path="/department", tags={"department"},
 *         summary="Return all appointments from the API. ",
 *         @OA\Response( response=200, description="List of missing people.")
 * )
 */
Flight::route('GET /department', function(){
    Flight::json(Flight::department_service() -> get_all());
    
});


Flight::route("GET /department_by_id", function(){
  Flight::json(Flight::department_service()->get_by_id(Flight::request()->query['id']));
});


Flight::route('GET /department/@id', function($id){
    Flight::json(Flight::department_service() -> get_by_id($id));
  
});


Flight::route('POST /locked/department', function(){
  Flight::json(Flight::department_service()->add(Flight::request()->data->getData()));
    

  });

 
  Flight::route('PUT /locked/department/@id', function($id){
    $department = Flight::request()->data->getData();
    Flight::json(['message' => "department edit successfully",
                  'data' => Flight::department_service()->update($department, $id)
                 ]);
  });


Flight::route('DELETE /locked/department/@id', function($id){
    Flight::department_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>