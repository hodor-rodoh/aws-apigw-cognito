DYNAMODB_STACK:=DynamoDBStack
LAMBDA_STACK:=LambdaDynamoStack
COGNITO_STACK:=CognitoStack

apply:
	@echo "Packaging and uploading lambda code"
	cd $(CURDIR)/cognito-token-decorator-lambda && zip -r cognito-token-decorator-lambda.zip * && mv cognito-token-decorator-lambda.zip ../. && cd ..
	aws s3 cp cognito-token-decorator-lambda.zip s3://$(S3_BUCKET)/cognito-token-decorator-lambda.zip
	@echo "Deploying $(DYNAMODB_STACK)"
	aws cloudformation package --region us-west-2 --template-file aws-cf-dynamoDB.yaml --s3-bucket $(S3_BUCKET) --output-template-file aws-cf-dynamoDB.package.yaml
	aws cloudformation deploy --region us-west-2 --template-file aws-cf-dynamoDB.package.yaml --stack-name $(DYNAMODB_STACK) --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset
	@echo "Deploying $(LAMBDA_STACK)"
	aws cloudformation package --region us-west-2 --template-file aws-cf-cognito-lambda.yaml --s3-bucket $(S3_BUCKET) --output-template-file aws-cf-cognito-lambda.package.yaml
	aws cloudformation deploy --region us-west-2 --template-file aws-cf-cognito-lambda.package.yaml --stack-name $(LAMBDA_STACK) --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset
	@echo "Deploying $(COGNITO_STACK)"
	aws cloudformation package --region us-west-2 --template-file aws-cf-cognito.yaml --s3-bucket $(S3_BUCKET) --output-template-file aws-cf-cognito.package.yaml
	aws cloudformation deploy --region us-west-2 --template-file aws-cf-cognito.package.yaml --stack-name $(COGNITO_STACK) --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset

destroy:
	aws cloudformation delete-stack --region us-west-2 --stack-name $(DYNAMODB_STACK)
	aws cloudformation delete-stack --region us-west-2 --stack-name $(LAMBDA_STACK)
	aws cloudformation delete-stack --region us-west-2 --stack-name $(COGNITO_STACK)

clean:
	rm cognito-token-decorator-lambda.zip || true
	rm aws-cf-dynamoDB.package.yaml || true
	rm aws-cf-cognito-lambda.package.yaml || true
	rm aws-cf-cognito.package.yaml || true
