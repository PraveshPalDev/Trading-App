import React, {memo} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import {moderateScale} from '../styles/responsiveSize';

const StockChart = ({ticker, backColor, height = 450}) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            height: 450px;
            margin: 0;
            padding: 0;
            background-color: ${backColor};
          }
          #container {
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div id="container"></div>

        <!-- TradingView Widget BEGIN -->
        <div class="tradingview-widget-container">
          <div id="tradingview_chart"></div>
        </div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
          document.addEventListener('DOMContentLoaded', function() {
            new TradingView.widget({
              "width": "100%",
              "height": "100%",
              "symbol": "ATHEX:${ticker?.replace('.AT', '')}",
              "interval": "D",
              "timezone": "Etc/UTC",
              "theme": "dark",
              "style": "1",
              "locale": "in",
              "toolbar_bg": "${backColor}",
              "enable_publishing": false,
              "hide_side_toolbar": false,
              "allow_symbol_change": false,
              "container_id": "tradingview_chart"
            });
          });
        </script>
        <!-- TradingView Widget END -->
      </body>
    </html>
  `;

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: moderateScale(12),
          height:
            typeof height === 'number'
              ? height
              : Dimensions.get('window').height,
        },
      ]}>
      <WebView
        source={{html: htmlContent}}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        mixedContentMode="always"
        allowFileAccess={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        injectedJavaScript={`
          window.onerror = function(message, sourcefile, lineno, colno, error) {
            window.ReactNativeWebView.postMessage('Error: ' + message);
            return true;
          };
        `}
        onMessage={event => {
          console.log('WebView message:', event.nativeEvent.data);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default memo(StockChart);
