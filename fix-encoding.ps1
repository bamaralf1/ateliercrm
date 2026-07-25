# Fix UTF-8 double-encoding corruption in TypeScript source files
# This script replaces corrupted multi-byte sequences with correct Unicode characters

$files = @(
    "src\views\atelier-view.ts",
    "src\main.ts",
    "src\utils.ts",
    "src\data-store.ts",
    "src\activity-logger.ts",
    "src\theme-engine.ts",
    "src\event-bus.ts",
    "src\views\base-view.ts"
)

$replacements = @(
    # atelier-view.ts specific patterns (ðÅ¸... -> emoji)
    @('ðÅ¸Å½Â¨', [char]::ConvertFromUtf32(0x1F3A8)),  # 🎨
    @('ðÅ¸â\u0080\u009CÂ\u0090', [char]::ConvertFromUtf32(0x1F4D0)),  # 📐
    @('ðÅ¸â\u0080\u009DÂ§', [char]::ConvertFromUtf32(0x1F527)),  # 🔧
    @('ðÅ¸â\u0080\u0093Â¼ïÂ¸Â\u008F', [char]::ConvertFromUtf32(0x1F5BC) + '️'),  # 🖼️
    @('ðÅ¸â\u0080\u009CÂ¦', [char]::ConvertFromUtf32(0x1F4E6)),  # 📦
    @('ðÅ¸â\u0080\u009Câ\u0080\u00B9', [char]::ConvertFromUtf32(0x1F4CB)),  # 📋
    @('ðÅ¸â\u0080\u00BAâ\u0080\u0099', [char]::ConvertFromUtf32(0x1F6D2)),  # 🛒
    @('ðÅ¸Â\u008FÂª', [char]::ConvertFromUtf32(0x1F3EA)),  # 🏪
    @('ðÅ¸â\u0080\u0099Â°', [char]::ConvertFromUtf32(0x1F4B0)),  # 💰
    @('ðÅ¸Â\u008FÂ·ïÂ¸Â\u008F', [char]::ConvertFromUtf32(0x1F3F7) + '️'),  # 🏷️
    @('ðÅ¸â\u0080\u009CÂ\u008D', [char]::ConvertFromUtf32(0x1F4CD)),  # 📍
    @('ðÅ¸â\u0080\u009Câ\u0080\u00A6', [char]::ConvertFromUtf32(0x1F4C5)),  # 📅
    @('âÂ\u008FÂ³', [char]::ConvertFromUtf32(0x23F3)),  # ⏳
    @('ðÅ¸â\u0080\u009CÂ\u009D', [char]::ConvertFromUtf32(0x1F4DD)),  # 📝
    @('ðÅ¸â\u0080\u009Câ\u0080\u009A', [char]::ConvertFromUtf32(0x1F4DA)),  # 📚
    @('ðÅ¸â\u0080\u009Câ\u0080\u00B0', [char]::ConvertFromUtf32(0x1F4C9)),  # 📉
    @('ðÅ¸â\u0080\u0094â\u0080\u0098ïÂ¸Â\u008F', [char]::ConvertFromUtf32(0x1F5D1) + '️'),  # 🗑️
    @('ðÅ¸â\u0080\u009CË\u0086', [char]::ConvertFromUtf32(0x1F4CA)),  # 📊
    @('ðÅ¸â\u0080\u009CÅ\u0092', [char]::ConvertFromUtf32(0x1F4D2)),  # 📒
    @('ðÅ¸â\u0080\u009Câ\u0080\u009E', [char]::ConvertFromUtf32(0x1F4DE)),  # 📞
    @('ðÅ¸â\u0080\u0099Â¡', [char]::ConvertFromUtf32(0x1F4A1)),  # 💡

    # Badge/alert patterns
    @('âÅ¡Â\u00A0ïÂ¸Â\u008F', [char]::ConvertFromUtf32(0x26A0) + '️'),  # ⚠️
    @('âÅ¡ïÂ¸Â\u008F', [char]::ConvertFromUtf32(0x26A0) + '️'),  # ⚠️
    @('âÅ\u0093â\u0080\u009DïÂ¸Â\u008F', '✔️'),  # ✔️
    @('âÅ\u0093â\u0080\u0085', '✔'),  # ✔
    @('âÅ\u0093â\u0080\u00A6', '✔'),  # ✔
    @('âÅ\u0093Â\u008FïÂ¸Â\u008F', [char]::ConvertFromUtf32(0x270F) + '️'),  # ✏️
    @('âÅ\u0093Å¡', [char]::ConvertFromUtf32(0x2795)),  # ➕ or ✚
    @('ââ\u0080\u00A0Â©ïÂ¸Â\u008F', [char]::ConvertFromUtf32(0x21A9) + '️'),  # ↩️
    @('âÅ¡Â¡', [char]::ConvertFromUtf32(0x26A1)),  # ⚡
    @('âË\u009Câ\u0080\u00A6', [char]::ConvertFromUtf32(0x2605)),  # ★
    @('âË\u009Câ\u0080\u00A0', [char]::ConvertFromUtf32(0x2606)),  # ☆

    # Main.ts patterns (ðŸ... -> emoji)
    @([char]0x00F0 + [char]0x009F + [char]0x0096 + [char]0x00BC + 'ï¸\u008F', [char]::ConvertFromUtf32(0x1F5BC) + '️'),  # 🖼️
    @([char]0x00F0 + [char]0x009F + [char]0x0094 + [char]0x0084, [char]::ConvertFromUtf32(0x1F504)),  # 🔄
    @([char]0x00F0 + [char]0x009F + [char]0x0093 + [char]0x0088, [char]::ConvertFromUtf32(0x1F4C8)),  # 📈
    @([char]0x00F0 + [char]0x009F + [char]0x0093 + [char]0x008A, [char]::ConvertFromUtf32(0x1F4CA)),  # 📊
    @([char]0x00F0 + [char]0x009F + [char]0x008E + [char]0x00A8, [char]::ConvertFromUtf32(0x1F3A8)),  # 🎨
    @([char]0x00F0 + [char]0x009F + [char]0x0095 + [char]0x0090, [char]::ConvertFromUtf32(0x1F550)),  # 🕐
    @([char]0x00F0 + [char]0x009F + [char]0x0093 + [char]0x008B, [char]::ConvertFromUtf32(0x1F4CB)),  # 📋
    @([char]0x00F0 + [char]0x009F + [char]0x00A7 + [char]0x00BE, [char]::ConvertFromUtf32(0x1F9FE)),  # 🧾
    @([char]0x00F0 + [char]0x009F + [char]0x0091 + [char]0x00A4, [char]::ConvertFromUtf32(0x1F464)),  # 👤
    @([char]0x00F0 + [char]0x009F + [char]0x0097 + [char]0x0091 + 'ï¸\u008F', [char]::ConvertFromUtf32(0x1F5D1) + '️'),  # 🗑️
    @([char]0x00F0 + [char]0x009F + [char]0x0092 + [char]0x00B0, [char]::ConvertFromUtf32(0x1F4B0)),  # 💰
    @([char]0x00F0 + [char]0x009F + [char]0x0093 + [char]0x0084, [char]::ConvertFromUtf32(0x1F4C4)),  # 📄
    @([char]0x00F0 + [char]0x009F + [char]0x0093 + [char]0x00A5, [char]::ConvertFromUtf32(0x1F4E5)),  # 📥
    @([char]0x00F0 + [char]0x009F + [char]0x0093 + [char]0x009D, [char]::ConvertFromUtf32(0x1F4DD)),  # 📝
    @([char]0x00F0 + [char]0x009F + [char]0x0093 + [char]0x008C, [char]::ConvertFromUtf32(0x1F4CC)),  # 📌

    # Common corrupted multi-byte patterns
    @('â\u0080\u0094', '—'),  # em dash
    @('â\u0080¢', '•'),  # bullet
    @('â\u0086\u0091', '↑'),
    @('â\u0086\u0093', '↓'),
    @('â\u0086\u0090', '←'),
    @('â\u0086\u0092', '→'),
    @('â\u009C\u009A', '✚'),
    @('â\u009C\u0085', '✅'),
    @('â\u00AD\u0090', '⭐'),  # ⭐
    @('â\u008C¨ï¸\u008F', '⌨️'),
    @('â\u008C«', '⌫'),
    @('nÂº', 'nº'),  # nº with superscript o
    @('Â·', '·'),  # middle dot
    @('â\u0080\u0098', "'"),  # left single quote
    @('â\u0080\u0099', "'"),  # right single quote
    @('â\u0080\u009C', '"'),  # left double quote
    @('â\u0080\u009D', '"'),  # right double quote
    @('â\u0080\u00A6', '…'),  # ellipsis
    @('â\u0080\u0093', '—'),  # en dash → em dash
    @('Ââ\u0082¬â\u0080\u009D', '—'),  # em dash with extra chars
    @('ââ\u0082¬â\u0080\u009D', '—'),  # em dash
    @('ÂÂ·', '·')  # double corrupted middle dot
)

foreach ($file in $files) {
    $fullPath = Join-Path "C:\Users\PICHAU\Desktop\ateliercrm" $file
    if (-not (Test-Path $fullPath)) {
        Write-Host "⏭ $file not found" -ForegroundColor Yellow
        continue
    }
    $content = Get-Content $fullPath -Raw -Encoding UTF8
    $original = $content
    $count = 0
    foreach ($r in $replacements) {
        if ($content.Contains($r[0])) {
            $content = $content.Replace($r[0], $r[1])
            $count++
        }
    }
    if ($count -gt 0) {
        [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "✓ $file - $count replacements" -ForegroundColor Green
    } else {
        Write-Host "  $file - no changes" -ForegroundColor Gray
    }
}

Write-Host "`nDone!" -ForegroundColor Green
