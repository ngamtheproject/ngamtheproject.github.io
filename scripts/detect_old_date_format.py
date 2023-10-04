import os
import re

old_date_format = re.compile(r'.*\d+-\d+-\d+.*')
accepted = re.compile(r'(date|date_end|publishDate): \d+-\d+-\d+')
file_extensions = ('.md', '.txt')

def is_invalid(line):
  return old_date_format.match(line) and not accepted.match(line)


def process_text_file(file_path):
  with open(file_path, 'r', encoding='utf-8') as file:
    lines = file.readlines()
    for row, line in enumerate(lines, start=1):
        if is_invalid(line):
          print(f"File: {file_path}, Row: {row}, {line}")


def traverse_directory(directory):
  for root, _, files in os.walk(directory):
    for file in files:
      if file.endswith(file_extensions):
        file_path = os.path.join(root, file)
        process_text_file(file_path)


traverse_directory('content')
