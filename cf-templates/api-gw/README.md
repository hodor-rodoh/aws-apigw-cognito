# API Gateway

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
     |: \: : : : : : :-------~: : ::/  - API Hwat Way?!?!
     |: :''-,: : : : :: : : : : : :|
     ',: : :''-,  : : : : : : : : ,'
     |: : : : : : : : : : : : : ,-'
     |: : :: : '''~----------~''
```

### Table of Contents

* [API Gateway](#api_gateway)
* [Deployment Order](#deployment_order)
  * [API Gateway Templates](#api_gateway_template)
  * [VPC Link Template](#vpc_link_template)
  * [Files](#files)

## API Gateway Templates

Template to create an API Gateway via cloudformation. Creates authorizer to
be used with cognito and some cloudwatch alarms. VPC Link configuration to
create the link. This example is operating the asusmption a Network LoadBalancer
is already provided as we just pass in the output.

## Deployment Order

Order of deployment for cloudformation templates in this repo.

1. aws-cf-api_gw.yaml
1. aws-cf-vpc_link.yaml

## Files

**aws-cf-api_gw.yaml**

* `Type: AWS::ApiGateway::Authorizer`: creates the authorizer resource to be
used with a cognito user UserPool

* `ApiGatewayCloudWatchAlarm4XX:`: creates cloudwatch alarm for errors so you can
be alerted

```yaml
ApiGatewayCloudWatchAlarm4XX:
  Type: AWS::CloudWatch::Alarm
  Properties:
    Namespace: AWS/ApiGateway
    Dimensions:
      -
        Name: "ApiName"
        Value: "aws-cf-proxy-api"
      -
        Name: "Stage"
        Value: !Sub "${apiGatewayStageName}"
    MetricName: 4XXError
    Statistic: Sum
    AlarmName: !Sub "ApiGateway4XXErrorRate_${apiGatewayStageName}"
    AlarmDescription: "Alarm for 4XX's"
    EvaluationPeriods: 1
    Period: 60
    Threshold: 10
    TreatMissingData: notBreaching
    ComparisonOperator: GreaterThanOrEqualToThreshold
```

**aws-cf-vpc_link.yaml**

* `Fn::ImportValue: <NLB Value>`: Imports the ARN of the Network LoadBalancer from
an existing CloudFormation stack to link them.

```yaml
Resources:
  VPCLink:
    Type: AWS::ApiGateway::VpcLink
    Properties:
      Name: !Sub ${AWS::StackName}-VpcLink
      TargetArns:
        - Fn::ImportValue: <NLB Value>
```
