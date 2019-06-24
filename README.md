# Cognito and API Gateway POC

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
     |: \: : : : : : :-------~: : ::/  - Hwat in CloudFormation?!?!
     |: :''-,: : : : :: : : : : : :|
     ',: : :''-,  : : : : : : : : ,'
     |: : : : : : : : : : : : : ,-'
     |: : :: : '''~----------~''
```
### Table of Contents

* [Cognito + API Gateway](#cognito_api_gateway)
  * [About the Repository](#about_the_repository)

# Cognito + API Gateway

This repository contains AWS Cloudformation templates to create a
proof of concept for AWS Cognito and API Gateway.
Alongside the Cognito setup we are also provisioning a dynamoDB instance to
allow additional attributes to be associated with a username. While Cognito
allows for custom attributes, they cannot change without destroying the
user pool.

## About this Repository

This repository contains 3 directories.
* **cf-templates**: where are the Cloudformation templates are stored

  * api-gw
  * cognito


* **Postman Collections**: Postmans to test the auth flow for a cognito user
and hit a mock endpoint
