# Quick Intro to Typescript and CDK

I made this repo to learn how to use AWS CDK

## What Problems Does CDK Solve?

## Why Not Just Use AWS SAM?

This was actually my first question.  The primary answer is _CDK doesn't live in a vacuum_.

### Setting Up Linters For Code Quality

I use a modified functional typescript linter with strict code complexity.  Copy and paste the eslint configs from here into your project and use the following shortcut:

```bash
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-functional
```

## Useful commands(copied from the initial template)

The `cdk.json` file tells the CDK Toolkit how to execute your app.

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Examples in this repo and explanations

## Notes on DynamoDB tables

- I tried renaming a database, and it didn't look like it transferred data

### Javascript

### Simple Typescript

### Typescript with Third Party Dependencies

