import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/configuration";
import Bttn from "./Bttn";
import Container from "./container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Input from "./Input";
import { useForm } from 'react-hook-form'


function PostPage() {
    console.log("entered into post page");
    
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getpost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const [like, setLike] = useState(
        post && post.$id ? localStorage.getItem('like' + post.$id) === "true" : false
      );
    const toggleLike = ()=>{
      if(like){
          decLike();
          setLike(false);
          localStorage.setItem('like' + post.$id, "false");
        }else{ 
          incLike();
          setLike(true);
          localStorage.setItem('like' + post.$id, "true");
      }
    }

    const incLike = async () => {
        const updatedLikeCount = (post.likeCount || 0) + 1; // Ensure likeCount is not undefined
        const updatedPost = { ...post, likeCount: updatedLikeCount };
        setPost(updatedPost); // Update local state for immediate feedback
        await service.updatePost(post.$id, updatedPost); // Sync with server
    };
    const decLike = async ()=>{
        const updatedLikeCount = (post.likeCount || 0) - 1;
        const updatedPost = {...post, likeCount: updatedLikeCount};
        setPost(updatedPost);
        await service.updatePost( post.$id, updatedPost)
    }

    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        if (post && post.featuredImage) {
            const fetchImage = async () => {
                try {
                    const url = await service.getFilePreview(post.featuredImage);
                    setImageUrl(url);
                } catch (error) {
                    console.error("Error fetching image URL:", error);
                    setImageUrl("/path/to/default/image.jpg");
                }
            };
            fetchImage();
        }
    }, [post]);

    console.log(`skdjbfafd ${imageUrl}`);


    if(userData){
        localStorage.setItem("newUserId", `${userData.$id}`);
        localStorage.setItem("newUserName", `${userData.name}`);
        console.log( localStorage.getItem("userId"));
      }
    
    const {register, handleSubmit} = useForm()
    const submit = async (data)=>{
        data.name = localStorage.getItem("newUserName")
        data.like = 0
        const now = new Date();
        const dateString = now.toString();
        const trimmedString = dateString.split(" ").slice(0, 5).join(" ");
        data.date = trimmedString
        data.slug = post.$id
        data.userId = localStorage.getItem("newUserId")
        console.log(data.text);
        console.log(`name for comment ${data.name}`);
        console.log(data.date);
        console.log(data.userId);
        console.log(data.slug);

        const dbPost = await service.addComment(data)
        if(dbPost){
            console.log(`comment post successfull ${dbPost}`);
            alert("comment post successfully / refresh page")
            
        }
        
    }

    const [comments, setComments] = useState([])
    useEffect(() => {
        if (slug) {
            service.getcomments(slug).then((post) => {
                if (post) setComments(Array(post));
            });
        }
    }, [slug, navigate]);

    console.log(`comments array ${comments}`); 
    
    const [likeForComment, setLikeForComment] = useState(
        post && post.$id ? localStorage.getItem('like' + comments.$id) === "true" : false
      );
    const toggleLikeForComment = ()=>{
      if(like){
          decLikeForComment();
          setLikeForComment(false);
          localStorage.setItem('like' + comments.$id, "false");
        }else{ 
          incLikeForComment();
          setLikeForComment(true);
          localStorage.setItem('like' + comments.$id, "true");
      }
    }

    const incLikeForComment = async () => {
        const updatedLikeCount = (post.likeCount || 0) + 1; // Ensure likeCount is not undefined
        const updatedPost = { ...post, likeCount: updatedLikeCount };
        setComments(updatedPost); // Update local state for immediate feedback
        await service.updatePost(post.$id, updatedPost); // Sync with server
    };
    const decLikeForComment = async ()=>{
        const updatedLikeCount = (post.likeCount || 0) - 1;
        const updatedPost = {...post, likeCount: updatedLikeCount};
        setComments(updatedPost);
        await service.updatePost( post.$id, updatedPost)
    }
    
    return post ? (
        <div className="mb-10 mt-32 px-5 pb-5 shadow-[5px_5px_0px_0px_white] hover:shadow-[7px_7px_0px_0px_white] bg-white border-[2px] border-black mx-5">
            <Container>
                <div className="w-full flex mb-4 relative p-2">
                    <img
                        src={imageUrl}
                        alt={post.title}
                        className="h-60 w-96 object-cover mt-5"
                    />
                </div>
                <div className="w-full mb-6 text-black">
                    <h1 className="text-2xl font-bold">Title: {post.title}</h1>
                </div>
                <div className="browser-css bg-slate-100 p-2 rounded-lg text-zinc-800">
                    Content: {parse(post.content)}
                </div>
                <div className="grid grid-cols-2 w-16 pt-5">
                    <button onClick={toggleLike}>
                    {like ? "❤️" : "♡"}
                    </button>
                    <p className="pl-1">{post.likeCount}</p>
                </div>
                <div>
                    Liked By : {}
                </div>
                {isAuthor && (
                        <div className="mt-10">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Bttn text="edit" bgColor="bg-green-900" className="mr-3">
                                    
                                </Bttn>
                            </Link>
                            <Bttn text="delete" bgColor="bg-red-900" onClick={deletePost}>
                                
                            </Bttn>
                        </div>
                    )}
            </Container>

            <div className="text-black mt-10">
                <h1>Comments:</h1>
                <form onSubmit={handleSubmit(submit)} className="flex">
                <Input
                label=" "
                placeholder="add comment"
                className="mb-4"
                {...register("text", { required: true })}
                 />
                <button type="submit" className="hover:text-teal-700 mx-1 ">post</button>
                </form>
                <div className="">
                    {comments.map((comment)=>(
                        <div key={comment.$id} className="border border-black p-2 rounded-xl">
                            <h1 className="text-teal-700">{comment.name}</h1>
                            <h1 className="text-teal-700">{comment.date}</h1>
                            <div className="grid grid-cols-10">
                                <h1 className="bg-slate-100 col-span-8 rounded-lg px-2">{comment.text}</h1>
                                <button onClick={toggleLikeForComment} className="flex ml-2">
                                    {likeForComment ? "❤️" : "♡"}
                                    <p className="pl-1">{comment.like}</p>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null;
}

export default PostPage