# Cognito

```
        ,-~''~'''''':::::''::::''..
      ,-':::::::::::::::::::::::::::..
     '::::::::::::„:„„-~-~--'~-'~--~-~.
    ,'::::,~'': : : : : : : : : : : '-|
    |:::::,-': : - -~''''¯¯''-„: : : :|
    |:::::| : : : _„„--~'''''~-„: :: '|
    |:::::,': : :_„„-: : : : :~--„_: :|
   |::::::|:„--~~'''~~'''-„…_..„~'''¯\\
   |:::::,'_„„-|:_„---~:|''¯'|: ~---„_|
   .,~-,_/'': |:(_ o__): |: :|:(_o__):/
  ../,'-,:: ''-,_______,-'': ''-„_____|
  ..\: :|: : : : : : :„: : : : :-,:  :|
  ',:': : : : : :,-'__: : : :_',: ; ,'
    '-,-': :___„-: :'': ¯''~~'': '~--|
    |: ,: : :  : : : : : : : : : : :|
    '|: \: : : : -,„_„„-~~--~--„_: :|
     |: \: : : : : : :-------~: : ::/  - Hwat The Cognito?!?!
     |: :''-,: : : : :: : : : : : :|
     ',: : :''-,  : : : : : : : : ,'
     |: : : : : : : : : : : : : ,-'
     |: : :: : '''~----------~''
```

### Table of Contents

* [Cognito CloudFormation Templates](#cloudformation_templates)
  * [Infrastructure Setup](#infrastructure_setup)
  * [Deployment Order](#deployment_order)
    * [Cognito Template](#cognito_template)
      * [DynamoDB Template](#dynamodb_template)
      * [Cognito-Lambda Template](#cognito_lambda_template)
    * [Deploying Custom Resource](#deploying_custom_resource)

## Infrastructure setup

1. Cognito handles user authentication
  * User is created in cognito userpool
  * User is required to change password before being able to generate a token
  * Auth token generated after successful password change
1. Request is sent to API gateway with auth token
1. Enables authenticated request through to a service

## Deployment Order

Order of deployment for cloudformation templates in this repo.

1. aws-cf-dynamoDB.yaml
1. aws-cf-cognito-lambda.yaml
1. aws-cf-cognito.yaml

** NOTE: after aws-cf-cognito.yaml is successfully deployed the there one manual step
that is needed. Under cognito user pool --> general settings --> app clients the
below settings need to be enabled.**

  * ADMIN_NO_SRP_AUTH
  * USER_PASSWORD_AUTH

## Cognito Template

Template to create a CognitoStack with cloudformation. Creates a
UserPool and UserPoolClient.

**aws-cf-cognito.yaml**

* `Type: "AWS::Cognito::UserPool"` : defines what resources to use
* `AliasAttributes: email` : allows email to be the username
* `Schema:` Allows configuration of standard attributes you want users to have. See example

```yaml
Schema:
  - Name: name
    AttributeDataType: String
    Mutable: true
    Required: true
```

* `CustomerUserPoolClientSettings:` A custom resource that enables configurations
to `App client settings`

```yaml
CustomerUserPoolClientSettings:
  Type: 'Custom::CognitoUserPoolClientSettings'
  Properties:
    ServiceToken: !GetAtt CloudFormationCognitoUserPoolClientSettings.Arn
    UserPoolId: !Ref UserPool
    UserPoolClientId: !Ref UserPoolClient
    SupportedIdentityProviders:
      - COGNITO
    CallbackURL: 'http://localhost'
    LogoutURL: 'http://localhost'
    AllowedOAuthFlowsUserPoolClient: true
    AllowedOAuthFlows:
      - implicit
    AllowedOAuthScopes:
      - email
      - openid
      - phone
  ```

* `CustomerUserPoolDomain:` A custom resource that allows for the creation of
a domain name to use to authenticate against.

```yaml
CustomerUserPoolDomain:
  Type: 'Custom::CognitoUserPoolDomain'
  Properties:
    ServiceToken: !GetAtt CloudFormationCognitoUserPoolDomain.Arn
    UserPoolId: !Ref UserPool
    Domain: '<your client domain>'
```

* `Outputs:` Allows values to be outputted like Id or ARN if another resource
needs to use it

```yaml
Outputs:
  CognitoUserPoolArn:
    Value: !GetAtt UserPool.Arn
    Export:
      Name: !Sub ${AWS::StackName}-CognitoUserPoolArn
```

## DynamoDB Template

Template to create a DynamoDBStack with cloudformation. DynamoDB is being
used to store additional attributes for users to be added into the auth token

**aws-cf-dynamodb.yaml**

* `AttributeDefinitions:`: define an attribute you want to use as a key

```yaml
AttributeDefinitions:
  -
    AttributeName: "username"
    AttributeType: "S"
KeySchema:
  -
    AttributeName: "username"
    KeyType: "HASH"
```

## Cognito Lambda Template

Template to create Lambda via cloudformation which will be used by a
`pre token generation` trigger within cognito.

**Note code for the token decorator
can be found in /lambdas/cognito-token-decorator-lambda**

**aws-cf-cognito-lambda.yaml**

* `LambdaDynamoDBFullAccessRole:`: creates the IAM role to be used in a policy
to allow Lambda access to DynamoDB

* `LambdaDynamoDBFullAccessPolicy:`: creates a policy to allow logging for
cloudwatch and allows lambda access to dynamoDB

```yaml
PolicyDocument:
  Version: "2012-10-17"
  Statement:
    -
      Sid: AllowLambdaToWriteToCloudWatch
      Effect: Allow
      Action:
        - "logs:CreateLogGroup"
        - "logs:CreateLogStream"
        - "logs:PutLogEvents"
      Resource: "*"
    -
      Sid: AllowLambdaFullAccessToDynamoDB
      Effect: Allow
      Action:
        - dynamodb:*
      Resource: "*"
  ```


## Deploying with Custom Resources UserPoolClientSettings & UserPoolDomain

### Deploy steps

1. Install the AWS Command Line Interface. More information at https://aws.amazon.com/cli/.

1. Open your command shell and navigate to the directory containing the the template.yaml files.

1. Run the following command to package the local artifacts that the AWS CloudFormation template references:

    ```bash
    aws cloudformation package --region us-west-2 --template-file aws-cf-cognito.yaml --s3-bucket <bucket-name> --output-template-file aws-cf-cognito.package.yaml
    ```

1. Finally, execute the deploy of your stack:

    ```bash
    aws cloudformation deploy --region us-west-2 --template-file aws-cf-cognito.package.yaml --stack-name CognitoStack --capabilities CAPABILITY_NAMED_IAM
    ```

    Replace the `<YOUR STACK NAME>` expression with your desired stack name.
