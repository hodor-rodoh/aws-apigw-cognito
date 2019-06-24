# Cognito Token Decorator Lambda

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
     |: \: : : : : : :-------~: : ::/  - What in the Lambda?!?!
     |: :''-,: : : : :: : : : : : :|
     ',: : :''-,  : : : : : : : : ,'
     |: : : : : : : : : : : : : ,-'
     |: : :: : '''~----------~''
```

### Table of Contents

* [Token Decorator](#token_decorator)
  * [Files](#files)
  * [Additional Links](#additional_links)

# Cognito Token Decorator Lambda

This repository uses Node.js to create a lambda which will be used as
as a `pre token generation` trigger in cognito. When called the lambda
will check a dynamodb table using a provided username as the key. If the user exists
and has additional attributes (e.g. `company=buttsbin`), the lambda will add
the additional attributes into the auth token.

## Files

* **dynamodb.js**: queries a dynamodb table for a provided username and exports
their additional attributes if they exist.

* **index.js**: Waits on dynamodb.js to get back results. If user exists
and has additional attributes, the attributes will get added to the claims.

## Additional Links

[Cognito Pre Token Generation document](#https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-token-generation.html)
