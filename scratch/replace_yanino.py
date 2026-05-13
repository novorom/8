import os
import re

directories = ['app', 'components', 'lib']

replacements = [
    (r'(?i)в посёлке янино-1 \(15-20 минут от КАД\)', 'в СПб'),
    (r'(?i)в п\. Янино-1, Ленинградская область \(рядом с КАД\)', 'в СПб'),
    (r'(?i)п\. Янино-1', 'Санкт-Петербург'),
    (r'(?i)мкр\. Кольцевой, участок 37', ''),
    (r'(?i)из Янино-1', 'со склада в СПб'),
    (r'(?i)из Янино', 'со склада в СПб'),
    (r'(?i)в Янино-1', 'в СПб'),
    (r'(?i)в Янино', 'в СПб'),
    (r'(?i)склад Янино', 'склад в СПб'),
    (r'(?i)Склад Янино', 'Склад в СПб'),
    (r'(?i)складе Янино', 'складе в СПб'),
    (r'(?i)Складе Янино', 'Складе в СПб'),
    (r'(?i)Янино-1', 'СПб'),
    (r'(?i)Янино', 'СПб'),
]

for directory in directories:
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.json', '.js', '.jsx')):
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
                    print(f"Error processing {filepath}: {e}")
