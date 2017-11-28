# Form-amd

_Form-amd library_

form.js is a small library to help form validation. This library uses [amd](http://en.wikipedia.org/wiki/Asynchronous_module_definition) structure.

[![Build Status](https://travis-ci.org/elo7/form-amd.svg?branch=master)](https://travis-ci.org/elo7/form-amd)

It uses html5 form attributes validate specification and works on browsers that does not support html5 validation.
Then, we built it from scratch.

## Installation

Install with [Bower](http://bower.io): `bower install form-amd`

## Dependencies

Form-amd depends on an [amd](http://en.wikipedia.org/wiki/Asynchronous_module_definition) implementation. We suggest [async-define](https://gist.github.com/sergiolopes/5778124) implementation for dependency lookup.
Form-amd also depends on [doc-amd](https://github.com/elo7/doc-amd).

## Methods

#### submitOnChange
`.submitOnChange(selectorOrDocElement[, callback])`

###### Description:
Submit the parent form when event **change** is triggered.

###### Parameters:
> selectorOrDocElement: doc-amd object or String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

> callback: Function() //A function to call before the event is triggered

###### Sample:
``` js
define(['form'], function(Form) {

  var form = new Form();

  form.submitOnChange($('#country')); //Submit the parent form when the country is selected
  form.submitOnChange('#country', function(){...}); //Run the callback function and then submit the parent form when the country is selected
});
```

#### submitOnBlur
`.submitOnBlur(selectorOrDocElement)`

###### Description:
Submit the parent form when event **blur** is triggered.

###### Parameters:
> selectorOrDocElement: doc-amd object or String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

###### Sample:
``` js
define(['form'], function(Form) {
  var form = new Form();
  form.submitOnBlur('#name'); //Submit the parent form when the form element loses focus
});
```

#### focus
`.focus(selectorOrElements)`

###### Description:
Focus on selected element. If the device is mobile, it calls **scrollIntoView** function.

###### Parameters:
> selectorOrDocElement: doc-amd object or String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

###### Sample:
``` js
define(['form'], function(Form) {
  var form = new Form();
  form.focus($('#input')); //Focus on the element #input
});
```

#### validate
`.validate(selectorOrDocElement[, object])`

###### Description:
Validate the form using almost all the html5 attributes validate spec. Returns a array with the error messages.

###### Parameters:
> selectorOrDocElement: doc-amd object or String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

> _success_ (function callback) or _error_ (function callback)

###### Sample:
``` js
define(['form'], function(Form) {
  var form = new Form();

  form.validate('#form', {
    success: function() {
      // success callback
    },
    error: function() {
      // error callback
    }
  });
});
```

#### validateField
`.validateField(selectorOrElements)`

###### Description:
Validate individual fields. Returns an object with a error message.

###### Parameters:
> selectorOrDocElement: doc-amd object or String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

###### Sample:
``` js
define(['form'], function(Form) {
  var form = new Form();
  form.validateField($('input[name=example1]')); //This will validate the field with name 'example1' and it will show a error message.
});
```

### Customize messages
new Form({ messages: object });

###### Description:
Customize the error messages

###### Parameters:
> object: Object //An object with the properties messages ("required", "min", "max", "maxlength", "pattern" or "email")

###### Sample:
``` js
define(['form'], function(Form) {
   var custom_messages = {
      'required': 'Field required.',
      'min': 'Enter a value greater than or equal to {0}.',
      'max': 'Enter a value greater than or equal to {0}.',
      'maxlength': 'Enter a value with max length less than or equal to {0}.',
      'pattern': 'Enter a valid value.',
      'email': 'Enter a valid email address.'
  }

  var form = new Form({ messages: custom_messages });

  form.validate('#form');
});
```

###### Default messages:
``` txt
 required: This field is required
 min: Please enter a value greater than or equal to {0}
 max: 'Please enter a value greater than or equal to {0}'
 maxlength: Please enter a value with max length less than or equal to {0}
 pattern: Please enter a valid value
 email: Please enter a valid email address
```

## License

Form-amd is released under the [BSD](https://github.com/elo7/form-amd/blob/master/LICENSE). Have at it.

* * *

Copyright :copyright: 2016 Elo7# form-amd
