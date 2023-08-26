<?php
require_once "BaseDao.class.php";

 class DepartmentDao extends BaseDao{


  public function __construct(){
    parent::__construct("department");
  }
  public function get_by_name($name){
    $name=strtolower($name);
    $stmt = $this->conn->prepare("SELECT * FROM department WHERE LOWER(name) LIKE '%".$name."%'");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
    
 }
 ?>