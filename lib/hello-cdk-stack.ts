import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_s3 as s3 } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, "NoteBucket", {
      versioned: true,
    });

    /**
     * A very simple lambda function, does not require docker to build this
     */
    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_16_X, // execution environment
      code: lambda.Code.fromAsset("lambda"), // code loaded from "lambda" directory
      handler: "hello.handler", // file is "hello", function is "handler"
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, "hello-handler-ep", {
      handler: hello,
    });

    /**
     * Deploys a SUPER simple endpoint
     */
    const simpleFunction = new NodejsFunction(this, "simple-function", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "main",
      entry: path.join(__dirname, `/../src/my-lambda/index.ts`),
      bundling: {
        minify: true,
        externalModules: ["aws-sdk"],
      },
    });

    new apigw.LambdaRestApi(this, "simple-function-ep", {
      handler: simpleFunction,
    });

    /**
     * Deploys a function with 3rd Party libs
     */
    const thirdPartyLibFunction = new NodejsFunction(this, "medium-function", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "main",
      entry: path.join(__dirname, `/../src/time-viewer/index.ts`),
      bundling: {
        minify: true,
        externalModules: ["aws-sdk"],
      },
    });

    new apigw.LambdaRestApi(this, "medium-function-ep", {
      handler: thirdPartyLibFunction,
    });

    // example resource
    // const queue = new sqs.Queue(this, 'HelloCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
