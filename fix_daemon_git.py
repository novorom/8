with open("sync_plitburg_daemon.py", "r") as f:
    text = f.read()

# remove commit from inside the batch loop, add it only when parsed_count % 500 == 0
text = text.replace("        commit_and_push(parsed_count)", """
        if parsed_count > 0 and parsed_count % 500 == 0:
            commit_and_push(parsed_count)""")

with open("sync_plitburg_daemon.py", "w") as f:
    f.write(text)
