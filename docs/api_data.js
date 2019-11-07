<<<<<<< HEAD
define({ "api": [  {    "type": "post",    "url": "/events",    "title": "Create an event",    "name": "CreateEvent",    "group": "Events",    "version": "1.0.0",    "description": "<p>Registers a new event.</p>",    "parameter": {      "fields": {        "Request body": [          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of the event</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "date",            "description": "<p>date of the event</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "adress",            "description": "<p>adress of the event</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "time",            "description": "<p>planned hour of the event</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>description of the event</p>"          },          {            "group": "Request body",            "type": "array",            "optional": false,            "field": "member",            "description": "<p>list of the participants of the event</p>"          },          {            "group": "Request body",            "type": "boolean",            "optional": false,            "field": "public",            "description": "<p>defines if the event is public or not</p>"          }        ]      }    },    "examples": [      {        "title": "Example",        "content": "    POST manevent.herokuapp.com/events HTTP/1.1\n    Content-Type: application/json\n\n    { \"name\": \"Caprices Festival 2020\",\n          \"date\": \"2020-04-16\",\n         \"adress\": \"Crans-Montana\",\n          \"time\": \"19h00\",\n          \"description\": \"Caprices Festival is a four-day festival that takes place in Crans-Montana, Switzerland, on three different stages\",\n         \"public\": true,\n            \"member\": []\n}",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "201 Created",          "content": "    HTTP/1.1 201 Created\n    Content-Type: application/json\n    Location: https://evening-meadow-25867.herokuapp.com/api/movies/58b2926f5e1def0123e97281\n{\n   \"member\": [],\n   \"_id\": \"5dc3f1ed87ca9ddf9882f5b3\",\n   \"name\": \"Caprices Festival 2020\",\n   \"date\": \"2020-04-16\",\n   \"adress\": \"Crans-Montana\",\n   \"time\": \"19h00\",\n   \"description\": \"Caprices Festival is a four-day festival that takes place in Crans-Montana, Switzerland, on three different stages\",\n   \"public\": true,\n   \"__v\": 0\n}",          "type": "json"        }      ]    },    "filename": "routes/events.js",    "groupTitle": "Events"  },  {    "type": "delete",    "url": "/event/:_id",    "title": "Delete an event",    "name": "DeleteEvent",    "group": "Events",    "version": "1.0.0",    "description": "<p>Permanently deletes an event.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "_id",            "description": "<p>Unique identifier of the event</p>"          }        ]      }    },    "examples": [      {        "title": "Example",        "content": "DELETE manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa HTTP/1.1",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "200 OK",          "content": "HTTP/1.1 200 The event has been deleted",          "type": "json"        }      ]    },    "filename": "routes/events.js",    "groupTitle": "Events"  },  {    "type": "get",    "url": "/events/:_id",    "title": "Request an event's information",    "name": "RetrieveEvent",    "group": "Events",    "version": "1.0.0",    "description": "<p>Retrieves one event.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "_id",            "description": "<p>Unique identifier of the event</p>"          }        ]      }    },    "examples": [      {        "title": "Example",        "content": "GET manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa HTTP/1.1",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "200 OK",          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n    Link: &lt;https://manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa;; rel=\"first prev\"\n\n    [\n{\n\"member\": [\n  \n],\n\"_id\": \"5dc2d57714b81bd6f50ea8aa\",\n\"name\": \"Marché de Noel de Clos Fleuri\",\n\"date\": \"2019-11-30\",\n\"adress\": \"Prilly\",\n\"time\": \"11h00\",\n\"description\": \"Venez boire une tasse avec nous et faire vos emplettes pour vos cadeaux de Noël!\",\n\"public\": true,\n\"__v\": 0\n}\n    ]",          "type": "json"        }      ]    },    "error": {      "fields": {        "404": [          {            "group": "404",            "optional": false,            "field": "EventNotFound",            "description": "<p>The id of the Event was not found.</p>"          }        ]      }    },    "filename": "routes/events.js",    "groupTitle": "Events"  },  {    "type": "get",    "url": "/events",    "title": "Request all events' information",    "name": "RetrieveEvents",    "group": "Events",    "version": "1.0.0",    "description": "<p>Retrieves a paginated list of events ordered by title (in alphabetical order).</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "page",            "description": "<p>page of the event</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "pageSize",            "description": "<p>size of the page</p>"          }        ]      }    },    "examples": [      {        "title": "Example",        "content": "GET manevent.herokuapp.com/events HTTP/1.1",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "201 OK",          "content": "    HTTP/1.1 201 OK\n    Content-Type: application/json\n    Link: &lt;https://manevent.herokuapp.com/events\n\n    [\n {\n  \"member\": [\n    \n  ],\n  \"_id\": \"5dc2d57714b81bd6f50ea8aa\",\n  \"name\": \"Marché de Noel de Clos Fleuri\",\n  \"date\": \"2019-11-30\",\n  \"adress\": \"Prilly\",\n  \"time\": \"11h00\",\n  \"description\": \"Venez boire une tasse avec nous et faire vos emplettes pour vos cadeaux de Noël!\",\n  \"public\": true,\n  \"__v\": 0\n}\n    ]",          "type": "json"        }      ]    },    "filename": "routes/events.js",    "groupTitle": "Events"  },  {    "type": "put",    "url": "/event/:_id",    "title": "Update an event's information",    "name": "UpdateEvent",    "group": "Events",    "version": "1.0.0",    "description": "<p>Partially updates an event's data (only the properties found in the request body will be updated). All properties are optional.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "_id",            "description": "<p>Unique identifier of the event</p>"          }        ],        "Request body": [          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of the event</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "date",            "description": "<p>date of the event</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "adress",            "description": "<p>adress of the event</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "time",            "description": "<p>planned hour of the event</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>description of the event</p>"          },          {            "group": "Request body",            "type": "array",            "optional": false,            "field": "member",            "description": "<p>list of the participants of the event</p>"          },          {            "group": "Request body",            "type": "boolean",            "optional": false,            "field": "public",            "description": "<p>defines if the event is public or not</p>"          }        ]      }    },    "examples": [      {        "title": "Example",        "content": "    PUT manevent.herokuapp.com/events/5dc2d57714b81bd6f50ea8aa HTTP/1.1\nContent-Type: application/json\n{ \"name\": \"Caprices Festival 2021\"\n}",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "200 OK",          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n{\n   \"member\": [],\n   \"_id\": \"5dc3f1ed87ca9ddf9882f5b3\",\n   \"name\": \"Caprices Festival 2021\",\n   \"date\": \"2020-04-16\",\n   \"adress\": \"Crans-Montana\",\n   \"time\": \"19h00\",\n   \"description\": \"Caprices Festival is a four-day festival that takes place in Crans-Montana, Switzerland, on three different stages\",\n   \"public\": true,\n   \"__v\": 0\n}",          "type": "json"        }      ]    },    "filename": "routes/events.js",    "groupTitle": "Events"  }] });
=======
define({ "api": [
  {
    "type": "post",
    "url": "/events/:_id",
    "title": "Create an event",
    "name": "CreateEvent",
    "group": "Events",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>date of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adress",
            "description": "<p>adress of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>planned hour of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "member",
            "description": "<p>list of the participant of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "public",
            "description": "<p>defines if the event is public or not</p>"
          }
        ]
      }
    },
    "filename": "routes/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/events/:_id",
    "title": "Request an event's information",
    "name": "RetrieveEvent",
    "group": "Events",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>date of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adress",
            "description": "<p>adress of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>planned hour of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "member",
            "description": "<p>list of the participant of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "public",
            "description": "<p>defines if the event is public or not</p>"
          }
        ]
      }
    },
    "filename": "routes/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "get",
    "url": "/events",
    "title": "Request all event's information",
    "name": "RetrieveEvents",
    "group": "Events",
    "version": "1.0.0",
    "filename": "routes/events.js",
    "groupTitle": "Events"
  },
  {
    "type": "put",
    "url": "/event/:_id",
    "title": "Update an event's information",
    "name": "UpdateEvent",
    "group": "Events",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>date of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adress",
            "description": "<p>adress of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>planned hour of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "member",
            "description": "<p>list of the participant of the event</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "public",
            "description": "<p>defines if the event is public or not</p>"
          }
        ]
      }
    },
    "filename": "routes/events.js",
    "groupTitle": "Events"
  }
] });
>>>>>>> 851438bc08243ef1dbd7bde92d945810dba7509e
