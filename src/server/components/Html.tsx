import React from "react";
import { Bundle } from "react-loadable/webpack";
import { HelmetData } from "react-helmet";

const Html: React.FC<{
  styleTags: Array<React.ReactElement<{}>>;
  initialState: object;
  webpackManifest: object;
  bundles: Bundle[];
  appContents: string;
  helmet: HelmetData;
}> = ({
  styleTags,
  initialState,
  webpackManifest,
  bundles,
  appContents,
  helmet
}) => {
  return (
    <html>
      <head {...helmet.htmlAttributes.toComponent()}>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {styleTags}
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
            __html: `window.__APOLLO_STATE__=${JSON.stringify(initialState)}`
          }}
        />
        <script charSet="utf-8" src={webpackManifest["vendors~main.js"]} />
        <script charSet="utf-8" src={webpackManifest["main.js"]} />
        {bundles
          .filter(Boolean)
          .filter(({ file }) => !file.endsWith(".map"))
          .map(({ publicPath }) => (
            <script charSet="utf-8" src={publicPath} key={publicPath} />
          ))}
      </body>
    </html>
  );
};

export default Html;
