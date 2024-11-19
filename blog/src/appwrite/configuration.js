import confi from "../config/config";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
    client = new Client()
    databases
    bucket

    constructor(){
        this.client
        .setEndpoint(confi.appwriteUrl)
        .setProject(confi.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                confi.appwriteDatabaseId, 
                confi.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                } 
            )
        } catch (error) {
            return error
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title, 
                    content, 
                    featuredImage, 
                    status 
                }
            )
        } catch (error) {
            return error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
        } catch (error) {
            return error
        }
    }

    async getpost(slug){
        try {
            return await this.databases.getDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
        } catch (error) {
            return error
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                queries
            )
        } catch (error) {
            return error
        }
    }

    //upload

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                confi.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            return error
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                confi.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            return error
        }
    }

    getFilePreview(fileId){
        // return url
        return this.bucket.getFilePreview(
            confi.appwriteBucketId,
            fileId
        )
    }
}



const service = new Service()
export default service 