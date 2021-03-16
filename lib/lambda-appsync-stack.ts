import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync'
import * as lambda from '@aws-cdk/aws-lambda'

export class LambdaAppsyncStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const api = new appsync.GraphqlApi(this , 'GRAPHQL_API' , {
      name: 'cdk-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization:{
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig:{
            //@ts-ignore
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        }
      },
      xrayEnabled: true
    })

    new cdk.CfnOutput(this , 'APIGRAPHQL_URL' , {
      value: api.graphqlUrl
    })

    new cdk.CfnOutput(this , 'APIGRAPHQL_URL' , {
      value: api.apiKey || ''
    })

    const lambdaFunction = new lambda.Function(this , 'LambdaFunction' , {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      //@ts-ignore
      timeout: cdk.Duration.seconds(10)
    })

    const lambda_data_source = api.addLambdaDataSource('lambdaDataSource' , lambdaFunction);

    lambda_data_source.createResolver({
      typeName:"Query",
      fieldName:"notes"
    })

    lambda_data_source.createResolver({
      typeName: 'Query',
      fieldName: 'customNotes'
    })

  }
}
