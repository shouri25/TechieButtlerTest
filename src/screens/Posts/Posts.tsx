import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {RootStackParamList} from '../../navigation';
import {Post} from '../../interfaces/Post';
import {getPosts} from '../../services/posts';
import {FlatList, Text} from 'react-native';
import PostItem from '../../components/PostItem';
import ItemSeparatorComponent from '../../components/ItemSeparatorComponent';

type PostProps = NativeStackScreenProps<RootStackParamList, 'Posts'>;

const PostsScreen = ({route, navigation}: PostProps) => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    try {
      const data = await getPosts();
      setData(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onExpandOrCollapse = useCallback((id: number) => {
    setData((prev)=>prev.map(item => {
      if (item.id === id) {
        item.open = !item.open;
      }
      return item;
    }))
  }, []);

  return (
    <FlatList
      keyExtractor={item => item.id.toString()}
      data={data}
      renderItem={({item, index}) => {
        return <PostItem data={item} onExpandOrCollapse={onExpandOrCollapse} open={item.open} />;
      }}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};
export default PostsScreen;
