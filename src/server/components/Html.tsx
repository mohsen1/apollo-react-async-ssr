import React from "react";
import { HelmetData } from "react-helmet";
import { ChunkExtractor } from "@loadable/server";

const Html: React.FC<{
  styleTags: Array<React.ReactElement<{}>>;
  initialState: object;
  chunkExtractor: ChunkExtractor;
  appContents: string;
  helmet: HelmetData;
}> = ({ styleTags, initialState, chunkExtractor, appContents, helmet }) => {
  return (
    <html>
      <head {...helmet.htmlAttributes.toComponent()}>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {styleTags}
        {chunkExtractor.getLinkElements()}
        {chunkExtractor.getStyleElements()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <div
          id="root"
          dangerouslySetInnerHTML={{
            __html: appContents
          }}
        />
        <script
          charSet="utf-8"
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=JSON.parse('${JSON.stringify(initialState)}')`
          }}
        />
        {chunkExtractor.getScriptElements()}
      </body>
    </html>
  );
};

export default Html;
