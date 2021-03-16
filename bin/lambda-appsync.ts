#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaAppsyncStack } from '../lib/lambda-appsync-stack';

const app = new cdk.App();
new LambdaAppsyncStack(app, 'LambdaAppsyncStack');
