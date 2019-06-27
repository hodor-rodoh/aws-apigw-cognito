DYNAMODB_STACK:=DynamoDBStack
LAMBDA_STACK:=LambdaDynamoStack
COGNITO_STACK:=CognitoStack
APIGW_STACK:=APIGWStack
AWS_REGION:=<your-region>
AWS_PROFILE:=<your-profile>
S3_BUCKET:=<your-bucket>
export

destroy:
	@make destroy-cognito
	@make destroy-apigw

destroy-cognito:
	@make -C cognito destroy

destroy-apigw:
	@make -C api-gw destroy

apply:
	@make apply-cognito
	@make apply-apigw

apply-cognito:
	@make -C cognito apply

apply-apigw:
	@make -C api-gw apply

clean:
	@make -C cognito clean
	@make -C api-gw clean
