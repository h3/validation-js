/**
 * validate.js
 *
 * @author 	Maxime Haineault <max@centdessin.com>
 * @version	0.9
 * @desc 	Library to handle forms and data validation
 *
 */

Validation = {
  version: 0.9,
  en:      'en',
  insert:  'After'
}

Validation.messages = {
  isModified:          'This field must be modified.',
  isUnModified:        'This field must be not modified.',
  isEmpty:             'This field must be empty.',
  isNotEmpty:          'Ce champ est obligatoire.',
  isValidBoolean:      'This field must be boolean',
  isValidEmail:        'This field must be a valid e-mail address.',
  isValidInteger:      'This field must be a valid integer.',
  isValidNumeric:      'This field must be a valid numeric value.',
  isValidAplhaNumeric: 'This field must contain only alphanumeric values.',
  isValidDatetime:     'This field must be a valid MySQL datetime format (DDDD-DD-DD DD:DD:DD).',
  isValidDate:         'This field must be a valid MySQL date format (DDDD-DD-DD).',
  isValidTime:         'This field must be a valid MySQL time format (DD:DD:DD).',
  isValidIPv4:         'This field must be a valid IP v4 format (0.0.0.0 to 255.255.255.255).',
  isValidCurrency:     'This field must be a valid currency format.',
  isValidSSN:          'This field must be a valid Social Security Number (DDD-DD-DDDD or DDDDDDDDD).',
  isValidSIN:          'This field must be a valid Social Insurance Number (DDDDDDDDD).'
}

Validation.errorCallback = function(form, errors) {
  // avoid displaying error message twice
  form.getElementsByClassName('validationErrorMsg').each(function(el){ el.remove(); });
  form.getElementsByClassName('validationErrorMsgTrue').each(function(el){ el.removeClassName('validationErrorMsgTrue'); });
  errors[0].element.focus();
	  
  for (var i=0, l=errors.length; i<l; ++i) {
    // ensure that there is only one message by element
    if (!errors[i].element.hasClassName('validationErrorMsgTrue')) {
      new Insertion[Validation.insert](errors[i].element, '<span class="validationErrorMsg">'+ errors[i].message +'</span>');
      errors[i].element.addClassName('validationErrorMsgTrue');
    }
  }
  return false;
}

Validation.load = function() {
  $$('form.validate').each(function(form) {
    form.onsubmit = form.validate;
  });
}

Object.extend(Form.Methods, {
  validate: function(element) {
  	errors    = [];
  	textareas = $A(element.getElementsByTagName('textarea'));
  	selects   = $A(element.getElementsByTagName('select'));
    inputs    = $A(element.getElementsByTagName('input')).concat(textareas, selects);
    inputs.each(function(input){
      validations = input.className.match(/isValid\w+|isEmpty|isModified|isUnModified|isNotEmpty/g);
      if (validations) validations.each(function(validation){
        if(input[validation] && !input[validation]()) {
          errors.push({
  		    element:    input,
  			validation: validation,
  			message:    Validation.messages[validation] || 'Error.'
  		  });
  		  input.addClassName('validationErrors');
  		}
  	  });
    });
    if (errors.length > 0) {
      element.addClassName('validationErrors');
  	  Validation.errorCallback(element, errors);
  	  return false;
  	}
  	else return true;
  }
});

Object.extend(Form.Element.Methods, {

  /* Element modifiers */
  setModified: function(element) {
    $(element).addClassName('modified');
  },
  setUnModified: function(element) {
    $(element).removeClassName('modified');
  },
  
  /* Basic validation */
  isRequired: function(element) {
    return $(element).hasClassName('isNotEmpty');
  },
  isModified: function(element) {
    return $(element).hasClassName('modified');
  },
  isUnModified: function(element) {
    return !$(element).hasClassName('modified');
  },
  isEmpty: function(element) {
  	return $F(element) == '';
  },
  isNotEmpty: function(element) {
  	return $F(element) != '';
  },
  
  /* Advanced validation */
  isValid: function(element) {
    valid = true;
    element.className.match(/isValid\w+|isEmpty|isModified|isUnModified|isNotEmpty/g).each(function(className) {
      if(!$(element)[className]()) valid = false;
    });
    return valid;
  },
  isValidBoolean: function(element) {
    return !!$F(element).match(/^(0|1|true|false)$/);
  },
  isValidEmail: function(element) {
    return !!$F(element).match(/(^[a-z]([a-z_\.]*)@([a-z_\.]*)([.][a-z]{2,3})$)|(^[a-z]([a-z_\.]*)@([a-z_\-\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i); 
  },
  isValidInteger: function(element) {
    return !!$F(element).match(/(^-?\d+$)/);
  },
  isValidNumeric: function(element) {
    return !!$F(element).match(/(^-?\d\d*[\.|,]\d*$)|(^-?\d\d*$)|(^-?[\.|,]\d\d*$)/);
  },
  isValidAplhaNumeric: function(element) {
    return !!$F(element).match(/^[_\-a-z0-9]+$/gi);
  },
  // 0000-00-00 00:00:00 to 9999:12:31 59:59:59 (no it is not a "valid DATE" function)
  isValidDatetime: function(element) {
    dt = $F(element).match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);
    return dt && !!(dt[1]<=9999 && dt[2]<=12 && dt[3]<=31 && dt[4]<=59 && dt[5]<=59 && dt[6]<=59) || false;
  },
  // 0000-00-00 to 9999-12-31
  isValidDate: function(element) {
    d = $F(element).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return d && !!(d[1]<=9999 && d[2]<=12 && d[3]<=31) || false;
  },
  // 00:00:00 to 59:59:59
  isValidTime: function(element) {
    t = $F(element).match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
    return t && !!(t[1]<=24 && t[2]<=59 && t[3]<=59) || false;
  },
  // 0.0.0.0 to 255.255.255.255
  isValidIPv4: function(element) { 
    ip = $F(element).match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    return ip && !!(ip[1]<=255 && ip[2]<=255 && ip[3]<=255 && ip[4]<=255) || false;
  },
  isValidCurrency: function(element) { // Q: Should I consider those signs valid too ? : ¢|€|₤|₦|¥
    return $F(element).match(/^\$?\s?\d+?[\.,\,]?\d+?\s?\$?$/) && true || false;
  },
  // Social Security Number (999-99-9999 or 999999999)
  isValidSSN: function(element) {
    return $F(element).match(/^\d{3}\-?\d{2}\-?\d{4}$/) && true || false;
  },
  // Social Insurance Number (999999999)
  isValidSIN: function(element) {
    return $F(element).match(/^\d{9}$/) && true || false;
  }
});
Element.addMethods();
if (typeof $V == 'undefined') $V = function(el) { return $(el).isValid(); }