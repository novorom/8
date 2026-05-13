import pandas as pd
excel_path = "/Users/r/Downloads/Прайсы - вход.xlsx"
df_head = pd.read_excel(excel_path, sheet_name="Керама Марацци 01.04.2026", nrows=10, header=None)
for i, row in df_head.iterrows():
    print(f"Row {i}:", [str(c) for c in row])
