<?php
require_once 'BaseService.php';
require_once __DIR__."/../dao/DoctorDao.class.php";

class DoctorService extends BaseService{
    public function __construct(){
        parent::__construct(new DoctorDao());
    } 

    public function get_doctor_by_name($dname){
        return $this->dao->get_doctor_by_name($dname);
      }

      public function get_by_name_desc($dname) {
        return $this->dao->get_by_name_desc($dname);
    }
    }

?>