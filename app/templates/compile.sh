#!/bin/sh
adt -package -storetype pkcs12 -keystore <%= certifName %>.pfx <%= applicationName %> <%= applicationName %>.xml index.html AirAliases.js bower_components icons app.js
