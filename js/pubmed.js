/*var $ = 'Hi!'; 
jQuery(function($){ 
  alert('$ = '+ $); 
});*/
function include(filename)
{
	var head = document.getElementsByTagName('head')[0];
	
	script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';
	
	head.appendChild(script)
}
include('js/json2.js');

// requires jQuery
var pubmed = {
  search: function(searchTerm){
    //e.preventDefault();
    var params = {
      _id: "1b39ecc3914d5f3f2570d8800e5e80a2",
      _render: "json",
      q: searchTerm,
      n: 10,
      offset: 0,
    };
    console.log(params);
    $.get("http://pipes.yahoo.com/pipes/pipe.run?_callback=?", params, pubmed.response, "json");
    return false;
  },
    
  response: function(data){

    var ul = $("#pubmed-results").empty().append($("<ul/>")).find("ul");
    
    console.log(data);
    
    var parser = {
      title: function(pub) {
        return pub.MedlineCitation.Article.ArticleTitle;
      },
      
      authorList: function(pub) {
        function map(fn, a)
        {
          var ret = new Array(a.length);
          for (i = 0; i < a.length; i++) {
              ret[i] = fn(a[i]);
          }
          return ret;
        }
        
        var authors = pub.MedlineCitation.Article.AuthorList.Author;        
        var shortName = function(a) {
          return a.LastName + " " + a.Initials;
        }
        
        var shortNames = authors.map(shortName);
        return shortNames.join(", ");
      },
      
      journal: function(pub) {
        return pub.MedlineCitation.Article.Journal.ISOAbbreviation + " ";
      },
      
      year: function(pub) {
        return pub.MedlineCitation.DateCreated.Year;
      },
      
      pubdate: function(pub) {
        var date = pub.MedlineCitation.Article.Journal.JournalIssue.PubDate;
        return date.Month + " " + date.Day + ", " + date.Year;
      },
      
      volume: function(pub) {
        return pub.MedlineCitation.Article.Journal.JournalIssue.Volume;
      },
      
      pages: function(pub) {
        return pub.MedlineCitation.Article.Pagination.MedlinePgn;
      },
      
      pmid: function(pub) {
        return pub.MedlineCitation.PMID;
      },
      
      html: function(pub) {
        ul.append($("<li/>")
          .append($("<a/>")
            .attr("href", "http://pubmed.gov/" + parser.pmid(item))
            .text(parser.title(item)))
          .append(parser.authorList(item))
          .append(parser.journal(item))
          .append(parser.volume(item))
          .append(parser.year(item))
        // Article.AuthorList.Author.LastName,Forename,Initials
        );
      }
    };
    
    var format = function(pub, parser) {
      var ref = {
        title: function() { 
          return $("<div class='title'/>")
            .append($("<a/>")
              .attr("href", "http://pubmed.gov/" + parser.pmid(pub))
              .text(parser.title(pub)));
        },
        
        authors: function() {
          return $("<div class='authors'/>")
            .append(parser.authorList(pub));
        },
        
        journal: function() {
          return $("<span class='journal'/>")
            .append(parser.journal(pub));
        },
        
        date: function() {
          var date = $("<span class='year'/>")
          //date.attr({ title: date });
          return date.append(parser.year(pub));
          // <abbr class="date-published" title=> 2008 Oct 17</abbr>
        },
        
        volume: function() {
          return $("<span class='volume'/>")
            .append(parser.volume(pub));
        },
        
        pages: function() {
          return $("<span class='pages'/>")
            .append(parser.pages(pub));
        }
      };
      
      return ul.append($("<li/>")
        .append(ref.title())
        .append(ref.authors())
        .append($("<div class='publication'/>")
          .append(ref.date())
          .append(ref.journal())
          .append(ref.volume())
          .append(ref.pages())));
      
    };

    var toJSON =  function (pub, parser) {
      var data = { "title": parser.title(pub),
               "authors": parser.authorList(pub),
               "journal": parser.journal(pub),
               "volume": parser.volume(pub),
               "pages": parser.pages(pub),
               "year": parser.pages(pub) };
      return data;
    };
    
    for (var i = 0, item; item = data.value.items[i++];)
      if (item.MedlineCitation)
//         JSON.stringify(toJSON(item, parser));
        format(item, parser);
  }
};

pubmed.search(PUBMED_SEARCH);

