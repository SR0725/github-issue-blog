import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import remarkImages from "remark-images";


async function transformMdToHtml(md: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkImages)
    .use(remarkGfm)
    .use(html)
    .process(md);
  const htmlContent = processedContent.toString();
  return htmlContent;
}

export default transformMdToHtml;