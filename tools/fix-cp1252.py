# -*- coding: utf-8 -*-
"""Reverses CP1252-double-encoding corruption in atelier-view.ts.
Original bytes were decoded as CP1252 then re-encoded as UTF-8.
Usage: python fix-cp1252.py [--apply] [FILE]"""
import sys

C1_TO_BYTE = {0x81: 0x81, 0x8D: 0x8D, 0x8F: 0x8F, 0x90: 0x90, 0x9D: 0x9D}

def cp1252_byte(ch):
    o = ord(ch)
    if o in C1_TO_BYTE:
        return C1_TO_BYTE[o]
    try:
        b = ch.encode('cp1252')
    except Exception:
        return None
    if len(b) == 1:
        return b[0]
    return None

def reverse(text):
    out = []
    fixed = 0
    i, n = 0, len(text)
    while i < n:
        ch = text[i]
        b = cp1252_byte(ch)
        if b is not None and b >= 0x80:
            orig = []
            j = i
            while j < n:
                bb = cp1252_byte(text[j])
                if bb is not None and bb >= 0x80:
                    orig.append(bb)
                    j += 1
                else:
                    break
            decoded = None
            L = 0
            for Lc in range(2, min(len(orig), 7) + 1):
                try:
                    d = bytes(orig[:Lc]).decode('utf-8')
                    decoded = d
                    L = Lc
                    break
                except Exception:
                    continue
            if decoded and L >= 2 and decoded != text[i:i + L]:
                out.append(decoded)
                i += L
                fixed += 1
                continue
        out.append(ch)
        i += 1
    return ''.join(out), fixed

if __name__ == '__main__':
    apply_ = '--apply' in sys.argv
    path = [a for a in sys.argv[1:] if not a.startswith('--')][0]
    with open(path, 'rb') as f:
        raw = f.read()
    text = raw.decode('utf-8')
    new_text, fixed = reverse(text)
    if apply_:
        with open(path, 'wb') as f:
            f.write(new_text.encode('utf-8'))
        print(f'APPLIED: {fixed} sequences fixed in {path}')
    else:
        print(f'DRY-RUN: {fixed} sequences would be fixed in {path}')
