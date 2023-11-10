import {Client,Account,ID,Databases,Storage, Query} from 'appwrite'
import conf from '../conf/conf'

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl) // Your API Endpoint
        .setProject(conf.appWriteProjectId); // Your project ID
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({title,slug,description,img,status,userId}){
        try {
            return await this.databases.createDocument(conf.appWriteDBId,conf.appWriteCollectionId,slug,{
                title,description,img,status,userId
            })
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug,{title,description,img,status}){
        try {
            return await this.databases.updateDocument(conf.appWriteDBId,conf.appWriteCollectionId,slug,{
                title,description,img,status
            })
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appWriteDBId,conf.appWriteCollectionId,slug)
            return true
        } catch (error) {
            // throw error
            console.log(error);
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appWriteDBId,conf.appWriteCollectionId,slug)
             
        } catch (error) {
            // throw error
            console.log(error);
            return false
        }
    }
    async getAllPosts(queries = [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(conf.appWriteDBId,conf.appWriteCollectionId,
                queries)
             
        } catch (error) {
            // throw error
            console.log(error);
            return false
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appWriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appWriteBucketId,fileId)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }
    filePreview(fileId){
        try {
             return this.bucket.getFilePreview(conf.appWriteBucketId,fileId)
             
        } catch (error) {
            console.log(error);
            return false
        }
    }









}

const service = new Service()

export default service