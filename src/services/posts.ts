import axios from 'axios';
import {Services} from './services';
import {Post} from '../interfaces/Post';

export const getPosts = async () => {
  try {
    const result = await axios.get(Services.GET_POSTS);
    return result.data as Post[];
  } catch (e) {
    throw e;
  }
};

export const getPostById = async (id: number) => {
  try {
    const result = await axios.get(`${Services.GET_POSTS}/${id}`);
    return result.data as Post;
  } catch (e) {
    throw e;
  }
};
