define({ "api": [
  {
    "type": "get",
    "url": "/event/:_id",
    "title": "Request a event's information",
    "name": "GetEvents",
    "group": "Events",
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
    "version": "0.0.0",
    "filename": "routes/events.js",
    "groupTitle": "Events"
  }
] });
