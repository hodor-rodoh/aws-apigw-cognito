APIGW_STACK:=APIGWStack
VPCLINK_STACK:=VPCLinkStack
apply:
	@echo "Deploying $(VPCLINK_STACK)"
	aws cloudformation package --region us-west-2 --template-file aws-cf-vpc_link.yaml --s3-bucket $(S3_BUCKET) --output-template-file aws-cf-vpc_link.package.yaml
	aws cloudformation deploy --region us-west-2 --template-file aws-cf-vpc_link.package.yaml --stack-name $(VPCLINK_STACK) --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changese
	@echo "Deploying $(APIGW_STACK)"
	aws cloudformation package --region us-west-2 --template-file aws-cf-api_gw.yaml --s3-bucket $(S3_BUCKET) --output-template-file aws-cf-api_gw.package.yaml
	aws cloudformation deploy --region us-west-2 --template-file aws-cf-api_gw.package.yaml --stack-name $(APIGW_STACK) --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset

destroy:
	aws cloudformation delete-stack --region us-west-2 --stack-name $(VPCLINK_STACK)
	aws cloudformation delete-stack --region us-west-2 --stack-name $(APIGW_STACK)

clean:
	rm aws-cf-api_gw.package.yaml || true
	rm aws-cf-vpc_link.package.yaml || true
