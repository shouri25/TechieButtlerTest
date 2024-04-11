import {useCallback, useMemo, useState} from 'react';
import {Post} from '../interfaces/Post';
import {getPostById} from '../services/posts';

const usePost = (id: number) => {
  const [post, setPost] = useState<Post>();

  const getPost = useCallback(async () => {
    try {
      const result = await getPostById(id);
      setPost(result)
    } catch (e) {
        console.log("ERR",e)
    }
  }, [id]);

  const value = useMemo(() => {
    return {
      getPost,
      post,
    };
  }, [getPost, post]);

  return value;
};
export default usePost;
