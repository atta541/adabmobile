import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Base_URL from "../../Base_URL";

// Cache for API responses
const apiCache = {};

const SlidingMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchCategories = useCallback(async () => {
    if (apiCache.categories) {
      setCategories(apiCache.categories);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_URL}/api/items`);
      const data = await response.json();
      setCategories(data);
      apiCache.categories = data; // Cache the response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryPress = useCallback(
    (category) => {
      navigation.navigate("CategoryScreen", { category });
    },
    [navigation]
  );

  const renderCategory = useMemo(
    () =>
      ({ item }) =>
        (
          <TouchableOpacity
            key={item._id}
            style={styles.categoryButton}
            activeOpacity={0.8}
            onPress={() => handleCategoryPress(item.name)}
          >
            <Image source={{ uri: item.picture }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        ),
    [handleCategoryPress]
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF5733" />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {categories.map((item) => renderCategory({ item }))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    alignItems: "center",
    marginRight: 15,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  categoryText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default SlidingMenu;