#!/usr/bin/env ruby

require 'open-uri'
require 'erb'
require 'pp'

require 'rubygems'
require 'json'

PUBMED_QUERY = "Chapados+BR"

class PubmedRecord
  
  def initialize(json)
    @raw = json
  end
  
  def title
    @title ||= @raw["MedlineCitation"]["Article"]["ArticleTitle"]
  end

  def journal
    @journal ||= @raw["MedlineCitation"]["Article"]["Journal"]["ISOAbbreviation"]
  end

  def year
    @year ||= @raw["MedlineCitation"]["DateCreated"]["Year"]
  end
  
  def volume
    @volumne ||= @raw["MedlineCitation"]["Article"]["Journal"]["JournalIssue"]["Volume"]
  end

  def pages
    @pages ||= @raw["MedlineCitation"]["Article"]["Pagination"]["MedlinePgn"]
  end

  def pmid
    @pmid ||= @raw["MedlineCitation"]["PMID"]
  end
  
  def authors
    authors = @raw["MedlineCitation"]["Article"]["AuthorList"]["Author"]
    authors = [authors] unless authors.is_a?(Array)
    @authors = authors.map { |e| %Q{#{e['LastName']} #{e['Initials']}} }
  end
  
end



pubmed_params = {
      :_id => "1b39ecc3914d5f3f2570d8800e5e80a2",
      :_render => "json",
      :q => PUBMED_QUERY,
      :n => 10,
      :offset => 0,
    }

query_string = pubmed_params.map { |k, v| "#{k}=#{v}" }.join("&")
result = open("http://pipes.yahoo.com/pipes/pipe.run?#{query_string}")

json = JSON.parse(result.read)
pubs = json["value"]["items"]

pubs.map! { |e| PubmedRecord.new(e) }

template = File.open("pubmed.rhtml") { |f| f.read }.gsub(/^  /, '')

rhtml = ERB.new(template)

puts "---"
puts "layout: default"
puts "---"
rhtml.run
