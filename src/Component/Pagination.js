import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ totalPages, onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState(1);

  const handlePagePress = (page) => {
    setSelectedPage(page);
    onPageChange(page); // Notify parent component
  };

  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: totalPages }, (_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.pageButton,
            selectedPage === index + 1 && styles.selectedPage,
          ]}
          onPress={() => handlePagePress(index + 1)}
        >
          <Text
            style={[
              styles.pageText,
              selectedPage === index + 1 && styles.selectedText,
            ]}
          >
            {index + 1}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Next Arrow */}
      <TouchableOpacity
        onPress={() =>
          selectedPage < totalPages && handlePagePress(selectedPage + 1)
        }
        style={styles.nextButton}
      >
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  selectedPage: {
    backgroundColor: 'black',
  },
  pageText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
  nextButton: {
    marginLeft: 10,
  },
  arrow: {
    fontSize: 18,
    color: '#000',
  },
});
