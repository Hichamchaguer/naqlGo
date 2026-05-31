# Base image
FROM nginx:1.31-alpine
    
# Expose HTTP port
EXPOSE 80

# Install OpenSSL for self-signed certificates
# RUN apk add --no-cache openssl

# Create directory for certificates
# RUN mkdir -p /etc/nginx/ssl

# Generate self-signed certificate (for local dev only)
# RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
#     -keyout /etc/nginx/ssl/dev.nqlgo.ma.key \
#     -out /etc/nginx/ssl/dev.nqlgo.ma.crt \
#     -subj "/O=UPM Dev /CN=pprod.nqlgo.ma"

# Copy custom Nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Optional: Use local HTML for dev if needed
# COPY ./html /usr/share/nginx/html

# Allow Nginx to serve any development files (for debugging)
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]