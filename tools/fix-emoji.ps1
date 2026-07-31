param([switch]$WhatIf)

$root = "C:\Users\PICHAU\Desktop\ateliercrm"
$targets = @(
    "$root\src\main.ts",
    "$root\src\views\vendas-view.ts",
    "$root\src\views\atelier-view.ts",
    "$root\src\data-store.ts",
    "$root\index.html",
    "$root\dist\index.html"
)

# Reconstruct original bytes from a double-encoded sequence.
# Double-encoding: each original byte B was encoded as either:
#   C2 B   if 0x80 <= B <= 0xBF
#   C3 (B-0x40)  if 0xC0 <= B <= 0xFF
# ASCII bytes (0x00-0x7F) were kept as-is.
# Returns the reconstructed bytes if valid, or $null if not.
function Reverse-DoubleEncode {
    param([byte[]]$bytes, [int]$start)
    
    $reconstructed = [System.Collections.Generic.List[byte]]::new()
    $i = $start
    while ($i -lt $bytes.Length) {
        $b = $bytes[$i]
        if ($b -le 0x7F) {
            # ASCII — not part of double-encoding (would be same either way)
            break
        } elseif ($b -eq 0xC2 -and $i + 1 -lt $bytes.Length -and $bytes[$i+1] -ge 0x80 -and $bytes[$i+1] -le 0xBF) {
            $reconstructed.Add($bytes[$i+1])
            $i += 2
        } elseif ($b -eq 0xC3 -and $i + 1 -lt $bytes.Length -and $bytes[$i+1] -ge 0x80 -and $bytes[$i+1] -le 0xBF) {
            $reconstructed.Add($bytes[$i+1] + 0x40)
            $i += 2
        } else {
            break
        }
    }
    
    if ($reconstructed.Count -lt 3) { return $null }   # need at least 3 bytes for a valid multi-byte UTF-8 char
    $result = $reconstructed.ToArray()
    
    # Check if reconstructed bytes form one whole valid multi-byte UTF-8 char
    # (possibly + continuation like VS16)
    if ($result[0] -ge 0xE0 -and $result[0] -le 0xEF) {
        # 3-byte UTF-8 lead byte: need 2 continuation bytes
        if ($result.Count -ge 3 -and $result[1] -ge 0x80 -and $result[1] -le 0xBF -and $result[2] -ge 0x80 -and $result[2] -le 0xBF) {
            $cp = ($result[0] - 0xE0) * 4096 + ($result[1] - 0x80) * 64 + ($result[2] - 0x80)
            # Valid code point range
            if ($cp -ge 0x0800 -and $cp -le 0xFFFF) {
                # Check if there's a 3-byte VS16 (U+FE0F) continuation: EF B8 8F
                if ($result.Count -ge 6 -and 
                    $result[3] -eq 0xEF -and 
                    $result[4] -eq 0xB8 -and 
                    $result[5] -eq 0x8F) {
                    # Return the full 6-byte UTF-8 sequence (emoji + VS16)
                    return @($result[0..5])
                }
                return @($result[0..2])
            }
        }
    } elseif ($result[0] -ge 0xF0 -and $result[0] -le 0xF4) {
        # 4-byte UTF-8 lead byte: need 3 continuation bytes
        if ($result.Count -ge 4 -and 
            $result[1] -ge 0x80 -and $result[1] -le 0xBF -and
            $result[2] -ge 0x80 -and $result[2] -le 0xBF -and
            $result[3] -ge 0x80 -and $result[3] -le 0xBF) {
            $cp = ($result[0] - 0xF0) * 262144 + ($result[1] - 0x80) * 4096 + ($result[2] - 0x80) * 64 + ($result[3] - 0x80)
            if ($cp -ge 0x10000 -and $cp -le 0x10FFFF) {
                # Check for VS16 continuation
                if ($result.Count -ge 7 -and 
                    $result[4] -eq 0xEF -and 
                    $result[5] -eq 0xB8 -and 
                    $result[6] -eq 0x8F) {
                    return @($result[0..6])  # 7 bytes: emoji + VS16
                }
                return @($result[0..3])  # 4 bytes: emoji only
            }
        }
    }
    
    return $null  # not a valid multi-byte UTF-8 sequence
}

$totalFixed = 0
foreach ($filePath in $targets) {
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $origLen = $bytes.Length
    $result = [System.Collections.Generic.List[byte]]::new($origLen)
    $i = 0
    $fileFixed = 0

    while ($i -lt $bytes.Length) {
        $reconstructed = Reverse-DoubleEncode $bytes $i
        if ($reconstructed -ne $null) {
            # Calculate consumed bytes: 2 bytes per reconstructed byte
            $consumed = $reconstructed.Count * 2
            foreach ($b in $reconstructed) { $result.Add($b) }
            $i += $consumed
            $fileFixed++
            $totalFixed++
        } else {
            $result.Add($bytes[$i])
            $i++
        }
    }

    if ($fileFixed -gt 0) {
        if (-not $WhatIf) {
            [System.IO.File]::WriteAllBytes($filePath, $result.ToArray())
        }
        $saved = $origLen - $result.Count
        Write-Host "$(if($WhatIf){'Would fix'}else{'Fixed'}) $fileFixed in $([System.IO.Path]::GetFileName($filePath)) ($origLen -> $($result.Count) bytes, saved $saved)"
    } else {
        Write-Host "No fixes in $([System.IO.Path]::GetFileName($filePath))"
    }
}
Write-Host "Total: $totalFixed fixed across $($targets.Count) files"
