import pandas as pd
excel_path = "/Users/r/Downloads/Копия Прайсы - вход.xlsx"
xl = pd.ExcelFile(excel_path)
for sheet in xl.sheet_names:
    print(sheet)
