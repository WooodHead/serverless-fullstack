const fs = require('fs')

function handler(data, serverless, options) {
  const dotEnv = `NEXT_PUBLIC_ApiEndpoint=${data.ServiceEndpoint}
NEXT_PUBLIC_CognitoIdentityPoolId=${data.CognitoIdentityPoolId}
NEXT_PUBLIC_CognitoUserPoolId=${data.CognitoUserPoolId}
NEXT_PUBLIC_CognitoUserPoolClientId=${data.CognitoUserPoolClientId}
NEXT_PUBLIC_Region=${options.region}`

  fs.writeFileSync(`packages/ui/.env.${options.stage}`, dotEnv)
}

module.exports = { handler }
