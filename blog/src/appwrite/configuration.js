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

    async createPost({title, slug, content, name, featuredImage, date, likeCount, status, userId}){
        try {
            return await this.databases.createDocument(
                confi.appwriteDatabaseId, 
                confi.appwriteCollectionId,    
                slug,  //document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    name,
                    date,
                    likeCount
                } 
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
            alert("Appwrite Service :: createPost :: error", error);
            
        }
    }

    async addComment({text, slug, name, date, postid, like, userId}){
        try {
            return await this.databases.createDocument(
                confi.appwriteDatabaseId, 
                confi.appwriteCollectionIdForComments,    
                slug,  //document id
                {
                    text,
                    name,
                    userId,
                    date,
                    like,
                    postid,
                } 
            )
        } catch (error) {
            console.log("Appwrite Service :: addcomment :: error", error);
            alert("Appwrite Service :: addcomment :: error", error);
            
        }
    }

    async updatePost(slug, {title, content, name, date, likeCount, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title, 
                    content, 
                    featuredImage, 
                    status,
                    name,
                    date,
                    likeCount 
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
        }
    }

    async updateComment(slug, {text, name, date, like, postid, userId}){
        try {
            return await this.databases.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionIdForComments,
                slug,
                {
                    text,
                    name,
                    userId,
                    date,
                    like,
                    postid,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updateComment :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
            return false
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
            console.log("Appwrite Service :: getpost :: error", error);
            return false
        }
    }

    async getcomments(queries = [Query.equal("status", "active")]){
        try {
            const response = await this.databases.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionIdForComments,
                queries
            );
            console.log("Response from Appwrite:", response); // Inspect response structure
            return response.documents || []; // Ensure you return the documents array
        } catch (error) {
            console.log("Appwrite Service :: getcomments :: error", error);
            return false
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]){
        try {  // give all the posts in collection but we want only posts with active status - query - used when you have created index in article 
            return await this.databases.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);
            return false
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
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false
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
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false
        }
    }

    async getFilePreview(fileId){
        // return url
        return this.bucket.getFilePreview(
            confi.appwriteBucketId,
            fileId
        )
    }
}
 
const service = new Service()
export default service 