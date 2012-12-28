require(['ko', 'jquery', 'marked', 'underscore'], 
function(ko, $, marked, _) {
	ko.bindingHandlers.marked = {
		init: function(element, valueAccessor, allBindingsAccessor) {
			var output = $(allBindingsAccessor().markedOutput);
			var input = $(element);
			
			// Make the div editable.
			input.attr('contentEditable','true');
			
			input.on('keyup', function() {	
				var value = input.html();
				
				// strip out all the junk and convert to markdown.
				if (value) {
					value = value.replaceAll('</div>', '').replaceAll('<br>', '\n').replaceAll('&nbsp;', ' ');
					value = value.replaceAll('<div>','  \n'); // I don't know what markdown is playing at with '  ' = <br/> but this fixes it.
					value = marked(value);
				};
				
				output.html(value);
			})
		}
	};
});