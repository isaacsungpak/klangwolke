import re
from wtforms.validators import ValidationError

def validate_trimmed_length(min = 1, max = 100):
    message = f'Title must consist of {min}-{max} non-space characters.'
    def _length(form, field):
        string = field.data
        trimmed_string = re.sub(' |​', '', string)
        if len(trimmed_string) > max or len(trimmed_string) < min:
            raise ValidationError(message)
    return _length
