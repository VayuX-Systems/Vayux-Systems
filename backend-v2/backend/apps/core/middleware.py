import time
import re
from urllib.parse import unquote
from django.http import HttpResponseForbidden, JsonResponse
from django.utils import timezone
from .models import ActivityAuditLog, BlockedIP

# Comprehensive threat reconnaissance & attack signatures
THREAT_PATTERNS = [
    # Sensitive file disclosure & environment leaks
    r'\.env',
    r'\.git/',
    r'\.aws/',
    r'\.ssh/',
    r'wp-config\.php',
    r'actuator/(heapdump|env)',
    r'solr/admin',
    r'telescope/requests',
    r'vendor/phpunit',
    
    # CMS & web shell probe patterns
    r'wp-admin',
    r'wp-login\.php',
    r'phpinfo\.php',
    r'cgi-bin',
    r'shell\.php',
    r'alfa\.php',
    
    # Path Traversal / Local File Inclusion (LFI)
    r'\.\./\.\.',
    r'/etc/passwd',
    r'/etc/shadow',
    r'/windows/win\.ini',
    r'/proc/self',

    # Remote Code Execution (RCE) / Command Injection
    r'eval\(',
    r'passthru\(',
    r'base64_decode\(',
    r'cmd\.exe',
    r'/bin/(sh|bash)',

    # SQL Injection Signatures
    r'union\s+select',
    r'information_schema',
    r'sleep\(\s*\d+\s*\)',
    r'benchmark\(\s*\d+',
    r'waitfor\s+delay',
    r'\'(\s+or\s+|\s+and\s+)[\'\"\d]',

    # Cross-Site Scripting (XSS) Probes in URL/Query
    r'<script[\s>]',
    r'javascript:[a-zA-Z]',
    r'onerror\s*=',
    r'onload\s*=',
]
COMPILED_THREAT_REGEX = re.compile('|'.join(THREAT_PATTERNS), re.IGNORECASE)


class SecurityHeadersMiddleware:
    """
    Enforces enterprise security headers on every response.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Hardened headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=(self)'
        response['X-XSS-Protection'] = '1; mode=block'
        
        # Modern Content Security Policy
        csp = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com data:; "
            "img-src 'self' data: blob: https://vayux.systems; "
            "connect-src 'self' https://vayux.systems https://api.vayux.systems http://localhost:3000; "
            "frame-ancestors 'none'; "
            "base-uri 'self';"
        )
        response['Content-Security-Policy'] = csp
        
        return response


class ThreatProbeDefenseMiddleware:
    """
    Detects malicious web vulnerability scanner probes and blocks them immediately.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        client_ip = self.get_client_ip(request)
        path = request.path
        
        # Check if IP is in Blocked list
        if BlockedIP.objects.filter(ip_address=client_ip).exists():
            return JsonResponse({'error': 'Access Denied: Sentinel Security Shield'}, status=403)
        
        # Check for threat probe patterns with decoded normalization
        query_str = request.META.get('QUERY_STRING', '')
        decoded_path = unquote(path)
        decoded_query = unquote(query_str).replace('+', ' ')
        
        is_threat = (
            COMPILED_THREAT_REGEX.search(path) or
            COMPILED_THREAT_REGEX.search(query_str) or
            COMPILED_THREAT_REGEX.search(decoded_path) or
            COMPILED_THREAT_REGEX.search(decoded_query)
        )
        
        if is_threat:
            # Log threat probe
            try:
                ActivityAuditLog.objects.create(
                    ip_address=client_ip,
                    country_code=getattr(request, 'country_code', '--'),
                    username='threat_probe',
                    method=request.method,
                    path=path[:500],
                    status_code=403,
                    response_time_ms=0.1,
                    user_agent=request.META.get('HTTP_USER_AGENT', '')[:300],
                    is_suspicious=True,
                    threat_details='Malicious reconnaissance or injection pattern matched',
                )
            except Exception:
                pass
            
            return JsonResponse({'error': 'Access Denied: Sentinel Threat Signature Detected'}, status=403)

        return self.get_response(request)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR', '127.0.0.1')
        return ip


class ActivityAuditMiddleware:
    """
    Asynchronously records meaningful API activity, mutations, and Admin interactions.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration_ms = round((time.time() - start_time) * 1000, 2)
        
        # Log mutations (POST, PUT, DELETE, PATCH) or /admin/ requests or errors
        path = request.path
        is_mutation = request.method in ['POST', 'PUT', 'DELETE', 'PATCH']
        is_admin_or_api = path.startswith('/admin/') or path.startswith('/api/')
        
        if is_mutation or (is_admin_or_api and response.status_code >= 400):
            try:
                username = request.user.username if getattr(request, 'user', None) and request.user.is_authenticated else 'anonymous'
                client_ip = self.get_client_ip(request)
                country_code = getattr(request, 'country_code', '--')

                ActivityAuditLog.objects.create(
                    ip_address=client_ip,
                    country_code=country_code,
                    username=username,
                    method=request.method,
                    path=path[:500],
                    status_code=response.status_code,
                    response_time_ms=duration_ms,
                    user_agent=request.META.get('HTTP_USER_AGENT', '')[:300],
                    is_suspicious=response.status_code == 403,
                )
            except Exception:
                pass

        return response

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR', '127.0.0.1')
