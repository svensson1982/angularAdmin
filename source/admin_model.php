<?php

class Admin_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    /*     * *********** Login *********** */

    public function login($param1, $param2) {
        $query = $this->db->get_where('adminusers', array('adminname' => $param1, 'adminpassword' => md5($param2)));
        if ($query->result()) {
            return true;
        } else {
            //error
            return false;
        }
    }

    /*     * *********** Edit *********** */

    public function getcontent($lang) {
        $query = $this->db->get_where('lang_token', array('lang' => $lang));
        $json['item'] = $query->result();
        echo json_encode($json);
    }

    public function getContentById($id) {
        $query = $this->db->get_where('lang_token', array('id' => $id));
        $json['item'] = $query->result();
        echo json_encode($json);
    }
    
    public function getTextId($description,$lang) {
        $this->db->select('id');
        $this->db->from('lang_token');
        $this->db->where('lang', $lang);        
        $this->db->where('description', $description);        
        $query = $this->db->get();
        $json['lang_id'] = $query->result();
        echo json_encode($json);
    }
    
    public function updateContent($token,$id) {
        $data = array(
            'token' => $token
        );
        $this->db->where('id', $id);
        $this->db->update('lang_token', array('token' => $token));
        if ($this->db->affected_rows() != 1) {
            $json['item'] = "A tartalom nem menthető az adatbázisba!";
            echo json_encode($json);
        } else {
            $json['item'] = "A tartalom mentve!";
            echo json_encode($json);
        }
    }

    
    public function uploadImagefree() {
        $config['upload_path'] = './assets/img/freefly_gallery';
        $config['allowed_types'] = 'gif|jpg|jpeg|png';
        $config['max_size'] = '1024';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';

        $this->load->library('upload');
        $img1 = "image1";
        $this->upload->initialize($config);
        if (!$this->upload->do_upload($img1)) {
            $data['error'] = array('error' => $this->upload->display_errors());
        } else {
            $data['upload_data'] = $this->upload->data();
            

        }
    }
    public function uploadImagehandy() {
        $config['upload_path'] = './assets/img/handy_gallery';
        $config['allowed_types'] = 'gif|jpg|jpeg|png';
        $config['max_size'] = '1024';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';

        $this->load->library('upload');
        $img1 = "image1";
        $this->upload->initialize($config);
        if (!$this->upload->do_upload($img1)) {
            $data['error'] = array('error' => $this->upload->display_errors());
        } else {
            $data['upload_data'] = $this->upload->data();
            

        }
    }
    /*own gallery route*/
    public function uploadImageown() {
        $config['upload_path'] = './assets/img/own_gallery';
        $config['allowed_types'] = 'gif|jpg|jpeg|png';
        $config['max_size'] = '1024';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';

        $this->load->library('upload');
        $img1 = "image1";
        $this->upload->initialize($config);
        if (!$this->upload->do_upload($img1)) {
            $data['error'] = array('error' => $this->upload->display_errors());
        } else {
            $data['upload_data'] = $this->upload->data();
            

        }
    }
    /*     * *********** Answer *********** */

    public function getcomment() {
        $this->db->select('c.id as id, c.username as username, c.email as email, c.comment as comment, c.date as date, a.id as aid');
        $this->db->from('comment c');
        $this->db->join('answer a', 'a.comment_id = c.id', 'left');
        $query = $this->db->get();
        return $query->result();
    }

    public function getCommentById($param) {
        $this->db->select('c.id as id, c.username as username, c.email as email, c.comment as comment, a.id as aid');
        $this->db->from('comment c');
        $this->db->join('answer a', 'a.comment_id = c.id', 'left');
        $this->db->where('c.id', $param);
        $query = $this->db->get();
        $json['item'] = $query->result();
        echo json_encode($json);
    }

    public function insertAnswer($param1, $param2, $param3) {
        $data = array(
            'name' => $param1,
            'answer' => $param2,
            'comment_id' => $param3
        );
        $this->db->insert('answer', $data);
        if ($this->db->affected_rows() != 1) {
            $json['item'] = "A válasz nem menthető az adatbázisba!";
            echo json_encode($json);
        } else {
            $json['item'] = "A válaszod mentve!";
            echo json_encode($json);
        }
    }
    
    /*     * *********** Logout *********** */
    public function logOutAdmin() {
        $this->session->sess_destroy();
        redirect('admin', 'refresh');
    }
}
