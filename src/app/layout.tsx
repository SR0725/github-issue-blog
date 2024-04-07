import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar/navbar";
import { NextUIProvider } from "@/components/nextui";
import ReactQueryProvider from "@/providers/react-query";
import { options } from "./api/auth/[...nextauth]/options";
import "./globals.css";

/*

                                                     __----~~~~~~~~~~~------___
                                    .  .   ~~//====......          __--~ ~~
                    -.            \_|//     |||\\  ~~~~~~::::... /~
                 ___-==_       _-~o~  \/    |||  \\            _/~~-
         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
   .~       .~       |   \\ -_    /  /-   /   ||      \   /
  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
           '         ~-|      /|    |-~\~~       __--~~
                       |-~~-_/ |    |   ~\_   _-~            /\
                            /  \     \__   \/~                \__
                        _--~ _/ | .-~~____--~-/                  ~~==.
                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
                                  -_     ~\      ~~---l__i__i__i--~~_/
                                  _-~-__   ~)  \--______________--~~
                                //.-~~~-~_--~- |-------~~~~~~~~
                                       //.-~~~--\
                    神獸保佑                能進 Dcard
                    神獸保佑                程式碼沒Bug!

*/

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "丹尼爾的個人部落格",
  description:
    "丹尼爾是一名工程師,他過往學一些人使用 GitHub Issue 來充當自己的部落格。他已使用 GitHub Issue 寫部落格一段時間,但發現這樣做有些明顯的缺點,不只是顯示上比較侷限,文章也比較不容易被搜尋引擎排到前面。因此他決定串接 GitHub API 並使用React.js 開發一個網頁,讓搜尋引擎更容易尋找到他在 GitHub Issue 上寫出的文章,並調整成自己喜歡的樣式,希望熟悉前端的你能幫助他完成這個專案。",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextUIProvider>
            <Toaster position="top-right" richColors />
            <Navbar session={session} />
            <div className="min-w-screen min-h-screen">{children}</div>
          </NextUIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
