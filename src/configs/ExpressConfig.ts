import { Express } from "express";

const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

module.exports = (app: Express) => {
	// for Test
	app.get('/', (req, res) => {
		res.sendFile(pathFromRoot('public', 'index.html'));
	});

	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({extended: false}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	// app.use('/', indexRouter);
};