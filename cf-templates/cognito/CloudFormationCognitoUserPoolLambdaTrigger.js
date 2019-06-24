const AWS = require('aws-sdk');

exports.handler = async (event) => {
    try {
        switch (event.RequestType) {
            case 'Create':
            case 'Update':
                var cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

                await cognitoIdentityServiceProvider.updateUserPool({
                    UserPoolId: event.ResourceProperties.UserPoolId,
                    LambdaConfig: event.ResourceProperties.LambdaConfig
                }).promise();

                await sendCloudFormationResponse(event, 'SUCCESS');
                break;

            case 'Delete':
                await sendCloudFormationResponse(event, 'SUCCESS');
                break;
        }

        console.info(`CognitoUserPoolTrigger Success for request type ${event.RequestType}`);
    } catch (error) {
        console.error(`CognitoUserPoolTrigger Error for request type ${event.RequestType}:`, error);
        await sendCloudFormationResponse(event, 'FAILED');
    }
}

async function sendCloudFormationResponse(event, responseStatus, responseData) {
    var params = {
        FunctionName: 'CloudFormationSendResponse',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({
            StackId: event.StackId,
            RequestId: event.RequestId,
            LogicalResourceId: event.LogicalResourceId,
            ResponseURL: event.ResponseURL,
            ResponseStatus: responseStatus,
            ResponseData: responseData
        })
    };

    var lambda = new AWS.Lambda();
    var response = await lambda.invoke(params).promise();

    if (response.FunctionError) {
        var responseError = JSON.parse(response.Payload);
        throw new Error(responseError.errorMessage);
    }
}
