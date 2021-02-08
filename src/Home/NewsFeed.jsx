import React, { useEffect, useState, useRef } from "react";
import "./NewsFeed.css";
import Post from "./Post";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postDataSlice } from "../Store/postDataSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../GlobalCommonData";
import Loader from "react-loader-spinner";
import RandomQuotes from "../Login/RandomQuotes";

toast.configure();

function NewsFeed() {
  const [postList, setPostList] = useState([]);
  const history = useHistory();
  const userData = useSelector((globalStore) => globalStore.users);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(2);
  const [initFlag, setInit] = useState(false);
  const [bottomFlag, setBottomFlag] = useState(false);
  const [allDataFetchedFlag, setDataFetchedFlag] = useState(false);
  const [initLoadingSpinner, setSpinner] = useState(true);
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
    const url = `${SERVER_URL}home/getPosts/?limit=${limit}&offset=${offset}&userId=${userData.userId}`;
    fetch(url, { headers: headers, credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.authorizationSuccess) {
          setSpinner(false);
          if (res.responsePosts.length > 0) {
            setBottomFlag(false);
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
            setBottomFlag(true);
            console.log("You are all caught up..");
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
      //setOffset(offset + limit);
      getPostsFromBackend();
      setBottomFlag(true);
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

  useEffect(() => {
    if (bottomFlag) {
      setTimeout(() => {
        if (bottomFlag && postList.length > 0) {
          setDataFetchedFlag(true);
        }
        console.log("inside settimeout");
      }, 10 * 1000);
    }
  }, [bottomFlag]);
  return (
    <div className="fixed-container-news-feed">
      <div
        className="feed-container"
        onScroll={(event) => onScrollEventHandler(event)}
      >
        {postList.length > 0 ? (
          postList.map((curIter, index) => {
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
          })
        ) : (
          <div>
            <p
              style={{
                fontFamily: "monospace",
                color: "white",
                margin: "auto",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              Be willing to be a beginner every single morning. Be the initiator
              and start posting!
            </p>
            <RandomQuotes fontSize="19px" />
          </div>
        )}
        {initLoadingSpinner && (
          <div className="loader-cls">
            <Loader
              type="Circles"
              color="rgba(173, 172, 172, 0.267)"
              height={200}
              width={200}
            />
            <p style={{ color: "white" }}>
              Please wait, while we get some cool and informative stuff from our
              Warehouse!
            </p>
          </div>
        )}
        {bottomFlag && (
          <div>
            {postList.length > 0 && (
              <div>
                {allDataFetchedFlag === false && bottomFlag === true && (
                  <div className="loader-cls">
                    <Loader
                      type="Grid"
                      color="rgba(228, 225, 225, 0.829)"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
                <div className="bottom-text">
                  <br />
                  {allDataFetchedFlag === true && bottomFlag === true ? (
                    <p className="bottom-text">
                      For now you have consumed everything present in our
                      Warehouse!
                    </p>
                  ) : (
                    <RandomQuotes fontSize="19px" />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsFeed;
