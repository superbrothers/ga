#!/usr/bin/env node

const ga = require("../lib/index.js");
ga.parse(process.argv);
if (ga.args.length === 0) ga.help();
