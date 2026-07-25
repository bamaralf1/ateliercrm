param([switch]$WhatIf)

$srcDir = [System.IO.Path]::Combine($PSScriptRoot, "..", "src")
$srcDir = (Resolve-Path $srcDir).Path
$files = Get-ChildItem -Recurse -Filter "*.ts" -LiteralPath $srcDir
$changed = 0

foreach ($f in $files) {
    # Skip the auto-generated concatenated file
    if ($f.Name -eq "atelier-crm.ts") { continue }

    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $origLen = $bytes.Length
    $result = [System.Collections.Generic.List[byte]]::new($origLen)
    $i = 0
    $anyFix = $false

    while ($i -lt $bytes.Length) {
        # Triple-encoded: C3 83 C2 83 C3 82 C2 XX (8 bytes -> C3 XX)
        if ($i + 7 -lt $bytes.Length -and
            $bytes[$i] -eq 0xC3 -and $bytes[$i+1] -eq 0x83 -and
            $bytes[$i+2] -eq 0xC2 -and $bytes[$i+3] -eq 0x83 -and
            $bytes[$i+4] -eq 0xC3 -and $bytes[$i+5] -eq 0x82 -and
            $bytes[$i+6] -eq 0xC2 -and $bytes[$i+7] -ge 0x80 -and $bytes[$i+7] -le 0xBF) {
            $result.Add(0xC3)
            $result.Add($bytes[$i+7])
            $i += 8
            $anyFix = $true
        }
        # Double-encoded: C3 83 C2 XX (4 bytes -> C3 XX)
        elseif ($i + 3 -lt $bytes.Length -and
                $bytes[$i] -eq 0xC3 -and $bytes[$i+1] -eq 0x83 -and
                $bytes[$i+2] -eq 0xC2 -and $bytes[$i+3] -ge 0x80 -and $bytes[$i+3] -le 0xBF) {
            $result.Add(0xC3)
            $result.Add($bytes[$i+3])
            $i += 4
            $anyFix = $true
        }
        else {
            $result.Add($bytes[$i])
            $i += 1
        }
    }

    if ($anyFix) {
        $changed++
        $saved = $origLen - $result.Count
        if ($WhatIf) {
            Write-Host "Would fix: $($f.Name) ($origLen -> $($result.Count) bytes, saved $saved)"
        } else {
            [System.IO.File]::WriteAllBytes($f.FullName, $result.ToArray())
            Write-Host "Fixed: $($f.Name) ($origLen -> $($result.Count) bytes, saved $saved)"
        }
    }
}

Write-Host "Done. $changed files fixed."
