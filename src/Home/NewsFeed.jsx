import React, { useEffect, useState, useRef } from "react";
import "./NewsFeed.css";
import Post from "./Post";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postDataSlice } from "../Store/postDataSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

toast.configure();

function NewsFeed() {
  const [postList, setPostList] = useState([]);
  const history = useHistory();
  const userData = useSelector((globalStore) => globalStore.users);
  let loading = false;
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(2);
  const [initFlag, setInit] = useState(false);
  const [postSet, setPostSet] = useState({});
  let posts = useSelector((globalStore) => globalStore.posts);
  const dispatch = useDispatch();

  const sortList = (list) => {
    const sortedArr = [...list].sort((a, b) => {
      const aDateNumeric = new Date(b.postTimeStamp).valueOf();
      const bDateNumeric = new Date(a.postTimeStamp).valueOf();
      return aDateNumeric - bDateNumeric;
    }); // sorts in descending order of Post time
    return sortedArr;
  };

  const getPostsFromBackend = () => {
    const headers = {
      "Content-Type": "application/json",
      authToken: localStorage.getItem("authToken"),
    };
    const url = `http://localhost:9999/getPosts/?limit=${limit}&offset=${offset}&userId=${userData.userId}`;
    fetch(url, { headers: headers, credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.authorizationSuccess) {
          if (res.responsePosts.length > 0) {
            setOffset((offset) => offset + limit);
            let tempPostList = [...postList];
            res.responsePosts.forEach((curIter) => {
              if (
                postSet[curIter.post._id] === undefined ||
                postSet[curIter.post._id] === null
              ) {
                tempPostList.push(curIter);
                const tempPostSet = {
                  ...postSet,
                  [curIter.post._id]: curIter.post._id,
                };
                //tempPostSet[post._id] = post._id;
                setPostSet(tempPostSet);
              } else {
              }
            });
            const payload = {
              postList: tempPostList,
            };
            setPostList(tempPostList);
            dispatch(postDataSlice.actions.addNewPostList(payload));
            setInit(true);
          } else {
            console.log("You are all caught up..");
            toast.info("You are Up to Date!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5 * 1000,
            });
          }
        } else {
          toast.error("Session Expired, Please Login", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5 * 1000,
          });
          setTimeout(() => {
            history.push("/");
          }, 4 * 1000);
        }
      });
  };

  const onScrollEventHandler = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      loading = true;
      //setOffset(offset + limit);
      getPostsFromBackend();
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      //console.log("posts[0]." + JSON.stringify(posts[0]));
      const tempPostSet = {
        ...postSet,
        [posts[0].post._id]: posts[0].post._id,
      };
      setPostSet(tempPostSet);
    }
    setPostList(posts);
  }, [posts]);

  useEffect(() => {
    getPostsFromBackend();
  }, [userData, initFlag]);
  return (
    <div className="fixed-container-news-feed">
      <div
        className="feed-container"
        onScroll={(event) => onScrollEventHandler(event)}
      >
        {postList.map((curIter, index) => {
          return (
            <div key={curIter.post._id} className="feed">
              <Post
                post={curIter.post}
                alreadyLiked={curIter.liked}
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

export default NewsFeed;
