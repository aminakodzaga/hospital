<?php
require_once "BaseDao.class.php";

 class AppointmentDao extends BaseDao{


  public function __construct(){
    parent::__construct("appointment");
  }
 }
 ?>