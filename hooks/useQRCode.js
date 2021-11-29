import React from 'react';
const QRCode = require('qrcode');

export function useQRCode({
  ...props
}) {
  const inputRef = React.useRef(null);
  const { text, options } = props;

  React.useEffect(
    function () {
      if (inputRef && inputRef.current) {
        if (inputRef.current) {
            QRCode.toCanvas(
                inputRef.current,
                text,
                options,
                function (error) {
                    if (error) {
                        console.log(error);
                        throw error;
                    }
                },
            );
            } else if (inputRef.current) {
                QRCode.toDataURL(text, options, function (error, url) {
                    if (error) {
                    throw error;
                    }
                    if (inputRef.current) {
                    inputRef.current.src = url;
                    }
                });
            }
        }
    },
    [text, options, inputRef],
  );

  return { inputRef };
}