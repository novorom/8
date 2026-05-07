<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportYaninoStockCommand extends Command
{
    protected $signature = 'import:yanino {file : Путь к оригинальному XLS/XLSX файлу}';
    protected $description = 'Обновление остатков СПб напрямую из оригинального Excel файла';

    public function handle()
    {
        $filePath = $this->argument('file');

        if (!file_exists($filePath)) {
            $this->error("❌ Файл не найден: {$filePath}");
            return 1;
        }

        $this->info("📦 Читаем оригинальный файл Excel: {$filePath}");

        try {
            // Магия: библиотека сама понимает формат (даже если это 1С-ный XLS)
            $spreadsheet = IOFactory::load($filePath);
            $worksheet = $spreadsheet->getActiveSheet();
            $rows = $worksheet->toArray();
        } catch (\Exception $e) {
            $this->error("❌ Ошибка чтения файла: " . $e->getMessage());
            return 1;
        }

        // Обнуляем старые остатки СПб
        Product::query()->update(['stock_yanino' => 0]);
        $this->info("♻️ Старые остатки СПб обнулены.");

        $bar = $this->output->createProgressBar(count($rows));
        $bar->start();

        $updatedCount = 0;

        foreach ($rows as $row) {
            // Пропускаем пустые строки
            if (empty($row) || !isset($row[0])) {
                $bar->advance();
                continue;
            }

            $sku = trim((string) $row[0]);
            
            // Пропускаем шапку, пустые ячейки и мусор из 1С (например, строки с названиями папок)
            if (empty($sku) || mb_strtolower($sku) === 'артикул' || mb_strlen($sku) < 3 || str_starts_with($sku, '_')) {
                $bar->advance();
                continue;
            }

            // Берем 11-й столбец (в программировании счет идет с 0, поэтому индекс 10)
            if (isset($row[10])) {
                $rawStock = (string) $row[10];
                
                // Чистим от пробелов и меняем запятую на точку
                $cleanStock = str_replace([' ', ','], ['', '.'], $rawStock);
                $stock = (float) $cleanStock;

                if ($stock > 0) {
                    $updated = Product::where('sku', $sku)->update(['stock_yanino' => $stock]);
                    if ($updated) {
                        $updatedCount++;
                    }
                }
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("✅ Готово! Обновлены остатки СПб для {$updatedCount} товаров.");

        return 0;
    }
}
