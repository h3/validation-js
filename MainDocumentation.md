# Usage #

Here a very simple example of how you can use this script:

```

<input type="text" id="email" class="isValidEmail" value="bob@leponge.com" />
<input type="button" value="Test" onclick="testEmail();" />

```

```

function testEmail() {
  // $F('email').isValid() 
  // or $F('email').isValidEmail() would work too.
  if (!$V('email')) {
    alert('Invalid e-mail !');
  }
  else {
    alert('Valid e-mail !');
  }
}

```

# Methods #

| `isValid` |	Test element against validation(s) specified within his class name. |
|:----------|:--------------------------------------------------------------------|
| `setModified` | Add modified class name to element |
| `setUnmodified` | Remove modified class name to element |
| `isModified` |Return true if element has class name modified |
| `isUnModified` | Return true if element has not class name modified |
| `isEmpty` | Return true if element is empty |
| `isNotEmpty` | Return true if element is not empty |
| `isValidBoolean` | Return true if the element is a valid boolean (mostly needed for internal use). |
| `isValidEmail` | Return true if the element is a valid e-mail address (WARNING: still not 100% reliable, sorry) |
| `isValidInteger` | Return true if the element is a valid integer |
| `isValidNumeric` | Return true if the element is a valid numeric value (int or float) |
| `isValidAlphaNumeric` | Return true if the element is a valid numeric or alphabetic |
| `isValidDatetime` | Return true if the element is a valid datetime format (MySQL), (WARNING: this function does not ensure that the date is valid in the calendar) |
| `isValidDate` | Return true if the element is a valid date format (MySQL), (WARNING: this function does not ensure that the date is valid in the calendar) |
| `isValidTime` | Return true if the element is a valid time format (MySQL), (WARNING: this function does not ensure that the date is valid in the calendar) |
| `isValidIPv4` | Return true if element is a valid IP address, IPv6 will come when I'll be a regex Jedi |
| `isValidCurrency` | Return true if element is a valid currency |
| `isValidSSN` | Return true if element is a valid Social Security Number (Canada) |
| `isValidSIN` | Return true if element is a valid Social Insurance Number (Canada) |

**Note**: isValidCurrency will return true for values like this;

  * 1,23$
  * 1,23 $
  * $ 1.23
  * $1,23
  * $23
  * 23$
  * 23¢
  * ¢23

# Tips #

You can use $V as shortcut, ex;

```
$F('amount').isValid() == $V('amount');
```

In fact for most validation you should use $V, except if you want a greater control over your script.