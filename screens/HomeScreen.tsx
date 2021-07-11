import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Button,
  ScrollView,
  Text,
  SafeAreaView,
  Alert,
} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db, storage } from "../firebase";
import Providers from "../navigation/Providers";
import { AuthContext } from "../navigation/AuthProvider.android";
import SocialButton from "../components/SocialButton";

const Posts = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/users/user-3.jpg"),
    postTime: "4 mins ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/posts/post-img-3.jpg"),
    liked: true,
    likes: "14",
    comments: "5",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../assets/users/user-1.jpg"),
    postTime: "2 hours ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: "none",
    liked: false,
    likes: "8",
    comments: "0",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../assets/users/user-4.jpg"),
    postTime: "1 hours ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/posts/post-img-2.jpg"),
    liked: true,
    likes: "1",
    comments: "0",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../assets/users/user-6.jpg"),
    postTime: "1 day ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/posts/post-img-4.jpg"),
    liked: true,
    likes: "22",
    comments: "4",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../assets/users/user-7.jpg"),
    postTime: "2 days ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: "none",
    liked: false,
    likes: "0",
    comments: "0",
  },
];

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const { login, googleLogin, fbLogin, logout } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const list: any = [];

      await db
        .collection("posts")
        .orderBy("postTime", "desc")
        .get()
        .then((querySnapshot: any) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc: any) => {
            const { userId, post, postImg, postTime, likes, comments } =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: "Test Name",
              userImg:
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log("Posts: ", posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId: string) => {
    Alert.alert(
      "Delete post",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed!"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false }
    );
  };

  const deletePost = (postId: string) => {
    console.log("Current Post Id: ", postId);

    db.collection("posts")
      .doc(postId)
      .get()
      .then((documentSnapshot: any) => {
        if (documentSnapshot.exists) {
          const { postImg } = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage.refFromURL(postImg);
            const imageRef = storage.ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log("Error while deleting the image. ", e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId: string) => {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          "Post deleted!",
          "Your post has been deleted successfully!"
        );
        setDeleted(true);
      })
      .catch((e) => console.log("Error deleting posst.", e));
  };

  const ListHeader = () => {
    return null;
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
      {loading ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }} />
              <View
                style={{
                  marginTop: 6,
                  width: 250,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 350,
                  height: 200,
                  borderRadius: 4,
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }} />
              <View
                style={{
                  marginTop: 6,
                  width: 250,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 350,
                  height: 200,
                  borderRadius: 4,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <View>
          <Text>Flat list</Text>
          <SocialButton
            buttonTitle="Logout"
            btnType="logout"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => logout()}
          />
        </View>
        // <Container>
        //   <FlatList
        //     data={posts}
        //     renderItem={({ item }) => (
        //       <PostCard
        //         item={item}
        //         onDelete={handleDelete}
        //         onPress={() =>
        //           navigation.navigate("HomeProfile", { userId: item.userId })
        //         }
        //       />
        //     )}
        //     keyExtractor={(item) => item.id}
        //     ListHeaderComponent={ListHeader}
        //     ListFooterComponent={ListHeader}
        //     showsVerticalScrollIndicator={false}
        //   />
        // </Container>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
