# Form-amd

_Form-amd library_

form.js is a small library to help form manipulations and validation. This library uses [amd](http://en.wikipedia.org/wiki/Asynchronous_module_definition) structure.

[![Build Status](https://travis-ci.org/elo7/form-amd.svg?branch=master)](https://travis-ci.org/elo7/form-amd)

#### Why?

We needed a small lib to validate (using almost all the html5 attributes validate spec) and manipulations of our forms elements.

Then, we built it from scratch.

## Installation

Install with [Bower](http://bower.io): `bower install form-amd`

## Dependencies

Form-amd depends on an [amd](http://en.wikipedia.org/wiki/Asynchronous_module_definition) implementation. We suggest [async-define](https://gist.github.com/sergiolopes/5778124) implementation for dependency lookup.
Form-amd also depends on [doc-amd](https://github.com/elo7/doc-amd).

## Methods

#### submitOnChange
`.submitOnChange(selector[, callback])`

###### Description:
Submit the parent form when event **change** is triggered.

###### Parameters:
> querySelector: String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

> callback: Function() //A function to call before the event is triggered

###### Sample:
``` js
define(['form'], function(form) {
	form.submitOnChange('#country'); //Submit the parent form when the country is selected
	form.submitOnChange('#country', function(){...}); //Submit the parent form when the country is selected and run the callback before submit
});
```

#### submitOnBlur
`.submitOnBlur(selector)`

###### Description:
Submit the parent form when event **blur** is triggered.

###### Parameters:
> querySelector: String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

###### Sample:
``` js
define(['form'], function(form) {
	form.submitOnBlur('#name'); //Submit the parent form when the form element lose focus
});
```

#### focus
`.focus(selector)`

###### Description:
Focus on element and scrollIntoView when device is mobile.

###### Parameters:
> querySelector: String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

###### Sample:
``` js
define(['form'], function(form) {
	form.focus('#input'); //Focus on element
});
```

#### validate
`.validate(selector[, object])`

###### Description:
Validate the form using almost all the html5 attributes validate spec.

###### Parameters:
> querySelector: String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

> object: Object //An object with the properties _messages_ ("required", "min", "maxlength", "pattern" or "email"), _success_ (function callback) or _error_ (function callback)

###### Sample:
``` js
define(['form'], function(form) {
	form.validate('#form'); //Validate the form with default messages
	form.validate('#form', {
		messages: {
			'required': 'Field required.',
			'min': 'Enter a value greater than or equal to {0}.',
			'maxlength': 'Enter a value less than or equal to {0}.',
			'pattern': 'Enter a valid value.',
			'email': 'Enter a valid email address.'
		}, //Validate the form with this messages
		success: function(){
			// success callback
		},
		error: function(){
			// error callback
		}
	});
});
```

###### Default messages:
``` txt
required: This field is required
min: Please enter a value greater than or equal to {0}
maxlength: Please enter a value less than or equal to {0}
pattern: Please enter a valid value
email: Please enter a valid email address
```

#### appendMessage
`.append(selector, text)`

###### Description:
Append messages with the validate tag format

###### Parameters:
> querySelector: String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

> text: String

###### Sample:
``` js
define(['form'], function(form) {
	form.append('label[for="date"]', 'dd/mm/yyyy'); //This will append <span class="message">dd/mm/yyyy</span>. Note that, this tag will be removed when the user start to input value on the form element inside label
});
```

#### removeValidationErrors
`.removeValidationErrors(selector)`

###### Description:
Removes all validate messages from form

###### Parameters:
> querySelector: String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

###### Sample:
``` js
define(['form'], function(form) {
	form.removeValidationErrors('#form'); //This will remove all validate messages appended
});
```

## License

Form-amd is released under the [BSD](https://github.com/elo7/form-amd/blob/master/LICENSE). Have at it.

* * *

Copyright :copyright: 2015 Elo7# form-amd
