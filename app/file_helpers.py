from sqlalchemy import false


ALLOWED_AUDIO_EXTENSIONS = {"wav", "m4a", "mp3"}
ALLOWED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def title_is_ok(title):
    return len(title) > 1 and len(title) <= 255

def audio_file_is_ok(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_AUDIO_EXTENSIONS

def image_file_is_ok(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS
