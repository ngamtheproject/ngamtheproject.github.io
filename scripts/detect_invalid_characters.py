import os
import re

valid_pattern = \
  re.compile(r'[a-zA-ZÀ-ỹ\d\s~!@#$%^&*()-_=+\[{\]}\\|;:\'",<.>/?]')


def is_invalid(char):
  return not valid_pattern.match(char)


def process_text_file(file_path):
  in_frontmatter = False
  with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
    lines = file.readlines()
    for line_number, line in enumerate(lines, start=1):
      if line.strip() == '---' or line.strip() == '___':
        in_frontmatter = not in_frontmatter
        continue

      if in_frontmatter:
        continue

      for char_position, char in enumerate(line, start=1):
        if is_invalid(char):
          print(
            f"File: {file_path}, Line: {line_number}, Position: {char_position}, Character: {char}")


def traverse_directory(directory):
  for root, _, files in os.walk(directory):
    for file in files:
      if file.endswith(('.md', '.txt')):
        file_path = os.path.join(root, file)
        process_text_file(file_path)


traverse_directory('content')
