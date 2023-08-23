<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require "../vendor/autoload.php";

require_once __DIR__."/services/DoctorService.php";
require_once __DIR__."/services/NewsService.php";
require_once __DIR__."/services/AppointmentService.php";
require_once __DIR__."/services/DepartmentService.php";
require_once __DIR__.'/dao/AdminDao.class.php';


Flight::register('adminDao', 'AdminDao');
Flight::register('doctor_service', 'DoctorService');
Flight::register('news_service', "NewsService");
Flight::register('appointment_service', "AppointmentService");
Flight::register('department_service', "DepartmentService");

Flight::route('/locked/*', function(){
  $path = Flight::request()->url;
  if ($path == '/login' || $path == '/docs.json') {
    return true;
}
      $headers = getallheaders();
      if (@!$headers['Authorization']){
          Flight::json(["message" => "Unauthorized access"], 403);
          return FALSE;
      } else {
          try {
              $decoded = JWT::decode($headers['Authorization'], new Key(Config::JWT_SECRET(), 'HS256'));
              // Token is valid
              Flight::set('user', $decoded);
              return TRUE;
          } catch (\Exception $e) {
              // Other errors
              Flight::json(["message" => "Token authorization invalid"], 403);
              return FALSE;
          }
  
        
      }
  });

  Flight::route('GET /docs.json', function() {
    $openapi = \OpenApi\scan('routes');
    header('Content-Type: application/json');
    echo $openapi->toJson();
  });

require_once __DIR__.'/routes/DoctorRoutes.php';
require_once __DIR__.'/routes/NewsRoutes.php';
require_once __DIR__ .'/routes/AppointmentRoutes.php';
require_once __DIR__.'/routes/DepartmentRoutes.php';
require_once __DIR__.'/routes/AdminRoutes.php';


Flight::start();
?>