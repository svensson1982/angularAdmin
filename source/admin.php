<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Admin extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('admin_model');
        $this->load->library('form_validation');
        $this->load->helper('url');
    }

    public function index() {
        $this->load->view('admin/loginadmin');
    }

    public function logmein() {
        $this->form_validation->set_rules('aname', 'trim|required|xss_clean');
        $this->form_validation->set_rules('apassword', 'trim|required|xss_clean');

        if ($this->form_validation->run() == FALSE) {
            echo json_encode(array('st' => 0, 'msg' => 'ERROR1:<br />' . validation_errors()));
        } else {
            $u = $this->input->post('aname');
            $p = $this->input->post('apassword');

            if ($this->admin_model->login($u, $p) == TRUE) {
                $result = $this->admin_model->login($u, $p);
                if ($result) {
                    //session
                    $newdata = array(
                        'username' => $u,
                        'logged_in' => TRUE
                    );

                    $this->session->set_userdata($newdata);

                    //return TRUE;
                }
                $str = "Signed in as " . $u . ".";
                //echo json_encode(array('st' => 1, 'msg' => $str));
                unset($_POST['username']);
                unset($_POST['password']);
                redirect('admin/dashboard', 'refresh');
                //ha van session és vásárlot, akkor cart tábla update user_id-val
            } else {
                //echo json_encode(array('st' => 0, 'msg' => 'ERROR2:<br />' . validation_errors()));
                $this->session->set_flashdata('error_msg', 'A felhasználónév jelszó nem egyezik!');
                redirect('admin', 'refresh');
            }
        }
    }

    public function dashboard() {
        $this->load->view('admin/header');
        $this->load->view('admin/dashboard');
        $this->load->view('admin/footer');
    }

    /*     * **************** edit content ****************** */

    public function selectlang() {
        $lang = $this->input->post('lang');
        $this->admin_model->getcontent($lang);
    }

    public function selectcontent() {
        $id = (int) $this->input->post('content_id');
        $this->admin_model->getContentById($id);
    }

    public function editgallery() {
        $lang = $this->input->post('lang');
        $this->load->view('admin/header');
        $this->load->view('admin/editgallery');
        $this->load->view('admin/footer');
    }

    public function uploadimgfreefly() {
        /* Image upload */
        //$param = $this->input->post('path');//'./assets/img/freefly_gallery';
        $this->admin_model->uploadImagefree();
    }
    public function uploadimghandyfly() {
        /* Image upload */
        //$param = $this->input->post('path');//'./assets/img/freefly_gallery';
        $this->admin_model->uploadImagehandy();
    }
    public function uploadimgown() {
        /* Image upload */
        //$param = $this->input->post('path');//'./assets/img/freefly_gallery';
        $this->admin_model->uploadImageown();
    }
    /*I love you hardcode!!!*/
    
    public function deleteimg() {
        $path = $this->input->post('image_path');        
        delete_files($path);
        if (unlink($path)) {
            echo 'deleted successfully';
        } else {
            echo 'errors occured';
        }
    }

    public function getid() {
        $description = $this->input->post('description');
        $lang = $this->input->post('lang');
        $this->admin_model->getTextId($description, $lang);
    }

    public function updatetext() {
        //pluginból jönnek ajaxon keresztül az adatok
        $token = $this->input->post('text');
        $id = $this->input->post('id');
        $this->admin_model->updateContent($token, $id);
    }

    /*     * **************** answer ****************** */

    public function answer() {
        $data['comment'] = $this->admin_model->getcomment();
        $this->load->view('admin/header');
        $this->load->view('admin/answer', $data);
        $this->load->view('admin/footer');
    }

    public function selectcomment() {
        $c = (int) $this->input->post('c_id');
        $this->admin_model->getCommentById($c);
    }

    public function insertanswer() {
        $this->form_validation->set_rules('adminname', 'trim|required|xss_clean');
        $this->form_validation->set_rules('answer', 'trim|required|xss_clean');
        $this->form_validation->set_rules('comment_id', 'required');

        if ($this->form_validation->run() == FALSE) {
            echo json_encode(array('st' => 0, 'msg' => 'ERROR1:<br />' . validation_errors()));
        } else {
            $ad = $this->input->post('adminname');
            $ans = $this->input->post('answer');
            $cid = $this->input->post('comment_id');
            $this->admin_model->insertAnswer($ad, $ans, $cid);
        }
    }

    public function logout() {
        $this->admin_model->logOutAdmin();
    }

}
