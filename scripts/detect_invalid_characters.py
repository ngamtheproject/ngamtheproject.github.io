import os
import re

valid_characters = re.compile(r'[a-zA-ZÀ-ỹ\d]') # Ký tự tiếng Việt và số
valid_symbols = re.compile(r'[\s~!@#$%^&*()-_=+\[{\]}\\|;:\'",<.>/?]')
valid_emojis = re.compile(
  r'[\U0001F600-\U0001F64F]|'   # Emoticons
  r'[\U0001F300-\U0001F5FF]|'   # Symbols & Pictographs
  r'[\U0001F680-\U0001F6FF]|'   # Transport & Map Symbols
  r'[\U0001F700-\U0001F77F]|'   # Alchemical Symbols
  r'[\U0001F780-\U0001F7FF]|'   # Geometric Shapes Extended
  r'[\U0001F800-\U0001F8FF]|'   # Supplemental Arrows-C
  r'[\U0001F900-\U0001F9FF]|'   # Supplemental Symbols and Pictographs
  r'[\U0001FA00-\U0001FA6F]|'   # Chess Symbols
  r'[\U0001FA70-\U0001FAFF]|'   # Symbols and Pictographs Extended-A
  r'[\U0001FB00-\U0001FBFF]|'   # Symbols for Legacy Computing
  r'[\U0001FC00-\U0001FCFF]|'   # Symbols for Legacy Computing
  r'[\U0001F004]|'              # Mahjong Tile Red Dragon
  r'[\U0001F0CF]|'              # Playing Card Black Joker
  r'[\U0001F170-\U0001F251]'    # Enclosed Ideographic Supplement
)
other_characters = re.compile(r'[☀⭐➡️]')
file_extensions = ('.md', '.txt')
count_invalid = 0


def is_invalid(char):
  return (not valid_characters.match(char)
          and not valid_symbols.match(char)
          and not valid_emojis.match(char)
          and not other_characters.match(char))


def process_text_file(file_path):
  in_frontmatter = False
  with open(file_path, 'r', encoding='utf-8') as file:
    lines = file.readlines()
    for row, line in enumerate(lines, start=1):
      if line.strip() == '---' or line.strip() == '___':
        in_frontmatter = not in_frontmatter
        continue

      if in_frontmatter:
        continue

      for col, char in enumerate(line, start=1):
        if is_invalid(char):
          global count_invalid
          count_invalid += 1
          print(f"File: {file_path}, Row: {row}, Col: {col}, Char: {char}")


def traverse_directory(directory):
  for root, _, files in os.walk(directory):
    for file in files:
      if file.endswith(file_extensions):
        file_path = os.path.join(root, file)
        process_text_file(file_path)


traverse_directory('content')
print(f"Total invalid characters: {count_invalid}")
