import Document from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <head>
          <title>Document</title>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    );
  }
}
