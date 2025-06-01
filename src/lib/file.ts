import pdfParse from "pdf-parse"

export const pdfToText = async (pdfUrl: string) => {
  const pdf = await fetch(pdfUrl)
  const pdfBuffer = await pdf.arrayBuffer()
  const pdfText = await pdfParse(Buffer.from(pdfBuffer))
  const pdfTextContent = pdfText.text

  return pdfTextContent
}
