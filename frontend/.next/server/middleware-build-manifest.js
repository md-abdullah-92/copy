self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/agent-orders": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/agent-orders.js"
    ],
    "/agent-otp-verification": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/agent-otp-verification.js"
    ],
    "/agentdashboard": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/agentdashboard.js"
    ],
    "/buyerdashboard": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/buyerdashboard.js"
    ],
    "/farmerdashboard": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/farmerdashboard.js"
    ],
    "/update-order-status": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/update-order-status.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];