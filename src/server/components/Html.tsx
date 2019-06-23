import React from "react";
import { Bundle } from "react-loadable/webpack";

const Html: React.FC<{
  styleTags: string;
  initialState: object;
  webpackManifest: object;
  bundles: Bundle[];
  appContents: string;
}> = ({ styleTags, initialState, webpackManifest, bundles, appContents }) => {
  return (
    <html>
      <head
        dangerouslySetInnerHTML={{
          __html: styleTags
        }}
      />
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{
            __html: appContents
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(initialState)}`
          }}
        />
        <script src={webpackManifest["vendors~main.js"]} />
        <script src={webpackManifest["main.js"]} />
        {bundles
          .filter(Boolean)
          .filter(({ file }) => !file.endsWith(".map"))
          .map(({ publicPath }) => (
            <script src={publicPath} />
          ))}
      </body>
    </html>
  );
};

export default Html;
