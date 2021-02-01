import React, { useEffect, useState } from "react";
import "./PostsDisplay.css";
import { useSelector } from "react-redux";
import UserPost from "./UserPost";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

toast.configure();

function UserPostDisplay(props) {
  const history = useHistory();
  const userData = useSelector((globalStore) => globalStore.users);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(2);
  const [loading, setLoading] = useState(false);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [initFlag, setInit] = useState(true);

  const getPostsFromBackend = () => {
    let url = `http://localhost:9999/getUsersPost/?limit=${limit}&offset=${offset}&`;
    //console.log(userData);
    userData.posts.forEach((postId) => {
      url += `postIds=${postId}&`;
    });
    url = url.slice(0, url.length - 1);
    console.log(url);
    const headers = {
      "Content-Type": "application/json",
      authToken: localStorage.getItem("authToken"),
    };
    fetch(url, { headers: headers, credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.authorizationSuccess) {
          if (res.responsePosts.length > 0) {
            setOffset(offset + limit);
            let newArr = [...displayPosts];
            res.responsePosts.forEach((curRes) => newArr.push(curRes));
            setDisplayPosts(newArr);
            setInit(false);
          } else {
            toast.info("Thats it!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5 * 1000,
            });
          }
        } else {
          toast.error(res.errMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5 * 1000,
          });
          setTimeout(() => {
            history.push("/");
          }, 4 * 1000);
        }
      });
  };
  useEffect(() => {
    getPostsFromBackend();
    //console.log("user post changed..")
  }, [initFlag]);

  const onScrollEventHandler = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    //console.log(`${scrollTop} ${clientHeight} ${scrollHeight} `);
    if (scrollHeight - scrollTop === clientHeight) {
      setLoading(true);
      //setOffset(offset + limit);
      getPostsFromBackend();
      console.log("bottom");
    }
  };

  return (
    <div className="fixed-container-news-feed">
      <div
        className="feed-container"
        onScroll={(event) => onScrollEventHandler(event)}
      >
        {displayPosts.map((curIter, index) => {
          return (
            <div key={index} className="feed">
              <UserPost
                post={curIter.post}
                imagesRelatedToPost={curIter.imagesRelatedToPosts}
              />
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserPostDisplay;
