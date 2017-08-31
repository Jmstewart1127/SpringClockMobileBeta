import React, { Component } from 'react';
import axios from 'axios';

class Rest extends Component { 

  static clockInTest() {
    axios.post('https://spring-clock.herokuapp.com/rest/clockin/12')
      .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
}

  

export default Rest;