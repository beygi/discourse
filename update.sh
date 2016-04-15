#!/bin/bash
git pull
bundle install
bundle exec rake db:migrate
