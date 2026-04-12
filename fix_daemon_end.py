with open("sync_plitburg_daemon.py", "r") as f:
    text = f.read()

text = text.replace('print(f"\\nDaemon finished successfully! Scraped {parsed_count} new products.")', 
"""commit_and_push(parsed_count)
print(f"\\nDaemon finished successfully! Scraped {parsed_count} new products.")""")

with open("sync_plitburg_daemon.py", "w") as f:
    f.write(text)
