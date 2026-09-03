class GeoLocationMiddleware:
    """
    Detects visitor country code from HTTP headers (Cloudflare, Vercel, AWS CloudFront)
    or defaults to 'IN' for local development.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        country_code = (
            request.META.get('HTTP_CF_IPCOUNTRY') or
            request.META.get('HTTP_X_VERCEL_IP_COUNTRY') or
            request.META.get('HTTP_CLOUDFRONT_VIEWER_COUNTRY') or
            'IN'
        ).upper()

        request.country_code = country_code
        response = self.get_response(request)
        # Expose detected country in response header for edge debugging
        response['X-Sentinel-Geo-Country'] = country_code
        return response
