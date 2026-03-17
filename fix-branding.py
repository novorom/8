#!/usr/bin/env python3
"""Apply all branding fixes to /Users/r/8"""
import os, glob

fixes = [
    ('Дом Плитки CERSANIT', 'Плитки СПб'),
    ('Дом Плитки Cersanit', 'Плитки СПб'),
    ('| Дом Плитки СПб', '| Плитки СПб'),
    ('| Дом Плитки', '| Плитки СПб'),
    ('Дом Плитки СПб', 'Плитки СПб'),
]

base = '/Users/r/8'
files = glob.glob(f'{base}/app/**/*.tsx', recursive=True) + \
        glob.glob(f'{base}/app/**/*.ts', recursive=True) + \
        glob.glob(f'{base}/components/**/*.tsx', recursive=True) + \
        glob.glob(f'{base}/lib/**/*.ts', recursive=True)

changed = 0
for fpath in files:
    if 'node_modules' in fpath: continue
    try:
        with open(fpath) as f: c = f.read()
        n = c
        for old, new in fixes: n = n.replace(old, new)
        if n != c:
            with open(fpath, 'w') as f: f.write(n)
            changed += 1
    except: pass

print(f'Fixed {changed} files')
