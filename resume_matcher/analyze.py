import sys

# Set stdout encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

import PyPDF2 as pdf
from   PyPDF2 import PdfReader

def input_pdf_text(pdf_path):
    reader = pdf.PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        # Decode the text using UTF-8 encoding
        page_text = page.extract_text()
        if isinstance(page_text, str):
            text += page_text
    # Print the decoded text
    print(text)
    return text

input_pdf_text("resumes/resume1.pdf")
