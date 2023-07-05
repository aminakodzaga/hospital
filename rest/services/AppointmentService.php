<?php
require_once 'BaseService.php';
require_once __DIR__."/../dao/AppointmentDao.class.php";

class AppointmentService extends BaseService{
    public function __construct(){
        parent::__construct(new AppointmentDao);
    } 
}
?>