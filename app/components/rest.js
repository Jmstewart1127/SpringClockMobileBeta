import React, { Component } from 'react';
import axios from 'axios';

class Rest {

  static clockInTest() {
    axios.get('https://spring-clock.herokuapp.com/rest/clockin/12')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  static clockIn(id) {
    fetch('https://spring-clock.herokuapp.com/rest/employees/' + id)
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  }


  static xmlHttpRequest() {
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = "https://spring-clock.herokuapp.com/rest/clockin/12";
    var params = "var=" + encodeURIComponent("1");
    xmlhttp.open("POST", url, true);
    xmlhttp.send(params);
  }

  static anotherTest() {
  	fetch('https://spring-clock.herokuapp.com/rest/clockin/12', {
  		method: 'POST',
  	});
  }

  static otherTest(params) {
    axios.post('https://spring-clock.herokuapp.com/rest/clockin/', {
	  id: params,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}

export default Rest;
