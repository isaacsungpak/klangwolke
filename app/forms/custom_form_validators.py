import re
from wtforms.validators import ValidationError

def validate_trimmed_length(min=1, max=100, field_name='Title'):
    max_message = f'{field_name} length cannot exceed {max} characters.'
    min_message = f'{field_name} must contain at least {min} non-space character(s).'
    def _length(form, field):
        string = field.data
        trimmed_string = re.sub(' |​', '', string)
        if len(string) > max:
            raise ValidationError(max_message)
        elif len(trimmed_string) < min:
            raise ValidationError(min_message)
    return _length
