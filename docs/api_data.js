define({ "api": [
  {
    "type": "post",
    "url": "/events",
    "title": "Create an event",
    "name": "CreateEvent",
    "group": "Event",
    "version": "1.0.0",
    "description": "<p>Registers a new event.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "    POST manevent.herokuapp.com/events HTTP/1.1\n    Content-Type: application/json\n\n    { \"name\": \"Caprices Festival 2020\",\n          \"date\": \"2020-04-16\",\n         \"adress\": \"Crans-Montana\",\n          \"time\": \"19h00\",\n          \"description\": \"Caprices Festival is a four-day festival that takes place in Crans-Montana, Switzerland, on three different stages\",\n         \"public\": true,\n            \"member\": []\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "201 Created",
          "content": "    HTTP/1.1 201 Created\n    Content-Type: application/json\n    Location: https://evening-meadow-25867.herokuapp.com/api/movies/58b2926f5e1def0123e97281\n{\n   \"member\": [],\n   \"_id\": \"5dc3f1ed87ca9ddf9882f5b3\",\n   \"name\": \"Caprices Festival 2020\",\n   \"date\": \"2020-04-16\",\n   \"adress\": \"Crans-Montana\",\n   \"time\": \"19h00\",\n   \"description\": \"Caprices Festival is a four-day festival that takes place in Crans-Montana, Switzerland, on three different stages\",\n   \"public\": true,\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/events.js",
    "groupTitle": "Event",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>date of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "adress",
            "description": "<p>adress of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>planned hour of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the event</p>"
          },
          {
            "group": "Request body",
            "type": "array",
            "optional": false,
            "field": "member",
            "description": "<p>list of the participants of the event</p>"
          },
          {
            "group": "Request body",
            "type": "boolean",
            "optional": false,
            "field": "public",
            "description": "<p>defines if the event is public or not</p>"
          }
        ],
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the event</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>date of the event. Date will be automatically formated to the EU standards</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "adress",
            "description": "<p>adress of the event</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>planned hour of the event</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the event</p>"
          },
          {
            "group": "Response body",
            "type": "array",
            "optional": false,
            "field": "member",
            "description": "<p>list of the participants of the event</p>"
          },
          {
            "group": "Response body",
            "type": "boolean",
            "optional": false,
            "field": "public",
            "description": "<p>defines if the event is public or not</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/events/:_id",
    "title": "Delete an event",
    "name": "DeleteEvent",
    "group": "Event",
    "version": "1.0.0",
    "description": "<p>Permanently deletes an event.</p>",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>The unique identifier of the event to retrieve</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "DELETE manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 The event has been deleted",
          "type": "json"
        }
      ]
    },
    "filename": "routes/events.js",
    "groupTitle": "Event",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No event was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo event found with ID 58b2926f5e1def0123e97281",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/events/:_id",
    "title": "Request an event's informations",
    "name": "RetrieveEvent",
    "group": "Event",
    "version": "1.0.0",
    "description": "<p>Retrieves one event.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of the event</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>name of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>date of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "adress",
            "description": "<p>adress of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "time",
            "description": "<p>planned hour of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>description of the event</p>"
          },
          {
            "group": "Request body",
            "type": "array",
            "optional": true,
            "field": "member",
            "description": "<p>list of the participants of the event</p>"
          },
          {
            "group": "Request body",
            "type": "boolean",
            "optional": true,
            "field": "public",
            "description": "<p>defines if the event is public or not</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "GET manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n    Link: &lt;https://manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa;;\n\n    [\n{\n\"member\": [\n  \n],\n\"_id\": \"5dc2d57714b81bd6f50ea8aa\",\n\"name\": \"Marché de Noel de Clos Fleuri\",\n\"date\": \"2019-11-30\",\n\"adress\": \"Prilly\",\n\"time\": \"11h00\",\n\"description\": \"Venez boire une tasse avec nous et faire vos emplettes pour vos cadeaux de Noël!\",\n\"public\": true,\n\"__v\": 0\n}\n    ]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/events.js",
    "groupTitle": "Event",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No event was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo event found with ID 58b2926f5e1def0123e97281",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/events",
    "title": "Request all events' informations",
    "name": "RetrieveEvents",
    "group": "Event",
    "version": "1.0.0",
    "description": "<p>Retrieves a paginated list of events ordered by title (in alphabetical order).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>page of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageSize",
            "description": "<p>size of the page</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "GET manevent.herokuapp.com/events HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n    Link: &lt;https://manevent.herokuapp.com/events\n\n    [\n {\n  \"member\": [\n    \n  ],\n  \"_id\": \"5dc2d57714b81bd6f50ea8aa\",\n  \"name\": \"Marché de Noel de Clos Fleuri\",\n  \"date\": \"2019-11-30\",\n  \"adress\": \"Prilly\",\n  \"time\": \"11h00\",\n  \"description\": \"Venez boire une tasse avec nous et faire vos emplettes pour vos cadeaux de Noël!\",\n  \"public\": true,\n  \"__v\": 0\n}\n    ]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/events.js",
    "groupTitle": "Event"
  },
  {
    "type": "put",
    "url": "/event/:_id",
    "title": "Update an event's informations",
    "name": "UpdateEvent",
    "group": "Event",
    "version": "1.0.0",
    "description": "<p>Partially updates an event's data (only the properties found in the request body will be updated). All properties are optional.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of the event</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>date of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "adress",
            "description": "<p>adress of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>planned hour of the event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the event</p>"
          },
          {
            "group": "Request body",
            "type": "array",
            "optional": false,
            "field": "member",
            "description": "<p>list of the participants of the event</p>"
          },
          {
            "group": "Request body",
            "type": "boolean",
            "optional": false,
            "field": "public",
            "description": "<p>defines if the event is public or not</p>"
          }
        ],
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the event</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>date of the event. Date will be automatically formated to the EU standards</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "adress",
            "description": "<p>adress of the event</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>planned hour of the event</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the event</p>"
          },
          {
            "group": "Response body",
            "type": "array",
            "optional": false,
            "field": "member",
            "description": "<p>list of the participants of the event</p>"
          },
          {
            "group": "Response body",
            "type": "boolean",
            "optional": false,
            "field": "public",
            "description": "<p>defines if the event is public or not</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "    PUT manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa HTTP/1.1\nContent-Type: application/json\n{ \"name\": \"Caprices Festival 2021\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n{\n   \"member\": [],\n   \"_id\": \"5dc3f1ed87ca9ddf9882f5b3\",\n   \"name\": \"Caprices Festival 2021\",\n   \"date\": \"2020-04-16\",\n   \"adress\": \"Crans-Montana\",\n   \"time\": \"19h00\",\n   \"description\": \"Caprices Festival is a four-day festival that takes place in Crans-Montana, Switzerland, on three different stages\",\n   \"public\": true,\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/events.js",
    "groupTitle": "Event"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create an user",
    "name": "CreateUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Registers a new user.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "    POST manevent.herokuapp.com/users HTTP/1.1\n    Content-Type: application/json\n{\n  \"name\": \"Alvaro Baptista\",\n  \"email\": \"alvaro.baptista@heig-vd.ch\",\n  \"password\": \"test1\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n    Location: https://evening-meadow-25867.herokuapp.com/api/movies/58b2926f5e1def0123e97281\n{\n  \"_id\": \"5dc4121df5c89ef55cf2eca0\",\n \"name\": \"Alvaro Baptista\",\n \"email\": \"alvaro.baptista@heig-vd.ch\",\n \"password\": \"$2b$10$UJS1AkggeB7NOhc1mQ5bhezQArqRLQvtjTiHyQVVSI3FQ9irOCNCu\",\n \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user.</p>"
          }
        ],
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. Password will be automatically hashed</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/users/:_id",
    "title": "Delete an user",
    "name": "DeleteUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Permanently deletes an user.</p>",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>The unique identifier of the user to retrieve</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "DELETE manevent.herokuapp.com/userss/5dc4121df5c89ef55cf2eca0 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 The user has been deleted",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No user was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo user found with ID 58b2926f5e1def0123e97281",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/:_id",
    "title": "Request an user's informations",
    "name": "RetrieveUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Retrieves one user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ],
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. Password will be automatically hashed</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "GET manevent.herokuapp.com/users/5dc2d57714b81bd6f50ea8aa HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\nLink: &lt;https://manevent.herokuapp.com/users/5dc2d57714b81bd6f50ea8aa;;",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No user was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo user found with ID 58b2926f5e1def0123e97281",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/event/:_id",
    "title": "Update an user's informations",
    "name": "UpdateUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Partially updates an user's data (only the properties found in the request body will be updated). All properties are optional.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user.</p>"
          }
        ],
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. Password will be automatically hashed</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "    PUT manevent.herokuapp.com/users/5dc4121df5c89ef55cf2eca0 HTTP/1.1\nContent-Type: application/json\n{ \n\"password\": \"test2\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n{\n    \"_id\": \"5dc4121df5c89ef55cf2eca0\",\n    \"name\": \"Alvaro Baptista\",\n    \"email\": \"alvaro.baptista@heig-vd.ch\",\n    \"password\": \"$2b$10$UJS1AkggeB7NOhc1mQ5bhezQArqRLQvtjTiHyQVVSI3FQ9irOCNCu\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No user was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo user found with ID 58b2926f5e1def0123e97281",
          "type": "json"
        }
      ]
    }
  }
] });
