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
    



    
    return post ? (
        <div className="mb-10 mt-32 px-5 pb-5 shadow-[5px_5px_0px_0px_white] hover:shadow-[7px_7px_0px_0px_white] bg-white border-[2px] border-black mx-20">
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
                <div className="browser-css text-zinc-800">
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
                        <div className="absolute right-0 top-12">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Bttn text="edit" bgColor="bg-green-500" className="mr-3">
                                    
                                </Bttn>
                            </Link>
                            <Bttn text="delete" bgColor="bg-red-500" onClick={deletePost}>
                                
                            </Bttn>
                        </div>
                    )}
            </Container>
        </div>
    ) : null;
}

export default PostPage