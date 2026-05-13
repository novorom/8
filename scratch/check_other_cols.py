import pandas as pd
excel_path = "/Users/r/Downloads/Копия Прайсы - вход.xlsx"
xl = pd.ExcelFile(excel_path)
for sheet in ['Церсанит 01.01.2026', 'Азори 15.08.2025', 'Урал.гранит-Гранитея 13.10']:
    df_head = pd.read_excel(excel_path, sheet_name=sheet, nrows=10, header=None)
    for i, row in df_head.iterrows():
        row_list = [str(c).lower() for c in row]
        if any("рознич" in s or "розница" in s for s in row_list):
            print(f"[{sheet}] Headers:")
            for j, cell in enumerate(row_list):
                if "рознич" in cell or "розница" in cell:
                    print(f"  Col {j}: {row[j]}")
            break
