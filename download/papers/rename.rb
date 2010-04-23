#!/usr/bin/env ruby1.9

require 'fileutils'
infile = ARGV.shift

new_name = infile.downcase.gsub(/-/,'.').gsub(/ /,'-')

FileUtils.mv(infile, new_name, :verbose => true)

