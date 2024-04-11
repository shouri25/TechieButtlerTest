import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Post} from '../interfaces/Post';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icons} from '../../assets';
import usePost from '../hooks/usePost';
import {fibonacci} from '../utils/fibanocci';

interface PostItemProps {
  data: Post;
  onExpandOrCollapse: (id: number) => void;
  open?: boolean;
}

const PostItem = ({data, onExpandOrCollapse, open}: PostItemProps) => {
  const renderCount = useRef(0);

  const {getPost, post} = usePost(data.id);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log('RENDER', data.id, renderCount.current);
  });

  useEffect(() => {
    if (data.open) getPost();
  }, [open]);

  const onPressItem = useCallback(() => {
    onExpandOrCollapse(data.id);
  }, [data]);

  const heavyComputation = useMemo(() => {
    const start = performance.now()
    const result = fibonacci(data.id%20);
    const end = performance.now()
    console.log('heavyComputation',end-start);
    return `${data.id}. ${data.title}`;
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>
          {heavyComputation}
        </Text>
        <TouchableOpacity onPress={onPressItem}>
          <Image
            source={Icons.Dropdown}
            style={[styles.image, open && styles.rotateImage]}
          />
        </TouchableOpacity>
      </View>
      {open && (
        <>
          <View style={styles.card}>
            {post ? (
              <Text style={styles.body}>{post.body}</Text>
            ) : (
              <ActivityIndicator size={'small'} />
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    fontWeight: '700',
  },
  body: {},
  image: {
    width: 20,
    height: 20,
    tintColor: 'gray',
  },
  rotateImage: {
    transform: [{rotateX: '180deg'}],
  },
  card: {
    backgroundColor: 'white',

    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 12,
    margin: 8,
  },
});

export default React.memo(PostItem);
