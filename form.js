/**
 * Form.
 *
 * Lib to help form manipulations
 *
 */

define('form', ['doc'], function($) {
	'use strict';
	var isMobile = (function(){
		var nav = navigator.userAgent||navigator.vendor||window.opera;
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(nav) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(nav.substr(0,4))){
			return true;
		}
		return false;
	})();

	var messageWithArgs = function(messageToFormat) {
		for (var i = 1; i < arguments.length; i++) {
			var index = (i - 1);
			messageToFormat = messageToFormat.replace('{' + index + '}', arguments[i]);
		}

		return messageToFormat;
	};

	var defaultValidationMessages = {
		'required': 'This field is required',
		'min': 'Please enter a value greater than or equal to {0}',
		'max': 'Please enter a value less than or equal to {0}',
		'maxlength': 'Please enter a value with max length less than or equal to {0}',
		'pattern': 'Please enter a valid value',
		'email': 'Please enter a valid email address',
		'url': 'Please enter a valid url'
	};

	var emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

	var Form = function(config) {
		var validationMessages = (config && config.messages) || defaultValidationMessages;

		var getEmailValidate = function($field) {
			var fieldValue = $field.val();

			if (fieldValue && $field.attr('type') === 'email' && !emailPattern.test(fieldValue)) {
				return validationMessages.email;
			}
		};

		var getUrlValidate = function($field) {
			var fieldValue = $field.val();

			if (fieldValue && $field.attr('type') === 'url' && !$field.first().validity.valid) {
				return validationMessages.url;
			}
		};

		var getPatternValidate = function($field) {
			var fieldValue = $field.val(),
				pattern = new RegExp('^' + $field.attr('pattern') + '$');

			if (fieldValue && $field.attr('pattern') !== null && !pattern.test(fieldValue)) {
				return validationMessages.pattern;
			}
		};

		var getMaxOrMinMessage = function($field, condition) {
			var fieldValue = $field.val(),
				type = $field.attr('max') ? 'max' : 'min',
				typeValue = $field.attr(type);

			if (fieldValue && typeValue !== null) {
				var numericTypeValue = parseInt(typeValue, 10),
					numericFieldValue = parseInt(fieldValue, 10);

				if (isNaN(numericFieldValue) || condition(numericFieldValue, numericTypeValue)) {
					return messageWithArgs(validationMessages[type], typeValue);
				}
			}
		};

		var getMinValidate = function($field) {
			if (!$field.attr('min')) {
				return false;
			}

			return getMaxOrMinMessage($field, function(numericFieldValue, numericTypeValue) {
				return numericFieldValue < numericTypeValue;
			});
		};

		var getMaxValidate = function($field) {
			if (!$field.attr('max')) {
				return false;
			}

			return getMaxOrMinMessage($field, function(numericFieldValue, numericTypeValue) {
				return numericFieldValue > numericTypeValue;
			});
		};

		var getMaxLengthValidate = function($field) {
			var length = $field.attr('maxlength'),
				fieldValue = $field.val();

			if (fieldValue && $field.attr('maxlength') !== null && fieldValue.length > length) {
				return messageWithArgs(validationMessages.maxlength, length);
			}
		};

		var getRequiredValidate = function($field) {
			if (!$field.val() && $field.attr('required') !== null) {
				return validationMessages.required;
			}
		};

		var validateField = function($field) {
			var result = { field: $field },
				validationMessage = getEmailValidate($field) || getUrlValidate($field) || getPatternValidate($field) || getMinValidate($field) || getMaxValidate($field) || getMaxLengthValidate($field) || getRequiredValidate($field);

			if (validationMessage) {
				result.message = validationMessage;
			}

			return result;
		};

		var validateForm = function($form) {
			var validationErrors = [],
				result;

			$form.find('input').each(function(el) {
				result = validateField($(el));
				if (result.message) {
					validationErrors.push(result);
				}
			});

			return validationErrors;
		};

		var toDoc = function(selectorOrElements) {
			if (typeof selectorOrElements === 'object' && 'els' in selectorOrElements) { // doc-amd object
				return selectorOrElements;
			}
			return $(selectorOrElements);
		};


		/**
		 * @param selectorOrElements CSS selector, DOM node, array with DOM nodes, HTMLCollection, NodeList or doc-amd object with selected form fields
		 * @param function to execute before submitting form
		 *
		 * Usage example:
		 * 	form.submitOnChange(<FORM_ELEMENTS>, BEFORE_FUNCTION);
		 */
		this.submitOnChange = function(selectorOrElements, beforeSubmit) {
			var $elements = toDoc(selectorOrElements);
			$elements.on('change', function() {
				var form = $(this.form);
				if (beforeSubmit) {
					beforeSubmit();
					setTimeout(function() {
						form.trigger('submit'); // Needs to be asynchronous because of Safari
					}, 100);
				} else {
					form.trigger('submit');
				}
			});
		};

		/**
		 * @param selectorOrElements CSS selector, DOM node, array with DOM nodes, HTMLCollection, NodeList or doc-amd object with selected form fields
		 *
		 * Usage example:
		 * 	form.submitOnBlur(<FORM_ELEMENTS>);
		 */
		this.submitOnBlur = function(selectorOrElements) {
			var $elements = toDoc(selectorOrElements);
			$elements.on('blur', function() {
				if (this.value.trim().length > 0) {
					$(this.form).trigger('submit');
				}
			});
		};

		/**
		 * @param selectorOrElements CSS selector, DOM node, array with DOM nodes, HTMLCollection, NodeList or doc-amd object with selected form fields
		 *
		 * Usage example:
		 * 	form.focus(<FORM_ELEMENT>);
		 */
		this.focus = function(selectorOrElements) {
			var $elements = toDoc(selectorOrElements);
			$elements.trigger('focus');
			if (isMobile && $elements.isPresent()) {
				$elements.parent().scrollIntoView();
			}
		};

		/**
		 * @param selectorOrElements CSS selector, DOM node, array with DOM nodes, HTMLCollection, NodeList or doc-amd object with selected forms
		 * @param configs optional object with success callback and error callback
		 *
		 * Usage example:
		 * 	form.validate(<FORM_ELEMENT>, configs);
		 */
		this.validate = function(selectorOrElements, configs) {
			var $form = toDoc(selectorOrElements);
			$form.attr('novalidate', true);
			$form.throttle('submit', function() {
				var errors = validateForm.call(this, $form);
				if (errors.length == 0) {
					configs && configs.success && configs.success.apply(this, arguments);
				} else {
					configs && configs.error && configs.error.call(this, errors);
				}
			});
		};

		/**
		 * @param selectorOrElements CSS selector, DOM node, array with DOM nodes, HTMLCollection, NodeList or doc-amd object with selected form fields
		 *
		 * Usage example:
		 * 	form.validateField(<FIELD_ELEMENT>);
		 */
		this.validateField = function(selectorOrElements) {
			var $field = toDoc(selectorOrElements);
			return validateField($field);
		};
	};

	return Form;
});
