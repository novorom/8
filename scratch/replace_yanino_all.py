import os
import re

directories = ['app', 'components', 'lib', 'public', 'scripts']

replacements = [
    (r'(?i)в Янино-1', 'в СПб'),
    (r'(?i)в Янино', 'в СПб'),
    (r'(?i)из Янино-1', 'со склада в СПб'),
    (r'(?i)из Янино', 'со склада в СПб'),
    (r'(?i)склад Янино-1', 'склад в СПб'),
    (r'(?i)склад Янино', 'склад в СПб'),
    (r'(?i)Янино-1', 'СПб'),
    (r'(?i)Янино', 'СПб'),
    (r'Cersanit СПб', 'Cersanit'), # In case it gets replaced to this in commands
]

for directory in directories:
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.json', '.js', '.jsx', '.txt', '.php', '.md')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for pattern, repl in replacements:
                        new_content = re.sub(pattern, repl, new_content)
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {filepath}")
                except Exception as e:
                    pass
