$(document).ready(function(){

  var quote = "";
  var author = "";

  //First call to get the quote while initial loading
  getQuote();

	/* getQuote function definition http://quotes.stormconsultancy.co.uk/random.json
    
    function getQuote(){
		$.getJSON("http://quotes.stormconsultancy.co.uk/random.json",
						 function(json){

								quote = json.quote;
								author = json.author;

								console.log(quote.length);
								loadData();
		})

	} */ // OLD FUNCTON

    
     function getQuote(){

        $.ajax( {
          url: '/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
          success: function(data) {
            var oneQuote = data.shift(); // The data is an array of posts. Grab the first one.
              
            console.log(oneQuote.length, oneQuote.title, oneQuote.content);  
              
            $('#quote-title').text(oneQuote.title);
            $('#quote-content').html(oneQuote.content);

            // If the Source is available, use it. Otherwise hide it.
            if (typeof oneQuote.custom_meta !== 'undefined' && typeof oneQuote.custom_meta.Source !== 'undefined') {
              $('#quote-source').html('Source:' + oneQuote.custom_meta.Source);
            } else {
              $('#quote-source').text('');
            }
          },
          cache: false
        });

     }
    
    
    
    
    
    
    
    
    
	function getQuote(){
		$.getJSON("http://quotes.stormconsultancy.co.uk/random.json",
						 function(json){

								quote = json.quote;
								author = json.author;

								console.log(quote.length);
								loadData();
		})

	}

	function loadData() {
		if (quote.length > 130) {
			getQuote();
		} else {
			$('#quoteMsg').html(quote);

			if (author){
				$('#quoteAuthor').html(author);
			}
			else{
				 $('#quoteAuthor').html('Anonymous');
			}
		}
	}


	// New quote at every next button click
  $('#nextQuote').on('click', function(event){
    event.preventDefault();
    console.log("QuoteDisplay");
    getQuote();
  });

  //Share quote via Twitter
  $('#tweetQuote').on('click', function(event) {
    event.preventDefault();
    console.log("TweetDisplay");
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + ' by ' + author));
  });


});
