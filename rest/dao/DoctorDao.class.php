<?php
require_once "BaseDao.class.php";

 class DoctorDao extends BaseDao{


  public function __construct(){
    parent::__construct("doctor");
  }

  public function get_doctor_by_name($dname){
    return $this->query_unique("SELECT * FROM doctor WHERE dname = :dname", ['dname' => $dname]);
  }
  public function get_by_name_desc($dname){
    $dname=strtolower($dname);
    $stmt = $this->conn->prepare("SELECT * FROM doctor WHERE LOWER(dname) LIKE '%".$dname."%'");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
 }

 ?>