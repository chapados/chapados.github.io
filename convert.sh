#!/bin/bash
export DB="chapados_org_live"
export USER=root
export PASS=""
ruby -r '/Users/chapbr/repos/jekyll/lib/jekyll/converters/mephisto' -e 'Jekyll::Mephisto.process("#{ENV["DB"]}", "#{ENV["USER"]}", "#{ENV["PASS"]}")'
