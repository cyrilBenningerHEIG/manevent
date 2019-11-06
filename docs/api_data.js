define({ "api": [  {    "type": "post",    "url": "/events/:_id",    "title": "Create an event",    "name": "CreateEvent",    "group": "Events",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "_id",            "description": "<p>Unique identifier of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "date",            "description": "<p>date of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "adress",            "description": "<p>adress of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "time",            "description": "<p>planned hour of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>description of the event</p>"          },          {            "group": "Parameter",            "type": "array",            "optional": false,            "field": "member",            "description": "<p>list of the participant of the event</p>"          },          {            "group": "Parameter",            "type": "boolean",            "optional": false,            "field": "public",            "description": "<p>defines if the event is public or not</p>"          }        ]      }    },    "filename": "routes/events.js",    "groupTitle": "Events"  },  {    "type": "get",    "url": "/events/:_id",    "title": "Request an event's information",    "name": "RetrieveEvent",    "group": "Events",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "_id",            "description": "<p>Unique identifier of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "date",            "description": "<p>date of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "adress",            "description": "<p>adress of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "time",            "description": "<p>planned hour of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>description of the event</p>"          },          {            "group": "Parameter",            "type": "array",            "optional": false,            "field": "member",            "description": "<p>list of the participant of the event</p>"          },          {            "group": "Parameter",            "type": "boolean",            "optional": false,            "field": "public",            "description": "<p>defines if the event is public or not</p>"          }        ]      }    },    "filename": "routes/events.js",    "groupTitle": "Events"  },  {    "type": "get",    "url": "/events",    "title": "Request all event's information",    "name": "RetrieveEvents",    "group": "Events",    "version": "1.0.0",    "filename": "routes/events.js",    "groupTitle": "Events"  },  {    "type": "put",    "url": "/event/:_id",    "title": "Update an event's information",    "name": "UpdateEvent",    "group": "Events",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "_id",            "description": "<p>Unique identifier of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "date",            "description": "<p>date of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "adress",            "description": "<p>adress of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "time",            "description": "<p>planned hour of the event</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>description of the event</p>"          },          {            "group": "Parameter",            "type": "array",            "optional": false,            "field": "member",            "description": "<p>list of the participant of the event</p>"          },          {            "group": "Parameter",            "type": "boolean",            "optional": false,            "field": "public",            "description": "<p>defines if the event is public or not</p>"          }        ]      }    },    "filename": "routes/events.js",    "groupTitle": "Events"  }] });
