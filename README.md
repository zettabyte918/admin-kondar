## Nginx config:

```bash
# path: /etc/nginx/sites-available/strapi.conf

# les-experts home page
server {
    listen 80;
    server_name les-experts.tn;

    root /var/www/les-experts/html;
    #index index.html;

    location = / {
        try_files $uri /index.html;
        #try_files $uri $uri/ =404;
    }
}

#nextjs admin panel
server {
    # Listen HTTP
    listen 80;
    server_name admin.les-experts.tn;

    # Proxy Config
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
}

#strapi api
server {
    # Listen HTTP
    listen 80;
    server_name api.les-experts.tn;
       
    # Proxy Config
    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }
}
```

### Copy this

`nano /etc/nginx/sites-available/les-experts`

