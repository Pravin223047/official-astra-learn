import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfUrl ="https://abundant-meerkat-149.convex.cloud/api/storage/5743caae-2c37-4539-95fe-ed3d3fc84ec6";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pdfUrl = searchParams.get("pdfUrl");

  if (!pdfUrl) {
    return NextResponse.json({ message: "No URL provided" }, { status: 400 });
  }
  // Upload the PDF file to a storage service and get the URL
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });
  console.log("PDF Text Content:", pdfTextContent);

  // Split the text content into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 20,
  });

  const output = await splitter.createDocuments([pdfTextContent]);

  let splitterlist: string[] = [];
  output.forEach((doc) => {
    splitterlist.push(doc.pageContent);
  });

  return NextResponse.json({ message: "success", data: splitterlist });
}
