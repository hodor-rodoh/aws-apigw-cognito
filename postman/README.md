# Postman

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
     |: \: : : : : : :-------~: : ::/  - Post Hwat?!?!
     |: :''-,: : : : :: : : : : : :|
     ',: : :''-,  : : : : : : : : ,'
     |: : : : : : : : : : : : : ,-'
     |: : :: : '''~----------~''
```

### Table of Contents

* [Postman](#postman)
  * [Files](#files)

## Postman

This repository contains postman collections which can be used to test
the auth flow of a cognito user and then send a successful request to API gateway
once properly authenticated.

**Note to test you will need to create a user
in cognito before**

## Files

* **PoC_demo.postman_collection.json**: Once imported there will be
5 requests.

  1. `Mock API GW Without Headers`
  1. `Mock API GW With Invalid Token`
  1. `Get Token With Credentials IDP`
  1. `Auth Challenge Change Password`
  1. `Mock API GW With Valid Token`


1. **Mock API GW Without Headers**: Make a post to API GW mock url.
URL can be found in api gateway --> stages. Results in access denied.

2. **Mock API GW With Invalid Token**: Pass a random token in the request
header. Results in access denied.

3. **Get Token With Credentials IDP**: fill in the appropriate values for
  `USERNAME:`, `PASSWORD:`, `ClientId:` ClientId can be found in cognito General Settings --> App clients

    * Once configured hit send
    * A sessions token will be generated and trigger the auth flow requesting
    a password change
    * copy the session ID to be used in **Auth Challenge Change Password**


4. **Auth Challenge Change Password**: Fill out appropriate values like above.
  If you want to add additional attributes simply write
  `userAttributes.${some value}:`
  for example `userAttributes.name:`

    * Paste the session id into the body
    * Change password and hit send
    * A IdToken will be generated
    * Copy the new IdToken which will be used in the next step


5. **Mock API GW With Valid Token**: Pass the new token in header.
Results in 200 successful.

  *  **Required Inputs**:

    * `Authoriztion` = IdToken from earlier,
    * `x-api-key` = found in API Gateway API Keys from the AWS console
    * `Content-Type` = application/json
    * `Invoke URL` = found in API Gateway Stages.
