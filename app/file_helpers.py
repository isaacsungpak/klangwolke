import re


ALLOWED_AUDIO_EXTENSIONS = {"wav", "m4a", "mp3"}
ALLOWED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def title_is_ok(title):
    trimmed_title = re.sub(' |​', '', title)
    return len(trimmed_title) > 1 and len(trimmed_title) <= 255

def audio_file_is_ok(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_AUDIO_EXTENSIONS

def image_file_is_ok(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS
