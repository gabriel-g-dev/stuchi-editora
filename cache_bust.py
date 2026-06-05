import os, re, shutil

if os.path.exists('assets/css/style-v2.css'):
    shutil.move('assets/css/style-v2.css', 'assets/css/style-v3.css')

if os.path.exists('assets/img/favicon.png'):
    shutil.move('assets/img/favicon.png', 'favicon.ico')

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root: continue
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            content = re.sub(r'assets/css/style-v2\.css(?:\?v=\d+)?', 'assets/css/style-v3.css', content)
            
            depth = len(os.path.relpath(path, '.').split(os.sep)) - 1
            prefix = '../' * depth if depth > 0 else ''
            
            content = re.sub(r'<link rel="icon"[^>]*href="[^"]*favicon[^"]*"[^>]*>', f'<link rel="icon" type="image/x-icon" href="{prefix}favicon.ico">', content)
            
            with open(path, 'w', encoding='utf-8') as file:
                file.write(content)
print('Cache busting completed.')
