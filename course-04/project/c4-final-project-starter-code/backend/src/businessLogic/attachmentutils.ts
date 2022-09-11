import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'

const logger = createLogger('attachmentUtils')
const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic

export default class AttachmentUtils {
    constructor(
        private readonly todosBucket = process.env.S3_BUCKET,
        private readonly s3 = new XAWS.S3({ signatureVersion: 'v4'}),
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly todoTable = process.env.TODOS_TABLE,
    ) {}

    async generateUploadUrl(todoId: string,userId: string): Promise<string> {
        logger.info("Generating URL");

        const url = this.s3.getSignedUrl('putObject', {
            Bucket: this.todosBucket,
            Key: todoId,
            Expires: 1000,
        });
        logger.info(url);

        await this.docClient.update({
            TableName: this.todoTable,
            Key:{
                "todoId":todoId,
                "userId":userId
            },
            UpdateExpression: "set attachmentUrl = :url",
            ExpressionAttributeValues:{
                ":url": `https://${this.todosBucket}.s3.amazonaws.com/${todoId}`
            },
            ReturnValues:"UPDATED_NEW"
        }).promise();

        return url as string;
    }
}