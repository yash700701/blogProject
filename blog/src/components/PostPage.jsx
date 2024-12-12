import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/configuration";
import Bttn from "./Bttn";
import Container from "./container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


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

    const [like, setLike] = useState(localStorage.getItem(`like`) == "true");
    const toggleLike = ()=>{
      if(like){
          decLike();
          setLike(false);
          localStorage.setItem(`like`, "false");
        }else{ 
          incLike();
          setLike(true);
          localStorage.setItem(`like`, "true");
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
    return post ? (
        <div className="mb-10 mt-20 bg-slate-200 rounded-xl px-5 py-10 border-[1px] border-black mx-5">
            <Container>
                <div className="w-full bg-slate-900 flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-0 top-12">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Bttn text="edit" bgColor="bg-green-500" className="mr-3">
                                    
                                </Bttn>
                            </Link>
                            <Bttn text="delete" bgColor="bg-red-500" onClick={deletePost}>
                                
                            </Bttn>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-teal-900">
                    <h1 className="text-2xl font-bold">Title: {post.title}</h1>
                </div>
                <div className="browser-css text-zinc-800">
                    Content: {parse(post.content)}
                </div>
                <div className="grid grid-cols-2 w-16 pt-5">
                    <button onClick={toggleLike}>
                    {like ? "❤️" : "♡"}
                    </button>
                    <p className="pl-3">{post.likeCount}</p>
                </div>
            </Container>
        </div>
    ) : null;
}

export default PostPage