import base64
import os
from cryptography.fernet import Fernet
from django.conf import settings

def get_fernet_cipher():
    """Returns a Fernet cipher instance based on FIELD_ENCRYPTION_KEY."""
    raw_key = getattr(settings, 'FIELD_ENCRYPTION_KEY', 'r0h1tV4yuX53nt1n3lK3y32Byt35L0ngS3cur3==')
    # Pad or slice to exactly 32 bytes and base64 encode
    byte_key = raw_key.encode('utf-8')[:32].ljust(32, b'0')
    b64_key = base64.urlsafe_b64encode(byte_key)
    return Fernet(b64_key)

def encrypt_text(plain_text: str) -> str:
    """Encrypts plain text string into a secure ciphertext string."""
    if not plain_text:
        return ""
    cipher = get_fernet_cipher()
    encrypted_bytes = cipher.encrypt(plain_text.encode('utf-8'))
    return encrypted_bytes.decode('utf-8')

def decrypt_text(cipher_text: str) -> str:
    """Decrypts ciphertext string back into plain text string."""
    if not cipher_text:
        return ""
    try:
        cipher = get_fernet_cipher()
        decrypted_bytes = cipher.decrypt(cipher_text.encode('utf-8'))
        return decrypted_bytes.decode('utf-8')
    except Exception:
        # If decryption fails (e.g. key mismatch or unencrypted data), return original
        return cipher_text
