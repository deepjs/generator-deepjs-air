#!/bin/sh
adt -certificate -cn SelfSign -ou <%= initials %> -o "<%= organisation %>" -c COUNTRY 1024-RSA <%= certifName %>.pfx <%= certifPassword %>
