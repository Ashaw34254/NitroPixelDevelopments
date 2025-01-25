<?php
require 'vendor/autoload.php';
  <?php
  class Database {
      private $client;
      private $config;

      public function __construct() {
          $this->config = require('config.php');
          $this->client = new MongoDB\Client($this->config['mongodb_uri']);
      }
    public function getVehicles() {
        return $this->db->vehicles->find();
    }

    public function addVehicle($data) {
        return $this->db->vehicles->insertOne([
            'title' => $data['title'],
            'category' => $data['category'],
            'image_path' => $data['image_path'],
            'specs' => $data['specs'],
            'created_at' => new MongoDB\BSON\UTCDateTime()
        ]);
    }

    public function updateVehicle($id, $data) {
        return $this->db->vehicles->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($id)],
            ['$set' => $data]
        );
    }

    public function deleteVehicle($id) {
        return $this->db->vehicles->deleteOne(
            ['_id' => new MongoDB\BSON\ObjectId($id)]
        );
    }
}
